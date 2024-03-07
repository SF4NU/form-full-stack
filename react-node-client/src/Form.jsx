import React, { useState, useEffect } from "react";
import axios from "axios";

function Form({ setCheckIfLoggedIn }) {
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    pwd: "",
  });
  const [loginData, setLoginData] = useState({
    user: "",
    pwd: "",
  });

  const [pwdCheck, setPwdCheck] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [changeText, setChangeText] = useState("Già iscritto?");

  function handleChangeRegistration(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleChangeLogin(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function toCheckPwd(e) {
    setPwdCheck((p) => (p = e.target.value));
  }

  function changeChecked() {
    setIsChecked(!isChecked);
  }

  function changeCheckBox() {
    setCheckBox(!checkBox);
  }

  function toLogin() {
    const form = document.querySelector(".second-form");
    form.classList.remove("move-form2");
    form.classList.add("move-form");
    setIsChecked(true);
    setCheckBox(!checkBox);
  }

  function toLoginButton() {
    const form = document.querySelector(".second-form");
    if (!isChecked) {
      form.classList.remove("move-form2");
      form.classList.add("move-form");
      setIsChecked(!isChecked);
      setChangeText((t) => (t = "Registrati"));
    } else {
      form.classList.remove("move-form");
      form.classList.add("move-form2");
      setIsChecked(!isChecked);
      setChangeText((t) => (t = "Già iscritto?"));
    }
  }

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      if (formData.pwd === pwdCheck && isChecked) {
        const response = await axios.post(
          "https://form-react-node.vercel.app/api/users/register",
          formData
        );
        setFormData({
          user: "",
          email: "",
          pwd: "",
        });
        console.log("Status code:", response.status);
        setPwdCheck("");
        toLogin();
      } else if (!isChecked) {
        console.log("You must accept the privacy eula!");
      } else {
        console.log("Password doesnt match");
      }
    } catch (error) {
      console.error("Error registering:", error.response.data);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://form-react-node.vercel.app/api/users/login",
        loginData
      );
      setLoginData({
        user: "",
        pwd: "",
      });
      if (response.status === 201) {
        console.log("Logged in");
        setCheckIfLoggedIn(true);
      } else {
        console.log("No");
      }
    } catch (error) {
      console.error("Login unsuccessful!");
    }
  };

  return (
    <>
      <section className="container">
        <div className="main-form">
          <div className="div-registration">
            <h1>Registrazione</h1>
          </div>
          <form onSubmit={handleRegistration}>
            <div className="info">
              <div className="name">
                Nome utente:{" "}
                <input
                  onChange={handleChangeRegistration}
                  value={formData.user}
                  type="text"
                  placeholder="utente123"
                  name="user"
                />
              </div>
              <div className="surname">
                Email:{" "}
                <input
                  onChange={handleChangeRegistration}
                  value={formData.email}
                  type="text"
                  placeholder="esempio@mail.com"
                  name="email"
                />
              </div>
              <div className="email">
                Password:{" "}
                <input
                  onChange={handleChangeRegistration}
                  value={formData.pwd}
                  type="password"
                  placeholder="●●●●●●●●"
                  name="pwd"
                />
              </div>
              <div>
                Conferma Password:{" "}
                <input
                  onChange={toCheckPwd}
                  type="password"
                  placeholder="●●●●●●●●"
                  value={pwdCheck}
                />
              </div>
            </div>
            <div className="privacy">
              <input
                onClick={changeChecked}
                value={isChecked}
                type="checkbox"
                checked={checkBox}
                onChange={changeCheckBox}
                name="check"
                id="check"
              />
              <p>
                Acconsento che i dati forniti saranno trattati nel rispetto
                delle normative sulla privacy vigenti.
              </p>
            </div>
            <div className="submit">
              <input
                type="submit"
                value={"Registrati"}
                className="submit-button"></input>
            </div>
          </form>
          <div className="main-form-2">
            <div>
              <h1>Login</h1>
            </div>
            <form onSubmit={handleLogin}>
              <div className="info-2">
                <div className="username">
                  Nome Utente:{" "}
                  <input
                    onChange={handleChangeLogin}
                    value={loginData.user}
                    type="text"
                    placeholder="utente123"
                    name="user"
                  />
                </div>
                <div className="password">
                  Password:{" "}
                  <input
                    onChange={handleChangeLogin}
                    value={loginData.pwd}
                    type="password"
                    placeholder="●●●●●●●●"
                    name="pwd"
                  />
                </div>
              </div>
              <div className="submit">
                <input
                  className="submit-button access-button"
                  type="submit"
                  value={"Accedi"}></input>
              </div>
            </form>
          </div>
          <div className="second-form">
            <div className="signed">
              <h1 onClick={toLoginButton} className="goToLogin">
                {changeText}
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Form;
