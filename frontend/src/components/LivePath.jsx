import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Helper to create marker icons
const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const icons = {
  green: createIcon('green'),
  red: createIcon('red'),
  blue: createIcon('blue'),
};

const LivePath = ({ ride }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [destination, setDestination] = useState(null);
  const [source, setSource] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [locationError, setLocationError] = useState(false);
  const [mapOnTop, setMapOnTop] = useState(false);

  const mapRef = useRef(null);
  const hasCentered = useRef(false);
  const userMovedMap = useRef(false);

  const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

  // Fetch source and destination coordinates on mount
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!ride?.destination || !ride?.source) return;
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [destRes, srcRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
            params: { address: ride.destination },
            headers,
          }),
          axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
            params: { address: ride.source },
            headers,
          }),
        ]);

        setDestination({
          lat: destRes.data.lat,
          lng: destRes.data.lng,
        });
        setSource({
          lat: srcRes.data.lat,
          lng: srcRes.data.lng,
        });
      } catch (err) {
        console.error('Error fetching source/destination coordinates:', err);
      }
    };

    fetchCoordinates();
  }, [ride]);

  // Get live user position and track updates
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported.');
      setLocationError(true);
      return;
    }

    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
      setLocationError(false);
    };
    const errorCallback = () => setLocationError(true);

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Fetch route when currentPosition and destination are available
  useEffect(() => {
    const fetchRoute = async () => {
      if (!currentPosition || !destination) return;

      try {
        const { lng: startLng, lat: startLat } = currentPosition;
        const { lng: destLng, lat: destLat } = destination;
        const url = `https://eu1.locationiq.com/v1/directions/driving/${startLng},${startLat};${destLng},${destLat}?key=${apiKey}&overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.routes?.length) {
          const coords = data.routes[0].geometry.coordinates.map(
            ([lng, lat]) => [lat, lng]
          );
          setRouteCoordinates(coords);
        } else {
          console.error('No route found:', data);
        }
      } catch (err) {
        console.error('Error fetching route:', err);
      }
    };

    fetchRoute();
  }, [currentPosition, destination, apiKey]);

  // Center map on user's current position initially
  useEffect(() => {
    if (
      mapRef.current &&
      currentPosition &&
      !hasCentered.current &&
      !userMovedMap.current
    ) {
      mapRef.current.setView(currentPosition, 15);
      hasCentered.current = true;
    }
  }, [currentPosition]);

  if (locationError) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error: Could not retrieve location.</h2>
        <p>Please enable location access and grant permissions.</p>
      </div>
    );
  }

  if (!currentPosition) return <div>Loading...</div>;

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
          whenCreated={(map) => {
            mapRef.current = map;
            map.on('movestart', () => (userMovedMap.current = true));
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          />

          <Marker position={currentPosition} icon={icons.green} />
          {destination && <Marker position={destination} icon={icons.red} />}
          {source && <Marker position={source} icon={icons.blue} />}

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
