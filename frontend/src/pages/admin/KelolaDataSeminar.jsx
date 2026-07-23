import "../../styles/admin/KelolaDataSeminar.css";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import DetailLokasi from "../../components/DetailLokasi";

function KelolaDataSeminar() {
    const navigate = useNavigate();
    // Tabel
    const [dataSeminar, setDataSeminar] = useState([]);
    // Loading
    const [loading, setLoading] = useState(true);
    // Pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPage, setTotalPage] = useState(1);
    const [totalData, setTotalData] = useState(0);
    // Search
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    //Filter
    const [showFilter, setShowFilter] = useState(false);
    const [lokasiList, setLokasiList] = useState([]);
    const [selectedLokasi, setSelectedLokasi] = useState("Semua");
    const [selectedTanggal, setSelectedTanggal] = useState("Semua");
    const [tanggalAwal, setTanggalAwal] = useState(null);
    const [tanggalAkhir, setTanggalAkhir] = useState(null);
    // Sort
    const [sortBy, setSortBy] = useState("tanggal");
    const [sortOrder, setSortOrder] = useState("desc");
    // Search Mahasiswa - Form Add
    const [searchMahasiswa, setSearchMahasiswa] = useState("");
    const [mahasiswaList, setMahasiswaList] = useState([]);
    const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
    const [judulPenelitian, setJudulPenelitian] = useState("");
    const [tanggal, setTanggal] = useState(null);
    const [waktuMulai, setWaktuMulai] = useState(null);
    const [waktuSelesai, setWaktuSelesai] = useState(null);
    const [idLokasi, setIdLokasi] = useState("");
    const [dosenPembimbing, setDosenPembimbing] = useState("");
    const [dosenPenguji1, setDosenPenguji1] = useState("");
    const [dosenPenguji2, setDosenPenguji2] = useState("");
    // Create
    const [showFormAddSeminar, setShowFormAddSeminar] = useState(false);
    // Update
    const [isEdit, setIsEdit] = useState(false);
    const [selectedSeminar, setSelectedSeminar] = useState(null);
    // Delete
    const [selectedDeleteSeminar, setSelectedDeleteSeminar] = useState(null);
    const [showFormDeleteSeminar, setShowFormDeleteSeminar] = useState(false);
    // Map Picker
    const [showMapModal, setShowMapModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const startData = totalData === 0 ? 0 : (page - 1) * limit + 1;
    const endData = totalData === 0 ? 0 : Math.min(page * limit, totalData);

    const [errors, setErrors] = useState({});

    const clearError = (field) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    useEffect(() => {
        fetchSeminar();
    }, [page, debouncedSearch, selectedLokasi, selectedTanggal, tanggalAwal, tanggalAkhir, sortBy, sortOrder]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchLokasi();
    }, []);

    useEffect(() => {
        if (!idLokasi) {
            setSelectedLocation(null);
            return;
        }

        const lokasi = lokasiList.find(
            item => item.id_lokasi === Number(idLokasi)
        );

        setSelectedLocation(lokasi || null);
    }, [idLokasi, lokasiList]);

    const fetchSeminar = async () => {
        try {
            const response = await api.get("/data-seminar",
                {
                    params: {
                        page,
                        limit,
                        search: debouncedSearch,
                        lokasi: selectedLokasi,
                        tanggal: selectedTanggal,
                        tanggal_awal: tanggalAwal ? format(tanggalAwal, "yyyy-MM-dd") : "",
                        tanggal_akhir: tanggalAkhir ? format(tanggalAkhir, "yyyy-MM-dd") : "",
                        sort_by: sortBy,
                        sort_order: sortOrder
                    }
                }
            );
            setDataSeminar(response.data.data);
            setTotalPage(response.data.total_page);
            setTotalData(response.data.total);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLokasi = async () => {
        try{
            const res = await api.get("/filter/lokasi");
            setLokasiList(res.data);
        } catch(err) {
            console.log(err);
        }
    };

    const fetchMahasiswa = async (keyword) => {
        // Kalau input kosong, langsung sembunyikan dropdown
        if (!keyword.trim()) {
            setMahasiswaList([]);
            return;
        }

        try {
            const res = await api.get("/search/mahasiswa",
                {
                    params: {
                        search: keyword
                    }
                }
            );

            setMahasiswaList(res.data);
        } catch(err) {
            console.log(err);
        }
    };

    const getPagination = () => {
        const pages = [];

        if (totalPage <= 7) {
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
        } else {
            if (page <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPage);
            } else if (page >= totalPage - 3) {
                pages.push(
                    1,
                    "...",
                    totalPage - 4,
                    totalPage - 3,
                    totalPage - 2,
                    totalPage - 1,
                    totalPage
                );
            } else {
                pages.push(
                    1,
                    "...",
                    page - 1,
                    page,
                    page + 1,
                    "...",
                    totalPage
                );
            }
        }
        return pages;
    };

    const handleTanggalFilter = (value) => {
        setSelectedTanggal(value);

        //Menghapus input rentang tanggal
        setTanggalAwal(null);
        setTanggalAkhir(null);

        setPage(1);
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
        setPage(1);
    };

    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    const handleTambahSeminar = async () => {
        const adminId = user?.id_user;

        const newErrors = {};

        if (!selectedMahasiswa) {
            newErrors.mahasiswa = "Mahasiswa wajib dipilih";
        } else if (Boolean(selectedMahasiswa.memiliki_seminar)) {
            newErrors.mahasiswa = "Mahasiswa ini sudah memiliki jadwal seminar!";
        }

        if (!judulPenelitian.trim())
            newErrors.judul = "Judul penelitian wajib diisi";

        if (!tanggal)
            newErrors.tanggal = "Tanggal seminar wajib dipilih";

        if (!waktuMulai)
            newErrors.waktuMulai = "Waktu mulai wajib dipilih";

        if (!waktuSelesai)
            newErrors.waktuSelesai = "Waktu selesai wajib dipilih";

        if (!idLokasi)
            newErrors.lokasi = "Lokasi seminar wajib dipilih";

        if (!dosenPembimbing.trim())
            newErrors.pembimbing = "Dosen pembimbing wajib diisi";

        if (!dosenPenguji1.trim())
            newErrors.penguji1 = "Dosen penguji 1 wajib diisi";

        if (!dosenPenguji2.trim())
            newErrors.penguji2 = "Dosen penguji 2 wajib diisi";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0)
            return;

        try {
            await api.post("/data-seminar",
                {
                    id_mahasiswa: selectedMahasiswa.id_user,
                    id_user_admin: adminId,
                    id_lokasi: idLokasi,
                    judul_penelitian: judulPenelitian,
                    tanggal: format(tanggal, "yyyy-MM-dd"),
                    waktu_mulai: format(waktuMulai, "HH:mm:ss"),
                    waktu_selesai: format(waktuSelesai, "HH:mm:ss"),
                    dosen_pembimbing: dosenPembimbing,
                    dosen_penguji_1: dosenPenguji1,
                    dosen_penguji_2: dosenPenguji2
                }
            );
            alert("Data seminar Berhasil ditambahkan");

            setShowFormAddSeminar(false);
            fetchSeminar();
        } catch(err) {
            console.log(err);
        }
    };

    const handleUpdateSeminar = async () => {
        if (!selectedSeminar) {
            alert("Data seminar tidak ditemukan");
            return;
        }

        try {
            await api.put(`/edit-seminar/${selectedSeminar.id_seminar}`,
                {
                    id_mahasiswa: selectedMahasiswa?.id_user || selectedSeminar.id_user,
                    id_lokasi: idLokasi,
                    judul_penelitian: judulPenelitian,
                    tanggal: format(tanggal, "yyyy-MM-dd"),
                    waktu_mulai: format(waktuMulai, "HH:mm:ss"),
                    waktu_selesai: format(waktuSelesai, "HH:mm:ss"),
                    dosen_pembimbing: dosenPembimbing,
                    dosen_penguji_1: dosenPenguji1,
                    dosen_penguji_2: dosenPenguji2
                }
            );
            alert("Data seminar berhasil diperbarui");

            setShowFormAddSeminar(false);
            fetchSeminar();
        } catch(err) {
            console.log(err);
        }
    };

    const handleEdit = (seminar) => {
        setIsEdit(true);
        setSelectedSeminar(seminar);

        setSelectedMahasiswa({
            id_user: seminar.id_user,
            nama: seminar.nama,
            nim: seminar.nim
        });

        setSearchMahasiswa(`${seminar.nama} (${seminar.nim})`);
        setIdLokasi(seminar.id_lokasi);
        setJudulPenelitian(seminar.judul_penelitian);
        setTanggal(new Date(seminar.tanggal));
        setWaktuMulai(new Date(`1970-01-01T${seminar.waktu_mulai_asli}`));
        setWaktuSelesai(new Date(`1970-01-01T${seminar.waktu_selesai_asli}`));
        setDosenPembimbing(seminar.dosen_pembimbing);
        setDosenPenguji1(seminar.dosen_penguji_1);
        setDosenPenguji2(seminar.dosen_penguji_2);

        setShowFormAddSeminar(true);
    };

    const closeForm = () => {
        resetForm();
        setShowFormAddSeminar(false);
        setIsEdit(false);
        setSelectedSeminar(null);
    };

    const resetForm = () => {
        setErrors({});

        setIsEdit(false);
        setSelectedSeminar(null);
        setSelectedMahasiswa(null);
        setSearchMahasiswa("");
        setJudulPenelitian("");
        setTanggal(null);
        setWaktuMulai(null);
        setWaktuSelesai(null);
        setIdLokasi("");
        setSelectedLocation(null);
        setDosenPembimbing("");
        setDosenPenguji1("");
        setDosenPenguji2("");
    };

    const openForm = () => {
        resetForm();
        setShowFormAddSeminar(true);
    }

    const handleDeleteSeminar = async () => {
        if (!selectedDeleteSeminar) return;

        try {
            await api.delete(`/delete-seminar/${selectedDeleteSeminar.id_seminar}`
            );
            alert("Data seminar berhasil dihapus");

            setShowFormDeleteSeminar(false);
            setSelectedDeleteSeminar(null);

            fetchSeminar();
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log(lokasiList);
    }, [lokasiList]);

    const handleChangeLocation = (e) => {
        setIdLokasi(Number(e.target.value));
    };

    const formatTanggal = (tanggal) => {
        return new Date(tanggal).toLocaleDateString("id-ID", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
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
            <button className="add-seminar-btn" onClick={() => {resetForm(); setShowFormAddSeminar(true)}}> 
                <Icon icon="mingcute:add-fill" className="add-seminar-icon"/>
                <span>Tambah Seminar</span>
            </button>

            <div className="search-filter-kelola-data-seminar">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="search-bar-kelola-data-seminar">
                        <Icon icon="radix-icons:magnifying-glass" className="search-seminar-icon"/>
                        <input className="search-bar-input-kelola-data-seminar" type="search" placeholder="Cari mahasiswa atau NIM" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                    </div>
                </form>

                <div className="filter-dropdown-kelola-data-seminar-wrapper">
                    <button type="button" className="filter-dropdown-kelola-data-seminar" onClick={() => setShowFilter(!showFilter)}>
                        <div className="filter-content-kelola-data-seminar">
                            <Icon icon="mi:filter" className="filter-seminar-icon"/>
                            <span>Filter</span>
                        </div>

                        <Icon icon="icon-park-outline:down" className="dropdown-icon-kelola-data-seminar"/>
                    </button>

                    {/* Filter Dropdown */}
                    {showFilter && (
                        <div className="filter-menu-kelola-data-seminar">
                            <div className="filter-lokasi-seminar">
                                <h3>Lokasi</h3>

                                <label>
                                    <input type="checkbox" checked={selectedLokasi === "Semua"} onChange={() => setSelectedLokasi("Semua")}></input>
                                    Semua
                                </label>

                                {lokasiList.map((item) =>(
                                    <label key={item.nama_lokasi}>
                                        <input type="checkbox" checked={selectedLokasi === item.nama_lokasi} onChange={() => setSelectedLokasi(item.nama_lokasi)}></input>
                                        <span>{item.nama_lokasi}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="filter-tanggal-seminar">
                                <h3>Tanggal</h3>

                                <label>
                                    <input type="checkbox" checked={selectedTanggal === "Semua"} onChange={() => handleTanggalFilter("Semua")}></input>
                                    Semua
                                </label>

                                <label>
                                    <input type="checkbox" checked={selectedTanggal === "Hari Ini"} onChange={() => handleTanggalFilter("Hari Ini")}></input>
                                    Hari Ini
                                </label>

                                <label>
                                    <input type="checkbox" checked={selectedTanggal === "Minggu Ini"} onChange={() => handleTanggalFilter("Minggu Ini")}></input>
                                    Minggu Ini
                                </label>

                                <label>
                                    <input type="checkbox" checked={selectedTanggal === "Bulan Ini"} onChange={() => handleTanggalFilter("Bulan Ini")}></input>
                                    Bulan Ini
                                </label>

                                <p className="judul-rentang-tanggal-seminar">Pilih Tanggal:</p>
                                
                                <div className="seminar-date-input">
                                    <span>Dari</span>
                                    <DatePicker 
                                        selected={tanggalAwal} onChange={(date) => {setTanggalAwal(date); setSelectedTanggal("");}} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YY" className="datepicker-filter-seminar" popperPlacement="bottom-start" portalId="root">
                                    </DatePicker>
                                </div>

                                <div className="seminar-date-input">
                                    <span>Sampai</span>
                                    <DatePicker
                                        selected={tanggalAkhir} onChange={(date) => {setTanggalAkhir(date); setSelectedTanggal("");}} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YY" className="datepicker-filter-seminar" popperPlacement="bottom-start" portalId="root">
                                    </DatePicker>
                                </div>
                            </div>                            
                        </div>
                    )}
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
                                <button className="sort-thead-kelola-data-seminar" onClick={() => handleSort("nama")}>
                                    <span>Nama</span>
                                    <Icon icon="uil:sort" className="sort-seminar-icon"/>
                                </button>
                            </th>
                            <th className="th-judul">
                                <button className="sort-thead-kelola-data-seminar" onClick={() => handleSort("judul")}>
                                    <span>Judul</span>
                                    <Icon icon="uil:sort" className="sort-seminar-icon"/>
                                </button>
                            </th>
                            <th className="th-jadwal">
                                <button className="sort-thead-kelola-data-seminar" onClick={() => handleSort("tanggal")}>
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
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="loading-state-kelola-data-seminar">Memuat daftar seminar...</td>
                            </tr>
                        ) : dataSeminar.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="empty-state-kelola-data-seminar">Daftar seminar tidak ditemukan</td>
                            </tr>
                        ) : (
                            dataSeminar.map((item) => (
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
                                            <p>{formatTanggal(item.tanggal)}</p>
                                            <p>{item.waktu_mulai} - {item.waktu_selesai}</p>
                                        </div>
                                    </td>
                                    <td className="kolom-lokasi">
                                        <div className="kolom-lokasi-content">
                                            <p>{item.nama_lokasi}</p>
                                            <button className="lihat-peta-btn" onClick={() => {setSelectedLocation({nama_lokasi: item.nama_lokasi, latitude: item.latitude, longitude: item.longitude,}); setShowMapModal(true);}}>
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
                                            <button className=" aksi-btn-kelola-data-seminar edit-btn" onClick={() => handleEdit(item)}>
                                                <Icon icon="boxicons:pencil-filled" className="aksi-icon-kelola-data-seminar"/>
                                            </button>

                                            <button className=" aksi-btn-kelola-data-seminar delete-btn" onClick={() => {setSelectedDeleteSeminar(item); setShowFormDeleteSeminar(true);}}>
                                                <Icon icon="tabler:trash-filled" className="aksi-icon-kelola-data-seminar"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Pagination */}
        <div className="pagination-wrapper-kelola-data-seminar">
            <p className="page-description-kelola-data-seminar">
                Menampilkan {startData}-{endData} dari {totalData} data</p>

            <div className="pagination-kelola-data-seminar">
                <button disabled={page === 1} onClick={() => setPage((prev) => prev -1)}>
                    <Icon icon="ooui:previous-ltr" className="previous-icon-kelola-data-seminar"/>
                </button>

                {getPagination().map((item, index) => {
                    if (item === "...") {
                        return (
                            <span key={index} className="pagination-dots-kelola-data-seminar">...</span>
                        )
                    }

                    return (
                        <button key={index} className={page === item ? "active" : ""} onClick={() => setPage(item)}>
                            {item}
                        </button>
                    );
                })}

                <button disabled={page === totalPage} onClick={() => setPage((prev) => prev + 1)}>
                    <Icon icon="ooui:next-ltr" className="next-icon-kelola-data-seminar"/>
                </button>
            </div>
        </div>

        {/* Form Tambah Seminar */}
        {showFormAddSeminar && (
            <div className="form-overlay" onClick={closeForm}>
                <div className="form-add-seminar" onClick={(e) => e.stopPropagation()}>
                    <div className="form-header-wrapper">
                        <div className="form-header">
                            <Icon icon="ph:student-fill" className="student-icon"/>
                            <span>Data Seminar</span>
                        </div>
                        <button className="close-form-btn" onClick={closeForm}>
                            <Icon icon="mingcute:close-fill" />
                        </button>
                    </div>

                    <div className="form-group-search-mahasiswa">
                        <label>Mahasiswa</label>
                        <div className="form-search-mahasiswa-wrapper">
                            <div className="search-bar-form">
                                <Icon icon="radix-icons:magnifying-glass" className="search-form-icon"/>
                                <input className="search-form-input" type="search" placeholder="Cari mahasiswa atau NIM" value={searchMahasiswa} onChange={(e) => {const value = e.target.value; setSearchMahasiswa(value); fetchMahasiswa(value); clearError("mahasiswa"); setSelectedMahasiswa(null);}}></input>
                            </div>
                            {errors.mahasiswa && (<p className="error-text-seminar">{errors.mahasiswa}</p>)}

                            {searchMahasiswa.trim() !== "" &&
                                mahasiswaList.length > 0 && (
                                    <div className="dropdown-mahasiswa-list">
                                        {mahasiswaList.map((m) => (
                                            <div key={m.id_user} className="item-mahasiswa" onClick={() => {setSelectedMahasiswa(m); setSearchMahasiswa(`${m.nama} (${m.nim})`); setMahasiswaList([]); clearError("mahasiswa");}}>
                                                <b>{m.nama}</b>
                                                <p>{m.nim}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                        </div>
                    </div>

                    <div className="form-group-judul">
                        <label>Judul Penelitian</label>

                        <div className="add-seminar-input-wrapper">
                            <input type="text" placeholder="Masukkan judul skripsi mahasiswa" value={judulPenelitian} onChange={(e) => {setJudulPenelitian(e.target.value); clearError("judul");}}/>
                            {errors.judul && (<p className="error-text-seminar">{errors.judul}</p>)}
                        </div>
                    </div>

                    <div className="form-group-jadwal">
                        <label className="jadwal-title">Jadwal Seminar</label>

                        <div className="jadwal-row">
                            <label>Tanggal</label>

                            <div className="jadwal-input-wrapper">
                                <DatePicker selected={tanggal} onChange={(date) => {setTanggal(date); clearError("tanggal");}} dateFormat="dd/MM/yyyy" placeholderText="Pilih tanggal (DD/MM/YY)" className="datepicker-input-seminar"/>
                                {errors.tanggal && (<p className="error-text-seminar">{errors.tanggal}</p>)}
                            </div>
                        </div>

                        <div className="jadwal-row">
                            <label>Waktu Mulai</label>
                            
                            <div className="jadwal-input-wrapper">
                                <DatePicker selected={waktuMulai} onChange={(time) => {setWaktuMulai(time); clearError("waktuMulai");}} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Jam" dateFormat="HH:mm" placeholderText="Pilih jam mulai" className="datepicker-input-seminar"/>
                                {errors.waktuMulai && (<p className="error-text-seminar">{errors.waktuMulai}</p>)}
                            </div>
                        </div>

                        <div className="jadwal-row">
                            <label>Waktu Selesai</label>

                            <div className="jadwal-input-wrapper">
                                <DatePicker selected={waktuSelesai} onChange={(time) => {setWaktuSelesai(time); clearError("waktuSelesai");}} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Jam" dateFormat="HH:mm" placeholderText="Pilih jam selesai" className="datepicker-input-seminar"/>
                                {errors.waktuSelesai && (<p className="error-text-seminar">{errors.waktuSelesai}</p>)}
                            </div>
                        </div>
                    </div>

                    <div className="form-group-lokasi">
                        <label className="lokasi-title">Lokasi Seminar</label>
                        <div className="map-picker-wrapper">
                            <div className="custom-select-wrapper">
                                <select value={idLokasi} onChange={(e) => {handleChangeLocation(e); clearError("lokasi");}} className="custom-select-lokasi">
                                    <option value="">Pilih Lokasi</option>

                                    {lokasiList.map((lokasi) => (
                                        <option key={lokasi.id_lokasi} value={lokasi.id_lokasi}>
                                            {lokasi.nama_lokasi}
                                        </option>
                                    ))}
                                </select>
                                
                                <Icon icon="icon-park-outline:down" className="dropdown-icon-lokasi-seminar"/>
                            </div>
                            
                            <button type="button" className="map-picker-btn" disabled={!idLokasi} onClick={() => setShowMapModal (true)}>Lihat Peta</button>    
                        </div>

                        {errors.lokasi && (<p className="error-text-seminar">{errors.lokasi}</p>)}
                    </div>

                    <div className="form-group-pembimbing">
                        <label>Dosen Pembimbing</label>

                        <div className="add-seminar-input-wrapper">
                            <input type="text" placeholder="Masukkan nama dosen pembimbing" value={dosenPembimbing} onChange={(e) => {setDosenPembimbing(e.target.value); clearError("pembimbing");}}/>
                            {errors.pembimbing && (<p className="error-text-seminar">{errors.pembimbing}</p>)}
                        </div>
                    </div>

                    <div className="form-group-penguji">
                        <label>Dosen Penguji</label>

                        <div className="add-seminar-input-wrapper">
                            <input type="text" placeholder="Masukkan nama dosen penguji 1" value={dosenPenguji1} onChange={(e) => {setDosenPenguji1(e.target.value); clearError("penguji1");}}/>
                            {errors.penguji1 && (<p className="error-text-seminar">{errors.penguji1}</p>)}
                        </div>    
                            
                        <div className="add-seminar-input-wrapper">    
                            <input type="text" placeholder="Masukkan nama dosen penguji 2" value={dosenPenguji2} onChange={(e) => {setDosenPenguji2(e.target.value); clearError("penguji2");}}/>
                            {errors.penguji2 && (<p className="error-text-seminar">{errors.penguji2}</p>)}
                        </div>
                    </div>

                    <div className="add-btn-wrapper">
                        <button className="add-btn-form" onClick={isEdit ? handleUpdateSeminar : handleTambahSeminar}>
                            <Icon icon="mingcute:add-fill" className="add-icon-form"/>
                            <span>{isEdit ? "Simpan Perubahan" : "Tambah Seminar"}</span>
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
                        <button className="modal-delete-btn" onClick={handleDeleteSeminar}>Hapus</button>
                    </div>
                </div>
            </div>
        )}

        {/* Modal Map */}
        {showMapModal && selectedLocation && (
            <DetailLokasi onClose={() => setShowMapModal(false)} lokasi={selectedLocation}/>
        )}
    </div>
  );
}

export default KelolaDataSeminar;