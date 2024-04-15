import axios from 'axios';

// Function to send an image for processing
async function sendImageForProcessing(imageUrl) {
  try {
    // Download the image
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Create a new ArrayBuffer from the image data
    const imageBuffer = new Uint8Array(response.data);

    // Send the image data as binary data
    const processingResponse = await axios.post(
      'https://blend-server.vercel.app/aws/send',
      imageBuffer,
      {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      }
    );

    // Log the processing response
    console.log('Processed image data:', processingResponse.data);
  } catch (error) {
    // Log any errors
    console.error('Error sending image for processing:', error.message);
  }
}

sendImageForProcessing("https://upload-selfie-image.s3.ap-southeast-1.amazonaws.com/image");