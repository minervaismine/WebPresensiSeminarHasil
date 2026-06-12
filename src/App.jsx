import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardMahasiswa from "./pages/DashboardMahasiswa";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard-mahasiswa" element={<DashboardMahasiswa />}/>
    </Routes>
  );
}

export default App;