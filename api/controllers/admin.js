import { OrderTransaction, Product } from "../models/model.js";

const getSales = (req, res) => {
  // Implement user login logic here
};

const getUsers = (req, res) => {
  // Implement user login logic here
};

const getOrders = (req, res) => {
  // Implement user login logic here
};

//add product method
const addProduct = async (req, res) => {
  // Implement user login logic here

  //check if the product fields are complete
  if (
    req.body.productId &&
    req.body.productName &&
    req.body.productDescription &&
    req.body.productType &&
    req.body.productQuantity
  ) {
    try {
      //create new instance of product with the given inputs
      const newProduct = new Product(req.body);
      //save product to the database
      await newProduct.save();

      //success message
      res.json({ "product added": true });
    } catch (error) {
      //failure message
      res.json({ "product added": false });
    }
  } else {
    //failure message
    //failure message
    res.json({ "product added": false });
  }
};

const fulfillOrder = (req, res) => {
  // Implement user login logic here
};

export { getSales, getUsers, getOrders, addProduct, fulfillOrder };
