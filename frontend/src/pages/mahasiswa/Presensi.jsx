import "../../styles/mahasiswa/Presensi.css";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Presensi() {
    const navigate = useNavigate();

    const [cameraStarted, setCameraStarted] = useState(false);
    const scannerRef = useRef(null);
    const isScanningRef = useRef(false);

    const startCamera = async () => {
        setCameraStarted(true);
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
                (err) => reject(err),
                {
                    enableHighAccuracy: true,
                    timeout: 10000
                }
            );
        });
    };

    useEffect(() => {
        if (!cameraStarted) return;

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

                    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                    console.log("TOKEN:", token);
                    const location = await getCurrentLocation();

                    const response = await api.post(
                        "/scan-qr",
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

                    if (result.code === "PENYELENGGARA" || result.code === "INVALID_ROLE" || result.code === "ALREADY_ATTENDED") {
                        navigate("/presensi-gagal-role", {
                            state: {
                                code: result.code
                            }
                        });
                    } else {
                        navigate("/presensi-gagal", {
                            state: {
                                code: result.code
                            }
                        });
                    }
                } catch (err) {
                    console.log(err);

                    try {
                        await html5QrCode.stop();
                    } catch {}

                    scannerRef.current = null;
                    setCameraStarted(false);

                    if (err.response) {
                        const result = err.response.data;

                        if (
                            result.code === "PENYELENGGARA" ||
                            result.code === "INVALID_ROLE" ||
                            result.code === "ALREADY_ATTENDED"
                        ) {
                            navigate("/presensi-gagal-role", {
                                state: {
                                    code: result.code
                                }
                            });
                        } else {
                            navigate("/presensi-gagal", {
                                state: {
                                    code: result.code
                                }
                            });
                        }
                    } else {
                        navigate("/presensi-gagal", {
                            state: {
                                code: "SERVER_ERROR"
                            }
                        });
                    }
                }
            },
            (error) => {
                //Abaikan error scan
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