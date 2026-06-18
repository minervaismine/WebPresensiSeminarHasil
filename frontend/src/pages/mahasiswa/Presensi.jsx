import "../../styles/mahasiswa/Presensi.css";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function Presensi() {
    const navigate = useNavigate();

    const [cameraStarted, setCameraStarted] = useState(false);
    const [scanner, setScanner] = useState(null);

    const startCamera = async () => {
        setCameraStarted(true);
    };

    useEffect(()=>{
        return ()=>{
            if(scanner){
                scanner.stop().catch(()=>{});
            }
        }
    },[scanner]);

    useEffect(() => {
        if (!cameraStarted) return;

        const html5QrCode = new Html5Qrcode("reader");

        setScanner(html5QrCode);

        html5QrCode.start(
            {
                facingMode: "environment"
            },
            {
                fps: 10,
                qrbox: 250
            },
            async (decodedText) => {
                console.log(decodedText);
                //nanti kirim ke backend
                await html5QrCode.stop();

                setCameraStarted(false);
            },
            (error) => {
                //abaikan error scan
            }
        ).catch(err => {
            console.error(err);
        });
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