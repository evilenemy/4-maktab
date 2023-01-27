import React from "react";
import exam from "../icons/exam.svg";
import lupa from "../icons/lupa.svg";
import monitor from "../icons/monitor.svg";
import ruksack from "../icons/ruksack.svg";

const Home = ({ api }) => {
  return (
    <div className="home">
      <div className="main">
        <div className="main-center">
          <h1>Buxoro shahar 4-son IDUM</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
            iusto!
          </p>
          <div className="main-buttons">
            <button className="main-about">Biz haqimizda</button>
            <button className="main-contact">Aloqa</button>
          </div>
        </div>
      </div>
      <section className="about">
        <div className="wrapper">
          <h3 className="about-theme">About</h3>
          <h2 className="about-scholl">Bizning maktabimiz haqida</h2>
          <p className="about-text">
            Ushbu malumotlar orqali maktabimiz <br /> haqida qisqacha ma'lumotga
            ega bo'lishingiz mumkin.
          </p>
          <div className="cards">
            <div className="card-about">
              <img src="" alt="" />
            </div>
            <div className="card-about"></div>
            <div className="card-about"></div>
            <div className="card-about"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
