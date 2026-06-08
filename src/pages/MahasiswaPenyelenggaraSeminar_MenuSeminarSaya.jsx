import "../styles/MahasiswaPenyelenggaraSeminar_MenuSeminarSaya.css";
import { Icon } from '@iconify/react';
import { useState } from "react";
import qrSample from "../assets/qr_sample.png";

function MahasiswaPenyelenggaraSeminar_MenuSeminarSaya() {
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <div className="page-menu-seminar-saya-layout">
        {/* Navbar */}
        <nav className="navbar-menu-seminar-saya">
            <button className="back-btn">
                <Icon icon="weui:back-filled" className="back-icon"/>
                <span>Kembali</span>
            </button>

            <h1>SEMINAR SAYA</h1>
        </nav>

        {/* Content */}
        <div className="content-wrapper">
            {/* Left-Content */}
            <div className="left-content">
                <div className="content-seminar">
                    <h1 className="nama-mahasiswa">Karina Minerva Romeda</h1>
                    <span className="badge-status-seminar">Selesai</span>
                    <h2 className="judul-skripsi">"Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa"</h2>

                    <div className="informasi-seminar-wrapper">
                        <div className="informasi-seminar">
                            <Icon icon="line-md:calendar" className="informasi-icon"/>
                            <span>Senin, 13 April 2026</span>
                        </div>

                        <div className="informasi-seminar">
                            <Icon icon="tabler:clock-filled" className="informasi-icon"/>
                            <span>13.00 - 14.30</span>
                        </div>

                        <div className="informasi-seminar">
                            <Icon icon="weui:location-filled" className="informasi-icon"/>
                            <span>Lab DOP</span>
                        </div>
                    </div>

                    <div className="dosen-wrapper">
                        <div className="dosen-row">
                            <span className="dosen-label">Pembimbing:</span>
                            <span className="dosen-nama">Dr. Hendra, S.Si., M.Kom.</span>
                        </div>

                        <div className="dosen-row">
                            <span className="dosen-label">Penguji:</span>
                            <div className="dosen-nama">
                                <div>Dr. Muhammad Hasbi, M.Sc</div>
                                <div>Jeriko Gormantara, S.Si., M.Si.,</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="actions-btn">
                    <button className="lihat-daftar-hadir-btn">Lihat Daftar Hadir</button>
                    <button className="generate-qr-code-btn" onClick={() => setShowQRModal(true)}>Generate QR Code</button>
                </div>
            </div>

            {/* Right-Content */}
            <div className="stats-card-container">
                <div className="stat-card">
                    <div className="stat-content">
                        <h3>Total Peserta</h3>
                        <h1>12</h1>
                    </div>

                    <div className="stat-icon-wrapper">
                        <Icon icon="mingcute:clipboard-fill" className="stat-icon"/>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-content">
                        <h3>Telah Diverifikasi</h3>
                        <h1>9</h1>
                    </div>

                    <div className="stat-icon-wrapper">
                        <Icon icon="gg:check-o" className="stat-icon"/>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-content">
                        <h3>Pending</h3>
                        <h1>3</h1>
                    </div>

                    <div className="stat-icon-wrapper">
                        <Icon icon="mdi:clock" className="stat-icon"/>
                    </div>
                </div>
            </div>    
        </div>

        {/* Modal Popup */}
        {showQRModal && (
            <div className="modal-overlay" onClick={() => setShowQRModal(false)}>
                <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="close-modal-btn" onClick={() => setShowQRModal(false)}>
                        <Icon icon="mingcute:close-fill" />
                    </button>

                    <div className="scanner-icon-wrapper">
                        <Icon icon="mingcute:scan-line" className="scanner-icon"/>
                    </div>

                    <h2>Scan QR Code</h2>

                    <div className="qr-code-container">
                        <img src={qrSample} alt="QR Code Presensi"/>
                    </div>

                    <p className="modal-description">Tampilkan kode ini kepada peserta untuk dipindai</p>

                    <button className="aktifkan-qr-btn">Aktifkan QR Code</button>
                    
                    <p className="expired-time">10:00 Menit</p>
                </div>
            </div>
        )}
    </div>
  );
}

export default MahasiswaPenyelenggaraSeminar_MenuSeminarSaya;