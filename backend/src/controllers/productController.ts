import { Request, Response } from "express";
import Product from "../models/Product";

// @desc    Get all products with search, filters, and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      search,
      category,
      size,
      priceMin,
      priceMax,
      page = "1",
      limit = "10",
    } = req.query;

    // Build query
    const query: any = {};

    // Search by name or description
    if (search) {
      query.$text = { $search: search as string };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by size
    if (size) {
      query.sizes = { $in: [size] };
    }

    // Filter by price range
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) {
        query.price.$gte = parseFloat(priceMin as string);
      }
      if (priceMax) {
        query.price.$lte = parseFloat(priceMax as string);
      }
    }

    // Pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const products = await Product.find(query)
      .limit(limitNum)
      .skip(skip)
      .sort({ createdAt: -1 }); // Get total count for pagination
    const total = await Product.countDocuments(query);

    //success
    res.status(200).json({
      status: "success",
      data: {
        products,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalProducts: total,
          limit: limitNum,
        },
      },
    });
  } catch (error: any) {
    console.error("Get products error:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    //success
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error: any) {
    console.error("Get product by ID error:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// @desc    Create new product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, imageUrl, category, sizes, stock } =
      req.body;

    const product = await Product.create({
      name,
      description,
      price,
      imageUrl,
      category,
      sizes,
      stock,
    });

    //successs
    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: {
        product,
      },
    });
  } catch (error: any) {
    console.error("Create product error:", error);
    res.status(500).json({
      status: "error",
      message: "Error creating product",
      error: error.message,
    });
  }
};

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Product.distinct("category");

    res.status(200).json({
      status: "success",
      data: {
        categories,
      },
    });
  } catch (error: any) {
    console.error("Get categories error:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching categories",
      error: error.message,
    });
  }
};
