import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebaseConfig'
import { login } from "../actions/auth";
import { LoadingScreen } from "../components/loading/LoadingScreen";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      firebase.auth().onAuthStateChanged( async (user) => {
        if (user?.uid) {
          dispatch(login(user.uid, user.displayName));
          setIsLoggedIn(true);

          
          dispatch( startLoadingNotes(user.uid) )

        } else {
          setIsLoggedIn(false)
        }

        setChecking(false);
      });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if(checking){
      return (
        <LoadingScreen/>
      )
    }

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoutes
          exact
          path="/"
          isLoggedIn={isLoggedIn}
          component={JournalScreen}
        />

        <PrivateRoutes
          exact
          path="/auth"
          isLoggedIn={isLoggedIn}
          component={AuthRouter}
        />

        <Redirect to="/auth" />
      </Switch>
    </BrowserRouter>
  );
};
