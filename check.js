import axios from 'axios';

// Request headers
const headers = {
  'authorizationToken': 'blendAVAX2024',
};

// Make GET request
axios.get('https://28g5pjoyra.execute-api.ap-southeast-1.amazonaws.com/prod/flaskapp', { headers })
  .then(response => {
    console.log('Status:', response.status);
    console.log('Response Data:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response.data);
  });
