import mongoose, { model } from 'mongoose';
import { TProduct } from './products.interface';
const { Schema } = mongoose;

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  tags: {
    type: [String],
    default: [],
  },
  variants: {
    type: [
      {
        type: {
          type: String,
          required: [true, 'Variant type is required'],
        },
        value: {
          type: String,
          required: [true, 'Variant value is required'],
        },
      },
    ],
    required: [true, 'At least one variant is required'],
  },
  inventory: {
    quantity: {
      type: Number,
      required: [true, 'Inventory quantity is required'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
});

export const Product = model<TProduct>('Product', productSchema);
