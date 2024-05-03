import { Router } from "express";
import { checkoutOrder, cancelOrder, getOrders } from "../controllers/user.js";

const router = Router();

router.post('/user/checkout-order', user.checkoutOrder);
router.delete('/user/cancel-order', user.cancelOrder);
router.get('/user/orders', user.getOrders);

export default router;