import React, { useEffect, useState } from 'react';
import '/src/styles/ShoppingCart.css';

function ShoppingCart({ onClose }) {
    return (
        <>
            <div className='shopping-cart'>
                <div className='blur-side' onClick={onClose}></div>
                <div className='cart-div'>
                    <div className='cart-head'>
                        <h1>Shopping Cart</h1>
                        <i className='bx bx-x' onClick={onClose}></i>
                    </div>
                    <div className='cart-item-div'>
                        <div className='cart-img-div'>
                        </div>
                        <div className='cart-name-price-div'>
                            <h3>Product Name</h3>
                            <a>₱ 99</a>
                        </div>
                        <div className='cart-qty-div'>
                            <div className='qty-btn' id='minus-btn'>
                                <button>
                                    <i className='bx bx-minus'></i>
                                </button>
                            </div>
                            <div className='qty'>99</div>
                            <div className='qty-btn' id='plus-btn'>
                                <button>
                                    <i className='bx bx-plus'></i>
                                </button>
                            </div>
                        </div>
                        <div className='cartItem' id='delete-div'>
                            <button className='delete-btn'>
                                <i className='bx bx-x'></i>
                            </button>
                        </div>
                    </div>
                    <div className='cart-checkout-div'>
                        <div className='totalPrice-div'>TOTAL: ₱ 99.99</div>
                        <div className='checkout-btn-div'>
                            <button>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShoppingCart;
