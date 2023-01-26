import React from "react";

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
          <h1 className="about-scholl">Bizning maktabimiz haqida</h1>
          <p className="about-text">
            Ushbu malumotlar orqali maktabimiz haqida qisqacha ma'lumotga ega
            bo'lishingiz mumkin.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
