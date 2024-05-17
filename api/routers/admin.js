import { Router } from "express";
import {
  getSales,
  getUsers,
  addProduct,
  fulfillOrder,
  deleteProduct,
  getOrders,
} from "../controllers/admin.js";

const adminRouter = Router();

adminRouter.get("/sales", getSales);
adminRouter.get("/users", getUsers);
adminRouter.get("/orders", getOrders);
adminRouter.post("/add-products", addProduct);
adminRouter.post("/remove-product", deleteProduct);
adminRouter.post("/order-fulfillment", fulfillOrder);

export default adminRouter;
