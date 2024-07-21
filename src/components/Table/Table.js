import React, { useState } from "react";
import "./Table.css";

const Table = ({ users, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "none",
  });
  const [columnWidths, setColumnWidths] = useState({
    lastName: 200,
    age: 100,
    gender: 100,
    phone: 200,
    address: 200,
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        direction = "none";
      } else {
        direction = "ascending";
      }
    }
    setSortConfig({ key, direction });
  };

  const handleMouseDown = (e, key) => {
    const startX = e.clientX;
    const startWidth = columnWidths[key];

    const handleMouseMove = (e) => {
      const newWidth = Math.max(50, startWidth + e.clientX - startX);
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [key]: newWidth,
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const sortedUsers = [...users];
  if (sortConfig.key && sortConfig.direction !== "none") {
    sortedUsers.sort((a, b) => {
      const key = sortConfig.key;
      const aValue =
        key === "address" ? `${a.address.city} ${a.address.street}` : a[key];
      const bValue =
        key === "address" ? `${b.address.city} ${b.address.street}` : b[key];

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const getClassNamesFor = (name) => {
    if (!sortConfig.key || sortConfig.key !== name) {
      return "sort-none";
    }
    if (sortConfig.direction === "ascending") {
      return "sort-ascending";
    }
    if (sortConfig.direction === "descending") {
      return "sort-descending";
    }
    return "sort-none";
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th
            style={{ width: columnWidths.lastName }}
            onClick={() => handleSort("lastName")}
            className={getClassNamesFor("lastName")}
          >
            ФИО
            <div
              className="resizer"
              onMouseDown={(e) => handleMouseDown(e, "lastName")}
            />
          </th>
          <th
            style={{ width: columnWidths.age }}
            onClick={() => handleSort("age")}
            className={getClassNamesFor("age")}
          >
            Возраст
            <div
              className="resizer"
              onMouseDown={(e) => handleMouseDown(e, "age")}
            />
          </th>
          <th
            style={{ width: columnWidths.gender }}
            onClick={() => handleSort("gender")}
            className={getClassNamesFor("gender")}
          >
            Пол
            <div
              className="resizer"
              onMouseDown={(e) => handleMouseDown(e, "gender")}
            />
          </th>
          <th style={{ width: columnWidths.phone }}>
            Номер телефона
            <div
              className="resizer"
              onMouseDown={(e) => handleMouseDown(e, "phone")}
            />
          </th>
          <th
            style={{ width: columnWidths.address }}
            onClick={() => handleSort("address")}
            className={getClassNamesFor("address")}
          >
            Адрес
            <div
              className="resizer"
              onMouseDown={(e) => handleMouseDown(e, "address")}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id} onClick={() => onRowClick(user)}>
            <td>{`${user.firstName} ${user.lastName}`}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
            <td>{`${user.address.city}, ${user.address.address}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
