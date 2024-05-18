import React, { useState, useEffect } from 'react';
import '/src/styles/ProductSalesCard.css';

function ProductSalesCards({ products, dates }) {
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
          <img className="product-sales-image" src={product.image} alt={product.name} />
          <h1 className="product-sales-name">{product.name}</h1>
          <h2 className="product-sales-quantity">Quantity Sold: {product.salesQuantity}</h2>
          <h2 className="product-sales-sales">Total Sales: {product.salesSales}</h2>
        </div>
      ))}

      {selectedProduct && (
        <div className="modal-background" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {products.map((product) => {
              if (product.id === selectedProduct) {
                return (
                  <div key={product.id} className='modal-tab'>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-image" src={product.image} alt={product.name} />
                    <div className="modal-text">
                      <h1 className="modal-name">{product.name}</h1>
                      <h2 className="modal-info">{product.type}</h2>
                      <br />
                      <h2 className="modal-info"> <strong>Unit Price:</strong> Php {product.unitPrice}</h2>
                      <h2 className="modal-info"><strong>Product Id:</strong> {product.id}</h2>
                      <h2 className="modal-info"><strong>Total Sold (all-time):</strong> {product.totalSold}</h2>
                      <h2 className="modal-info"><strong>Total Income:</strong> Php {product.totalIncome}</h2>
                      <br />
                      <h2 className="modal-period"><strong>Between {dates.start} - {dates.end}:</strong></h2>
                      <h2 className="modal-sales"><strong>Sold:</strong> {product.salesQuantity}</h2>
                      <h2 className="modal-sales"><strong>Income:</strong> Php {product.salesIncome.toFixed(2)}</h2>
                    </div>
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
