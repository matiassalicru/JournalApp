import Swal from "sweetalert2";


import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { removeLoading, setLoading } from "./ui";


export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(setLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        Swal.fire("Error", e.message, "error");
        // dispatch(setError(e.message));
      })
      .then(() => dispatch(removeLoading()));
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    dispatch(setLoading());

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });

        dispatch(login(user.uid, user.displayName));
        await dispatch(removeLoading());
      })

      .catch((e) => {
        // dispatch(setError(e.message));
        dispatch(removeLoading());
        Swal.fire('Error', e.message, 'error')
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async(dispatch) => {
    await firebase.auth().signOut();

    dispatch( logout() );
  };
};

export const logout = () => {
  return ({
    type: types.logout,
  })
}
