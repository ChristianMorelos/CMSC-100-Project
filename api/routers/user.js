import { Router } from 'express';
import { checkoutOrder, cancelOrder, getOrders, addCart, getCart, editAccount, userInfo } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/info', userInfo);
userRouter.get('/orders', getOrders);
userRouter.get('/get-cart-items', getCart);

userRouter.post('/checkout-order', checkoutOrder);
userRouter.post('/cancel-order', cancelOrder);
userRouter.post('/add-to-cart', addCart);
userRouter.post('/edit-info', editAccount);

export default userRouter;
