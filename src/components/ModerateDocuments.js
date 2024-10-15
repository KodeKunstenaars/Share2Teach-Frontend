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
    fetch(`/admin-search`, requestOptions)
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

  // Function to approve or deny a document
  const handleModeration = (docId, action) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${jwtToken}`);

    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        approvalStatus: action, // "approved" or "denied"
        comments: "", // Optional: add a field to capture comments from the UI if necessary
      }),
    };

    fetch(`/moderate-document/${docId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(() => {
        alert(`Document has been ${action}`);
        // Update the document's approvalStatus in the state
        setDocuments((prevDocs) =>
          prevDocs.map((doc) => {
            if (doc._id === docId) {
              console.log(`Updating document ${doc._id} status to ${action}`);
              return { ...doc, approvalStatus: action };
            }
            return doc;
          })
        );
      })
      .catch((err) => {
        console.error(`Error ${action} document:`, err);
        setError(err.message);
      });
  };

  // Function to determine badge class based on moderation status
  const getBadgeClass = (approvalStatus) => {
    switch (approvalStatus) {
      case "approved":
        return "badge bg-success";
      case "denied":
        return "badge bg-danger";
      default:
        return "badge bg-warning text-dark";
    }
  };

  // Function to determine moderation status text
  const getModerationStatusText = (approvalStatus) => {
    if (!approvalStatus || approvalStatus === "pending") {
      return "Pending";
    } else if (approvalStatus === "approved") {
      return "Approved";
    } else if (approvalStatus === "denied") {
      return "Denied";
    } else {
      return approvalStatus;
    }
  };

  // Function to determine moderation status class
  const getModerationStatusClass = (moderated) => {
    return moderated ? "badge-approved" : "badge-pending";
  };

    // Function to handle document download
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
                // The backend should return a presigned URL
                const downloadUrl = data.presigned_url;
                window.open(downloadUrl, '_blank');
            })
            .catch((err) => {
                console.error("Download error:", err.message);
            });
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
              {documents.map((doc) => {
                console.log(`Document ID: ${doc._id}, Approval Status: ${doc.approvalStatus}`);
                return (
                  <tr key={doc._id}>
                    <td>{doc.title}</td>
                    <td>{doc.subject}</td>
                    <td>{doc.grade}</td>
                    <td>
                      <span className={getBadgeClass(doc.approvalStatus)}>
                        {getModerationStatusText(doc.approvalStatus)}
                      </span>
                    </td>
                    <td>
                      {/* Conditionally render Approve and Deny buttons */}
                      {!doc.approvalStatus || doc.approvalStatus === "pending" ? (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleModeration(doc._id, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() => handleModeration(doc._id, "denied")}
                          >
                            Deny
                          </button>
                        </>
                      ) : null}
                      {/* Download button */}
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleDownload(doc.id || doc._id)}
                        >
                            Download
                        </button>
                    </td>
                  </tr>
                );
              })}
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
