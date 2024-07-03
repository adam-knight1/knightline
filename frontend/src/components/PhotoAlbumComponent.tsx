import React, { useEffect, useState } from 'react';
import { Gallery } from 'react-grid-gallery';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  color: #5a8dee;
  font-family: 'Playfair Display', serif;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
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

const PhotoAlbumComponent = () => {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPhotos = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('No auth token found, please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/photos/get', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const photoData = response.data.map(photo => ({
          src: photo.url,
          thumbnail: photo.url,
          thumbnailWidth: 320,
          thumbnailHeight: 212,
          caption: `${photo.title || ''} - ${photo.description || ''}`
        }));

        setPhotos(photoData);
        console.log("Fetched photos: ", photoData);
      } catch (error) {
        console.error("There was an error fetching the photos!", error);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    console.log("Photos to render: ", photos);
  }, [photos]);

  return (
    <GalleryContainer>
      <BackButton onClick={() => router.back()}>Back</BackButton>
      <Title>Family Photo Album</Title>
      <Gallery images={photos} />
    </GalleryContainer>
  );
};

export default PhotoAlbumComponent;
