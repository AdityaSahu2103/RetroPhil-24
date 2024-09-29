import React from 'react';
import './OrderStatus.css';

const OrderStatus = () => {
  const statuses = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'];
  const progress = 66.66;

  let currentStatus = statuses[0];

  if (progress < 25) {
    currentStatus = statuses[0];
  } else if (progress < 66.66) {
    currentStatus = statuses[1];
  } else if (progress < 100) {
    currentStatus = statuses[2];
  } else {
    currentStatus = statuses[3];
  }

  return (
    <div className="order-status-container">
      <div className="status-container">
        {statuses.map((status, index) => (
          <div key={index} className="text-xs font-semibold md:text-xl">
            {status}
          </div>
        ))}
      </div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div>
        <p className='text-lg font-semibold text-zinc-950'>Order Date :<span className='text-md font-sans'> 27:09:24</span></p>
        <p className='text-lg font-semibold text-zinc-950'>Estimated Date :<span className='text-md font-sans'> 18:10:24</span></p>
      </div>
      <div className="actions-container">
        <button className="action-button">Rate Us</button>
        <button className="action-button">Contact Us</button>
      </div>
    </div>
  );
};

export default OrderStatus;
