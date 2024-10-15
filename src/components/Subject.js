import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Subject = () => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);

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
                const downloadUrl = data.presigned_url;
                window.open(downloadUrl, '_blank'); // Open the download in a new tab
            })
            .catch((err) => {
                console.error("Download error:", err.message);
            });
    };

    // Function to handle star click and submit rating
    const handleStarClick = (docId, rating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [docId]: rating,
        }));
        handleRatingSubmit(docId, rating);
    };

    // Function to submit the rating
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
            <h2 className="subject-title">{title}</h2>
            <hr />
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            {documents.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Document Title</th>
                        <th>Grade</th>
                        <th>Actions</th>
                        <th>Rating</th>
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
                            <td>
                                {/* Star Rating */}
                                <div className="rating">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${
                                                ratings[doc.id || doc._id] >= star ? "filled" : ""
                                            }`}
                                            onClick={() => handleStarClick(doc.id || doc._id, star)}
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
                <p>No documents found.</p>
            )}
        </div>
    );
};

export default Subject;