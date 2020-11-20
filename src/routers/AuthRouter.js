import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

//Components
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/auth/login" component={LoginScreen} />

            <Route exact path="/auth/register" component={RegisterScreen} />

            <Redirect to="/auth/login" />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};
