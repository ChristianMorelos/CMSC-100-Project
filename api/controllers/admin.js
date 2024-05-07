import { User, Product, OrderTransaction } from "../models/model.js";

const getSales = async (req, res) => {
    try {
        const orderTransactionList = await OrderTransaction.find();
        const productList = await Product.find();

        const productSales = {};

        for (const product of productList) {
            const productId = product.productId;
            const totalSales = orderTransactionList
                .filter(order => order.productId === productId)
                .reduce((sales, order) => sales + order.orderQuantity, 0);
            productSales[productId] = totalSales;
        }

        res.json(productSales);
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
