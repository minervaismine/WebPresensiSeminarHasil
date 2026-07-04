import "../../styles/mahasiswa/DashboardMahasiswa.css";
import Navbar from "../../components/Navbar";
import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            setUsername(user.username);
        }
    }, []);

    const handleSeminarSaya = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://127.0.0.1:5000/cek-seminar/${user.id_mahasiswa}`,
                {
                    headers: {
                            Authorization: `Bearer ${token}`
                        }
                }
            );

            const result = await response.json();

            if (result.memiliki_seminar) {
                navigate("/penyelenggara-seminar-saya");
            } else {
                navigate("/peserta-seminar-saya")
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="dashboard-mahasiswa-layout">
            <Navbar />

            <div className="dashboard-mahasiswa-container">
                {/* Title */}
                <h1 className="dashboard-mahasiswa-title">Selamat Datang, {username}</h1>
                <p className="dashboard-mahasiswa-description">Aplikasi ini digunakan sebagai presensi online sekaligus memantau kehadiran mahasiswa dalam mengikuti seminar, sebagai syarat mengajukan seminar hasil. Syarat minimal yang harus dipenuhi adalah minimal 3 kali mengikuti seminar.</p>
            
                {/* Menu */}
                <h1 className="menu-title">Menu</h1>

                {/* Card */}
                <div className="card-mahasiswa-container">
                    <div className="mahasiswa-menu-card">
                        <div className="dashboard-mahasiswa-card-header">
                            <Icon icon="mingcute:clipboard-fill" className="clipboard-icon" />
                            <span>Seminar Saya</span>
                        </div>
                        <div className="dashboard-mahasiswa-card-content">
                            <p>Lihat informasi seminar Anda dan akses QR Code untuk presensi seminar</p>
                        </div>
                        <button className="detail-btn-mahasiswa" onClick={handleSeminarSaya}>Lihat Detail</button>
                    </div>

                    <div className="mahasiswa-menu-card">
                        <div className="dashboard-mahasiswa-card-header">
                            <Icon icon="vaadin:qrcode" className="qrcode-icon" />
                            <span>Presensi</span>
                        </div>
                        <div className="dashboard-mahasiswa-card-content">
                            <p>Scan QR Code dan validasi lokasi otomatis untuk mencatat kehadiran seminar</p>
                        </div>
                        <button className="detail-btn-mahasiswa" onClick={() => navigate("/presensi")}>Lihat Detail</button>
                    </div>

                    <div className="mahasiswa-menu-card">
                        <div className="dashboard-mahasiswa-card-header">
                            <Icon icon="tabler:clock-filled" className="history-icon" />
                            <span>Riwayat Presensi</span>
                        </div>
                        <div className="dashboard-mahasiswa-card-content">
                            <p>Lihat daftar kehadiran seminar yang telah dihadiri</p>
                        </div>
                        <button className="detail-btn-mahasiswa" onClick={() => navigate("/riwayat-presensi")}>Lihat Detail</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;