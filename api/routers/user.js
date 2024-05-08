import { Router } from 'express';
import { checkoutOrder, cancelOrder, getOrders } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/orders', getOrders);
userRouter.post('/checkout-order', checkoutOrder);
userRouter.post('/cancel-order', cancelOrder);

export default userRouter;
