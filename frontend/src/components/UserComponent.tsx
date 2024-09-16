import React, { useState, useEffect } from 'react';
import fetchProfilePhoto from '../components/fetchProfilePhoto';

const UserComponent = ({ user, onProfilePictureUpload }) => {
  const [file, setFile] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  useEffect(() => {
    const getProfilePhoto = async () => {
      try {
        const photoUrl = await fetchProfilePhoto();
        setProfilePhotoUrl(photoUrl);
      } catch (error) {
        console.error('Failed to fetch profile photo:', error);
      }
    };

    getProfilePhoto();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onProfilePictureUpload(selectedFile);
  };

  return (
    <div className="user-profile">
      <h1>Welcome to Knightline, {user.name}!</h1>
      {profilePhotoUrl && (
        <img
          src={profilePhotoUrl}
          alt={`${user.name}'s profile`}
          style={{ borderRadius: '10%', width: '250px', height: '250px' }}
        />
      )}
      <input type="file" onChange={handleFileChange} accept="image/*" />
    </div>
  );
};

export default UserComponent;
