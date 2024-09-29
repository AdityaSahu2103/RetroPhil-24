import React, { useState } from 'react';

const BecomeSellerForm = ({ onSubmit, onClose }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ businessName, businessAddress });
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className='text-2xl font-extrabold text-red-600 mx-auto'>Become a Seller</div>
          <button className="close-button text-gray-900 font-extrabold hover:bg-red-700 bg-red-400" onClick={onClose}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700">Business Name:</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700">Business Address:</label>
            <input
              type="text"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <button type="submit" className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeSellerForm;
