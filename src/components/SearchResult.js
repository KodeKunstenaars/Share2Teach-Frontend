import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import ReportButton from "./ReportButton";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [ratings, setRatings] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [showButtons, setShowButtons] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title") || "";
  const subject = searchParams.get("subject") || "";
  const grade = searchParams.get("grade") || "";

  const { jwtToken } = useOutletContext();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const params = new URLSearchParams();
        if (title.trim() !== "") params.append("title", title.trim());
        if (subject.trim() !== "") params.append("subject", subject.trim());
        if (grade.trim() !== "") params.append("grade", grade.trim());

        const response = await fetch(`/search?${params.toString()}`, {
          cache: 'no-store',
        });

        if (response.status === 404) {
          setResults([]);
          return;
        }

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    fetchResults();
  }, [title, subject, grade]);


  const handleDownload = (docId) => {
    fetch(`/download-document/${docId}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        const downloadUrl = data.presigned_url;
        window.open(downloadUrl, '_blank');
      })
      .catch((err) => {
        console.error("Download error:", err.message);
      });
  };

  // Handle the report submission
  const handleReport = (documentId, reportReason) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${jwtToken}`);

    const body = JSON.stringify({
      reason: reportReason, // Only send the reason
    });

    fetch(`/report-document/${documentId}`, {
      method: 'POST',
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit report');
        }
        setSuccessMessage('Report submitted successfully!'); // Use setSuccessMessage
        setShowButtons(true);
      })
      .catch((error) => {
        console.error('Error submitting report:', error);
        setShowButtons(true);
      });

    setShowButtons(false); // Hide buttons while reporting
  };

  const handleRatingSubmit = async (docId, rating) => {
    try {
      const response = await fetch(`/rate-document/${docId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total_rating: rating }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      setSuccessMessage(`Rating for document ID ${docId} submitted successfully!`);
    } catch (error) {
      console.error("Error submitting rating:", error.message);
      alert(`Error submitting rating: ${error.message}`);
    }
  };

  const handleStarClick = (docId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [docId]: rating,
    }));
    handleRatingSubmit(docId, rating);
  };

  return (
    <div>
      <h2 className="subject-title">Search Results</h2>
      <hr />

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {results.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Subject</th>
              <th>Grade</th>
              <th>Actions</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={result.id || result._id || index}>
                <td>{result.title}</td>
                <td>{result.subject}</td>
                <td>{result.grade}</td>
                <td>
                  <ReportButton
                    documentId={result._id}
                    onReport={handleReport}
                    showButtons={showButtons}
                    setShowButtons={setShowButtons}  // Pass the setter function
                  />
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleDownload(result.id || result._id)}
                  >
                    Download
                  </button>
                </td>
                <td>
                  {/* Star Rating */}
                  <div className="rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${ratings[result.id || result._id] >= star ? "filled" : ""}`}
                        onClick={() => handleStarClick(result.id || result._id, star)}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
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