import "../../styles/mahasiswa/DashboardMahasiswa.css";
import Navbar from "../../components/Navbar";
import { Icon } from '@iconify/react';

function Dashboard() {
  return (
    <div className="dashboard-layout">
        <Navbar />

        <div className="dashboard-container">
            {/* Title */}
            <h1 className="dashboard-title">Selamat Datang, H071221034</h1>
            <p className="dashboard-description">Aplikasi ini digunakan sebagai presensi online sekaligus memantau kehadiran mahasiswa dalam mengikuti seminar, sebagai syarat mengajukan seminar hasil. Syarat minimal yang harus dipenuhi adalah minimal 3 kali mengikuti seminar.</p>
        
            {/* Menu */}
            <h1 className="menu-title">Menu</h1>

            {/* Card */}
            <div className="card-container">
                <div className="menu-card">
                    <div className="card-header">
                        <Icon icon="mingcute:clipboard-fill" className="clipboard-icon" />
                        <span>Seminar Saya</span>
                    </div>
                    <div className="card-content">
                        <p>Lihat informasi seminar Anda dan akses QR Code untuk presensi seminar</p>
                    </div>
                    <button className="detail-btn">Lihat Detail</button>
                </div>

                <div className="menu-card">
                    <div className="card-header">
                        <Icon icon="vaadin:qrcode" className="qrcode-icon" />
                        <span>Presensi</span>
                    </div>
                    <div className="card-content">
                        <p>Scan QR Code dan validasi lokasi otomatis untuk mencatat kehadiran seminar</p>
                    </div>
                    <button className="detail-btn">Lihat Detail</button>
                </div>

                <div className="menu-card">
                    <div className="card-header">
                        <Icon icon="tabler:clock-filled" className="history-icon" />
                        <span>Riwayat Presensi</span>
                    </div>
                    <div className="card-content">
                        <p>Lihat daftar kehadiran seminar yang telah dihadiri</p>
                    </div>
                    <button className="detail-btn">Lihat Detail</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;