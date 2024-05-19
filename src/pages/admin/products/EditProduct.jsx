import { useState } from "react";
import "../../../styles/addProduct.css";

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
  }

  return (
    <div className="editPage">
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
            console.log(prodDet);
            editProduct();
            setEdit(false);
          }}
        >
          Save Changes
        </button>
      </div>
      <div>
        <button
          className="deleteProduct"
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
