import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import DashboardMahasiswa from "../pages/mahasiswa/DashboardMahasiswa";
import PesertaSeminarSaya from "../pages/mahasiswa/PesertaSeminar_SeminarSaya";
import PenyelenggaraSeminarSaya from "../pages/mahasiswa/PenyelenggaraSeminar_SeminarSaya";
import LihatDaftarHadir from "../pages/mahasiswa/LihatDaftarHadir.jsx";
import Presensi from "../pages/mahasiswa/Presensi";
import RiwayatPresensi from "../pages/mahasiswa/RiwayatPresensi";
import DashboardVerifikator from "../pages/verifikator/DashboardVerifikator";
import DashboardAdmin from "../pages/admin/DashboardAdmin";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard-mahasiswa" element={<DashboardMahasiswa />}/>
      <Route path="/peserta-seminar-saya" element={<PesertaSeminarSaya />}/>
      <Route path="/penyelenggara-seminar-saya" element={<PenyelenggaraSeminarSaya />}/>
      <Route path="/lihat-daftar-hadir" element={<LihatDaftarHadir />}/>
      <Route path="/presensi" element={<Presensi />}/>
      <Route path="/riwayat-presensi" element={<RiwayatPresensi />}/>
      <Route path="/dashboard-verifikator" element={<DashboardVerifikator />}/>
      <Route path="/dashboard-admin" element={<DashboardAdmin />}/>
    </Routes>
  );
}

export default AppRoutes;