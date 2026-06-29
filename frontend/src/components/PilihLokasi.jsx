import "./PilihLokasi.css";
import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ChangeView({ center }) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, 19);
    }, [center, map]);

    return null;
}

function LocationMarker({ position, setPosition }) {
    return <Marker position={position}></Marker>;
}

function PilihLokasi({ onClose, lokasi }) {
    const [accuracy, setAccuracy] = useState(null);

    useEffect(() => {
        if (lokasi) {
            setPosition([
                lokasi.latitude,
                lokasi.longitude
            ]);
        }
    }, [lokasi]);

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Browser tidak mendukung GPS");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setPosition([lat, lng]);

                setAccuracy(position.coords.accuracy);
            },
            (error) => {
                console.error(error);
                alert("Tidak dapat mengambil lokasi GPS");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    return (
        <div className="modal-map-overlay" onClick={onClose}>
            <div className="map-modal" onClick={(e) => e.stopPropagation()}>
                <div className="map-header-wrapper">
                    <div className="map-header">
                        <Icon icon="weui:location-filled" className="map-location-icon"/>
                        <span>Pilih Lokasi Seminar</span>
                    </div>

                    <button className="close-map-modal-btn" onClick={onClose}>
                        <Icon icon="mingcute:close-fill" />
                    </button>
                </div>
                    
                <MapContainer center={position} zoom={19} style={{height: "400px", width: "100%",}}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <ChangeView center={position}></ChangeView>
                    <LocationMarker position={position} setPosition={setPosition}></LocationMarker>
                </MapContainer>

                <div className="ambil-gps-btn-wrapper">
                    <button type="button" className="ambil-gps-btn" onClick={getCurrentLocation}>
                        <Icon icon="mage:location-fill" className="ambil-gps-icon"/>
                        <span>Gunakan Lokasi Saat Ini</span>
                    </button>
                </div>
                

                <div className="map-modal-group-nama-lokasi">
                    <label>Nama Lokasi</label>
                    <input type="text" placeholder="Masukkan lokasi seminar" value={lokasi.nama_lokasi} readOnly/>
                </div>

                <div className="map-modal-row">
                    <div className="map-modal-group-latitude">
                        <label>Latitude</label>
                        <input type="text" placeholder="Masukkan titik latitude" value={lokasi.latitude} readOnly/>
                    </div>

                    <div className="map-modal-group-longitude">
                        <label>Longitude</label>
                        <input type="text" placeholder="Masukkan titik longitude" value={lokasi.longitude} readOnly/>
                    </div>
                </div>

                {accuracy && (
                    <p className="gps-accuracy">Akurasi GPS: ±{accuracy.toFixed(2)} meter</p>
                )}

                <div className="map-footer">
                    <button className="simpan-lokasi-btn" onClick={() => {onSelectLocation(position[0], position[1]); onClose();}}>Simpan Lokasi</button>
                </div>
            </div>
        </div>
  );
}

export default PilihLokasi;