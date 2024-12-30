// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import '../styles/AuthPage.css';
import { loginUser, registerUser } from '../services/authService'; // Import authService
import { Link } from 'react-router-dom';

const AuthPage = ({setEmail}) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState(''); // Password field for registration
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // To store logged-in user info


  
  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors before submitting
    setLoading(true);
    try {
      await loginUser({ email: loginEmail, password: loginPassword });
      // Redirect or update UI after successful login
      console.log('Login successful');
      setIsLoggedIn(true);
      setEmail(loginEmail);
      
    } catch (err) {
      setError(err.message); // Show the error message for login
    } finally {
      setLoading(false);
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors before submitting
    setLoading(true);
    try {
      await registerUser({ email: registerEmail, password: registerPassword });
      // Redirect or update UI after successful registration
      console.log('Registration successful');
    } catch (err) {
      setError(err.message); // Show the error message for registration
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isLoggedIn ? <h2>Welcome back {loginEmail.split('@')[0]} </h2> : 
    <div className="auth-page">
      <div className="auth-form-container">
        {/* Login Form */}
        <div className="auth-form">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                id="loginEmail"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
             {/* Error for login */}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        </div>

        {/* Register Form */}
        <div className="auth-form">
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="registerEmail">Email</label>
              <input
                type="email"
                id="registerEmail"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="registerPassword">Password</label>
              <input
                type="password"
                id="registerPassword"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Create your password"
                required
              />
            </div>
             {/* Error for registration */}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}

      {/* Bottom Section with Additional Information */}
      <div className="footer-info">
        <p>Livraison à Domicile <br /> 24h à 72h sur tout le territoire</p>
        <p>Paiement à la Livraison ou immédiat par CB. <br /> Possibilité de retour sous 15J</p>
        <p>Suivi de vos Commandes <br /> 52 195 611 de 8H à 18h</p>
        <p>Livraison gratuite par CB <br /> Possibilité de retrait en point de Vente</p>
      </div>
    </div>
    }
    </div>
  );
};


export default AuthPage;
