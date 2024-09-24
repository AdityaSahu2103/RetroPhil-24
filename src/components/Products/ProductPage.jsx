import React, { useEffect, useState, useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../pages/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CartContext } from '../../CartContext';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product, () => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000); // Hide notification after 3 seconds
    });
  };   

  if (!product) {
    return <div>Loading...</div>;
  }
 

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={product.image} // Replace with your actual image path
            alt={product.name}
            className="object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        {/* Details Section */}
        <div className="p-10 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <h3 className="text-xl font-semibold mb-4">{product.category}</h3>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-2xl font-bold mb-6">₹{product.price}</p>
            <p className="text-sm text-gray-500 mb-6">Shipping to the UK: Free</p>
          </div>

          {/* Buttons */}
          <div>
            <div className="flex space-x-4 mb-6">
              <button className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800" onClick={(e) => handleAddToCart(e, product)}>
                Add to Cart
              </button>
              <button className="border border-gray-300 px-6 py-3 rounded hover:bg-gray-100">
                Enquiries/Payments
              </button>
            </div>

            {/* Wishlist and Delivery Information */}
            <div className="flex space-x-4 items-center text-gray-500 text-sm">
              <button className="hover:text-gray-700">Add to Wishlist</button>
              <span>|</span>
              <button className="hover:text-gray-700">Delivery</button>
              <span>|</span>
              <button className="hover:text-gray-700">Returns</button>
              <span>|</span>
              <button className="hover:text-gray-700">Payment</button>
            </div>
          </div>
        </div>
      </div>
      {showNotification && (
        <div className="notification">
          Product added to cart successfully! <Link to="/cart" className="view-cart-link">View Cart</Link>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
