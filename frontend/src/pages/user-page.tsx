/** user-page class handles functions such as retrieving the user from storage
    and the auth token to allow for interactions with the various user page APIs
    such as uploading a profile picture and navigating the side bar menu **/


import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserComponent from '../components/UserComponent';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Styles.css';
import axios from 'axios';

const fetchProfilePhoto = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    alert('No auth token found, please log in.');
    return;
  }

  try {
    const response = await axios.get('http://localhost:8080/photos/profile', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      const photoUrl = response.data.url;
      return photoUrl;
    } else {
      throw new Error('Failed to fetch profile photo');
    }
  } catch (error) {
    console.error('Error fetching profile photo:', error);
  }
};

const UserPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    try {
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
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
      const updateProfilePhoto = async () => {
        const photoUrl = await fetchProfilePhoto();
        setUser((prevUser) => {
          const updatedUser = { ...prevUser, imageUrl: photoUrl };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          return updatedUser;
        });
      };
      updateProfilePhoto();
    }
  }, [user]);

  const handleProfilePictureUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('No auth token found, please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/photos/upload/profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Photo is too large! Please upload a smaller photo');
      }

      const data = await response.json();
      setUser((prev) => {
        const updatedUser = { ...prev, imageUrl: data.url };
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update local storage
        return updatedUser;
      });
      alert('Profile picture updated successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Upload failed:', error);
    }
  };

  if (!user) {
    return null; // Or a loading indicator maybe
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
