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
              <img src={monitor} alt="icons" />
              <h6>Kutubxona</h6>
              <hr />
              <p>
                Kutubxonamiz katta va kitoblar soni hamma o'quvchilarga yetadi
              </p>
            </div>
            <div className="card-about">
              <img src={lupa} alt="icons" />
              <h6>Sertifakatlar</h6>
              <hr />
              <p>
                O'quvchilarimiz va o'qituvchilarimizda turli xildagi
                sertifikatlar mavjud
              </p>
              <h4 className="about-more text-primary d-none ">
                Batafsil {" >"}
              </h4>
            </div>
            <div className="card-about">
              <img src={exam} alt="icons" />
              <h6>Kasbga yo'naltirish</h6>
              <hr />
              <p>
                Psixologlarimiz kasb-hunarga yo'naltirish bo'yicha o'quvchilar
                bilan har kuni ishlashadi
              </p>
            </div>
            <div className="card-about">
              <img src={ruksack} alt="icons" />
              <h6>Boshlang'ich ta'lim</h6>
              <hr />
              <p>
                Boshlang'ich ta'limdayoq o'quvchilar bilan psixologlar
                ishlashadi.
              </p>
              <h4 className="about-more text-primary d-none ">
                Batafsil {" >"}
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section className="events">
        <div className="wrapper">
          <h3 className="event-theme">Tadbirlar</h3>
          <h2 className="event-list">Bizda tadbirlar ro'yxati</h2>
          <p className="event-text">
            Bizda har oy fan oyliklarida ushbu fan uchun turli xildagi ochiq
            darslar yoki tadbirlar o'tqaziladi
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
