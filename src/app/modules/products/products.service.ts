import mongoose from 'mongoose';
import { TProduct } from './products.interface';
import { Product } from './products.module';

const createProductFromDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async (searchTerm: string) => {
  const searchData = new RegExp(searchTerm, 'i');
  const result = await Product.find({
    $or: [
      { name: { $regex: searchData } },
      { category: { $regex: searchData } },
      { description: { $regex: searchData } },
    ],
  });
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await Product.aggregate([{ $match: { _id: objectId } }]);
  return result;
};

const updateSIngleProductFromDB = async (id: string, updatedData: TProduct) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await Product.findOneAndUpdate(objectId, updatedData, {
    new: true,
  });
  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await Product.deleteOne({ _id: objectId });
  return result;
};

export const ProductService = {
  createProductFromDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSIngleProductFromDB,
  deleteSingleProductFromDB,
};
