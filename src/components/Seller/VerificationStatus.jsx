import React, { useEffect, useState } from 'react';
import { db, auth } from '../../pages/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './VerificationStatus.css';
import BackToDashboardButton from '../../pages/Seller/BackToDashboardButton';

const VerificationStatus = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUser(user);
      
      const fetchProducts = async () => {
        const productsRef = collection(db, 'sellerProducts');
        const q = query(productsRef, where('sellerId', '==', user.uid));
        const snapshot = await getDocs(q);
        const productList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      };

      fetchProducts();
    }
  }, []);

  return (
    <div className="verification-status-page">
      <h2>Verification Status</h2>
      <BackToDashboardButton/>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>Status: {product.status}</p>
              <ul>
                {product.timeline && product.timeline.map((entry, index) => (
                  <li key={index}>
                    <strong>{entry.status}:</strong> {new Date(entry.timestamp?.seconds * 1000).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default VerificationStatus;
