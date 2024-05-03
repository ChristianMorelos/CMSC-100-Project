import { Router } from 'express';
import { getSales, getUsers, addProduct, fulfillOrder } from '../controllers/admin.js';

const adminRouter = Router();

adminRouter.get('/sales', getSales);
adminRouter.get('/users', getUsers);
adminRouter.post('/add-products', addProduct);
adminRouter.post('/order-fulfillment', fulfillOrder);

export default adminRouter;
