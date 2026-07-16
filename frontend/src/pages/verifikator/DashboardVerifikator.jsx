import "../../styles/verifikator/DashboardVerifikator.css";
import Navbar from "../../components/Navbar";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard-verifikator-layout">
            <Navbar />

            <div className="dashboard-verifikator-container">
                {/* Title */}
                <h1 className="dashboard-verifikator-title">Selamat Datang, Verifikator</h1>
                <p className="dashboard-verifikator-description">Dashboard ini digunakan untuk memantau aktivitas presensi mahasiswa, melakukan verifikasi dan menentukan status presensi mahasiswa berdasarkan kesesuaian lokasi serta data seminar.</p>
            
                {/* Menu */}
                <h1 className="menu-title-dashboard-verifikator">Menu</h1>

                {/* Card */}
                <div className="card-container-dashboard-verifikator">
                    <div className="menu-card-dashboard-verifikator">
                        <div className="card-header-dashboard-verifikator">
                            <Icon icon="ep:success-filled" className="check-icon-dashboard-verifikator" />
                            <span>Verifikasi Presensi</span>
                        </div>
                        <div className="card-content-dashboard-verifikator">
                            <p>Lihat dan verifikasi data presensi peserta seminar</p>
                        </div>
                        <button className="detail-btn-dashboard-verifikator" onClick={() => navigate("/verifikasi-presensi")}>Lihat Detail</button>
                    </div>

                    <div className="menu-card-dashboard-verifikator">
                        <div className="card-header-dashboard-verifikator">
                            <Icon icon="tabler:clock-filled" className="history-icon-dashboard-verifikator" />
                            <span>Riwayat Verifikasi</span>
                        </div>
                        <div className="card-content-dashboard-verifikator">
                            <p>Lihat riwayat verifikasi presensi yang telah dilakukan</p>
                        </div>
                        <button className="detail-btn-dashboard-verifikator" onClick={() => navigate("/riwayat-verifikasi")}>Lihat Detail</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;