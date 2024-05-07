import { User, Product, OrderTransaction } from "../models/model.js";

const getSales = (req, res) => {
    // Implement user login logic here
};

const getUsers = (req, res) => {
    // Implement user login logic here
};

const getOrders = (req, res) => {
    // Implement user login logic here
};

const addProduct = (req, res) => {
    // Implement user login logic here
};

const fulfillOrder = async (req, res) => {
    try {
        const { transactionId } = req.body;

        // Find the transaction using the transaction ID
        const transaction = await OrderTransaction.findOne({transactionId: transactionId, orderStatus: 0});
        
        if (!transaction) {
            return res.status(404).send('Transaction not found or is completed or cancelled.');
        }

        transaction.orderStatus = 1;
        await transaction.save();

        // Find the product associated with this transaction
        const product = await Product.findOne({productId: transaction.productId});
        
        let productQuantity = product.productQuantity;
        const orderQuantity = transaction.orderQuantity;

        // dectement product quantity if has enough
        if (productQuantity >= orderQuantity) {

            product.productQuantity -= transaction.orderQuantity;
            await product.save();

            res.status(200).send('Order has been fulfilled and product quantity updated.');
            return 
        }

        res.status(400).send('Not enough stock to fulfill the order.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { getSales, getUsers, getOrders, addProduct, fulfillOrder };
