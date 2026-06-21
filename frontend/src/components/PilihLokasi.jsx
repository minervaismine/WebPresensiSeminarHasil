import "./PilihLokasi.css";
import { Icon } from '@iconify/react';

function PilihLokasi() {
    return (
        <div className="modal-map-overlay" onClick={onClose}>
            <div className="map-modal" onClick={(e) => e.stopPropagation()}>
                <div className="map-header">
                    <h2>Pilih Lokasi Seminar</h2>

                    <button className="close-map-modal-btn">
                        <Icon icon="mingcute:close-fill" />
                    </button>
                </div>

                <div id="leaflet-map" style={{height:"400px", width:"100%"}}>

                <div className="map-footer">
                    <button onClick={onClose}>Simpan Lokasi</button>
                </div>
                </div>
            </div>
        </div>
  );
}

export default PilihLokasi;