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
            <div className="nama-navbar">
                <span>MONITORING</span>
                <span>SEMINAR</span>
            </div>
            
            <button className="logout-btn" onClick={handleLogout}>
                <Icon icon="majesticons:logout" className="logout-icon"/>
                <span className="logout-text">Logout</span>
            </button>
        </nav>
    );
}

export default Navbar;