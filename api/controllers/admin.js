import { User, Product, OrderTransaction } from "../models/model.js";
import { v4 as uuidv4 } from "uuid";

const getSales = async (req, res) => {
  try {
    const start = new Date(req.query.start);
    const end = new Date(req.query.end);

    // Get order transactions with orderStatus = 1 (all-time)
    const orderTransactionListAllTime = await OrderTransaction.find({
      orderStatus: 1,
    });

    // Filter order transactions within the specified date range
    const orderTransactionListWithinDates = orderTransactionListAllTime.filter(
      (order) => {
        return order.dateOrdered >= start && order.dateOrdered <= end;
      }
    );

    // Get all products
    const productList = await Product.find();

    // Initialize an empty array to store product sales information
    let productSales = [];

    const productTypes = {
      1: "Staple",
      2: "Fruits and Vegetables",
      3: "Livestock",
      4: "Seafood",
      5: "Others",
    };

    // Loop through each product
    for (const product of productList) {
      // Filter order transactions for the current product and within the specified dates
      const ordersWithinDatesForProduct =
        orderTransactionListWithinDates.filter(
          (order) => order.productId === product.productId
        );

      // Calculate sales quantity and sales income for the product within the specified dates
      const periodSold = ordersWithinDatesForProduct.reduce(
        (acc, order) => acc + order.orderQuantity,
        0
      );
      const periodSales = ordersWithinDatesForProduct.reduce(
        (acc, order) => acc + order.orderQuantity * product.productPrice,
        0
      );

      // Calculate total sold and total income for the product (all-time)
      const totalSold = orderTransactionListAllTime
        .filter((order) => order.productId === product.productId)
        .reduce((acc, order) => acc + order.orderQuantity, 0);
      const totalSales = orderTransactionListAllTime
        .filter((order) => order.productId === product.productId)
        .reduce(
          (acc, order) => acc + order.orderQuantity * product.productPrice,
          0
        );

      // Construct product sales object
      const productSale = {
        id: product.productId,
        image:
          "https://cdn.britannica.com/17/196817-159-9E487F15/vegetables.jpg",
        name: product.productName,
        type: productTypes[product.productType],
        periodSold,
        periodSales,
        unitPrice: product.productPrice,
        totalSold,
        totalSales,
      };

      // Push product sales object to the productSales array
      productSales.push(productSale);
    }

    // Send the product sales information as response
    res.json(productSales);
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
    req.body.productPrice &&
    req.body.productImg &&
    req.body.productDescription &&
    req.body.productType &&
    req.body.productQuantity
  ) {
    try {
      //create new instance of product with the given inputs
      const newProduct = new Product({
        productId: productId,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productImg: req.body.productImg,
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

//delete product method
const deleteProduct = async (req, res) => {
  //remove product using product id
  const removeProduct = await Product.deleteOne({
    productId: req.body.productId,
  });

  //response message
  res.send(removeProduct);
};

//edit product method
const editProduct = async (req, res) => {
  //edit product with the given product id
  const editOne = await Product.updateOne(
    { productId: req.body.productId },
    {
      $set: {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productImg: req.body.productImg,
        productDescription: req.body.productDescription,
        productType: req.body.productType,
        productQuantity: req.body.productQuantity,
      },
    }
  );

  //response message
  res.send(editOne);
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

export {
  getSales,
  getUsers,
  getOrders,
  addProduct,
  deleteProduct,
  editProduct,
  fulfillOrder,
};
