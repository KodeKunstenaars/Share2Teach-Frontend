import React, { useState } from "react";

const CreateUser = () => {
    // State variables to hold user inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); 
    const [qualification, setQualification] = useState("");

    // State variables for handling responses and errors
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

   
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!firstName || !lastName || !email || !password || !role || !qualification) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");
        setSuccessMessage("");
        setCreating(true);

        try {
            // Make API request to create a new user
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                    role,
                    qualification,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            setSuccessMessage("User created successfully!");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setRole("");
            setQualification("");
        } catch (err) {
            console.error(err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="subject-title">Create User</h2>
            <hr />
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                {/* First Name Input */}
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                {/* Last Name Input */}
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>

                {/* Email Input */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Role Dropdown */}
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        className="form-select"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >   
                        <option value= ""></option>
                        <option value="admin">Admin</option>
                        <option value="educator">Educator</option>
                        <option value="moderator">Moderator</option>
                    </select>
                </div>

                {/* Qualification Input */}
                <div className="mb-3">
                    <label htmlFor="qualification" className="form-label">Qualification</label>
                    <input
                        type="text"
                        className="form-control"
                        id="qualification"
                        placeholder="Enter qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary" disabled={creating}>
                    {creating ? "Creating..." : "Create User"}
                </button>
            </form>
        </div>
    );
};

export default CreateUser;