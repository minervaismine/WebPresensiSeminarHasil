import "../../styles/verifikator/RiwayatVerifikasi_LihatDetail.css";
import { Icon } from '@iconify/react';
import { CircularProgressbar, buildStyles,} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function LihatDetail() {
    const navigate = useNavigate();

    const { id_seminar } = useParams();
    console.log(id_seminar);

    // Card
    const [card, setCard] = useState({total_peserta: 0, total_pending: 0, total_valid: 0, total_invalid: 0});
    const totalPeserta = Number(card.total_peserta || 0);
    const totalValid = Number(card.total_valid || 0);
    const totalInvalid = Number(card.total_invalid || 0);
    const totalPending = Number(card.total_pending || 0);
    const telahDiverifikasi = totalValid + totalInvalid;
    const progress = totalPeserta > 0 ? (telahDiverifikasi / totalPeserta) * 100 : 0;
    // Tabel
    const [presensi, setPresensi] = useState([]);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalData, setTotalData] = useState(0);
    // Sort
    const [sortBy, setSortBy] = useState("waktu_scan");
    const [sortOrder, setSortOrder] = useState("desc");
    // Search
    const [search, setSearch] = useState("");
    // Filter
    const [showFilter, setShowFilter] = useState(false);
    const [filterStatus, setFilterStatus] = useState("");

    const dataPerPage = 5;

    const startData = totalData === 0 ? 0 : (currentPage - 1) * dataPerPage + 1;
    const endData = totalData === 0 ? 0 : Math.min(currentPage * dataPerPage, totalData);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDetail();
        }, 500);

        return () => clearTimeout(timer);
    }, [id_seminar, currentPage, sortBy, sortOrder, search, filterStatus]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterStatus]);

    const fetchDetail = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/riwayat-verifikasi/${id_seminar}`,
                {
                    params: {
                        page: currentPage,
                        limit: dataPerPage,
                        sort_by: sortBy,
                        sort_order: sortOrder,
                        search: search,
                        status_verifikasi: filterStatus,
                    }
                }
            );

            setPresensi(res.data.data);
            setCard(res.data.card);
            setCurrentPage(res.data.pagination.page);
            setTotalPages(res.data.pagination.total_pages);
            setTotalData(res.data.pagination.total_data);
        } catch(err){
            console.log(err);
        }
    };

    const formatStatus = (status) => {
        switch (status) {
            case "pending":
                return "Pending";
            case "valid":
                return "Valid";
            case "invalid":
                return "Invalid";
            default:
                return status;
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

    return (
        <div className="page-menu-lihat-detail-layout">
            {/* Navbar */}
            <nav className="navbar-menu-lihat-detail">
                <button className="back-btn-lihat-detail" onClick={() => navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-icon-lihat-detail"/>
                    <span>Kembali</span>
                </button>

                <h1>RIWAYAT VERIFIKASI</h1>
            </nav>

            {/* Judul, Card, Progress Bar */}
            <div className="ringkasan-wrapper">
                {/* Left Section */}
                <div className="ringkasan-left">
                    <h1 className="ringkasan-title">
                        Ringkasan Verifikasi
                    </h1>

                    <div className="summary-cards">
                        {/* Total Peserta */}
                        <div className="summary-card">
                            <div className="card-icon">
                                <Icon icon="bi:people-fill" className="people-icon-lihat-detail"/>
                            </div>

                            <div className="card-content">
                                <p className="card-label">Total Peserta</p>
                                <h2 className="card-value">{totalPeserta}</h2>
                            </div>
                        </div>

                        {/* Absen Pending */}
                        <div className="summary-card">
                            <div className="card-icon">
                                <Icon icon="tabler:clock-filled" className="clock-icon-lihat-detail"/>
                            </div>

                            <div className="card-content">
                                <p className="card-label">Absen Pending</p>
                                <h2 className="card-value">{totalPending}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="ringkasan-right">
                    <div className="progress-card">
                        {/* Donut Chart */}
                        <h3 className="chart-title">Progres Verifikasi</h3>

                        <div className="donut-wrapper">
                            <CircularProgressbar 
                                value={progress}
                                text={`${Math.round(progress)}%`}
                                strokeWidth={12}
                                styles={buildStyles({
                                    pathColor: "#2463EB",
                                    textColor: "#1E293B",
                                    trailColor: "#FFFFFF",
                                    strokeLinecap: "round",
                                    textSize: "14px",
                                })}
                            />
                        </div>

                        <p className="progress-text">
                            {telahDiverifikasi} / {totalPeserta} diverifikasi
                        </p>
                    </div>
                </div>
            </div>

            {/* Judul, Search Bar, Filter  */}
            <div className="daftar-hadir-wrapper">
                <h1 className="daftar-hadir-title">Daftar Hadir</h1>

                <div className="search-filter-lihat-detail">
                    <form>
                        <div className="search-bar-lihat-detail">
                            <Icon icon="radix-icons:magnifying-glass" className="search-icon-lihat-detail"/>
                            <input className="search-bar-input-lihat-detail" type="search" placeholder="Cari mahasiswa atau NIM" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                        </div>
                    </form>

                    <div className="filter-dropdown-lihat-detail-wrapper">
                        <button type="button" className="filter-dropdown-lihat-detail" onClick={() => setShowFilter(!showFilter)}>
                            <div className="filter-content-lihat-detail">
                                <Icon icon="mi:filter" className="filter-icon-lihat-detail"/>
                                <span>Filter</span>
                            </div>

                            <Icon icon="icon-park-outline:down" className="dropdown-icon-lihat-detail"/>
                        </button>

                        {/* Filter Dropdown */}
                        {showFilter && (
                            <div className="filter-menu-riwayat-verifikasi-lihat-detail">
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

            {/* Daftar Hadir */}
            <table className="tabel-riwayat-verifikasi">
                <thead>
                    <tr>
                        <th>
                            <button className="sort-thead-riwayat-verifikasi" onClick={() => handleSort("nama")}>
                                <span>Nama</span>
                                <Icon icon="uil:sort" className="sort-icon-riwayat-verifikasi"/>
                            </button>
                        </th>
                        <th>
                            <button className="sort-thead-riwayat-verifikasi" onClick={() => handleSort("nim")}>
                                <span>NIM</span>
                                <Icon icon="uil:sort" className="sort-icon-riwayat-verifikasi"/>
                            </button>
                        </th>
                        <th>
                            <button className="sort-thead-riwayat-verifikasi" onClick={() => handleSort("waktu_scan")}>
                                <span>Waktu Scan</span>
                                <Icon icon="uil:sort" className="sort-icon-riwayat-verifikasi"/>
                            </button>
                        </th>
                        <th>Jarak Lokasi</th>
                        <th>Status</th>
                        <th>
                            <button className="sort-thead-riwayat-verifikasi" onClick={() => handleSort("waktu_verifikasi")}>
                                <span>Waktu Verifikasi</span>
                                <Icon icon="uil:sort" className="sort-icon-riwayat-verifikasi"/>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {presensi.map((item) => (
                        <tr key={item.id_presensi}>
                            <td className="kolom-nama-riwayat-verifikasi">{item.nama}</td>
                            <td className="kolom-nim-riwayat-verifikasi">{item.nim}</td>
                            <td className="kolom-waktu-scan-riwayat-verifikasi">{item.waktu_scan}</td>
                            <td className="kolom-jarak-lokasi-riwayat-verifikasi">
                                <span className="status-lokasi-riwayat-verifikasi dekat">5 m</span>
                            </td>
                            <td className="kolom-status-presensi-riwayat-verifikasi">
                                <span className={`badge-status-presensi ${item.status_verifikasi}`}>{formatStatus(item.status_verifikasi)}</span>
                            </td>
                            <td className="kolom-waktu-verifikasi">{item.waktu_verifikasi}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination-wrapper-riwayat-verifikasi">
                <p className="page-description-riwayat-verifikasi">Menampilkan {startData}-{endData} dari {totalData} data</p>

                <div className="pagination-riwayat-verifikasi">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                        <Icon icon="ooui:previous-ltr" className="previous-icon-riwayat-verifikasi"/>
                    </button>

                    {getPagination().map((item, index) =>
                        item === "..." ? (
                            <span key={index} className="pagination-dots-riwayat-verifikasi">...</span>
                        ) : (
                            <button key={index} className={currentPage === item ? "active" : ""} onClick={() => setCurrentPage(item)}>
                                {item}
                            </button>
                        )
                    )}

                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
                        <Icon icon="ooui:next-ltr" className="next-icon-riwayat-verifikasi"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LihatDetail;