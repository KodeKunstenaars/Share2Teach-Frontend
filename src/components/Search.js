import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Search = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Use useEffect to reset the search form when the location changes
  useEffect(() => {
    setIsSearchOpen(false);
    setTitle("");
    setSubject("");
    setGrade("");
  }, [location]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Build the query parameters based on user input
    const params = new URLSearchParams();
    if (title.trim() !== "") {
      params.append("title", title.trim());
    }
    if (subject.trim() !== "") {
      params.append("subject", subject.trim());
    }
    if (grade.trim() !== "") {
      params.append("grade", grade.trim());
    }

    // Navigate to the search results page with query parameters
    navigate(`/search?${params.toString()}`);
    // Form will reset due to useEffect when the location changes
  };

  return (
    <div className="search-bar">
      {!isSearchOpen ? (
        <button
          className="btn btn-icon"
          onClick={() => setIsSearchOpen(true)}
          style={{
            background: "black",
            border: "none",
            cursor: "pointer",
            padding: "10px",
            transition: "all 0.3s ease",
            fontSize: "1.5rem", // This can be adjusted based on the size of your icon
          }}
        >
          <i className="fas fa-search" style={{ fontSize: "1.5rem" }}></i>
        </button>
      ) : (
        <form onSubmit={handleSearchSubmit} className="d-flex flex-column">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Grade"
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default Search;
