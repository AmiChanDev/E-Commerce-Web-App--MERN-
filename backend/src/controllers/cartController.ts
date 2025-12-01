import { Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/authMiddleware';
import { getOrCreateSessionId, setSessionCookie } from '../utils/sessionHelper';

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Public (supports both authenticated and guest users)
export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let cart;

    if (req.user) {
      // Authenticated user
      cart = await Cart.findOne({ userId: req.user._id }).populate('items.product');
    } else {
      // Guest user
      const sessionId = getOrCreateSessionId(req);
      setSessionCookie(sessionId, res);
      cart = await Cart.findOne({ sessionId }).populate('items.product');
    }

    if (!cart) {
      res.status(200).json({
        status: 'success',
        data: {
          cart: { items: [] }
        }
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error: any) {
    console.error('Get cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching cart',
      error: error.message
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, size, quantity = 1 } = req.body;

    // Validate input
    if (!productId || !size) {
      res.status(400).json({
        status: 'error',
        message: 'Product ID and size are required'
      });
      return;
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
      return;
    }

    // Validate size
    if (!product.sizes.includes(size)) {
      res.status(400).json({
        status: 'error',
        message: `Size ${size} not available for this product`
      });
      return;
    }

    let cart;
    let cartQuery: any = {};

    if (req.user) {
      // Authenticated user
      cartQuery = { userId: req.user._id };
    } else {
      // Guest user
      const sessionId = getOrCreateSessionId(req);
      setSessionCookie(sessionId, res);
      cartQuery = { sessionId };
    }

    // Find or create cart
    cart = await Cart.findOne(cartQuery);

    if (!cart) {
      cart = new Cart({
        ...cartQuery,
        items: []
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        size,
        quantity
      });
    }

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      status: 'success',
      message: 'Item added to cart',
      data: {
        cart
      }
    });
  } catch (error: any) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error adding item to cart',
      error: error.message
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemIndex
// @access  Public
export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { itemIndex } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      res.status(400).json({
        status: 'error',
        message: 'Quantity must be at least 1'
      });
      return;
    }

    let cart;
    let cartQuery: any = {};

    if (req.user) {
      cartQuery = { userId: req.user._id };
    } else {
      const sessionId = req.cookies.sessionId;
      if (!sessionId) {
        res.status(404).json({
          status: 'error',
          message: 'Cart not found'
        });
        return;
      }
      cartQuery = { sessionId };
    }

    cart = await Cart.findOne(cartQuery);

    if (!cart) {
      res.status(404).json({
        status: 'error',
        message: 'Cart not found'
      });
      return;
    }

    const index = parseInt(itemIndex, 10);
    if (index < 0 || index >= cart.items.length) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid item index'
      });
      return;
    }

    cart.items[index].quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      status: 'success',
      message: 'Cart item updated',
      data: {
        cart
      }
    });
  } catch (error: any) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating cart item',
      error: error.message
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemIndex
// @access  Public
export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { itemIndex } = req.params;

    let cart;
    let cartQuery: any = {};

    if (req.user) {
      cartQuery = { userId: req.user._id };
    } else {
      const sessionId = req.cookies.sessionId;
      if (!sessionId) {
        res.status(404).json({
          status: 'error',
          message: 'Cart not found'
        });
        return;
      }
      cartQuery = { sessionId };
    }

    cart = await Cart.findOne(cartQuery);

    if (!cart) {
      res.status(404).json({
        status: 'error',
        message: 'Cart not found'
      });
      return;
    }

    const index = parseInt(itemIndex, 10);
    if (index < 0 || index >= cart.items.length) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid item index'
      });
      return;
    }

    cart.items.splice(index, 1);
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      status: 'success',
      message: 'Item removed from cart',
      data: {
        cart
      }
    });
  } catch (error: any) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error removing item from cart',
      error: error.message
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Public
export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let cartQuery: any = {};

    if (req.user) {
      cartQuery = { userId: req.user._id };
    } else {
      const sessionId = req.cookies.sessionId;
      if (!sessionId) {
        res.status(404).json({
          status: 'error',
          message: 'Cart not found'
        });
        return;
      }
      cartQuery = { sessionId };
    }

    await Cart.findOneAndDelete(cartQuery);

    res.status(200).json({
      status: 'success',
      message: 'Cart cleared'
    });
  } catch (error: any) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error clearing cart',
      error: error.message
    });
  }
};