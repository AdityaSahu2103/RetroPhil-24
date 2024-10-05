import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js"; // Ensure you have configured Firebase
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/Loader/Loader"; // Update the path
import Notification from "../../components/Notification/Notification"; // Update the path
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'Users', user.uid));
      const userData = userDoc.data();
      localStorage.setItem('users', JSON.stringify(userData));
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      console.log('User Data:', userData);
      setMessage("Login Successful!");
      setTimeout(() => {
        if (userData.role === 'admin') {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 2000);
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
        <form onSubmit={handleLogin}>
          <h3>Login</h3>

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
              Login
            </button>
          </div>
          <p className="forgot-password text-right">
            Don't have an account? <a href="../Signup">Sign Up</a>
          </p>
        </form>
      )}
    </div>
  );
}

export default Login;
