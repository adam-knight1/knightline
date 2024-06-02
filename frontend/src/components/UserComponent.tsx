import React from 'react';

type UserProps = {
  user: {
    name: string;
    imageUrl: string;
  };
};

const UserComponent = ({ user }: UserProps) => {
  if (!user) return null;  // Only render if user data is present

  return (
    <div>
      <h1>Welcome to Knightline, {user.name}!</h1>
      <img src={user.imageUrl} alt={`${user.name}'s profile`} style={{ width: '100px', height: '100px', borderRadius: '50%' }}/>
      <ul>
        <li>Family Calendar</li>
        <li>Family Message Board</li>
        <li>Upload Photo</li>
        <li>Send Direct Message</li>
        <li>Edit User Details</li>
      </ul>
    </div>
  );
};

export default UserComponent;

