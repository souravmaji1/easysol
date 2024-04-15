// Execute the API request (Promise)
const imageUrl = args[0];

const imageResponse = await Functions.makeHttpRequest({
  url: imageUrl,
  method: 'GET',
  responseEncoded: 'base64',
});

if (imageResponse.error) {
  console.error('Error downloading image:', imageResponse.error);
  throw Error('Request failed');
}

const imageData = imageResponse.data;

// Create the request body
const boundary = 'boundary';
const body = `--${boundary}\r\nContent-Disposition: form-data; name="image"; filename="chainlinkimage"\r\nContent-Type: application/octet-stream\r\n\r\n${imageData}\r\n--${boundary}--`;

const processingResponse = await Functions.makeHttpRequest({
  url: 'https://blend-server.vercel.app/aws/send',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
  },
  data: body,
});

if (processingResponse.error) {
  console.error('Error sending image for processing:', processingResponse.error);
  throw Error('Request failed');
}

const processedData = processingResponse.data;

// Log the processing response
console.log('Processed image data:', processedData);

// Return the processed data
return Functions.encodeString(processedData.s3_url);