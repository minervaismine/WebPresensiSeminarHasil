import "../styles/Admin_KelolaDataSeminar.css";
import { Icon } from '@iconify/react';
import { useState } from "react";

function KelolaDataSeminar() {
    const [showFormAddSeminar, setShowFormAddSeminar] = useState(false);
    const [showFormDeleteSeminar, setShowFormDeleteSeminar] = useState(false);
  
    return (
    <div className="page-menu-kelola-data-seminar-layout">
        {/* Navbar */}
        <nav className="navbar-menu-kelola-data-seminar">
            <button className="back-btn">
                <Icon icon="weui:back-filled" className="back-icon"/>
                <span>Kembali</span>
            </button>

            <h1>KELOLA DATA SEMINAR</h1>
        </nav>

        {/* Tambah Seminar, Search Bar, Filter */}
        <div className="header-kelola-data-seminar-wrapper">
             <button className="add-seminar-btn" onClick={() => setShowFormAddSeminar(true)}> 
                <Icon icon="mingcute:add-fill" className="add-icon"/>
                <span>Tambah Seminar</span>
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
        <div className="table-container">
            <div className="table-scrollbar">
                <table className="tabel-seminar">
                    <thead>
                        <tr>
                            <th className="th-nama">
                                <button className="sort-thead">
                                    <span>Nama</span>
                                    <Icon icon="uil:sort" className="sort-icon"/>
                                </button>
                            </th>
                            <th className="th-judul">
                                <button className="sort-thead">
                                    <span>Judul</span>
                                    <Icon icon="uil:sort" className="sort-icon"/>
                                </button>
                            </th>
                            <th className="th-jadwal">
                                <button className="sort-thead">
                                    <span>Jadwal</span>
                                    <Icon icon="uil:sort" className="sort-icon"/>
                                </button>
                            </th>
                            <th className="th-lokasi">Lokasi</th>
                            <th className="th-pembimbing">Pembimbing</th>
                            <th className="th-penguji">Penguji</th>
                            <th className="th-aksi">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="kolom-nama">
                                <div className="kolom-nama-content">
                                    <p className="nama-mahasiswa">Karina Minerva Romeda</p>
                                    <p className="nim-mahasiswa">H071221034</p>
                                </div>
                            </td>
                            <td className="kolom-judul">Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa</td>
                            <td className="kolom-jadwal">
                                <div className="kolom-jadwal-content">
                                    <p>Senin, 13 April 2026</p>
                                    <p>13.00 - 14.30</p>
                                </div>
                            </td>
                            <td className="kolom-lokasi">
                                <div className="kolom-lokasi-content">
                                    <p>Lab RPL</p>
                                    <button className="lihat-peta-btn">
                                        <Icon icon="weui:location-filled" className="location-icon"/>
                                        <span>Lihat Peta</span>
                                    </button>
                                </div>
                            </td>
                            <td className="kolom-pembimbing">Dr. Hendra, S.Si., M.Kom.</td>
                            <td className="kolom-penguji">
                                <div className="kolom-penguji-content">
                                    <p>Edy Saputra Rusdi, S.Si., M.Si.</p>
                                    <p>Siti Rabiatul Adawiyah, S.Si., M.Kom.</p>
                                </div>
                            </td>
                            <td className="kolom-aksi">
                                <div className="btn-aksi-wrapper">
                                    <button className=" aksi-btn edit-btn">
                                        <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                                    </button>

                                    <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteSeminar(true)}>
                                        <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="kolom-nama">
                                <div className="kolom-nama-content">
                                    <p className="nama-mahasiswa">Karina Minerva Romeda</p>
                                    <p className="nim-mahasiswa">H071221034</p>
                                </div>
                            </td>
                            <td className="kolom-judul">Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa</td>
                            <td className="kolom-jadwal">
                                <div className="kolom-jadwal-content">
                                    <p>Senin, 13 April 2026</p>
                                    <p>13.00 - 14.30</p>
                                </div>
                            </td>
                            <td className="kolom-lokasi">
                                <div className="kolom-lokasi-content">
                                    <p>Lab RPL</p>
                                    <button className="lihat-peta-btn">
                                        <Icon icon="weui:location-filled" className="location-icon"/>
                                        <span>Lihat Peta</span>
                                    </button>
                                </div>
                            </td>
                            <td className="kolom-pembimbing">Dr. Hendra, S.Si., M.Kom.</td>
                            <td className="kolom-penguji">
                                <div className="kolom-penguji-content">
                                    <p>Edy Saputra Rusdi, S.Si., M.Si.</p>
                                    <p>Siti Rabiatul Adawiyah, S.Si., M.Kom.</p>
                                </div>
                            </td>
                            <td className="kolom-aksi">
                                <div className="btn-aksi-wrapper">
                                    <button className=" aksi-btn edit-btn">
                                        <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                                    </button>

                                    <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteSeminar(true)}>
                                        <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="kolom-nama">
                                <div className="kolom-nama-content">
                                    <p className="nama-mahasiswa">Karina Minerva Romeda</p>
                                    <p className="nim-mahasiswa">H071221034</p>
                                </div>
                            </td>
                            <td className="kolom-judul">Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa</td>
                            <td className="kolom-jadwal">
                                <div className="kolom-jadwal-content">
                                    <p>Senin, 13 April 2026</p>
                                    <p>13.00 - 14.30</p>
                                </div>
                            </td>
                            <td className="kolom-lokasi">
                                <div className="kolom-lokasi-content">
                                    <p>Lab RPL</p>
                                    <button className="lihat-peta-btn">
                                        <Icon icon="weui:location-filled" className="location-icon"/>
                                        <span>Lihat Peta</span>
                                    </button>
                                </div>
                            </td>
                            <td className="kolom-pembimbing">Dr. Hendra, S.Si., M.Kom.</td>
                            <td className="kolom-penguji">
                                <div className="kolom-penguji-content">
                                    <p>Edy Saputra Rusdi, S.Si., M.Si.</p>
                                    <p>Siti Rabiatul Adawiyah, S.Si., M.Kom.</p>
                                </div>
                            </td>
                            <td className="kolom-aksi">
                                <div className="btn-aksi-wrapper">
                                    <button className=" aksi-btn edit-btn">
                                        <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                                    </button>

                                    <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteSeminar(true)}>
                                        <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="kolom-nama">
                                <div className="kolom-nama-content">
                                    <p className="nama-mahasiswa">Karina Minerva Romeda</p>
                                    <p className="nim-mahasiswa">H071221034</p>
                                </div>
                            </td>
                            <td className="kolom-judul">Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa</td>
                            <td className="kolom-jadwal">
                                <div className="kolom-jadwal-content">
                                    <p>Senin, 13 April 2026</p>
                                    <p>13.00 - 14.30</p>
                                </div>
                            </td>
                            <td className="kolom-lokasi">
                                <div className="kolom-lokasi-content">
                                    <p>Lab RPL</p>
                                    <button className="lihat-peta-btn">
                                        <Icon icon="weui:location-filled" className="location-icon"/>
                                        <span>Lihat Peta</span>
                                    </button>
                                </div>
                            </td>
                            <td className="kolom-pembimbing">Dr. Hendra, S.Si., M.Kom.</td>
                            <td className="kolom-penguji">
                                <div className="kolom-penguji-content">
                                    <p>Edy Saputra Rusdi, S.Si., M.Si.</p>
                                    <p>Siti Rabiatul Adawiyah, S.Si., M.Kom.</p>
                                </div>
                            </td>
                            <td className="kolom-aksi">
                                <div className="btn-aksi-wrapper">
                                    <button className=" aksi-btn edit-btn">
                                        <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                                    </button>

                                    <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteSeminar(true)}>
                                        <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="kolom-nama">
                                <div className="kolom-nama-content">
                                    <p className="nama-mahasiswa">Karina Minerva Romeda</p>
                                    <p className="nim-mahasiswa">H071221034</p>
                                </div>
                            </td>
                            <td className="kolom-judul">Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa</td>
                            <td className="kolom-jadwal">
                                <div className="kolom-jadwal-content">
                                    <p>Senin, 13 April 2026</p>
                                    <p>13.00 - 14.30</p>
                                </div>
                            </td>
                            <td className="kolom-lokasi">
                                <div className="kolom-lokasi-content">
                                    <p>Lab RPL</p>
                                    <button className="lihat-peta-btn">
                                        <Icon icon="weui:location-filled" className="location-icon"/>
                                        <span>Lihat Peta</span>
                                    </button>
                                </div>
                            </td>
                            <td className="kolom-pembimbing">Dr. Hendra, S.Si., M.Kom.</td>
                            <td className="kolom-penguji">
                                <div className="kolom-penguji-content">
                                    <p>Edy Saputra Rusdi, S.Si., M.Si.</p>
                                    <p>Siti Rabiatul Adawiyah, S.Si., M.Kom.</p>
                                </div>
                            </td>
                            <td className="kolom-aksi">
                                <div className="btn-aksi-wrapper">
                                    <button className=" aksi-btn edit-btn">
                                        <Icon icon="boxicons:pencil-filled" className="aksi-icon"/>
                                    </button>

                                    <button className=" aksi-btn delete-btn" onClick={() => setShowFormDeleteSeminar(true)}>
                                        <Icon icon="tabler:trash-filled" className="aksi-icon"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* Pagination */}
        <div className="pagination-wrapper">
            <p className="page-description">Menampilkan 1-5 dari 50 data</p>

            <div className="pagination">
                <a href="#">
                    <Icon icon="ooui:previous-ltr" className="previous-icon"/>
                </a>
                <a href="#" className="active">1</a>
                <a href="#">2</a>
                <a href="#">...</a>
                <a href="#">9</a>
                <a href="#">10</a>
                <a href="#">
                    <Icon icon="ooui:next-ltr" className="next-icon"/>
                </a>
            </div>
        </div>

        {/* Form Tambah Seminar */}
        {showFormAddSeminar && (
            <div className="modal-overlay" onClick={() => setShowFormAddSeminar(false)}>
                <div className="form-add-seminar" onClick={(e) => e.stopPropagation()}>
                    <div className="form-header-wrapper">
                        <div className="form-header">
                            <Icon icon="ph:student-fill" className="student-icon"/>
                            <span>Data Mahasiswa</span>
                        </div>
                        <button className="close-form-btn" onClick={() => setShowFormAddSeminar(false)}>
                            <Icon icon="mingcute:close-fill" />
                        </button>
                    </div>

                    <div className="form-group-search-mahasiswa">
                        <label>Mahasiswa</label>
                        <form>
                            <div className="search-bar-form">
                                <Icon icon="radix-icons:magnifying-glass" className="search-form-icon"/>
                                <input className="search-form-input" type="search" placeholder="Cari mahasiswa atau NIM"></input>
                            </div>
                        </form>
                    </div>

                    <div className="form-group-judul">
                        <label>Judul Penelitian</label>
                        <input type="text" placeholder="Masukkan judul skripsi mahasiswa"/>
                    </div>

                    <div className="form-group-jadwal">
                        <label className="jadwal-title">Jadwal Seminar</label>

                        <div className="jadwal-row">
                            <label>Tanggal</label>
                            <input type="text" placeholder="Pilih tanggal (DD/MM/YY)"/>
                        </div>

                        <div className="jadwal-row">
                            <label>Waktu Mulai</label>
                            <input type="text" placeholder="Pilih jam mulai"/>
                        </div>

                        <div className="jadwal-row">
                            <label>Waktu Selesai</label>
                            <input type="text" placeholder="Pilih jam selesai"/>
                        </div>
                    </div>

                    <div className="form-group-lokasi">
                        <label className="lokasi-title">Lokasi Seminar</label>
                        <div className="map-picker-wrapper">
                            <input type="text" placeholder="Masukkan nama lokasi"/>
                            <button className="map-picker-btn">Pilih di Peta</button>
                        </div>
                    </div>

                    <div className="form-group-pembimbing">
                        <label>Dosen Pembimbing</label>
                        <input type="text" placeholder="Masukkan nama dosen pembimbing"/>
                    </div>

                    <div className="form-group-penguji">
                        <label>Dosen Penguji</label>

                        <div className="penguji-input-wrapper">
                            <input type="text" placeholder="Masukkan nama dosen penguji 1"/>
                            <input type="text" placeholder="Masukkan nama dosen penguji 2"/>
                        </div>
                    </div>

                    <div className="add-btn-wrapper">
                        <button className="add-btn-form">
                        <Icon icon="mingcute:add-fill" className="add-icon-form"/>
                        <span>Tambah Seminar</span>
                    </button>
                    </div>
                </div>
            </div>
        )}

        {/* Modal Delete Data Seminar */}
        {showFormDeleteSeminar && (
            <div className="modal-overlay" onClick={() => setShowFormDeleteSeminar(false)}>
                <div className="modal-delete" onClick={(e) => e.stopPropagation()}>
                    <div className="warning-icon-wrapper">
                        <Icon icon="ic:round-warning" className="warning-icon"/>
                    </div>

                    <h2 className="modal-title">Hapus Data</h2>

                    <p className="modal-description">Apakah Anda yakin ingin menghapus data ini?</p>

                    <div className="btn-wrapper">
                        <button className="modal-batal-btn" onClick={() => setShowFormDeleteSeminar(false)}>Batal</button>
                        <button className="modal-delete-btn">Hapus</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default KelolaDataSeminar;