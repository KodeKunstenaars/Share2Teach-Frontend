import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { query } = useParams(); // Get the search query from the URL
  const [results, setResults] = useState([]); // State to hold search results
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch results from backend when component mounts
  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Simulate a backend request, replace with real API call
        const response = await fetch(`/api/search?query=${query}`);
        const data = await response.json();
        setResults(data); // Set the fetched data to the results state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Error fetching search results");
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Search Results for: "{query}"</h2>
      <ul>
        {results.length > 0 ? (
          results.map((result) => (
            <li key={result.id}>{result.name}</li> // Customize as needed
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
