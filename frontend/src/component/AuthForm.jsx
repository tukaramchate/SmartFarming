import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from '../style/authform.module.css'; // Import the CSS Module

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    mobileNumber: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const url = isLogin ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users/signup';
  const payload = isLogin
    ? { email: formData.email, password: formData.password }
    : formData;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Success:', data);

    // Handle successful login/signup
    if (isLogin) {
      console.log('Login successful!');
      // Store token and username in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username); // Store username
      // Redirect to home page
      navigate('/');
    } else {
      console.log('Signup successful!');
      // Redirect to login page after signup
      setIsLogin(true); // Switch to login form
      alert('Signup successful! Please login.'); // Optional: Show a success message
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.'); // Optional: Show an error message
  }
};

  return (
<>
<div className={styles.container}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {!isLogin && (
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className={styles.input}
            required
          />
        )}
        <button type="submit" className={styles.button}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className={styles.toggleText}>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <span
          className={styles.toggleLink}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </span>
      </p>
      </form>

    </div>
    
</>
  );
};

export default AuthForm;