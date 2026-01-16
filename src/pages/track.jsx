import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../fire';
import './track.css'; // We'll create this or reuse styles

function Track() {
    const [searchId, setSearchId] = useState('');
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setComplaint(null);

        try {
            const docRef = doc(db, 'complaints', searchId.trim());
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setComplaint({ id: docSnap.id, ...docSnap.data() });
            } else {
                setError('Complaint not found. Please check the ID.');
            }
        } catch (err) {
            console.error("Error fetching complaint:", err);
            setError('Error fetching details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-warning text-dark';
            case 'resolved': return 'bg-success text-white';
            case 'rejected': return 'bg-danger text-white';
            default: return 'bg-secondary text-white';
        }
    };

    return (
        <div className="container mt-5 main-container">
            <div className="header-section text-center mb-5">
                <h1><i className="fas fa-search"></i> Track Your Complaint</h1>
                <p>Enter your Complaint ID to check the current status</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm p-4 mb-5" style={{ borderRadius: '15px' }}>
                        <form onSubmit={handleSearch} className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Complaint ID (e.g. 7Af...)"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ background: 'var(--primary-color)', minWidth: '120px' }}>
                                {loading ? 'Searching...' : 'Track'}
                            </button>
                        </form>
                    </div>

                    {error && <div className="alert alert-danger text-center">{error}</div>}

                    {complaint && (
                        <div className="card shadow border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                            <div className="card-header bg-light p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 text-muted">ID: {complaint.id}</h5>
                                    <span className={`badge rounded-pill px-3 py-2 ${getStatusColor(complaint.status)}`}>
                                        {complaint.status}
                                    </span>
                                </div>
                            </div>
                            <div className="card-body p-4">
                                <h3 className="mb-3 text-primary">{complaint.subject}</h3>
                                <p className="text-muted mb-4">{complaint.description}</p>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="p-3 bg-light rounded">
                                            <small className="text-uppercase text-muted fw-bold">Category</small>
                                            <div className="mt-1 fs-5">{complaint.category}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="p-3 bg-light rounded">
                                            <small className="text-uppercase text-muted fw-bold">Date Submitted</small>
                                            <div className="mt-1 fs-5">
                                                {complaint.createdAt?.seconds ? new Date(complaint.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {complaint.fullName && (
                                <div className="card-footer bg-white p-3 text-end text-muted small">
                                    Submitted by: {complaint.fullName}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Track;
