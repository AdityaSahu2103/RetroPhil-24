import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Add serverTimestamp
import './AddProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add product to Firestore with createdAt field using serverTimestamp
      await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: serverTimestamp() // Automatically set createdAt to the current server time
      });

      alert('Product added successfully!');
      setProduct({ name: '', description: '', price: '', category: '', image: '' });
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

  return (
    <div className="add-product">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={product.price} onChange={handleChange} required />
        </label>
        <label>
          Category:
          <select name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <label>
          Image URL:
          <input type="text" name="image" value={product.image} onChange={handleChange} required />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;