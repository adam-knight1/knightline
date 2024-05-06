import { useEffect, useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Checking for user data in local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome, {user ? user.name : 'Guest'}!</h1>
        {user ? (
          <p className="text-center">Explore Knightline</p>
        ) : (
          <div className="flex flex-col space-y-4">
            <p className="text-center">Please log in to continue.</p>
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
