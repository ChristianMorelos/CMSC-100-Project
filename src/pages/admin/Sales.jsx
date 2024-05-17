import React, { useState } from 'react';
import '/src/styles/Sales.css';
import ProductSalesCards from '/src/components/ProductSalesCards.jsx';

function Sales() {


  const dummyProducts = [
    { id: 1, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 1', salesQuantity: 10, salesSales: 100 },
    { id: 2, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 2', salesQuantity: 20, salesSales: 200 },
    { id: 3, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 3', salesQuantity: 30, salesSales: 300 },
    { id: 4, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 4', salesQuantity: 40, salesSales: 400 },
    { id: 5, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 5', salesQuantity: 50, salesSales: 500 },
    { id: 6, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 6', salesQuantity: 60, salesSales: 600 },
    { id: 7, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 7', salesQuantity: 70, salesSales: 700 },
    { id: 8, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 8', salesQuantity: 80, salesSales: 800 },
    { id: 9, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 9', salesQuantity: 90, salesSales: 900 },
    { id: 10, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 10', salesQuantity: 100, salesSales: 1000 },
    { id: 11, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 11', salesQuantity: 110, salesSales: 1100 },
    { id: 12, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 12', salesQuantity: 120, salesSales: 1200 },
    { id: 13, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 13', salesQuantity: 130, salesSales: 1300 },
    { id: 14, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 14', salesQuantity: 140, salesSales: 1400 },
    { id: 15, image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg', name: 'Product 15', salesQuantity: 150, salesSales: 1500 },
  ];
  

  return (
    <div>
      <div id="top-bar">
        <span className="summary">
          You made <strong>80 sales</strong> amounting to <br />
          <strong>Php 1,000,000</strong> from March 1-31, 2024.
        </span>
      </div>

  

      <div id='product-sales-card-container'>
        <ProductSalesCards products={dummyProducts}></ProductSalesCards>
      </div>

      <div id="vignette">
        
      </div>

      <div id="bottom-toolbar">
        <select className="period-selector">
          <option value="weekly">WEEKLY</option>
          <option value="monthly" selected>
            MONTHLY
          </option>
          <option value="annually">ANNUALLY</option>
          <option value="all-time">ALL TIME</option>
        </select>

        <span className="toolbar-text">
          Showing sales from:
          <span className="period start">March 1, 2024</span>
          to
          <span className="period end">March 31, 2024</span>
        </span>

        <button className="toolbar-button left">&lt;</button>
        <button className="toolbar-button right">&gt;</button>
        <button className="toolbar-button arrow">&#8634;</button>
      </div>
    </div>
  );
}

export default Sales;
