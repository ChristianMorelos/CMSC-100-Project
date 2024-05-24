import { useState } from "react";
import "../../../styles/AddProduct.css";
export default function AddProduct({
  setName,
  setPrice,
  setImg,
  setDesc,
  setType,
  setQty,
  prodName,
  prodPrice,
  prodImg,
  prodDesc,
  prodType,
  prodQty,
}) {
  //validate fields function
  function validateFields() {
    //check if any of the input fields are empty
    if (prodName == "" || prodDesc == "" || prodImg == "" || prodPrice == 0) {
      //alert message for incomplete fields
      alert("Please fill out all of the fields first");
      return;
    }

    //print validated fields
    console.log("Product Name: " + prodName);
    console.log("Product Description: " + prodDesc);
    console.log("Product Type: " + prodType);
    console.log("Product Quantity: " + prodQty);
    console.log("Product Price: " + prodPrice);

    const product = {
      productName: prodName,
      productPrice: prodPrice,
      productImg: prodImg,
      productDescription: prodDesc,
      productType: prodType,
      productQuantity: prodQty,
    };

    fetch("http://localhost:4000/admin/add-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => response.text())
      .then((body) => {
        console.log(body);
      });

    //reset values
    setName("");
    setImg("");
    setPrice(0);
    setDesc("");
    setType(1);
    setQty(1);
  }

  return (
    <div className="add-product-page">
      <div className="add-product-box">
        <h4>Add Product</h4>
        <form>
          <div className="input-div">
            <label>Product Name:</label>
            <input
              value={prodName}
              type="text"
              onChange={(e) => setName(e.target.value)}
              id="prodName"
              name="prodName"
              required
            />
          </div>
          <div className="input-div">
            <label>Product Image Link:</label>
            <input
              value={prodImg}
              type="text"
              onChange={(e) => setImg(e.target.value)}
              id="prodImg"
              name="prodImg"
              required
            />
          </div>
          <div className="input-div">
            <label>Product Price:</label>
            <input
              value={prodPrice}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              id="prodPrice"
              name="prodPrice"
              min="0"
              required
            />
          </div>
          <div className="input-div">
            <label>Product Type:</label>
            <input
              value={prodType}
              type="number"
              onChange={(e) => setType(e.target.value)}
              id="prodType"
              name="prodType"
              required
            />
          </div>
          <div className="input-div">
            <label>Product Description:</label>
            <textarea
              value={prodDesc}
              onChange={(e) => setDesc(e.target.value)}
              id="productDesc"
              name="productDesc"
              required
            />
          </div>
          <div className="input-div">
            <label>Product Quantity:</label>
            <input
              value={prodQty}
              type="number"
              onChange={(e) => setQty(e.target.value)}
              id="prodQuantity"
              name="prodQuantity"
              min="0"
              required
            />
          </div>
        </form>
        <button id="addProduct" onClick={validateFields}>
          ADD PRODUCT
        </button>
      </div>
    </div>
  );
}
