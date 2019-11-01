import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";

export default (
  <Switch>
    <Route component={Login} exact path="/" />
    <Route component={Home} path="/home" />
    <Route component={Register} path="/register" />
  </Switch>
);
