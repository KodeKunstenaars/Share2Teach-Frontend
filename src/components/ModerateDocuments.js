// ModerateDocuments.js
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

    // Use the full backend URL
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
  }, [jwtToken]); // Dependency array includes jwtToken
 

  // Function to determine badge class based on moderation status
  const getBadgeClass = (moderated) => {
    return moderated
      ? "badge bg-success"
      : "badge bg-warning text-dark";
  };

  // Function to determine moderation status text
  const getModerationStatusText = (moderated) => {
    return moderated ? "Approved" : "Pending";
  };

  return (
    <div>
      <h2>Moderate Documents</h2>
      <hr />
      {loading ? (
        <p>Loading documents...</p>
      ) : error ? (
        <p className="text-danger">Error: {error}</p>
      ) : documents.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Document Title</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Moderation Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.title}</td>
                  <td>{doc.subject}</td>
                  <td>{doc.grade}</td>
                  <td>
                    <span className={getBadgeClass(doc.moderated)}>
                      {getModerationStatusText(doc.moderated)}
                    </span>
                  </td>
                  <td>
                    {/* Approve button */}
                    <button
                      className="btn btn-sm btn-success me-2"
                      disabled={doc.moderated} // Optional: Disable if already approved
                    >
                      Approve
                    </button>
                    {/* Deny button */}
                    <button
                      className="btn btn-sm btn-danger me-2"
                      disabled={doc.moderated} // Optional: Disable if already approved
                    >
                      Deny
                    </button>
                    {/* Download button */}
                    <button
                      className="btn btn-sm btn-outline-primary"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No documents to moderate.</p>
      )}
    </div>
  );
};

export default ModerateDocuments;
