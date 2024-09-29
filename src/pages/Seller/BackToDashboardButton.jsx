// BackToDashboardButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackToDashboardButton.css'; // Optional CSS for styling

const BackToDashboardButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/seller-dashboard'); // Change this to the route of your seller dashboard
  };

  return (
    <button className="back-to-dashboard" onClick={handleClick}>
      Go to Seller Dashboard
    </button>
  );
};

export default BackToDashboardButton;
