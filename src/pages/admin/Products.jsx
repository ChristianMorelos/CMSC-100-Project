// Product Listing
import "../../styles/addProduct.css";
import { useEffect, useState } from "react";
import AddProduct from "./products/AddProduct";
import EditProduct from "./products/EditProduct";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [prodName, setName] = useState("");
  const [prodPrice, setPrice] = useState(0);
  const [prodImg, setImg] = useState("");
  const [prodDesc, setDesc] = useState("");
  const [prodType, setType] = useState(1);
  const [prodQty, setQty] = useState(1);

  const [edit, setEdit] = useState(false);

  const [prodDet, setProdDet] = useState({});

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
    <>
      {edit === false && (
        <div className="admin-products">
          <div className="addProduct">
            <AddProduct
              setName={setName}
              setPrice={setPrice}
              setImg={setImg}
              setDesc={setDesc}
              setType={setType}
              setQty={setQty}
              //fields
              prodName={prodName}
              prodPrice={prodPrice}
              prodImg={prodImg}
              prodDesc={prodDesc}
              prodType={prodType}
              prodQty={prodQty}
            ></AddProduct>
          </div>
          <div className="productContainer">
            {products.map((product) => (
              //product div containing image, name, price, and an add button
              <div key={product.productId} className="product">
                <h2>{product.productName}</h2>
                <img src={product.productImg} alt={product.name}></img>
                <p>Description: {product.productDescription}</p>
                <p>Type: {product.productType}</p>
                <p>Quantity: {product.productQuantity}</p>
                <p>Price: PHP {product.productPrice}</p>

                <button
                  className="editProduct"
                  onClick={() => {
                    //set product details for when editing
                    setProdDet({
                      productId: product.productId,
                      productName: product.productName,
                      productPrice: product.productPrice,
                      productImg: product.productImg,
                      productDescription: product.productDescription,
                      productType: product.productType,
                      productQuantity: product.productQuantity,
                    });
                    setEdit(!edit);
                  }}
                >
                  Edit
                </button>

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
      )}

      {edit === true && (
        <EditProduct setEdit={setEdit} prodDet={prodDet}></EditProduct>
      )}
    </>
  );
}
