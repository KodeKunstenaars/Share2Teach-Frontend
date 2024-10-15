import React, { useState } from "react";

const Password = () => {
    const [email, setEmail] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRequestReset = async () => {
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const response = await fetch("/request-reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            setSuccessMessage("Reset request successful. Check your email for the confirmation code.");
        } catch (err) {
            console.error(err);
            setError(err.message || "An error occurred during the reset request.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmReset = async () => {
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const response = await fetch("/confirm-reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    token: confirmationCode,
                    password: newPassword,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            setSuccessMessage("Password reset successful. You can now log in with your new password.");
            setEmail("");
            setConfirmationCode("");
            setNewPassword("");
        } catch (err) {
            console.error(err);
            setError(err.message || "An error occurred while resetting the password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="subject-title">Password Reset</h2>
            <hr/>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={handleRequestReset}
                disabled={loading}
            >
                {loading ? "Requesting..." : "Request Password Reset"}
            </button>

            <hr />

            <div className="mb-3">
                <label htmlFor="confirmationCode" className="form-label">Confirmation Code</label>
                <input
                    type="text"
                    className="form-control"
                    id="confirmationCode"
                    placeholder="Enter the code sent to your email"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>

            <button
                className="btn btn-success"
                onClick={handleConfirmReset}
                disabled={loading}
            >
                {loading ? "Confirming..." : "Confirm Password Reset"}
            </button>
        </div>
    );
};

export default Password;