// src/components/UserCrud.js
import axios from "axios";
import React, { useState, useEffect } from "react";

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editUser, setEditUser] = useState(null);

  // Fetch Users (display data)
  const getUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log("Fetched users:", response.data); // Debug line
      setUsers(response.data); // Should be an array
    } catch (error) {
      console.error("There was an error fetching users!", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Create User (Add)
  const createUser = async (user) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        user
      );
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.error("There was an error creating the user!", error);
    }
  };

  // Update User (Edit)
  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updatedUser
      );
      console.log(response);
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );
      setEditUser(null);
    } catch (error) {
      console.error("There was an error updating the user!", error);
    }
  };

  // Delete User (Delete)
  const deleteUser = async (id) => {
    try {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      console.log(response);
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  return (
    <div>
      <h2>CRUD Operations with React and Axios</h2>

      {/* User Create Form */}
      <div>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button
          onClick={() => createUser(newUser)}
          disabled={!newUser.name.trim() || !newUser.email.trim()}
        >
          Add User
        </button>
      </div>

      {/* User List */}
      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {editUser?.id === user.id ? (
              <div>
                <input
                  type="text"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                />
                <button onClick={() => updateUser(user.id, editUser)}>
                  Update
                </button>
                <button onClick={() => setEditUser(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>
                  {user.name} - {user.email}
                </span>
                <button onClick={() => setEditUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCrud;
