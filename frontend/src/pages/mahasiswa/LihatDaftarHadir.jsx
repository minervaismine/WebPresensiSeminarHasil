import "../styles/MahasiswaPenyelenggaraSeminar_MenuSeminarSaya_LihatDaftarHadir.css";
import { Icon } from '@iconify/react';

function LihatDaftarHadir() {
  return (
    <div className="page-lihat-daftar-hadir-layout">
        {/* Navbar */}
        <nav className="navbar-menu-seminar-saya">
            <button className="back-btn">
                <Icon icon="weui:back-filled" className="back-icon"/>
                <span>Kembali</span>
            </button>

            <h1>SEMINAR SAYA</h1>
        </nav>

        {/* Header */}
        <div className="header-wrapper">
            <h1 className="page-title">Daftar Hadir</h1>

            <form>
                <div className="search-bar">
                    <Icon icon="radix-icons:magnifying-glass" className="search-icon"/>
                    <input className="search-bar-input" type="search" placeholder="Cari mahasiswa atau NIM"></input>
                </div>
            </form>
        </div>

        {/* Table */}
        <table className="tabel-daftar-hadir-penyelenggara-seminar">
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
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                    <td className="kolom-jarak-lokasi">
                        <span className="status-lokasi dekat">10 m</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                    <td className="kolom-jarak-lokasi">
                        <span className="status-lokasi dekat">7 m</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                    <td className="kolom-jarak-lokasi">
                        <span className="status-lokasi sedang">15 m</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                    <td className="kolom-jarak-lokasi">
                        <span className="status-lokasi sedang">15 m</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                    <td className="kolom-jarak-lokasi">
                        <span className="status-lokasi sedang">15 m</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                    <td className="kolom-jarak-lokasi">
                        <span className="status-lokasi sedang">15 m</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                    <td className="kolom-jarak-lokasi">
                        <span className="status-lokasi sedang">15 m</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                    <td className="kolom-jarak-lokasi">
                        <span className="status-lokasi sedang">15 m</span>
                    </td>
                </tr>
                <tr>
                    <td className="kolom-nama">Karina Minerva Romeda</td>
                    <td className="kolom-nim">H071221034</td>
                    <td className="kolom-waktu-scan">15 April 2026, 10:30</td>
                    <td className="kolom-jarak-lokasi">
                        <span className="status-lokasi dekat">5 m</span>
                    </td>
                </tr>
            </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-wrapper">
            <p className="page-description">Menampilkan 1-10 dari 12 data</p>

            <div className="pagination">
                <a href="#">
                    <Icon icon="ooui:previous-ltr" className="previous-icon"/>
                </a>
                <a href="#" className="active">1</a>
                <a href="#">2</a>
                <a href="#">
                    <Icon icon="ooui:next-ltr" className="next-icon"/>
                </a>
            </div>
        </div>
    </div>
  );
}

export default LihatDaftarHadir;