import { useState } from "react";
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
    setJwtToken("");
    navigate("/authenticate");
  };

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
