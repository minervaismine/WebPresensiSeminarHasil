import "../../styles/mahasiswa/LihatDaftarHadir.css";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function LihatDaftarHadir() {
    const navigate = useNavigate();

    const { idSeminar } = useParams();

    // Loading
    const [loading, setLoading] = useState(true);
    // Tabel
    const [daftarHadir, setDaftarHadir] = useState([]);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalData, setTotalData] = useState(0);
    // Sort
    const [sortBy, setSortBy] = useState("waktu_scan");
    const [sortOrder, setSortOrder] = useState("desc");
    // Search
    const [search, setSearch] = useState("");

    const dataPerPage = 10;

    const startData = totalData === 0 ? 0 : (currentPage - 1) * dataPerPage + 1;
    const endData = totalData === 0 ? 0 : Math.min(currentPage * dataPerPage, totalData);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDaftarHadir();
        }, 500);

        return () => clearTimeout(timer);
    }, [currentPage, sortBy, sortOrder, search]);

    const fetchDaftarHadir = async (page = currentPage, searchKeyword = search) => {
        try {
            setLoading(true);

            const res = await api.get(`/daftar-hadir/${idSeminar}`,
                {
                    params:{
                        page,
                        limit: dataPerPage,
                        sort_by: sortBy,
                        sort_order: sortOrder,
                        search: searchKeyword
                    }
                }
            );

            setDaftarHadir(res.data.data);
            setCurrentPage(res.data.pagination.page);
            setTotalPages(res.data.pagination.total_pages);
            setTotalData(res.data.pagination.total);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
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
        return new Date(tanggal).toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="page-lihat-daftar-hadir-layout">
            {/* Navbar */}
            <nav className="navbar-menu-lihat-daftar-hadir">
                <button className="back-btn-lihat-daftar-hadir" onClick={() => navigate(-1)}>
                    <Icon icon="weui:back-filled" className="back-icon-lihat-daftar-hadir"/>
                    <span>Kembali</span>
                </button>

                <h1>SEMINAR SAYA</h1>
            </nav>

            {/* Header */}
            <div className="header-wrapper-lihat-daftar-hadir">
                <h1 className="page-title-lihat-daftar-hadir">Daftar Hadir</h1>

                <form>
                    <div className="search-bar-lihat-daftar-hadir">
                        <Icon icon="radix-icons:magnifying-glass" className="search-daftar-hadir-icon"/>
                        <input className="search-bar-input-lihat-daftar-hadir" type="search" placeholder="Cari mahasiswa atau NIM" value={search} onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}}></input>
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="tabel-wrapper-mahasiswa-lihat-daftar-hadir">
                <table className="tabel-daftar-hadir-penyelenggara-seminar">
                    <thead>
                        <tr>
                            <th>
                                <button className="sort-thead-lihat-daftar-hadir" onClick={() => handleSort("nama")}>
                                    <span>Nama</span>
                                    <Icon icon="uil:sort" className="sort-icon-lihat-daftar-hadir"/>
                                </button>
                            </th>
                            <th>
                                <button className="sort-thead-lihat-daftar-hadir" onClick={() => handleSort("nim")}>
                                    <span>NIM</span>
                                    <Icon icon="uil:sort" className="sort-icon-lihat-daftar-hadir"/>
                                </button>
                            </th>
                            <th>
                                <button className="sort-thead-lihat-daftar-hadir" onClick={() => handleSort("waktu_scan")}>
                                    <span>Waktu Scan</span>
                                    <Icon icon="uil:sort" className="sort-icon-lihat-daftar-hadir"/>
                                </button>
                            </th>
                            <th>Jarak Lokasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="loading-state-lihat-daftar-hadir">Memuat data...</td>
                            </tr>
                        ) : daftarHadir.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="empty-state-lihat-daftar-hadir">Tidak ada data</td>
                            </tr>
                        ) : (
                            daftarHadir.map((item) => (
                                <tr key={item.id_presensi}>
                                    <td className="kolom-nama-lihat-daftar-hadir">{item.nama}</td>
                                    <td className="kolom-nim-lihat-daftar-hadir">{item.nim}</td>
                                    <td className="kolom-waktu-scan-lihat-daftar-hadir">{formatTanggal(item.waktu_scan)}</td>
                                    <td className="kolom-jarak-lokasi-lihat-daftar-hadir">
                                        <span className={`status-lokasi ${item.status_lokasi}`}>{item.jarak} m</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination */}
            <div className="pagination-wrapper-lihat-daftar-hadir">
                <p className="page-description-lihat-daftar-hadir">Menampilkan {startData}-{endData} dari {totalData} data</p>

                <div className="pagination-lihat-daftar-hadir">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                        <Icon icon="ooui:previous-ltr" className="previous-icon-lihat-daftar-hadir"/>
                    </button>

                    {getPagination().map((item, index) =>
                        item === "..." ? (
                            <span key={index} className="pagination-dots-lihat-daftar-hadir">...</span>
                        ) : (
                            <button key={index} className={currentPage === item ? "active" : ""} onClick={() => setCurrentPage(item)}>
                                {item}
                            </button>
                        )
                    )}

                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
                        <Icon icon="ooui:next-ltr" className="next-icon-lihat-daftar-hadir"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LihatDaftarHadir;