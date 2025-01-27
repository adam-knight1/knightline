import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

const UpdatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
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

interface Author {
  profilePictureUrl: string;
  name: string;
}

interface Update {
  id: string;
  body: string;
  author: Author;
}

const FamilyUpdateComponent: React.FC = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/updates/retrieve-all`);
        setUpdates(response.data);
      } catch (error) {
        setError('Error fetching updates. Please try again later.');
        console.error(error);
      }
    };

    fetchUpdates();
  }, []);

  const handlePostUpdate = async (event: FormEvent) => {
    event.preventDefault();

    if (!message.trim()) {
      alert('Message cannot be empty!');
      return;
    }

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('No auth token found, please log in.');
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/updates/post-update`,
        { body: message },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setUpdates([response.data, ...updates]);
      setMessage('');
    } catch (error) {
      setError('Error posting update. Please try again later.');
      console.error(error);
    }
  };

  return (
    <UpdatesContainer>
      <BackButton onClick={() => window.history.back()}>Back</BackButton>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      <UpdateForm onSubmit={handlePostUpdate}>
        <TextArea
          placeholder="Write an update..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <SubmitButton type="submit">Post Update</SubmitButton>
      </UpdateForm>

      <MessageList>
        {updates.map((update) => (
          <MessageItem key={update.id}>
            <ProfileImage src={update.author.profilePictureUrl} alt="Profile" />
            <MessageContent>
              <MessageAuthor>{update.author.name}</MessageAuthor>
              <MessageBody>{update.body}</MessageBody>
            </MessageContent>
          </MessageItem>
        ))}
      </MessageList>
    </UpdatesContainer>
  );
};

export default FamilyUpdateComponent;
