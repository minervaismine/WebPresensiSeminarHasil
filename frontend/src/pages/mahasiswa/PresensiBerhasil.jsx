import "../../styles/mahasiswa/PresensiBerhasil.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function PresensiBerhasil() {
    const navigate = useNavigate();

    return (
        <div className="page-presensi-berhasil-layout">
            {/* Navbar */}
            <nav className="navbar-presensi-berhasil">
                <button className="back-btn-presensi-berhasil" onClick={()=>navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-btn-presensi-berhasil-icon"/>
                    <span>Kembali</span>
                </button>

                <h1>PRESENSI</h1>
            </nav>

            {/* Content */}
            <div className="presensi-berhasil-container">
                <Icon icon="ep:success-filled" className="success-icon"/>

                <div className="presensi-berhasil-content">
                    <h1>Presensi Berhasil</h1>
                    <p>Kehadiran Anda pada seminar ini telah tercatat</p>
                </div>

                <button className="lihat-riwayat-presensi-btn" onClick={() => navigate("/riwayat-presensi")}>Lihat Riwayat Presensi</button>
            </div>
        </div>
    );
}

export default PresensiBerhasil;