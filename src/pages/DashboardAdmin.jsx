import "../styles/DashboardAdmin.css";
import Navbar from "../components/Navbar";
import { Icon } from '@iconify/react';

function Dashboard() {
  return (
    <div className="dashboard-layout">
        <Navbar />

        <div className="dashboard-container">
            {/* Title */}
            <h1 className="dashboard-title">Selamat Datang, Admin</h1>
            <p className="dashboard-description">Dashboard ini digunakan untuk mengelola data mahasiswa yang ingin mengajukan seminar, data seminar, serta memantau rekapitulasi presensi peserta seminar.</p>
        
            {/* Menu */}
            <h1 className="menu-title">Menu</h1>

            {/* Card */}
            <div className="card-container">
                <div className="menu-card">
                    <div className="card-header">
                        <Icon icon="ph:student-fill" className="student-icon" />
                        <span>Kelola Data Mahasiswa</span>
                    </div>
                    <div className="card-content">
                        <p>Kelola data dan informasi mahasiswa yang ingin mengajukan seminar</p>
                    </div>
                    <button className="detail-btn">Lihat Detail</button>
                </div>

                <div className="menu-card">
                    <div className="card-header">
                        <Icon icon="mingcute:clipboard-fill" className="clipboard-icon" />
                        <span>Kelola Data Seminar</span>
                    </div>
                    <div className="card-content">
                        <p>Kelola data dan informasi seminar yang akan diajukan</p>
                    </div>
                    <button className="detail-btn">Lihat Detail</button>
                </div>

                <div className="menu-card">
                    <div className="card-header">
                        <Icon icon="tabler:clock-filled" className="history-icon" />
                        <span>Laporan Presensi</span>
                    </div>
                    <div className="card-content">
                        <p>Lihat dan rekap data presensi peserta seminar secara lengkap</p>
                    </div>
                    <button className="detail-btn">Lihat Detail</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;