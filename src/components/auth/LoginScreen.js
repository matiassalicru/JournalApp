import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import {
  startGoogleLogin,
  startLoginWithEmailPassword,
} from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {

  const { loading } = useSelector(state => state.ui);

  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const initialForm = {
    email: "matt@gmail.com",
    password: "123456",
  };

  const [formValues, handleInputChange] = useForm(initialForm); //Deben ser importados de forma desestructurada con el mismo orden en que fueron exportados.

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startLoginWithEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    }
    dispatch(removeError());

    return true;
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>

      {msgError && <div className="auth__alert-error">{msgError}</div>}

      <form
        onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <input
          className="auth__input"
          autoComplete="off"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={loading}
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login With Social Networks</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>

            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register">Create new account</Link>
      </form>
    </>
  );
};
