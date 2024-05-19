import React, { useState, useEffect } from "react";
import "/src/styles/Users.css";
import "/src/styles/Orders.css";
import UserOrdersModal from "/src/components/UserOrdersModal.jsx";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/admin/users`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (user) => user.email !== "admin@da.gov.ph"
        );
        setUsers(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  });

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <div id="top-bar">
        <span className="summary">
          <strong>{users.length}</strong>{" "}
          {users.length === 1 ? "user" : "users"} registered.
        </span>
      </div>
      <div>
        {users.map((user) => (
          <div
            key={user.userId}
            className="user-section"
            onClick={() => handleUserSelect(user)}
          >
            <div className="user-details">
              <h3 className="user-name">
                {user.firstName} T {user.middleName} {user.lastName}
              </h3>
              <h3 className="user-email">{user.email}</h3>
            </div>
          </div>
        ))}
      </div>
      {selectedUser && (
        <UserOrdersModal user={selectedUser} closeModal={handleCloseModal} />
      )}
    </div>
  );
}

export default Users;
