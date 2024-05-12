import React, { useState } from 'react';
import '../styles/Orders.css';

function Orders() {
  const [currentView, setCurrentView] = useState('pending');

  const mockUser = {
    firstName: 'Franz Christian',
    middleName: 'Dela Cruz',
    lastName: 'Morelos',
    email: 'fdmorelos@up.edu.ph'
  };

  const mockOrders = [
    { transactionId: '1', productId: '101', productName: 'Organic Apples', orderQuantity: 3, orderStatus: 0, email: mockUser.email, dateOrdered: new Date().toISOString().slice(0, 10), imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Apples_in_a_basket.jpg'},
    { transactionId: '2', productId: '102', productName: 'Almond Milk', orderQuantity: 5, orderStatus: 1, email: mockUser.email, dateOrdered: new Date().toISOString().slice(0, 10), imageUrl: 'https://foodbyjonister.com/wp-content/uploads/2018/02/AlmondMilk2-1035x1300.jpg' },
    { transactionId: '3', productId: '103', productName: 'Whole Wheat Bread', orderQuantity: 2, orderStatus: 0, email: mockUser.email, dateOrdered: new Date().toISOString().slice(0, 10), imageUrl: 'https://bakingamoment.com/wp-content/uploads/2019/01/IMG_2403-best-soft-whole-wheat-bread-recipe.jpg' }
  ];

  const pendingOrders = mockOrders.filter(order => order.orderStatus === 0);
  const completedOrders = mockOrders.filter(order => order.orderStatus === 1);
  const canceledOrders = mockOrders.filter(order => order.orderStatus === 3);

  function handleCancelOrder(transactionId) {
    console.log(`Canceling order with Transaction ID: ${transactionId}`);
  }

  const renderOrderSection = (orders) => (
    <div>
      {orders.map(order => (
        <div key={order.transactionId} className="order-item">
          <img src={order.imageUrl} alt={order.productName} className="order-image" />

          <div className="order-details"> 
            <h3>{order.productName}</h3>
            <p>Quantity: {order.orderQuantity}</p>
            <p>Ordered on: {order.dateOrdered}</p>
          </div>
          
          {order.orderStatus === 0 && (
            <button onClick={() => handleCancelOrder(order.transactionId)}>Cancel Order</button>
          )}
          
        </div>
      ))}
    </div>
  );

  return (
    <div className="orders-container">
      <div className="user-details">
        <p>Account: {mockUser.firstName} {mockUser.middleName} {mockUser.lastName}</p>
        <p>Email: {mockUser.email}</p>
      </div>

      <div className="order-nav">
        <select value={currentView} onChange={(e) => setCurrentView(e.target.value)}>
          <option value="pending">Pending Orders</option>
          <option value="completed">Completed Orders</option>
          <option value="canceled">Canceled Orders</option>
        </select>
      </div>
      
      {currentView === 'pending' && renderOrderSection(pendingOrders)}
      {currentView === 'completed' && renderOrderSection(completedOrders)}
      {currentView === 'canceled' && renderOrderSection(canceledOrders)}
    </div>
  );
}

export default Orders;
