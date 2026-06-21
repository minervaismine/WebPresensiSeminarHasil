import "../../styles/admin/KelolaDataMahasiswa.css";
import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KelolaDataMahasiswa() {
    const [showFormAddStudent, setShowFormAddStudent] = useState(false);
    const [showFormDeleteStudent, setShowFormDeleteStudent] = useState(false);
    const [dataMahasiswa, setDataMahasiswa] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchMahasiswa();
    }, []);

    const fetchMahasiswa = async () => {
        try {
            const response = await axios.get("http://localhost:5000/data-mahasiswa");

            setDataMahasiswa(response.data);
        } catch (error) {
            console.log(error);
        }
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
                        <input className="search-bar-input-kelola-data-mahasiswa" type="search" placeholder="Cari mahasiswa atau NIM"></input>
                    </div>
                </form>

                <div className="filter-dropdown-kelola-data-mahasiswa">
                    <div className="filter-content-kelola-data-mahasiswa">
                        <Icon icon="mi:filter" className="filter-icon-kelola-data-mahasiswa"/>
                        <span>Filter</span>
                    </div>

                    <Icon icon="icon-park-outline:down" className="dropdown-icon-kelola-data-mahasiswa"/>
                </div>
            </div>
        </div>

        {/* Tabel */}
        <table className="tabel-mahasiswa-kelola-data-mahasiswa">
            <thead>
                <tr>
                    <th>
                        <button className="sort-thead-kelola-data-mahasiswa">
                            <span>Nama</span>
                            <Icon icon="uil:sort" className="sort-icon-kelola-data-mahasiswa"/>
                        </button>
                    </th>
                    <th>
                        <button className="sort-thead-kelola-data-mahasiswa">
                            <span>NIM</span>
                            <Icon icon="uil:sort" className="sort-icon-kelola-data-mahasiswa"/>
                        </button>
                    </th>
                    <th>
                        <button className="sort-thead-kelola-data-mahasiswa">
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
            <p className="page-description-kelola-data-mahasiswa">Menampilkan 1-10 dari 50 data</p>

            <div className="pagination-kelola-data-mahasiswa">
                <a href="#">
                    <Icon icon="ooui:previous-ltr" className="previous-icon-kelola-data-mahasiswa"/>
                </a>
                <a href="#" className="active">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">
                    <Icon icon="ooui:next-ltr" className="next-icon-kelola-data-mahasiswa"/>
                </a>
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