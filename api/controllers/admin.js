import { User, Product, OrderTransaction } from "../models/model.js";

const getSales = async (req, res) => {
    try {
        // Gets order transactions and product list
        const orderTransactionList = await OrderTransaction.find();
        const productList = await Product.find();     

        const productSales = {};    // Initialize empty object {productId: {status: quantity}}

        for (const product of productList) {    // For every product in productList
            const productId = product.productId;  // Gets productId

            // Initializes an object to store quantity by status, with default values as 0
            const salesByStatus = { 0: 0, 1: 0, 2: 0 }; 

            // Computes total sales and categorizes by status
            orderTransactionList.filter(order => order.productId === productId)
                .forEach(order => {
                    salesByStatus[order.orderStatus] += order.orderQuantity;
                });

            productSales[productId] = salesByStatus; // Adds to the object {productId: {status: quantity}}
        }

        res.json(productSales);     // Returns productSales

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const getUsers = async (req, res) => {
    res.json(await User.find());
};

const getOrders = (req, res) => {
    // Implement user login logic here
};

const addProduct = (req, res) => {
    // Implement user login logic here
};

const fulfillOrder = (req, res) => {
    // Implement user login logic here
};

export { getSales, getUsers, getOrders, addProduct, fulfillOrder };
