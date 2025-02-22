import axios from 'axios';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';



//Component to fetch profile photo upon login, should persist through sessions but currently error-prone

const fetchProfilePhoto = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    alert('No auth token found, please log in.');
    return;
  }

  try {
    const response = await axios.get('http://localhost:8080/photos/profile', {  //resolved issue with profile photo not fetching
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
    throw error;
  }
};

export default fetchProfilePhoto;

