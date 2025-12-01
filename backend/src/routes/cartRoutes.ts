import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController';
import { optionalAuth } from '../middleware/authMiddleware';

const router = express.Router();

// All cart routes support both authenticated and guest users
router.use(optionalAuth);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:itemIndex', updateCartItem);
router.delete('/:itemIndex', removeFromCart);
router.delete('/', clearCart);

export default router;