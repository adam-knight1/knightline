/*
import React, { useState, useEffect } from 'react';
import UserComponent from '../components/UserComponent';

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from local storage
    const userData = localStorage.getItem('user');
    try {
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        console.error('No user data found in local storage');
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
    }
  }, []);

  const handleProfilePictureUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('No auth token found, please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/photos/upload/profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUser(prev => ({ ...prev, imageUrl: data.url })); // Update user's image URL
      alert('Profile picture updated successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      {user && <UserComponent user={user} onProfilePictureUpload={handleProfilePictureUpload} />}
    </div>
  );
};

export default UserPage;
 */
 /* import React, { useState, useEffect } from 'react';
 import UserComponent from '../components/UserComponent'; // Assuming this is correctly imported
 import UserPageStyle from '../components/UserPageStyle';

 const UserPage = () => {
   const [user, setUser] = useState(null);

   useEffect(() => {
     // Fetch user data from local storage
     const userData = localStorage.getItem('user');
     try {
       if (userData) {
         setUser(JSON.parse(userData));
       } else {
         console.error('No user data found in local storage');
       }
     } catch (error) {
       console.error('Failed to parse user data:', error);
     }
   }, []);

   const handleProfilePictureUpload = async (file: File) => {
     const formData = new FormData();
     formData.append('file', file);

     const authToken = localStorage.getItem('authToken');
     if (!authToken) {
       alert('No auth token found, please log in.');
       return;
     }

     try {
       const response = await fetch('http://localhost:8080/photos/upload/profile', {
         method: 'POST',
         headers: {
           Authorization: `Bearer ${authToken}`,
         },
         body: formData,
       });

       if (!response.ok) {
         throw new Error('Network response was not ok');
       }

       const data = await response.json();
       setUser(prev => ({ ...prev, imageUrl: data.url })); // Update user's image URL
       alert('Profile picture updated successfully!');
     } catch (error) {
       alert(`Error: ${error.message}`);
       console.error('Upload failed:', error);
     }
   };

   return (
     <div className="user-page-container">
       <div className="sidebar">
         <ul>
           <li>Family Calendar</li>
           <li>Family Message Board</li>
           <li>Upload Photo</li>
           <li>Send Direct Message</li>
           <li>Edit User Details</li>
         </ul>
       </div>
       <div className="main-content">
         {user && <UserComponent user={user} onProfilePictureUpload={handleProfilePictureUpload} />}
       </div>
     </div>
   );
 };

 export default UserPage; */

 import React, { useState, useEffect } from 'react';
 import UserComponent from '../components/UserComponent'; // Assuming this is correctly imported
 import Sidebar from '../components/Sidebar'; // Add the Sidebar component
 import '../components/UserPageStyle.css'; // Add your CSS file here

 const UserPage = () => {
   const [user, setUser] = useState(null);

   useEffect(() => {
     // Fetch user data from local storage
     const userData = localStorage.getItem('user');
     try {
       if (userData) {
         setUser(JSON.parse(userData));
       } else {
         console.error('No user data found in local storage');
       }
     } catch (error) {
       console.error('Failed to parse user data:', error);
     }
   }, []);

   const handleProfilePictureUpload = async (file: File) => {
     const formData = new FormData();
     formData.append('file', file);

     const authToken = localStorage.getItem('authToken');
     if (!authToken) {
       alert('No auth token found, please log in.');
       return;
     }

     try {
       const response = await fetch('http://localhost:8080/photos/upload/profile', {
         method: 'POST',
         headers: {
           Authorization: `Bearer ${authToken}`,
         },
         body: formData,
       });

       if (!response.ok) {
         throw new Error('Network response was not ok');
       }

       const data = await response.json();
       setUser(prev => ({ ...prev, imageUrl: data.url })); // Update user's image URL
       alert('Profile picture updated successfully!');
     } catch (error) {
       alert(`Error: ${error.message}`);
       console.error('Upload failed:', error);
     }
   };

   return (
     <div className="user-page-container">
       <Sidebar />
       <div className="main-content">
         {user && <UserComponent user={user} onProfilePictureUpload={handleProfilePictureUpload} />}
       </div>
     </div>
   );
 };

 export default UserPage;


