import React, { useState } from "react";
import axios from "axios";
const ItemDetails = ({ items }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const addToCart = async (e) => {
    const updatedData = {
      user: "6471c5f0814400a65fe0b97a",
      items: [
        {
          menuItem: "65092bf02bbbb845aa0f5675",
          quantity: "1",
        },
      ],
      resturant_id: "64ea232159572c6c8732d015",
    };

    await axios
      .post("http://localhost:3000/api/client/cart/addtocart", updatedData)
      .then((data) => {
        alert(data.data.message);
      })
      .catch((error) =>
        console.error("Error fetching restaurant data:", error)
      );
  };
  return (
    <div>
      {items.map((item) => (
        <div className="item-details">
          <div className="item-info">
            <div className="item-header">
              <h6>{item.name}</h6>
              <div className="item-rating">
                <p>{item.rating} stars</p>
                <p>({item.numRatings} ratings)</p>
              </div>
            </div>
            <p>
              &#x20B9;
              {item.price}
            </p>
            <p>{item.description}</p>
          </div>
          <div className="item-image">
            <img src={item.img_url} alt={item.name} />
            <button className="add-button" onClick={addToCart}>
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemDetails;
