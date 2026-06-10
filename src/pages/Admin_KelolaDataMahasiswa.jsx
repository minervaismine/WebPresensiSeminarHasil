import "../styles/Admin_KelolaDataMahasiswa.css";
import { Icon } from '@iconify/react';
import { useState } from "react";

function KelolaDataMahasiswa() {
    const [showFormAddStudent, setShowFormAddStudent] = useState(false);
    const [showFormDeleteStudent, setShowFormDeleteStudent] = useState(false);
  
    return (
    <div className="page-menu-kelola-data-mahasiswa-layout">
        {/* Navbar */}
        <nav className="navbar-menu-kelola-data-mahasiswa">
            <button className="back-btn">
                <Icon icon="weui:back-filled" className="back-icon"/>
                <span>Kembali</span>
            </button>

            <h1>KELOLA DATA MAHASISWA</h1>
        </nav>

        {/* Export, Search Bar, Filter */}
        <div className="header-kelola-data-mahasiswa-wrapper">
            <button className="add-mahasiswa-btn" onClick={() => setShowFormAddStudent(true)}>
                <Icon icon="mingcute:add-fill" className="add-icon"/>
                <span>Tambah Mahasiswa</span>
            </button>

            <div className="search-filter">
                <form>
                    <div className="search-bar">
                        <Icon icon="radix-icons:magnifying-glass" className="search-icon"/>
                        <input className="search-bar-input" type="search" placeholder="Cari mahasiswa atau NIM"></input>
                    </div>
                </form>

                <div className="filter-dropdown">
                    <div className="filter-content">
                        <Icon icon="mi:filter" className="filter-icon"/>
                        <span>Filter</span>
                    </div>

                    <Icon icon="icon-park-outline:down" className="dropdown-icon"/>
                </div>
            </div>
        </div>

        {/* Tabel */}
        <table className="tabel-mahasiswa">
            <thead>
                <tr>
                    <th>
                        <button className="sort-thead">
                            <span>Nama</span>
                            <Icon icon="uil:sort" className="sort-icon"/>
                        </button>
                    </th>
                    <th>
                        <button className="sort-thead">
                            <span>NIM</span>
                            <Icon icon="uil:sort" className="sort-icon"/>
                        </button>
                    </th>
                    <th>
                        <button className="sort-thead">
                            <span>Angkatan</span>
                            <Icon icon="uil:sort" className="sort-icon"/>
                        </button>
                    </th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-aksi">
                        <div className="btn-aksi-wrapper">
                            <button className=" aksi-btn edit-btn">
                                <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                            </button>

                            <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteStudent(true)}>
                                <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-aksi">
                        <div className="btn-aksi-wrapper">
                            <button className=" aksi-btn edit-btn">
                                <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                            </button>

                            <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteStudent(true)}>
                                <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-aksi">
                        <div className="btn-aksi-wrapper">
                            <button className=" aksi-btn edit-btn">
                                <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                            </button>

                            <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteStudent(true)}>
                                <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-aksi">
                        <div className="btn-aksi-wrapper">
                            <button className=" aksi-btn edit-btn">
                                <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                            </button>

                            <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteStudent(true)}>
                                <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-aksi">
                        <div className="btn-aksi-wrapper">
                            <button className=" aksi-btn edit-btn">
                                <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                            </button>

                            <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteStudent(true)}>
                                <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-aksi">
                        <div className="btn-aksi-wrapper">
                            <button className=" aksi-btn edit-btn">
                                <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                            </button>

                            <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteStudent(true)}>
                                <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-aksi">
                        <div className="btn-aksi-wrapper">
                            <button className=" aksi-btn edit-btn">
                                <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                            </button>

                            <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteStudent(true)}>
                                <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-aksi">
                        <div className="btn-aksi-wrapper">
                            <button className=" aksi-btn edit-btn">
                                <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                            </button>

                            <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteStudent(true)}>
                                <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-aksi">
                        <div className="btn-aksi-wrapper">
                            <button className=" aksi-btn edit-btn">
                                <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                            </button>

                            <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteStudent(true)}>
                                <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-aksi">
                        <div className="btn-aksi-wrapper">
                            <button className=" aksi-btn edit-btn">
                                <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                            </button>

                            <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteStudent(true)}>
                                <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-wrapper">
            <p className="page-description">Menampilkan 1-10 dari 50 data</p>

            <div className="pagination">
                <a href="#">
                    <Icon icon="ooui:previous-ltr" className="previous-icon"/>
                </a>
                <a href="#" className="active">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">
                    <Icon icon="ooui:next-ltr" className="next-icon"/>
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

                    <div className="add-btn-wrapper">
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
                <div className="modal-delete" onClick={(e) => e.stopPropagation()}>
                    <div className="warning-icon-wrapper">
                        <Icon icon="ic:round-warning" className="warning-icon"/>
                    </div>

                    <h2 className="modal-title">Hapus Data</h2>

                    <p className="modal-description">Apakah Anda yakin ingin menghapus data ini?</p>

                    <div className="btn-wrapper">
                        <button className="modal-batal-btn" onClick={() => setShowFormDeleteStudent(false)}>Batal</button>
                        <button className="modal-delete-btn">Hapus</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default KelolaDataMahasiswa;