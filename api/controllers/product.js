import mongoose from "mongoose";
import { Product } from "../models/model.js";

await mongoose.connect("mongodb://127.0.0.1:27017/cmsc-100-project");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.send(products);
};

const sortedGetAllProducts = async (req, res) => {
  if (req.query.sortBy === "name" && req.query.sortType === "asc") {
    const products = await Product.find().sort({ productName: 1 });
    res.send(products);
  }

  if (req.query.sortBy === "name" && req.query.sortType === "desc") {
    const products = await Product.find().sort({ productName: -1 });
    res.send(products);
  }

  if (req.query.sortBy === "type" && req.query.sortType === "asc") {
    const products = await Product.find().sort({ productType: 1 });
    res.send(products);
  }

  if (req.query.sortBy === "type" && req.query.sortType === "desc") {
    const products = await Product.find().sort({ productType: -1 });
    res.send(products);
  }

  if (req.query.sortBy === "price" && req.query.sortType === "asc") {
    const products = await Product.find().sort({ productPrice: 1 });
    res.send(products);
  }

  if (req.query.sortBy === "price" && req.query.sortType === "desc") {
    const products = await Product.find().sort({ productPrice: -1 });
    res.send(products);
  }

  if (req.query.sortBy === "quantity" && req.query.sortType === "asc") {
    const products = await Product.find().sort({ productQuantity: 1 });
    res.send(products);
  }

  if (req.query.sortBy === "quantity" && req.query.sortType === "desc") {
    const products = await Product.find().sort({ productQuantity: -1 });
    res.send(products);
  }
};

export { getAllProducts, sortedGetAllProducts };
