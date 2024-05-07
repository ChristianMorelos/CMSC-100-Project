import mongoose from 'mongoose';
import { User, Product, OrderTransaction } from "../models/model.js";

const checkoutOrder = async (req, res) => {
    try {
        const { email, products } = req.body;
        
        // Validate the user email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send('User not found.');
        }

        for (let { id, quantity } of products) {  
            const product = await Product.findOne({ productId: id });

            if (!product) {
                return res.status(404).send(`Product with ID ${id} not found.`);
            }

            if (product.productQuantity < quantity) {
                return res.status(400).send(`Not enough stock for product ID ${id}.`);
            }

            // Decrement the product quantity
            product.productQuantity -= quantity;
            await product.save(); 
            
            // Create a new transaction
            const newTransaction = new OrderTransaction({
                transactionId: new mongoose.Types.ObjectId(),
                productId: id,
                orderQuantity: quantity,  // Ensure `quantity` is correctly used
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

const cancelOrder = (req, res) => {
    // Implement user login logic here
};

const getOrders = (req, res) => {
    // Implement user login logic here
};

export { checkoutOrder, cancelOrder, getOrders }
