import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Info } from "./Info.jsx";
import { LoginForm } from "./LoginForm.jsx";
import { RegisterForm } from "./RegisterForm.jsx";

export const App = () => (
  <div>
    <h1>Diccussion Board!</h1>

    <Router>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/">
          <Info />
        </Route>
      </Switch>
    </Router>
  </div>
);
