import mongoose from 'mongoose';
import { User, Product, Cart, OrderTransaction } from "../models/model.js";

const checkoutOrder = async (req, res) => {
    try {
        const { email, products } = req.body;
        
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send('User not found.');
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
                time: new Date().toLocaleTimeString()
            });

            await newTransaction.save();
        }

        res.status(200).send("All orders have been processed successfully.");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { transactionId } = req.body; 
        const order = await OrderTransaction.findOne({ transactionId: transactionId });
        
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
        res.json(await OrderTransaction.find({ email: email }));      

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
            const {productName, productDescription, productType } = await Product.findOne({ productId: productId });

            const cartItem = {
                productId: productId,
                productName: productName,
                productDescription: productDescription,
                productType: productType,
                productQuantity: quantity,
            };
            console.log(cartItem);
            cart.push(cartItem);
        }

        res.status(200).send(cart);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const addCart = async (req, res) => {
    try {
        
        const { email, productId, quantity } = req.body; 

        const newCart = new Cart({
            email: email,
            productId: productId,
            quantity: quantity
        })

        await newCart.save();
        res.status(200).send("Item added to cart");

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { checkoutOrder, cancelOrder, getOrders, addCart, getCart }
