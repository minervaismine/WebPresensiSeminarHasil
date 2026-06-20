import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import DashboardMahasiswa from "../pages/mahasiswa/DashboardMahasiswa";
import PesertaSeminarSaya from "../pages/mahasiswa/PesertaSeminar_SeminarSaya";
import PenyelenggaraSeminarSaya from "../pages/mahasiswa/PenyelenggaraSeminar_SeminarSaya";
import LihatDaftarHadir from "../pages/mahasiswa/LihatDaftarHadir.jsx";
import PresensiBerhasil from "../pages/mahasiswa/PresensiBerhasil.jsx";
import PresensiGagal from "../pages/mahasiswa/PresensiGagal.jsx";
import PresensiGagalRole from "../pages/mahasiswa/PresensiGagal_Role.jsx";
import Presensi from "../pages/mahasiswa/Presensi";
import RiwayatPresensi from "../pages/mahasiswa/RiwayatPresensi";
import DashboardVerifikator from "../pages/verifikator/DashboardVerifikator";
import DashboardAdmin from "../pages/admin/DashboardAdmin";

function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Mahasiswa */}
      <Route path="/dashboard-mahasiswa" element={<DashboardMahasiswa />}/>
      <Route path="/peserta-seminar-saya" element={<PesertaSeminarSaya />}/>
      <Route path="/penyelenggara-seminar-saya" element={<PenyelenggaraSeminarSaya />}/>
      <Route path="/presensi-berhasil" element={<PresensiBerhasil />}/>
      <Route path="/presensi-gagal" element={<PresensiGagal />}/>
      <Route path="/presensi-gagal-role" element={<PresensiGagalRole />}/>
      <Route path="/lihat-daftar-hadir" element={<LihatDaftarHadir />}/>
      <Route path="/presensi" element={<Presensi />}/>
      <Route path="/riwayat-presensi" element={<RiwayatPresensi />}/>
      
      {/* Verifikator */}
      <Route path="/dashboard-verifikator" element={<DashboardVerifikator />}/>
      
      {/* Admin */}
      <Route path="/dashboard-admin" element={<DashboardAdmin />}/>
    </Routes>
  );
}

export default AppRoutes;