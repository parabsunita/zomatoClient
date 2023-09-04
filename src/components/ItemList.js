import React, { useState, useEffect } from "react";
import ItemDetails from "./ItemDetails";
const ItemList = () => {
  //   const [items, setItems] = useState([]);

  //   useEffect(() => {
  //     // Fetch restaurant items from Zomato's API
  //     // Replace this with your actual API fetching logic
  //     const fetchItems = async () => {
  //       try {
  //         const response = await fetch("API_ENDPOINT_HERE");
  //         const data = await response.json();
  //         setItems(data);
  //       } catch (error) {
  //         console.error("Error fetching items:", error);
  //       }
  //     };

  //     fetchItems();
  //   }, []);
  const items = [
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Classic tomato, mozzarella, and basil pizza",
      price: "$12.99",
    },
    {
      id: 2,
      name: "Chicken Alfredo",
      description: "Creamy pasta with grilled chicken",
      price: "$15.49",
    },
    {
      id: 3,
      name: "Burger Deluxe",
      description: "Juicy beef patty with lettuce, cheese, and bacon",
      price: "$10.99",
    },
    {
      id: 4,
      name: "Vegetable Stir-Fry",
      description: "Assorted vegetables in a savory sauce",
      price: "$9.99",
    },
  ];

  return (
    <div className="item-list px-0">
      <h6>Recommended</h6>
      <ul className="pl-0">
        {items.map((item) => (
          <li key={item.id}>
            <ItemDetails item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
