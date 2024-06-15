import React, { useState, useEffect } from 'react';
import UserComponent from '../components/UserComponent';

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data for now
    const userData = {
      name: 'Adam',
      imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    };
    setUser(userData);

    //effect will fetch user data from a backend service, will configure soon
  }, []);

  return (
    <div>
      <h1></h1>
      {user && <UserComponent user={user} />}
    </div>
  );
};

export default UserPage;

