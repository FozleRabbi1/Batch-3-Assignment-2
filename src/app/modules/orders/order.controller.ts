/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderService } from './order.service';
import { orderValidationSchema } from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const validOrderData = orderValidationSchema.parse(orderData);
    const result = await orderService.createOrderFromDB(validOrderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Somthing went wrong',
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    const result = await orderService.getAllOrderFromDB(email as string);
    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Somthing went wrong',
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
};
