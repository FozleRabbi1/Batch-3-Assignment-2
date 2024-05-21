/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { productValidationSchema } from './products.validation';
import { ProductService } from './products.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseData = productValidationSchema.parse(productData);
    const result = await ProductService.createStudentFromDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Somthing went wrong',
      data: error,
    });
  }
};

export const ProductController = {
  createProduct,
};
