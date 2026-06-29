import "../../styles/verifikator/RiwayatVerifikasi.css";
import { Icon } from '@iconify/react';

function RiwayatVerifikasi() {
  return (
    <div className="page-menu-riwayat-verifikasi-layout">
        {/* Navbar */}
        <nav className="navbar-menu-riwayat-verifikasi">
            <button className="back-btn">
                <Icon icon="weui:back-filled" className="back-icon"/>
                <span>Kembali</span>
            </button>

            <h1>RIWAYAT VERIFIKASI</h1>
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

                            <div className="informasi-seminar">
                                <span>Senin, 13 April 2026</span>
                                <span>|</span>
                                <span>13.00 - 14.30</span>
                            </div>
                        </div>

                        <button className="lihat-detail-btn">Lihat Detail</button>
                    </div>

                    <div className="progress-verifikasi">
                        <p>
                            <strong>Verifikasi:</strong> 
                            <span className="angka-progress">18 dari 20 selesai</span>
                        </p>

                        <p>
                            <strong>Status:</strong>
                            <span className="status-verifikasi sedang-diproses">Sedang Diproses</span>
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

                            <div className="informasi-seminar">
                                <span>Senin, 13 April 2026</span>
                                <span>|</span>
                                <span>13.00 - 14.30</span>
                            </div>
                        </div>

                        <button className="lihat-detail-btn">Lihat Detail</button>
                    </div>

                    <div className="progress-verifikasi">
                        <p>
                            <strong>Verifikasi:</strong> 
                            <span className="angka-progress">18 dari 20 selesai</span>
                        </p>

                        <p>
                            <strong>Status:</strong>
                            <span className="status-verifikasi sedang-diproses">Sedang Diproses</span>
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

                            <div className="informasi-seminar">
                                <span>Senin, 13 April 2026</span>
                                <span>|</span>
                                <span>13.00 - 14.30</span>
                            </div>
                        </div>

                        <button className="lihat-detail-btn">Lihat Detail</button>
                    </div>

                    <div className="progress-verifikasi">
                        <p>
                            <strong>Verifikasi:</strong> 
                            <span className="angka-progress">18 dari 20 selesai</span>
                        </p>

                        <p>
                            <strong>Status:</strong>
                            <span className="status-verifikasi selesai-diproses">Selesai</span>
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

                            <div className="informasi-seminar">
                                <span>Senin, 13 April 2026</span>
                                <span>|</span>
                                <span>13.00 - 14.30</span>
                            </div>
                        </div>

                        <button className="lihat-detail-btn">Lihat Detail</button>
                    </div>

                    <div className="progress-verifikasi">
                        <p>
                            <strong>Verifikasi:</strong> 
                            <span className="angka-progress">18 dari 20 selesai</span>
                        </p>

                        <p>
                            <strong>Status:</strong>
                            <span className="status-verifikasi selesai-diproses">Selesai</span>
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

                            <div className="informasi-seminar">
                                <span>Senin, 13 April 2026</span>
                                <span>|</span>
                                <span>13.00 - 14.30</span>
                            </div>
                        </div>

                        <button className="lihat-detail-btn">Lihat Detail</button>
                    </div>

                    <div className="progress-verifikasi">
                        <p>
                            <strong>Verifikasi:</strong> 
                            <span className="angka-progress">18 dari 20 selesai</span>
                        </p>

                        <p>
                            <strong>Status:</strong>
                            <span className="status-verifikasi belum-diproses">Belum Diproses</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default RiwayatVerifikasi;