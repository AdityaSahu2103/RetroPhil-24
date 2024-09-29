import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../../pages/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { CartContext } from "../../CartContext";
import {getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";
import BecomeSellerForm from "../BecomeSeller/BecomeSellerForm";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSellerForm, setShowSellerForm] = useState(false);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [prevCartLength, setPrevCartLength] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const dropdownRef = useRef(null);
 
  const db=getFirestore();
  
  useEffect(() => {
    const checkSellerStatus = async () => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setIsSeller(userSnap.data().isSeller || false);
        }
      }
    };

    checkSellerStatus();
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleProfileOptionClick = (option) => {
    setIsProfileDropdownOpen(false);
    if (option === 'profile') {
      navigate('/profile');
    } else if (option === 'settings') {
      navigate('/settings');
    } else if (option === 'check-certificate') {
      navigate('/check-certificate'); // This will redirect users to the page where they enter the certificate number
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isInitialLoad && cart.length > prevCartLength) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }
    setPrevCartLength(cart.length);
    setIsInitialLoad(false);
  }, [cart]);

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      localStorage.removeItem('users');
      navigate('/');
      window.location.reload();
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };
  const handleBecomeSellerClick = () => {
    setShowSellerForm(true);
  };

  const handleSellerFormSubmit = async (formData) => {
    const userRef = doc(db, "Users", user.uid);
    try {
      // Update the Firestore user document to mark as a seller
      await updateDoc(userRef, {
        isSeller: true,
        businessName: formData.businessName,
        businessAddress: formData.businessAddress,
      });

      setIsSeller(true); // Update seller state
      setShowSellerForm(false); // Close the seller form modal
      alert("You are now a seller!");
    } catch (error) {
      console.error("Error becoming seller: ", error);
    }
  };

  const dropdownMenus = {
    stampCollections: (
      <div className="dropdown-content horizontal-dropdown">
        <div className="dropdown-category">
          <h3>Stamp Types</h3>
          <Link to="/categories/definitive">Definitive</Link>
          <Link to="/categories/commemorative">Commemorative</Link>
          <Link to="/categories/thematic">Thematic</Link>
          <Link to="/categories/fdc">First Day Covers</Link>
          <Link to="/categories/explore-more">Explore More</Link>
        </div>
        <div className="dropdown-category">
          <h3>Ancillary Items</h3>
          <Link to="/categories/stationary">Stationary</Link>
          <Link to="/categories/albums">Albums</Link>
          <Link to="/categories/magnifiers">Magnifiers</Link>
        </div>
        <div className="dropdown-category">
          <h3>More Releases</h3>
          <Link to="/categories/SpecialCovers">Special Covers</Link>
          <Link to="/categories/CancellationReleases">Cancellation Releases</Link>
        </div>
      </div>
    ),
  };

  return (
    <header className="header">
      <div className="flex justify-between items-center">
        <div className="image-box">
          <Link to="/">
            <img className="fit-image" src="logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="navlinks hidden md:flex gap-4 items-center mx-auto">
          {/* Dropdown for Stamp Collections */}
          <div
            className="relative text-black cursor-pointer"
            onMouseEnter={() => handleMouseEnter('stampCollections')}
            onMouseLeave={handleMouseLeave}
          >
            <span className="text-black">Stamp Collections</span> {/* Ensure it's the same color */}
            {activeDropdown === 'stampCollections' && dropdownMenus.stampCollections}
          </div>

          <Link to="/latest-arrivals" className="text-black">New Arrivals</Link>
          <Link to="/verified-products" className="text-black">Verified Products</Link>
          <Link to="/more-options" className="text-black">More Options</Link>
          
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-2 ml-4 h-10"
          />
          <div className="">
            <img className='h-8' src='./search.svg' alt="Search Icon" />
          </div>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {/* Cart with Item Count */}
          <div className="flex justify-center my-auto relative">
            <Link to="/cart">
              <img className='h-10' src='./cart.svg' alt="Cart Icon" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>

          {/* Profile Icon */}
          <div className="flex justify-center my-auto">
            <img
              className='h-10 mx-3 cursor-pointer'
              src='./profile.svg'
              alt="Profile Icon"
              onClick={handleProfileClick}
            />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Profile Dropdown */}
      {isProfileDropdownOpen && (
        <div className="profile-dropdown" ref={dropdownRef}>
          <ul className="py-2">
            {user ? (
              <>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Welcome, {user.firstName || user.email}</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() =>handleProfileOptionClick('profile')}>View Profile</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={()=>handleProfileOptionClick('settings')}>Settings</li>
                 {/* Show Seller Dashboard if the user is a seller */}
                 {/* New PDA Dashboard Option */}
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/pdadashboard">PDA Dashboard</Link>
                </li>
              {isSeller ? (
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/seller-dashboard">Seller Dashboard</Link>
                </li>
              ) : (
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleBecomeSellerClick}>
                  Become a Seller
                </li>
              )}
                {/* Seller form modal */}
        {showSellerForm && (
          <BecomeSellerForm onSubmit={handleSellerFormSubmit} />
        )}
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleProfileOptionClick('check-certificate')}>
                  Check Verified Certificate
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleSignOut}>Logout</li>
              </>
            ) : (
              <>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/login">Login</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col gap-3 mt-3 items-center">
          <Link to="/categories" className="text-black">Stamp Collections</Link>
          <Link to="/new-arrivals" className="text-black">New Arrivals</Link>
          <Link to="/best-sellers" className="text-black">Best Sellers</Link>
          <Link to="/more-options" className="text-black">More Options</Link>
          <div className="flex justify-center my-auto">
            <img className='h-10' src='./cart.svg' alt="Cart Icon" />
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2">
              {cart.length}
            </span>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="notification">
          Product added to cart successfully! <Link to="/cart" className="view-cart-link">View Cart</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
