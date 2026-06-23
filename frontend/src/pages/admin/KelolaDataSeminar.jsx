import "../../styles/admin/KelolaDataSeminar.css";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PilihLokasi from "../../components/PilihLokasi";

function KelolaDataSeminar() {
    const navigate = useNavigate();

    const [dataSeminar, setDataSeminar] = useState([]);

    const [showFormAddSeminar, setShowFormAddSeminar] = useState(false);
    const [showFormDeleteSeminar, setShowFormDeleteSeminar] = useState(false);
    const [showMapModal, setShowMapModal] = useState(false);

    useEffect(() => {
        fetchSeminar();
    }, []);

    const fetchSeminar = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/data-seminar"
            );
            setDataSeminar(response.data);
        } catch (error) {
            console.log(error);
        }
    };
  
    return (
    <div className="page-menu-kelola-data-seminar-layout">
        {/* Navbar */}
        <nav className="navbar-menu-kelola-data-seminar">
            <button className="back-btn-kelola-data-seminar" onClick={() => navigate(-1)}>
                <Icon icon="weui:back-filled" className="back-icon-kelola-data-seminar"/>
                <span>Kembali</span>
            </button>

            <h1>KELOLA DATA SEMINAR</h1>
        </nav>

        {/* Tambah Seminar, Search Bar, Filter */}
        <div className="header-kelola-data-seminar-wrapper">
             <button className="add-seminar-btn" onClick={() => setShowFormAddSeminar(true)}> 
                <Icon icon="mingcute:add-fill" className="add-seminar-icon"/>
                <span>Tambah Seminar</span>
            </button>

            <div className="search-filter-kelola-data-seminar">
                <form>
                    <div className="search-bar-kelola-data-seminar">
                        <Icon icon="radix-icons:magnifying-glass" className="search-seminar-icon"/>
                        <input className="search-bar-input-kelola-data-seminar" type="search" placeholder="Cari mahasiswa atau NIM"></input>
                    </div>
                </form>

                <div className="filter-dropdown-kelola-data-seminar">
                    <div className="filter-content-kelola-data-seminar">
                        <Icon icon="mi:filter" className="filter-seminar-icon"/>
                        <span>Filter</span>
                    </div>

                    <Icon icon="icon-park-outline:down" className="dropdown-icon-kelola-data-seminar"/>
                </div>
            </div>
        </div>

        {/* Tabel */}
        <div className="table-container-kelola-data-seminar">
            <div className="table-scrollbar">
                <table className="tabel-seminar">
                    <thead>
                        <tr>
                            <th className="th-nama">
                                <button className="sort-thead-kelola-data-seminar">
                                    <span>Nama</span>
                                    <Icon icon="uil:sort" className="sort-seminar-icon"/>
                                </button>
                            </th>
                            <th className="th-judul">
                                <button className="sort-thead-kelola-data-seminar">
                                    <span>Judul</span>
                                    <Icon icon="uil:sort" className="sort-seminar-icon"/>
                                </button>
                            </th>
                            <th className="th-jadwal">
                                <button className="sort-thead-kelola-data-seminar">
                                    <span>Jadwal</span>
                                    <Icon icon="uil:sort" className="sort-seminar-icon"/>
                                </button>
                            </th>
                            <th className="th-lokasi">Lokasi</th>
                            <th className="th-pembimbing">Pembimbing</th>
                            <th className="th-penguji">Penguji</th>
                            <th className="th-aksi">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSeminar.map((item) => (
                            <tr key={item.id_seminar}>
                                <td className="kolom-nama-kelola-data-seminar">
                                    <div className="kolom-nama-content-kelola-data-seminar">
                                        <p className="nama-mahasiswa-kelola-data-seminar">{item.nama}</p>
                                        <p className="nim-mahasiswa-kelola-data-seminar">{item.nim}</p>
                                    </div>
                                </td>
                                <td className="kolom-judul">{item.judul_penelitian}</td>
                                <td className="kolom-jadwal">
                                    <div className="kolom-jadwal-content">
                                        <p>{item.tanggal}</p>
                                        <p>{item.waktu_mulai} - {item.waktu_selesai}</p>
                                    </div>
                                </td>
                                <td className="kolom-lokasi">
                                    <div className="kolom-lokasi-content">
                                        <p>{item.lokasi}</p>
                                        <button className="lihat-peta-btn">
                                            <Icon icon="weui:location-filled" className="location-icon"/>
                                            <span>Lihat Peta</span>
                                        </button>
                                    </div>
                                </td>
                                <td className="kolom-pembimbing">{item.dosen_pembimbing}</td>
                                <td className="kolom-penguji">
                                    <div className="kolom-penguji-content">
                                        <p>{item.dosen_penguji_1}</p>
                                        <p>{item.dosen_penguji_2}</p>
                                    </div>
                                </td>
                                <td className="kolom-aksi">
                                    <div className="btn-aksi-wrapper-kelola-data-seminar">
                                        <button className=" aksi-btn-kelola-data-seminar edit-btn">
                                            <Icon icon="boxicons:pencil-filled" className="aksi-icon-kelola-data-seminar"/>
                                        </button>

                                        <button className=" aksi-btn-kelola-data-seminar delete-btn" onClick={() => setShowFormDeleteSeminar(true)}>
                                            <Icon icon="tabler:trash-filled" className="aksi-icon-kelola-data-seminar"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Pagination */}
        <div className="pagination-wrapper-kelola-data-seminar">
            <p className="page-description-kelola-data-seminar">Menampilkan 1-5 dari 50 data</p>

            <div className="pagination-kelola-data-seminar">
                <a href="#">
                    <Icon icon="ooui:previous-ltr" className="previous-icon-kelola-data-seminar"/>
                </a>
                <a href="#" className="active">1</a>
                <a href="#">2</a>
                <a href="#">...</a>
                <a href="#">9</a>
                <a href="#">10</a>
                <a href="#">
                    <Icon icon="ooui:next-ltr" className="next-icon-kelola-data-seminar"/>
                </a>
            </div>
        </div>

        {/* Form Tambah Seminar */}
        {showFormAddSeminar && (
            <div className="form-overlay" onClick={() => setShowFormAddSeminar(false)}>
                <div className="form-add-seminar" onClick={(e) => e.stopPropagation()}>
                    <div className="form-header-wrapper">
                        <div className="form-header">
                            <Icon icon="ph:student-fill" className="student-icon"/>
                            <span>Data Seminar</span>
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
                            <input type="text" placeholder="Masukkan nama ruangan"/>
                            <button className="map-picker-btn" onClick={() => setShowMapModal (true)}>Pilih di Peta</button>
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

        {/* Modal Map */}
        {showMapModal && (
            <PilihLokasi onClose={() => setShowMapModal(false)}/>
        )}
    </div>
  );
}

export default KelolaDataSeminar;