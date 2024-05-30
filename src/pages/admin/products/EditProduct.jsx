import { useState } from "react";
import "../../../styles/AddProduct.css";

export default function EditProduct({ setEdit, prodDet }) {
  //details
  const [prodName, setName] = useState(prodDet.productName);
  const [prodPrice, setPrice] = useState(prodDet.productPrice);
  const [prodImg, setImg] = useState(prodDet.productImg);
  const [prodDesc, setDesc] = useState(prodDet.productDescription);
  const [prodType, setType] = useState(prodDet.productType);
  const [prodQty, setQty] = useState(prodDet.productQuantity);

  //edit product function
  function editProduct() {
    //check if any of the input fields are empty
    if (prodName == "" || prodDesc == "" || prodImg == "") {
      //alert message for incomplete fields
      alert("Please fill out all of the fields first");
      return;
    }

    //validation for price
    if (prodPrice <= 0) {
      alert("Please enter a valid price");
      return;
    }

    //validation for product type
    if (prodType > 5 || prodType < 1) {
      alert("Please enter a valid product type from 1-5");
      return;
    }

    //validation for product quantity
    if (prodQty < 0) {
      alert("Please enter a valid product quantity");
      return;
    }

    //print validated fields
    console.log("Product Name: " + prodName);
    console.log("Product Description: " + prodDesc);
    console.log("Product Type: " + prodType);
    console.log("Product Quantity: " + prodQty);
    console.log("Product Price: " + prodPrice);

    fetch("http://localhost:4000/admin/edit-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: prodDet.productId,
        productName: prodName,
        productPrice: prodPrice,
        productImg: prodImg,
        productDescription: prodDesc,
        productType: prodType,
        productQuantity: prodQty,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit product");
        }

        //alert message for sucess
        alert("Product edited successfully");
        return response.text();
      })
      .then((body) => {
        console.log(body);
      });
  }

  const productTypes = {
    1: "Staple",
    2: "Fruits and Vegetables",
    3: "Livestock",
    4: "Seafood",
    5: "Others",
  };

  return (
    <div className="editPage">
      <div className="edit-product-box">
        <div className="edit-head">
          <h4>Edit Product</h4>
        </div>
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
            <select
              value={prodType}
              onChange={(e) => setType(e.target.value)}
              id="prodType"
              name="prodType"
              required
            >
              {Object.keys(productTypes).map((key) => (
                <option key={key} value={key}>
                  {productTypes[key]}
                </option>
              ))}
            </select>
          </div>
          <div className="input-div">
            <label>Product Description:</label>
            <textarea
              value={prodDesc}
              type="text"
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
              required
            />
          </div>
        </form>
        <button
          id="save"
          onClick={() => {
            console.log(prodDet);
            editProduct();
            setEdit(false);
          }}
        >
          SAVE CHANGES
        </button>
        <button
          id="cancel"
          onClick={() => {
            setEdit(false);
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}
