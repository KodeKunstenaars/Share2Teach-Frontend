import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]); // State to hold search results
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Extract query parameters from the URL
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title") || "";
  const subject = searchParams.get("subject") || "";
  const grade = searchParams.get("grade") || "";

  // Fetch results from backend when component mounts
  useEffect(() => {
    const fetchResults = async () => {
      try {
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

        // Use the full backend URL
        const response = await fetch(`/search?${params.toString()}`, {
          cache: 'no-store',
        });

        if (response.status === 404) {
          setResults([]);
          setLoading(false);
          return;
        }
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Data received from backend:", data);
        setResults(data); // Set the fetched data to the results state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Error fetching search results");
        setLoading(false);
      }
    };

    fetchResults();
  }, [title, subject, grade]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Search Results</h2>
      <hr />
      {results.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Subject</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={result.id || result._id || index}>
                <td>{result.title}</td>
                <td>{result.subject}</td>
                <td>{result.grade}</td>
                <td>
                  {/* Report button */}
                  <button className="btn btn-sm btn-outline-danger me-2">
                    Report
                  </button>
                  {/* Download button */}
                  <button className="btn btn-sm btn-outline-primary">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found for your search criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;
