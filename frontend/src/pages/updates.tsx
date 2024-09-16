// pages/updates.js or pages/updates.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageList, Input, Button } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const UpdatesPage = () => {
  const [updates, setUpdates] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/updates/retrieve-all'); //will change upon deployment
        setUpdates(response.data.map(update => ({
          position: 'right',
          type: 'text',
          text: update.body,
          title: update.user.name,
          date: new Date(update.createdAt),
        })));
      } catch (error) {
        console.error('Error fetching updates:', error);
      }
    };

    fetchUpdates();
  }, []);

  const handlePostUpdate = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('No auth token found, please log in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/updates/post-update', { body: message }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setUpdates([{
        position: 'right',
        type: 'text',
        text: response.data.body,
        title: response.data.user.name,
        date: new Date(response.data.createdAt),
      }, ...updates]);

      setMessage('');
    } catch (error) {
      console.error('Error posting update:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Family Updates</h1>
      <div style={{ marginBottom: '20px' }}>
        <Input
          placeholder="What's on your mind?"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rightButtons={
            <Button
              text='Send'
              onClick={handlePostUpdate}
            />
          }
        />
      </div>
      <MessageList
        className='message-list'
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={updates}
      />
    </div>
  );
};

export default UpdatesPage;
