import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
import Search from "./components/Search"; // Import the Search component

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  const navigate = useNavigate();

  const logOut = () => {
    setJwtToken("");
    navigate("/authenticate");
  };

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
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
