import { Navigate } from "react-router-dom";

function ProtectedRoute({
    children,
    allowedRoles,
    seminarType = null
}) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const userString = localStorage.getItem("user") || sessionStorage.getItem("user");

    const user = userString ? JSON.parse(userString) : null;

    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    if (user.role === "mahasiswa") {

        // Hanya mahasiswa yang memiliki seminar
        if (
            seminarType === "penyelenggara" &&
            !user.memiliki_seminar
        ) {
            return <Navigate to="/dashboard-mahasiswa" replace />;
        }

        // Hanya mahasiswa yang tidak memiliki seminar
        if (
            seminarType === "peserta" &&
            user.memiliki_seminar
        ) {
            return <Navigate to="/dashboard-mahasiswa" replace />;
        }
    }

    return children;
}

export default ProtectedRoute;