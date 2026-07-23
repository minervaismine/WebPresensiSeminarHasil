import "../../styles/admin/KelolaDataLokasi.css";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function ChangeMapView({ center }) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);

    return null;
}

function LocationMarker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition([
                e.latlng.lat,
                e.latlng.lng
            ]);
        }
    });

    return <Marker position={position}></Marker>;
}

function KelolaDataLokasi() {
    const navigate = useNavigate();

    // Tabel
    const [lokasiList, setLokasiList] = useState([]);
    // Loading
    const [loading, setLoading] = useState(true);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [totalData, setTotalData] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    // Search
    const [search, setSearch] = useState("");
    // Sort
    const [sortOrder, setSortOrder] = useState("asc");
    // Create
    const [showAddLocationModal, setShowAddLocationModal] = useState(false);
    // Update
    const [showEditLocationModal, setShowEditLocationModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    // Delete
    const [showDeleteLocationModal, setShowDeleteLocationModal] = useState(false);
    // Delete Warning Message
    const [deleteMessage, setDeleteMessage] = useState("");
    const [usedSeminar, setUsedSeminar] = useState(0);
    // Modal Delete Button Disabled
    const [canDelete, setCanDelete] = useState(true);

    const startData = totalData === 0 ? 0 : (currentPage - 1) * limit + 1;
    const endData = Math.min(currentPage * limit, totalData);

    const [position, setPosition] = useState([-5.1326225660413165, 119.48684562754943]);

    const [formData, setFormData] = useState({
        nama_lokasi: "",
        latitude: "",
        longitude: "",
        radius: 50
    });

    const [errors, setErrors] = useState({
        nama_lokasi: "",
        latitude: "",
        longitude: ""
    });

    const handleInputChange = (fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));

        if (errors[fieldName]) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: ""
            }));
        }
    }

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            latitude: position[0],
            longitude: position[1]
        }));

        setErrors(prev => ({
            ...prev,
            latitude: "",
            longitude: ""
        }));
    }, [position]);
    
    useEffect(() => {
        fetchLokasi();
    }, [currentPage, search, sortOrder]);

    const fetchLokasi = async () => {
        setLoading(true);

        try {
            const response = await api.get("/lokasi-seminar",
                {
                    params: {
                        page: currentPage,
                        limit: limit,
                        search: search,
                        sort: sortOrder
                    }
                }
            );
            setLokasiList(response.data.data);
            setTotalData(response.data.total);
            setTotalPages(response.data.total_page);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddLocation = async () => {
        const newErrors = {};

        if (!formData.nama_lokasi.trim()) {
            newErrors.nama_lokasi = "Nama lokasi wajib diisi!";
        }

        if (!formData.latitude) {
            newErrors.latitude = "Latitude wajib diisi.";
        }

        if (!formData.longitude) {
            newErrors.longitude = "Longitude wajib diisi.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            alert("⚠️ Gagal Menambahkan: Semua field wajib diisi dan tidak boleh kosong!");
            return;
        }

        setErrors({
            nama_lokasi: "",
            latitude: "",
            longitude: ""
        });

        try {
            await api.post("/lokasi-seminar", formData);

            fetchLokasi();
            setShowAddLocationModal(false);

            alert("Lokasi seminar berhasil ditambahkan!");
        } catch (err) {
            console.log(err);

            if (err.response && err.response.data && err.response.data.message) {
                alert(`Gagal Menambahkan: ${err.response.data.message}`);
            } else {
                alert("Terjadi kesalahan saat menyimpan data.");
            }
        }
    };

    const getPagination = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(
                    1,
                    "...",
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages
                );
            }
        }
        return pages;
    };

    const handleSort = () => {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc");
        setCurrentPage(1);
    };
  
    const openAddModal = () => {
        const defaultPosition = [-5.1326225660413165, 119.48684562754943];
        setPosition(defaultPosition);

        setFormData({
            nama_lokasi: "",
            latitude: "",
            longitude: "",
            radius: 50
        });

        setErrors({
            nama_lokasi: "",
            latitude: "",
            longitude: ""
        });

        setShowAddLocationModal(true);
    };

    const handleEdit = (lokasi) => {
        setSelectedLocation(lokasi);

        setFormData({
            nama_lokasi: lokasi.nama_lokasi,
            latitude: lokasi.latitude,
            longitude: lokasi.longitude,
            radius: lokasi.radius
        });
        setPosition([
            lokasi.latitude,
            lokasi.longitude
        ]);

        setShowEditLocationModal(true);
    };

    const handleUpdateLocation = async () => {
        const newErrors = {};

        if (!formData.nama_lokasi.trim()) {
            newErrors.nama_lokasi = "Nama lokasi wajib diisi!";
        }

        if (!formData.latitude) {
            newErrors.latitude = "Latitude wajib diisi!";
        }

        if (!formData.longitude) {
            newErrors.longitude = "Longitude wajib diisi!";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert("Gagal Mengubah: Pastikan semua data lokasi telah terisi dengan benar!");
            return;
        }

        try {
            await api.put(`/lokasi-seminar/${selectedLocation.id_lokasi}`, formData);
            fetchLokasi();
            setShowEditLocationModal(false);
            alert("Perubahan data lokasi berhasil disimpan!");
        } catch(err) {
            console.log(err);

            // Menampilkan pesan error jika terdapat data duplikat
            if (err.response && err.response.data && err.response.data.message) {
                alert(`Gagal Mengubah: ${err.response.data.message}`);
            } else {
                alert("Terjadi kesalahan saat mengubah data.");
            }
        }
    };

    const handleDelete = (lokasi) => {
        setSelectedLocation(lokasi);

        setDeleteMessage("");
        setUsedSeminar(0);
        setCanDelete(true);

        setShowDeleteLocationModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteLocationModal(false);
        setDeleteMessage("");
        setUsedSeminar(0);
        setCanDelete(true);
        setSelectedLocation(null);
    };

    const handleDeleteLocation = async () => {
        try {
            await api.delete(`/lokasi-seminar/${selectedLocation.id_lokasi}`);
            setShowDeleteLocationModal(false);
            fetchLokasi();

        } catch(err) {
            if (err.response?.status === 400) {
                setDeleteMessage(err.response.data.message);
                setUsedSeminar(err.response.data.used);
                setCanDelete(false);
            } else {
                alert("Terjadi kesalahan");
            }
        };
    };
    
    const handleCurrentLocation = () => {
        if(!navigator.geolocation) {
            alert("Browser Anda tidak mendukung Geolocation!");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // Update marker di peta
                setPosition([lat, lng]);

                // Update form
                setFormData(prev => ({
                    ...prev,
                    latitude: lat,
                    longitude: lng
                }));
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Izin lokasi ditolak!");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Lokasi tidak tersedia!");
                        break;
                    case error. TIMEOUT:
                        alert("Permintaan lokasi melebihi batas waktu.");
                        break;
                    default:
                        alert("Terjadi kesalahan saat mengambil lokasi");
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    return (
    <div className="page-menu-kelola-data-lokasi-layout">
        {/* Navbar */}
        <nav className="navbar-menu-kelola-data-lokasi">
            <button className="back-btn-kelola-data-lokasi" onClick={() => navigate(-1)}>
                <Icon icon="weui:back-filled" className="back-icon-kelola-data-lokasi"/>
                <span>Kembali</span>
            </button>

            <h1>KELOLA DATA LOKASI</h1>
        </nav>

        {/* Add, Search Bar*/}
        <div className="header-kelola-data-lokasi-wrapper">
            <button className="add-lokasi-btn" onClick={openAddModal}>
                <Icon icon="mingcute:add-fill" className="add-lokasi-icon"/>
                <span>Tambah Lokasi Seminar</span>
            </button>
            
            <form>
                <div className="search-bar-kelola-data-lokasi">
                    <Icon icon="radix-icons:magnifying-glass" className="search-icon-kelola-data-lokasi"/>
                    <input className="search-bar-input-kelola-data-lokasi" type="search" placeholder="Cari nama lokasi" value={search} onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}}></input>
                </div>
            </form>
        </div>

        {/* Tabel */}
        <table className="tabel-lokasi-seminar">
            <thead>
                <tr>
                    <th>
                        <button className="sort-thead-kelola-data-lokasi">
                            <span>Nama Lokasi</span>
                            <Icon icon="uil:sort" className="sort-icon-kelola-data-lokasi" onClick={handleSort}/>
                        </button>
                    </th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="4" className="loading-state-kelola-data-lokasi">Memuat daftar lokasi...</td>
                    </tr>
                ) : lokasiList.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="empty-state-kelola-data-lokasi">Daftar lokasi tidak ditemukan</td>
                    </tr>
                ) : (
                    lokasiList.map((lokasi) => (
                        <tr key={lokasi.id_lokasi}>
                            <td className="kolom-nama-lokasi">{lokasi.nama_lokasi}</td>
                            <td className="kolom-latitude">{lokasi.latitude}</td>
                            <td className="kolom-longitude">{lokasi.longitude}</td>
                            <td className="kolom-aksi-kelola-data-lokasi">
                                <div className="btn-aksi-wrapper-kelola-data-lokasi">
                                    <button className="aksi-btn-kelola-data-lokasi edit-btn" onClick={() => handleEdit(lokasi)}>
                                        <Icon icon="boxicons:pencil-filled" className="aksi-icon-kelola-data-lokasi"/>
                                    </button>

                                    <button className=" aksi-btn-kelola-data-lokasi delete-btn" onClick={() => handleDelete(lokasi)}>
                                        <Icon icon="tabler:trash-filled" className="aksi-icon-kelola-data-lokasi"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-wrapper-kelola-data-lokasi">
            <p className="page-description-kelola-data-lokasi">Menampilkan {startData}-{endData} dari {totalData} data</p>

            <div className="pagination-kelola-data-lokasi">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                    <Icon icon="ooui:previous-ltr" className="previous-icon-kelola-data-lokasi"/>
                </button>

                {getPagination().map((item, index) =>
                    item === "..." ? (
                        <span key={index} className="pagination-dots-kelola-data-mahasiswa">...</span>
                    ) : (
                        <button key={index} className={currentPage === item ? "active" : ""} onClick={() => setCurrentPage(item)}>
                            {item}
                        </button>
                    )
                )}

                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
                    <Icon icon="ooui:next-ltr" className="next-icon-kelola-data-lokasi"/>
                </button>
            </div>
        </div>

        {/* Form Tambah Lokasi */}
        {showAddLocationModal && (
            <div className="modal-overlay" onClick={() => setShowAddLocationModal(false)}>
                <div className="form-add-location" onClick={(e) => e.stopPropagation()}>
                    <div className="form-header-wrapper-kelola-data-lokasi">
                        <div className="form-header-kelola-data-lokasi">
                            <Icon icon="tdesign:location-filled" className="location-modal-icon"/>
                            <span>Data Lokasi Seminar</span>
                        </div>
                        <button className="close-form-btn" onClick={() => setShowAddLocationModal(false)}>
                            <Icon icon="mingcute:close-fill" />
                        </button>
                    </div>

                    <MapContainer center={position} zoom={19} style={{height: "350px", width: "100%", marginTop: "10px"}}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
                        <ChangeMapView center={position}></ChangeMapView>
                        <LocationMarker position={position} setPosition={setPosition}></LocationMarker>
                    </MapContainer>

                    <div className="ambil-gps-btn-wrapper">
                        <button type="button" className="ambil-gps-btn" onClick={handleCurrentLocation}>
                            <Icon icon="mage:location-fill" className="ambil-gps-icon"/>
                            <span>Gunakan Lokasi Saat Ini</span>
                        </button>
                    </div>

                    <div className="form-group-nama-lokasi">
                        <label>Nama Lokasi</label>
                        <input type="text" placeholder="Masukkan lokasi/ruangan seminar" value={formData.nama_lokasi} onChange={(e) => handleInputChange("nama_lokasi", e.target.value)}/>
                        {errors.nama_lokasi && (<p className="error-text">{errors.nama_lokasi}</p>)}
                    </div>

                    <div className="map-form-row-add-lokasi">
                        <div className="form-group-latitude">
                            <label>Latitude</label>
                            <input type="text" placeholder="Masukkan titik latitude" value={formData.latitude} onChange={(e) => handleInputChange("latitude", e.target.value)}/>
                            {errors.latitude && (<p className="error-text">{errors.latitude}</p>)}
                        </div>

                        <div className="form-group-longitude">
                            <label>Longitude</label>
                            <input type="text" placeholder="Masukkan titik longitude" value={formData.longitude} onChange={(e) => handleInputChange("longitude", e.target.value)}/>
                            {errors.longitude && (<p className="error-text">{errors.longitude}</p>)}
                        </div>
                    </div>

                    <div className="add-btn-wrapper-kelola-data-lokasi">
                        <button className="add-lokasi-form-btn" onClick={handleAddLocation}>
                            <Icon icon="mingcute:add-fill" className="add-lokasi-form-icon"/>
                            <span>Tambah Lokasi</span>
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Form Edit Lokasi */}
        {showEditLocationModal && (
            <div className="modal-overlay" onClick={() => setShowEditLocationModal(false)}>
                <div className="form-edit-location" onClick={(e) => e.stopPropagation()}>
                    <div className="form-header-wrapper-kelola-data-lokasi">
                        <div className="form-header-kelola-data-lokasi">
                            <Icon icon="tdesign:location-filled" className="location-modal-icon"/>
                            <span>Data Lokasi Seminar</span>
                        </div>
                        <button className="close-form-btn" onClick={() => setShowEditLocationModal(false)}>
                            <Icon icon="mingcute:close-fill" />
                        </button>
                    </div>

                    <MapContainer center={position} zoom={19} style={{height: "350px", width: "100%", marginTop: "10px"}}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
                        <ChangeMapView center={position}></ChangeMapView>
                        <LocationMarker position={position} setPosition={setPosition}></LocationMarker>
                    </MapContainer>

                    <div className="ambil-gps-btn-wrapper">
                        <button type="button" className="ambil-gps-btn" onClick={handleCurrentLocation}>
                            <Icon icon="mage:location-fill" className="ambil-gps-icon"/>
                            <span>Gunakan Lokasi Saat Ini</span>
                        </button>
                    </div>

                    <div className="form-group-nama-lokasi">
                        <label>Nama Lokasi</label>
                        <input type="text" placeholder="Masukkan lokasi/ruangan seminar" value={formData.nama_lokasi} onChange={(e) => handleInputChange("nama_lokasi", e.target.value)}/>
                        {errors.nama_lokasi && (<p className="error-text">{errors.nama_lokasi}</p>)}
                    </div>

                    <div className="map-form-row-add-lokasi">
                        <div className="form-group-latitude">
                            <label>Latitude</label>
                            <input type="text" placeholder="Masukkan titik latitude" value={formData.latitude} onChange={(e) => handleInputChange("latitude", e.target.value)}/>
                            {errors.latitude && (<p className="error-text">{errors.latitude}</p>)}
                        </div>

                        <div className="form-group-longitude">
                            <label>Longitude</label>
                            <input type="text" placeholder="Masukkan titik longitude" value={formData.longitude} onChange={(e) => handleInputChange("longitude", e.target.value)}/>
                            {errors.longitude && (<p className="error-text">{errors.longitude}</p>)}
                        </div>
                    </div>

                    <div className="simpan-btn-wrapper-kelola-data-lokasi">
                        <button className="simpan-lokasi-form-btn" onClick={handleUpdateLocation}>
                            <span>Simpan Perubahan</span>
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Modal Delete Data Lokasi */}
        {showDeleteLocationModal && (
            <div className="modal-overlay" onClick={closeDeleteModal}>
                <div className="modal-delete-kelola-data-lokasi" onClick={(e) => e.stopPropagation()}>
                    <div className="warning-icon-wrapper-kelola-data-lokasi">
                        <Icon icon="ic:round-warning" className="warning-icon-kelola-data-lokasi"/>
                    </div>

                    <h2 className="modal-delete-title-kelola-data-lokasi">Hapus Data</h2>

                    <p className="modal-delete-description-kelola-data-lokasi">
                        {deleteMessage ? `Lokasi masih digunakan oleh ${usedSeminar} seminar. Ubah lokasi seminar tersebut terlebih dahulu sebelum menghapus.` : "Apakah Anda yakin ingin menghapus data ini?"}
                    </p>

                    <div className="btn-wrapper-modal-delete-kelola-data-lokasi">
                        <button className="modal-batal-btn-kelola-data-lokasi" onClick={closeDeleteModal}>Batal</button>
                        <button className="modal-delete-btn-kelola-data-lokasi" onClick={handleDeleteLocation} disabled={!canDelete}>Hapus</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default KelolaDataLokasi;