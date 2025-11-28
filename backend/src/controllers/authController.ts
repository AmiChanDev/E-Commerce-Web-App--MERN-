import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import { generateToken, setTokenCookie } from "../utils/generateToken";
import { AuthRequest } from "../middleware/authMiddleware";

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array(),
      });
      return;
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        status: "error",
        message: "User already exists with this email",
      });
      return;
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id.toString());

    // Set cookie
    setTokenCookie(token, res);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array(),
      });
      return;
    }

    const { email, password } = req.body;

    // Check if user exists and get password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
      return;
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
      return;
    }

    // Generate token
    const token = generateToken(user._id.toString());

    // Set cookie
    setTokenCookie(token, res);

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error during login",
      error: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: "error",
        message: "Not authenticated",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          createdAt: req.user.createdAt,
        },
      },
    });
  } catch (error: any) {
    console.error("Get me error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Clear cookie
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error: any) {
    console.error("Logout error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error during logout",
      error: error.message,
    });
  }
};
