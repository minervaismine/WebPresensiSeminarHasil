import "../../styles/mahasiswa/PresensiGagal.css";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";

function PresensiGagal() {
    const navigate = useNavigate();
    const location = useLocation();

    const code = location.state?.code;

    let message = "";

    switch (code) {
        case "QR_NOT_FOUND":
            message = "QR Code tidak ditemukan";
            break;

        case "QR_NOT_ACTIVE":
            message = "QR Code belum diaktifkan";
            break;
        case "QR_EXPIRED":
            message = "QR Code sudah kedaluwarsa";
            break;
        case "QR_INVALID":
            message = "QR Code tidak valid";
            break;
        case "ALREADY_ATTENDED":
            message = "Anda sudah melakukan presensi";
            break;
        default:
            message = "Terjadi kesalahan saat melakukan presensi";
    }

    return (
        <div className="page-presensi-gagal-layout">
            {/* Navbar */}
            <nav className="navbar-presensi-gagal">
                <button className="back-btn-presensi-gagal" onClick={()=>navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-btn-presensi-gagal-icon"/>
                    <span>Kembali</span>
                </button>

                <h1>PRESENSI</h1>
            </nav>

            {/* Content */}
            <div className="presensi-gagal-container">
                <Icon icon="healthicons:no-24px" className="fail-icon"/>

                <div className="presensi-gagal-content">
                    <h1>Presensi Gagal</h1>
                    <p>{message}</p>
                </div>

                <button className="scan-ulang-btn" onClick={() => navigate("/presensi")}>Scan Ulang</button>
            </div>
        </div>
    );
}

export default PresensiGagal;