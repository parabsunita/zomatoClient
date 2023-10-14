import React, { useState, useEffect } from "react";
import ItemDetails from "./ItemDetails";
import axios from "axios";
const ItemList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch restaurant items from Zomato's API
    // Replace this with your actual API fetching logic
    const fetchItems = async () => {
      await axios
        .get(
          "http://localhost:3000/api/restaurant/catalogue/getCatalogue/64ea232159572c6c8732d015"
        )
        .then((data) => {
          setCategories(data.data[0].categories);
          console.log(data);
        })
        .catch((error) =>
          console.error("Error fetching restaurant data:", error)
        );
    };
    fetchItems();
  }, []);

  return (
    <div className="item-list px-0">
      <h6>Recommended</h6>
      <ul className="px-0">
        {categories.map((category) => (
          <li key={category._id}>
            <ItemDetails items={category.items} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
