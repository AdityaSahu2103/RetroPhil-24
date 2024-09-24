import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, callback) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        const updatedCart=prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        callback && callback();
        return updatedCart;
      } else {
        const updatedCart=[...prevCart, { ...product, quantity: 1 }];
        callback && callback();
        return updatedCart;
    }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
