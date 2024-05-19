import mongoose from "mongoose";
import { Product } from "../models/model.js";

await mongoose.connect("mongodb://127.0.0.1:27017/cmsc-100-project");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.send(products);
};

//sorted version of getAllProducts
const sortedGetAllProducts = async (req, res) => {
  //name asc
  if (req.query.sortBy === "name" && req.query.sortType === 1) {
    const products = await Product.find().sort({ productName: 1 });
    res.send(products);
  }
  //name desc
  else if (req.query.sortBy === "name" && req.query.sortType === -1) {
    const products = await Product.find().sort({ productName: -1 });
    res.send(products);
  }
  //type asc
  else if (req.query.sortBy === "type" && req.query.sortType === 1) {
    const products = await Product.find().sort({ productType: 1 });
    res.send(products);
  }
  //type desc
  else if (req.query.sortBy === "type" && req.query.sortType === -1) {
    const products = await Product.find().sort({ productType: -1 });
    res.send(products);
  }
  //price asc
  else if (req.query.sortBy === "price" && req.query.sortType === 1) {
    const products = await Product.find().sort({ productPrice: 1 });
    res.send(products);
  }
  //price desc
  else if (req.query.sortBy === "price" && req.query.sortType === -1) {
    const products = await Product.find().sort({ productPrice: -1 });
    res.send(products);
  }
  //quantity asc
  else if (req.query.sortBy === "quantity" && req.query.sortType === 1) {
    const products = await Product.find().sort({ productQuantity: 1 });
    res.send(products);
  }
  //quantity desc
  else if (req.query.sortBy === "quantity" && req.query.sortType === -1) {
    const products = await Product.find().sort({ productQuantity: -1 });
    res.send(products);
  } else {
    //no sort
    const products = await Product.find({});
    res.send(products);
  }
};

export { getAllProducts, sortedGetAllProducts };
