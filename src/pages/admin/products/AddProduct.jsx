import { useState } from "react";
import "../../../styles/addProduct.css";
export default function AddProduct() {
  const [prodName, setName] = useState("");
  const [prodPrice, setPrice] = useState(0);
  const [prodImg, setImg] = useState("");
  const [prodDesc, setDesc] = useState("");
  const [prodType, setType] = useState(1);
  const [prodQty, setQty] = useState(1);

  //validate fields function
  function validateFields() {
    //check if any of the input fields are empty
    if (prodName == "" || prodDesc == "") {
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
    <div className="addProductContainer">
      <h1 id="title">Add a Product</h1>

      <form id="form-values">
        <div id="form">
          <label className="product-field">Product Name:</label>
          <input
            value={prodName}
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="prodName"
            name="prodName"
            required
          />

          <label className="product-field">Product Price:</label>
          <input
            value={prodPrice}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            id="prodPrice"
            name="prodPrice"
            required
          />

          <label className="product-field">Product Image:</label>
          <input
            value={prodImg}
            type="text"
            onChange={(e) => setImg(e.target.value)}
            id="prodImg"
            name="prodImg"
            required
          />

          <label className="product-field">Product Description:</label>
          <input
            value={prodDesc}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            id="productDesc"
            name="productDesc"
            required
          />

          <label className="product-field">Product Type:</label>
          <input
            value={prodType}
            type="number"
            onChange={(e) => setType(e.target.value)}
            id="prodType"
            name="prodType"
            required
          />

          <label className="product-field">Product Quantity:</label>
          <input
            value={prodQty}
            type="number"
            onChange={(e) => setQty(e.target.value)}
            id="prodQuantity"
            name="prodQuantity"
            required
          />
        </div>
      </form>

      <button id="addProduct" onClick={validateFields}>
        Add Product
      </button>
    </div>
  );
}
