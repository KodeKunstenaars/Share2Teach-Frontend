// src/components/ProtectedRoute.js
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const navigate = useNavigate();
    const { jwtToken, userRole } = useOutletContext(); // Get jwtToken and userRole from context

    useEffect(() => {
        // Redirect to login if no JWT token or if the role is not allowed
        if (!jwtToken || !allowedRoles.includes(userRole)) {
            navigate("/login");
        }
    }, [jwtToken, userRole, allowedRoles, navigate]);

    // If the user has the correct role and is authenticated, render the child components
    return jwtToken && allowedRoles.includes(userRole) ? children : null;
};

export default ProtectedRoute;