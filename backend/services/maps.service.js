const axios = require('axios');
const captainModel = require('../models/captain.model');

let isProcessing = false;

// helper to delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// our custom axios wrapper with delay
async function locationIqRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const queue = [{ url, options }];
        processQueue(queue, resolve, reject);
    });
}

async function processQueue(queue, resolve, reject) {
    if (isProcessing) return;
    isProcessing = true;

    while (queue.length > 0) {
        const { url, options } = queue.shift();

        try {
            const response = await axios.get(url, options);
            console.log('Response:', response.data); // Log the response
            resolve(response); // Resolving the response data
        } catch (error) {
            console.error('Error:', error);
            reject(error); // Reject on error
        }

        await sleep(600); // ⏳ 600ms between requests (~1.5 requests per second)
    }

    isProcessing = false;
}

module.exports.getAddressCoordinate = async (address) => {
    if (!address) {
        throw new Error('address is required');
    }

    const apiKey = process.env.LOCATIONIQ_API_KEY;
    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=in&viewbox=76.8,28.9,77.5,28.4&bounded=1`;

    try {
        const response = await axios.get(url);

        if (response.data && response.data.length > 0) {
            const location = response.data[0];

            if (location.address && location.address.country_code !== 'in') {
                throw new Error('Fetched location is not in India');
            }
            return {
                lat: parseFloat(location.lat),
                lon: parseFloat(location.lon)
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};


module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.LOCATIONIQ_API_KEY;

    try {
        // Convert origin and destination addresses into lat/lng coordinates
        const originCoordinates = await module.exports.getAddressCoordinate(origin); // Get coordinates for origin
        const destinationCoordinates = await module.exports.getAddressCoordinate(destination); // Get coordinates for destination

        // Format coordinates into lat,lng format
        const originLatLng = `${originCoordinates.lon},${originCoordinates.lat}`;
        const destinationLatLng = `${destinationCoordinates.lon},${destinationCoordinates.lat}`;
        console.log("originLatLng:-",originLatLng, origin)
        console.log("destinationLatLng:-",destinationLatLng, destination)
        // API URL for calculating driving distance and duration
        const url = `https://us1.locationiq.com/v1/directions/driving/${originLatLng};${destinationLatLng}?key=${apiKey}&alternatives=false&steps=true&geometries=polyline&overview=full&annotations=true&geometries=geojson`;

        // Wait for a short period to avoid hitting rate limits (optional)
        await sleep(1000);

        const response = await axios.get(url);
        console.log('Distance and Duration Response:', response.data); // Log the response
        if (response.data && response.data.routes && response.data.routes[0].duration>0, response.data.routes[0].distance>0) {
            return {
                distance: { value: response.data.routes[0].distance},   // in meters
                duration: { value: response.data.routes[0].duration }    // in seconds
            };
        } else {
            throw new Error('no routes found');
        }
    } catch (err) {
        console.error('Error calculating distance and time:', err);
        throw err;
    }
};




module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.LOCATIONIQ_API_KEY;

    // Approximate bounding box for Delhi: [left, top, right, bottom]
    const viewbox = '76.8,28.9,77.3,28.4'; // (longitude, latitude)
    const bounded = 1; // Forces results to stay within the viewbox

    const url = `https://api.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${encodeURIComponent(input)}&countrycodes=in&format=json&limit=5&viewbox=${viewbox}&bounded=${bounded}`;

    await sleep(1000); // optional delay
    try {
        const response = await locationIqRequest(url);
        
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(place => place.display_name).filter(Boolean);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};



module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km
    console.log("ltd:-",ltd, "lng:-",lng, "radius:-",radius)
    const captains = await captainModel.find({});
    return captains;
    /*
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;
    */


}