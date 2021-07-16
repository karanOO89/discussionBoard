import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Info } from "./Info.jsx";
import { LoginForm } from "./LoginForm.jsx";
import { RegisterForm } from "./RegisterForm.jsx";

export const App = () => (
  <div>
    <h1>Discussion Board!</h1>

    <Router>
      <Switch>
        <Route path="/register" component={RegisterForm} />
        <Route path="/info" component={Info} />
        <Route path="/" exact component={LoginForm} />
      </Switch>
    </Router>
  </div>
);
