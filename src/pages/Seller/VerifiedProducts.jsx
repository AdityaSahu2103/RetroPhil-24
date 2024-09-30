import React, { useEffect, useState, useContext } from 'react';
import { db } from '../../pages/firebase'; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext'; // Import the CartContext
import './VerifiedProducts.css';

const VerifiedProducts = () => {
  const [products, setProducts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useContext(CartContext); // Get addToCart from context

  useEffect(() => {
    const fetchVerifiedProducts = async () => {
      const productsRef = collection(db, 'sellerProducts');
      const q = query(productsRef, where('status', '==', 'Verified'));
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };

    fetchVerifiedProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, () => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 6000); // Hide notification after 6 seconds
    });
  };

  return (
    <div className="verified-products-container">
      <div className='bg-red-400 text-xl font-bold text-green-900 py-3 rounded-lg lg:mx-80 md:mx-80'>Verified Products</div>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No verified products available.</p>
        ) : (
          products.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <div className="my-6">{product.name}</div>
                <p className="product-price text-xl">₹ {product.price}</p>
                <Link to={`/seller-products/${product.id}`} className="view-details-button bg-zinc-200 mr-3 p-3 rounded-lg text-lg text-black font-bold">View Details</Link>
                <button className="add-to-cart-button font-bold text-lg" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showNotification && (
        <div className="notification">
          Product added to cart successfully! 
          <Link to="/cart" className="view-cart-link">View Cart</Link> {/* View Cart link */}
        </div>
      )}
    </div>
  );
};

export default VerifiedProducts;
