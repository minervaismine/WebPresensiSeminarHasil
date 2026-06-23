import "../../styles/admin/KelolaDataMahasiswa.css";
import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KelolaDataMahasiswa() {
    const navigate = useNavigate();

    // Modal
    const [showFormEditStudent, setShowFormEditStudent] = useState(false);
    const [showFormDeleteStudent, setShowFormDeleteStudent] = useState(false);
    // Tabel
    const [dataMahasiswa, setDataMahasiswa] = useState([]);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalData, setTotalData] = useState(0);
    // Search
    const [search, setSearch] = useState("");
    // Sort
    const [sortBy, setSortBy] = useState("nama");
    const [sortOrder, setSortOrder] = useState("asc");
    // Filter
    const [showFilter, setShowFilter] = useState(false);
    const [selectedYears, setSelectedYears] = useState([]);
    const [angkatanList, setAngkatanList] = useState([]);
    // Data yang diedit pada form edit
    const [selectedMahasiswa, setSelectedMahasiswa] = useState({
        id_user: "",
        nama: "",
        nim: "",
        angkatan: "",
    });

    const dataPerPage = 10;

    const startData = totalData === 0 ? 0 : (currentPage - 1) * dataPerPage + 1;
    const endData = totalData === 0 ? 0 : Math.min(currentPage * dataPerPage, totalData);

    useEffect(() => {
        fetchMahasiswa(currentPage);
    }, [currentPage, search, sortBy, sortOrder, selectedYears]);

    useEffect(() => {
        fetchAngkatan();
    }, []);

    const fetchMahasiswa = async (page = 1, searchKeyword = search) => {
        try {
            const response = await axios.get(
                "http://localhost:5000/data-mahasiswa",
            {
                params: {
                    page,
                    limit: dataPerPage,
                    search: searchKeyword,
                    sort_by: sortBy,
                    sort_order: sortOrder,
                    angkatan:selectedYears.join(",")
                },
            }
        );

        setDataMahasiswa(response.data.data);
        setCurrentPage(response.data.page);
        setTotalPages(response.data.total_pages);
        setTotalData(response.data.total);
        } catch (error) {
            console.log(error);
        }
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

    const fetchAngkatan = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/data-angkatan"
            );
            setAngkatanList(response.data);
        } catch(error){
            console.log(error);
        }
    }

    const handleYearChange = (year) => {
        if (selectedYears.includes(year)) {
            setSelectedYears(
                selectedYears.filter(y => y !== year)
            );
        } else {
            setSelectedYears([
                ...selectedYears,
                year
            ]);
        }
        setCurrentPage(1);
    };

    const openEditForm = (mahasiswa) => {
        setSelectedMahasiswa(mahasiswa);
        setShowFormEditStudent(true);
    };

    const handleUpdateMahasiswa = async () => {
        try {
            await axios.put(
                `http://localhost:5000/edit-mahasiswa/${selectedMahasiswa.id_user}`,
                selectedMahasiswa
            );

            alert("Data berhasil diperbarui");
            setShowFormEditStudent(false);
            fetchMahasiswa(currentPage);
        } catch(error) {
            console.log(error);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;

        setSelectedMahasiswa(prev => ({
            ...prev,
            [name]: value
        }));
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
                    totalPage - 4,
                    totalPage - 3,
                    totalPage - 2,
                    totalPage - 1,
                    totalPage
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
  
    return (
    <div className="page-menu-kelola-data-mahasiswa-layout">
        {/* Navbar */}
        <nav className="navbar-menu-kelola-data-mahasiswa">
            <button className="back-btn-kelola-data-mahasiswa" onClick={() => navigate(-1)}>
                <Icon icon="weui:back-filled" className="back-icon-kelola-data-mahasiswa"/>
                <span>Kembali</span>
            </button>

            <h1>KELOLA DATA MAHASISWA</h1>
        </nav>

        {/* Export, Search Bar, Filter */}
        <div className="header-kelola-data-mahasiswa-wrapper">
            <div className="search-filter-kelola-data-mahasiswa">
                <form>
                    <div className="search-bar-kelola-data-mahasiswa">
                        <Icon icon="radix-icons:magnifying-glass" className="search-icon-kelola-data-mahasiswa"/>
                        <input className="search-bar-input-kelola-data-mahasiswa" type="search" placeholder="Cari mahasiswa atau NIM" value={search} onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}}></input>
                    </div>
                </form>

                <div className="filter-dropdown-kelola-data-mahasiswa-wrapper">
                    <button type="button" className="filter-dropdown-kelola-data-mahasiswa" onClick={() => setShowFilter(!showFilter)}> 
                        <div className="filter-content-kelola-data-mahasiswa">
                            <Icon icon="mi:filter" className="filter-icon-kelola-data-mahasiswa"/>
                            <span>Filter</span>
                        </div>

                        <Icon icon="icon-park-outline:down" className="dropdown-icon-kelola-data-mahasiswa"/>
                    </button>   

                    {/* Filter Dropdown */}
                    {showFilter && (
                        <div className="filter-menu-kelola-data-mahasiswa">
                            <h3>Angkatan</h3>

                            <label>
                                <input type="checkbox" checked={selectedYears.length === 0} onChange={() => setSelectedYears([])}></input>
                                Semua
                            </label>

                            {angkatanList.map((item) => (
                                <label key={item.angkatan}>
                                    <input type="checkbox" checked={selectedYears.includes(item.angkatan)} onChange={() => handleYearChange(item.angkatan)}></input>
                                    {item.angkatan}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Tabel */}
        <table className="tabel-mahasiswa-kelola-data-mahasiswa">
            <thead>
                <tr>
                    <th>
                        <button className="sort-thead-kelola-data-mahasiswa" onClick={() => handleSort("nama")}>
                            <span>Nama</span>
                            <Icon icon="uil:sort" className="sort-icon-kelola-data-mahasiswa"/>
                        </button>
                    </th>
                    <th>
                        <button className="sort-thead-kelola-data-mahasiswa" onClick={() => handleSort("nim")}>
                            <span>NIM</span>
                            <Icon icon="uil:sort" className="sort-icon-kelola-data-mahasiswa"/>
                        </button>
                    </th>
                    <th>
                        <button className="sort-thead-kelola-data-mahasiswa" onClick={() => handleSort("angkatan")}>
                            <span>Angkatan</span>
                            <Icon icon="uil:sort" className="sort-icon-kelola-data-mahasiswa"/>
                        </button>
                    </th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {dataMahasiswa.map((item) => (
                    <tr key={item.id_user}>
                        <td className="kolom-nama-kelola-data-mahasiswa">{item.nama}</td>
                        <td className="kolom-nim-kelola-data-mahasiswa">{item.nim}</td>
                        <td className="kolom-angkatan-kelola-data-mahasiswa">{item.angkatan}</td>
                        <td className="kolom-aksi-kelola-data-mahasiswa">
                            <div className="btn-aksi-wrapper-kelola-data-mahasiswa">
                                <button className="aksi-btn-kelola-data-mahasiswa edit-btn" onClick={() => openEditForm(item)}>
                                    <Icon icon="boxicons:pencil-filled" className="aksi-icon-kelola-data-mahasiswa"/>
                                </button>

                                <button className=" aksi-btn-kelola-data-mahasiswa delete-btn" onClick={() => setShowFormDeleteStudent(true)}>
                                    <Icon icon="tabler:trash-filled" className="aksi-icon-kelola-data-mahasiswa"/>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-wrapper-kelola-data-mahasiswa">
            <p className="page-description-kelola-data-mahasiswa">Menampilkan {startData}-{endData} dari {totalData} data</p>

            <div className="pagination-kelola-data-mahasiswa">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                    <Icon icon="ooui:previous-ltr" className="previous-icon-kelola-data-mahasiswa"/>
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
                    <Icon icon="ooui:next-ltr" className="next-icon-kelola-data-mahasiswa"/>
                </button>
            </div>
        </div>

        {/* Form Edit Mahasiswa */}
        {showFormEditStudent && (
            <div className="modal-overlay" onClick={() => setShowFormEditStudent(false)}>
                <div className="form-edit-student" onClick={(e) => e.stopPropagation()}>
                    <div className="form-header-wrapper">
                        <div className="form-header">
                            <Icon icon="ph:student-fill" className="student-icon"/>
                            <span>Data Mahasiswa</span>
                        </div>
                        <button className="close-form-btn" onClick={() => setShowFormEditStudent(false)}>
                            <Icon icon="mingcute:close-fill" />
                        </button>
                    </div>

                    <div className="form-group-name">
                        <label>Nama Lengkap</label>
                        <input name="nama" value={selectedMahasiswa.nama} onChange={handleEditChange} placeholder="Masukkan nama lengkap mahasiswa"/>
                    </div>

                    <div className="form-group-nim">
                        <label>NIM</label>
                        <input name="nim" value={selectedMahasiswa.nim} onChange={handleEditChange} placeholder="Masukkan NIM mahasiswa"/>
                    </div>

                    <div className="form-group-angkatan">
                        <label>Angkatan</label>
                        <input name="angkatan" value={selectedMahasiswa.angkatan} onChange={handleEditChange} placeholder="Masukkan tahun angkatan mahasiswa"/>
                    </div>

                    <div className="edit-btn-wrapper-kelola-data-mahasiswa">
                        <button className="edit-btn-form" onClick={handleUpdateMahasiswa}>Simpan Perubahan</button>
                    </div>
                </div>
            </div>
        )}

        {/* Modal Delete Data Mahasiswa */}
        {showFormDeleteStudent && (
            <div className="modal-overlay" onClick={() => setShowFormDeleteStudent(false)}>
                <div className="modal-delete-kelola-data-mahasiswa" onClick={(e) => e.stopPropagation()}>
                    <div className="warning-icon-wrapper-kelola-data-mahasiswa">
                        <Icon icon="ic:round-warning" className="warning-icon-kelola-data-mahasiswa"/>
                    </div>

                    <h2 className="modal-delete-title-kelola-data-mahasiswa">Hapus Data</h2>

                    <p className="modal-delete-description-kelola-data-mahasiswa">Apakah Anda yakin ingin menghapus data ini?</p>

                    <div className="btn-wrapper-modal-delete-kelola-data-mahasiswa">
                        <button className="modal-batal-btn-kelola-data-mahasiswa" onClick={() => setShowFormDeleteStudent(false)}>Batal</button>
                        <button className="modal-delete-btn-kelola-data-mahasiswa">Hapus</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default KelolaDataMahasiswa;