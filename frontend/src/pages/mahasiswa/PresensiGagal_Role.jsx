import "../../styles/mahasiswa/PresensiGagal_Role.css";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";

function PresensiGagal_Role() {
    const navigate = useNavigate();
    const location = useLocation();

    const code = location.state?.code;

    let message = "";

    switch (code) {
        case 'PENYELENGGARA':
            message = "Penyelenggara seminar tidak dapat melakukan presensi"
            break;

        case 'INVALID_ROLE' :
            message = "Hanya mahasiswa yang dapat melakukan presensi";
            break;
        case 'SERVER_ERROR' :
            message = "Tidak dapat terhubung ke server";
            break;
        default:
            message = "Presensi tidak dapat dilakukan";
        }

    return (
        <div className="page-presensi-gagal-role-layout">
            {/* Navbar */}
            <nav className="navbar-presensi-gagal-role">
                <button className="back-btn-presensi-gagal-role" onClick={()=>navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-btn-presensi-gagal-role-icon"/>
                    <span>Kembali</span>
                </button>

                <h1>PRESENSI</h1>
            </nav>

            {/* Content */}
            <div className="presensi-gagal-role-container">
                <Icon icon="healthicons:no-24px" className="fail-icon"/>

                <div className="presensi-gagal-role-content">
                    <h1>Presensi Gagal</h1>
                    <p>{message}</p>
                </div>

                <button className="kembali-ke-dashboard-btn" onClick={() => navigate("/dashboard-mahasiswa")}>Kembali Ke Halaman Utama</button>
            </div>
        </div>
    );
}

export default PresensiGagal_Role;