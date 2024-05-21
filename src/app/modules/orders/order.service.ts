import mongoose from 'mongoose';
import { Product } from '../products/products.module';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderFromDB = async (orderData: TOrder) => {
  const id = orderData.productId;
  const exists = await Product.findOne({ _id: id });
  const totalQuantity = exists?.inventory?.quantity - orderData.quantity;
  if (totalQuantity < 0) {
    throw new Error('Insufficient quantity available in inventory');
  }

  if (exists) {
    const result = await Order.create(orderData);
    const objectId = new mongoose.Types.ObjectId(id);
    const result2 = await Product.findOneAndUpdate(
      objectId,
      { $set: { 'inventory.quantity': totalQuantity } },
      {
        new: true,
      },
    );
    return result;
  } else {
    throw new Error('Order not found');
  }
};

export const orderService = {
  createOrderFromDB,
};
