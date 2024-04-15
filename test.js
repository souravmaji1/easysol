import axios from 'axios';

// Request body
const data = {
  // Include any data you need to send in the request body
};

// Request headers
const headers = {
  'authorizationToken': 'blendAVAX2024',
  'Content-Type': 'application/json', // Adjust the content type if needed
};

// Make POST request
axios.post('https://28g5pjoyra.execute-api.ap-southeast-1.amazonaws.com/prod/flaskapp/startflaskapp', data, { headers })
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response.data);
  });
