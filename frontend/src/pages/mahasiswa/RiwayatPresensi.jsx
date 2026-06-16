import "../../styles/mahasiswa/RiwayatPresensi.css";
import { Icon } from '@iconify/react';

function RiwayatPresensiMahasiswa() {
  return (
    <div className="page-menu-riwayat-presensi-layout">
        {/* Navbar */}
        <nav className="navbar-menu-riwayat-presensi">
            <button className="back-btn">
                <Icon icon="weui:back-filled" className="back-icon"/>
                <span>Kembali</span>
            </button>

            <h1>RIWAYAT PRESENSI</h1>
        </nav>

        {/* Statistik Kehadiran */}
        <h1 className="statistik-kehadiran-title">Statistik Kehadiran</h1>

        <div className="stats-card-container">
            <div className="stat-card">
                <div className="stat-content">
                    <h3>Total Kehadiran</h3>
                    <h1>10</h1>
                </div>

                <div className="stat-icon-wrapper">
                    <Icon icon="mingcute:clipboard-fill" className="stat-icon"/>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-content">
                    <h3>Kehadiran Valid</h3>
                    <h1>8</h1>
                </div>

                <div className="stat-icon-wrapper">
                    <Icon icon="gg:check-o" className="stat-icon"/>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-content">
                    <h3>Kehadiran Pending</h3>
                    <h1>1</h1>
                </div>

                <div className="stat-icon-wrapper">
                    <Icon icon="mdi:clock" className="stat-icon"/>
                </div>
            </div>
        </div>  

        {/* Judul, Search Bar, Filter  */}
        <div className="header-riwayat-presensi-wrapper">
            <h1 className="riwayat-presensi-title">Riwayat Presensi</h1>

            <div className="search-filter">
                <form>
                    <div className="search-bar">
                        <Icon icon="radix-icons:magnifying-glass" className="search-icon"/>
                        <input className="search-bar-input" type="search" placeholder="Cari mahasiswa, judul atau dosen"></input>
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

        {/* Riwayat Presensi */}
        <div className="riwayat-list">
            <div className="riwayat-card">
                <div className="card-accent"></div>

                <div className="card-content">
                    <div className="card-header">
                        <div>
                            <h2 className="nama-mahasiswa">Karina Minerva Romeda</h2>
                            <p className="judul-skripsi">"Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa"</p>
                        </div>

                        <span className="status-badge pending">Pending</span>
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

            <div className="riwayat-card">
                <div className="card-accent"></div>

                <div className="card-content">
                    <div className="card-header">
                        <div>
                            <h2 className="nama-mahasiswa">Karina Minerva Romeda</h2>
                            <p className="judul-skripsi">"Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa"</p>
                        </div>

                        <span className="status-badge valid">Valid</span>
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

            <div className="riwayat-card">
                <div className="card-accent"></div>

                <div className="card-content">
                    <div className="card-header">
                        <div>
                            <h2 className="nama-mahasiswa">Karina Minerva Romeda</h2>
                            <p className="judul-skripsi">"Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa"</p>
                        </div>

                        <span className="status-badge valid">Valid</span>
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

            <div className="riwayat-card">
                <div className="card-accent"></div>

                <div className="card-content">
                    <div className="card-header">
                        <div>
                            <h2 className="nama-mahasiswa">Karina Minerva Romeda</h2>
                            <p className="judul-skripsi">"Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa"</p>
                        </div>

                        <span className="status-badge valid">Valid</span>
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

            <div className="riwayat-card">
                <div className="card-accent"></div>

                <div className="card-content">
                    <div className="card-header">
                        <div>
                            <h2 className="nama-mahasiswa">Karina Minerva Romeda</h2>
                            <p className="judul-skripsi">"Pengembangan Sistem Presensi Seminar Hasil Berbasis Web Menggunakan QR Code dan Geolocation Validation untuk Meningkatkan Akurasi Data Kehadiran Mahasiswa"</p>
                        </div>

                        <span className="status-badge invalid">Invalid</span>
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

export default RiwayatPresensiMahasiswa;