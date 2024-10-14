import {useState} from "react";
import Input from "./form/Input";
import {Link, useNavigate, useOutletContext} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setJwtToken} = useOutletContext();
    const {setAlertClassName} = useOutletContext();
    const {setAlertMessage} = useOutletContext();
    const {toggleRefresh} = useOutletContext();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // build the request payload
        let payload = {
            email: email,
            password: password,
        };

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        };

        fetch(`/authenticate`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setAlertClassName("alert-danger");
                    setAlertMessage(data.message);
                } else {
                    const jwtToken = data.access_token;
                    setJwtToken(jwtToken); // Store the JWT token in state

                    // Store the JWT token in localStorage
                    localStorage.setItem("jwtToken", jwtToken);

                    // Decode the JWT token to extract the role
                    const base64Url = jwtToken.split(".")[1];
                    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                    const jsonPayload = decodeURIComponent(
                        atob(base64)
                            .split("")
                            .map(function (c) {
                                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                            })
                            .join("")
                    );
                    const decodedPayload = JSON.parse(jsonPayload);

                    // Store the user role in localStorage
                    const userRole = decodedPayload.role || "";
                    localStorage.setItem("userRole", userRole);

                    // Clear any error messages and navigate to the homepage
                    setAlertClassName("d-none");
                    setAlertMessage("");
                    toggleRefresh(true); // Start token refreshing
                    navigate("/"); // Redirect to home
                }
            })
            .catch(error => {
                setAlertClassName("alert-danger");
                setAlertMessage("Login failed. Please try again.");
            });
    };

    return (
        <div className="col-md-6 offset-md-3">
            <h2>Login</h2>
            <hr/>

            <form onSubmit={handleSubmit}>
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

                <hr/>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
                <Link to="/reset-password">
                    <span type="submit"
                          className="btn btn-primary">
                        Reset Password
                    </span>
                </Link>
            </form>
        </div>
    );
};

export default Login;