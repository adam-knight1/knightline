import React from 'react';
import PhotoAlbumComponent from '../components/PhotoAlbumComponent';
import PhotoUploadForm from '../components/PhotoUploadForm';
import styles from '../styles/Styles.css';


const PhotoAlbumPage = () => {
  return (
    <div>
      <PhotoAlbumComponent />
      <PhotoUploadForm />
    </div>
  );
};

export default PhotoAlbumPage;
