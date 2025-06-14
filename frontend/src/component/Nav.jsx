import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/nav.css';

const Nav = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/authform');
    setIsMenuOpen(false); // Close menu after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
           <img src="../public/logo.png" alt="" />
      </div>
      
      {/* Hamburger Menu */}
      <div 
        className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      <nav className="nav">
        <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/predictdisease" className="nav-link" onClick={() => setIsMenuOpen(false)}>Disease</Link>
          </li>
          <li>
            <Link to="/leafdisease" className="nav-link" onClick={() => setIsMenuOpen(false)}>Health</Link>
          </li>
          <li>
            <Link to="/phcheck" className="nav-link" onClick={() => setIsMenuOpen(false)}>Soil Ph</Link>
          </li>
          <li>
            <Link to="/priceprediction" className="nav-link" onClick={() => setIsMenuOpen(false)}>Price</Link>
          </li>
          <li>
            <Link to="/medicine" className="nav-link" onClick={() => setIsMenuOpen(false)}>Medicine</Link>
          </li>
          <li>
            <Link to="/fertiliser" className="nav-link" onClick={() => setIsMenuOpen(false)}>Fertiliser</Link>
          </li>
          <li>
            <Link to="/ourfarm" className="nav-link" onClick={() => setIsMenuOpen(false)}>Farm</Link>
          </li>
          <li>
            {token ? (
              <button onClick={handleLogout} className="nav-link logout-button">
                Logout
              </button>
            ) : (
              <Link to="/authform" className="nav-link" onClick={() => setIsMenuOpen(false)}>Signup / Login</Link>
            )}
          </li>
          <li>
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;