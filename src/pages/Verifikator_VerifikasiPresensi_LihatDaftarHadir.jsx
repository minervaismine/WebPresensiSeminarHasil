import "../styles/Verifikator_VerifikasiPresensi_LihatDaftarHadir.css";
import { Icon } from '@iconify/react';

function VerifikasiPresensi_LihatDaftarHadir() {
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

        {/* Detail Seminar */}
        <div className="detail-seminar-wrapper">
            {/* Left */}
            <div className="left-content">
                <div className="content-seminar">
                    <h1 className="nama-mahasiswa">Karina Minerva Romeda</h1>
                    <div className="jadwal-seminar">
                        <span>Senin, 13 April 2026</span>
                        <span>|</span>
                        <span>13.00 - 14.30</span>
                    </div>

                    <span className="status-badge selesai">Selesai</span>
                </div>
            </div>
            
            {/* Right */}
            <div className="right-content">
                <div className="stat-card">
                    <div className="stat-content">
                        <h3>Total Peserta</h3>
                        <h1>20</h1>
                    </div>

                    <div className="stat-icon-wrapper">
                        <Icon icon="bi:people-fill" className="people-icon"/>
                    </div>
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

        {/* Tabel */}
        <table className="tabel-daftar-hadir-verifikator">
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

export default VerifikasiPresensi_LihatDaftarHadir;