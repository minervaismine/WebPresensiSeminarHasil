import "../../styles/mahasiswa/RiwayatPresensi.css";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RiwayatPresensi() {
    const navigate = useNavigate();

    // Loading
    const [loading, setLoading] = useState(true);
    // Data dalam card statistik kehadiran
    const [statistik, setStatistik] = useState({total_kehadiran: 0, kehadiran_valid: 0, kehadiran_pending: 0});
    // Data dalam card riwayat presensi
    const [riwayat, setRiwayat] = useState([]);
    // Search
    const [search, setSearch] = useState("");
    // Filter
    const [showFilter, setShowFilter] = useState(false);
    const [status, setStatus] = useState("");
    const [selectedTanggal, setSelectedTanggal] = useState("Semua");
    const [tanggalAwal, setTanggalAwal] = useState(null);
    const [tanggalAkhir, setTanggalAkhir] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchRiwayat();
        }, 500);

        return () => clearTimeout(timer);
    }, [search, status, selectedTanggal, tanggalAwal, tanggalAkhir,]);

    const fetchRiwayat = async () => {
        setLoading(true);

        try {
            const res = await api.get("/riwayat-presensi-mahasiswa",
                {
                    params: {
                        search: search,
                        status,
                        tanggal: selectedTanggal,
                        tanggal_awal: tanggalAwal ? format(tanggalAwal, "yyyy-MM-dd") : "",
                        tanggal_akhir: tanggalAkhir ? format(tanggalAkhir, "yyyy-MM-dd") : "",
                    },
                    withCredentials: true
                }
            );
            setRiwayat(res.data.data);
            setStatistik(res.data.statistik);
        } catch(err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case "valid":
                return "Valid";
            case "pending":
                return "Pending";
            case "invalid":
                return "Invalid";
            default:
                return status;
        }
    }

    const handleTanggalFilter = (value) => {
        setSelectedTanggal(value);

        //Menghapus input rentang tanggal
        setTanggalAwal(null);
        setTanggalAkhir(null);

        setPage(1);
    };

    return (
        <div className="page-menu-riwayat-presensi-layout">
            {/* Navbar */}
            <nav className="navbar-menu-riwayat-presensi">
                <button className="back-btn-riwayat-presensi" onClick={() => navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-icon-riwayat-presensi"/>
                    <span>Kembali</span>
                </button>

                <h1>RIWAYAT PRESENSI</h1>
            </nav>

            {/* Statistik Kehadiran */}
            <h1 className="statistik-kehadiran-title">Statistik Kehadiran</h1>

            <div className="stats-card-container-riwayat-presensi">
                <div className="stat-card-riwayat-presensi">
                    <div className="stat-content-riwayat-presensi">
                        <h3>Total Kehadiran</h3>
                        <h1>{statistik.total_kehadiran}</h1>
                    </div>

                    <div className="stat-icon-wrapper-riwayat-presensi">
                        <Icon icon="mingcute:clipboard-fill" className="stat-icon-riwayat-presensi"/>
                    </div>
                </div>

                <div className="stat-card-riwayat-presensi">
                    <div className="stat-content-riwayat-presensi">
                        <h3>Kehadiran Valid</h3>
                        <h1>{statistik.kehadiran_valid}</h1>
                    </div>

                    <div className="stat-icon-wrapper-riwayat-presensi">
                        <Icon icon="gg:check-o" className="stat-icon-riwayat-presensi"/>
                    </div>
                </div>

                <div className="stat-card-riwayat-presensi">
                    <div className="stat-content-riwayat-presensi">
                        <h3>Kehadiran Pending</h3>
                        <h1>{statistik.kehadiran_pending}</h1>
                    </div>

                    <div className="stat-icon-wrapper-riwayat-presensi">
                        <Icon icon="mdi:clock" className="stat-icon-riwayat-presensi"/>
                    </div>
                </div>
            </div>  

            {/* Judul, Search Bar, Filter  */}
            <div className="header-riwayat-presensi-wrapper">
                <h1 className="riwayat-presensi-title">Riwayat Presensi</h1>

                <div className="search-filter-riwayat-presensi">
                    <form>
                        <div className="search-bar-riwayat-presensi">
                            <Icon icon="radix-icons:magnifying-glass" className="search-icon-riwayat-presensi"/>
                            <input className="search-bar-input-riwayat-presensi" type="search" placeholder="Cari mahasiswa, judul atau dosen" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                        </div>
                    </form>

                    <div className="filter-dropdown-riwayat-presensi-wrapper">
                        <button type="button" className="filter-dropdown-riwayat-presensi" onClick={() => setShowFilter(!showFilter)}>
                            <div className="filter-content-riwayat-presensi">
                                <Icon icon="mi:filter" className="filter-icon-riwayat-presensi"/>
                                <span>Filter</span>
                            </div>

                            <Icon icon="icon-park-outline:down" className="dropdown-icon-riwayat-presensi"/>
                        </button>

                        {/* Filter Dropdown */}
                        {showFilter && (
                            <div className="filter-menu-riwayat-presensi">
                                <div className="filter-riwayat-presensi">
                                    <h3>Status</h3>
    
                                    <label>
                                        <input type="checkbox" checked={status === ""} onChange={() => setStatus("")}></input>
                                        Semua
                                    </label>

                                    <label>
                                        <input type="checkbox" checked={status === "pending"} onChange={() => setStatus("pending")}></input>
                                        Pending
                                    </label>
    
                                    <label>
                                        <input type="checkbox" checked={status === "valid"} onChange={() => setStatus("valid")}></input>
                                        Valid
                                    </label>

                                    <label>
                                        <input type="checkbox" checked={status === "invalid"} onChange={() => setStatus("invalid")}></input>
                                        Invalid
                                    </label>
                                </div>
    
                                <div className="filter-tanggal-seminar-riwayat-presensi">
                                    <h3>Tanggal</h3>
    
                                    <label>
                                        <input type="checkbox" checked={selectedTanggal === "Semua"} onChange={() => handleTanggalFilter("Semua")}></input>
                                        Semua
                                    </label>
    
                                    <label>
                                        <input type="checkbox" checked={selectedTanggal === "Hari Ini"} onChange={() => handleTanggalFilter("Hari Ini")}></input>
                                        Hari Ini
                                    </label>
    
                                    <label>
                                        <input type="checkbox" checked={selectedTanggal === "Minggu Ini"} onChange={() => handleTanggalFilter("Minggu Ini")}></input>
                                        Minggu Ini
                                    </label>
    
                                    <label>
                                        <input type="checkbox" checked={selectedTanggal === "Bulan Ini"} onChange={() => handleTanggalFilter("Bulan Ini")}></input>
                                        Bulan Ini
                                    </label>
    
                                    <p className="judul-rentang-tanggal-riwayat-presensi">Pilih Tanggal:</p>
                                    
                                    <div className="seminar-date-input-riwayat-presensi">
                                        <span>Dari</span>
                                        <DatePicker 
                                            selected={tanggalAwal} onChange={(date) => {setTanggalAwal(date); setSelectedTanggal("");}} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YY" className="datepicker-filter-riwayat-presensi" popperPlacement="bottom-start" portalId="root">
                                        </DatePicker>
                                    </div>
    
                                    <div className="seminar-date-input-riwayat-presensi">
                                        <span>Sampai</span>
                                        <DatePicker
                                            selected={tanggalAkhir} onChange={(date) => {setTanggalAkhir(date); setSelectedTanggal("");}} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YY" className="datepicker-filter-riwayat-presensi" popperPlacement="bottom-start" portalId="root">
                                        </DatePicker>
                                    </div>
                                </div>                            
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Riwayat Presensi */}
            <div className="riwayat-list">
                {loading ? (
                    <div className="loading-state-riwayat-presensi">
                        <p>Memuat data...</p>
                    </div>
                ) : riwayat.length === 0 ? (
                    <h3 className="empty-state-riwayat-presensi">Tidak ada riwayat presensi</h3>
                ) : (
                    riwayat.map((item) => (
                        <div className="riwayat-card" key={item.id_presensi}>
                            <div className="riwayat-card-accent"></div>

                            <div className="riwayat-card-content">
                                <div className="riwayat-card-header">
                                    <div>
                                        <h2 className="riwayat-nama-mahasiswa">{item.nama_mahasiswa}</h2>
                                        <p className="riwayat-judul-skripsi">"{item.judul_penelitian?.toUpperCase()}"</p>
                                    </div>

                                    <span className={`riwayat-status-badge ${item.status_verifikasi}`}>{getStatusText(item.status_verifikasi)}</span>
                                </div>

                                <div className="riwayat-informasi-seminar">
                                    <span>{item.tanggal}</span>
                                    <span>|</span>
                                    <span>{item.waktu_mulai} - {item.waktu_selesai}</span>
                                </div>

                                <div className="riwayat-dosen-info">
                                    <p><strong>Pembimbing:</strong>{" "}{item.dosen_pembimbing}</p>

                                    <p>
                                        <strong>Penguji:</strong>{" "}{item.dosen_penguji_1}
                                        <span className="riwayat-separator">|</span>
                                        {item.dosen_penguji_2}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default RiwayatPresensi;