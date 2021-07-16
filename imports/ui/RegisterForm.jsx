import { Meteor } from "meteor/meteor";
import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Register } from "../api/register";
import { useTracker } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";


export const RegisterForm = () => {
  const history = useHistory();
  // const user = useTracker(() => {
  //   return Register.find().fetch();
  // });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (password === confirmPassword && email && password) {
      Accounts.createUser({
        email: email,
        password: password
      });
    history.push("/");

    } else {
      alert("password did not match");
    }
  };
  const clickHandler = () => {
    history.push("/login");
  };
  // console.log(user);
  return (
    <Fragment>
      <form className="login-form">
        <label htmlFor="email">Email</label>

        <input
          type="email"
          placeholder="Email"
          name="email"
          pattern=".+@globex\.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>

        <input
          type="password"
          placeholder="ConfirmPassword"
          name="confirmPassword"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          onClick={(e) => {
            submit(e);
          }}
        >
          Register
        </button>
      </form>
      <button onClick={clickHandler}>Login</button>
    </Fragment>
  );
};
