import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [mapOnTop, setMapOnTop] = useState(false); // Control z-index of map

  const mapRef = useRef(null);           // Store map instance
  const hasCentered = useRef(false);     // Track if map was auto-centered
  const userMovedMap = useRef(false);    // Track manual movement

  // Get user location
  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
      setLocationError(false);
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

  // Center the map only once
  useEffect(() => {
    if (mapRef.current && currentPosition && !hasCentered.current && !userMovedMap.current) {
      mapRef.current.setView(currentPosition, 15);
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
      {/* MAP */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: mapOnTop ? 10 : 0, // Layer control
          border: mapOnTop ? '3px solid #007bff' : 'none',
        }}
        onClick={() => setMapOnTop(true)} // Click to bring map forward
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
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          <Marker position={currentPosition} />
        </MapContainer>
      </div>

      {/* BUTTON TO SEND MAP BACK */}
      {mapOnTop && (
        <button
          onClick={() => setMapOnTop(false)} // Send map to the background
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

export default LiveTracking;
