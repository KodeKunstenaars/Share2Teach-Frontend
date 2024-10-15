import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const ModerateDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Access jwtToken from context
  const { jwtToken } = useOutletContext();

  useEffect(() => {
    if (!jwtToken) {
      setError("Unauthorized: No JWT token provided.");
      setLoading(false);
      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${jwtToken}`);

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`http://localhost:8080/admin-search`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(`Error ${response.status}: ${text}`);
            });
          }
          return response.json();
        })
        .then((data) => {
          setDocuments(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching documents:", err);
          setError(err.message);
          setLoading(false);
        });
  }, [jwtToken]);

  // Function to determine moderation status text
  const getModerationStatusText = (moderated) => {
    return moderated ? "Approved" : "Pending";
  };

  // Function to determine moderation status class
  const getModerationStatusClass = (moderated) => {
    return moderated ? "badge-approved" : "badge-pending";
  };

  return (
      <div className="section fade-in">
        <h2 className="subject-title">Moderate Documents</h2>
        <hr />
        {loading ? (
            <p>Loading documents...</p>
        ) : error ? (
            <p className="text-danger">Error: {error}</p>
        ) : documents.length > 0 ? (
            <div className="document-container">
              {documents.map((doc) => (
                  <div key={doc._id} className="document-card">
                    <h5>{doc.title}</h5>
                    <p><strong>Subject:</strong> {doc.subject}</p>
                    <p><strong>Grade:</strong> {doc.grade}</p>
                    {/* Moderation Status - displayed below the grade */}
                    <p className={`badge ${getModerationStatusClass(doc.moderated)}`}>
                      {getModerationStatusText(doc.moderated)}
                    </p>
                    <div className={`document-actions ${doc.moderated ? 'only-download' : ''}`}>
                      {/* Conditionally render Approve/Deny buttons only if not moderated */}
                      {!doc.moderated && (
                          <>
                            <button className="btn btn-sm btn-approve me-2">
                              Approve
                            </button>
                            <button className="btn btn-sm btn-deny me-2">
                              Deny
                            </button>
                          </>
                      )}
                      {/* Always show Download button */}
                      <button className="btn btn-sm btn-outline-primary">
                        Download
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        ) : (
            <p>No documents to moderate.</p>
        )}
      </div>
  );
};

export default ModerateDocuments;