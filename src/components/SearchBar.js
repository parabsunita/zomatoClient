import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMicrophone } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Call the onSearch function with the search query
    onSearch(searchQuery);
  };

  return (
    <div className="container">
      <div className="search-bar mt-2">
        <input
          type="text"
          placeholder="Search for restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 rounded search-input w-100"
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon text-danger" />
        <FontAwesomeIcon
          icon={faMicrophone}
          className="microphone-icon text-danger"
          onClick={handleSearch}
        />
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>
    </div>
  );
};

export default SearchBar;
