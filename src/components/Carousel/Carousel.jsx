import React, { useEffect, useState } from 'react';
import './Carousel.css';

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    {
      imgSrc: "/Corousal2.jpg",              //change imgs here
      caption: 'Caption Text',
    },
    {
      imgSrc: "slideshow.png",
      caption: 'Caption Two',
    },
    {
      imgSrc: "slideshow.png",
      caption: 'Caption Three',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); //time 3 sec   (1 sec = 1000ms)
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`mySlides fade ${index === slideIndex ? 'active-slide' : ''}`}
          style={{ display: index === slideIndex ? 'block' : 'none' }}
        >
          <div className="numbertext">{`${index + 1} / ${slides.length}`}</div>
          <img src={slide.imgSrc} alt={slide.caption} style={{ width: '100%' }} />
          <div className="text">{slide.caption}</div>
        </div>
      ))}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === slideIndex ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
