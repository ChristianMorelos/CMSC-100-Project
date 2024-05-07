import { OrderTransaction } from "../models/model.js";

const getSales = async (req, res) => {
    // Get Orders
    // Get Products
    // Join Orders and Products
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
