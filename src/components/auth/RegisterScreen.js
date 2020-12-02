import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";

//custom hooks
import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {
  const [values, handleInputChange] = useForm({
    name: "Matt",
    email: "mattias@gmail.com",
    password: "123456",
    password2: "123456",
  });

  const { name, email, password, password2 } = values;

  const dispatch = useDispatch();
  const { msgError, loading } = useSelector((state) => state.ui);

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch( startRegisterWithEmailPasswordName(email, password, name) );
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email is invalid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError("Passwords should be at least 6 char, and match each other")
      );
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          className="auth__input"
          autoComplete="off"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />

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

        <input
          className="auth__input"
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />

        <button
          className="mb-5 btn btn-primary btn-block"
          type="submit"
          disabled={loading}
        >
          Register
        </button>

        <Link className="link" to="/auth/login">
          Already Registered
        </Link>
      </form>
    </>
  );
};
