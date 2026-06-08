import "../styles/Admin_KelolaDataMahasiswa.css";
import { Icon } from '@iconify/react';

function LaporanPresensi() {
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
            <button className="add-btn">
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

                            <button className=" aksi-btn delete-btn">
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

                            <button className=" aksi-btn delete-btn">
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

                            <button className=" aksi-btn delete-btn">
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

                            <button className=" aksi-btn delete-btn">
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

                            <button className=" aksi-btn delete-btn">
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

                            <button className=" aksi-btn delete-btn">
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

                            <button className=" aksi-btn delete-btn">
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

                            <button className=" aksi-btn delete-btn">
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

                            <button className=" aksi-btn delete-btn">
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

                            <button className=" aksi-btn delete-btn">
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
    </div>
  );
}

export default LaporanPresensi;