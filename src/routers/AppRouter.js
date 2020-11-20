import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={JournalScreen} />

        <Route exact path="/auth" component={AuthRouter}/>

        <Redirect to="/auth" />
      </Switch>
    </BrowserRouter>
  );
};
