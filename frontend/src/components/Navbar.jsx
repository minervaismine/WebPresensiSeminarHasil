import "./Navbar.css";
import { Icon } from '@iconify/react';

function Navbar() {
    return(
        <nav className="navbar">
            <h1>MONITORING SEMINAR</h1>

            <button className="logout-btn">
                <Icon icon="majesticons:logout" className="logout-icon"/>
                <span>Logout</span>
            </button>
        </nav>
    );
}

export default Navbar;