import React from "react";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import next from "../icons/icon_next.svg";
import { useState } from "react";
import { useEffect } from "react";
import { useLogout } from "../hooks/useLogout";

const Navbar = ({ user }) => {
  const location = useLocation();
  const [isopen, setIsOpen] = useState(false);
  const hamburgerActive = async () => {
    document.querySelector(".hamburger-menu").classList.toggle("active");
  };

  const removeActive = () => {
    document.querySelector(".hamburger-menu").classList.remove("active");
    setIsOpen(!isopen);
  };

  useEffect(() => {
    if (document.querySelector(".hamburger-menu.active")) {
      if (document.querySelector("nav").style.width <= "1220px") {
        document.querySelector(".hamburger-menu").classList.remove("active");
      }
    }
  }, []);

  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="brand container-fluid">
          <Link
            className={`navbar-brand nav-link
          ${location.pathname !== "/" ? "text-dark" : "text-white"}`}
            to={"/"}
          >
            Brand
          </Link>
          <div className="nav-links-ul">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link active ${
                    location.pathname !== "/" ? "text-dark" : "text-white"
                  }`}
                  style={{ width: "100px" }}
                  aria-current="page"
                  to={"/"}
                >
                  Bosh sahifa
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname !== "/" ? "text-dark" : "text-white"
                  }`}
                  style={{ width: "120px" }}
                  to={"/about"}
                >
                  Biz haqimizda
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname !== "/" ? "text-dark" : "text-white"
                  }`}
                  to={"/stats"}
                >
                  Tadbirlar
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname !== "/" ? "text-dark" : "text-white"
                  }`}
                  to={"/contact"}
                >
                  Aloqa
                </Link>
              </li>
            </ul>
            {user ? (
              <div>
                <Link
                  className={`mr-2 text-decoration-none ${
                    location.pathname !== "/" ? "text-dark" : "text-white"
                  }`}
                  to={"/dashboard"}
                >
                  {user.login}
                </Link>
                <button onClick={handleClick} className="btn btn-primary mx-2">
                  Log out
                </button>
              </div>
            ) : (
              <div className="login">
                <Link
                  className={`nav-link login-text ${
                    location.pathname !== "/" ? "text-dark" : "text-white"
                  }`}
                  to={"/login"}
                >
                  Login
                </Link>
                <Link className="btn btn-join" to={"/signup"}>
                  <span>Join Us</span> <img src={next} alt="Next" />{" "}
                </Link>
              </div>
            )}
          </div>
          <div onClick={hamburgerActive} name="hamburger" className="hamburger">
            <Hamburger
              color="#fff"
              size={40}
              toggled={isopen}
              toggle={setIsOpen}
              duration={0.6}
            />
          </div>
        </div>
      </nav>
      <div className="hamburger-menu">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              onClick={removeActive}
              className="nav-link active"
              aria-current="page"
              to={"/"}
            >
              Bosh sahifa
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={removeActive} className="nav-link" to={"/about"}>
              Biz haqimizda
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={removeActive} className="nav-link" to={"/stats"}>
              Tadbirlar
            </Link>
          </li>
          <li onClick={removeActive} className="nav-item">
            <Link className="nav-link" to={"/contact"}>
              Aloqa
            </Link>
          </li>
        </ul>

        <div className="login">
          <Link
            onClick={removeActive}
            className="nav-link login-text"
            to={"/login"}
          >
            Login
          </Link>
          <Link onClick={removeActive} className="btn btn-join text-white">
            <span>Join Us</span> <img src={next} alt="Next" />{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
