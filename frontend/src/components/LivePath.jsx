import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
// Custom icons
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LivePath = ({ride}) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [mapOnTop, setMapOnTop] = useState(false);

  const mapRef = useRef(null);
  const hasCentered = useRef(false);
  const userMovedMap = useRef(false);
  console.log("ride",ride, ride?.destination)
  const fetchCoordinates = async () => {
    try {
      const response = await axios.get(url);
      console.log(response.data.lat, response.data.lon); // ✅ Access here
    } catch (error) {
      console.error(error);
    }
  };
  const destcord = axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
    params: { address: ride?.destination },
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }

  })
  console.log("cordidates",destcord, destcord.data, destcord.data);
  console.log("data",destcord.data);
  const destination = { lat: 28.5672, lng: 77.2100 };
  const source = { lat: 28.5672, lng: 77.2100 };
  const apiKey = 'pk.7ffdf5d95e280c57cc9b4edbf441f95e'; // Replace with your API key

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      const newPosition = { lat: latitude, lng: longitude };
      setCurrentPosition(newPosition);
      setLocationError(false);
      fetchRoute(newPosition);
    };

    const errorCallback = (error) => {
      console.error("Error getting location: ", error);
      setLocationError(true);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation not supported.");
      setLocationError(true);
    }
  }, []);

  const fetchRoute = async (startPos) => {
    if (!startPos) return;
    try {
      const url = `https://eu1.locationiq.com/v1/directions/driving/${startPos.lng},${startPos.lat};${destination.lng},${destination.lat}?key=${apiKey}&overview=full&geometries=geojson`;
      const response = await fetch(url);
      const data = await response.json();

      const coordinates = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      setRouteCoordinates(coordinates);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  useEffect(() => {
    if (mapRef.current && currentPosition && !hasCentered.current && !userMovedMap.current) {
      mapRef.current.setView(currentPosition, 60);
      hasCentered.current = true;
    }
  }, [currentPosition]);

  if (locationError) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error: Could not retrieve location.</h2>
        <p>Please make sure location access is enabled and permissions are granted.</p>
      </div>
    );
  }

  if (!currentPosition) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: mapOnTop ? 10 : 0,
          border: mapOnTop ? '3px solid #007bff' : 'none',
        }}
        onClick={() => setMapOnTop(true)}
      >
        <MapContainer
          center={currentPosition}
          zoom={15}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
            mapInstance.on('movestart', () => {
              userMovedMap.current = true;
            });
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          />

          <Marker position={source} icon={blueIcon} />
          <Marker position={destination} icon={redIcon} />
          <Marker position={currentPosition} icon={greenIcon} />

          {routeCoordinates.length > 0 && (
            <Polyline positions={routeCoordinates} color="blue" weight={4} />
          )}
        </MapContainer>
      </div>

      {mapOnTop && (
        <button
          onClick={() => setMapOnTop(false)}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 1000,
            padding: '10px 15px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Close Map View
        </button>
      )}
    </div>
  );
};

export default LivePath;
