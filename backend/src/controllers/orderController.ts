import { Response } from "express";
import Order from "../models/Order";
import Cart from "../models/Cart";
import { AuthRequest } from "../middleware/authMiddleware";
import { sendOrderConfirmationEmail } from "../utils/emailService";

// @desc    Create order from cart (checkout)
// @route   POST /api/orders
// @access  Private (must be logged in to checkout)
export const createOrder = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: "error",
        message: "Please login to place an order",
      });
      return;
    }

    // Find user's cart
    let cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.product"
    );

    // If no cart with userId, check if there's a session cart to merge
    if (!cart) {
      const sessionId = req.cookies.sessionId;
      if (sessionId) {
        cart = await Cart.findOne({ sessionId }).populate("items.product");
      }
    }

    if (!cart || cart.items.length === 0) {
      res.status(400).json({
        status: "error",
        message: "Cart is empty",
      });
      return;
    }

    // Calculate total and prepare order items
    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.product as any;

      if (!product) {
        res.status(400).json({
          status: "error",
          message: "One or more products not found",
        });
        return;
      }

      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        size: item.size,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create order
    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      totalPrice,
      status: "pending",
      orderDate: new Date(),
    });

    // Clear the cart after successful order
    await Cart.findOneAndDelete({ userId: req.user._id });

    // Populate order details
    await order.populate("items.product");

    // Send order confirmation email
    try {
      await sendOrderConfirmationEmail(req.user.email, req.user.name, order);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      status: "success",
      message: "Order placed successfully",
      data: {
        order,
      },
    });
  } catch (error: any) {
    console.error("Create order error:", error);
    res.status(500).json({
      status: "error",
      message: "Error creating order",
      error: error.message,
    });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
export const getUserOrders = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: "error",
        message: "Not authenticated",
      });
      return;
    }

    const orders = await Order.find({ userId: req.user._id })
      .populate("items.product")
      .sort({ orderDate: -1 });

    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (error: any) {
    console.error("Get orders error:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: "error",
        message: "Not authenticated",
      });
      return;
    }

    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      userId: req.user._id,
    }).populate("items.product");

    if (!order) {
      res.status(404).json({
        status: "error",
        message: "Order not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error: any) {
    console.error("Get order by ID error:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching order",
      error: error.message,
    });
  }
};
