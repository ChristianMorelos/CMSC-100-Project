import { Router } from 'express';
import { getAllProducts } from '../controllers/product.js';

const productRouter = Router();

productRouter.get('/', getAllProducts);

export default productRouter;
