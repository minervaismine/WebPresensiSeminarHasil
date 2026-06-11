import "../styles/Verifikator_RiwayatVerifikasi_LihatDetail.css";
import { Icon } from '@iconify/react';
import { CircularProgressbar, buildStyles,} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function LihatDetail() {
    const totalPeserta = 20;
    const telahDiverifikasi = 18;

    const progress = (telahDiverifikasi / totalPeserta) * 100;

    return (
        <div className="page-menu-lihat-detail-layout">
            {/* Navbar */}
            <nav className="navbar-menu-lihat-detail">
                <button className="back-btn">
                    <Icon icon="weui:back-filled" className="back-icon"/>
                    <span>Kembali</span>
                </button>

                <h1>RIWAYAT VERIFIKASI</h1>
            </nav>

            {/* Judul, Card, Progress Bar */}
            <div className="ringkasan-wrapper">
                {/* Left Section */}
                <div className="ringkasan-left">
                    <h1 className="ringkasan-title">
                        Ringkasan Verifikasi
                    </h1>

                    <div className="summary-cards">
                        {/* Total Peserta */}
                        <div className="summary-card">
                            <div className="card-icon">
                                <Icon icon="bi:people-fill" className="people-icon"/>
                            </div>

                            <div className="card-content">
                                <p className="card-label">Total Peserta</p>
                                <h2 className="card-value">20</h2>
                            </div>
                        </div>

                        {/* Absen Pending */}
                        <div className="summary-card">
                            <div className="card-icon">
                                <Icon icon="tabler:clock-filled" className="clock-icon"/>
                            </div>

                            <div className="card-content">
                                <p className="card-label">Absen Pending</p>
                                <h2 className="card-value">2</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="ringkasan-right">
                    <div className="progress-card">
                        {/* Donut Chart */}
                        <h3 className="chart-title">Progres Verifikasi</h3>

                        <div className="donut-wrapper">
                            <CircularProgressbar 
                                value={progress}
                                text={`${Math.round(progress)}%`}
                                strokeWidth={12}
                                styles={buildStyles({
                                    pathColor: "#2463EB",
                                    textColor: "#1E293B",
                                    trailColor: "#FFFFFF",
                                    strokeLinecap: "round",
                                    textSize: "14px",
                                })}
                            />
                        </div>

                        <p className="progress-text">
                            {telahDiverifikasi} / {totalPeserta} diverifikasi
                        </p>
                    </div>
                </div>
            </div>

            {/* Judul, Search Bar, Filter  */}
            <div className="daftar-hadir-wrapper">
                <h1 className="daftar-hadir-title">Daftar Hadir</h1>

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

            {/* Daftar Hadir */}
            <table className="tabel-riwayat-daftar-hadir">
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
                        <th>Waktu Scan</th>
                        <th>Lokasi</th>
                        <th>Status</th>
                        <th>Waktu Verifikasi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="kolom-nama">Karina Minerva Romeda</td>
                        <td className="kolom-nim">H071221034</td>
                        <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                        <td className="kolom-jarak-lokasi">
                            <span className="status-lokasi dekat">5 m</span>
                        </td>
                        <td className="kolom-status-presensi">
                            <button className="pilih-status-kehadiran-btn pending">
                                <span className="status-presensi">Pending</span>
                                <Icon icon="icon-park-outline:down" className="pilih-status-icon"/>
                            </button>
                        </td>
                        <td className="kolom-waktu-verifikasi">-</td>
                    </tr>
                    <tr>
                        <td className="kolom-nama">Karina Minerva Romeda</td>
                        <td className="kolom-nim">H071221034</td>
                        <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                        <td className="kolom-jarak-lokasi">
                            <span className="status-lokasi dekat">10 m</span>
                        </td>
                        <td className="kolom-status-presensi">
                            <button className="pilih-status-kehadiran-btn pending">
                                <span className="status-presensi">Pending</span>
                                <Icon icon="icon-park-outline:down" className="pilih-status-icon"/>
                            </button>
                        </td>
                        <td className="kolom-waktu-verifikasi">-</td>
                    </tr>
                    <tr>
                        <td className="kolom-nama">Karina Minerva Romeda</td>
                        <td className="kolom-nim">H071221034</td>
                        <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                        <td className="kolom-jarak-lokasi">
                            <span className="status-lokasi dekat">7 m</span>
                        </td>
                        <td className="kolom-status-presensi">
                            <button className="pilih-status-kehadiran-btn valid">
                                <span className="status-presensi">Valid</span>
                                <Icon icon="icon-park-outline:down" className="pilih-status-icon"/>
                            </button>
                        </td>
                        <td className="kolom-waktu-verifikasi">16 Apr 2026, 14:10</td>
                    </tr>
                    <tr>
                        <td className="kolom-nama">Karina Minerva Romeda</td>
                        <td className="kolom-nim">H071221034</td>
                        <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                        <td className="kolom-jarak-lokasi">
                            <span className="status-lokasi dekat">5 m</span>
                        </td>
                        <td className="kolom-status-presensi">
                            <button className="pilih-status-kehadiran-btn valid">
                                <span className="status-presensi">Valid</span>
                                <Icon icon="icon-park-outline:down" className="pilih-status-icon"/>
                            </button>
                        </td>
                        <td className="kolom-waktu-verifikasi">16 Apr 2026, 14:10</td>
                    </tr>
                    <tr>
                        <td className="kolom-nama">Karina Minerva Romeda</td>
                        <td className="kolom-nim">H071221034</td>
                        <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                        <td className="kolom-jarak-lokasi">
                            <span className="status-lokasi sedang">15 m</span>
                        </td>
                        <td className="kolom-status-presensi">
                            <button className="pilih-status-kehadiran-btn invalid">
                                <span className="status-presensi">Invalid</span>
                                <Icon icon="icon-park-outline:down" className="pilih-status-icon"/>
                            </button>
                        </td>
                        <td className="kolom-waktu-verifikasi">16 Apr 2026, 14:10</td>
                    </tr>
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination-wrapper">
                <p className="page-description">Menampilkan 1-5 dari 20 data</p>

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
        </div>
    );
}

export default LihatDetail;