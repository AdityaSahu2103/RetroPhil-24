import React, { useState, useEffect } from 'react';
import './PDA.css';
import { db, auth } from '../firebase'; // Import Firebase services
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // For redirection to Recharge page
import { onAuthStateChanged } from 'firebase/auth'; // To track the currently logged-in user

const PDAForm = () => {
  const [formData, setFormData] = useState({
    typeOfCustomer: '',
    applicantName: '',
    mailingAddress: '',
    pin: '',
    giftRecipientName: '',
    giftMailingAddress: '',
    giftPin: '',
    subscriptionFrequency: '',
    email: '', // Add email field
    phoneNumber: '', // Add phoneNumber field
    orderItems: {
      mintCommemorativeStamps: '',
      mintWithoutPersonalities: '',
      mintDefinitiveStamps: '',
      topMarginalBlock: '',
      bottomMarginalBlock: '',
      fullSheet: '',
      firstDayAffixed: '',
      firstDayWithoutPersonality: '',
      firstDayBlank: '',
      informationBrochureAffixed: '',
      informationBrochureBlank: '',
      annualStampPack: '',
      specialStampPack: '',
      childrenStampPack: '',
      collectorsStampPack: '',
      firstDayCoverPack: '',
      postalStationery: '',
      miniSheet: '',
      otherItems: ''
    }
  });

  const [userUID, setUserUID] = useState(null); // State to store the logged-in user's UID
  const navigate = useNavigate();

  // Track the currently logged-in user and get their UID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
        checkExistingPDAAccount(user.uid); // Check if PDA account already exists
      } else {
        // If no user is logged in, redirect to login or show a message
        alert('Please log in to create a Philately Deposit Account.');
        navigate('/login'); // Redirect to the login page (adjust path as needed)
      }
    });
    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  // Function to check if a PDA account already exists for the logged-in user
  const checkExistingPDAAccount = async (uid) => {
    try {
      const q = query(collection(db, 'PDA'), where('userUID', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // PDA account already exists
        alert('You already have a Philately Deposit Account. Redirecting to recharge page...');
        navigate('/recharge'); // Redirect to the recharge page
      }
    } catch (error) {
      console.error('Error checking existing PDA account: ', error);
      alert('There was an error checking your account status. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      orderItems: { ...formData.orderItems, [name]: value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneNumberPattern = /^\d{10}$/;

    if (!phoneNumberPattern.test(formData.phoneNumber)) {
      alert('Phone number must be 10 digits long.');
      return;
    }

    try {
      // Create a random 7-digit PDA number
      const pdaNumber = Math.floor(1000000 + Math.random() * 9000000);

      // Add form data to Firestore under the 'PDA' collection
      await addDoc(collection(db, 'PDA'), {
        ...formData,
        userUID, // Save the user's UID to link with the account
        phoneNumber: `+91${formData.phoneNumber}`, // Append country code +91 to phone number
        pdaNumber,
        dateCreated: new Date(), // Record the submission timestamp
        balance: 0 // Set initial balance to 0
      });

      alert(`Your Philately Deposit Account number is ${pdaNumber}`);
      navigate('/recharge');
      
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Philately Deposit Account Application Form</h1>

        <label>Type of Customer:</label>
        <select name="typeOfCustomer" onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Private/Individual">Private/Individual</option>
          <option value="Stamp Dealer/Shop">Stamp Dealer/Shop</option>
          <option value="Company">Company</option>
        </select>

        <label>Name of Applicant:</label>
        <input type="text" name="applicantName" onChange={handleChange} required />

        <label>Mailing Address:</label>
        <textarea name="mailingAddress" onChange={handleChange} required />

        <label>Pin:</label>
        <input type="text" name="pin" onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Phone Number (10 digits):</label>
        <input
          type="tel"
          name="phoneNumber"
          pattern="[0-9]{10}"
          title="Phone number should be 10 digits"
          onChange={handleChange}
          required
        />

        <h3>Gift Subscription (Optional)</h3>
        <label>Name of Recipient:</label>
        <input type="text" name="giftRecipientName" onChange={handleChange} />

        <label>Mailing Address:</label>
        <textarea name="giftMailingAddress" onChange={handleChange} />

        <label>Pin:</label>
        <input type="text" name="giftPin" onChange={handleChange} />

        <h3>Subscription Frequency</h3>
        <label>How often would you like to receive updates?</label>
        <select name="subscriptionFrequency" onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Once a Year">Once a Year</option>
          <option value="Twice a Year">Twice a Year</option>
          <option value="Four times a Year">Four times a Year</option>
          <option value="Six times a Year">Six times a Year</option>
        </select>

        {/* Order Form */}
        <h3>Order Form</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Select (Yes/No)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mint Commemorative Stamps</td>
              <td>
                <select name="mintCommemorativeStamps" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Mint Commemorative Stamps without personalities series</td>
              <td>
                <select name="mintWithoutPersonalities" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Mint Definitive Stamps</td>
              <td>
                <select name="mintDefinitiveStamps" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Top Marginal Block</td>
              <td>
                <select name="topMarginalBlock" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Bottom Marginal Block</td>
              <td>
                <select name="bottomMarginalBlock" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Full Sheet</td>
              <td>
                <select name="fullSheet" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>First Day Cover Affixed</td>
              <td>
                <select name="firstDayAffixed" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>First Day Cover without personality series</td>
              <td>
                <select name="firstDayWithoutPersonality" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>First Day Cover Blank</td>
              <td>
                <select name="firstDayBlank" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Information Brochure Affixed</td>
              <td>
                <select name="informationBrochureAffixed" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Information Brochure Blank</td>
              <td>
                <select name="informationBrochureBlank" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Annual Stamp Pack</td>
              <td>
                <select name="annualStampPack" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Special Stamp Pack</td>
              <td>
                <select name="specialStampPack" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Children Stamp Pack</td>
              <td>
                <select name="childrenStampPack" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Collectors Stamp Pack</td>
              <td>
                <select name="collectorsStampPack" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>First Day Cover Pack</td>
              <td>
                <select name="firstDayCoverPack" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Postal Stationery</td>
              <td>
                <select name="postalStationery" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Mini Sheet</td>
              <td>
                <select name="miniSheet" onChange={handleOrderChange}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Other Items (Specify)</td>
              <td>
                <textarea name="otherItems" onChange={handleOrderChange}></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PDAForm;
