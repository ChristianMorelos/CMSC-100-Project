import needle from "needle";

const newUser = {
  firstName: "John",
  lastName: "Doe",
  userType: "customer",
  email: "john@example.com",
  password: "password123",
};

//sample product
const newProduct = {
  productId: "525242",
  productName: "Apple",
  productDescription: "Sweet",
  productType: 2,
  productQuantity: 5,
};

needle.post("http://localhost:3000/auth/register", newUser, (err, res) => {
  console.log("Response:", res.body);
});

needle.post(
  "http://localhost:3000/admin/add-products",
  newProduct,
  (err, res) => {
    console.log(res.body);
  }
);
