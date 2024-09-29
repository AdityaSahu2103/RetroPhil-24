import React, { useState } from 'react';

const BecomeSellerForm = ({ onSubmit }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the collected data back to the parent component
    onSubmit({ businessName, businessAddress });
  };

  return (
    <div className="modal">
      <div></div>
      <div className="modal-content">
        <h2>Become a Seller</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Business Name:</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Business Address:</label>
            <input
              type="text"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BecomeSellerForm;
