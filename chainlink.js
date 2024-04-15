// Import form-data
const FormData = await import('npm:form-data@4.0.0');
const { Buffer } = await import("node:buffer");
// Function to send an image for processing

const imageUrl = args[0]; // e.g. 'TwitterDev'

    const imageResponse = await Functions.makeHttpRequest({
      url: imageUrl,
      responseEncoding: 'arraybuffer',
    });

    if (imageResponse.error) {
      console.error('Error downloading image:', imageResponse.error);
      return;
    }

    // Create a FormData object
    const formData = new FormData.default();

    // Append the image to the FormData object
    formData.append('image', Buffer.from(imageResponse.data), { filename: 'chainlinkimage' });

    // Make the POST request
    const apiResponse = await Functions.makeHttpRequest({
      method: 'POST',
      url: 'https://blend-server.vercel.app/aws/send',
      headers: formData.getHeaders(),
      body: formData.getBuffer(),
    });

    

    if (apiResponse.error) {
        console.error(apiResponse.error)
        throw Error("Request failed")
      }
      
      const { data } = apiResponse;
      
      console.log('API response data:', JSON.stringify(data, null, 2));
      
      // Return Character Name
      return Functions.encodeString(data.s3_url)

