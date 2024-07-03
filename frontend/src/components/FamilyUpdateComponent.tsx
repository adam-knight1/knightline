import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UpdatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const MessageItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageAuthor = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const MessageBody = styled.p`
  margin: 0;
`;

const FamilyUpdateComponent = () => {
  const [updates, setUpdates] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/updates/retrieve-all');
        setUpdates(response.data);
      } catch (error) {
        console.error('Error fetching updates:', error);
      }
    };

    fetchUpdates();
  }, []);

  const handlePostUpdate = async (event) => {
    event.preventDefault();

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

      setUpdates([response.data, ...updates]);
      setMessage('');
    } catch (error) {
      console.error('Error posting update:', error);
    }
  };

  return (
    <UpdatesContainer>
      <UpdateForm onSubmit={handlePostUpdate}>
        <TextArea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What's on your mind?" />
        <SubmitButton type="submit">Post Update</SubmitButton>
      </UpdateForm>
      <MessageList>
        {updates.map((update) => (
          <MessageItem key={update.id}>
            <ProfileImage src={update.user.profilePictureUrl} alt={`${update.user.name}'s profile`} />
            <MessageContent>
              <MessageAuthor>{update.user.name}</MessageAuthor>
              <MessageBody>{update.body}</MessageBody>
            </MessageContent>
          </MessageItem>
        ))}
      </MessageList>
    </UpdatesContainer>
  );
};

export default FamilyUpdateComponent;
