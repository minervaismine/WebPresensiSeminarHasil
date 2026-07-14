import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import Login from "../pages/auth/Login";
import DashboardMahasiswa from "../pages/mahasiswa/DashboardMahasiswa";
import PesertaSeminarSaya from "../pages/mahasiswa/PesertaSeminar_SeminarSaya";
import PenyelenggaraSeminarSaya from "../pages/mahasiswa/PenyelenggaraSeminar_SeminarSaya";
import LihatDaftarHadir from "../pages/mahasiswa/LihatDaftarHadir";
import PresensiBerhasil from "../pages/mahasiswa/PresensiBerhasil";
import PresensiGagal from "../pages/mahasiswa/PresensiGagal";
import PresensiGagalRole from "../pages/mahasiswa/PresensiGagal_Role";
import Presensi from "../pages/mahasiswa/Presensi";
import RiwayatPresensi from "../pages/mahasiswa/RiwayatPresensi";
import DashboardVerifikator from "../pages/verifikator/DashboardVerifikator";
import VerifikasiPresensi from "../pages/verifikator/VerifikasiPresensi";
import VerifikasiPresensi_LihatDaftarHadir from "../pages/verifikator/VerifikasiPresensi_LihatDaftarHadir";
import RiwayatVerifikasi from "../pages/verifikator/RiwayatVerifikasi";
import RiwayatVerifikasi_LihatDetail from "../pages/verifikator/RiwayatVerifikasi_LihatDetail";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import KelolaDataLokasi from "../pages/admin/KelolaDataLokasi";
import KelolaDataSeminar from "../pages/admin/KelolaDataSeminar";
import LaporanPresensi from "../pages/admin/LaporanPresensi";

function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Mahasiswa */}
      <Route path="/dashboard-mahasiswa" element={<ProtectedRoute allowedRoles={["mahasiswa"]}><DashboardMahasiswa /></ProtectedRoute>}/>
      <Route path="/peserta-seminar-saya" element={<ProtectedRoute allowedRoles={["mahasiswa"]} seminarType="peserta"><PesertaSeminarSaya /></ProtectedRoute>}/>
      <Route path="/penyelenggara-seminar-saya" element={<ProtectedRoute allowedRoles={["mahasiswa"]} seminarType="penyelenggara"><PenyelenggaraSeminarSaya /></ProtectedRoute>}/>
      <Route path="/presensi-berhasil" element={<ProtectedRoute allowedRoles={["mahasiswa"]}><PresensiBerhasil /></ProtectedRoute>}/>
      <Route path="/presensi-gagal" element={<ProtectedRoute allowedRoles={["mahasiswa"]}><PresensiGagal /></ProtectedRoute>}/>
      <Route path="/presensi-gagal-role" element={<ProtectedRoute allowedRoles={["mahasiswa"]}><PresensiGagalRole /></ProtectedRoute>}/>
      <Route path="/lihat-daftar-hadir/:idSeminar" element={<ProtectedRoute allowedRoles={["mahasiswa"]} seminarType="penyelenggara"><LihatDaftarHadir /></ProtectedRoute>}/>
      <Route path="/presensi" element={<ProtectedRoute allowedRoles={["mahasiswa"]}><Presensi /></ProtectedRoute>}/>
      <Route path="/riwayat-presensi" element={<ProtectedRoute allowedRoles={["mahasiswa"]}><RiwayatPresensi /></ProtectedRoute>}/>
      
      {/* Verifikator */}
      <Route path="/dashboard-verifikator" element={<ProtectedRoute allowedRoles={["verifikator"]}><DashboardVerifikator /></ProtectedRoute>}/>
      <Route path="/verifikasi-presensi" element={<ProtectedRoute allowedRoles={["verifikator"]}><VerifikasiPresensi /></ProtectedRoute>}/>
      <Route path="/riwayat-verifikasi" element={<ProtectedRoute allowedRoles={["verifikator"]}><RiwayatVerifikasi /></ProtectedRoute>}/>
      <Route path="/verifikator-lihat-daftar-hadir/:id_seminar" element={<ProtectedRoute allowedRoles={["verifikator"]}><VerifikasiPresensi_LihatDaftarHadir /></ProtectedRoute>}/>
      <Route path="/riwayat-verifikasi-lihat-detail/:id_seminar" element={<ProtectedRoute allowedRoles={["verifikator"]}><RiwayatVerifikasi_LihatDetail /></ProtectedRoute>}/>
      
      {/* Admin */}
      <Route path="/dashboard-admin" element={<ProtectedRoute allowedRoles={["admin"]}><DashboardAdmin /></ProtectedRoute>}/>
      <Route path="/kelola-data-seminar" element={<ProtectedRoute allowedRoles={["admin"]}><KelolaDataSeminar /></ProtectedRoute>}/>
      <Route path="/kelola-data-lokasi" element={<ProtectedRoute allowedRoles={["admin"]}><KelolaDataLokasi /></ProtectedRoute>}/>
      <Route path="/laporan-presensi" element={<ProtectedRoute allowedRoles={["admin"]}><LaporanPresensi /></ProtectedRoute>}/>
    </Routes>
  );
}

export default AppRoutes;