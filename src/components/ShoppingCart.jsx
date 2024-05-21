import React, { useEffect, useState } from 'react';
import '/src/styles/ShoppingCart.css';

function ShoppingCart({ onClose }) {
    const currentEmail = localStorage.getItem('email');
    const [ cartItems, setCartItems ] = useState([]);
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ email, setEmail ] = useState('');

    useEffect(() => {
        fetch(`http://localhost:4000/user/info?email=${currentEmail}`)
            .then(response => response.json())
            .then(body => {
                setEmail(body.email || '');
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, [currentEmail]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        fetch(`http://localhost:4000/user/get-cart-items?email=${currentEmail}`)
            .then(response => response.json())
            .then(data => {
                setCartItems(data);
                calculateTotalPrice(data);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    };

    const handleDeleteCartItem = async (productId) => {
        const requestData = {
            email: email,
            productId: productId
        };

        fetch('http://localhost:4000/user/delete-cart-item', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        })
        .then(async response => {
            if (response.ok) {
                fetchCartItems();
            } else {
                const errorText = await response.text();
                alert(`Failed to delete item from cart: ${errorText}`);
            }
        })
        .catch(() => {
            alert('Error deleting item from cart');
        });
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        const requestData = {
            email: email,
            productId: productId,
            newQuantity: newQuantity
        };

        fetch('http://localhost:4000/user/update-cart-quantity', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        })
        .then(async response => {
            if (response.ok) {
                fetchCartItems();
            } else {
                const errorText = await response.text();
                alert(`Failed to update item quantity in cart: ${errorText}`);
            }
        })
        .catch(() => {
            alert('Error updating item quantity in cart');
        });
    };

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + (item.productPrice * item.productQuantity), 0);
        setTotalPrice(total.toFixed(2));
    };

    const handleCheckout = async () => {
        const products = cartItems.map(item => ({
            id: item.productId,
            quantity: item.productQuantity
        }));

        const requestData = {
            email: email,
            products: products
        };

        fetch('http://localhost:4000/user/checkout-order', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        })
        .then(async response => {
            if (response.ok) {
                alert('Checkout successful!');
                setCartItems([]);       //clears cart
                setTotalPrice(0);       //sets total price back to 0
            } else {
                const errorText = await response.text();
                alert(`Checkout failed: ${errorText}`);
            }
        })
        .catch(() => {
            alert('Error during checkout');
        });
    };
    
    return (
        <>
            <div className='shopping-cart'>
                <div className='blur-side' onClick={onClose}></div>
                <div className='cart-div'>
                    <div className='cart-head'>
                        <h1>Shopping Cart</h1>
                        <i className='bx bx-x' onClick={onClose}></i>
                    </div>
                    {cartItems.length === 0 ? <p>Your cart is empty</p>
                    :   <div>
                            {cartItems.map(item => (
                            <div className='cart-item-div' key={item.productId}>
                                <div className='cart-img-div'>
                                    <img src={item.productImg} alt={item.productName} />
                                </div>
                                <div className='cart-name-price-div'>
                                    <h3>{item.productName}</h3>
                                    <a>₱ {item.productPrice}</a>
                                </div>
                                <div className='cart-qty-div'>
                                    <div className='qty-btn' id='minus-btn' onClick={() => handleQuantityChange(item.productId, item.productQuantity - 1)}>
                                        <button>
                                            <i className='bx bx-minus'></i>
                                        </button>
                                    </div>
                                    <div className='qty'>{item.productQuantity}</div>
                                    <div className='qty-btn' id='plus-btn' onClick={() => handleQuantityChange(item.productId, item.productQuantity + 1)}>
                                        <button>
                                            <i className='bx bx-plus'></i>
                                        </button>
                                    </div>
                                </div>
                                <div className='cartItem' id='delete-div'>
                                    <button className='delete-btn' onClick={() => handleDeleteCartItem(item.productId)}>
                                        <i className='bx bx-x'></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className='cart-checkout-div'>
                            <div className='totalPrice-div'>TOTAL: ₱ {totalPrice}</div>
                            <div className='checkout-btn-div'>
                                <button onClick={handleCheckout}>Checkout</button>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </>
    );
}

export default ShoppingCart;
