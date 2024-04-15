import axios from 'axios';
import FormData from 'form-data';


// Function to send an image for processing
async function sendImageForProcessing(imageUrl) {
    try {
        // Download the image
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Create a FormData object
        const formData = new FormData();

        // Append the image to the FormData object
        formData.append('image', Buffer.from(response.data), { filename: 'chainlinkimage' });

        // Make the POST request
        const processingResponse = await axios.post('https://blend-server.vercel.app/aws/send', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        // Log the processing response
        console.log('Processed image data:', processingResponse.data);
    } catch (error) {
        // Log any errors
        console.error('Error sending image for processing:', error.message);
    }
}

// Call the function with the image URL
sendImageForProcessing('https://upload-selfie-image.s3.ap-southeast-1.amazonaws.com/image');

// https://upload-selfie-image.s3.ap-southeast-1.amazonaws.com/image