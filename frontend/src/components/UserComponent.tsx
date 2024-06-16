/*  import React from 'react';
import './UserComponent.css';

type UserProps = {
  user: {
    name: string;
    imageUrl: string;
  };
};

const UserComponent = ({ user }: UserProps) => {
  if (!user) return null;  // Only rendering if user data is present

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold my-4">Welcome to Knightline, {user.name}!</h1>
      <img
        src={user.imageUrl}
        alt={`${user.name}'s profile`}
        className="w-48 h-48 rounded-full mx-auto"
      />
      <ul className="list-none p-0 mt-4 space-y-2">
        <li className="hover:underline">Family Calendar</li>
        <li className="hover:underline">Family Message Board</li>
        <li className="hover:underline">Upload Photo</li>
        <li className="hover:underline">Send Direct Message</li>
        <li className="hover:underline">Edit User Details</li>
      </ul>
    </div>
  );
};

export default UserComponent; */

/* import React from 'react';
import UserPageStyle from '../UserPageStyle.css';

type UserProps = {
  user: {
    name: string;
    imageUrl: string;
  };
  onProfilePictureUpload: (file: File) => void; // Adding a callback prop for uploading
};

const UserComponent = ({ user, onProfilePictureUpload }: UserProps) => {
  if (!user) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      onProfilePictureUpload(file);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold my-4">Welcome to Knightline, {user.name}!</h1>
      <img
        src={user.imageUrl}
        alt={`${user.name}'s profile`}
        className="w-48 h-48 rounded-full mx-auto"
      />
      { *//* File input for uploading new profile picture *//* }
      <input type="file" onChange={handleFileChange} accept="image *//*" className="mt-4" />
      <ul className="list-none p-0 mt-4 space-y-2">
        <li className="hover:underline">Family Calendar</li>
        <li className="hover:underline">Family Message Board</li>
        <li className="hover:underline">Upload Photo</li>
        <li className="hover:underline">Send Direct Message</li>
        <li className="hover:underline">Edit User Details</li>
      </ul>
    </div>
  );
};

export default UserComponent; */
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
          style={{ borderRadius: '50%', width: '150px', height: '150px' }}
        />
      )}
      <input type="file" onChange={handleFileChange} accept="image/*" />
    </div>
  );
};

export default UserComponent;



