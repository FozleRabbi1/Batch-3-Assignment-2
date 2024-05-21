/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { productValidationSchema } from './products.validation';
import { ProductService } from './products.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseData = productValidationSchema.parse(productData);
    const result = await ProductService.createProductFromDB(zodParseData);
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

const getAllProduct = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  try {
    const result = await ProductService.getAllProductsFromDB(
      searchTerm as string,
    );
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const result = await ProductService.getSingleProductFromDB(
      productId as string,
    );
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

const updateSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const data = req.body;

  try {
    const result = await ProductService.updateSIngleProductFromDB(
      productId as string,
      data,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
};
