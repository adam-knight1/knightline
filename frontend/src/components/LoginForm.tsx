import React, { useState, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import './UserPageStyle.css';
import { useRouter } from 'next/router';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

/** Login component to handle interaction with spring security framework on the backend
 * Includes labeled inputs for email and password, error handling, and navigation on successful loginsdds.
 **/

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>(''); // State to hold any error messages
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Preventing default form submission

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
      console.log('Login successful:', response.data);

      const token = response.data.token;
      const user = response.data.user;

      if (token && user) {
        localStorage.setItem('authToken', token); // Storing JWT in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Token found:', token);
        router.push('/user-page'); // Navigating to user page on successful login
      } else {
        throw new Error('Token or user data is missing in the response');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Now we know that 'error' is of type 'AxiosError'
        const errorMessage = error.response?.data?.message || 'Error during login';
        console.error('Login error:', errorMessage);
        setError(errorMessage); // Updating the state with the error message
      } else {
        // Handle non-Axios errors here
        console.error('Unexpected error:', error);
        setError('Unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Please enter your email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <label htmlFor="password">Please enter your password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button type="submit">Log In</button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </form>
  );
};

export default LoginForm;
