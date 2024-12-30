import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import Home from './pages/Home';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import LearnMore from './pages/LearnMore';
import AuthPage from './pages/AuthPage';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart'; // Ensure this is a default export

// Import styles
import './styles/App.css';

import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== product._id));
  };
const [email, setEmail] = useState('');
  return (
    <Router>
      <Header email={email} setEmail={setEmail} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/learn-more" element={<LearnMore />} /> {/* New Route */}
          <Route path="/auth" element={<AuthPage setEmail={setEmail} />}  /> {/* Auth page route */}

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
