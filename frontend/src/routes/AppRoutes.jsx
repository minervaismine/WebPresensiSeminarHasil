import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import DashboardMahasiswa from "../pages/mahasiswa/DashboardMahasiswa";
import DashboardVerifikator from "../pages/verifikator/DashboardVerifikator";
import DashboardAdmin from "../pages/admin/DashboardAdmin";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard-mahasiswa" element={<DashboardMahasiswa />}/>
      <Route path="/dashboard-verifikator" element={<DashboardVerifikator />}/>
      <Route path="/dashboard-admin" element={<DashboardAdmin />}/>
    </Routes>
  );
}

export default AppRoutes;