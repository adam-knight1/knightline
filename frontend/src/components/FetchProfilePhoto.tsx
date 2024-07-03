import axios from 'axios';

const fetchProfilePhoto = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    alert('No auth token found, please log in.');
    return;
  }

  try {
    const response = await axios.get('http://localhost:8080/photos/profile', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      const photoUrl = response.data.url;
      return photoUrl;
    } else {
      throw new Error('Failed to fetch profile photo');
    }
  } catch (error) {
    console.error('Error fetching profile photo:', error);
  }
};

export default fetchProfilePhoto;
