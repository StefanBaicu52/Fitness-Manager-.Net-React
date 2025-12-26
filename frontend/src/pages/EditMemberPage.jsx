import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditMemberPage() {
    const { id } = useParams(); // Luăm ID-ul din link
    const navigate = useNavigate();
    const [member, setMember] = useState({ name: '', email: '', isActive: true });
    const API_URL = `https://localhost:7000/api/Members/${id}`;

    // 1. Încărcăm datele actuale ale membrului când se deschide pagina
    useEffect(() => {
        axios.get(API_URL)
            .then(res => setMember(res.data))
            .catch(err => console.error("Eroare la încărcare:", err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(API_URL, member);
            alert("Membru actualizat cu succes!");
            navigate('/members'); // Ne întoarcem la listă
        } catch (err) {
            alert("Eroare la salvarea modificărilor.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow mx-auto" style={{ maxWidth: '500px' }}>
                <div className="card-body">
                    <h2 className="text-center mb-4">Editare Membru</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nume Complet</label>
                            <input
                                type="text" className="form-control"
                                value={member.name}
                                onChange={(e) => setMember({ ...member, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email" className="form-control"
                                value={member.email}
                                onChange={(e) => setMember({ ...member, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox" className="form-check-input" id="activeCheck"
                                checked={member.isActive}
                                onChange={(e) => setMember({ ...member, isActive: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="activeCheck">Membru Activ</label>
                        </div>
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success flex-grow-1">Salvează Modificările</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/members')}>Anulează</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditMemberPage;