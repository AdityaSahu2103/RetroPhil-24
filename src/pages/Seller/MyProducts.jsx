import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Timeline from './TimeLine.jsx';
import './MyProducts.css';
import BackToDashboardButton from './BackToDashboardButton.jsx';

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const productsRef = collection(db, 'sellerProducts');
          const q = query(productsRef, where('sellerId', '==', user.uid));
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
          } else {
            console.log("No products found for this user.");
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        console.error("User not authenticated.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="my-products">
      <h1>My Products</h1>
      <BackToDashboardButton/>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <img src={product.image} alt={product.name} />
              <p>{product.description}</p>
              <h3>Status: {product.status}</h3>
              <h3>Timeline</h3>
              <Timeline events={product.timeline || []} />
            </div>
          ))
        ) : (
          <p>No products to display.</p>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
