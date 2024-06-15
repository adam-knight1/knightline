import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import './Styles.css';

import { useRouter } from 'next/router';

/** Login component to handle interaction with spring security framework on the backend
 * Includes labeled inputs for email and password, error handling, and navigation on successful login.
**/

const LoginForm = () => {
  const [email, setEmail] = useState('');  //may change this name, state to store email input and password below
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); //preventing default form submission
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });  //sending post request to backend, may change to name
      console.log('Login successful:', response.data);

      localStorage.setItem('authToken', response.data.token);  // Store JWT in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));

      router.push('/user-page');  // Navigate to home page on successful login
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : 'Error during login');
    }
  };

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Please enter your email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email" // Placeholder text to guide users
        />


        <label htmlFor="password">Please enter your password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button type="submit">Log In</button>
      </form>
    );

};

export default LoginForm;
