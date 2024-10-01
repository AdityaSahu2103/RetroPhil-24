import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './AddSellerProduct.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead

const AddSellerProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    timeline: []
  });

  const navigate = useNavigate(); // Initialize useHistory for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      console.log('Current User:', user);
      if (user) {
        const newProduct = {
          ...product,
          sellerId: user.uid,
          status: 'Pending Verification',
          createdAt: serverTimestamp(),
          timeline: [
            { status: 'Form Submitted', timestamp: new Date() }
          ]
        };

        await addDoc(collection(db, 'sellerProducts'), newProduct);
        alert('Product added successfully!');
        setProduct({ name: '', description: '', price: '', category: '', image: '', timeline: [] });
      } else {
        alert('User not authenticated.');
      }
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('Failed to add product.');
    }
  };

  const categories = [
    "Commemorative",
    "Definitive",
    "100 Year Old Stamps",
    "Agriculture Theme",
    "Aircrafts & Aviation",
    // Add more categories as needed
  ];

  // Function to handle navigation
  const handleBackToDashboard = () => {
    navigate('/seller-dashboard'); // Adjust the route to your seller dashboard
  };

  return (
    <div className="add-product">
      <div className='text-zinc-50 bg-red-700 px-5 py-2 rounded-md'>Add New Product</div>
      <button className="add-product-back-to-dashboard mb-3" onClick={handleBackToDashboard}>
        Back to Seller Dashboard
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="image" value={product.image} onChange={handleChange} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddSellerProduct;
