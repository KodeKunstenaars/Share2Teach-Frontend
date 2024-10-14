import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
import Search from "./components/Search"; // Import the Search component

function App() {
    // Initialize jwtToken and userRole from localStorage
    const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken") || "");
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClassName, setAlertClassName] = useState("d-none");
    const [tickInterval, setTickInterval] = useState();
    const navigate = useNavigate();

    const logOut = () => {
        const requestOptions = {
            method: "GET",
            credentials: "include",
        };

        fetch(`/logout`, requestOptions)
            .catch((error) => {
                console.log("Error logging out", error);
            })
            .finally(() => {
                setJwtToken("");
                setUserRole("");
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("userRole");
                toggleRefresh(false);
                navigate("/login");
            });
    };

    const toggleRefresh = useCallback(
        (status) => {
            if (status) {
                let i = setInterval(() => {
                    const requestOptions = {
                        method: "GET",
                        credentials: "include",
                    };

                    fetch(`/refresh`, requestOptions)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.access_token) {
                                setJwtToken(data.access_token);
                                localStorage.setItem("jwtToken", data.access_token); // Store in localStorage
                            }
                        })
                        .catch((error) => {
                            console.log("User is not logged in");
                        });
                }, 600000);
                setTickInterval(i);
            } else {
                clearInterval(tickInterval);
                setTickInterval(null);
            }
        },
        [tickInterval]
    );

    // Load jwtToken from localStorage when component mounts
    useEffect(() => {
        const storedToken = localStorage.getItem("jwtToken");
        if (storedToken && jwtToken === "") {
            setJwtToken(storedToken);
            toggleRefresh(true);
        }
    }, [jwtToken, toggleRefresh]);

    // Decode JWT token to extract the role
    useEffect(() => {
        if (jwtToken !== "") {
            try {
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
                const role = decodedPayload.role || "";
                setUserRole(role);
                localStorage.setItem("userRole", role); // Store the role in localStorage
            } catch (error) {
                console.error("Error decoding JWT token:", error);
            }
        }
    }, [jwtToken]);

    // Handle search function that connects to the backend
    const handleSearch = (title, subject, grade) => {
        const params = new URLSearchParams();
        if (title.trim() !== "") {
            params.append("title", title.trim());
        }
        if (subject.trim() !== "") {
            params.append("subject", subject.trim());
        }
        if (grade.trim() !== "") {
            params.append("grade", grade.trim());
        }

        navigate(`/search?${params.toString()}`);
    };

    return (
        <div className="container">
            {/* Header Section */}
            <div className="row">
                <div className="col">
                    <h1 className="mt-3">Share2Teach</h1>
                </div>
                <div className="col d-flex justify-content-end align-items-center">
                    {/* Login/Logout button */}
                    {jwtToken === "" ? (
                        <>
                            <Link to="/login">
                                <span className="badge bg-success ms-2">Login</span>
                            </Link>
                            <Link to="/register-user">
                                <span className="badge bg-primary ms-2">Register</span>
                            </Link>
                        </>
                    ) : (
                        <a href="#!" onClick={logOut} className="ms-2">
                            <span className="badge bg-danger">Logout</span>
                        </a>
                    )}
                </div>
                <hr className="mb-3" />
            </div>

            {/* Main Content Section */}
            <div className="row">
                <div className="col-md-2">
                    <nav>
                        <div className="list-group">
                            {/* Always Visible Links */}
                            <Link to="/" className="list-group-item list-group-item-action">Home</Link>
                            <Link to="/subjects" className="list-group-item list-group-item-action">Subjects</Link>
                            <Link to="/faq" className="list-group-item list-group-item-action">FAQ</Link>

                            {/* Links for Educators, Admins, and Moderators */}
                            {jwtToken !== "" && (userRole === "educator" || userRole === "admin" || userRole === "moderator") && (
                                <Link to="/upload-document" className="list-group-item list-group-item-action">Upload Document</Link>
                            )}
                            {/* Links for Admins and Moderators */}
                            {jwtToken !== "" && (userRole === "admin" || userRole === "moderator") && (
                                <Link to="/moderate-document" className="list-group-item list-group-item-action">Moderate Document</Link>
                            )}
                            {/* Links for Admins */}
                            {jwtToken !== "" && userRole === "admin" && (
                                <Link to="/create-user" className="list-group-item list-group-item-action">Create User</Link>
                            )}
                        </div>
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="col-md-10">
                    <Alert message={alertMessage} className={alertClassName} />
                    <Outlet
                        context={{
                            jwtToken,
                            setJwtToken,
                            userRole,
                            setUserRole,
                            setAlertClassName,
                            setAlertMessage,
                            toggleRefresh,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
