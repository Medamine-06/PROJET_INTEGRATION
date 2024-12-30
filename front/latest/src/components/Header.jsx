import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '/assets/logoim.png';
import React, { useState,useEffect} from 'react';

function Header({email,setEmail}) {
  


  useEffect(() => {
    const email = localStorage.getItem('email');
    setEmail(email);
    
  }, [email]);

  return (
    
    <>
      {/* Header Section */}
      <header>
        <div className="left-section">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
          </div>

          <nav className="menu">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/Order">Order</Link>
          </nav>
        </div>

       

        <div className="right-section">
          <div className="cart">
            <Link to="/cart">
              <span role="img" aria-label="Cart">🛒</span>
            </Link>
            {email ?  <Link to="/auth">
            <span role="img" aria-label="Account "  >{email.split('@')[0]}</span>
            </Link> : 
            <Link to="/auth">
            <span role="img" aria-label="Account "  >👤</span>
            </Link>
             }
          </div>
        </div>
      </header>

    </>
  );
}


export default Header;
