import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";

const Footer = () => {
  return (
    <footer>
      <div className="links">
        <div className="contacts">
          <div className="website-links">
            <h4>Links</h4>
            <Link to={"/"}>Bosh sahifa</Link>
            <Link to={"/about"}>Biz haqimizda</Link>
            <Link to={"/stats"}>Tadbirlar</Link>
            <Link to={"/contact"}>Aloqa</Link>
          </div>
          <div className="contacts-str">
            <div className="call">
              <span>
                <FiPhone />
              </span>{" "}
              <p>{"(480)"} 555-0103</p>
            </div>
            <div className="location">
              <span>
                <SlLocationPin />
              </span>{" "}
              <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
            </div>
            <div className="email">
              <span>
                <TfiEmail />
              </span>{" "}
              <p>debra.holt@example.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="connects">
        <div className="copyright">
          Copyright &copy; {new Date().getFullYear()}. Created by{" "}
          <a
            href="https://instagram.com/black_evilenemy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Evil Enemy
          </a>
        </div>
        <div className="icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
