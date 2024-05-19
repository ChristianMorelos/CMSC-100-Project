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
//   firstName: "John",
//   middleName: "De",
//   lastName: "Doe",
//   userType: "customer",
//   email: "john.doe@example.com",
//   password: "password123",
// };

// const newUser = {
//   firstName: "Jonathan",
//   middleName: "De",
//   lastName: "Cray",
//   userType: "customer",
//   email: "jonathan@example.com",
//   password: "password123",
// };

// needle.post("http://localhost:4000/auth/register", newUser, (err, res) => {
//   console.log("Response:", res.body);
// });

// const fulfillOrder = {
//   transactionId: "T001",
// };

// needle.post(
//   "http://localhost:4000/admin/order-fulfillment",
//   fulfillOrder,
//   (err, res) => {
//     console.log("Response", res.body);
//   }
// );

const orders = {
  email: "john.doe@example.com",
  products: [
    { id: "6", quantity: 5 },
    { id: "2", quantity: 6 },
    { id: "3", quantity: 2 },
    { id: "4", quantity: 6 },
    { id: "8", quantity: 1 },
    { id: "1", quantity: 1 },
  ],
};

needle.post(
  "http://localhost:4000/user/checkout-order",
  orders,
  { json: true },
  (err, res) => {
    console.log("Response", res.body);
  }
);

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

// const loginData = {
//     email: 'john.doe@example.com',
//     password: '123456'
// };

// needle.post('http://localhost:4000/auth/login', loginData, { json: true },
// (err, res) => {
//     console.log('Response', res.body);
// });

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ2ZjQ2ZDkzMjQzMzk3MWY3YmMzNzYiLCJpYXQiOjE3MTU5MjY1MjcsImV4cCI6MTcxNTkzMDEyN30.DKc72GF4Re4c-6HITW5MTDLaTKyWIw60FSEugUZrniU'
// const bearer = `Bearer ${token}`;
// needle(
//   "post",
//   "http://localhost:4000/auth/authenticate",
//   { headers:{
//     'authorization': [],
//     "Accept": "application/json"
//   }},
//   (err, res) => {
//     console.log(res);
// });

// needle.post("http://localhost:4000/auth/authenticate",
//   { headers:{
//     'Authorization': bearer,
//     "Accept": "application/json"
//   }},
//   (err, res) => {
//     console.log(res);
// });

// const email = "john.doe@example.com";

// needle.get(`http://localhost:4000/user/orders?email=${email}`, (err, res) => {
//   console.log(res.body);
// });

// const cartData = {
//   email: 'jane.smith@example.com',
//   productId: 'P002',
//   quantity: '100'
// }

// needle.post('http://localhost:4000/user/add-to-cart', cartData, { json: true },
// (err, res) => {
//     console.log('Response', res.body);
// });

// const email = 'jane.smith@example.com';

// needle.get(`http://localhost:4000/user/get-cart-items?email=${email}`, (err, res) => {
//     console.log(res.body);
// });

// const newInfo = {
//   email: 'jane.smith@example.com',
//   productId: 'P002',
//   quantity: '100'
// }

// needle.post('http://localhost:4000/user/add-to-cart', cartData, { json: true },
// (err, res) => {
//     console.log('Response', res.body);
// });

// const currentEmail = "fdmorelos@up.edu.ph";

// needle.get(
//   `http://localhost:4000/user/info?email=${currentEmail}`,
//   (err, res) => {
//     console.log(res.body);
//   }
// );
