import { Router } from 'express';
import { ProductController } from './products/products.controller';
import { orderController } from './orders/order.controller';

const router = Router();

router.get('/products/:productId', ProductController.getSingleProduct);
router.put('/products/:productId', ProductController.updateSingleProduct);
router.delete('/products/:productId', ProductController.deleteSingleProduct);
router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getAllProduct);

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrder);

export const ProductsRoute = router;
