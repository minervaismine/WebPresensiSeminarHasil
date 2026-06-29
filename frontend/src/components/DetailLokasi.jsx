import "./DetailLokasi.css";
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

function DetailLokasi({ onClose, lokasi }) {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (lokasi) {
            setPosition([
                Number(lokasi.latitude),
                Number(lokasi.longitude)
            ]);
        }
    }, [lokasi]);

    return (
        <div className="modal-map-overlay" onClick={onClose}>
            <div className="map-modal" onClick={(e) => e.stopPropagation()}>
                <div className="map-header-wrapper">
                    <div className="map-header">
                        <Icon icon="weui:location-filled" className="map-location-icon"/>
                        <span>Lokasi Seminar</span>
                    </div>

                    <button className="close-map-modal-btn" onClick={onClose}>
                        <Icon icon="mingcute:close-fill" />
                    </button>
                </div>
                    
                {position && (
                    <MapContainer center={position} zoom={19} style={{height: "400px", width: "100%",}}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <ChangeView center={position}></ChangeView>
                        <LocationMarker position={position}></LocationMarker>
                    </MapContainer>
                )}
                    
                <div className="map-modal-group-nama-lokasi">
                    <label>Nama Lokasi</label>
                    <input type="text" placeholder="Masukkan lokasi seminar" value={lokasi?.nama_lokasi || ""} readOnly/>
                </div>

                <div className="map-modal-row">
                    <div className="map-modal-group-latitude">
                        <label>Latitude</label>
                        <input type="text" placeholder="Masukkan titik latitude" value={lokasi?.latitude || ""} readOnly/>
                    </div>

                    <div className="map-modal-group-longitude">
                        <label>Longitude</label>
                        <input type="text" placeholder="Masukkan titik longitude" value={lokasi?.longitude || ""} readOnly/>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default DetailLokasi;