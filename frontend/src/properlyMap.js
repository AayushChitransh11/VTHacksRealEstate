import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Fix for default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const properties = [
  { id: 1, title: "Luxury Condo in Miami", location: [25.7617, -80.1918], minInvestment: 5000, roi: 12 },
  { id: 2, title: "Commercial Complex in NYC", location: [40.7128, -74.0060], minInvestment: 10000, roi: 15 },
  { id: 3, title: "Beachfront Villa in Bali", location: [-8.4095, 115.1889], minInvestment: 2000, roi: 18 },
];

// Custom component to add marker clustering
const MarkerCluster = () => {
  const map = useMap();

  useEffect(() => {
    const markers = L.markerClusterGroup();

    properties.forEach(property => {
      const marker = L.marker(property.location);
      marker.bindPopup(
        `<strong>${property.title}</strong><br>Min. Investment: $${property.minInvestment}<br>ROI: ${property.roi}%`
      );
      markers.addLayer(marker);
    });

    map.addLayer(markers);
  }, [map]);

  return null;
};

const PropertyMap = () => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-center mb-4">Map View of Properties</h2>
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerCluster />
    </MapContainer>
  </div>
);

export default PropertyMap;
