import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import './Category.css';

const Definitive = () => {
  const [products, setProducts] = useState([]);
  
  const {addToCart}= useContext(CartContext);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('category', '==', 'Definitive'));
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product, () => {
      // Trigger notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000); // Hide notification after 3 seconds
    });
  };

  return (
    <div className="category-page">
      <h1>Definitive Items</h1>
      <div className="product-list">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <div className="product-info">
              <p className="product-price">₹ {product.price}</p>
              <div className="add-to-cart" onClick={(e) => handleAddToCart(e, product)}>
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </div>
            </div>
          </Link>
        ))}
      </div>
      {showNotification && (
        <div className="notification">
          Product added to cart successfully! <Link to="/cart" className="view-cart-link">View Cart</Link>
        </div>
      )}
    </div>
  );
};

export default Definitive;
