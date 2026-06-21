import "../../styles/admin/LaporanPresensi.css";
import { Icon } from '@iconify/react';

function LaporanPresensi() {
  return (
    <div className="page-menu-laporan-presensi-layout">
        {/* Navbar */}
        <nav className="navbar-menu-laporan-presensi">
            <button className="back-btn">
                <Icon icon="weui:back-filled" className="back-icon"/>
                <span>Kembali</span>
            </button>

            <h1>LAPORAN PRESENSI</h1>
        </nav>

        {/* Export, Search Bar, Filter */}
        <div className="header-laporan-presensi-wrapper">
            <button className="export-btn">
                <Icon icon="ic:round-download" className="export-icon"/>
                <span>Export Ke Excel</span>
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
        <table className="tabel-laporan-presensi">
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
                    <th>Kehadiran</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-kehadiran">10</td>
                    <td className="kolom-status">
                        <span className="status-presensi">Memenuhi</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-kehadiran">10</td>
                    <td className="kolom-status">
                        <span className="status-presensi">Memenuhi</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-kehadiran">10</td>
                    <td className="kolom-status">
                        <span className="status-presensi">Memenuhi</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-kehadiran">10</td>
                    <td className="kolom-status">
                        <span className="status-presensi">Memenuhi</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-kehadiran">10</td>
                    <td className="kolom-status">
                        <span className="status-presensi">Memenuhi</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-kehadiran">10</td>
                    <td className="kolom-status">
                        <span className="status-presensi">Memenuhi</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-kehadiran">10</td>
                    <td className="kolom-status">
                        <span className="status-presensi">Memenuhi</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-kehadiran">10</td>
                    <td className="kolom-status">
                        <span className="status-presensi">Memenuhi</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-kehadiran">10</td>
                    <td className="kolom-status">
                        <span className="status-presensi">Memenuhi</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-angkatan">2022</td>
                    <td className="kolom-kehadiran">10</td>
                    <td className="kolom-status">
                        <span className="status-presensi">Memenuhi</span>
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
    </div>
  );
}

export default LaporanPresensi;