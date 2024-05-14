// Product Listings and order fulfillment
// Make this dynamic/component-based

import React, { useEffect, useState } from 'react';

import '/src/styles/Products.css'

function Products() {
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(body => {
        setItems(body)
      })
  })

  return (
    <>
      <div className='shop-body'>
        <div className='items-main-div'>
            <div className='items-div'>
              {items.map((item) =>
                <div className='itemBox-div'>
                  <div className='itemBox' id='item-img-div'>
                    <img src='https://img.freepik.com/premium-photo/white-long-rice-basmati-burlap-sack-with-wooden-scoop-isolated-white-background_434420-1792.jpg' className='itemBox-img'></img>
                  </div>
                  <div className='itemBox' id='item-name-div'>
                    {item.productName}
                  </div>
                  <div className='itemBox' id='item-price-div'>
                    {item.productQuantity}
                  </div>
                  <div className='itemBox' id='item-addToCartBtn-div'>
                    <button>Add to Cart</button>
                  </div>
                </div>
              )}
            </div>
        </div>
        <div className='cart-main-div'>
          <div className='toggle-btn-div'>
            <i class='bx bx-cart'></i>
          </div>
          <div className='cart-div'>
            <div className='cart-title'>
              <h1>Shopping Cart</h1>
            </div>
            <div className='cart-list-div'>
              <div className='cartItem-div'>
                <div className='cartItem' id='img-div'>
                  <img src='https://img.freepik.com/premium-photo/white-long-rice-basmati-burlap-sack-with-wooden-scoop-isolated-white-background_434420-1792.jpg' className='cartItem-img'></img>
                </div>
                <div className='cartItem' id='name-div'>Rice</div>
                <div className='cartItem' id='unitPrice-div'>Php 9999</div>
                <div className='cartItem' id='qty-div'>
                  <div className='qty-btn' id='minus-btn'>
                    <button><i class='bx bx-minus'></i></button>
                  </div>
                  <div className='qty'>
                    999
                  </div>
                  <div className='qty-btn' id='plus-btn'>
                    <button><i class='bx bx-plus'></i></button>
                  </div>
                </div>
                <div className='cartItem' id='delete-div'>
                  <button className='delete-btn'><i class='bx bx-x'></i></button>
                </div>
              </div>
              <div className='cartItem-div'>
                <div className='cartItem' id='img-div'>
                  <img src='https://img.freepik.com/premium-photo/white-long-rice-basmati-burlap-sack-with-wooden-scoop-isolated-white-background_434420-1792.jpg' className='cartItem-img'></img>
                </div>
                <div className='cartItem' id='name-div'>Rice</div>
                <div className='cartItem' id='unitPrice-div'>Php 9999</div>
                <div className='cartItem' id='qty-div'>
                  <div className='qty-btn' id='minus-btn'>
                    <button><i class='bx bx-minus'></i></button>
                  </div>
                  <div className='qty'>
                    999
                  </div>
                  <div className='qty-btn' id='plus-btn'>
                    <button><i class='bx bx-plus'></i></button>
                  </div>
                </div>
                <div className='cartItem' id='delete-div'>
                  <button className='delete-btn'><i class='bx bx-x'></i></button>
                </div>
              </div>
              <div className='cartItem-div'>
                <div className='cartItem' id='img-div'>
                  <img src='https://img.freepik.com/premium-photo/white-long-rice-basmati-burlap-sack-with-wooden-scoop-isolated-white-background_434420-1792.jpg' className='cartItem-img'></img>
                </div>
                <div className='cartItem' id='name-div'>Rice</div>
                <div className='cartItem' id='unitPrice-div'>Php 9999</div>
                <div className='cartItem' id='qty-div'>
                  <div className='qty-btn' id='minus-btn'>
                    <button><i class='bx bx-minus'></i></button>
                  </div>
                  <div className='qty'>
                    999
                  </div>
                  <div className='qty-btn' id='plus-btn'>
                    <button><i class='bx bx-plus'></i></button>
                  </div>
                </div>
                <div className='cartItem' id='delete-div'>
                  <button className='delete-btn'><i class='bx bx-x'></i></button>
                </div>
              </div>
              <div className='cartItem-div'>
                <div className='cartItem' id='img-div'>
                  <img src='https://img.freepik.com/premium-photo/white-long-rice-basmati-burlap-sack-with-wooden-scoop-isolated-white-background_434420-1792.jpg' className='cartItem-img'></img>
                </div>
                <div className='cartItem' id='name-div'>Rice</div>
                <div className='cartItem' id='unitPrice-div'>Php 9999</div>
                <div className='cartItem' id='qty-div'>
                  <div className='qty-btn' id='minus-btn'>
                    <button><i class='bx bx-minus'></i></button>
                  </div>
                  <div className='qty'>
                    999
                  </div>
                  <div className='qty-btn' id='plus-btn'>
                    <button><i class='bx bx-plus'></i></button>
                  </div>
                </div>
                <div className='cartItem' id='delete-div'>
                  <button className='delete-btn'><i class='bx bx-x'></i></button>
                </div>
              </div>
              <div className='cartItem-div'>
                <div className='cartItem' id='img-div'>
                  <img src='https://img.freepik.com/premium-photo/white-long-rice-basmati-burlap-sack-with-wooden-scoop-isolated-white-background_434420-1792.jpg' className='cartItem-img'></img>
                </div>
                <div className='cartItem' id='name-div'>Rice</div>
                <div className='cartItem' id='unitPrice-div'>Php 9999</div>
                <div className='cartItem' id='qty-div'>
                  <div className='qty-btn' id='minus-btn'>
                    <button><i class='bx bx-minus'></i></button>
                  </div>
                  <div className='qty'>
                    999
                  </div>
                  <div className='qty-btn' id='plus-btn'>
                    <button><i class='bx bx-plus'></i></button>
                  </div>
                </div>
                <div className='cartItem' id='delete-div'>
                  <button className='delete-btn'><i class='bx bx-x'></i></button>
                </div>
              </div>
              <div className='cartItem-div'>
                <div className='cartItem' id='img-div'>
                  <img src='https://img.freepik.com/premium-photo/white-long-rice-basmati-burlap-sack-with-wooden-scoop-isolated-white-background_434420-1792.jpg' className='cartItem-img'></img>
                </div>
                <div className='cartItem' id='name-div'>Rice</div>
                <div className='cartItem' id='unitPrice-div'>Php 9999</div>
                <div className='cartItem' id='qty-div'>
                  <div className='qty-btn' id='minus-btn'>
                    <button><i class='bx bx-minus'></i></button>
                  </div>
                  <div className='qty'>
                    999
                  </div>
                  <div className='qty-btn' id='plus-btn'>
                    <button><i class='bx bx-plus'></i></button>
                  </div>
                </div>
                <div className='cartItem' id='delete-div'>
                  <button className='delete-btn'><i class='bx bx-x'></i></button>
                </div>
              </div>
            </div>
            <div className='cart-checkout-div'>
              <div className='totalPrice-div'>
                TOTAL: P9999
              </div>
              <div className='checkout-btn-div'>
                <button>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products;