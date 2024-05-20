import React, { useEffect, useState } from 'react';
import '/src/styles/Products.css'
import ShoppingCart from '/src/components/ShoppingCart.jsx';
import UserProductModal from '../../components/UserProductModal';

function Products() {
  const [ products, setProducts ] = useState([]);
  const [ originalProducts, setOriginalProducts ] = useState([]);
  const [ sortBy, setSortBy ] = useState('');
  const [ minPrice, setMinPrice ] = useState('');
  const [ maxPrice, setMaxPrice ] = useState('');
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  
  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(body => {
        setProducts(body);
        setOriginalProducts(body);
      })
  }, [])

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
  
  const handleFilterByPrice = () => {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(body => {
        let filteredProducts = body.filter(product => {
          const price = product.productPrice;
          return (!minPrice || price >= parseFloat(minPrice)) && (!maxPrice || price <= parseFloat(maxPrice));
        });
        setProducts(filteredProducts);
      });
  };
  
  const handleClearPriceFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(body => {
        setProducts(body)
      });
  };

  const handleCartButtonClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <button className='cart-btn' onClick={handleCartButtonClick}>
        <i class='bx bx-cart'></i>
      </button>
      {isCartOpen && <ShoppingCart onClose={handleCloseCart} />}
      <div className='shop-div'>
        <div className='filter-div'>
          <h1>Filter by</h1>
          <form className='filter-form'>
            <div className='checkbox-div'>
              <input type='checkbox' id='filter-cat1' name='filter-cat1' value='cat1'/>
              <label htmlFor='filter-cat1'>Category 1</label><br/>
            </div>
            <div className='checkbox-div'>
              <input type='checkbox' id='filter-cat2' name='filter-cat2' value='cat2'/>
              <label htmlFor='filter-cat2'>Category 2</label><br/>
            </div>
            <div className='checkbox-div'>
              <input type='checkbox' id='filter-cat3' name='filter-cat3' value='cat3'/>
              <label htmlFor='filter-cat3'>Category 3</label><br/>
            </div>
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
              <button type="button" className='range-submit-btn' id='apply' onClick={handleFilterByPrice}>APPLY</button>
              <button type='button' className='range-submit-btn' id='clear' onClick={handleClearPriceFilter}>CLEAR</button>
            </div>
          </form>
        </div>
        <div className='products-div'>
          <div className='products-head-div'>
            <h4>Showing {products.length} products</h4>
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
            {products.length == 0 ? <div id='noproduct'></div>
            : <UserProductModal products={products}></UserProductModal>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Products;