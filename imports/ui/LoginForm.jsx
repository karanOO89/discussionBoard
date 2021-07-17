import { Meteor } from "meteor/meteor";
import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import "./LoginForm.scss";

export const LoginForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        alert(err.message);
      } else {
        history.push("/info");
      }
    });
  };
  const clickHandler = () => {
    history.push("/register");
  };
  return (
    <div>
      <form onSubmit={submit} className="login-form">
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <button onClick={clickHandler}>Registration Page</button>
    </div>
  );
};
