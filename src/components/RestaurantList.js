import React from "react";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import LocationProfileSection from "./LocationProfileSection ";
import axios from "axios";
import SearchBar from "./SearchBar";
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRestaurantData = async () => {
      await axios
        .get("http://localhost:3000/api/restaurant/restaurant/details")
        .then((data) => {
          setRestaurants(data.data.restaurants);
          console.log(data);
        })
        .catch((error) =>
          console.error("Error fetching restaurant data:", error)
        );
    };
    fetchRestaurantData();
  }, []);
  const towardsResturantDetails = (e) => {
    let id = document
      .querySelector(e.target.tagName)
      .closest(".cardSection").id;
    navigate(`/restaurant/${id}`);
  };
  return (
    <>
      <LocationProfileSection></LocationProfileSection>
      <SearchBar></SearchBar>
      <div className="col-12 mx-0 row">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className=" mb-4 cardSection"
            id={restaurant._id}
            onClick={towardsResturantDetails}
          >
            <RestaurantCard id={restaurant._id} restaurant={restaurant} />
          </div>
        ))}
      </div>
    </>
  );
};

export default RestaurantList;
