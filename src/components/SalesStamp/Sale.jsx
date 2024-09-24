import React from 'react';
import './Sale.css';

const Sale = ({ data }) => {
  return (
    <div className="sale-card">
      <img src={data.image} alt={data.title} className="sale-image" />
      <div className="sale-details">
        <h3>{data.title}</h3>
        <p><strong>Year:</strong> {data.year}</p>
        <p><strong>Condition:</strong> {data.condition}</p>
        <p><strong>Country:</strong> {data.country}</p>
        <button className="add-to-cart">Add To Cart</button>
      </div>
    </div>
  );
};

export default Sale;
