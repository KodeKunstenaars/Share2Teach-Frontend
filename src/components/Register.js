import { useState } from "react";
import Input from "./form/Input";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setCreating(true);
        setError("");
        setSuccessMessage("");

        let payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            role: "educator"
        };

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        };

        fetch(`/register`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                // If the response has no content, assume it's successful
                return response.text().then((text) => (text ? JSON.parse(text) : null));
            })
            .then((data) => {
                if (data && data.error) {
                    setError(data.message || "Registration failed.");
                } else {
                    setSuccessMessage("User registered successfully!");
                    // Optionally redirect to login after a few seconds
                    setTimeout(() => navigate("/login"), 3000);
                }
            })
            .catch(error => {
                setError("Registration error: " + error.message);
            })
            .finally(() => {
                setCreating(false);
            });
    };

    return (
        <div className="col-md-6 offset-md-3">
            <h2>Register</h2>
            <hr />

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <Input
                    title="First Name"
                    type="text"
                    className="form-control"
                    name="first_name"
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                />

                <Input
                    title="Last Name"
                    type="text"
                    className="form-control"
                    name="last_name"
                    onChange={(event) => setLastName(event.target.value)}
                    required
                />

                <Input
                    title="Email Address"
                    type="email"
                    className="form-control"
                    name="email"
                    autoComplete="email-new"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <Input
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <hr />
                <input
                    type="submit"
                    className="btn btn-primary"
                    value={creating ? "Registering..." : "Register"}
                    disabled={creating}
                />
            </form>
        </div>
    );
}

export default Register;