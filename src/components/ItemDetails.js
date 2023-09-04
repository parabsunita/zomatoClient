import React, { useState } from "react";

const ItemDetails = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="item-details">
      <div className="item-info">
        <div className="item-header">
          <h3>{item.name}</h3>
          <div className="item-rating">
            <p>{item.rating} stars</p>
            <p>({item.numRatings} ratings)</p>
          </div>
        </div>
        <p>Price: {item.price}</p>
        <p>{item.description}</p>
      </div>
      <div className="item-image">
        <img src={item.image} alt={item.name} />
        <button className="add-button">Add</button>
      </div>
    </div>
  );
};

export default ItemDetails;
