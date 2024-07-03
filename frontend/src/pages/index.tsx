/* import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../styles/Styles.css';

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Checking for user data in local storage
    const userData = localStorage.getItem('user');
    if (userData && typeof userData === 'string') {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-light-blue flex flex-col justify-center items-center">
      <h1 className="text-4xl-general font-bold-general text-center-general mb-4 text-blue-500">Welcome to Knightline</h1>
      <img src="/adampic.jpeg" alt="Knightline" className="max-w-xs max-h-xs mb-8 rounded-lg object-cover" />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center-general">
        <h2 className="text-2xl-general font-bold-general mb-4">Welcome, {user ? user.name : 'Guest'}!</h2>
        {user ? (
          <p>Explore Knightline</p>
        ) : (
          <div className="flex flex-col space-y-4">
            <p>Please log in to continue.</p>
            <Link href="/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                Log In
              </button>
            </Link>
            <Link href="/create-user">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ease-in-out">
                Create Account
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../styles/Styles.css'; // Ensure this import

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Checking for user data in local storage
    const userData = localStorage.getItem('user');
    if (userData && typeof userData === 'string') {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-light-blue flex flex-col justify-center items-center">
      <h1 className="text-center-general text-blue-500 font-playfair text-4xl">Welcome to Knightline</h1>
      <img src="/adampic.jpeg" alt="Knightline" className="max-w-md max-h-md mb-8 rounded-lg object-cover" />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center-general">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user ? user.name : 'Guest'}!</h2>
        {user ? (
          <p>Explore Knightline</p>
        ) : (
          <div className="flex flex-col space-y-4">
            <p>Please log in to continue.</p>
            <Link href="/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                Log In
              </button>
            </Link>
            <Link href="/create-user">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ease-in-out">
                Create Account
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
