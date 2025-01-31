/*
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';

// Define the type for the file state
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
//We'll see if this works!
//double test

const PhotoUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);

  // Handle file change and image resizing
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      Resizer.imageFileResizer(
        imageFile,
        800, // max width
        800, // max height
        'JPEG',
        80, // quality
        0, // rotation
        (uri) => {
          if (typeof uri === 'string') { // Ensure uri is a string
            const byteString = atob(uri.split(',')[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: 'image/jpeg' });
            const resizedFile = new File([blob], imageFile.name, { type: 'image/jpeg' });
            setFile(resizedFile);
          } else {
            console.error('Error: URI is not a string', uri);
          }
        },
        'base64'
      );
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      const response = await axios.post(`${BACKEND_URL}/photos/upload`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      alert('Photo uploaded successfully!');
    } catch (error: unknown) { // Explicitly type the error as unknown
      if (error instanceof Error) { // Narrow the error type to Error
        console.error("There was an error uploading the photo!", error);
        alert(`Error: ${error.message}`);
      } else {
        console.error("Unexpected error", error);
        alert("An unexpected error occurred");
      }
    }
  };

   */
/*   try {
          const response = await axios.post(`${BACKEND_URL}/photos/upload`, formData, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                  'Content-Type': 'multipart/form-data',
              },
          });
          alert('Photo uploaded successfully!');
      } catch (error) {
          console.error("Error uploading photo:", error);
          alert(error.response?.data || "An error occurred during upload.");
      } *//*


  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Upload Photo</button>
    </form>
  );
};

export default PhotoUploadForm;
 */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

const PhotoUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Loading state

  // Handle file change and image resizing
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      // Basic file validation
      if (!imageFile.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      if (imageFile.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB.');
        return;
      }

      Resizer.imageFileResizer(
        imageFile,
        800, // max width
        800, // max height
        'JPEG',
        80, // quality
        0, // rotation
        (uri) => {
          if (typeof uri === 'string') {
            const byteString = atob(uri.split(',')[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: 'image/jpeg' });
            const resizedFile = new File([blob], imageFile.name, { type: 'image/jpeg' });
            setFile(resizedFile);
          } else {
            console.error('Error: URI is not a string', uri);
          }
        },
        'base64'
      );
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('No auth token found, please log in.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true); // Start loading

    try {
      const response = await axios.post(`${BACKEND_URL}/photos/upload`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Photo uploaded successfully!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error('Error uploading photo:', error.response?.data || error.message);
        alert(error.response?.data || 'An error occurred during upload.');
      } else if (error instanceof Error) {
        // Handle generic errors
        console.error('Unexpected error:', error.message);
        alert('An unexpected error occurred.');
      } else {
        // Handle unknown errors
        console.error('Unknown error:', error);
        alert('An unknown error occurred.');
      }
    } finally {
      setIsUploading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} accept="image/*" required />
      <button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Photo'}
      </button>
    </form>
  );
};

export default PhotoUploadForm;