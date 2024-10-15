import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const navigate = useNavigate();
    const { jwtToken, userRole } = useOutletContext();

    useEffect(() => {
        if (!jwtToken || !allowedRoles.includes(userRole)) {
            navigate("/login");
        }
    }, [jwtToken, userRole, allowedRoles, navigate]);

    return jwtToken && allowedRoles.includes(userRole) ? children : null;
};

export default ProtectedRoute;