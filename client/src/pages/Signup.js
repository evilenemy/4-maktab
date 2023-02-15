import React from "react";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = ({ api }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpass, setConfpass] = useState("");
  const [conferror, setConferror] = useState(false);

  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confpass === password) {
      setConferror(false);
      await signup(login, password, email, false, api);
    } else {
      setConferror(true);
    }
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
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput2"
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea2" className="form-label">
            Parolni tasdiqlang
          </label>
          <input
            className="form-control"
            id="exampleFormControlTextarea2"
            required
            type="password"
            onChange={(e) => setConfpass(e.target.value)}
          />
        </div>
        {!isLoading && (
          <button type="submit" className="btn btn-primary p-2">
            Sign up
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
        {conferror && (
          <div className="error">Parolni tasdiqlashda xatolik!</div>
        )}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
