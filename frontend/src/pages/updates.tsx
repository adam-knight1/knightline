import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageList, Input, Button } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

interface Update {
  position: 'left' | 'right';
  type: 'text';
  text: string;
  title: string;
  date: Date;
}

const UpdatesPage = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get('http://${BACKEND_URL}/updates/retrieve-all'); //will change upon deployment
        const transformedUpdates = response.data.map((update: any) => ({
          position: 'right', // Assuming the default position is "right"
          type: 'text', // Assuming updates are all text type
          text: update.body, // Adjust this based on your API response
          title: update.user.name, // Adjust this based on your API response
          date: new Date(update.createdAt),
        }));

        setUpdates(transformedUpdates);
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
      const response = await axios.post(
        'http://localhost:8080/updates/post-update',
        { body: message },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const newUpdate: Update = {
        position: 'right', // Message posted by the user should have "right" position
        type: 'text',
        text: response.data.body,
        title: response.data.user.name,
        date: new Date(response.data.createdAt),
      };

      setUpdates([newUpdate, ...updates]);

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          rightButtons={
            <Button
              text='Send'
              onClick={handlePostUpdate}
            />
          }
          maxHeight={200}
        />
      </div>
      <MessageList
        className='message-list'
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={updates as any} // Cast to any if still needed temporarily
        referance={React.createRef()} // Add this line

      />
    </div>
  );
};

export default UpdatesPage;
