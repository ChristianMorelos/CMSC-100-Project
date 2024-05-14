import { Router } from 'express';
import { getAllProducts } from '../controllers/product.js';

const productRouter = Router();

productRouter.get('/products', getAllProducts);

export default productRouter;
