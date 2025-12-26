import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">💪 FitnessManager</Link>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav me-auto">
                        <Link className="nav-link" to="/">Dashboard</Link>
                        <Link className="nav-link" to="/members">Membri</Link>
                        <Link className="nav-link" to="/members/add">Adaugă Membru</Link>
                    </div>

                    <div className="navbar-nav">
                        {user ? (
                            <>
                                <span className="nav-link text-info">Salut, {user}!</span>
                                <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <Link className="btn btn-primary btn-sm" to="/login">🔐 Login Admin</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;