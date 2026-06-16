import "../../styles/mahasiswa/PesertaSeminar_SeminarSaya.css";
import { Icon } from '@iconify/react';

function MahasiswaPesertaSeminar_MenuSeminarSaya() {
  return (
    <div className="page-menu-seminar-saya-layout">
        {/* Navbar */}
        <nav className="navbar-menu-seminar-saya">
            <button className="back-btn">
                <Icon icon="weui:back-filled" className="back-icon"/>
                <span>Kembali</span>
            </button>

            <h1>SEMINAR SAYA</h1>
        </nav>

        {/* Content */}
        <div className="menu-seminar-saya-container">
            <Icon icon="boxicons:calendar-x-filled" className="no-calendar-icon"/>
            <h1>Belum ada seminar yang diajukan</h1>
            <p>Anda belum mengajukan seminar hasil. Pastikan Anda telah memenuhi syarat kehadiran minimal 3 kali sebagai peserta seminar sebelum mengajukan jadwal.</p>
        </div>
    </div>
  );
}

export default MahasiswaPesertaSeminar_MenuSeminarSaya;