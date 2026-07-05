import "../../styles/verifikator/RiwayatVerifikasi.css";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RiwayatVerifikasi() {
    const navigate = useNavigate();

    // Menampilkan data
    const [seminar, setSeminar] = useState([]);
    // Search
    const [search, setSearch] = useState("");
    //Filter
    const [showFilter, setShowFilter] = useState(false);
    const [status, setStatus] = useState("");
    const [selectedTanggal, setSelectedTanggal] = useState("Semua");
    const [tanggalAwal, setTanggalAwal] = useState(null);
    const [tanggalAkhir, setTanggalAkhir] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSeminar();
        }, 500);

        return () => clearTimeout(timer);

    }, [search, status, selectedTanggal, tanggalAwal, tanggalAkhir]);

    const fetchSeminar = async () => {
        try {
            const res = await api.get("/riwayat-verifikasi",
                {
                    params: {
                        search,
                        status,
                        tanggal: selectedTanggal,
                        tanggal_awal: tanggalAwal ? tanggalAwal.toISOString().split("T")[0] : "",
                        tanggal_akhir: tanggalAkhir ? tanggalAkhir.toISOString().split("T")[0] : ""
                    }
                }
            );
            setSeminar(res.data.data);
        } catch(err){
            console.log(err);
        }
    };

    const getStatusVerifikasi = (selesai, total) => {
        if (total === 0) {
            return {
                text: "Belum Diproses",
                className: "belum-diproses"
            };
        }

        if (selesai === 0) {
            return {
                text: "Belum Diproses",
                className: "belum-diproses"
            };
        }

        if (selesai < total) {
            return {
                text: "Sedang Diproses",
                className: "sedang-diproses"
            };
        }

        return {
            text: "Selesai Diproses",
            className: "selesai-diproses"
        };
    };

    const handleTanggalFilter = (value) => {
        setSelectedTanggal(value);

        //Menghapus input rentang tanggal
        setTanggalAwal(null);
        setTanggalAkhir(null);
    };

    return (
        <div className="page-menu-riwayat-verifikasi-layout">
            {/* Navbar */}
            <nav className="navbar-menu-riwayat-verifikasi">
                <button className="back-btn-riwayat-verifikasi" onClick={() => navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-icon-riwayat-verifikasi"/>
                    <span>Kembali</span>
                </button>

                <h1>RIWAYAT VERIFIKASI</h1>
            </nav>

            {/* Judul, Search Bar, Filter  */}
            <div className="daftar-seminar-wrapper-riwayat-verifikasi">
                <h1 className="daftar-seminar-title-riwayat-verifikasi">Daftar Seminar</h1>

                <div className="search-filter-riwayat-verifikasi">
                    <form>
                        <div className="search-bar-riwayat-verifikasi">
                            <Icon icon="radix-icons:magnifying-glass" className="search-icon-riwayat-verifikasi"/>
                            <input className="search-bar-input-riwayat-verifikasi" type="search" placeholder="Cari mahasiswa" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                        </div>
                    </form>

                    <div className="filter-dropdown-riwayat-verifikasi-wrapper">
                        <button className="filter-dropdown-riwayat-verifikasi" onClick={() => setShowFilter(!showFilter)}>
                            <div className="filter-content-riwayat-verifikasi">
                                <Icon icon="mi:filter" className="filter-icon-riwayat-verifikasi"/>
                                <span>Filter</span>
                            </div>

                            <Icon icon="icon-park-outline:down" className="dropdown-icon-riwayat-verifikasi"/>
                        </button>

                        {/* Filter Dropdown */}
                        {showFilter && (
                            <div className="filter-menu-riwayat-verifikasi">
                                <div className="filter-status-riwayat-verifikasi">
                                    <h3>Status</h3>
    
                                    <label>
                                        <input type="checkbox" checked={status === ""} onChange={() => setStatus("")}></input>
                                        Semua
                                    </label>
    
                                    <label>
                                        <input type="checkbox" checked={status === "sedang"} onChange={() => setStatus("sedang")}></input>
                                        Sedang Diproses
                                    </label>

                                    <label>
                                        <input type="checkbox" checked={status === "selesai"} onChange={() => setStatus("selesai")}></input>
                                        Selesai Diproses
                                    </label>

                                    <label>
                                        <input type="checkbox" checked={status === "belum"} onChange={() => setStatus("belum")}></input>
                                        Belum Diproses
                                    </label>
                                </div>
    
                                <div className="filter-tanggal-riwayat-verifikasi">
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
    
                                    <p className="judul-rentang-tanggal-riwayat-verifikasi">Pilih Tanggal:</p>
                                    
                                    <div className="seminar-date-input-riwayat-verifikasi">
                                        <span>Dari</span>
                                        <DatePicker 
                                            selected={tanggalAwal} onChange={(date) => {setTanggalAwal(date); setSelectedTanggal("");}} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YY" className="datepicker-filter-riwayat-verifikasi" popperPlacement="bottom-start" portalId="root">
                                        </DatePicker>
                                    </div>
    
                                    <div className="seminar-date-input-riwayat-verifikasi">
                                        <span>Sampai</span>
                                        <DatePicker
                                            selected={tanggalAkhir} onChange={(date) => {setTanggalAkhir(date); setSelectedTanggal("");}} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YY" className="datepicker-filter-riwayat-verifikasi" popperPlacement="bottom-start" portalId="root">
                                        </DatePicker>
                                    </div>
                                </div>                            
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Daftar Seminar */}
            <div className="seminar-list-riwayat-verifikasi">
                {seminar.map((item) => {
                    const status = getStatusVerifikasi (
                        item.selesai_diproses,
                        item.total_presensi
                    );

                    return (
                        <div className="seminar-card-riwayat-verifikasi" key={item.id_seminar}>
                            <div className="card-accent-riwayat-verifikasi"></div>

                            <div className="card-content-riwayat-verifikasi">
                                <div className="card-header-riwayat-verifikasi">
                                    <div>
                                        <h2 className="nama-mahasiswa-riwayat-verifikasi">{item.nama}</h2>

                                        <div className="informasi-seminar-riwayat-verifikasi">
                                            <span>{item.tanggal}</span>
                                            <span>|</span>
                                            <span>{item.waktu_mulai} - {item.waktu_selesai}</span>
                                        </div>
                                    </div>

                                    <button className="lihat-detail-btn-riwayat-verifikasi" onClick={() => navigate(`/riwayat-verifikasi-lihat-detail/${item.id_seminar}`)}>Lihat Detail</button>
                                </div>

                                <div className="progress-verifikasi">
                                    <p>
                                        <strong>Verifikasi:</strong> 
                                        <span className="angka-progress">{item.selesai_diproses} dari {item.total_presensi} selesai</span>
                                    </p>

                                    <p>
                                        <strong>Status:</strong>
                                        <span className={`status-verifikasi-riwayat ${status.className}`}>{status.text}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default RiwayatVerifikasi;