import { TProduct } from './products.interface';
import { Product } from './products.module';

const createStudentFromDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

export const ProductService = {
  createStudentFromDB,
};
