import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import PhotoUploadForm from './PhotoUploadForm'; // Adjust the import path as needed

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

interface Photo extends ReactImageGalleryItem {
  description?: string;
  original: string;
  thumbnail: string;
}

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

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 1100;

  &:hover {
    background-color: #cc0000;
  }
`;

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPhotos = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('No auth token found, please log in.');
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/photos/get`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const photoData: Photo[] = response.data.map((photo: any) => ({
          original: photo.url,
          thumbnail: photo.url,
          description: `${photo.title || ''} - ${photo.description || ''}`,
        }));

        setPhotos(photoData);
        setError(null);
      } catch (error) {
        console.error("There was an error fetching the photos!", error);
        setError("Failed to fetch photos. Please try again later.");
      }
    };

    fetchPhotos();
  }, [router]);

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => router.back()}>Back</BackButton>
        <UploadSection>
          <PhotoUploadForm />
        </UploadSection>
      </Header>
      <Title>Family Photo Album</Title>
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      <GalleryContainer>
        {photos.map((photo, index) => (
          <ImageWrapper key={index} onClick={() => setSelectedPhotoIndex(index)}>
            <Image src={photo.thumbnail} alt={photo.description} />
          </ImageWrapper>
        ))}
      </GalleryContainer>
      {selectedPhotoIndex !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ImageGallery
            items={photos}
            startIndex={selectedPhotoIndex}
            onScreenChange={fullScreen => {
              if (!fullScreen) setSelectedPhotoIndex(null);
            }}
            showThumbnails={false}
            showFullscreenButton={true}
            showPlayButton={false}
          />
          <CloseButton onClick={() => setSelectedPhotoIndex(null)}>Close</CloseButton>
        </div>
      )}
    </PageContainer>
  );
};

export default PhotoAlbumComponent;