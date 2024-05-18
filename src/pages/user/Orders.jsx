import React, { useEffect, useState } from 'react';
import '/src/styles/Orders.css';


function UserOrders() {
  const [currentView, setCurrentView] = useState('pending');
  const [orders, setOrders] = useState([]);
  const mockUser = {
    firstName: 'Franz Christian',
    middleName: 'Dela Cruz',
    lastName: 'Morelos',
    email: 'john.doe@example.com'
  };

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  useEffect(() => {
    fetch(`http://localhost:4000/user/orders?email=${mockUser.email}`)
      .then(response => response.json())
      .then(body => {
        setOrders(body)
      })
  })

  const pendingOrders = orders.filter(order => order.orderStatus === 0);
  const completedOrders = orders.filter(order => order.orderStatus === 1);
  const canceledOrders = orders.filter(order => order.orderStatus === 2);

  function handleCancelOrder(transactionId) {
    console.log(`Canceling order with Transaction ID: ${transactionId}`);
  }

  const renderOrderSection = (orders) => (
    <div>
      {orders.map(order => {
        const date = new Date(order.dateOrdered);

        const formattedDate = date.toLocaleDateString('en-US', dateOptions);
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

        return (
          <div key={order.productId} className="order-item">
            <img src={'https://via.placeholder.com/100'} alt={order.productName} className="order-image" />
            <div className="order-details">
              <h3>{order.productName}</h3>
              <p>Quantity: {order.orderQuantity}</p>
              <p>Ordered on: {formattedDate} at {formattedTime}</p>
            </div>
            {order.orderStatus === 0 && (
              <button onClick={() => handleCancelOrder(order.transactionId)}>Cancel Order</button>
            )}
          </div>
        );
      })}
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

export default UserOrders;
