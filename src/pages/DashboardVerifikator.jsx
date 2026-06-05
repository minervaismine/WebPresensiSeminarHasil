import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";
import { Icon } from '@iconify/react';

function Dashboard() {
  return (
    <div className="dashboard-layout">
        <Navbar />

        <div className="dashboard-container">
            {/* Title */}
            <h1 className="dashboard-title">Selamat Datang, Verifikator</h1>
            <p className="dashboard-description">Dashboard ini digunakan untuk memantau aktivitas presensi mahasiswa, melakukan verifikasi dan menentukan status presensi mahasiswa berdasarkan kesesuaian lokasi serta data seminar.</p>
        
            {/* Menu */}
            <h1 className="menu-title">Menu</h1>

            {/* Card */}
            <div className="card-container">
                <div className="menu-card">
                    <div className="card-header">
                        <Icon icon="ep:success-filled" className="check-icon" />
                        <span>Verifikasi Presensi</span>
                    </div>
                    <div className="card-content">
                        <p>Lihat dan verifikasi data presensi peserta seminar</p>
                    </div>
                    <button className="detail-btn">Lihat Detail</button>
                </div>

                <div className="menu-card">
                    <div className="card-header">
                        <Icon icon="tabler:clock-filled" className="history-icon" />
                        <span>Riwayat Verifikasi</span>
                    </div>
                    <div className="card-content">
                        <p>Lihat riwayat verifikasi presensi yang telah dilakukan</p>
                    </div>
                    <button className="detail-btn">Lihat Detail</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;