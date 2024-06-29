/*
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
 */
import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link href="/calendar">Family Calendar</Link></li>
                <li><Link href="/updates">Family Updates</Link></li>
                <li><Link href="/photos">Family Photos</Link></li>
                <li><Link href="/messages">Send Direct Message</Link></li>
                <li><Link href="/edit-user">Edit User Details</Link></li>
                <li><Link href="/logout">Logout</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
