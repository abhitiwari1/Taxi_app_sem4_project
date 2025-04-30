const axios = require('axios');

async function getRoute() {
  try {
    const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
      params: {
        api_key: '5b3ce3597851110001cf6248ad53e6cd22654423a76757a69586576e',
        start: '8.681495,49.41461',
        end: '8.687872,49.420318'
      },
      headers: {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
      }
    });
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

getRoute();
