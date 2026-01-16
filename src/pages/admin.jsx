import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../fire';
import { useToast } from '../context/ToastContext';

function Admin() {
    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const { addToast } = useToast();

    useEffect(() => {
        const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const complaintList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComplaints(complaintList);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching complaints: ", error);
            addToast("Error fetching complaints", 'error');
            setLoading(false);
        });

        return () => unsubscribe();
    }, [addToast]);

    useEffect(() => {
        if (filterStatus === 'All') {
            setFilteredComplaints(complaints);
        } else {
            setFilteredComplaints(complaints.filter(c => c.status === filterStatus));
        }
    }, [complaints, filterStatus]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, 'complaints', id), {
                status: newStatus
            });
            addToast(`Status updated to ${newStatus}`, 'success');
        } catch (error) {
            console.error("Error updating status: ", error);
            addToast("Failed to update status", 'error');
        }
    };

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'badge bg-warning text-dark';
            case 'resolved': return 'badge bg-success';
            case 'rejected': return 'badge bg-danger';
            case 'in progress': return 'badge bg-info text-dark';
            default: return 'badge bg-secondary';
        }
    };

    const getPriorityBadge = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'urgent': return <span className="badge bg-danger">Urgent</span>;
            case 'high': return <span className="badge bg-danger bg-opacity-75">High</span>;
            case 'medium': return <span className="badge bg-warning text-dark">Medium</span>;
            case 'low': return <span className="badge bg-secondary">Low</span>;
            default: return <span className="badge bg-light text-dark border">Normal</span>;
        }
    }

    // Calculation for Stats
    const totalComplaints = complaints.length;
    const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
    const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;

    return (
        <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                <h2 className="text-dark fw-bold mb-3 mb-md-0"><i className="fas fa-user-shield text-primary me-2"></i> Admin Dashboard</h2>
                <div className="d-flex gap-3">
                    <div className="bg-white p-3 rounded shadow-sm d-flex align-items-center">
                        <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3 text-primary">
                            <i className="fas fa-file-alt fa-lg"></i>
                        </div>
                        <div>
                            <p className="mb-0 small text-muted text-uppercase fw-bold">Total</p>
                            <h4 className="mb-0 fw-bold">{totalComplaints}</h4>
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm d-flex align-items-center">
                        <div className="rounded-circle bg-warning bg-opacity-10 p-2 me-3 text-warning">
                            <i className="fas fa-clock fa-lg"></i>
                        </div>
                        <div>
                            <p className="mb-0 small text-muted text-uppercase fw-bold">Pending</p>
                            <h4 className="mb-0 fw-bold">{pendingComplaints}</h4>
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm d-flex align-items-center">
                        <div className="rounded-circle bg-success bg-opacity-10 p-2 me-3 text-success">
                            <i className="fas fa-check-circle fa-lg"></i>
                        </div>
                        <div>
                            <p className="mb-0 small text-muted text-uppercase fw-bold">Resolved</p>
                            <h4 className="mb-0 fw-bold">{resolvedComplaints}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-white p-3 border-0 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold text-muted">All Complaints</h5>
                    <div className="d-flex align-items-center">
                        <span className="me-2 text-muted small">Filter by Status:</span>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: '150px' }}
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <div className="card-body p-0">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light text-uppercase text-secondary small">
                                    <tr>
                                        <th className="ps-4">Details</th>
                                        <th>Date</th>
                                        <th>Subject</th>
                                        <th>Category</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredComplaints.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-5 text-muted">
                                                <i className="fas fa-inbox fa-3x mb-3 text-light"></i>
                                                <p>No complaints found matching criteria.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredComplaints.map(complaint => (
                                            <tr key={complaint.id}>
                                                <td className="ps-4">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary rounded-pill px-3"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#detailModal"
                                                        onClick={() => setSelectedComplaint(complaint)}
                                                    >
                                                        <i className="fas fa-eye me-1"></i> View
                                                    </button>
                                                </td>
                                                <td className="small text-muted">
                                                    {complaint.createdAt?.seconds ? new Date(complaint.createdAt.seconds * 1000).toLocaleDateString() : '-'}
                                                </td>
                                                <td className="fw-medium">
                                                    <div className="text-truncate" style={{ maxWidth: '200px' }} title={complaint.subject}>
                                                        {complaint.subject}
                                                    </div>
                                                </td>
                                                <td><span className="badge bg-light text-dark border">{complaint.category}</span></td>
                                                <td>{getPriorityBadge(complaint.priority)}</td>
                                                <td>
                                                    <span className={getStatusBadge(complaint.status)}>{complaint.status}</span>
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-select form-select-sm"
                                                        style={{ width: '140px', borderRadius: '20px', cursor: 'pointer' }}
                                                        value={complaint.status}
                                                        onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Resolved">Resolved</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Complaint Detail Modal */}
            <div className="modal fade" id="detailModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title fw-bold text-primary">
                                <i className="fas fa-clipboard-list me-2"></i> Complaint Details
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {selectedComplaint && (
                            <div className="modal-body p-4">
                                <div className="row g-4">
                                    <div className="col-md-8 border-end">
                                        <div className="mb-4">
                                            <h6 className="text-uppercase text-muted small fw-bold mb-2">Subject</h6>
                                            <h4 className="fw-bold text-dark">{selectedComplaint.subject}</h4>
                                        </div>

                                        <div className="mb-4">
                                            <h6 className="text-uppercase text-muted small fw-bold mb-2">Description</h6>
                                            <p className="lead fs-6 text-secondary bg-light p-3 rounded">{selectedComplaint.description}</p>
                                        </div>

                                        <div className="mb-4">
                                            <h6 className="text-uppercase text-muted small fw-bold mb-2">Location / Address</h6>
                                            <p className="text-dark"><i className="fas fa-map-marker-alt text-danger me-2"></i> {selectedComplaint.address || 'Address not provided'}</p>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="card border-0 bg-light mb-3">
                                            <div className="card-body">
                                                <h6 className="card-title text-uppercase text-muted small fw-bold mb-3">Status Info</h6>
                                                <div className="mb-3">
                                                    <small className="d-block text-muted">Current Status</small>
                                                    <span className={`fs-6 ${getStatusBadge(selectedComplaint.status)}`}>{selectedComplaint.status}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <small className="d-block text-muted">Priority</small>
                                                    {getPriorityBadge(selectedComplaint.priority)}
                                                </div>
                                                <div className="mb-3">
                                                    <small className="d-block text-muted">Category</small>
                                                    <span className="fw-bold">{selectedComplaint.category}</span>
                                                </div>
                                                <div className="mb-0">
                                                    <small className="d-block text-muted">Date Submitted</small>
                                                    <span className="fw-bold">{selectedComplaint.createdAt?.seconds ? new Date(selectedComplaint.createdAt.seconds * 1000).toLocaleDateString() : '-'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card border-0 bg-light">
                                            <div className="card-body">
                                                <h6 className="card-title text-uppercase text-muted small fw-bold mb-3">User Details</h6>
                                                <div className="mb-2">
                                                    <i className="fas fa-user-circle text-primary me-2"></i> {selectedComplaint.fullName}
                                                </div>
                                                <div className="mb-2 text-truncate" title={selectedComplaint.email}>
                                                    <i className="fas fa-envelope text-primary me-2"></i> {selectedComplaint.email}
                                                </div>
                                                <div className="mb-0">
                                                    <i className="fas fa-phone text-primary me-2"></i> {selectedComplaint.phone}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end mt-4 pt-3 border-top">
                                    <small className="text-muted fst-italic me-3">Complaint ID: {selectedComplaint.id}</small>
                                    <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
