// Product Listing
import "../../styles/addProduct.css";
import { useEffect, useState } from "react";
import AddProduct from "./products/AddProduct";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products/")
      .then((response) => response.json())
      .then((body) => {
        setProducts(body);
      });
  });

  //delete product function
  function deleteProduct(product) {
    fetch("http://localhost:4000/admin/remove-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product }),
    })
      .then((response) => response.text())
      .then((body) => {
        console.log(body);
      });
  }

  return (
    <div className="admin-products">
      <div className="addProduct">
        <AddProduct></AddProduct>
      </div>
      <div className="productContainer">
        {products.map((product) => (
          //product div containing image, name, price, and an add button
          <div key={product.productId} className="product">
            <img src={product.image} alt={product.name}></img>
            <h2>{product.productName}</h2>
            <p>Description: {product.productDescription}</p>
            <p>Type: {product.productType}</p>
            <p>Quantity: {product.productQuantity}</p>

            <button
              className="deleteProduct"
              onClick={() => {
                deleteProduct(product.productId);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
