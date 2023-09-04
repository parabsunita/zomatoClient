import React from "react";
import Header from "./components/Header";
import RestaurantList from "./components/RestaurantList";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SearchBar from "./components/SearchBar";
import RestaurantDetails from "./components/RestaurantDetails";

const App = () => {
  return (
    <div>
      {/* <Header /> */}

      <div className="container mt-4">
        <Router>
          <Routes>
            <Route path="/" exact element={<RestaurantList />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          </Routes>
        </Router>
        {/* Add more routes for other pages */}
      </div>
    </div>
  );
};

export default App;
