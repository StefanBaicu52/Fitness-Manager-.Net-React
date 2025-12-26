import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMemberPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [planId, setPlanId] = useState('');
    const [plans, setPlans] = useState([]);

    // PROTECȚIE: Dacă nu există user în localStorage, trimite-l la login
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            alert("Acces interzis! Te rugăm să te loghezi.");
            navigate('/login');
        }

        axios.get('https://localhost:7000/api/SubscriptionPlans')
            .then(res => {
                setPlans(res.data);
                if (res.data.length > 0) setPlanId(res.data[0].id);
            })
            .catch(err => console.error(err));
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:7000/api/Members', {
                name,
                email,
                planId: parseInt(planId)
            });
            alert("Membru adăugat!");
            navigate('/members');
        } catch (err) { alert("Eroare la adăugare."); }
    };

    return (
        <div className="container mt-5">
            {/* ... (restul formularului rămâne neschimbat) ... */}
            <div className="card shadow mx-auto" style={{ maxWidth: '500px' }}>
                <div className="card-body">
                    <h2 className="text-center mb-4">Adaugă Membru Nou</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nume Complet</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Alege Abonament</label>
                            <select className="form-select" value={planId} onChange={(e) => setPlanId(e.target.value)}>
                                {plans.map(plan => (
                                    <option key={plan.id} value={plan.id}>
                                        {plan.name} - {plan.price} RON ({plan.durationMonths} luni)
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success w-100">Creează Membru</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddMemberPage;