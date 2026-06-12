import "../styles/Login.css";
import { Icon } from '@iconify/react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const DUMMY_USER = {
        username: "H071221034",
        password: "718686"
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        setUsernameError("");
        setPasswordError("");

        let hasError = false;

        //Jika username kosong
        if (!username.trim()) {
            setUsernameError("Username wajib diisi");
            hasError = true;
        }
        //Jika password kosong
        if (!password.trim()) {
            setPasswordError("Password wajib diisi");
            hasError = true;
        }

        if (hasError) return;

        //Validasi username
        if (username !== DUMMY_USER.username) {
            setUsernameError("Username salah");
            hasError = true;
        }

        //Validasi password
        if (password !== DUMMY_USER.password) {
            setPasswordError("Password salah");
            hasError = true;
        }

        if (hasError) return;

        //Login berhasil
        navigate("/dashboard-mahasiswa");
    };

    return (
        <div className="sign-in-container">
            <div className="sign-in-card">
                {/* Title */}
                <h1>WEB MONITORING SEMINAR</h1>

                <form onSubmit={handleLogin}>
                    {/* Username & Password */}
                    <div className="form-group-username">
                        <label>Username</label>

                        <div className="input-wrapper">
                            <div className="icon-box">
                                <Icon icon="material-symbols:person-rounded" className="user-icon"/>
                            </div>

                            <input
                                type="text"
                                placeholder="Masukkan username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setUsernameError("");
                                }}
                            />
                        </div>

                        {usernameError && (
                            <p className="error-message">
                                {usernameError}
                            </p>
                        )}
                    </div>

                    <div className="form-group-password">
                        <label>Password</label>

                        <div className="input-wrapper">
                            <div className="icon-box">
                                <Icon icon="majesticons:lock" className="password-icon"/>
                            </div>

                            <input
                                type="password"
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                            />
                        </div>

                        {passwordError && (
                            <p className="error-message">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    {/* Remember Password */}
                    <div className="remember-password">
                        <input type="checkbox" id="rememberPassword" />
                        <label htmlFor="rememberPassword">Remember Password</label>
                    </div>

                    {/* Button Sign In */}
                    <button className="sign-in-btn" onClick={handleLogin}>Sign In</button>

                    {/* Notes */}
                    <div className="divider">
                        <span>Login Menggunakan</span>
                    </div>

                    <p className="info-text">Account APPS untuk Dosen atau Account Neosia untuk Mahasiswa</p>
                </form>
            </div>
        </div>
    );
}

export default Login;