import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; // import for routing links and outlet for nested routes

// Define role-based permissions
const rolePermissions = {
  public: ["/", "/subjects", "/faq"], // Accessible to anyone
  admin: ["/", "/subjects", "/faq", "/upload-document", "/moderate-document"], // Admin routes
  moderator: ["/", "/subjects", "/faq", "/upload-document", "/moderate-document"], // Moderator routes
  educator: ["/", "/subjects", "/faq", "/upload-document"], // Educator routes
};

// Function to render the links based on role
const renderLinks = (role) => {
  // Default to public if no role is provided
  const allowedRoutes = rolePermissions[role || "public"];

  // Generate <Link> components for each allowed route
  return allowedRoutes.map((route) => {
    // Special handling for the root ("/") route to label it as "Home"
    let linkText = route === "/" ? "Home" : route.replace("-", " ").replace("/", "");
    return (
      <Link to={route} key={route} className="list-group-item list-group-item-action">
        {linkText.charAt(0).toUpperCase() + linkText.slice(1)}
      </Link>
    );
  });
};

function App() {
  // For demonstration, "admin" is set as the default jwtToken value. This would come from user authentication in a real app.
  const [jwtToken, setJwtToken] = useState("");

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Share2Teach</h1>
        </div>
        <div className="col text-end">
          {/* Login/Logout button */}
          {jwtToken === "" 
          ? <Link to="/authenticate"><span className="badge bg-success">Login</span></Link> 
          : <a href="#!" onClick={() => setJwtToken("")}><span className='badge bg-danger'>Logout</span></a>
          }
        </div>
        <hr className="mb-3" />
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              {/* Render links based on the jwtToken value */}
              {renderLinks(jwtToken)}
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
