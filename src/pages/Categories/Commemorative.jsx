import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import './Category.css';

const Commemorative = () => {
  const [products, setProducts] = useState([]);
  
  const {addToCart}= useContext(CartContext);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('category', '==', 'Commemorative'));
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
    <div className="category-page bg-slate-100 ">
      <div className='bg-red-400 flex justify-center align-middle py-4 mb-6 text-2xl font-bold text-white'>Commemorative Stamps</div>
      <div className="product-list">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className=" text-black my-4">{product.name}</div>
            <div className="flex bg-zinc-200 w-full justify-evenly p-3 rounded-md">
              <p className="product-price">₹ {product.price}</p>
              <div className="text-xs font-bold text-white  bg-red-700 py-2 px-3 rounded-md" onClick={(e) => handleAddToCart(e, product)}>
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

export default Commemorative;
