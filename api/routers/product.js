import { Router } from "express";
import { getAllProducts, getProduct } from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/find-product", getProduct);
export default productRouter;
