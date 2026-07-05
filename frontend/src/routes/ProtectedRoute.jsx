import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return <Navigate to="/" replace />;
        }

        // cek role
        if (!allowedRoles.includes(user.role)) {
            return <Navigate to="/" replace />;
        }

    } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;