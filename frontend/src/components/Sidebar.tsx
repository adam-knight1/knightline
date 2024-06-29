import React from 'react';
import './Sidebar.css'; // Add your CSS file here

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>Family Calendar</li>
        <li>Family Updates</li>
        <li>Family Photos</li>
        <li>Send Direct Message</li>
        <li>Edit User Details</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
