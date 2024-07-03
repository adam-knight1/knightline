import React, { useEffect, useState } from 'react';
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';
import axios from 'axios';
import styled from 'styled-components';
import 'lightgallery.js/dist/css/lightgallery.css';
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
          thumb: photo.url,
        }));

        setPhotos(photoData);
        console.log("Fetched photos: ", photoData);
      } catch (error) {
        console.error("There was an error fetching the photos!", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <GalleryContainer>
      <BackButton onClick={() => router.back()}>Back</BackButton>
      <Title>Family Photo Album</Title>
      <LightgalleryProvider>
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <LightgalleryItem key={index} group="group1" src={photo.src}>
              <img src={photo.thumb} alt={`photo-${index}`} style={{ width: '200px', margin: '10px' }} />
            </LightgalleryItem>
          ))}
        </div>
      </LightgalleryProvider>
    </GalleryContainer>
  );
};

export default PhotoAlbumComponent;
