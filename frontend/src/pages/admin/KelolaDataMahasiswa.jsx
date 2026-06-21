import "../../styles/admin/KelolaDataMahasiswa.css";
import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KelolaDataMahasiswa() {
    const navigate = useNavigate();
    const [showFormAddStudent, setShowFormAddStudent] = useState(false);
    const [showFormDeleteStudent, setShowFormDeleteStudent] = useState(false);
    const [dataMahasiswa, setDataMahasiswa] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("nama");
    const [sortOrder, setSortOrder] = useState("asc");

    const [showFilter, setShowFilter] = useState(false);
    const [selectedYears, setSelectedYears] = useState([]);
    const [angkatanList, setAngkatanList] = useState([]);

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
  
    return (
    <div className="page-menu-kelola-data-mahasiswa-layout">
        {/* Navbar */}
        <nav className="navbar-menu-kelola-data-mahasiswa">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <Icon icon="weui:back-filled" className="back-icon"/>
                <span>Kembali</span>
            </button>

            <h1>KELOLA DATA MAHASISWA</h1>
        </nav>

        {/* Export, Search Bar, Filter */}
        <div className="header-kelola-data-mahasiswa-wrapper">
            <button className="add-mahasiswa-btn" onClick={() => setShowFormAddStudent(true)}>
                <Icon icon="mingcute:add-fill" className="add-mahasiswa-icon"/>
                <span>Tambah Mahasiswa</span>
            </button>

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
                                <button className="aksi-btn-kelola-data-mahasiswa edit-btn">
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
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    <Icon icon="ooui:previous-ltr" className="previous-icon-kelola-data-mahasiswa"/>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button key={index + 1} className={currentPage === index + 1 ? "active" : ""} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}

                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                    <Icon icon="ooui:next-ltr" className="next-icon-kelola-data-mahasiswa"/>
                </button>
            </div>
        </div>

        {/* Form Tambah Mahasiswa */}
        {showFormAddStudent && (
            <div className="modal-overlay" onClick={() => setShowFormAddStudent(false)}>
                <div className="form-add-student" onClick={(e) => e.stopPropagation()}>
                    <div className="form-header-wrapper">
                        <div className="form-header">
                            <Icon icon="ph:student-fill" className="student-icon"/>
                            <span>Data Mahasiswa</span>
                        </div>
                        <button className="close-form-btn" onClick={() => setShowFormAddStudent(false)}>
                            <Icon icon="mingcute:close-fill" />
                        </button>
                    </div>

                    <div className="form-group-name">
                        <label>Nama Lengkap</label>
                        <input type="text" placeholder="Masukkan nama lengkap mahasiswa"/>
                    </div>

                    <div className="form-group-nim">
                        <label>NIM</label>
                        <input type="text" placeholder="Masukkan NIM mahasiswa"/>
                    </div>

                    <div className="form-group-angkatan">
                        <label>Angkatan</label>
                        <input type="number" placeholder="Masukkan tahun angkatan mahasiswa"/>
                    </div>

                    <div className="add-btn-wrapper-kelola-data-mahasiswa">
                        <button className="add-btn-form">
                        <Icon icon="mingcute:add-fill" className="add-icon-form"/>
                        <span>Tambah Mahasiswa</span>
                    </button>
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