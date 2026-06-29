import "../../styles/admin/DashboardAdmin.css";
import Navbar from "../../components/Navbar";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard-admin-layout">
            <Navbar />

            <div className="dashboard-admin-container">
                {/* Title */}
                <h1 className="dashboard-admin-title">Selamat Datang, Admin</h1>
                <p className="dashboard-admin-description">Dashboard ini digunakan untuk mengelola data mahasiswa yang ingin mengajukan seminar, data seminar, serta memantau rekapitulasi presensi peserta seminar.</p>
            
                {/* Menu */}
                <h1 className="menu-title">Menu</h1>

                {/* Card */}
                <div className="card-dashboard-admin-container">
                    <div className="menu-card-dashboard-admin">
                        <div className="card-header-dashboard-admin">
                            <Icon icon="ph:student-fill" className="student-dashboard-admin-icon" />
                            <span>Kelola Data Mahasiswa</span>
                        </div>
                        <div className="card-content-dashboard-admin">
                            <p>Kelola data dan informasi mahasiswa yang ingin mengajukan seminar</p>
                        </div>
                        <button className="detail-btn" onClick={() => navigate("/kelola-data-mahasiswa")}>Lihat Detail</button>
                    </div>

                    <div className="menu-card-dashboard-admin">
                        <div className="card-header-dashboard-admin">
                            <Icon icon="tdesign:location-filled" className="location-dashboard-admin-icon" />
                            <span>Kelola Data Lokasi</span>
                        </div>
                        <div className="card-content-dashboard-admin">
                            <p>Kelola data dan informasi lokasi seminar</p>
                        </div>
                        <button className="detail-btn" onClick={() => navigate("/kelola-data-lokasi")}>Lihat Detail</button>
                    </div>

                    <div className="menu-card-dashboard-admin">
                        <div className="card-header-dashboard-admin">
                            <Icon icon="mingcute:clipboard-fill" className="clipboard-dashboard-admin-icon" />
                            <span>Kelola Data Seminar</span>
                        </div>
                        <div className="card-content-dashboard-admin">
                            <p>Kelola data dan informasi seminar yang akan diajukan</p>
                        </div>
                        <button className="detail-btn" onClick={() => navigate("/kelola-data-seminar")}>Lihat Detail</button>
                    </div>

                    <div className="menu-card-dashboard-admin">
                        <div className="card-header-dashboard-admin">
                            <Icon icon="tabler:clock-filled" className="history-dashboard-admin-icon" />
                            <span>Laporan Presensi</span>
                        </div>
                        <div className="card-content-dashboard-admin">
                            <p>Lihat dan rekap data presensi peserta seminar secara lengkap</p>
                        </div>
                        <button className="detail-btn" onClick={() => navigate("/laporan-presensi")}>Lihat Detail</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;