import mongoose from "mongoose";
import { User, Product, Cart, OrderTransaction } from "../models/model.js";

const checkoutOrder = async (req, res) => {
  try {
    const { email, products } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    for (let { id, quantity } of products) {
      const product = await Product.findOne({ productId: id });

      if (!product) {
        return res.status(404).send(`Product with ID ${id} not found.`);
      }

      const newTransaction = new OrderTransaction({
        transactionId: new mongoose.Types.ObjectId(),
        productId: id,
        orderQuantity: quantity,
        orderStatus: 0,
        email: email,
        dateOrdered: new Date(),
        time: new Date().toLocaleTimeString(),
      });

      await newTransaction.save();
    }

    await Cart.deleteMany({ email: email });  //clears the cart
    res.status(200).send("All orders have been processed successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const order = await OrderTransaction.findOne({
      transactionId: transactionId,
    });

    if (!order) {
      return res.status(404).send("Order not found.");
    }

    if (order.orderStatus === 1) {
      return res.status(400).send("Cannot cancel a completed order.");
    }

    order.orderStatus = 3;
    await order.save();

    res.status(200).send("Order has been successfully canceled.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOrders = async (req, res) => {
  try {
    const { email } = req.query;
    res.status(200).json(await OrderTransaction.find({ email: email }));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCart = async (req, res) => {
  try {
    const { email } = req.query;
    const items = await Cart.find({ email: email });

    const cart = [];
    for (let { productId, quantity } of items) {
      const { productName, productDescription, productImg, productPrice, productType } =
        await Product.findOne({ productId: productId });

      const cartItem = {
        productId: productId,
        productName: productName,
        productDescription: productDescription,
        productImg: productImg,
        productPrice: productPrice,
        productType: productType,
        productQuantity: quantity
      };
      cart.push(cartItem);
    }

    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { email, productId } = req.body;
    await Cart.deleteOne({ email: email, productId: productId });
    res.status(200).send("Item deleted from cart");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { email, productId, newQuantity } = req.body;

    if (newQuantity === 0) {
      await deleteCartItem(req, res);
    } else {
      await Cart.updateOne(
        { email: email, productId: productId },
        { $set: { quantity: newQuantity } }
      );
      res.status(200).send("Item quantity updated in cart");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addCart = async (req, res) => {
  try {
    const { email, productId, productImg, productPrice, quantity } = req.body;

    const existingCartItem = await Cart.findOne({ email: email, productId: productId });

    if (existingCartItem) {
      await Cart.updateOne(
        { email: email,
          productId: productId },
        {
          $set: {
            quantity: existingCartItem.quantity + quantity
          }
        }
      );
    } else {
      const newCart = new Cart({
        email: email,
        productId: productId,
        productImg: productImg,
        productPrice: productPrice,
        quantity: quantity,
      });
  
      await newCart.save();
    }

    res.status(200).send("Item added to cart");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editAccount = async (req, res) => {
  try {
    const { userEmail, firstName, middleName, lastName, email } = req.body;

    if (!firstName || !middleName || !lastName || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await User.updateOne(
      { email: userEmail },
      {
        $set: {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          email: email,
        },
      }
    );

    res.status(200).send("User information updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const userInfo = async (req, res) => {
  try {
    res.status(200).json(await User.findOne({ email: req.query.email }));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export {
  checkoutOrder,
  cancelOrder,
  getOrders,
  addCart,
  getCart,
  deleteCartItem,
  updateCartItemQuantity,
  editAccount,
  userInfo,
};
