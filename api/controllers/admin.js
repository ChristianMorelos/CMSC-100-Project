import { OrderTransaction, Product } from "../models/model.js";

const getSales = (req, res) => {
  // Implement user login logic here
};

const getUsers = (req, res) => {
  // Implement user login logic here
};

//get orders method
const getOrders = async (req, res) => {
  //get all orders
  res.json(await OrderTransaction.find());
};

//add product method
const addProduct = async (req, res) => {

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
      res.status(200).send({ "product added": true });
    } catch (error) {
      //failure message
      res.send({ "product added": false });
    }
  } else {
    //failure message
    res.send({ "product added": false });
  }
};

const fulfillOrder = (req, res) => {
  // Implement user login logic here
};

export { getSales, getUsers, getOrders, addProduct, fulfillOrder };
