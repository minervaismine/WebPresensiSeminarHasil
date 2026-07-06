import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Icon } from '@iconify/react';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Hapus data login dari localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Hapus data login dari sessionStorage
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        // Kembali ke halaman Login
        navigate("/");
    };

    return(
        <nav className="navbar">
            <h1>MONITORING SEMINAR</h1>

            <button className="logout-btn" onClick={handleLogout}>
                <Icon icon="majesticons:logout" className="logout-icon"/>
                <span>Logout</span>
            </button>
        </nav>
    );
}

export default Navbar;