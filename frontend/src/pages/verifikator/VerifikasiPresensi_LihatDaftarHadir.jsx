import "../../styles/verifikator/VerifikasiPresensi_LihatDaftarHadir.css";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function VerifikasiPresensi_LihatDaftarHadir() {
    const navigate = useNavigate();

    const { id_seminar } = useParams();
    console.log(id_seminar)

    const user = JSON.parse(localStorage.getItem("user"));
    const idVerifikator = user?.id_user;

    // Menampilkan detail berdasarkan id seminar
    const [presensi, setPresensi] = useState([]);
    // Loading
    const [loading, setLoading] = useState(true);
    // Detail Seminar
    const [seminar, setSeminar] = useState({});
    // Data total peserta
    const [totalPeserta, setTotalPeserta] = useState(0);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalData, setTotalData] = useState(0);
    // Sort
    const [sortBy, setSortBy] = useState("waktu_scan");
    const [sortOrder, setSortOrder] = useState("desc");
    // Search
    const [search, setSearch] = useState("");
    // Dropdown Status
    const [openDropdown, setOpenDropdown] = useState(null);
    //Filter
    const [filterStatus, setFilterStatus] = useState("");
    const [showFilter, setShowFilter] = useState(false);

    const dataPerPage = 5;

    const startData = totalData === 0 ? 0 : (currentPage - 1) * dataPerPage + 1;
    const endData = totalData === 0 ? 0 : Math.min(currentPage * dataPerPage, totalData);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDaftarHadir();
        }, 200);

        return () => clearTimeout(timer);
    }, [currentPage, sortBy, sortOrder, search, filterStatus]);

    const fetchDaftarHadir = async () => {
        setLoading(true);

        try {
            const res = await api.get(`/verifikator-lihat-daftar-hadir/${id_seminar}`,
                {
                    params:{
                        page: currentPage,
                        limit: dataPerPage,
                        sort_by: sortBy,
                        sort_order: sortOrder,
                        search: search,
                        status_verifikasi: filterStatus
                    }
                }
            );

            setPresensi(res.data.data);
            setSeminar(res.data.seminar);
            setTotalPeserta(res.data.total_peserta);
            setCurrentPage(res.data.pagination.page);
            setTotalPages(res.data.pagination.total_pages);
            setTotalData(res.data.pagination.total_data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (idPresensi, status) => {
        setPresensi(prev =>
            prev.map(item =>
                item.id_presensi === idPresensi
                    ? { ...item, status_verifikasi: status }
                    : item
            )
        );

        try {
            await api.put(`/verifikator-update-status-presensi/${idPresensi}`,
                {
                    status
                }
            );
            
            await fetchDaftarHadir();
        }
        catch (err) {
            console.log(err);

            await fetchDaftarHadir();
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Belum Dimulai":
                return "belum-dimulai";
            case "Sedang Berlangsung":
                return "sedang-berlangsung";
            case "Selesai":
                return "selesai";
            default:
                return "";
        }
    };

    const getPagination = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                pages.push(1,2,3,4,5, "...", totalPages);
            }
            else if (currentPage >= totalPages - 3) {
                pages.push(
                    1,
                    "...",
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            }
            else {
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

    const handleSort = (column) => {
        if (sortBy === column) {
            // Klik kolom yang sama -> ubah asc ke desc
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Klik kolom berbeda
            setSortBy(column);
            setSortOrder("asc");
        }

        setCurrentPage(1);
    };

    const formatTanggal = (tanggal) => {
        if (!tanggal) return "-";
        const d = new Date(tanggal);
        if (isNaN(d.getTime())) return "-";
        
        return d.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatWaktuScan = (waktu) => {
        return new Date(waktu).toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="page-menu-verifikator-lihat-daftar-hadir-layout">
            {/* Navbar */}
            <nav className="navbar-menu-verifikator-lihat-daftar-hadir">
                <button className="back-btn-verifikator-lihat-daftar-hadir" onClick={() => navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-icon-verifikator-lihat-daftar-hadir"/>
                    <span>Kembali</span>
                </button>

                <h1>VERIFIKASI PRESENSI</h1>
            </nav>

            {/* Detail Seminar */}
            <div className="detail-seminar-wrapper">
                {/* Left */}
                <div className="left-content-detail-seminar">
                    <div className="content-seminar-verifikator-lihat-daftar-hadir">
                        <h1 className="nama-mahasiswa-verifikator-lihat-daftar-hadir">{seminar.nama}</h1>
                        <div className="jadwal-seminar-verifikator-lihat-daftar-hadir">
                            <span>{formatTanggal(seminar.tanggal)}</span>
                            <span>|</span>
                            <span>{seminar.waktu_mulai} - {seminar.waktu_selesai}</span>
                        </div>

                        <span className={`status-badge-verifikator-lihat-daftar-hadir ${getStatusClass(seminar.status_seminar)}`}>{seminar.status_seminar}</span>
                    </div>
                </div>
                
                {/* Right */}
                <div className="right-content-verifikator-lihat-daftar-hadir">
                    <div className="stat-card-verifikator-lihat-daftar-hadir">
                        <div className="stat-content-verifikator-lihat-daftar-hadir">
                            <h3>Total Peserta</h3>
                            <h1>{totalPeserta}</h1>
                        </div>

                        <div className="stat-icon-wrapper-verifikator-lihat-daftar-hadir">
                            <Icon icon="bi:people-fill" className="people-icon-verifikator-lihat-daftar-hadir"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Judul, Search Bar, Filter  */}
            <div className="daftar-hadir-wrapper-verifikator-lihat-daftar-hadir">
                <h1 className="daftar-hadir-title-verifikator-lihat-daftar-hadir">Daftar Hadir</h1>

                <div className="search-filter-verifikator-lihat-daftar-hadir">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="search-bar-verifikator-lihat-daftar-hadir">
                            <Icon icon="radix-icons:magnifying-glass" className="search-icon-verifikator-lihat-daftar-hadir"/>
                            <input className="search-bar-input-verifikator-lihat-daftar-hadir" type="search" placeholder="Cari mahasiswa atau NIM" value={search} onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}}></input>
                        </div>
                    </form>

                    <div className="filter-dropdown-verifikator-lihat-daftar-hadir-wrapper">
                        <button type="button" className="filter-dropdown-verifikator-lihat-daftar-hadir" onClick={() => setShowFilter(!showFilter)}>   
                            <div className="filter-content-verifikator-lihat-daftar-hadir">
                                <Icon icon="mi:filter" className="filter-icon-verifikator-lihat-daftar-hadir"/>
                                <span>Filter</span>
                            </div>

                            <Icon icon="icon-park-outline:down" className="dropdown-icon-verifikator-lihat-daftar-hadir"/>
                        </button>

                        {/* Filter Dropdown */}
                        {showFilter && (
                            <div className="filter-menu-verifikator-lihat-daftar-hadir">
                                <h3>Status</h3>

                                <label>
                                    <input type="checkbox" name="statusFilter" checked={filterStatus === ""} onChange={() => {setFilterStatus(""); setCurrentPage(1);}}></input>
                                    Semua
                                </label>

                                <label>
                                    <input type="checkbox" name="statusFilter" checked={filterStatus === "pending"} onChange={() => {setFilterStatus("pending"); setCurrentPage(1);}}></input>
                                    Pending
                                </label>

                                <label>
                                    <input type="checkbox" name="statusFilter" checked={filterStatus === "valid"} onChange={() => {setFilterStatus("valid"); setCurrentPage(1);}}></input>
                                    Valid
                                </label>

                                <label>
                                    <input type="checkbox" name="statusFilter" checked={filterStatus === "invalid"} onChange={() => {setFilterStatus("invalid"); setCurrentPage(1);}}></input>
                                    Invalid
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabel */}
            <table className="tabel-daftar-hadir-verifikator">
                <thead>
                    <tr>
                        <th>
                            <button className="sort-thead-verifikator-lihat-daftar-hadir" onClick={() => handleSort("nama")}>
                                <span>Nama</span>
                                <Icon icon="uil:sort" className="sort-icon-verifikator-lihat-daftar-hadir"/>
                            </button>
                        </th>
                        <th>
                            <button className="sort-thead-verifikator-lihat-daftar-hadir" onClick={() => handleSort("nim")}>
                                <span>NIM</span>
                                <Icon icon="uil:sort" className="sort-icon-verifikator-lihat-daftar-hadir"/>
                            </button>
                        </th>
                        <th>
                            <button className="sort-thead-verifikator-lihat-daftar-hadir" onClick={() => handleSort("waktu_scan")}>
                                <span>Waktu Scan</span>
                                <Icon icon="uil:sort" className="sort-icon-verifikator-lihat-daftar-hadir"/>
                            </button>
                        </th>
                        <th>Jarak Lokasi</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="loading-state-verifikasi-presensi-lihat-daftar-hadir">Memuat daftar hadir...</td>
                        </tr>
                    ) : presensi.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="empty-state-verifikasi-presensi-lihat-daftar-hadir">Daftar hadir tidak ditemukan</td>
                        </tr>
                    ) : (
                        presensi.map((item) => (
                            <tr key={item.id_presensi}>
                                <td className="kolom-nama-verifikator-lihat-daftar-hadir">{item.nama}</td>
                                <td className="kolom-nim-verifikator-lihat-daftar-hadir">{item.nim}</td>
                                <td className="kolom-waktu-scan-verifikator-lihat-daftar-hadir">{formatWaktuScan(item.waktu_scan)}</td>
                                <td className="kolom-jarak-lokasi-verifikator-lihat-daftar-hadir">
                                    <span className={`status-lokasi-verifikator-lihat-daftar-hadir ${item.status_lokasi}`}>{item.jarak} m</span>
                                </td>
                                <td className="kolom-status-presensi-verifikator-lihat-daftar-hadir">
                                    <div className="custom-dropdown">
                                        <button className={`dropdown-button ${item.status_verifikasi}`} onClick={() => setOpenDropdown(openDropdown === item.id_presensi ? null : item.id_presensi)}>
                                            <span>{item.status_verifikasi.charAt(0).toUpperCase() + item.status_verifikasi.slice(1)}</span>
                                            <Icon icon="icon-park-outline:down" className="status-dropdown-icon"/>
                                        </button>

                                        {openDropdown === item.id_presensi && (
                                            <div className="status-dropdown-menu">
                                                {["pending", "valid", "invalid"].map((status) => (
                                                    <div key={status} className="status-dropdown-item" onClick={() => {handleStatusChange(item.id_presensi, status); setOpenDropdown(null);}}>
                                                        {status === item.status_verifikasi}
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination-wrapper-verifikator-lihat-daftar-hadir">
                <p className="page-description-verifikator-lihat-daftar-hadir">Menampilkan {startData}-{endData} dari {totalData} data</p>

                <div className="pagination-verifikator-lihat-daftar-hadir">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                        <Icon icon="ooui:previous-ltr" className="previous-icon-verifikator-lihat-daftar-hadir"/>
                    </button>

                    {getPagination().map((item, index) =>
                        item === "..." ? (
                            <span key={index} className="pagination-dots-verifikator-lihat-daftar-hadir">...</span>
                        ) : (
                            <button key={index} className={currentPage === item ? "active" : ""} onClick={() => setCurrentPage(item)}>
                                {item}
                            </button>
                        )
                    )}

                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
                        <Icon icon="ooui:next-ltr" className="next-icon-verifikator-lihat-daftar-hadir"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VerifikasiPresensi_LihatDaftarHadir;