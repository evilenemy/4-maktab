import React from "react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = ({ api }) => {
  const [login_, setLogin_] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(login_, password, api);
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Login
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => setLogin_(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Parol
          </label>
          <input
            className="form-control"
            id="exampleFormControlTextarea1"
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isLoading && (
          <button type="submit" className="btn btn-primary p-2">
            Login
          </button>
        )}
        {isLoading && (
          <button className="btn btn-primary p-2" type="submit" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>{" "}
            Loading...
          </button>
        )}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
