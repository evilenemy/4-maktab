import React, { useEffect, useState } from "react";
import exam from "../icons/exam.svg";
import lupa from "../icons/lupa.svg";
import monitor from "../icons/monitor.svg";
import ruksack from "../icons/ruksack.svg";
import kind from "../icons/kind.svg";
import next from "../icons/next.svg";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Pagination, Autoplay } from "swiper";
import { Link } from "react-router-dom";

const Home = ({ api }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submit_loading, setSLoading] = useState("");
  useEffect(() => {
    setError(true);
    axios
      .get(`${api}/slides`)
      .then((res) => setSlides(res.data), setError(null), setLoading(false))
      .catch((err) => setError(err), setLoading(false), setSlides([]));
  }, [api]);
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
            Bizda har oy fan oyliklarida ushbu fan <br /> uchun turli xildagi
            ochiq darslar yoki tadbirlar o'tqaziladi
          </p>
          <Swiper
            spaceBetween={10}
            slidesPerView={"auto"}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Keyboard, Pagination, Autoplay]}
            rewind={true}
            className="mySwiper cards"
          >
            {slides.map((slide) => (
              <SwiperSlide className="card-event">
                <img
                  src={api + slide.images[0].path}
                  alt="event-img"
                  className="card-image"
                />
                <div className="card-body">
                  <h3>{slide.title}</h3>
                  <p>
                    {slide.body.length > 327
                      ? slide.body.slice(0, 327) + "..."
                      : slide.body}
                  </p>
                  <Link to={"/event/" + slide._id} className="more-link d-none">
                    Batafsil {" >"}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
            {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}
          </Swiper>
        </div>
      </section>
      <section className="kinder-info">
        <div className="wrapper">
          <div className="left">
            <img src={kind} alt="Kind" />
          </div>
          <div className="right">
            <hr />
            <h2>
              Our Experts <br /> Teacher
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
              Reiciendis nostrum eum <br /> odio officiis dolorem nesciunt.
            </p>
            <Link to={"/about"}>
              Learn more <img src={next} alt="" />
            </Link>
          </div>
        </div>
      </section>
      <section className="contact-comment">
        <h3 className="contact-theme">Contact</h3>
        <h2 className="contact-title">O'z fikringizni qoldiring</h2>
        <p className="contact-text">
          Bizning maktabimiz uchun bildirilgan har bir fikr biz uchun muhm.
        </p>
        <form>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
