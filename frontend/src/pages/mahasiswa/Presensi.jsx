import "../../styles/mahasiswa/Presensi.css";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Presensi() {
    const navigate = useNavigate();

    const [cameraStarted, setCameraStarted] = useState(false);

    const [loadingLocation, setLoadingLocation] = useState(false);

    const scannerRef = useRef(null);
    const isScanningRef = useRef(false);
    const userLocationRef = useRef(null);

    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject("Geolocation tidak didukung");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (err) => {
                    let msg = "Gagal mengambil lokasi GPS.";
                    if (err.code === err.TIMEOUT) msg = "Waktu pengambilan GPS habis (Timeout). Pastikan Anda berada di area terbuka.";
                    if (err.code === err.PERMISSION_DENIED) msg = "Izin GPS ditolak oleh HP/Browser Anda.";
                    
                    reject({ code: "LOCATION_ERROR", message: msg });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                }
            );
        });
    };

    const startCamera = async () => {
        try {
            setLoadingLocation(true);
            
            // 2. Ambil lokasi
            const location = await getCurrentLocation();
            userLocationRef.current = location;

            // 1. Aktikfan kamera dahulu
            setCameraStarted(true);
        } catch (err) {
            console.error("Gagal mendapatkan lokasi:", err);
            alert(err.message || "Harap izinkan akses lokasi GPS untuk melakukan presensi.");
        } finally {
            setLoadingLocation(false);
        }
    };

    useEffect(() => {
        return () => {
            if (scannerRef.current) {
                scannerRef.current
                .stop()
                .catch(() => {})
                .finally(() => {
                    scannerRef.current = null;
                });
            }
        };
    }, []);

    useEffect(() => {
        if (!cameraStarted) return;

        isScanningRef.current = false;

        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;

        html5QrCode.start(
            { facingMode: "environment"},
            {
                fps: 10,
                qrbox: (viewfinderWidth, viewfinderHeight) => {
                    const size = Math.min(viewfinderWidth, viewfinderHeight);

                    if (window.innerWidth < 480) {
                        return {
                            width: size * 0.8,
                            height: size * 0.8,
                        };
                    }

                    return {
                        width: 250,
                        height: 250,
                    };
                }
            },
            async (decodedText) => {
                if (isScanningRef.current) return;
                isScanningRef.current = true;

                try {
                    await html5QrCode.stop();
                    scannerRef.current = null;
                    setCameraStarted(false);

                    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
                    
                    if (!token) {
                        alert("Sesi login Anda tidak ditemukan. Silakan login kembali.");
                        navigate("/login");
                        return;
                    }

                    const location = userLocationRef.current;

                    if (!location) {
                        throw { code: "LOCATION_ERROR", message: "Data lokasi GPS belum siap." };
                    }

                    const response = await api.post("/scan-qr",
                        {
                            qr_code: decodedText,
                            latitude: location.latitude,
                            longitude: location.longitude
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    const result = response.data;

                    if (result.success) {
                        navigate("/presensi-berhasil", {
                            state: result
                        });
                        return;
                    }
                } catch (err) {
                    console.error ("DEBUG ERROR PRESENSI:", err);

                    try {
                        if (scannerRef.current) await html5QrCode.stop();
                    } catch {}
                    
                    scannerRef.current = null;
                    setCameraStarted(false);

                    if (err.response) {
                        const result = err.response.data;
                        const roleCodes = ["PENYELENGGARA", "INVALID_ROLE", "ALREADY_ATTENDED"];

                        if (roleCodes.includes(result.code)) {
                            navigate("/presensi-gagal-role", { state: { code: result.code, message: result.message } });
                        } else {
                            // Termasuk OUT_OF_RADIUS, QR_EXPIRED, dll
                            navigate("/presensi-gagal", { state: { code: result.code, message: result.message } });
                        }
                    }
                    else if (err.code === "LOCATION_ERROR" || err.code === "LOCATION_UNSUPPORTED") {
                        navigate("/presensi-gagal", {
                            state: { code: "LOCATION_FAILED", message: err.message }
                        });
                    }

                    else {
                        navigate("/presensi-gagal", {
                            state: { code: "UNKNOWN_ERROR", message: "Terjadi kesalahan sistem pada perangkat." }
                        });
                    }
                }
            },
            (error) => {
                //Abaikan error per frame
            } 
        );
    }, [cameraStarted]);

    return (
        <div className="page-presensi-layout">
            {/* Navbar */}
            <nav className="navbar-menu-presensi">
                <button className="back-btn-menu-presensi" onClick={()=>navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-btn-menu-presensi-icon"/>
                    <span>Kembali</span>
                </button>

                <h1>PRESENSI</h1>
            </nav>

            {/* Scanner */}
            <div className="presensi-content">
                <div className="scanner-card">
                    {!cameraStarted ? (
                        <button className="start-camera-btn" onClick={startCamera}>
                            <Icon icon="solar:camera-bold" className="camera-icon"/>
                            <span>Mulai Kamera</span>
                        </button>
                    ) : (
                        <div id="reader"></div>
                    )}
                </div>

                <p className="scanner-info">Arahkan kamera ke QR Code untuk melakukan absensi</p>
            </div>
        </div>
    );
}

export default Presensi;