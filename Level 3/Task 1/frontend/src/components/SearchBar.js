import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search users or skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search users or skills"
      />

      <span className="search-chip">Find anything</span>
    </div>
  );
}

export default SearchBar;