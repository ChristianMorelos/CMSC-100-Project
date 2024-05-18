import { Router } from 'express';
import { checkoutOrder, cancelOrder, getOrders, addCart, getCart } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/orders', getOrders);
userRouter.get('/get-cart-items', getCart);

userRouter.post('/checkout-order', checkoutOrder);
userRouter.post('/cancel-order', cancelOrder);
userRouter.post('/add-to-cart', addCart);

export default userRouter;
