import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginForm.scss";
import GoogleLogin, { googleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
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
  const googleLoginSuccess = (response) => {
    const googleEmail = response.profileObj.email;
    const password = response.profileObj.googleId;
    const email = googleEmail + " - Google a/c";

    Accounts.createUser(
      {
        email: email,
        password: password,
      },
      (err) => {
        if (err) {
          if (err.error === 403) {
            Meteor.loginWithPassword(email, password, (err) => {
              if (err) {
                alert(err.message);
              } else {
                history.push("/info");
              }
            });
          } else {
            alert(err.message);
          }
        } else {
          Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
              alert(err.message);
            } else {
              history.push("/info");
            }
          });
        }
      }
    );
  };
  const googleLoginFailure = (e) => {
    // console.log("failed", response);
    // console.log(response.profileObj);
  };
  const clickHandler = () => {
    history.push("/register");
  };
  return (
    <div>
      <form onSubmit={submit} className="login-form">
        <div>
          <input
            type="email"
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
        <button type="submit">Login</button>
      </form>
      <div className="registerBtns">
        <GoogleLogin
          clientId="678569978220-2rchfru3m2vh3rmck48sf3t4mrubqobu.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={{ color: "white" ,display:"flex",alignItems:"center",justifyContent:"center"}}
            >
              <FcGoogle size="25px"/>Login
            </button>
          )}
          onSuccess={googleLoginSuccess}
          onFailure={googleLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
        <button onClick={clickHandler}>Registration Page</button>
      </div>
    </div>
  );
};
