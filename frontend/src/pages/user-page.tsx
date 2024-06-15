import React, { useState, useEffect } from 'react';
import UserComponent from '../components/UserComponent'; // Ensure this is correctly imported

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulated fetching user data for now
    const userData = {
      name: 'AdamKnight',
      imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      email: 'Neuronorth686@icloud.com'
    };
    setUser(userData);
  }, []);

  const handleProfilePictureUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', user ? user.email : ''); // Ensure user is defined or manage potential null value

    try {
      const response = await fetch('http://localhost:8080/photos/upload/profile', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Attempt to parse JSON, but handle empty or malformed JSON responses
      let data;
      try {
        data = await response.json(); // throws if the JSON is empty or invalid
      } catch (err) {
        throw new Error('Failed to parse response as JSON');
      }

      setUser(prev => ({ ...prev, imageUrl: data.url })); // Update user's image URL
      alert('Profile picture updated successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      {user && <UserComponent user={user} onProfilePictureUpload={handleProfilePictureUpload} />}
    </div>
  );
};

export default UserPage;
