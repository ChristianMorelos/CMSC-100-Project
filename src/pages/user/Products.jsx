// Product Listings and order fulfillment
// Make this dynamic/component-based

import React, { useEffect, useState } from 'react';

import '/src/styles/Products.css'

function Products() {
  const [ products, setProducts ] = useState([]);
  const [ sortBy, setSortBy ] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(body => {
        setProducts(body)
      })
  }, [])

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    // Sort products based on the selected value
    let sortedProducts = [];
    if (value === 'name-asc') {
      sortedProducts = [...products].sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (value === 'name-desc') {
      sortedProducts = [...products].sort((a, b) => b.productName.localeCompare(a.productName));
    } else if (value === 'price-asc') {
      sortedProducts = [...products].sort((a, b) => a.productPrice - b.productPrice);
    } else if (value === 'price-desc') {
      sortedProducts = [...products].sort((a, b) => b.productPrice - a.productPrice);
    }
    setProducts(sortedProducts);
  };

  const handleClear = () => {
    setSortBy('');
    document.querySelectorAll('input[name="sort-by-val"]').forEach((radio) => {
      radio.checked = false;
    });
  };

  return (
    <>
      <div className='shop-div'>
        <div className='filter-div'>
          <h1>Sort by</h1>
          <form className='sort-form'>
            <div className='radio-div'>
              <input type='radio' id='name-asc' name='sort-by-val' value='name-asc' onChange={handleSortChange} checked={sortBy === 'name-asc'}/>
              <label htmlFor='name-asc'>Name: A to Z</label><br/>
            </div>
            <div className='radio-div'>
              <input type='radio' id='name-desc' name='sort-by-val' value='name-desc' onChange={handleSortChange} checked={sortBy === 'name-desc'}/>
              <label htmlFor='name-desc'>Name: Z to A</label><br/>
            </div>
            <div className='radio-div'>
              <input type='radio' id='price-asc' name='sort-by-val' value='price-asc' onChange={handleSortChange} checked={sortBy === 'price-asc'}/>
              <label htmlFor='price-asc'>Price: Ascending</label><br/>
            </div>
            <div className='radio-div'>
              <input type='radio' id='price-desc' name='sort-by-val' value='price-desc' onChange={handleSortChange} checked={sortBy === 'price-desc'}/>
              <label htmlFor='price-desc'>Price: Descending</label><br/>
            </div>
            <button type='button' onClick={handleClear}>Clear</button>
          </form>

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
              <input type='number' id='min-price' name='min-price' placeholder='₱MIN' min='0'/>
              <div className='line'></div>
              <input type='number' id='max-price' name='max-price' placeholder='₱MAX' min='0'/>
            </div>
           <input type="submit" className='range-submit-btn' value="APPLY"/>
          </form>
          
        </div>
        <div className='products-div'>
          {products.map((product) =>
            <div className='product-box'>
              <div className='img-div'>
                <img src={product.productImage} className='product-img'/>
              </div>
              <div className='info-div'>
                <div className='name-div'>
                  <a>{product.productName}</a>
                </div>
                <div className='price-div'>
                  <a>₱ {product.productPrice}</a>
                </div>
              </div>
              <div className='addtocart-div'>
                <button type='button' className='addtocart-btn'>Add to Cart</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Products;