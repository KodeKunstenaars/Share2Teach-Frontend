import {useCallback, useEffect, useState} from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
import Search from "./components/Search"; // Import the Search component

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }

    fetch(`/logout`, requestOptions)
        .catch(error => {
          console.log("error logging out", error);
        })
        .finally(() => {
          setJwtToken("");
          toggleRefresh(false);
        })

    navigate("/authenticate");
  }

  const toggleRefresh = useCallback((status) => {
    console.log("clicked");

    if (status) {
      console.log("turning on ticking");
      let i  = setInterval(() => {

        const requestOptions = {
          method: "GET",
          credentials: "include",
        }

        fetch(`/refresh`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setJwtToken(data.access_token);
              }
            })
            .catch(error => {
              console.log("user is not logged in");
            })
      }, 600000);
      setTickInterval(i);
      console.log("setting tick interval to", i);
    } else {
      console.log("turning off ticking");
      console.log("turning off tickInterval", tickInterval);
      setTickInterval(null);
      clearInterval(tickInterval);
    }
  }, [tickInterval])

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      }

      fetch(`/refresh`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.access_token) {
              setJwtToken(data.access_token);
              toggleRefresh(true);
            }
          })
          .catch(error => {
            console.log("user is not logged in", error);
          })
    }
  }, [jwtToken, toggleRefresh])
  // Handle search function that will later connect to the backend
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // You will later implement this to fetch from the backend
  };

  return (
      <div className="container">
        {/* Header Section */}
        <div className="row">
          <div className="col">
            <h1 className="mt-3">Share2Teach</h1>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            {/* Include Search component next to the login/logout button */}
            <Search onSearch={handleSearch} />
            {jwtToken === "" ? (
                <Link to="/authenticate">
                  <span className="badge bg-success ms-2">Login</span>
                </Link>
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
          {/* Sidebar Navigation */}
          <div className="col-md-2">
            <nav>
              <div className="list-group">
                {/* Always Visible Links */}
                <Link to="/" className="list-group-item list-group-item-action">
                  Home
                </Link>
                <Link
                    to="/subjects"
                    className="list-group-item list-group-item-action"
                >
                  Subjects
                </Link>
                <Link to="/faq" className="list-group-item list-group-item-action">
                  FAQ
                </Link>

                {/* Links for Educators, Admins, and Moderators */}
                {(jwtToken === "educator" ||
                    jwtToken === "admin" ||
                    jwtToken === "moderator") && (
                    <Link
                        to="/upload-document"
                        className="list-group-item list-group-item-action"
                    >
                      Upload Document
                    </Link>
                )}

                {/* Links for Admins and Moderators */}
                {(jwtToken === "admin" || jwtToken === "moderator") && (
                    <Link
                        to="/moderate-document"
                        className="list-group-item list-group-item-action"
                    >
                      Moderate Document
                    </Link>
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
