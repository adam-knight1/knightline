import React, { useState, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';  // Import AxiosError to type the error
import { useRouter } from 'next/router';
import styles from './RegistrationForm.css';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

interface UserData {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/users`, userData);
      console.log('Registration successful:', response.data);
      router.push('/login'); // Redirecting to login page after successful registration
    } catch (error: unknown) {  // Type the error explicitly as 'unknown'
      if (error instanceof AxiosError) {  // Check if error is an instance of AxiosError
        console.error('Registration error:', error.response ? error.response.data : 'Error during registration');
      } else {
        console.error('Unknown error:', error);  // Handle unknown errors safely
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Account</button>
    </form>
  );
};

export default RegistrationForm;
