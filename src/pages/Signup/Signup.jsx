import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Loader from '../../components/Loader/Loader'; // Update the path
import Notification from '../../components/Notification/Notification'; // Update the path
import './Signup.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userDoc = await getDoc(doc(db, "Users", email));
      if (userDoc.exists()) {
        setMessage("This email is already in use. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: fname,
            lastName: lname,
            photo: "",
            role: "user" // Default role
          });
          const token = await user.getIdToken();
          localStorage.setItem('token', token);
          setMessage("User Registered Successfully! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect after 2 seconds
        }
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {message && <Notification message={message} />}
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleRegister}>
          <h3>Sign Up</h3>

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">Login</a>
          </p>
        </form>
      )}
    </div>
  );
}

export default Register;
