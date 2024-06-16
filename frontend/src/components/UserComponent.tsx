import React, { useState } from 'react';

const UserComponent = ({ user, onProfilePictureUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onProfilePictureUpload(selectedFile);
  };

  return (
    <div className="user-profile">
      <h1>Welcome to Knightline, {user.name}!</h1>
      {user.imageUrl && (
        <img
          src={user.imageUrl}
          alt={`${user.name}'s profile`}
          style={{ borderRadius: '100%', width: '250px', height: '250px' }}
        />
      )}
      <input type="file" onChange={handleFileChange} accept="image/*" />
    </div>
  );
};

export default UserComponent;


