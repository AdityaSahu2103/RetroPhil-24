// src/pages/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import './Cart.css'; // Create a CSS file for styling

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ₹ {item.price}</p>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="remove-item">Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total mb-4 mt-4 lg:mx-80 pt-3 rounded-lg bg-black">
            <h3>Total: ₹ {total}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
