import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
    const [stats, setStats] = useState({ total: 0, active: 0, expired: 0 });

    useEffect(() => {
        axios.get("https://localhost:7000/api/Members")
            .then(res => {
                const members = res.data;
                const now = new Date();
                const active = members.filter(m => new Date(m.expirationDate) > now).length;
                setStats({
                    total: members.length,
                    active: active,
                    expired: members.length - active
                });
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2 className="fw-bold mb-4">Panou de Control</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card bg-primary text-white border-0 shadow-sm mb-4">
                        <div className="card-body p-4 text-center">
                            <h6 className="text-uppercase small fw-bold">Total Membri</h6>
                            <h1 className="display-4 fw-bold">{stats.total}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white border-0 shadow-sm mb-4">
                        <div className="card-body p-4 text-center">
                            <h6 className="text-uppercase small fw-bold">Abonamente Active</h6>
                            <h1 className="display-4 fw-bold">{stats.active}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-danger text-white border-0 shadow-sm mb-4">
                        <div className="card-body p-4 text-center">
                            <h6 className="text-uppercase small fw-bold">Abonamente Expirate</h6>
                            <h1 className="display-4 fw-bold">{stats.expired}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;