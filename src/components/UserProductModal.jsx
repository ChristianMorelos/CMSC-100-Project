import React, { useState } from 'react';
import '/src/styles/UserProductModal.css'

function UserProductModal({ products }) {
    const [ selectedUserProduct, setselectedUserProduct ] = useState(null);

    const handleProductClick = (productId) => {
        setselectedUserProduct(productId);
    };

    const handleCloseProductModal = () => {
        setselectedUserProduct(null);
    };

    return (
        <>
        {products.map((product) =>
            <div className='product-box' onClick={() => handleProductClick(product.productId)} key={product.productId}>
                <div className='img-div'>
                    <img src={product.productImg} className='product-img'/>
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

        {selectedUserProduct && (
            <div className='blur-bg' onClick={handleCloseProductModal}>
                {products.map((product) => {
                    if (product.productId === selectedUserProduct) {
                        return (
                            <div className='product-modal' key={product.productId} onClick={(e) => e.stopPropagation()}>
                                <i class='bx bx-x' onClick={handleCloseProductModal}></i>
                                <div className='modal-img-div'>
                                    <img src={product.productImg}/>
                                </div>
                                <div className='modal-info-div'>
                                    
                                    <h1>{product.productName}</h1>
                                    <p>{product.productDescription}</p>
                                    <h4>Category: Fruits and Vegetables</h4>
                                    <h5>₱ {product.productPrice}</h5>
                                    <button>Add to Cart</button>
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
};

export default UserProductModal;