import { Router } from 'express';
import { ProductController } from './products.controller';

const router = Router();

router.get('/products/:productId', ProductController.getSingleProduct);
router.put('/products/:productId', ProductController.updateSingleProduct);
router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getAllProduct);

export const ProductsRoute = router;
