import React, { useEffect, useState } from "react";
import Unauthorized from "/src/components/Unauthorized";
import Unauthenticated from "/src/components/Unauthenticated";
import Auth from "/src/hooks/Auth";

import "/src/styles/adminOrders.css";

function Orders() {

  const { isAuthenticated, isAdmin } = Auth(); 

  const [currentView, setCurrentView] = useState("pending");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`http://localhost:4000/admin/orders`)
        .then((response) => response.json())
        .then((body) => {
          setOrders(body);
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`http://localhost:4000/products/`)
        .then((response) => response.json())
        .then((body) => {
          setProducts(body);
        });
    }
  }, [isAuthenticated]);

  if (isAuthenticated == null) {
    return; 
  }

  if (!isAuthenticated) {
    return <Unauthenticated />;
  }

  if (!isAdmin) {
    return <Unauthorized />;
  }

  const pendingOrders = orders.filter((order) => order.orderStatus === 0);
  const completedOrders = orders.filter((order) => order.orderStatus === 1);
  const canceledOrders = orders.filter((order) => order.orderStatus === 2);

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
        fetch(`http://localhost:4000/admin/orders`)
          .then((response) => response.json())
          .then((body) => {
            setOrders(body);
          });
      });
  }

  const renderOrderSection = (orders) => (
    <div>
      {orders.map((order) => {
        const date = new Date(order.dateOrdered);

        const formattedDate = date.toLocaleDateString("en-US", dateOptions);
        const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
        const product = products.find(
          (product) => product.productId === order.productId
        );

        return (
          <div key={order.productId} className="admin-order-item">
            <img
              src={product?.productImg}
              alt={product?.productName}
              className="admin-order-image"
            />
            <div className="admin-order-details">
              <h3>{product?.productName}</h3>
              <p>Quantity: {order.orderQuantity}</p>
              <p>
                Ordered on: {formattedDate} at {formattedTime}
              </p>
              <p>Ordered by: {order.email}</p>
            </div>
            {order.orderStatus === 0 && (
              <button onClick={() => handleConfirmOrder(order.transactionId)}>
                Confirm Order
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="orders-container">
      <div id="top-bar">
        <span className="summary">
          <strong>{pendingOrders.length}</strong> pending{" "}
          {pendingOrders.length === 1 ? "order" : "orders"}
        </span>
      </div>
      <div className="admin-order-nav">
        <select
          value={currentView}
          onChange={(e) => setCurrentView(e.target.value)}
        >
          <option value="pending">Pending Orders</option>
          <option value="completed">Completed Orders</option>
          <option value="canceled">Canceled Orders</option>
        </select>
      </div>

      {currentView === "pending" && renderOrderSection(pendingOrders)}
      {currentView === "completed" && renderOrderSection(completedOrders)}
      {currentView === "canceled" && renderOrderSection(canceledOrders)}
    </div>
  );
}

export default Orders;
