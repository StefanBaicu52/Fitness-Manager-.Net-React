import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MembersPage() {
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const API_URL = "https://localhost:7000/api/Members";

    // --- LOGICA DE VERIFICARE ---
    // Verificăm dacă există un user salvat în localStorage
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const isLoggedIn = user && token; // Trebuie să avem și nume și token
    // ----------------------------

    const fetchMembers = async () => {
        try {
            const res = await axios.get(API_URL);
            setMembers(res.data);
        } catch (err) { console.error("Eroare la preluare:", err); }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDelete = async (id) => {
        if (!isLoggedIn) {
            alert("Nu ai voie să ștergi!");
            return;
        }

        if (window.confirm("Sigur vrei să elimini acest membru?")) {
            try {
                await axios.delete(`${API_URL}/${id}`, {
                    headers: { 'Authorization': token }
                });
                setMembers(members.filter(m => m.id !== id));
            } catch (err) {
                alert("Eroare la ștergere: " + (err.response?.data || "Acces interzis"));
            }
        }
    };

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h4 className="m-0 fw-bold text-primary">👥 Gestiune Membri</h4>
                <div className="d-flex gap-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Caută membru..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {isLoggedIn && (
                        <Link to="/members/add" className="btn btn-primary text-nowrap">
                            + Adaugă Nou
                        </Link>
                    )}
                </div>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Nume Membru</th>
                                <th>Email</th>
                                <th>Dată Expirare</th>
                                <th>Status</th>
                                {isLoggedIn && <th className="text-end px-4">Administrare</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map(m => {
                                const isExpired = new Date(m.expirationDate) < new Date();
                                return (
                                    <tr key={m.id}>
                                        <td className="fw-bold">{m.name}</td>
                                        <td className="text-muted">{m.email}</td>
                                        <td>{new Date(m.expirationDate).toLocaleDateString('ro-RO')}</td>
                                        <td>
                                            {isExpired ?
                                                <span className="badge bg-danger">Expirat</span> :
                                                <span className="badge bg-success">Activ</span>
                                            }
                                        </td>

                                        {isLoggedIn ? (
                                            <td className="text-end px-4">
                                                <Link to={`/members/edit/${m.id}`} className="btn btn-sm btn-outline-warning me-2">
                                                    Editează
                                                </Link>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m.id)}>
                                                    Șterge
                                                </button>
                                            </td>
                                        ) : null}

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MembersPage;