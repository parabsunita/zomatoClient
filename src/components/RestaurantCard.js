import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { faHeart, faHeartRegular } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RestaurantCard = ({ restaurant }) => {
  // Create a useRef for the carousel
  const carouselRef = React.useRef(null);

  return (
    <div className="card">
      <div className="like">
        {" "}
        <FontAwesomeIcon icon={faHeart} className="float-end text-white" />
      </div>
      <Carousel
        ref={carouselRef}
        interval={3000}
        pause={false}
        controls={false}
      >
        {restaurant.resturant_images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`${restaurant.name} - Image ${index + 1}`}
              height={200}
              width={500}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="card-body">
        {restaurant.cuisines.map((cuisine, index) => (
          <span>{cuisine}</span>
        ))}
        <h5 className="card-title">{restaurant.name}</h5>
        <p className="card-text">{}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
