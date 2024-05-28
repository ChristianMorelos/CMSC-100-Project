import React, { useState, useEffect } from 'react';
import '/src/styles/Sales.css';
import ProductSalesCards from '/src/components/ProductSalesCards.jsx';

function Sales() {
  const [period, setPeriod] = useState('monthly');
  const [dates, setDates] = useState({ start: new Date(), end: new Date() });

  useEffect(() => {
    getCurrentPeriodDates(period);
  }, [period]);

  function getCurrentPeriodDates(period) {
    const now = new Date();
    const start = new Date();
    const end = new Date();

    start.setHours(0, 0, 0, 0);
    now.setHours(23, 59, 59, 999);
    end.setHours(23, 59, 59, 999);
  
    if (period === 'weekly') {
      start.setDate(now.getDate() - now.getDay());
      end.setTime(start.getTime() + (6 * 24 * 60 * 60 * 1000));
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
        end.setTime(start.getTime() + (6 * 24 * 60 * 60 * 1000));
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


  const [productSales, setProductSales] = useState([]);

  useEffect(() => {
    fetchSalesData();
  });

  function fetchSalesData() {
    const queryString = `?start=${encodeURIComponent(dates.start.toISOString())}&end=${encodeURIComponent(dates.end.toISOString())}`;
    fetch(`http://localhost:4000/admin/sales${queryString}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        return response.json();
      })
      .then(data => {
        const filteredData = data.filter(item => item.periodSold > 0);
        setProductSales(filteredData);
      })
      .catch(error => {
        console.error('Failed to fetch sales data:', error);
      });
  }
  

  const periodTotalSold = productSales.reduce((acc, curr) => acc + curr.periodSold, 0);
  const periodTotalSales = productSales.reduce((acc, curr) => acc + curr.periodSales, 0);

  let summaryText = (
    <div>
      You made <strong>{periodTotalSold}</strong> {periodTotalSold > 1 ? 'sales' : 'sale'} amounting to 
      <br/><strong>Php {periodTotalSales}</strong> between<br/>
      {formatDate(dates.start)} to {formatDate(dates.end)}.
    </div>
  );
  
  if (period === 'all-time') {
    
  
    summaryText = (
      <div>
        You made <strong>{periodTotalSold}</strong> {periodTotalSold > 1 ? 'sales' : 'sale'} amounting to 
      <br/><strong>Php {periodTotalSales}</strong> up to<br/>
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
        <span id='nothing'>{periodTotalSold == 0 ? 'Nothing to show here.' : ''}</span>
        <ProductSalesCards products={productSales} dates={{ start: formatDate(dates.start), end: formatDate(dates.end) }}></ProductSalesCards>
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
