import React, { useEffect, useState } from 'react';
import '/src/styles/Products.css';
import ShoppingCart from '/src/components/ShoppingCart.jsx';
import UserProductModal from '../../components/UserProductModal';

function Products() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const productTypes = {
    1: "Staple",
    2: "Fruits and Vegetables",
    3: "Livestock",
    4: "Seafood",
    5: "Others",
  };

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(body => {
        setProducts(body);
        setOriginalProducts(body);
      })
  }, []);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    let sortedProducts = [];
    if (value === 'name-asc') {
      sortedProducts = [...products].sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (value === 'name-desc') {
      sortedProducts = [...products].sort((a, b) => b.productName.localeCompare(a.productName));
    } else if (value === 'price-asc') {
      sortedProducts = [...products].sort((a, b) => a.productPrice - b.productPrice);
    } else if (value === 'price-desc') {
      sortedProducts = [...products].sort((a, b) => b.productPrice - a.productPrice);
    } else {
      sortedProducts = originalProducts;
    }
    setProducts(sortedProducts);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategories([]);
    setProducts(originalProducts);
  };

  const handleCartButtonClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCategories([...selectedCategories, parseInt(value)]);
    } else {
      setSelectedCategories(selectedCategories.filter(cat => cat !== parseInt(value)));
    }
  };

  const isProductInSelectedCategories = (product) => {
    return selectedCategories.length === 0 || selectedCategories.includes(product.productType);
  };

  const filteredProducts = products.filter(product => {
    return isProductInSelectedCategories(product) &&
      (!minPrice || product.productPrice >= parseFloat(minPrice)) &&
      (!maxPrice || product.productPrice <= parseFloat(maxPrice));
  });

  return (
    <>
      <button className='cart-btn' onClick={handleCartButtonClick}>
        <i className='bx bx-cart'></i>
      </button>
      {isCartOpen && <ShoppingCart onClose={handleCloseCart} />}
      <div className='shop-div'>
        <div className='filter-div'>
          <h1>Filter by</h1>
          <form className='filter-form'>
            {Object.keys(productTypes).map(type => (
              <div key={type} className='checkbox-div'>
                <input
                  type='checkbox'
                  id={`filter-cat${type}`}
                  name={`filter-cat${type}`}
                  value={type}
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes(parseInt(type))}
                />
                <label htmlFor={`filter-cat${type}`}>{productTypes[type]}</label><br/>
              </div>
            ))}
          </form>
          <h1>Price Range</h1>
          <form className='range-form'>
            <div className='range-div'>
              <input
                type='number'
                id='min-price'
                name='min-price'
                placeholder='₱MIN'
                min='0'
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <div className='line'></div>
              <input
                type='number'
                id='max-price'
                name='max-price'
                placeholder='₱MAX'
                min='0'
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
            <div className='price-range-btn'>
              <button type='button' className='range-submit-btn' id='clear' onClick={handleClearFilters}>CLEAR</button>
            </div>
          </form>
        </div>
        <div className='products-div'>
          <div className='products-head-div'>
            <h4>Showing {filteredProducts.length} products</h4>
            <form>
              <select name='sort-by-val' id='sort-by-val' onChange={handleSortChange} value={sortBy}>
                <option value='show-all'>Show All</option>
                <option value='name-asc'>Product Name: Ascending</option>
                <option value='name-desc'>Product Name: Descending</option>
                <option value='price-asc'>Price: Low to High</option>
                <option value='price-desc'>Price: High to Low</option>
              </select>
            </form>
          </div>
          <div className='product-cards-div'>
            {filteredProducts.length === 0 ? <div id='noproduct'></div> :
              <UserProductModal products={filteredProducts} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
