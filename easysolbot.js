import axios from "axios";

async function callProcessImageEndpoint(imageUrl) {
    try {
        const response = await axios.post('https://imageapi-7xi5.onrender.com/process-image', { imageUrl });
        console.log('Processed image data:', response.data.processedData);
    } catch (error) {
        console.error('Error calling process-image endpoint:', error.message);
    }
}

// Call the function with the image URL
callProcessImageEndpoint('https://upload-selfie-image.s3.ap-southeast-1.amazonaws.com/image');
