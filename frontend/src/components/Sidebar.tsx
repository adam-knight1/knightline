import React from 'react';
import Link from 'next/link';
import useLogout from '../hooks/useLogout'; // Import the custom hook


const Sidebar = () => {
    const logout = useLogout();

    return (
        <div className="sidebar">
            <ul>
                <li><Link href="/calendar">Family Calendar</Link></li>
                <li><Link href="/updates">Family Updates</Link></li>
                <li><Link href="/photos">Family Photos</Link></li>
                <li><Link href="/messages">Send Direct Message</Link></li>
                <li><Link href="/edit-user">Edit User Details</Link></li>
                <li><button onClick={logout}>Logout</button></li>
            </ul>
        </div>
    );
};

export default Sidebar;
