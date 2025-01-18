// NearbyLawyers.jsx
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { assets } from "../../assets/assets";
import "./main3.css";

const NearbyLawyers = ({ onBack }) => {
    const [lawyers, setLawyers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedLawyer, setSelectedLawyer] = useState(null);

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
        borderRadius: '12px',
        marginBottom: '20px'
    };

    const getUserLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log('Got user location:', userPos); // Debug log
                    setUserLocation(userPos);
                    setLoading(false);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setError('Error getting location: ' + error.message);
                    setLoading(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
        }
    };
    
    const fetchNearbyLawyers = async () => {
        if (!userLocation) return;

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/nearby-lawyers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: userLocation.lat,
                    longitude: userLocation.lng
                }),
            });

            const data = await response.json();
            if (data.status === 'success') {
                setLawyers(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error fetching lawyers: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const RatingStars = ({ rating }) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={`text-xl ${
                            index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                        ★
                    </span>
                ))}
                <span className="ml-2">({rating})</span>
            </div>
        );
    };

    return (
        <div className="results-container">
            <div className="main-response">
                <div className="response-card">
                    <div className="user-query">
                        <img src={assets.user} alt="User Icon" />
                        <p>Find Lawyers Nearby</p>
                    </div>
                    <div className="bot-response">
                        <img src={assets.law} alt="Chatbot Icon" />
                        <div className="response-content">
                            <button
                                onClick={fetchNearbyLawyers}
                                className="get-help-button mb-4"
                                disabled={!userLocation || loading}
                            >
                                {loading ? 'Searching...' : 'Get lawyers rating'}
                            </button>

                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}

                            {userLocation && (
                                <LoadScript googleMapsApiKey="AIzaSyDrGnW9kUQQiNWvVk_HrqD5lVvc3I90334">
                                    <GoogleMap
                                        mapContainerStyle={mapContainerStyle}
                                        center={userLocation}
                                        zoom={13}
                                    >
                                        <Marker
                                            position={userLocation}
                                            icon={{
                                                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                                            }}
                                        />

                                        {lawyers.map((lawyer) => (
                                            <Marker
                                                key={lawyer.place_id}
                                                position={{
                                                    lat: lawyer.location.lat,
                                                    lng: lawyer.location.lng
                                                }}
                                                onClick={() => setSelectedLawyer(lawyer)}
                                            />
                                        ))}

                                        {selectedLawyer && (
                                            <InfoWindow
                                                position={{
                                                    lat: selectedLawyer.location.lat,
                                                    lng: selectedLawyer.location.lng
                                                }}
                                                onCloseClick={() => setSelectedLawyer(null)}
                                            >
                                                <div>
                                                    <h3 className="font-bold">{selectedLawyer.name}</h3>
                                                    <p>{selectedLawyer.address}</p>
                                                    <RatingStars rating={selectedLawyer.rating} />
                                                </div>
                                            </InfoWindow>
                                        )}
                                    </GoogleMap>
                                </LoadScript>
                            )}

                            <div className="lawyers-list">
                                {lawyers.map((lawyer) => (
                                    <div
                                        key={lawyer.place_id}
                                        className="lawyer-card"
                                        onClick={() => setSelectedLawyer(lawyer)}
                                    >
                                        <h2 className="lawyer-name">{lawyer.name}</h2>
                                        <p className="lawyer-address">{lawyer.address}</p>
                                        <RatingStars rating={lawyer.rating} />
                                        {lawyer.open_now !== undefined && (
                                            <p className={`lawyer-status ${lawyer.open_now ? 'open' : 'closed'}`}>
                                                {lawyer.open_now ? 'Open Now' : 'Closed'}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={onBack} className="back-button-main">
                Home
            </button>
        </div>
    );
};

export default NearbyLawyers;