import { Product } from '../products/products.module';
import { TOrder } from './order.interface';
import { Order } from './order.model';

// const createOrderFromDB = async (orderData: TOrder) => {
//   const id = orderData.productId;
//   const exists = await Product.findOne({ _id: id });
//   const totalQuantity = exists?.inventory.quantity - orderData.quantity;
//   if (totalQuantity < 0) {
//     throw new Error('Insufficient quantity available in inventory');
//   }
//   if (exists) {
//     const result = await Order.create(orderData);
//     const objectId = new mongoose.Types.ObjectId(id);
//     await Product.findOneAndUpdate(
//       objectId,
//       { $set: { 'inventory.quantity': totalQuantity } },
//       {
//         new: true,
//       },
//     );
//     return result;
//   } else {
//     throw new Error('Order not found');
//   }
// };

const createOrderFromDB = async (orderData: TOrder) => {
  const product = await Product.findById(orderData.productId);
  if (product) {
    const totalQuantity = product.inventory.quantity - orderData.quantity;
    if (totalQuantity < 0) {
      throw new Error('Insufficient quantity available in inventory');
    }
    product.inventory.quantity = totalQuantity;
    product.inventory.inStock = totalQuantity > 0;
    await product.save();
    const result = await Order.create(orderData);
    return result;
  } else {
    throw new Error('Order not found');
  }
};

const getAllOrderFromDB = async (email: string) => {
  const searchEmail = new RegExp(email, 'i');
  const result = await Order.find({ email: { $regex: searchEmail } });
  return result;
};

export const orderService = {
  createOrderFromDB,
  getAllOrderFromDB,
};
