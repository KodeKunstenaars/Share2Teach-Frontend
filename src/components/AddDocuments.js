// AddDocument.js
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const AddDocument = () => {
  // Access jwtToken from context
  const { jwtToken } = useOutletContext();

  // State variables to hold user inputs
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [file, setFile] = useState(null);

  // State variables for handling responses and errors
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Define the list of subjects provided
  const subjects = [
    "Mathematics",
    "Business Studies",
    "History",
    "Geography",
    "Natural Science",
    "Life Science",
    "English",
    "Technology",
    "Afrikaans",
    "Life Skills",
    "Computer Science",
    "Other",
  ];

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !subject || !grade || !file) {
      setError("Please fill in all fields and select a file.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setUploading(true);

    try {
      // Step 1: Request a presigned URL from the backend
      const presignedResponse = await fetch("/upload-document/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`, // Use jwtToken from context
        },
      });

      if (!presignedResponse.ok) {
        const errorText = await presignedResponse.text();
        throw new Error(`Error ${presignedResponse.status}: ${errorText}`);
      }

      const presignedData = await presignedResponse.json();
      const { presigned_url, document_id } = presignedData;

      // Step 2: Upload the file to S3 using the presigned URL
      const formData = new FormData();
      formData.append("File", file, title); // "File" as key, file as value, title as filename

      const uploadResponse = await fetch(presigned_url, {
        method: "PUT",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Failed to upload file to S3: ${errorText}`);
      }

      // Step 3: Submit the metadata to the backend
      const metadataResponse = await fetch("/upload-document/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`, // Use jwtToken from context
        },
        body: JSON.stringify({
          document_id, // Backend expects this
          title,
          subject,
          grade,
        }),
      });

      if (!metadataResponse.ok) {
        const errorText = await metadataResponse.text();
        throw new Error(`Error ${metadataResponse.status}: ${errorText}`);
      }

      setSuccessMessage("Document uploaded and metadata saved successfully!");
      setTitle("");
      setSubject("");
      setGrade("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Document</h2>
      <hr />
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Document Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Subject Dropdown */}
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <select
            className="form-select"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a subject
            </option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Grade Input */}
        <div className="mb-3">
          <label htmlFor="grade" className="form-label">
            Grade
          </label>
          <input
            type="text"
            className="form-control"
            id="grade"
            placeholder="Enter grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>

        {/* File Input */}
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Select File
          </label>
          <input
            type="file"
            className="form-control"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
      </form>
    </div>
  );
};

export default AddDocument;
