import mongoose from "mongoose";
import { Product } from "../models/model.js";

await mongoose.connect('mongodb://127.0.0.1:27017/cmsc-100-project')

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.send(products)
};

export { getAllProducts };
