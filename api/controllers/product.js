import mongoose from "mongoose";
import { Product } from "../models/model.js";

const getAllProducts = async (req, res) => {
    res.send(await Product.find())
};

export { getAllProducts };