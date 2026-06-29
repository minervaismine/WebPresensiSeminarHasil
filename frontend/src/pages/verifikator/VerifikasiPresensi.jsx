import "../../styles/verifikator/VerifikasiPresensi.css";
import { Icon } from '@iconify/react';

function VerifikasiPresensi() {
  return (
    <div className="page-menu-verifikasi-presensi-layout">
        {/* Navbar */}
        <nav className="navbar-menu-verifikasi-presensi">
            <button className="back-btn">
                <Icon icon="weui:back-filled" className="back-icon"/>
                <span>Kembali</span>
            </button>

            <h1>VERIFIKASI PRESENSI</h1>
        </nav>

        {/* Judul, Search Bar, Filter  */}
        <div className="daftar-seminar-wrapper">
            <h1 className="daftar-seminar-title">Daftar Seminar</h1>

            <div className="search-filter">
                <form>
                    <div className="search-bar">
                        <Icon icon="radix-icons:magnifying-glass" className="search-icon"/>
                        <input className="search-bar-input" type="search" placeholder="Cari mahasiswa"></input>
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

        {/* Daftar Seminar */}
        <div className="seminar-list">
            <div className="seminar-card">
                <div className="card-accent"></div>

                <div className="card-content">
                    <div className="card-header">
                        <div>
                            <h2 className="nama-mahasiswa">Karina Minerva Romeda</h2>
                            <p className="judul-skripsi">"Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa"</p>
                        </div>

                        <button className="lihat-daftar-hadir-btn">Lihat Daftar Hadir</button>
                    </div>

                    <div className="informasi-seminar">
                        <span>Senin, 13 April 2026</span>
                        <span>|</span>
                        <span>13.00 - 14.30</span>
                    </div>

                    <div className="dosen-info">
                        <p><strong>Pembimbing:</strong> Dr. Hendra, S.Si., M.Kom.</p>

                        <p>
                            <strong>Penguji:</strong> Edy Saputra Rusdi, S.Si., M.Si.
                            <span className="separator">|</span>
                            Siti Rabiatul Adawiyah, S.Si., M.Kom.
                        </p>
                    </div>
                </div>
            </div>

            <div className="seminar-card">
                <div className="card-accent"></div>

                <div className="card-content">
                    <div className="card-header">
                        <div>
                            <h2 className="nama-mahasiswa">Karina Minerva Romeda</h2>
                            <p className="judul-skripsi">"Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa"</p>
                        </div>

                        <button className="lihat-daftar-hadir-btn">Lihat Daftar Hadir</button>
                    </div>

                    <div className="informasi-seminar">
                        <span>Senin, 13 April 2026</span>
                        <span>|</span>
                        <span>13.00 - 14.30</span>
                    </div>

                    <div className="dosen-info">
                        <p><strong>Pembimbing:</strong> Dr. Hendra, S.Si., M.Kom.</p>

                        <p>
                            <strong>Penguji:</strong> Edy Saputra Rusdi, S.Si., M.Si.
                            <span className="separator">|</span>
                            Siti Rabiatul Adawiyah, S.Si., M.Kom.
                        </p>
                    </div>
                </div>
            </div>

            <div className="seminar-card">
                <div className="card-accent"></div>

                <div className="card-content">
                    <div className="card-header">
                        <div>
                            <h2 className="nama-mahasiswa">Karina Minerva Romeda</h2>
                            <p className="judul-skripsi">"Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa"</p>
                        </div>

                        <button className="lihat-daftar-hadir-btn">Lihat Daftar Hadir</button>
                    </div>

                    <div className="informasi-seminar">
                        <span>Senin, 13 April 2026</span>
                        <span>|</span>
                        <span>13.00 - 14.30</span>
                    </div>

                    <div className="dosen-info">
                        <p><strong>Pembimbing:</strong> Dr. Hendra, S.Si., M.Kom.</p>

                        <p>
                            <strong>Penguji:</strong> Edy Saputra Rusdi, S.Si., M.Si.
                            <span className="separator">|</span>
                            Siti Rabiatul Adawiyah, S.Si., M.Kom.
                        </p>
                    </div>
                </div>
            </div>

            <div className="seminar-card">
                <div className="card-accent"></div>

                <div className="card-content">
                    <div className="card-header">
                        <div>
                            <h2 className="nama-mahasiswa">Karina Minerva Romeda</h2>
                            <p className="judul-skripsi">"Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa"</p>
                        </div>

                        <button className="lihat-daftar-hadir-btn">Lihat Daftar Hadir</button>
                    </div>

                    <div className="informasi-seminar">
                        <span>Senin, 13 April 2026</span>
                        <span>|</span>
                        <span>13.00 - 14.30</span>
                    </div>

                    <div className="dosen-info">
                        <p><strong>Pembimbing:</strong> Dr. Hendra, S.Si., M.Kom.</p>

                        <p>
                            <strong>Penguji:</strong> Edy Saputra Rusdi, S.Si., M.Si.
                            <span className="separator">|</span>
                            Siti Rabiatul Adawiyah, S.Si., M.Kom.
                        </p>
                    </div>
                </div>
            </div>

            <div className="seminar-card">
                <div className="card-accent"></div>

                <div className="card-content">
                    <div className="card-header">
                        <div>
                            <h2 className="nama-mahasiswa">Karina Minerva Romeda</h2>
                            <p className="judul-skripsi">"Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa"</p>
                        </div>

                        <button className="lihat-daftar-hadir-btn">Lihat Daftar Hadir</button>
                    </div>

                    <div className="informasi-seminar">
                        <span>Senin, 13 April 2026</span>
                        <span>|</span>
                        <span>13.00 - 14.30</span>
                    </div>

                    <div className="dosen-info">
                        <p><strong>Pembimbing:</strong> Dr. Hendra, S.Si., M.Kom.</p>

                        <p>
                            <strong>Penguji:</strong> Edy Saputra Rusdi, S.Si., M.Si.
                            <span className="separator">|</span>
                            Siti Rabiatul Adawiyah, S.Si., M.Kom.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default VerifikasiPresensi;