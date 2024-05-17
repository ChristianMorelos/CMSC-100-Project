import needle from "needle";

// const newUser = {
//   firstName: "John",
//   lastName: "Doe",
//   userType: "customer",
//   email: "john@example.com",
//   password: "password123",
// };

//sample product
// const newProduct = {
//   productId: "313131",
//   productName: "banana",
//   productDescription: "Sweet",
//   productType: 2,
//   productQuantity: 5,
// };

// needle.post("http://localhost:4000/auth/register", newUser, (err, res) => {
//   console.log("Response:", res.body);
// });

// needle.post(
//   "http://localhost:4000/admin/add-products",
//   newProduct,
//   (err, res) => {
//     console.log(res.body);
//   }
// );

// const newUser = {
//     firstName: 'John',
//     lastName: 'Doe',
//     userType: 'customer',
//     email: 'john@example.com',
//     password: 'password123'
// };

// needle.post('http://localhost:4000/auth/register', newUser,
// (err, res) => {
//     console.log('Response:', res.body);
// });

// const fulfillOrder = {
//     transactionId: 'T001'
// }

// needle.post('http://localhost:4000/admin/order-fulfillment', fulfillOrder,
// (err, res) => {
//     console.log('Response', res.body);
// });

// const orders = {
//     email: "john.doe@example.com",
//     products: [
//         { id: "P001", quantity: 2 },
//         { id: "P002", quantity: 1 }
//     ]
// };

// needle.post('http://localhost:4000/user/checkout-order', orders, { json: true },
// (err, res) => {
//     console.log('Response', res.body);
// });

// const order = {
//     transactionId: '663a5b60c572fc6dbb709095'
// }

// needle.post('http://localhost:4000/user/cancel-order', order, { json: true },
// (err, res) => {
//     console.log('Response', res.body);
// });

// const registerData = {
//     firstName: 'John',
//     middleName: 'Q',
//     lastName: 'Doe',
//     userType: 'admin',
//     email: 'john.doe@example.com',
//     password: '123456'
// };

// needle.post('http://localhost:4000/auth/register', registerData, { json: true },
// (err, res) => {
//     console.log('Response', res.body);
// });

const loginData = {
    email: 'john.doe@example.com',
    password: '123456'
};

// needle.post('http://localhost:4000/auth/login', loginData, { json: true },
// (err, res) => {
//     console.log('Response', res.body);
// });

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ2ZjQ2ZDkzMjQzMzk3MWY3YmMzNzYiLCJpYXQiOjE3MTU5MjY1MjcsImV4cCI6MTcxNTkzMDEyN30.DKc72GF4Re4c-6HITW5MTDLaTKyWIw60FSEugUZrniU'
const bearer = `Bearer ${token}`;
needle(
  "post",
  "http://localhost:4000/auth/authenticate",
  { headers:{
    'authorization': [],
    "Accept": "application/json"
  }},
  (err, res) => {
    console.log(res);
});

// needle.post('http://localhost:4000/auth/login', loginData, { json: true },
// (err, res) => {
//     console.log('Response', res.body);
// });

// const email = "john.doe@example.com";

// needle.get(`http://localhost:4000/user/orders?email=${email}`, (err, res) => {
//   console.log("Response", res.body);
// });
