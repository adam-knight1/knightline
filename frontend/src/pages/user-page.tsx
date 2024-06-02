import React, { useState, useEffect } from 'react';
import UserComponent from '../components/UserComponent';

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data for now
    const userData = {
      name: 'banjo',
      imageUrl: 'https://example.com/banjo.jpg'
    };
    setUser(userData);

    //effect will fetch user data from a backend service, will configure soon
  }, []);

  return (
    <div>
      <h1>User Page</h1>
      {user && <UserComponent user={user} />}
    </div>
  );
};

export default UserPage;

