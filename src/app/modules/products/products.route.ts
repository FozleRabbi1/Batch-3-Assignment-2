import { Router } from 'express';
import { ProductController } from './products.controller';

const router = Router();

router.post('/products', ProductController.createProduct);

export const ProductsRoute = router;
