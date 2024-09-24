import React from 'react';
import { Link } from 'react-router-dom';
import './ExploreMore.css';

const ExploreMore = () => {
  const categories = [
    { name: "Commemorative", description: "Special stamps issued to commemorate significant events.", image: "Commemorative.png", link: "/categories/commemorative" },
    { name: "Definitive", description: "Regular stamps used for everyday postage.", image: "definitive.png", link: "/categories/definitive" },
    { name: "100 Year Old Stamps", description: "A collection of stamps that are over 100 years old.", image: "image.png", link: "/categories/100-year-old" },
    { name: "Agriculture", description: "Stamps featuring agricultural themes.", image: "agriculture.png", link: "/categories/agriculture" },
    { name: "Aircrafts & Aviation", description: "Stamps featuring aircrafts and aviation.", image: "aviation.png", link: "/categories/aviation" },
    // Add more categories as needed
  ];

  return (
    <div className="explore-more">
      <h1>Explore More</h1>
      <div className="categories">
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className="category-card">
            <img src={`/images/${category.image}`} alt={category.name} className="category-image" />
            <h2 className="category-name">{category.name}</h2>
            <p className="category-description">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
