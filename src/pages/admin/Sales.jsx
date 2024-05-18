import React, { useState, useEffect } from 'react';
import '/src/styles/Sales.css';
import ProductSalesCards from '/src/components/ProductSalesCards.jsx';

function Sales() {

  const dummyProducts = [
    {
      id: 1,
      image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg',
      name: 'Product 1',
      type: 'Vegetables',
      salesQuantity: 10,
      salesSales: 100,
      unitPrice: 10,
      totalSold: 100,
      totalIncome: 1000,
      salesIncome: 100,
    },
    {
      id: 2,
      image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg',
      name: 'Product 2',
      type: 'Vegetables',
      salesQuantity: 20,
      salesSales: 200,
      unitPrice: 20,
      totalSold: 200,
      totalIncome: 2000,
      salesIncome: 200,
    },
    {
      id: 3,
      image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg',
      name: 'Product 3',
      type: 'Vegetables',
      salesQuantity: 30,
      salesSales: 300,
      unitPrice: 30,
      totalSold: 300,
      totalIncome: 3000,
      salesIncome: 300,
    },
    {
      id: 4,
      image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg',
      name: 'Product 4',
      type: 'Vegetables',
      salesQuantity: 40,
      salesSales: 400,
      unitPrice: 40,
      totalSold: 400,
      totalIncome: 4000,
      salesIncome: 400,
    },
    {
      id: 5,
      image: 'https://cdn.britannica.com/39/187439-050-35BA4DCA/Broccoli-florets.jpg',
      name: 'Product 5',
      type: 'Vegetables',
      salesQuantity: 50,
      salesSales: 500,
      unitPrice: 50,
      totalSold: 500,
      totalIncome: 5000,
      salesIncome: 500,
    },
  ];
  
  

  const [period, setPeriod] = useState('monthly');
  const [dates, setDates] = useState({ start: new Date(), end: new Date() });

  useEffect(() => {
    getCurrentPeriodDates(period);
  }, [period]);

  function getCurrentPeriodDates(period) {
    const now = new Date();
    const start = new Date();
    const end = new Date();
  
    if (period === 'weekly') {
      start.setDate(now.getDate() - now.getDay());
      end.setDate(start.getDate() + 6);
    } else if (period === 'monthly') {
      start.setDate(1);
      end.setFullYear(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (period === 'annually') {
      start.setFullYear(now.getFullYear(), 0, 1);
      end.setFullYear(now.getFullYear(), 11, 31);
    } else if (period === 'all-time') {
      start.setFullYear(1970, 0, 1);
      end.setDate(now.getDate());
    }
  
    if (end > now) {
      setDates({ start, end: now });
    } else{
      setDates({ start, end });
    }
  }
  

  const shiftDates = (direction) => {
    const now = new Date();
    const start = new Date(dates.start);
    const end = new Date(dates.end);

    switch (period) {
      case 'weekly':
        start.setDate(start.getDate() + direction * 7);
        end.setDate(start.getDate() + 6);
        break;
      case 'monthly':
        start.setMonth(start.getMonth() + direction);
        end.setFullYear(start.getFullYear(), start.getMonth() + 1, 0);
        break;
      case 'annually':
        start.setFullYear(start.getFullYear() + direction);
        end.setFullYear(start.getFullYear(), 11, 31);
        break;
      default:
        return;
    }

    if (start > now) {
      getCurrentPeriodDates(period)
    } else if (end > now) {
      setDates({ start, end: now });
    } else {
      setDates({ start, end });
    }
  };


  function formatDate(date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  let summaryText = (
    <div>
      You made <strong>80 sales</strong> amounting to 
      <br/><strong>Php 1,000,000</strong> between<br/>
      {formatDate(dates.start)} to {formatDate(dates.end)}.
    </div>
  );
  
  if (period === 'all-time') {
    summaryText = (
      <div>
        You made <strong>80 sales</strong> amounting to 
        <br/><strong>Php 1,000,000</strong> upto<br/>
        {formatDate(dates.end)}
      </div>
    );
  }  

  return (
    <div>
      <div id="top-bar">
        <span className="summary">
          {summaryText}
        </span>
      </div>

      <div id='product-sales-card-container'>
        <ProductSalesCards products={dummyProducts} dates={{ start: formatDate(dates.start), end: formatDate(dates.end) }}></ProductSalesCards>
      </div>

      <div id="vignette"></div>

      <div id="bottom-toolbar">
        <select 
          className="period-selector"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="weekly">WEEKLY</option>
          <option value="monthly">MONTHLY</option>
          <option value="annually">ANNUALLY</option>
          <option value="all-time">ALL TIME</option>
        </select>

        <span className="toolbar-text">
          Showing sales from:
          <span className="period start"> {formatDate(dates.start)} </span>
          to
          <span className="period end"> {formatDate(dates.end)} </span>
        </span>

        <button className="toolbar-button left" onClick={() => shiftDates(-1)}>&lt;</button>
        <button className="toolbar-button right" onClick={() => shiftDates(1)}>&gt;</button>
        <button className="toolbar-button arrow" onClick={() => getCurrentPeriodDates(period)}>&#8634;</button>
      </div>
    </div>
  );
}

export default Sales;
