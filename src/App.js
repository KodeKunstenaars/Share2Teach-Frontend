import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
import Search from "./components/Search"; // Import the Search component
import './styles/SideNav.css'; // Import the CSS for SideNav

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

const renderLinks = (role, toggleNav) => {
  const allowedRoutes = rolePermissions[role || "public"];

  return allowedRoutes.map((route) => {
    let linkText =
      route === "/" ? "Home" : route.replace("-", " ").replace("/", "");
    return (
      <Link
        to={route}
        key={route}
        className="list-group-item list-group-item-action"
        onClick={toggleNav} // Close the side nav when a link is clicked
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
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage side nav
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const logOut = () => {
    setJwtToken("");
    navigate("/authenticate");
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
    // You will later implement this to fetch from the backend
  };

  return (
    <div className="container">
      <div className="row"></div>
      <header className="d-flex justify-content-between align-items-center"> {/* Header layout with flexbox */}
        <div> {/* Left section for hamburger and title */}
          {/* Hamburger icon */}
          <span className="hamburger" onClick={toggleNav}>
            &#9776; {/* Three lines for the hamburger menu */}
          </span>
          <h1 className="mt-3">Share2Teach</h1>
        </div>

        <div className="d-flex align-items-center"> {/* Right section for search and login */}
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
      </header>

      <hr className="mb-3" />

      {/* Side Navigation */}
      <div className={`sidenav ${isNavOpen ? 'open' : ''}`}>
        <a href="#" className="closebtn" onClick={toggleNav}>&times;</a>
        {renderLinks(jwtToken, toggleNav)}
      </div>

      <div className={`row ${isNavOpen ? 'shifted-content' : ''}`}>
        <div className="col-md-10 offset-md-2">
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
