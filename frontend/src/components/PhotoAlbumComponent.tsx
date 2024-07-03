import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  color: #5a8dee;
  font-family: 'Playfair Display', serif;
  text-decoration: underline;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
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

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0;
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
          title: photo.title || '',
          description: photo.description || '',
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
    <PageContainer>
      <Header>
        <BackButton onClick={() => router.back()}>Back</BackButton>
        <UploadSection>
          <input type="file" />
          <UploadButton>Upload Photo</UploadButton>
        </UploadSection>
      </Header>
      <Title>Family Photo Album</Title>
      <GalleryContainer>
        {photos.map((photo, index) => (
          <ImageWrapper key={index}>
            <Image src={photo.src} alt={photo.title} />
          </ImageWrapper>
        ))}
      </GalleryContainer>
    </PageContainer>
  );
};

export default PhotoAlbumComponent;
