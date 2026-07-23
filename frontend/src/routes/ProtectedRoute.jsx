import { Navigate } from "react-router-dom";

function ProtectedRoute({
    children,
    allowedRoles,
    seminarType = null
}) {
    // Ambil data user dari storage (tanpa mengecek token lagi)
    const userString = localStorage.getItem("user") || sessionStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    // Jika data user tidak ada, kembalikan ke halaman Login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Ambil role user dan samakan ke huruf kecil
    const userRole = String(user.role).trim().toLowerCase();
    const rolesAllowed = allowedRoles.map((r) => r.trim().toLowerCase());

    // Cek apakah role user diizinkan mengakses halaman ini
    if (!rolesAllowed.includes(userRole)) {
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