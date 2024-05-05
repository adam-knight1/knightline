import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const RegistrationForm = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users', userData);
            console.log('Registration successful:', response.data);
            router.push('/login'); // Redirecting to login page after successful registration instead of spring secuiry redirect
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : 'Error during registration');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
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
