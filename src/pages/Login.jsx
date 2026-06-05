import "../styles/Login.css";
import { Icon } from '@iconify/react';

function Login() {
  return (
    <div className="sign-in-container">
        <div className="sign-in-card">
            {/* Title */}
            <h1>WEB MONITORING SEMINAR</h1>

            {/* Username & Password */}
            <div className="form-group-username">
                <label>Username</label>

                <div className="input-wrapper">
                    <div className="icon-box">
                        <Icon icon="material-symbols:person-rounded" className="user-icon"/>
                    </div>

                    <input type="text" placeholder="Masukkan username" />
                </div>
            </div>

            <div className="form-group-password">
                <label>Password</label>

                <div className="input-wrapper">
                    <div className="icon-box">
                        <Icon icon="majesticons:lock" className="password-icon"/>
                    </div>

                    <input type="password" placeholder="Masukkan password" />
                </div>
            </div>

            {/* Remember Password */}
            <div className="remember-password">
                <input type="checkbox" id="rememberPassword" />
                <label htmlFor="rememberPassword">Remember Password</label>
            </div>

            {/* Button Sign In */}
            <button className="sign-in-btn">Sign In</button>

            {/* Notes */}
            <div className="divider">
                <span>Login Menggunakan</span>
            </div>

            <p className="info-text">Account APPS untuk Dosen atau Account Neosia untuk Mahasiswa</p>
        </div>
    </div>
  );
}

export default Login;