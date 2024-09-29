import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './PDAdashboard.css';

const PDAdashboard = () => {
  const [accountData, setAccountData] = useState(null); // State to store fetched account data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  useEffect(() => {
    // Function to fetch PDA account data based on the user's email address
    const fetchAccountData = async () => {
      try {
        const user = auth.currentUser;

        if (!user || !user.email) {
          setError('User is not logged in or email is unavailable.');
          setLoading(false);
          return;
        }

        // Query Firestore to find the PDA account linked to the current user's email
        const pdaQuery = query(collection(db, 'PDA'), where('email', '==', user.email));
        const querySnapshot = await getDocs(pdaQuery);

        if (!querySnapshot.empty) {
          const fetchedDoc = querySnapshot.docs[0]; // Assuming only one PDA account per email
          setAccountData(fetchedDoc.data()); // Store the fetched data in state
        } else {
          // No PDA account found for the user's email, redirect to /PDA page
          alert('No PDA account found for this email. Redirecting to account creation page...');
          navigate('/PDA'); // Redirect after a short delay
        }
      } catch (err) {
        console.error('Error fetching PDA account data:', err);
        setError('Failed to fetch PDA account data.');
      }

      setLoading(false);
    };

    fetchAccountData();
  }, [navigate]);

  // Loading state rendering
  if (loading) return <div className="pda-dashboard">Loading...</div>;
  // Error state rendering with optional redirect message
  if (error) return <div className="pda-dashboard error">{error}</div>;

  return (
    <div className="pda-dashboard-container">
      {/* Profile Card */}
      <div className="pda-profile-card">
        <div className="pda-profile-header">
          <h2 className="pda-profile-name">{accountData?.applicantName || 'N/A'}</h2>
          <p className="pda-profile-email">{auth.currentUser?.email || 'N/A'}</p>
        </div>

        {/* Account Overview Section */}
        <div className="pda-profile-details">
          <h3>Account Overview</h3>
          <div className="pda-account-info">
            <p><strong>PDA Number:</strong> {accountData?.pdaNumber || 'N/A'}</p>
            <p><strong>Account Type:</strong> {accountData?.typeOfCustomer || 'N/A'}</p>
            <p><strong>Creation Date:</strong> {accountData?.dateCreated?.toDate().toDateString() || 'N/A'}</p>
            <p><strong>Account Balance:</strong> Rs {accountData?.balance !== undefined ? accountData.balance : 'N/A'}</p>
            <p><strong>Mailing Address:</strong> {accountData?.mailingAddress || 'N/A'}</p>
            <p><strong>Mobile Number:</strong> {accountData?.mobileNo || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDAdashboard;
