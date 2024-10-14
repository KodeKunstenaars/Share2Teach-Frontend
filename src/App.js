import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
import Search from "./components/Search"; // Import the Search component

const rolePermissions = {
  public: ["/", "/subjects", "/faq"],
  admin: ["/", "/subjects", "/faq", "/upload-document", "/moderate-document"],
  moderator: [
    "/",
    "/subjects",
    "/faq",
    "/upload-document",
    "/moderate-document",
  ],
  educator: ["/", "/subjects", "/faq", "/upload-document"],
};

const renderLinks = (role) => {
  const allowedRoutes = rolePermissions[role || "public"];

  return allowedRoutes.map((route) => {
    let linkText =
      route === "/" ? "Home" : route.replace("-", " ").replace("/", "");
    return (
      <Link
        to={route}
        key={route}
        className="list-group-item list-group-item-action"
      >
        {linkText.charAt(0).toUpperCase() + linkText.slice(1)}
      </Link>
    );
  });
};

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
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
                toggleRefresh(false);
            });

        navigate("/login");
    };

    const toggleRefresh = useCallback(
        (status) => {
            console.log("Clicked");

            if (status) {
                console.log("Turning on ticking");
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
                            }
                        })
                        .catch((error) => {
                            console.log("User is not logged in");
                        });
                }, 600000);
                setTickInterval(i);
                console.log("Setting tick interval to", i);
            } else {
                console.log("Turning off ticking");
                console.log("Turning off tickInterval", tickInterval);
                setTickInterval(null);
                clearInterval(tickInterval);
            }
        },
        [tickInterval]
    );

    useEffect(() => {
        if (jwtToken === "") {
            const requestOptions = {
                method: "GET",
                credentials: "include",
            };

            fetch(`/refresh`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.access_token) {
                        setJwtToken(data.access_token);
                        toggleRefresh(true);
                    }
                })
                .catch((error) => {
                    console.log("User is not logged in", error);
                });
        }
    }, [jwtToken, toggleRefresh]);

    // Decode the JWT token and extract the role from the payload
    useEffect(() => {
        if (jwtToken !== "") {
            try {
                // Split the JWT token to get the payload (the second part)
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

                // Extract the role from the decoded payload and set it to userRole
                setUserRole(decodedPayload.role || "");
                console.log("Decoded role from token:", decodedPayload.role);
            } catch (error) {
                console.error("Error decoding JWT token:", error);
            }
        }
    }, [jwtToken]);

  // Handle search function that will later connect to the backend
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // You will later implement this to fetch from the backend
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Share2Teach</h1>
        </div>
        <div className="col d-flex justify-content-end align-items-center">
          {/* Include Search component next to the login/logout button */}
          <Search onSearch={handleSearch} />
          {jwtToken === "" ? (
            <Link to="/authenticate">
              <span className="badge bg-success ms-2">Login</span>{" "}
              {/* Added margin to separate the buttons */}
            </Link>
          ) : (
            <a href="#!" onClick={logOut} className="ms-2">
              {" "}
              {/* Added margin to separate the buttons */}
              <span className="badge bg-danger">Logout</span>
            </a>
          )}
        </div>
        <hr className="mb-3" />
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">{renderLinks(jwtToken)}</div>
          </nav>
        </div>
        <div className="col-md-10">
          <Alert message={alertMessage} className={alertClassName} />
          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertClassName,
              setAlertMessage,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;