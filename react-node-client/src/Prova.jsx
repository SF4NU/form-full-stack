// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Prova() {
//   const [backend, setBackend] = useState([{}]);
//   const URL = "http://localhost:2121/api/users/getUsers";
//   useEffect(() => {
//     const fetchFromMongoDB = async () => {
//       try {
//         const res = await fetch(URL);
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await res.json();
//         setBackend(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchFromMongoDB();
//   }, []);

//   return (
//     <>
//       <section>
//         {backend.map((user, index) => (
//           <div key={index}>
//             <p>{user.username}</p>
//             <p>{user.password}</p>
//           </div>
//         ))}
//       </section>
//     </>
//   );
// }

// export default Prova;
