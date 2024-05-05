import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

/** Login component to handle interaction with spring security framework on the backend
**/

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });
      console.log('Login successful:', response.data);

      // Assume the token is returned in the response data
      localStorage.setItem('authToken', response.data.token);  // Store JWT in localStorage

      router.push('/home');  // Navigate to home page on successful login
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : 'Error during login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
