import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://localhost:7000/api/Auth/login', {
                username,
                password
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', res.data.username);

            alert("Te-ai logat cu succes!");
            navigate('/');
            window.location.reload();
        } catch (err) {
            alert("Eroare: " + (err.response?.data || "Server indisponibil"));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="card-body p-5 text-center">
                    <h2 className="mb-4 fw-bold">🔐 Autentificare</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3 text-start">
                            <label className="form-label fw-bold">Utilizator</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Ex: admin"
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4 text-start">
                            <label className="form-label fw-bold">Parolă</label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="••••••••"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="btn btn-primary btn-lg w-100 shadow-sm">Intră în sistem</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;