import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/Search.css';

const Search = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); // Hook to navigate to another route
  const location = useLocation();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (search.trim() !== "") {
      onSearch(search); // Optionally, call the parent search function
      navigate(`/search/${search}`); // Redirect to the search results page
      setIsSearchOpen(false);
      setSearch("");
    }
  };

  useEffect(() => {
    setIsSearchOpen(false);
    setSearch("");
  }, [location]);

  return (
    <div className="search-bar">
      {!isSearchOpen ? (
        <button
          className="btn btn-icon"
          onClick={() => setIsSearchOpen(true)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <i className="fas fa-search search-icon"></i> {/* .search-icon */}
        </button>
      ) : (
        <form onSubmit={handleSearchSubmit} className="d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit" className="btn btn-primary ms-2">
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default Search;
