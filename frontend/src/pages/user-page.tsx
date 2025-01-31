import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserComponent from '../components/UserComponent';
import Sidebar from '../components/Sidebar';
import fetchProfilePhoto from '../components/FetchProfilePhoto';
import styles from '../styles/Styles.css';

interface User {
  name: string;
  imageUrl?: string; // Added optional imageUrl property for the profile picture
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    try {
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        console.error('No user data found in local storage');
        router.push('/login'); // Redirect to login if no user data found
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
      router.push('/login'); // Redirect to login on error
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const handleProfilePictureUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('No auth token found, please log in.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/photos/upload/profile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Photo is too large! Please upload a smaller photo.');
      }

      const data = await response.json();
      setUser((prev) => {
        if (!prev) return null; // Handle null case safely
        const updatedUser = { ...prev, imageUrl: data.url };
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update local storage
        return updatedUser;
      });
      alert('Profile picture updated successfully!');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
        console.error('Upload failed:', error.message);
      } else {
        alert('An unexpected error occurred.');
        console.error('Upload failed:', error);
      }
    }
  };

  if (!user) {
    return null; // Consider adding a loading indicator here
  }

  return (
    <div className="user-page-container">
      <Sidebar />
      <div className="main-content">
        {user && <UserComponent user={user} onProfilePictureUpload={handleProfilePictureUpload} />}
      </div>
    </div>
  );
};

export default UserPage;
