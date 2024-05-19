import { Router } from "express";
import {
  getAllProducts,
  sortedGetAllProducts,
} from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/sorted-products", sortedGetAllProducts);
export default productRouter;
