import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

// Function to upload an image
async function uploadImage(imagePath) {
    try {
        // Read the image file
        const image = fs.readFileSync(imagePath);

        // Create a FormData object
        const formData = new FormData();

        // Append the image to the FormData object
        formData.append('image', image, { filename: 'profile.jpg' });

        // Make the POST request
        const response = await axios.post('https://blend-server.vercel.app/aws/upload', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        // Log the response
        console.log('Uploaded image URL:', response.data.imageURL);
    } catch (error) {
        // Log any errors
        console.error('Error uploading image:', error.message);
    }
}

// Call the function with the path to your image file
uploadImage('./test.png');
