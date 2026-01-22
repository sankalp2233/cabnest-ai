"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom yellow marker for pickup
const yellowIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
            <path fill="#FFC107" stroke="#2C2C2C" stroke-width="1.5" d="M12 0C7.03 0 3 4.03 3 9c0 6.75 9 18 9 18s9-11.25 9-18c0-4.97-4.03-9-9-9z"/>
            <circle cx="12" cy="9" r="3" fill="#2C2C2C"/>
        </svg>
    `),
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
});

// Custom black square marker for dropoff
const blackIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
            <path fill="#2C2C2C" stroke="#FFC107" stroke-width="1.5" d="M12 0C7.03 0 3 4.03 3 9c0 6.75 9 18 9 18s9-11.25 9-18c0-4.97-4.03-9-9-9z"/>
            <rect x="9" y="6" width="6" height="6" fill="#FFC107"/>
        </svg>
    `),
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
});

// Component to update map center dynamically
function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center && Array.isArray(center) && center.length === 2) {
            map.flyTo(center, 13, {
                duration: 1.5,
                easeLinearity: 0.5
            });
        }
    }, [center, map]);
    return null;
}

const MapComponent = ({ center, pickup, dropoff, className }) => {
    // Default center (New Delhi)
    const [defaultCenter] = useState([28.6139, 77.2090]);
    const mapCenter = center || defaultCenter;

    return (
        <div className={`rounded-xl overflow-hidden shadow-2xl z-0 ${className}`}>
            <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {/* Custom zoom controls positioned at top right */}
                <ZoomControl position="topright" />

                {/* Pickup marker (yellow) */}
                {pickup && Array.isArray(pickup) && pickup.length === 2 && (
                    <Marker position={pickup} icon={yellowIcon}>
                        <Popup>
                            <strong>Pickup Location</strong>
                        </Popup>
                    </Marker>
                )}

                {/* Dropoff marker (black with yellow square) */}
                {dropoff && Array.isArray(dropoff) && dropoff.length === 2 && (
                    <Marker position={dropoff} icon={blackIcon}>
                        <Popup>
                            <strong>Dropoff Location</strong>
                        </Popup>
                    </Marker>
                )}

                {/* Default marker if no pickup/dropoff */}
                {!pickup && !dropoff && (
                    <Marker position={mapCenter} icon={yellowIcon}>
                        <Popup>
                            CabNest Area <br /> Available for booking.
                        </Popup>
                    </Marker>
                )}

                <MapUpdater center={center} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;

