
import { useEffect, useState } from "react";
import AddProduct from "/src/pages/admin/products/AddProduct";
import EditProduct from "/src/pages/admin/products/EditProduct";
import Unauthorized from "/src/components/Unauthorized";
import Unauthenticated from "/src/components/Unauthenticated";
import Auth from "/src/hooks/Auth";

import "/src/styles/addProduct.css";

export default function Products() {

  const { isAuthenticated, isAdmin } = Auth(); 

  const [products, setProducts] = useState([]);
  const [prodName, setName] = useState("");
  const [prodPrice, setPrice] = useState(0);
  const [prodImg, setImg] = useState("");
  const [prodDesc, setDesc] = useState("");
  const [prodType, setType] = useState(1);
  const [prodQty, setQty] = useState(1);

  const [edit, setEdit] = useState(false);
  const [prodDet, setProdDet] = useState({});

  const [sortType, setSortType] = useState("asc");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`http://localhost:4000/products/sorted-products?sortBy=${sortBy}&sortType=${sortType}`)
      .then((response) => response.json())
      .then((body) => {
        setProducts(body);
      });
    }
  }, [isAuthenticated]);

  if (isAuthenticated == null) {
    return; 
  }

  if (!isAuthenticated) {
    return <Unauthenticated />;
  }

  if (!isAdmin) {
    return <Unauthorized />;
  }

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

            <div className="sorting">
              <div className="type">
                <h2>Sort Type</h2>
                <div className="sort-type">
                  <input
                    id="asc"
                    type="radio"
                    name="sortType"
                    value="asc"
                    defaultChecked
                    onChange={() => setSortType("asc")}
                  />
                  <label className="sorting">Ascending</label>
                </div>
                <div className="sort-type">
                  <input
                    id="desc"
                    type="radio"
                    name="sortType"
                    value="desc"
                    onChange={() => setSortType("desc")}
                  />
                  <label className="sorting">Descending</label>
                </div>
              </div>
              <div className="sortBy">
                <h2>Sort By</h2>
                <div className="sort-type">
                  <input
                    id="sName"
                    type="radio"
                    name="sortBy"
                    value="name"
                    defaultChecked
                    onChange={() => setSortBy("name")}
                  />
                  <label className="sorting">Name</label>
                </div>
                <div className="sort-type">
                  <input
                    id="sType"
                    type="radio"
                    name="sortBy"
                    value="type"
                    onChange={() => setSortBy("type")}
                  />
                  <label className="sorting">Type</label>
                </div>
                <div className="sort-type">
                  <input
                    id="sPrice"
                    type="radio"
                    name="sortBy"
                    value="price"
                    onChange={() => setSortBy("price")}
                  />
                  <label className="sorting">Price</label>
                </div>
                <div className="sort-type">
                  <input
                    id="sQty"
                    type="radio"
                    name="sortBy"
                    value="quantity"
                    onChange={() => setSortBy("quantity")}
                  />
                  <label className="sorting">Quantity</label>
                </div>
              </div>
            </div>
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
