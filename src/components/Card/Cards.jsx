import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { sliderSettings } from "../../utils/common";
import "swiper/css";
import "./Cards.css";
import data from "../../utils/slider.json";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cards = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonClick = () => {
    navigate('/product'); // Navigate to the product page
  };

  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="r-heading">Organizations of Stamps <br /> Collection Categories</span>
        </div>

        <Swiper {...sliderSettings}>
          <SliderButtons />
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card">
                <img src={card.image} alt="stamp" />

                <span className="secondaryText r-price">
                  <span style={{ color: "orange" }}>Rs</span>
                  <span>{card.price}</span>
                </span>

                <span className="primaryText">{card.name}</span>
                <span className="secondaryText">{card.detail}</span>

                <button 
                  className="product-button" 
                  onClick={handleButtonClick}
                >
                  View Details
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Cards;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-button">
      <button onClick={() => swiper.slidePrev()}></button>
      <button onClick={() => swiper.slideNext()}></button>
    </div>
  );
};
