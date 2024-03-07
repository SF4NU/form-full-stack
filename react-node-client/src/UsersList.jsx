import React, { useState, useEffect } from "react";
import axios from "axios";

function UsersList({ setCheckIfLoggedIn }) {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:2121/api/users/getUsers");
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="main-form form-list">
        <div>
          <h1 className="list-title">Lista Utenti Registrati</h1>
          <h5
            onClick={() => {
              setCheckIfLoggedIn(false);
            }}
            className="list-sub-title">
            Logout
          </h5>
        </div>
        <div className="list-div">
          <ul>
            {data.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default UsersList;
