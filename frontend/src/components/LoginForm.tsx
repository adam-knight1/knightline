 import React, { useState, FormEvent } from 'react';
 import axios from 'axios';
 import './UserPageStyle.css';
 import { useRouter } from 'next/router';


 /** Login component to handle interaction with spring security framework on the backend
  * Includes labeled inputs for email and password, error handling, and navigation on successful login.
 **/

 const LoginForm = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(''); // State to hold error messages
   const router = useRouter();

   const handleSubmit = async (event: FormEvent) => {
     event.preventDefault(); // preventing default form submission
     try {
       const response = await axios.post('http://localhost:8080/auth/login', { email, password });
       console.log('Login successful:', response.data);

       const token = response.data.token;
       const user = response.data.user;

       if (token && user) {
         localStorage.setItem('authToken', token); // storing JWT in localStorage
         localStorage.setItem('user', JSON.stringify(user));
         console.log('Token found:', token);
         router.push('/user-page'); // navigating to user page on successful login
       } else {
         throw new Error('Token or user data is missing in the response');
       }
     } catch (error) {
       const errorMessage = error.response?.data?.message || 'Error during login';
       console.error('Login error:', errorMessage);
       setError(errorMessage); // Updating the state with the error message
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
         placeholder="Email"
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
       {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>} {"Error logging in"}
     </form>
   );
 };

 export default LoginForm;

