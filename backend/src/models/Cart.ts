import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICartItem {
  product: Types.ObjectId;
  size: string;
  quantity: number;
}

export interface ICart extends Document {
  userId?: Types.ObjectId; // Optional for logged-in users
  sessionId?: string; // For guest users
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required']
    },
    size: {
      type: String,
      required: [true, 'Size is required'],
      enum: {
        values: ['S', 'M', 'L', 'XL'],
        message: 'Size must be S, M, L, or XL'
      }
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      default: 1
    }
  },
  { _id: false }
);

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    sessionId: {
      type: String,
      required: false
    },
    items: {
      type: [cartItemSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Ensure either userId or sessionId is present
cartSchema.pre('save', function (next) {
  if (!this.userId && !this.sessionId) {
    return next(new Error('Either userId or sessionId must be provided'));
  }
  next();
});

// Index for quick lookups
cartSchema.index({ userId: 1 });
cartSchema.index({ sessionId: 1 });

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;