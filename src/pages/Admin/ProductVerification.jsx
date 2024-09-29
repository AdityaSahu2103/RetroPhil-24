import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase'; // Ensure storage is imported
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion, serverTimestamp, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage functions

import './ProductVerification.css';

const ProductVerification = () => {
  const user = JSON.parse(localStorage.getItem('users'));

  if (!user || user.role !== 'admin') {
      return <div>Access Denied</div>;
  }

  // Redirect if the user is not an admin
  if (!user || user.role !== 'admin') {
      history.push('/'); // Redirect to homepage or another page
      return null; // Or a loading state
  }
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Pending Verification');
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState({
    country: '',
    year: '',
    denomination: '',
    color: '',
    gradingScore: '',
    description: '',
    opinion: '',
    verifierSignature: '',
    image: null, // For image upload
  });
  const [loading, setLoading] = useState(false);

  // Fetch products by different statuses
  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'sellerProducts');
      const q = query(productsRef, where('status', 'in', ['Pending Verification', 'Received', 'Verified', 'Rejected']));
      const snapshot = await getDocs(q);
      const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  // Handle marking a product as received
  const handleReceive = async (productId) => {
    const productRef = doc(db, 'sellerProducts', productId);

    try {
      await updateDoc(productRef, {
        status: 'Received',
      });

      const timestamp = new Date();

      await updateDoc(productRef, {
        timeline: arrayUnion({
          status: 'Product Received',
          timestamp: timestamp,
        }),
      });

      alert('Product marked as received successfully.');
    } catch (error) {
      console.error('Error marking product as received: ', error);
      alert(`Failed to mark product as received: ${error.message}`);
    }
  };

  // Handle the verification form (open the form modal)
  const handleVerification = (productId, isGenuine) => {
    if (isGenuine) {
      // Open the certificate form
      setSelectedProductId(productId);
      setShowCertificateForm(true);
    } else {
      // Handle rejection
      updateProductStatus(productId, 'Rejected');
    }
  };

  const updateProductStatus = async (productId, status) => {
    const productRef = doc(db, 'sellerProducts', productId);
    try {
      await updateDoc(productRef, { status });
      const timestamp = new Date();

      await updateDoc(productRef, {
        timeline: arrayUnion({
          status: status === 'Verified' ? 'Verified as Genuine' : 'Rejected',
          timestamp: timestamp,
        }),
      });

      alert(`Product successfully ${status.toLowerCase()}.`);
    } catch (error) {
      console.error('Error updating product: ', error);
      alert(`Failed to update product status: ${error.message}`);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission for certificate
  const handleSubmitCertificate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const certificateNumber = `CERT-${Date.now()}`;
      let imageURL = '';

      // Upload image to Firebase Storage
      if (formData.image) {
        const imageRef = ref(storage, `certificates/${certificateNumber}-${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageURL = await getDownloadURL(imageRef);
      }

      // Save certificate details in a new collection
      await addDoc(collection(db, 'verifiedCertificates'), {
        certificateNumber,
        dateOfCertification: serverTimestamp(),
        stampDetails: {
          country: formData.country,
          year: formData.year,
          denomination: formData.denomination,
          color: formData.color,
          gradingScore: formData.gradingScore,
          description: formData.description,
          opinion: formData.opinion,
        },
        verifierSignature: formData.verifierSignature,
        image: imageURL,
        productId: selectedProductId,
      });

      // Update product status to 'Verified' and add certificateNumber to the product
      const productRef = doc(db, 'sellerProducts', selectedProductId);
      await updateDoc(productRef, {
        status: 'Verified',
        certificateNumber: certificateNumber,  // Update the product with the certificate number
        timeline: arrayUnion({
          status: 'Verified as Genuine',
          timestamp: new Date(),
        }),
      });

      setShowCertificateForm(false); 
      setNotification('Certificate submitted successfully!');// Close the form modal
    } catch (error) {
      console.error('Error submitting certificate: ', error);
      alert(`Failed to submit certificate: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Render products by category
  const renderProductsByCategory = (status) => {
    const filteredProducts = products.filter(product => {
      if (status === 'In Verification') {
        return product.status === 'Verified' || product.status === 'Rejected';
      } else {
        return product.status === status;
      }
    });

    return (
      <div className="product-cards">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <img src={product.image} alt={product.name} />
              {status === 'Pending Verification' && (
                <button onClick={() => handleReceive(product.id)}>Mark as Received</button>
              )}
              {status === 'Received' && (
                <>
                  <button onClick={() => handleVerification(product.id, true)}>Verify as Genuine</button>
                  <button onClick={() => handleVerification(product.id, false)}>Reject</button>
                </>
              )}
              {status === 'In Verification' && (
                <p>Status: {product.status}</p>
              )}
            </div>
          ))
        ) : (
          <p>No products in this section.</p>
        )}
      </div>
    );
  };

  return (
    <div className="product-verification">
      <h1>Product Verification</h1>
      {notification && <div className="notification">{notification}</div>}
      <nav className="product-nav">
        {['Pending Verification', 'Received', 'In Verification'].map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </nav>

      <section>
        {renderProductsByCategory(selectedCategory)}
      </section>

      {/* Certificate Form Modal */}
      {showCertificateForm && (
        <div className="certificate-form-modal">
          <h2>Submit Certificate</h2>
          <form onSubmit={handleSubmitCertificate}>
            <label>
              Country:
              <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            </label>
            <label>
              Year:
              <input type="text" name="year" value={formData.year} onChange={handleChange} required />
            </label>
            <label>
              Denomination:
              <input type="text" name="denomination" value={formData.denomination} onChange={handleChange} required />
            </label>
            <label>
              Color:
              <input type="text" name="color" value={formData.color} onChange={handleChange} required />
            </label>
            <label>
              Grading Score:
              <input type="text" name="gradingScore" value={formData.gradingScore} onChange={handleChange} required />
            </label>
            <label>
              Description:
              <textarea name="description" value={formData.description} onChange={handleChange} required />
            </label>
            <label>
              Expert Opinion:
              <textarea name="opinion" value={formData.opinion} onChange={handleChange} required />
            </label>
            <label>
              Verifier's Signature:
              <input type="text" name="verifierSignature" value={formData.verifierSignature} onChange={handleChange} required />
            </label>
            <label>
              Upload Image:
              <input type="file" onChange={handleImageChange} required />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Certificate'}
            </button>
            <button type="button" onClick={() => setShowCertificateForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductVerification;
