import mongoose from 'mongoose';

const User = mongoose.model('User', {
    firstName: String,
    middleName: String,
    lastName: String,
    userType: String,
    email: String,
    password: String
}, 'users');

const Product = mongoose.model('Product', {
    productId: String,
    productName: String,
    productPrice: Number,
    productDescription: String,
    productType: Number,
    productQuantity: Number
}, 'products');


const OrderTransaction = mongoose.model('OrderTransaction', {
    transactionId: String,
    productId: String,
    orderQuantity: Number,
    orderStatus: Number,
    email: String,
    dateOrdered: Date,
    time: String
}, 'orderTransactions');

export { User, Product, OrderTransaction };
