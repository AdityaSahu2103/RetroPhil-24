import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../../pages/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const [user, setUser] = useState(null);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [listedProducts, setListedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchPendingProducts(user.uid);
        fetchListedProducts(user.uid);
      } else {
        navigate('/signup');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchPendingProducts = async (userId) => {
    const productsRef = collection(db, 'sellerProducts');
    const q = query(productsRef, where('sellerId', '==', userId), where('status', 'in', ['Pending Verification', 'Received']));
    const snapshot = await getDocs(q);
    const pendingList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPendingProducts(pendingList);
  };

  const fetchListedProducts = async (userId) => {
    const productsRef = collection(db, 'sellerProducts');
    const q = query(productsRef, where('sellerId', '==', userId), where('status', '==', 'Verified'));
    const snapshot = await getDocs(q);
    const listedList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setListedProducts(listedList);
  };

  const handleViewCertificate = (certificateNumber) => {
    if (!certificateNumber) {
      alert("No certificate available for this product.");
    } else {
      navigate(`/certificate/${certificateNumber}`);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="seller-dashboard">
      <aside className="sidebar">
        <h2>Seller Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/add-seller-product">Add New Product</Link></li>
            <li><Link to="/my-products">My Products</Link></li>
            <li><Link to="/verification-status">Verification Status</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <h1>Welcome to Your Dashboard</h1>

        <section className="listed-products">
          <h2 className="listed-products-title">Listed Products</h2>
          <div className="product-cards"> {/* This is the updated section */}
            {listedProducts.length > 0 ? (
              listedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p>Status: {product.status}</p>
                  <img src={product.image} alt={product.name} />
                  <p>Price: ₹  {product.price}</p>
                  {product.certificateNumber ? (
                    <button onClick={() => handleViewCertificate(product.certificateNumber)}>
                      View Certificate
                    </button>
                  ) : (
                    <p>No certificate available for this product.</p>
                  )}
                </div>
              ))
            ) : (
              <p>No listed products.</p>
            )}
          </div> {/* Close the product-cards div here */}
        </section>
      </main>
    </div>
  );
};

export default SellerDashboard;
