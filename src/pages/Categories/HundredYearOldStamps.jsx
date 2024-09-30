import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import './Category.css';

const HundredYearOldStamps = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('category', '==', '100 Year Old Stamps'));
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    // Add the product to the cart (you can implement this logic as needed)
    navigate('/cart');
  };

  return (
    <div className="category-page">
      <h1>100 Year Old Stamps</h1>
      <div className="product-list">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className=" text-black my-4">{product.name}</div>
            <div className="product-info">
              <p className="product-price">₹ {product.price}</p>
              <div className="add-to-cart" onClick={(e) => handleAddToCart(e, product.id)}>
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HundredYearOldStamps;
