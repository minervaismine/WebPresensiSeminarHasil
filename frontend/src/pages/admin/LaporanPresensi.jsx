import "../../styles/admin/LaporanPresensi.css";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function LaporanPresensi() {
    const navigate = useNavigate();

    // Tabel
    const [laporan, setLaporan] = useState([]);
    // Loading
    const [loading, setLoading] = useState(true);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const dataPerPage = 10;
    // Sort
    const [sortBy, setSortBy] = useState("nama");
    const [sortOrder, setSortOrder] = useState("asc");
    // Search
    const [search, setSearch] = useState("");
    // Filter
    const [showFilter, setShowFilter] = useState(false);
    const [angkatan, setAngkatan] = useState("");
    const [status, setStatus] = useState("");
    const [listAngkatan, setListAngkatan] = useState([]);

    const startData = totalData === 0 ? 0 : (currentPage - 1) * dataPerPage + 1;
    const endData = totalData === 0 ? 0 : Math.min(currentPage * dataPerPage, totalData);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchLaporan();
        }, 500);
        
        return () => clearTimeout(timer);
    }, [currentPage, sortBy, sortOrder, search, angkatan, status]);

    useEffect(() => {
        fetchAngkatan();
    }, []);

    const fetchLaporan = async () => {
        setLoading(true);

        try {
            const res = await api.get("/laporan-presensi",
                {
                    params: {
                        page: currentPage,
                        limit: dataPerPage,
                        sort_by: sortBy,
                        sort_order: sortOrder,
                        search: search,
                        angkatan: angkatan,
                        status: status
                    }
                }
            );

            setLaporan(res.data.data);
            setCurrentPage(res.data.pagination.page);
            setTotalPages(res.data.pagination.total_pages);
            setTotalData(res.data.pagination.total_data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAngkatan = async () => {
        try {
            const res = await api.get("/data-angkatan-laporan"
            );

            setListAngkatan(res.data);
        } catch(err){
            console.log(err);
        }
    }

    const getPagination = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(
                    1,
                    "...",
                    totalPages - 4,
                    totalPages - 3,
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

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
        setCurrentPage(1);
    };

    const handleExport = async () => {
        try {
            const response = await api.get("/laporan-presensi/export",
                {
                    params: {
                        search: search,
                        angkatan: angkatan,
                        status: status,
                        sort_by: sortBy,
                        sort_order: sortOrder
                    },
                    responseType: "blob"
                }
            );

            // Membuat file download
            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Laporan_Presensi.xlsx");

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.log(err);
            alert("Gagal mengunduh laporan!");
        }
    };

    return (
        <div className="page-menu-laporan-presensi-layout">
            {/* Navbar */}
            <nav className="navbar-menu-laporan-presensi">
                <button className="back-btn-laporan-presensi" onClick={() => navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-icon-laporan-presensi"/>
                    <span>Kembali</span>
                </button>

                <h1>LAPORAN PRESENSI</h1>
            </nav>

            {/* Export, Search Bar, Filter */}
            <div className="header-laporan-presensi-wrapper">
                <button className="export-btn" onClick={handleExport}>
                    <Icon icon="ic:round-download" className="export-icon"/>
                    <span>Export Ke Excel</span>
                </button>

                <div className="search-filter-laporan-presensi">
                    <form>
                        <div className="search-bar-laporan-presensi">
                            <Icon icon="radix-icons:magnifying-glass" className="search-icon-laporan-presensi"/>
                            <input className="search-bar-input-laporan-presensi" type="search" placeholder="Cari mahasiswa atau NIM" value={search} onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}}></input>
                        </div>
                    </form>

                    <div className="filter-dropdown-laporan-presensi-wrapper">
                        <button type="button" className="filter-dropdown-laporan-presensi" onClick={() => setShowFilter(!showFilter)}>
                            <div className="filter-content-laporan-presensi">
                                <Icon icon="mi:filter" className="filter-icon-laporan-presensi"/>
                                <span>Filter</span>
                            </div>
                        
                            <Icon icon="icon-park-outline:down" className="dropdown-icon-laporan-presensi"/>
                        </button>
                        
                        {/* Filter Dropdown */}
                        {showFilter && (
                            <div className="filter-menu-laporan-presensi">
                                <div className="filter-angkatan-laporan-presensi">
                                    <h3>Angkatan</h3>
    
                                    <label>
                                        <input type="checkbox" checked={angkatan === ""} onChange={() => {setAngkatan(""); setCurrentPage(1);}}></input>
                                        Semua
                                    </label>
    
                                    {listAngkatan.map((item) =>(
                                        <label key={item.angkatan}>
                                            <input type="checkbox" checked={angkatan === String(item.angkatan)} onChange={() => {setAngkatan(String(item.angkatan)); setCurrentPage(1);}}></input>
                                            <span>{item.angkatan}</span>
                                        </label>
                                    ))}
                                </div>
    
                                <div className="filter-status-laporan-presensi">
                                    <h3>Status</h3>
    
                                    <label>
                                        <input type="checkbox" checked={status === ""} onChange={() => {setStatus(""); setCurrentPage(1);}}></input>
                                        Semua
                                    </label>

                                    <label>
                                        <input type="checkbox" checked={status === "Memenuhi"} onChange={() => {setStatus("Memenuhi"); setCurrentPage(1);}}></input>
                                        Memenuhi
                                    </label>
    
                                    <label>
                                        <input type="checkbox" checked={status === "Belum Memenuhi"} onChange={() => {setStatus("Belum Memenuhi"); setCurrentPage(1);}}></input>
                                        Belum Memenuhi
                                    </label>
                                </div>                            
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabel */}
            <table className="tabel-laporan-presensi">
                <thead>
                    <tr>
                        <th>
                            <button className="sort-thead-laporan-presensi" onClick={() => handleSort("nama")}>
                                <span>Nama</span>
                                <Icon icon="uil:sort" className="sort-icon-laporan-presensi"/>
                            </button>
                        </th>
                        <th>
                            <button className="sort-thead-laporan-presensi" onClick={() => handleSort("nim")}>
                                <span>NIM</span>
                                <Icon icon="uil:sort" className="sort-icon-laporan-presensi"/>
                            </button>
                        </th>
                        <th>
                            <button className="sort-thead-laporan-presensi" onClick={() => handleSort("angkatan")}>
                                <span>Angkatan</span>
                                <Icon icon="uil:sort" className="sort-icon-laporan-presensi"/>
                            </button>
                        </th>
                        <th>Kehadiran</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="loading-state-laporan">Memuat daftar hadir...</td>
                        </tr>
                    ) : laporan.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="empty-state-laporan">Daftar hadir tidak ditemukan</td>
                        </tr>
                    ) : (
                        laporan.map((item) => (
                            <tr key={item.id_user}>
                                <td className="kolom-nama-laporan-presensi">{item.nama}</td>
                                <td className="kolom-nim-laporan-presensi">{item.nim}</td>
                                <td className="kolom-angkatan-laporan-presensi">{item.angkatan}</td>
                                <td className="kolom-kehadiran-laporan-presensi">{item.kehadiran}</td>
                                <td className="kolom-status-laporan-presensi">
                                    <span className={`status-presensi-laporan-presensi ${item.status === "Memenuhi" ? "memenuhi" : "belum-memenuhi"}`}>{item.status}</span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination-wrapper-laporan-presensi">
                <p className="page-description-laporan-presensi">Menampilkan {startData}-{endData} dari {totalData} data</p>

                <div className="pagination-laporan-presensi">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                        <Icon icon="ooui:previous-ltr" className="previous-icon-laporan-presensi"/>
                    </button>

                    {getPagination().map((item, index) => {
                        if (item === "...") {
                            return (
                                <span key={index} className="pagination-dots-kelola-data-seminar">...</span>
                            )
                        }

                        return (
                            <button key={index} className={currentPage === item ? "active" : ""} onClick={() => setCurrentPage(item)}>
                                {item}
                            </button>
                        );
                    })}

                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
                        <Icon icon="ooui:next-ltr" className="next-icon-laporan-presensi"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LaporanPresensi;