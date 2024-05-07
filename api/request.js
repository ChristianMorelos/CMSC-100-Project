import needle from 'needle';

// const newUser = {
//     firstName: 'John',
//     lastName: 'Doe',
//     userType: 'customer',
//     email: 'john@example.com',
//     password: 'password123'
// };

// needle.post('http://localhost:3000/auth/register', newUser, 
// (err, res) => {
//     console.log('Response:', res.body);
// });

// const fulfillOrder = {
//     transactionId: 'T001'
// }

// needle.post('http://localhost:3000/admin/order-fulfillment', fulfillOrder,
// (err, res) => {
//     console.log('Response', res.body);
// });

const orders = {
    email: "john.doe@example.com",
    products: [
        { id: "P001", quantity: 2 },
        { id: "P002", quantity: 1 }
    ]
};

needle.post('http://localhost:3000/user/checkout-order', orders, { json: true },
(err, res) => {
    console.log('Response', res.body);
});