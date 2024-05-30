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
      .then((response) => response.text())
      .then((body) => {
        console.log(body);
      });

    //alert message for sucess
    alert("Product edited successfully");
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
