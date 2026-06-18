import "../../styles/mahasiswa/PenyelenggaraSeminar_SeminarSaya.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { Icon } from '@iconify/react';

function PenyelenggaraSeminar_SeminarSaya() {
    const [showQRModal, setShowQRModal] = useState(false);
    const [seminarData, setSeminarData] = useState(null);
    const [qrCode, setQrCode] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeminar = async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            try {
                const token = localStorage.getItem("token");

                const response = await fetch (
                    `http://127.0.0.1:5000/detail-seminar/${user.id_user}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const result = await response.json();

                setSeminarData(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSeminar();
    }, []);

    if (!seminarData) {
        return <h2 className="loading-page-menu-seminar-saya-penyelenggara">Loading...</h2>;
    }

    const formatTanggal = (tanggal) => {
        const date = new Date(tanggal);

        return date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    const formatWaktu = (waktu) => {
        if (!waktu) return "";

        const [jam, menit] = waktu.split(":");

        return `${jam.padStart(2, "0")}.${menit.padStart(2, "0")}`;
    }

    const getStatusSeminar = () => {
        const sekarang = new Date();

        const [jamMulai, menitMulai] = seminarData.waktu_mulai.split(":");
        const [jamSelesai, menitSelesai] = seminarData.waktu_selesai.split(":");

        const waktuMulai = new Date(seminarData.tanggal);
        waktuMulai.setHours(
            parseInt(jamMulai),
            parseInt(menitMulai),
            0,
            0
        );

        const waktuSelesai = new Date(seminarData.tanggal);
        waktuSelesai.setHours(
            parseInt(jamSelesai),
            parseInt(menitSelesai),
            0,
            0
        );

        if (sekarang < waktuMulai) {
            return {
                text: "Belum Berlangsung",
                className: "seminar-belum-berlangsung",
            };
        }

        if (sekarang <= waktuSelesai) {
            return {
                text: "Sedang Berlangsung",
                className: "seminar-sedang-berlangsung",
            };
        }

        return {
            text: "Selesai",
            className: "seminar-selesai",
        };
    };

    const generateQRCode = async () => {
        try {
            const token = localStorage.getItem("token");

            console.log(token);

            const response = await fetch(
                "http://127.0.0.1:5000/generate-qr",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert(result.message);
                return;
            }

            console.log(response.status);
            console.log(result);

            setQrCode(result.qr_code);
            setShowQRModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    const statusSeminar = getStatusSeminar();

    return (
        <div className="page-menu-seminar-saya-penyelenggara-layout">
            {/* Navbar */}
            <nav className="navbar-menu-seminar-saya-penyelenggara">
                <button className="back-btn-menu-seminar-saya-penyelenggara" onClick={() => navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-btn-menu-seminar-saya-penyelenggara-icon"/>
                    <span>Kembali</span>
                </button>

                <h1>SEMINAR SAYA</h1>
            </nav>

            {/* Content */}
            <div className="content-wrapper-menu-seminar-saya-penyelenggara">
                {/* Left-Content */}
                <div className="left-content-menu-seminar-saya">
                    <div className="content-seminar-menu-seminar-saya">
                        <h1 className="nama-mahasiswa-menu-seminar-saya">{seminarData.nama}</h1>
                        <span className={`badge-status-seminar-menu-seminar-saya ${statusSeminar.className}`}>{statusSeminar.text}</span>
                        <h2 className="judul-skripsi-menu-seminar-saya">"{seminarData.judul_penelitian}"</h2>

                        <div className="informasi-seminar-wrapper-menu-seminar-saya">
                            <div className="informasi-jadwal-seminar">
                                <Icon icon="line-md:calendar" className="informasi-icon"/>
                                <span>{formatTanggal(seminarData.tanggal)}</span>
                            </div>

                            <div className="informasi-jadwal-seminar">
                                <Icon icon="tabler:clock-filled" className="informasi-icon"/>
                                <span>{formatWaktu(seminarData.waktu_mulai)} - {formatWaktu(seminarData.waktu_selesai)}</span>
                            </div>

                            <div className="informasi-jadwal-seminar">
                                <Icon icon="weui:location-filled" className="informasi-icon"/>
                                <span>{seminarData.lokasi}</span>
                            </div>
                        </div>

                        <div className="dosen-wrapper">
                            <div className="dosen-row">
                                <span className="dosen-label">Pembimbing:</span>
                                <span className="dosen-nama">{seminarData.dosen_pembimbing}</span>
                            </div>

                            <div className="dosen-row">
                                <span className="dosen-label">Penguji:</span>
                                <div className="dosen-nama">
                                    <div>{seminarData.dosen_penguji_1}</div>
                                    <div>{seminarData.dosen_penguji_2}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="actions-btn-menu-seminar-saya">
                        <button className="lihat-daftar-hadir-btn" onClick={() => navigate("/lihat-daftar-hadir")}>Lihat Daftar Hadir</button>
                        <button className="generate-qr-code-btn" onClick={generateQRCode}>Generate QR Code</button>
                    </div>
                </div>

                {/* Right-Content */}
                <div className="stats-card-container-menu-seminar-saya">
                    <div className="stat-card-menu-seminar-saya">
                        <div className="stat-content-menu-seminar-saya">
                            <h3>Total Peserta</h3>
                            <h1>12</h1>
                        </div>

                        <div className="stat-icon-wrapper-menu-seminar-saya">
                            <Icon icon="mingcute:clipboard-fill" className="stat-icon1"/>
                        </div>
                    </div>

                    <div className="stat-card-menu-seminar-saya">
                        <div className="stat-content-menu-seminar-saya">
                            <h3>Telah Diverifikasi</h3>
                            <h1>9</h1>
                        </div>

                        <div className="stat-icon-wrapper-menu-seminar-saya">
                            <Icon icon="gg:check-o" className="stat-icon1"/>
                        </div>
                    </div>

                    <div className="stat-card-menu-seminar-saya">
                        <div className="stat-content-menu-seminar-saya">
                            <h3>Pending</h3>
                            <h1>3</h1>
                        </div>

                        <div className="stat-icon-wrapper-menu-seminar-saya">
                            <Icon icon="mdi:clock" className="stat-icon1"/>
                        </div>
                    </div>
                </div>    
            </div>

            {/* Modal Popup */}
            {showQRModal && (
                <div className="modal-overlay-menu-seminar-saya" onClick={() => setShowQRModal(false)}>
                    <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn-menu-seminar-saya" onClick={() => setShowQRModal(false)}>
                            <Icon icon="mingcute:close-fill" />
                        </button>

                        <div className="scanner-icon-wrapper">
                            <Icon icon="mingcute:scan-line" className="scanner-icon"/>
                        </div>

                        <h2>Scan QR Code</h2>

                        <div className="qr-code-container">
                            {qrCode && (
                                <QRCode value={qrCode} size={200}/>
                            )}
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

export default PenyelenggaraSeminar_SeminarSaya;