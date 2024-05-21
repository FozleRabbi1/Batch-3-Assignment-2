import { z } from 'zod';

const TVariantValidationSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

const TInventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(1, { message: 'Inventory quantity must be at least 1' }),
  inStock: z.boolean().default(true),
});

const TProductValidationSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required' }),
  price: z
    .number()
    .positive({ message: 'Product price must be greater than 0' }),
  category: z.string().min(1, { message: 'Product category is required' }),
  tags: z.array(z.string()).default([]),
  variants: z
    .array(TVariantValidationSchema)
    .min(1, { message: 'At least one variant is required' }),
  inventory: TInventoryValidationSchema,
});

export const productValidationSchema = TProductValidationSchema;
