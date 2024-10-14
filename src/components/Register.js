import { useState } from "react";
import Input from "./form/Input";
import { useNavigate} from "react-router-dom"; // Import Link for navigation

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

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
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    // Handle error (e.g., display an alert)
                    console.error(data.message);
                } else {
                    // Redirect to login or another page after successful registration
                    navigate("/login");
                }
            })
            .catch(error => {
                // Handle fetch error
                console.error("Registration error:", error);
            });
    };

    return (
        <div className="col-md-6 offset-md-3">
            <h2>Register</h2>
            <hr />

            <form onSubmit={handleSubmit}>
                <Input
                    title="First Name"
                    type="text"
                    className="form-control"
                    name="first_name"
                    onChange={(event) => setFirstName(event.target.value)}
                />

                <Input
                    title="Last Name"
                    type="text"
                    className="form-control"
                    name="last_name"
                    onChange={(event) => setLastName(event.target.value)}
                />

                <Input
                    title="Email Address"
                    type="email"
                    className="form-control"
                    name="email"
                    autoComplete="email-new"
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Input
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <hr />
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                />
            </form>
        </div>
    );
}

export default Register;