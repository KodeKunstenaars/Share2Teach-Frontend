import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// This component will display all documents under the specified subject category
const Subject = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Gets subject title from URL
  let { title } = useParams();

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`/search?subject=${encodeURIComponent(title)}`, requestOptions)
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
        console.log(err);
        setError(err.message);
        setLoading(false);
      });
  }, [title]); // Include 'title' in the dependency array to address the warning

  if (loading) {
    return (
      <div>
        <h2>{title}</h2>
        <hr />
        <p>Loading documents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>{title}</h2>
        <hr />
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{title}</h2>
      <hr />
      {documents.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={doc.id || doc._id || index}>
                <td>{doc.title}</td>
                <td>{doc.grade}</td>
                <td>
                  {/* Report button without functionality */}
                  <button className="btn btn-sm btn-outline-danger me-2">
                    Report
                  </button>
                  <button className="btn btn-sm btn-outline-primary">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No documents found.</p>
      )}
    </div>
  );
};

export default Subject;
