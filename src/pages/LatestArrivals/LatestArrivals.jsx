import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure the path to Firebase config is correct
import './LatestArrivals.css';

const LatestArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        // Fetch products ordered by 'createdAt' in descending order
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setProducts(productList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching latest products: ', error);
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="latest-arrivals">
      <h2>Latest Arrivals</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className='text-zinc-800'>{product.name}</h3>
            <p className='font-bold text-lg '>Price: ₹{product.price}</p>
            <p className='font-semibold'>Category: {product.category}</p>
            <p className='text-green-700 !important'>Added on: {new Date(product.createdAt.seconds * 1000).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestArrivals;
