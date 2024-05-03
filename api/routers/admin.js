import { Router } from "express";
import { getSales, getUsers, getOrders, addProduct, fulfillOrder} from "../controllers/admin.js";

const router = Router();

router.get('/admin/sales', getSales);
router.get('/admin/users', getUsers);
router.get('/admin/orders', getOrders);
router.post('/admin/add-products', addProduct);
router.post('/admin/order-fulfillment', fulfillOrder);

export default router;