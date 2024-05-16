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

  return (
    <div className="admin-products">
      <div className="addProduct">
        <AddProduct></AddProduct>
      </div>
      <div className="productContainer">
        {products.map((product) => (
          //product div containing image, name, price, and an add button
          <div className="product">
            <img src={product.image} alt={product.name}></img>
            <h2>{product.productName}</h2>
            <p>${product.productDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
