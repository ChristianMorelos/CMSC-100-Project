import { useState } from "react";
import "../../../styles/addProduct.css";

export default function EditProduct({
  setEdit,
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
  return (
    <div classNae="editPage">
      <div className="addProductContainer1">
        <h1 id="title">Edit Product</h1>

        <form id="form-values1">
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

        <button
          id="addProduct"
          onClick={() => {
            setEdit(false);
          }}
        >
          Save Changes
        </button>
      </div>
      <div>
        <button
          className="editProduct"
          onClick={() => {
            setEdit(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
