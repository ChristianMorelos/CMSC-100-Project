// Product Listing
import "../../styles/AddProduct.css";
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

  //for sorting
  const [sortBy, setSortBy] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);

  function fetchProducts() {
    fetch("http://localhost:4000/products")
      .then((response) => response.json())
      .then((body) => {
        setProducts(body);
        setOriginalProducts(body);
      });
  }

  //product types
  const productTypes = {
    1: "Staple",
    2: "Fruits and Vegetables",
    3: "Livestock",
    4: "Seafood",
    5: "Others",
  };

  //fetch products whenever there is a change to each of the states in this array
  useEffect(() => {
    fetchProducts();
  }, [
    prodName,
    prodPrice,
    prodImg,
    prodDesc,
    prodType,
    prodQty,
    edit,
    prodDet,
  ]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    let sortedProducts = [];
    if (value === "name-asc") {
      sortedProducts = [...products].sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );
    } else if (value === "name-desc") {
      sortedProducts = [...products].sort((a, b) =>
        b.productName.localeCompare(a.productName)
      );
    } else if (value === "price-asc") {
      sortedProducts = [...products].sort(
        (a, b) => a.productPrice - b.productPrice
      );
    } else if (value === "price-desc") {
      sortedProducts = [...products].sort(
        (a, b) => b.productPrice - a.productPrice
      );
    } else if (value === "quantity-asc") {
      sortedProducts = [...products].sort(
        (a, b) => a.productQuantity - b.productQuantity
      );
    } else if (value === "quantity-desc") {
      sortedProducts = [...products].sort(
        (a, b) => b.productQuantity - a.productQuantity
      );
    } else if (value === "type-asc") {
      sortedProducts = [...products].sort(
        (a, b) => a.productType - b.productType
      );
    } else if (value === "type-desc") {
      sortedProducts = [...products].sort(
        (a, b) => b.productType - a.productType
      );
    } else {
      sortedProducts = originalProducts;
    }
    setProducts(sortedProducts);
  };

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
        fetchProducts();
      });
  }

  return (
    <>
      {edit === false && (
        <div className="admin-products-main">
          <div className="add-product-div">
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
              //refresh
              fetchProducts={fetchProducts}
            ></AddProduct>
          </div>
          <div className="display-product-div">
            <div className="products-head-div">
              <h4>Showing {products.length} products</h4>
              <form>
                <select
                  name="sort-by-val"
                  id="sort-by-val"
                  onChange={handleSortChange}
                  value={sortBy}
                >
                  <option value="show-all">Show All</option>
                  <option value="name-asc">Product Name: Ascending</option>
                  <option value="name-desc">Product Name: Descending</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="quantity-asc">Stock: Low to High</option>
                  <option value="quantity-desc">Stock: High to Low</option>
                  <option value="type-asc">Type: Low to High</option>
                  <option value="type-desc">Type: High to Low</option>
                </select>
              </form>
            </div>
            <div className="display-product-card-div">
              {products.map((product) => (
                <div className="admin-product-box">
                  <div className="admin-img-div">
                    <img
                      src={product.productImg}
                      alt={product.name}
                      className="admin-product-img"
                    />
                  </div>
                  <div className="admin-info-div">
                    <div className="admin-name-div">
                      <a>{product.productName}</a>
                    </div>
                    <div className="admin-price-div">
                      <a>Price: {product.productPrice}</a>
                    </div>
                    <div className="admin-price-div">
                      <a>Type: {productTypes[product.productType]}</a>
                    </div>
                    <div className="admin-price-div">
                      <a>Stock Left: {product.productQuantity}</a>
                    </div>

                    <div className="admin-button-div">
                      <button
                        id="admin-edit"
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
                        EDIT
                      </button>
                      <button
                        id="admin-delete"
                        onClick={() => {
                          deleteProduct(product.productId);
                        }}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {edit === true && (
        <EditProduct setEdit={setEdit} prodDet={prodDet}></EditProduct>
      )}
    </>
  );
}
