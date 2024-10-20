import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';

import HomePage from './pages/HomePage';

import CartPage from './pages/CartPage'; //test


const App = () => {

  const [cart, setCart] = useState([]);

  // Fetch cart from backend on initial load

  useEffect(() => {

    const fetchCart = async () => {

      const response = await fetch('http://localhost:5000/api/cart');

      const data = await response.json();

      setCart(data);

    };

    fetchCart();

  }, []);

  const addToCart = async (product) => {

    try {

      const response = await fetch('http://localhost:5000/api/cart/add', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ productId: product._id }), // Ensure you're sending the correct productId

      });

      

      if (!response.ok) {

        throw new Error('Failed to add item to cart');

      }

  

      const data = await response.json();

      setCart(data); // Update the cart state with the response from the backend

    } catch (error) {

      console.error('Error adding to cart:', error);

    }

  };

  const updateCart = async () => {

    try {
  
      const response = await fetch('http://localhost:5000/api/cart');
  
      if (!response.ok) {
  
        throw new Error('Failed to fetch cart data');
  
      }
  
      const data = await response.json();
  
      return data;
  
    } catch (error) {
  
      console.error('Error fetching cart data:', error);
  
      throw error;
  
    }
  
  };

  const removeFromCart = async (productId) => {

    const response = await fetch('http://localhost:5000/api/cart/remove', {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ productId }),

    });

    const data = await response.json();

    setCart(data);

  };

  return (

    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={<HomePage addToCart={addToCart} />} />

        <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} updateCart={updateCart} />} />

      </Routes>

    </Router>

  );

};

export default App;