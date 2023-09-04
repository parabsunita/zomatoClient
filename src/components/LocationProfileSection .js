// LocationProfileSection.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const LocationProfileSection = () => {
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  if ("geolocation" in navigator) {
    // Get the current position
    navigator.geolocation.getCurrentPosition(function (position) {
      setlatitude(position.coords.latitude);
      setlongitude(position.coords.longitude);
    });
  } else {
    console.log("Geolocation is not available in this browser.");
  }
  return (
    <div className="location-profile-section">
      <div className="location w-100">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-danger" />
        <span>({latitude})-</span>
        <span>({longitude})</span>
      </div>
      <div className="profile">
        <FontAwesomeIcon icon={faUserCircle} className="text-danger" />
      </div>
    </div>
  );
};
// Function to get the current location address using Google Maps API

export default LocationProfileSection;
