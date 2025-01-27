import React, { useState, useEffect } from 'react';
import fetchProfilePhoto from './FetchProfilePhoto'; // Adjust the import path as necessary

interface User {
  name: string;
}

interface UserComponentProps {
  user: User;
  onProfilePictureUpload: (file: File) => void;
}

const UserComponent = ({ user, onProfilePictureUpload }: UserComponentProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>('');

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onProfilePictureUpload(selectedFile);
    }
  };

  return (
    <div className="user-profile">
      <h1>Hi there, {user?.name}!</h1> {/* Use optional chaining */}
      {profilePhotoUrl && (
        <img
          src={profilePhotoUrl}
          alt={`${user?.name}'s profile`}
          style={{ borderRadius: '10%', width: '250px', height: '250px' }}
        />
      )}
      <input type="file" onChange={handleFileChange} accept="image/*" />
    </div>
  );
};

export default UserComponent;
