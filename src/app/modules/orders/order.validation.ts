import { z } from 'zod';

const OrderSchema = z.object({
  email: z.string().email({ message: 'Please fill a valid email address' }),
  productId: z.string(),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

export const orderValidationSchema = OrderSchema;
