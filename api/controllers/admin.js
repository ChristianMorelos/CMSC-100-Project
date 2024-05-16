import { User, Product, OrderTransaction } from "../models/model.js";
import { v4 as uuidv4 } from "uuid";

const getSales = async (req, res) => {
  try {
    // Gets order transactions and product list
    const orderTransactionList = await OrderTransaction.find();
    const productList = await Product.find();

    const productSales = {}; // Initialize empty object {productId: {status: quantity}}

    for (const product of productList) {
      // For every product in productList
      const productId = product.productId; // Gets productId

      // Initializes an object to store quantity by status, with default values as 0
      const salesByStatus = { 0: 0, 1: 0, 2: 0 };

      // Computes total sales and categorizes by status
      orderTransactionList
        .filter((order) => order.productId === productId)
        .forEach((order) => {
          salesByStatus[order.orderStatus] += order.orderQuantity;
        });

      productSales[productId] = salesByStatus; // Adds to the object {productId: {status: quantity}}
    }

    res.json(productSales); // Returns productSales
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  res.json(await User.find());
};

//get orders method
const getOrders = async (req, res) => {
  //get all orders
  res.json(await OrderTransaction.find());
};

//add product method
const addProduct = async (req, res) => {
  //random product id
  var productId = uuidv4();
  //split the random alphanumeric by "-"
  productId = productId.split("-");
  //get the first 8 character string of the random id
  productId = productId[0];

  //check if the product fields are complete
  if (
    req.body.productName &&
    req.body.productDescription &&
    req.body.productType &&
    req.body.productQuantity
  ) {
    try {
      //create new instance of product with the given inputs
      const newProduct = new Product({
        productId: productId,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productType: req.body.productType,
        productQuantity: req.body.productQuantity,
      });
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

const fulfillOrder = async (req, res) => {
  try {
    const { transactionId } = req.body;

    // Find the transaction using the transaction ID
    const transaction = await OrderTransaction.findOne({
      transactionId: transactionId,
      orderStatus: 0,
    });

    if (!transaction) {
      return res
        .status(404)
        .send("Transaction not found or is completed or cancelled.");
    }

    transaction.orderStatus = 1;
    await transaction.save();

    // Find the product associated with this transaction
    const product = await Product.findOne({ productId: transaction.productId });

    let productQuantity = product.productQuantity;
    const orderQuantity = transaction.orderQuantity;

    // dectement product quantity if has enough
    if (productQuantity >= orderQuantity) {
      product.productQuantity -= transaction.orderQuantity;
      await product.save();

      res
        .status(200)
        .send("Order has been fulfilled and product quantity updated.");
      return;
    }

    res.status(400).send("Not enough stock to fulfill the order.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { getSales, getUsers, getOrders, addProduct, fulfillOrder };
