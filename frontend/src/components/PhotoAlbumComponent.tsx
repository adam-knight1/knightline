import React, { useEffect, useState } from 'react';
import Gallery from 'react-photo-gallery';
import axios from 'axios';
import styled from 'styled-components';

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

const PhotoAlbumComponent = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('No auth token found, please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/photos', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const photoData = response.data.map(photo => ({
          src: photo.url,
          width: 4,
          height: 3,
          title: photo.title,
          description: photo.description
        }));

        setPhotos(photoData);
      } catch (error) {
        console.error("There was an error fetching the photos!", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <GalleryContainer>
      <Title>Family Photo Album</Title>
      <Gallery photos={photos} />
    </GalleryContainer>
  );
};

export default PhotoAlbumComponent;
