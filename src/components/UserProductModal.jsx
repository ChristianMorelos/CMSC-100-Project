import React, { useEffect, useState } from 'react';
import '/src/styles/UserProductModal.css';

function UserProductModal({ products }) {
    const currentEmail = localStorage.getItem('email');
    const [email, setEmail] = useState('');
    const [selectedUserProduct, setSelectedUserProduct] = useState(null);

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

    const handleProductClick = (productId, event) => {
        if (!event.target.closest('.addtocart-div') && !event.target.closest('.addtocart-btn') && !event.target.closest('.outofstock-div')) {
            setSelectedUserProduct(productId);
        }
    };

    const handleCloseProductModal = () => {
        setSelectedUserProduct(null);
    };

    const handleAddToCart = async (productId, productImg, productPrice) => {
        const cart = {
            email: email,
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

    const productTypes = {
        1: "Staple",
        2: "Fruits and Vegetables",
        3: "Livestock",
        4: "Seafood",
        5: "Others",
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
                    {product.productQuantity === 0 ? <div className='outofstock-div'>Out of Stock</div>
                    :
                    <div className='addtocart-div' onClick={() => handleAddToCart(product.productId, product.productImg, product.productPrice)}>
                        <button type='button' className='addtocart-btn'>Add to Cart</button>
                    </div> 
                    }
                    
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
                                        <h4>Category: {productTypes[product.productType]}</h4>
                                        <h5>₱ {product.productPrice}</h5>
                                        {product.productQuantity === 0 ? <button id='outofstock-btn'>Out of Stock</button>
                                        :
                                        <button onClick={() => handleAddToCart(product.productId, product.productImg, product.productPrice)}>Add to Cart</button>
                                        }
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
