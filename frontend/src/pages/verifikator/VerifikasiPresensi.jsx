import "../../styles/verifikator/VerifikasiPresensi.css";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function VerifikasiPresensi() {
    const navigate = useNavigate();

    // Menampilkan data
    const [seminar, setSeminar] = useState([]);
    // Loading
    const [loading, setLoading] = useState(true);
    // Search
    const [search, setSearch] = useState("");
    //Filter
    const [showFilter, setShowFilter] = useState(false);
    const [selectedTanggal, setSelectedTanggal] = useState("Semua");
    const [tanggalAwal, setTanggalAwal] = useState(null);
    const [tanggalAkhir, setTanggalAkhir] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSeminar();
        }, 500);

        return () => clearTimeout(timer);
    }, [search, selectedTanggal, tanggalAwal, tanggalAkhir]);

    const fetchSeminar = async () => {
        setLoading(true);

        try {
            const res = await api.get("/verifikasi-presensi",
                {
                    params: {
                        search: search,
                        tanggal: selectedTanggal,
                        tanggal_awal: tanggalAwal ? tanggalAwal.toISOString().split("T")[0] : "",
                        tanggal_akhir: tanggalAkhir ? tanggalAkhir.toISOString().split("T")[0] : ""
                    }
                }
            );

            setSeminar(res.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleTanggalFilter = (value) => {
        setSelectedTanggal(value);

        // Jika memilih filter checkbox, kosongkan rentang tanggal
        setTanggalAwal(null);
        setTanggalAkhir(null);
    };

    const formatTanggal = (tanggal) => {
        return new Date(tanggal).toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="page-menu-verifikasi-presensi-layout">
            {/* Navbar */}
            <nav className="navbar-menu-verifikasi-presensi">
                <button className="back-btn-verifikasi-presensi" onClick={() => navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-icon-verifikasi-presensi"/>
                    <span>Kembali</span>
                </button>

                <h1>VERIFIKASI PRESENSI</h1>
            </nav>

            {/* Judul, Search Bar, Filter  */}
            <div className="daftar-seminar-wrapper-verifikasi-presensi">
                <h1 className="daftar-seminar-title-verifikasi-presensi">Daftar Seminar</h1>

                <div className="search-filter-verifikasi-presensi">
                    <form>
                        <div className="search-bar-verifikasi-presensi">
                            <Icon icon="radix-icons:magnifying-glass" className="search-icon-verifikasi-presensi"/>
                            <input className="search-bar-input-verifikasi-presensi" type="search" value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder="Cari mahasiswa"></input>
                        </div>
                    </form>

                    <div className="filter-dropdown-verifikasi-presensi-wrapper">
                        <button className="filter-dropdown-verifikasi-presensi" onClick={() => setShowFilter(!showFilter)}>
                            <div className="filter-content-verifikasi-presensi">
                                <Icon icon="mi:filter" className="filter-icon-verifikasi-presensi"/>
                                <span>Filter</span>
                            </div>

                            <Icon icon="icon-park-outline:down" className="dropdown-icon-verifikasi-presensi"/>
                        </button>

                        {/* Filter Dropdown */}
                        {showFilter && (
                            <div className="filter-tanggal-daftar-seminar">
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

                                <p className="judul-rentang-tanggal-daftar-seminar">Pilih Tanggal:</p>

                                <div className="daftar-seminar-date-input">
                                    <span>Dari</span>
                                    <DatePicker 
                                        selected={tanggalAwal} onChange={(date) => {setTanggalAwal(date); setSelectedTanggal("");}} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YY" className="datepicker-filter-daftar-seminar" popperPlacement="bottom-start" portalId="root">
                                    </DatePicker>
                                </div>

                                <div className="daftar-seminar-date-input">
                                    <span>Sampai</span>
                                    <DatePicker
                                        selected={tanggalAkhir} onChange={(date) => {setTanggalAkhir(date); setSelectedTanggal("");}} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YY" className="datepicker-filter-daftar-seminar" popperPlacement="bottom-start" portalId="root">
                                    </DatePicker>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Daftar Seminar */}
            <div className="seminar-list-verifikasi-presensi">
                {loading ? (
                    <p className="loading-state-verifikasi-presensi">Memuat data seminar...</p>
                ) : seminar.length === 0 ? (
                    <p className="empty-state-verifikasi-presensi">Data seminar tidak ditemukan</p>
                ) : (
                    seminar.map((item) => (
                        <div className="seminar-card-verifikasi-presensi" key={item.id_seminar}>
                            <div className="card-accent-verifikasi-presensi"></div>

                            <div className="card-content-verifikasi-presensi">
                                <div className="card-header-verifikasi-presensi">
                                    <div>
                                        <h2 className="nama-mahasiswa-verifikasi-presensi">{item.nama}</h2>
                                        <p className="judul-skripsi-verifikasi-presensi">"{item.judul_penelitian}"</p>
                                    </div>

                                    <button className="lihat-daftar-hadir-btn" onClick={() => navigate(`/verifikator-lihat-daftar-hadir/${item.id_seminar}`)}>Lihat Daftar Hadir</button>
                                </div>

                                <div className="informasi-seminar-verifikasi-presensi">
                                    <span>{formatTanggal(item.tanggal)}</span>
                                    <span>|</span>
                                    <span>{item.waktu_mulai} - {item.waktu_selesai}</span>
                                </div>

                                <div className="dosen-info-verifikasi-presensi">
                                    <p><strong>Pembimbing:</strong>{" "} {item.dosen_pembimbing}</p>

                                    <p>
                                        <strong>Penguji:</strong>{" "} {item.dosen_penguji_1}
                                        <span className="separator-verifikasi-presensi">|</span>
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

export default VerifikasiPresensi;