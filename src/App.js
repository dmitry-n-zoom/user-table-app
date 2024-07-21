import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import Search from "./components/Search";
import Modal from "./components/Modal";
import { fetchUsers, searchUsers } from "./services/userService";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        setError("Failed to fetch users. Please try again later.");
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    window.alert(
      "Здравствуйте! Посик осущетсвляется только по параметру lastName при помощи 'https://dummyjson.com/users/filter'"
    );
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setError(null); // Reset error state before new request
    try {
      const searchedUsers = await searchUsers(query);
      setFilteredUsers(searchedUsers);
    } catch (error) {
      setError(`Failed to search users. ${error.message}`);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="app">
      {error && <div className="error-message">{error}</div>}
      <Search onSearch={handleSearch} query={searchQuery} />
      <Table users={filteredUsers} onRowClick={handleRowClick} />
      {isModalOpen && <Modal user={selectedUser} onClose={closeModal} />}
    </div>
  );
};

export default App;
