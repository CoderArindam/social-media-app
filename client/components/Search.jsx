"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa"; // Import the cross icon

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === "") {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/search`,
          {
            params: { query },
            withCredentials: true,
          }
        );
        setResults(response.data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 300); // Debounce to reduce requests

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery(""); // Clear the input field
    setResults([]); // Clear the search results
    setShowDropdown(false); // Hide the dropdown
  };

  const showCrossIcon = query.trim() !== ""; // Show cross icon only if query is not empty

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search users"
        value={query}
        onChange={handleInputChange}
        className="p-2 border rounded w-full pr-10" // Added padding-right for the cross icon
      />
      {showCrossIcon && (
        <button
          onClick={clearSearch}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
        >
          <FaTimes />
        </button>
      )}
      {showDropdown && results.length > 0 && (
        <div className="absolute left-0 right-0 bottom-full mb-2 bg-white shadow-md border rounded max-h-60 overflow-auto">
          {results.map((user) => (
            <a
              href={`/profile/${user.username}`}
              key={user.id}
              className="block p-2 hover:bg-gray-100 flex items-center space-x-3"
            >
              <div className="flex flex-col">
                <span className="font-medium">{user.username}</span>
                <span className="text-gray-500 text-sm">{user.email}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
