import React, { useEffect, useState } from 'react';
import '/src/styles/Orders.css';


function UserOrders() {
  const email = localStorage.getItem('email');
  const [currentUser, setCurrentUser] = useState({});
  const [currentView, setCurrentView] = useState('pending');
  const [orders, setOrders] = useState([]);



  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  useEffect(() => {
    fetch(`http://localhost:4000/user/orders?email=${email}`)
      .then(response => response.json())
      .then(body => {
        setOrders(body)
      })
  }, [orders])

  useEffect(() => {
    fetch(`http://localhost:4000/user/info?email=${email}`)
      .then(response => response.json())
      .then(body => {
        setCurrentUser(body)
      })
  }, [])

  const pendingOrders = orders.filter(order => order.orderStatus === 0);
  const completedOrders = orders.filter(order => order.orderStatus === 1);
  const canceledOrders = orders.filter(order => order.orderStatus === 2);

  function handleCancelOrder(transactionId) {

    fetch('http://localhost:4000/user/cancel-order', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId: transactionId }),
    })
    .then(response => {
      if (response.ok) {


        alert('Order cancelled succesfully');
      } else {
        alert('Error in cancelling order');
      }
    })

  }

  const renderOrderSection = (orders) => (
    <div>
      {orders.map(order => {
        const date = new Date(order.dateOrdered);

        const formattedDate = date.toLocaleDateString('en-US', dateOptions);
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

        return (
          <div key={order.transactionId} className="order-item">
            <img src={order.productImg} alt={order.productName} className="order-image" />
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
        <p>Account: {currentUser.firstName} {currentUser.middleName} {currentUser.lastName}</p>
        <p>Email: {currentUser.email}</p>
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
