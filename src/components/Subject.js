import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

        // Use the correct backend URL
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
    }, [title]);

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
                window.open(downloadUrl, '_blank'); // Open the download in a new tab
            })
            .catch((err) => {
                console.error("Download error:", err.message);
            });
    };

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
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents.map((doc, index) => (
                        <tr key={doc.id || doc._id || index}>
                            <td>{doc.title}</td>
                            <td>{doc.grade}</td>
                            <td>
                                <button className="btn btn-sm btn-outline-danger me-2">
                                    Report
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleDownload(doc.id || doc._id)}
                                >
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