import { Meteor } from "meteor/meteor";
import React, { useState, Fragment } from "react";
import { RegisterForm } from "./RegisterForm";
import { useHistory } from "react-router-dom";


export const LoginForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password,(err)=>{
      if (err) {
        alert(err.message);
      } else {
        history.push("/");
      }
    });
  };
  const clickHandler = () =>{
    history.push("/register")
  }
  return (
    <Fragment>
      <form onSubmit={submit} className="login-form">
        <label htmlFor="username">Username</label>

        <input
          type="text"
          placeholder="Username"
          name="username"
          // value="meteorite"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          // value="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </form>
      <button onClick={clickHandler}>Register</button>
    </Fragment>
  );
};
