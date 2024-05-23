import { Router } from 'express';
import { checkoutOrder, cancelOrder, getOrders, addCart, getCart, editAccount, userInfo, deleteCartItem, updateCartItemQuantity, confirmPassword } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/info', userInfo);
userRouter.get('/orders', getOrders);
userRouter.get('/get-cart-items', getCart);

userRouter.post('/confirm-password', confirmPassword);
userRouter.post('/checkout-order', checkoutOrder);
userRouter.post('/cancel-order', cancelOrder);
userRouter.post('/add-to-cart', addCart);
userRouter.post('/edit-info', editAccount);
userRouter.post('/delete-cart-item', deleteCartItem);
userRouter.post('/update-cart-quantity', updateCartItemQuantity)

export default userRouter;
