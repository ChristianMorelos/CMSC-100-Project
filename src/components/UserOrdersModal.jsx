import React, { useEffect, useState } from 'react';
import '/src/styles/Orders.css';

function UserOrdersModal({ user, closeModal }) {
  const [currentView, setCurrentView] = useState('pending');
  const [orders, setOrders] = useState([]);

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  useEffect(() => {
    fetch(`http://localhost:4000/user/orders?email=${user.email}`)
      .then(response => response.json())
      .then(body => {
        setOrders(body)
      })
  })

  const pendingOrders = orders.filter(order => order.orderStatus === 0);
  const completedOrders = orders.filter(order => order.orderStatus === 1);
  const canceledOrders = orders.filter(order => order.orderStatus === 2);

  function handleConfirmOrder(transactionId) {
    console.log(`Confirming order with Transaction ID: ${transactionId}`);

    fetch(`http://localhost:4000/admin/order-fulfillment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId }),
    })
      .then((response) => response.text())
      .then((body) => {
        console.log(body);
      });
  }


  const renderOrderSection = (orders) => {  
    if (orders.length === 0) {
      return <center>Nothing to show here</center>;
    }
  
    return (
      <div className="order-section">
        {orders.map((order) => {
          const date = new Date(order.dateOrdered);
          const formattedDate = date.toLocaleDateString('en-US', dateOptions);
          const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  
          return (
            <div key={order.productId} className="admin-order-item">
              <img src={'https://via.placeholder.com/100'} alt={order.productName} className="order-image" />
              <div className="order-details">
                <h3>{order.productName}</h3>
                <p>Quantity: {order.orderQuantity}</p>
                <p>Ordered on: {formattedDate} at {formattedTime}</p>
              </div>
              {order.orderStatus === 0 && (
                <button onClick={() => handleConfirmOrder(order.transactionId)}>Confirm Order</button>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-user-order" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="modal-user-details">
          <p>Account: {user.firstName} {user.middleName} {user.lastName}</p>
          <p>Email: {user.email}</p>
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
    </div>
  );
}

export default UserOrdersModal;
