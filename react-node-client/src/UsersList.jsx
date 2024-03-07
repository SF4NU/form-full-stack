import React, { useState, useEffect } from "react";
import axios from "axios";

function UsersList({ setCheckIfLoggedIn }) {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://form-react-node.vercel.app/api/users/getUsers"
        );
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
          <h1 className="list-title">Benvenuto!</h1>
          <h5
            onClick={() => {
              setCheckIfLoggedIn(false);
            }}
            className="list-sub-title">
            Logout
          </h5>
        </div>
      </div>
    </>
  );
}

export default UsersList;
