import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import './Recharge.css';

const Recharge = () => {
  const [pdaNumber, setPdaNumber] = useState(''); // PDA Number input state
  const [accountDetails, setAccountDetails] = useState(null); // Fetched account details state
  const [rechargeAmount, setRechargeAmount] = useState(''); // Recharge amount input state
  const [error, setError] = useState(''); // Error message state
  const [loading, setLoading] = useState(false); // Loading indicator state

  // Handle PDA number input change
  const handlePdaNumberChange = (e) => {
    setPdaNumber(e.target.value);
  };

  // Fetch account details from Firebase Firestore
  const handleFetchDetails = async () => {
    setLoading(true);
    setError('');

    console.log('Fetching details for PDA Number:', pdaNumber);

    try {
      const pdaQuery = query(collection(db, 'PDA'), where('pdaNumber', '==', parseInt(pdaNumber)));
      const querySnapshot = await getDocs(pdaQuery);

      if (!querySnapshot.empty) {
        const fetchedDoc = querySnapshot.docs[0]; // Get the first matching document
        const fetchedData = fetchedDoc.data(); // Extract data from the document

        console.log('Fetched Account Data:', fetchedData); // Debugging: log fetched data

        setAccountDetails({ ...fetchedData, id: fetchedDoc.id }); // Set account details with doc ID
      } else {
        setError('No account found with this PDA number');
        setAccountDetails(null); // Reset account details if not found
      }
    } catch (err) {
      console.error('Error fetching account details: ', err);
      setError('Failed to fetch account details. Please try again.');
      setAccountDetails(null);
    }

    setLoading(false);
  };

  // Handle recharge amount input change
  const handleRechargeAmountChange = (e) => {
    setRechargeAmount(e.target.value);
  };

  // Handle the recharge process by updating balance in Firestore
  const handleRecharge = async () => {
    if (!accountDetails) {
      setError('Please fetch account details first.');
      return;
    }

    // Validate the recharge amount
    if (isNaN(rechargeAmount) || rechargeAmount <= 0) {
      setError('Please enter a valid recharge amount.');
      return;
    }

    try {
      const updatedBalance = accountDetails.balance + parseInt(rechargeAmount);

      if (updatedBalance < 0) {
        setError('Please add some balance.');
        return;
      }

      // Update the balance in Firestore
      const docRef = doc(db, 'PDA', accountDetails.id);
      await updateDoc(docRef, { balance: updatedBalance });

      alert(`Recharge successful! Your account has been recharged by Rs ${rechargeAmount}. New balance: Rs ${updatedBalance}`);
      setRechargeAmount(''); // Clear recharge input
      setAccountDetails({ ...accountDetails, balance: updatedBalance }); // Update account details in state
    } catch (err) {
      console.error('Error recharging account: ', err);
      setError('Failed to recharge account. Please try again.');
    }
  };

  return (
    <div className="recharge-container">
      <h1>PDA Recharge</h1>

      {/* PDA Number Input and Fetch Button */}
      <div className="pda-number-input">
        <label>PDA Number*</label>
        <div className="input-group">
          <input
            type="text"
            value={pdaNumber}
            onChange={handlePdaNumberChange}
            required
            placeholder="Enter PDA Number"
          />
          <button onClick={handleFetchDetails} disabled={loading || !pdaNumber}>
            {loading ? 'Fetching...' : 'Fetch'}
          </button>
        </div>
      </div>

      {/* Display Account Details if Available */}
      {accountDetails && (
        <div className="account-details">
          <h2>Account Details</h2>
          <p><strong>Account Holder:</strong> <span>{accountDetails.applicantName || 'N/A'}</span></p>
          <p><strong>PDA Number:</strong> <span>{accountDetails.pdaNumber || 'N/A'}</span></p>
          <p><strong>Creation Date:</strong> <span>{accountDetails.dateCreated ? accountDetails.dateCreated.toDate().toDateString() : 'N/A'}</span></p>
          <p><strong>Type of Account:</strong> <span>{accountDetails.typeOfCustomer || 'N/A'}</span></p>
          <p><strong>Mobile No.:</strong> <span>{accountDetails.phoneNumber || 'N/A'}</span></p>
          <p><strong>Email:</strong> <span>{accountDetails.email || 'N/A'}</span></p>
          <p><strong>Mailing Address:</strong> <span>{accountDetails.mailingAddress || 'N/A'}</span></p>
          <p><strong>Account Balance:</strong> <span>Rs {accountDetails.balance !== undefined ? accountDetails.balance : 'N/A'}</span></p>
        </div>
      )}

      {/* Recharge Details */}
      <div className="recharge-details">
        <h2>Recharge Details</h2>
        <label>Recharge Amount*</label>
        <input
          type="text"
          value={rechargeAmount}
          onChange={handleRechargeAmountChange}
          required
          placeholder="Enter Recharge Amount"
        />
        <button onClick={handleRecharge} disabled={!accountDetails}>Proceed to Pay</button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Recharge;
