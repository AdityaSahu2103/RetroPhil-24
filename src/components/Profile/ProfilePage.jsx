import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../pages/firebase';
import './ProfilePage.css'; // Import the CSS file

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    address: '',
    state: '',
    district: '',
    taluka: '',
    pincode: '',
    profilePicture: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState(''); // Notification state

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchUserDetails(user.uid);
      } else {
        console.log('No user is signed in.');
      }
    });
  }, []);

  const fetchUserDetails = async (uid) => {
    const userDoc = await getDoc(doc(db, 'Users', uid));
    if (userDoc.exists()) {
      setUser(userDoc.data());
    } else {
      console.log('No such document!');
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');
    if (userId) {
      try {
        if (image) {
          const storage = getStorage();
          const storageRef = ref(storage, `profilePictures/${userId}`);
          await uploadBytes(storageRef, image);
          const imageUrl = await getDownloadURL(storageRef);
          
          // Update the user object with the new image URL
          const updatedUser = { ...user, profilePicture: imageUrl };
          setUser(updatedUser); // Update state

          // Save updated user data (including the image URL) to Firestore
          await setDoc(doc(db, 'Users', userId), updatedUser, { merge: true });
          console.log('Image uploaded and user data saved:', updatedUser);
        } else {
          // Save other form data if no image is uploaded
          await setDoc(doc(db, 'Users', userId), user, { merge: true });
          console.log('User data saved without image:', user);
        }

        setNotification('Profile saved successfully!'); // Set success notification
        setIsEditing(false);
      } catch (error) {
        console.error('Error saving profile:', error);
        setNotification('Error saving profile. Please try again.');
      }
    }
  };

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="profile-container">
      <h1 className="profile-header">My Profile</h1>

      {/* Show the notification if it exists */}
      {notification && <div className="notification">{notification}</div>}

      <div className="profile-picture">
        <img src={user.profilePicture || 'profile.png'} alt="Profile" />
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label htmlFor="profilePicture">Profile Picture</label>
        <input type="file" id="profilePicture" onChange={handleImageChange} disabled={!isEditing} />
        
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} disabled={!isEditing} placeholder="First Name" />
        
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} disabled={!isEditing} placeholder="Last Name" />
        
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} disabled placeholder="Email" />
        
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" id="dob" name="dob" value={user.dob} onChange={handleChange} disabled={!isEditing} placeholder="Date of Birth" />
        
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" value={user.address} onChange={handleChange} disabled={!isEditing} placeholder="Address" />
        
        <label htmlFor="state">State</label>
        <input type="text" id="state" name="state" value={user.state} onChange={handleChange} disabled={!isEditing} placeholder="State" />
        
        <label htmlFor="district">District</label>
        <input type="text" id="district" name="district" value={user.district} onChange={handleChange} disabled={!isEditing} placeholder="District" />
        
        <label htmlFor="taluka">Taluka</label>
        <input type="text" id="taluka" name="taluka" value={user.taluka} onChange={handleChange} disabled={!isEditing} placeholder="Taluka" />
        
        <label htmlFor="pincode">Pincode</label>
        <input type="text" id="pincode" name="pincode" value={user.pincode} onChange={handleChange} disabled={!isEditing} placeholder="Pincode" />
        
        <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        <button type="submit" disabled={!isEditing}>Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
