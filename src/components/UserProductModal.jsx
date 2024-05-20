import React, { useState } from 'react';
import '/src/styles/UserProductModal.css';

function UserProductModal({ products }) {
    const [selectedUserProduct, setSelectedUserProduct] = useState(null);

    const handleProductClick = (productId, event) => {
        if (!event.target.classList.contains('addtocart-div') && !event.target.classList.contains('addtocart-btn')) {
            setSelectedUserProduct(productId);
        }
    };

    const handleCloseProductModal = () => {
        setSelectedUserProduct(null);
    };

    const handleAddToCart = async (productId, productImg, productPrice) => {
        const cart = {
            email: 'zerinedaphne@gmail.com',
            productId,
            productImg,
            productPrice,
            quantity: 1,
        };

        fetch('http://localhost:4000/user/add-to-cart', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cart),
        })
        .then(async response => {
            if (response.ok) {
                alert('Item added to cart');
            } else {
                const errorText = await response.text();
                alert(`Failed to add item to cart: ${errorText}`);
            }
        })
        .catch(() => {
            alert('Error adding item to cart');
        });
    };

    return (
        <>
            {products.map((product) => (
                <div className='product-box' onClick={(e) => handleProductClick(product.productId, e)} key={product.productId}>
                    <div className='img-div'>
                        <img src={product.productImg} className='product-img' alt={product.productName} />
                    </div>
                    <div className='info-div'>
                        <div className='name-div'>
                            <a>{product.productName}</a>
                        </div>
                        <div className='price-div'>
                            <a>₱ {product.productPrice}</a>
                        </div>
                    </div>
                    <div className='addtocart-div' onClick={() => handleAddToCart(product.productId, product.productImg, product.productPrice)}>
                        <button type='button' className='addtocart-btn'>Add to Cart</button>
                    </div>
                </div>
            ))}

            {selectedUserProduct && (
                <div className='blur-bg' onClick={handleCloseProductModal}>
                    {products.map((product) => {
                        if (product.productId === selectedUserProduct) {
                            return (
                                <div className='product-modal' key={product.productId} onClick={(e) => e.stopPropagation()}>
                                    <i className='bx bx-x' onClick={handleCloseProductModal}></i>
                                    <div className='modal-img-div'>
                                        <img src={product.productImg} alt={product.productName} />
                                    </div>
                                    <div className='modal-info-div'>
                                        <h1>{product.productName}</h1>
                                        <p>{product.productDescription}</p>
                                        <h4>Category: Fruits and Vegetables</h4>
                                        <h5>₱ {product.productPrice}</h5>
                                        <button onClick={() => handleAddToCart(product.productId, product.productImg, product.productPrice)}>Add to Cart</button>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </>
    );
}

export default UserProductModal;
