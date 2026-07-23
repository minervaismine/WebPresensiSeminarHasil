import "../../styles/mahasiswa/PenyelenggaraSeminar_SeminarSaya.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { Icon } from '@iconify/react';
import api from "../../api/axios";

function PenyelenggaraSeminar_SeminarSaya() {
    const navigate = useNavigate();

    const [showQRModal, setShowQRModal] = useState(false);
    const [seminarData, setSeminarData] = useState(null);
    const [qrCode, setQrCode] = useState("");
    const [expiredAt, setExpiredAt] = useState(null);
    const [countdown, setCountdown] = useState("10:00");
    const [isExpired, setIsExpired] = useState(false);
    const [isActivated, setIsActivated] = useState(false);

    useEffect(() => {
        const fetchSeminar = async () => {
            const userString = localStorage.getItem("user") || sessionStorage.getItem("user");
            const user = userString ? JSON.parse(userString) : null;

            if (!user) {
                navigate("/");
                return;
            }

            try {
                const response = await api.get (`/detail-seminar/${user.id_user}`);
                setSeminarData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchSeminar();
    }, [navigate]);

    useEffect(() => {
        if (!expiredAt) {
            setCountdown("10:00");
            setIsExpired(false);
            return;
        }

        const timer = setInterval(() => {
            const now = new Date();
            const different = expiredAt - now;

            if (different <= 0) {
                clearInterval(timer);

                setCountdown("00:00");
                setIsExpired(true);
                setIsActivated(false);
                setExpiredAt(null);

                return;
            }

            const minutes = Math.floor(different / 1000 / 60);
            const seconds = Math.floor((different / 1000) % 60);

            setCountdown(
                `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
            );
        }, 1000);

        return () => clearInterval(timer);
    }, [expiredAt]);

    if (!seminarData) {
        return <h2 className="loading-page-menu-seminar-saya-penyelenggara">Memuat data...</h2>;
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
        if (
            !seminarData ||
            !seminarData.waktu_mulai ||
            !seminarData.waktu_selesai ||
            !seminarData.tanggal
        ) {
            return {
                text: "-",
                className: "",
            };
        }

        const sekarang = new Date();

        const [jamMulai, menitMulai] = seminarData.waktu_mulai.split(":");
        const [jamSelesai, menitSelesai] = seminarData.waktu_selesai.split(":");

        const waktuMulai = new Date(seminarData.tanggal);
        waktuMulai.setHours(
            Number(jamMulai),
            Number(menitMulai),
            0,
            0
        );

        const waktuSelesai = new Date(seminarData.tanggal);
        waktuSelesai.setHours(
            Number(jamSelesai),
            Number(menitSelesai),
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

    const statusSeminar = getStatusSeminar();

    const generateQRCode = async () => {
        try {
            const response = await api.post("/generate-qr");

            if (response.data && response.data.qr_code) {
                setQrCode(response.data.qr_code);

                if (response.data.expired_at && response.data.server_time) {
                    const serverExpire = new Date(response.data.expired_at).getTime();
                    const serverNow = new Date(response.data.server_time).getTime();
                    const remainingMs = serverExpire - serverNow;

                    setExpiredAt(new Date(Date.now() + remainingMs));
                } else {
                    setExpiredAt(null);
                }

                // RESET STATE
                setCountdown("10:00");
                setIsActivated(false);
                setIsExpired(false);
            } 
        } catch (error) {
            console.error("Gagal generate QR Code:", error);
            alert(error.response?.data?.message || "Gagal membuat QR Code");
        }
    };

    const activateQRCode = async () => {
        try {
            const response = await api.post("/activate-qr",
                {
                    id_seminar: seminarData.id_seminar
                });

            if (response.data.expired_at && response.data.server_time) {
                const serverExpire = new Date(response.data.expired_at).getTime();
                const serverNow = new Date(response.data.server_time).getTime();
                const remainingMs = serverExpire - serverNow;

                setExpiredAt(new Date(Date.now() + remainingMs));
            } else {
                setExpiredAt(null);
            }

            setIsActivated(true);
            setIsExpired(false);

            alert(response.data.message);
        } catch(err) {
            console.log(err);

            if (err.response) {
                console.log(err.response.data);
                alert(err.response.data.message);
            }
        }
    };

    const openQRModal = async () => {
        try {
            const status = await api.get(`/qr-status/${seminarData.id_seminar}`);

            if (status.data.status_qr === "active") {
                setQrCode(status.data.qr_code);

                if (status.data.expired_at && status.data.server_time) {

                    const expire = new Date(status.data.expired_at);

                    const serverExpire = new Date(status.data.expired_at).getTime();
                    const serverNow = new Date(status.data.server_time).getTime();
                    const remainingMs = serverExpire - serverNow;

                    setExpiredAt(new Date(Date.now() + remainingMs));
                } else {
                    setExpiredAt(null);
                }

                setIsActivated(true);
                setIsExpired(false);
            } else {
                await generateQRCode();
            }

            setShowQRModal(true);
        } catch(err) {
            await generateQRCode();
            setShowQRModal(true);
        }
    };

    const closeQRModal = () => {
        setShowQRModal(false);
        setQrCode("");
        setExpiredAt(null);
        setCountdown("10:00");
        setIsActivated(false);
        setIsExpired(false);
    };

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
                                <Icon icon="mdi:calendar" className="informasi-icon"/>
                                <span>{formatTanggal(seminarData.tanggal)}</span>
                            </div>

                            <div className="informasi-jadwal-seminar">
                                <Icon icon="tabler:clock-filled" className="informasi-icon"/>
                                <span>{formatWaktu(seminarData.waktu_mulai)} - {formatWaktu(seminarData.waktu_selesai)}</span>
                            </div>

                            <div className="informasi-jadwal-seminar">
                                <Icon icon="weui:location-filled" className="informasi-icon"/>
                                <span>{seminarData.nama_lokasi || "Lokasi belum ditentukan"}</span>
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
                        <button className="lihat-daftar-hadir-btn-penyelenggara-seminar" onClick={() => navigate(`/lihat-daftar-hadir/${seminarData.id_seminar}`)}>Lihat Daftar Hadir</button>
                        <button className="generate-qr-code-btn-penyelenggara-seminar" onClick={openQRModal} disabled={showQRModal}>Generate QR Code</button>
                    </div>
                </div>

                {/* Right-Content */}
                <div className="stats-card-container-menu-seminar-saya">
                    <div className="stat-card-menu-seminar-saya">
                        <div className="stat-content-menu-seminar-saya">
                            <h3>Total Peserta</h3>
                            <h1>{seminarData.total_peserta}</h1>
                        </div>

                        <div className="stat-icon-wrapper-menu-seminar-saya">
                            <Icon icon="mingcute:clipboard-fill" className="stat-icon1"/>
                        </div>
                    </div>

                    <div className="stat-card-menu-seminar-saya">
                        <div className="stat-content-menu-seminar-saya">
                            <h3>Telah Diverifikasi</h3>
                            <h1>{seminarData.telah_diverifikasi}</h1>
                        </div>

                        <div className="stat-icon-wrapper-menu-seminar-saya">
                            <Icon icon="gg:check-o" className="stat-icon1"/>
                        </div>
                    </div>

                    <div className="stat-card-menu-seminar-saya">
                        <div className="stat-content-menu-seminar-saya">
                            <h3>Pending</h3>
                            <h1>{seminarData.pending}</h1>
                        </div>

                        <div className="stat-icon-wrapper-menu-seminar-saya">
                            <Icon icon="mdi:clock" className="stat-icon1"/>
                        </div>
                    </div>
                </div>    
            </div>

            {/* Modal Popup */}
            {showQRModal && (
                <div className="modal-overlay-menu-seminar-saya" onClick={closeQRModal}>
                    <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn-menu-seminar-saya" onClick={closeQRModal}>
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

                        <button className="aktifkan-qr-btn" onClick={activateQRCode} disabled={isActivated || isExpired}>{isActivated ? "QR Code Sedang Aktif" : isExpired ? "QR Code Kedaluwarsa" : "Aktifkan QR Code"}</button>
                        
                        <p className="expired-time">{countdown} Menit</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PenyelenggaraSeminar_SeminarSaya;