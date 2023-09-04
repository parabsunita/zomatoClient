import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ItemList from "./ItemList";
const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    location: {
      type: "Point",
      coordinates: [],
    },
    _id: "",
    name: "",
    user_id: "",
    contact: "",
    email: "",
    address: "",
    cuisines: [],
    timeslot: [
      {
        startTime: "",
        endTime: "",
        _id: "",
      },
    ],
    opening_days: [],
    approval_status: "",
    resturant_images: [],
    food_images: [],
    rejection_season: "",
    created_at: "",
    updated_at: "",
  });

  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [distance, setDistance] = useState("");
  if ("geolocation" in navigator) {
    // Get the current position
    navigator.geolocation.getCurrentPosition(function (position) {
      setlatitude(position.coords.latitude);
      setlongitude(position.coords.longitude);
    });
  } else {
    console.log("Geolocation is not available in this browser.");
  }
  function calculateDistance(lat1, lon1) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = degToRad(latitude - lat1);
    const dLon = degToRad(longitude - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  }

  function degToRad(deg) {
    return deg * (Math.PI / 180);
  }
  useEffect(() => {
    const fetchRestaurantData = async () => {
      await axios
        .get(
          `http://localhost:3000/api/restaurant/restaurant/findResturant/${id}`
        )
        .then((response) => {
          setRestaurant(response.data[0]);
          setDistance(
            calculateDistance(
              response.data[0].location.coordinates[0],
              response.data[0].location.coordinates[1]
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
        });
    };

    fetchRestaurantData();
  }, [id]);

  return (
    <div className="restaurant-details">
      <h5 className="text-center">{restaurant.name}</h5>
      <div className="text-center">
        {" "}
        {restaurant.cuisines.map((cuisine, index) => (
          <span>{cuisine}</span>
        ))}
      </div>
      <div className="restaurant-address">
        {Math.round(distance)} Km | {restaurant.address}
      </div>
      <div>{restaurant._id}</div>
      <div className="cuisines">
        <p>Cuisines: {restaurant.cuisines}</p>
      </div>

      <ItemList></ItemList>
      {/* Add operating hours, approval status, rejection reason, images, buttons, etc. */}
    </div>
  );
};

export default RestaurantDetails;
