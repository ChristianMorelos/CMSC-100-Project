import { Router } from 'express';
import { checkoutOrder, cancelOrder, getOrders as getUserOrders } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/orders', getUserOrders);
userRouter.post('/checkout-order', checkoutOrder);
userRouter.delete('/cancel-order', cancelOrder);

export default userRouter;
