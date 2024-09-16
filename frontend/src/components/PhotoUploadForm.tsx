import React, { useState } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';

const PhotoUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      Resizer.imageFileResizer(
        imageFile,
        800, // max width for now
        800, // max height
        'JPEG',
        80, // quality fine for now
        0, // rotation straight
        (uri) => {
          const byteString = atob(uri.split(',')[1]);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: 'image/jpeg' });
          const resizedFile = new File([blob], imageFile.name, { type: 'image/jpeg' });
          setFile(resizedFile);
        },
        'base64'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('No auth token found, please log in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/photos/upload', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      alert('Photo uploaded successfully!');
      // optionally refresh the gallery or clear the form, this may be where my issue is from
    } catch (error) {
      console.error("There was an error uploading the photo!", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Upload Photo</button>
    </form>
  );
};

export default PhotoUploadForm;
