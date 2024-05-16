import React, { useState, useEffect } from 'react';
import '/src/styles/ProductSalesCard.css';

function ProductSalesCards({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (productId) => {
    setSelectedProduct(productId);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      {products.map((product) => (
        <div className="product-sales-card" key={product.id} onClick={() => openModal(product.id)}>
          {/* Adds card's assets and texts from the list */}
          <img className="product-sales-image" src={product.image} alt={product.name} />
          <h1 className="product-sales-name">{product.name}</h1>
          <h2 className="product-sales-quantity">Quantity Sold: {product.salesQuantity}</h2>
          <h2 className="product-sales-sales">Total Sales: {product.salesSales}</h2>
        </div>
      ))}

      {selectedProduct && (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            {/* Access the selected product details within products.map */}
            {products.map((product) => {
                if (product.id === selectedProduct) {
                return (
                    <div key={product.id}>
                    <img className="modal-image" src={product.image} alt={product.name} />
                    <h1 className="modal-name">{product.name}</h1>
                    <h2 className="modal-quantity">Quantity Sold: {product.salesQuantity}</h2>
                    <h2 className="modal-sales">Total Sales: {product.salesSales}</h2>
                    {/* Add more details about the selected product */}
                    </div>
                );
                }
                return null;
            })}
            </div>
        </div>
        )}
    </>
  );
}

export default ProductSalesCards;
