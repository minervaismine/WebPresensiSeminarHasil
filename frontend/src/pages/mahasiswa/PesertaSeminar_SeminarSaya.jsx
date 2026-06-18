import "../../styles/mahasiswa/PesertaSeminar_SeminarSaya.css";
import { Icon } from '@iconify/react';

function PesertaSeminar_SeminarSaya() {
  return (
    <div className="page-menu-seminar-saya-peserta-layout">
        {/* Navbar */}
        <nav className="navbar-menu-seminar-saya-peserta">
            <button className="back-btn-menu-seminar-saya-peserta">
                <Icon icon="weui:back-filled" className="back-btn-menu-seminar-saya-peserta-icon"/>
                <span>Kembali</span>
            </button>

            <h1>SEMINAR SAYA</h1>
        </nav>

        {/* Content */}
        <div className="menu-seminar-saya-peserta-container">
            <Icon icon="boxicons:calendar-x-filled" className="no-calendar-icon"/>

            <div className="empty-state-content">
                <h1>Belum ada seminar yang diajukan</h1>
                <p>Anda belum mengajukan seminar hasil. Pastikan Anda telah memenuhi syarat kehadiran minimal 3 kali sebagai peserta seminar sebelum mengajukan jadwal.</p>
            </div>
        </div>
    </div>
  );
}

export default PesertaSeminar_SeminarSaya;