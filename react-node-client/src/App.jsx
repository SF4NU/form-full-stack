// import Prova from "./Prova";
import React, { useState } from "react";
import Form from "./Form";
import UsersList from "./UsersList";

function App() {
  const [checkIfLoggedIn, setCheckIfLoggedIn] = useState(false);

  return (
    <>
      {/* <Prova></Prova> */}
      {!checkIfLoggedIn ? <Form setCheckIfLoggedIn={setCheckIfLoggedIn}/> : <UsersList setCheckIfLoggedIn={setCheckIfLoggedIn}/>}
    </>
  );
}

export default App;
