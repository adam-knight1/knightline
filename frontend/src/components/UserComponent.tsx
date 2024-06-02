import React from 'react';
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

export default UserComponent;
