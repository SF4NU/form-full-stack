import React, { useState, useEffect } from "react";
import axios from "axios";

function Prova() {
  const [backend, setBackend] = useState([{}]);
  const URL = "http://localhost:2121/testapi";
  useEffect(() => {
    const fetchFromMongoDB = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setBackend(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFromMongoDB();
  }, []);

  return (
    <>
      <section>
        {typeof backend.users === "undefined" ? (
          <p>Loading...</p>
        ) : (
          backend.users.map((user, i) => <p key={i}>{user}</p>)
        )}
      </section>
    </>
  );
}

export default Prova;
