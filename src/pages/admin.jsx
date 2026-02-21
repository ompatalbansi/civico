import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

function Admin() {
    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const { addToast } = useToast();

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API}/${import.meta.env.VITE_API_KEY}/v1/all`);
            setComplaints(res.data.map(c => ({ id: c._id, ...c })));
        } catch (error) {
            console.error("Error fetching complaints:", error);
            addToast("Failed to fetch complaints", 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    useEffect(() => {
        if (filterStatus === 'All') {
            setFilteredComplaints(complaints);
        } else {
            setFilteredComplaints(complaints.filter(c => c.status === filterStatus));
        }
    }, [complaints, filterStatus]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API}/${import.meta.env.VITE_API_KEY}/v1/${id}/status`, {
                status: newStatus
            });
            addToast(`Status updated to ${newStatus}`, 'success');
            fetchComplaints(); // Refresh data
        } catch (error) {
            console.error("Error updating status: ", error);
            addToast("Failed to update status", 'error');
        }
    };

    const getStatusBadgeStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
            case 'in progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getPriorityBadgeStyles = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'urgent': return 'bg-red-600 text-white';
            case 'high': return 'bg-red-100 text-red-700 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'low': return 'bg-slate-100 text-slate-700 border-slate-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    }

    // Calculation for Stats
    const totalComplaints = complaints.length;
    const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
    const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Dashboard Header & Stats */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                            <span className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                                <i className="fas fa-user-shield"></i>
                            </span>
                            Admin Dashboard
                        </h2>
                        <p className="text-slate-500 mt-1 ml-16">Manage and monitor civic complaints</p>
                    </div>

                    <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                        <div className="flex-1 min-w-[140px] bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1">Total</p>
                                <h4 className="text-2xl font-bold text-slate-800 leading-none">{totalComplaints}</h4>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[140px] bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1">Pending</p>
                                <h4 className="text-2xl font-bold text-slate-800 leading-none">{pendingComplaints}</h4>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[140px] bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1">Resolved</p>
                                <h4 className="text-2xl font-bold text-slate-800 leading-none">{resolvedComplaints}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Complaints Table Container */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h5 className="text-lg font-bold text-slate-800 mb-0">All Complaints</h5>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Filter:</span>
                            <select
                                className="grow sm:flex-none bg-slate-50 border-0 text-slate-700 text-sm font-bold rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
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

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-50">Details</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-50">Date</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-50">Subject</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-50">Category</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-50">Priority</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-50">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-50">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-20 text-center">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                                            <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Loading data...</p>
                                        </td>
                                    </tr>
                                ) : filteredComplaints.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-20 text-center">
                                            <div className="text-slate-200 text-6xl mb-4">
                                                <i className="fas fa-inbox"></i>
                                            </div>
                                            <p className="text-slate-400 font-bold">No complaints found matching criteria.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredComplaints.map(complaint => (
                                        <tr key={complaint.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <button
                                                    className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300"
                                                    onClick={() => {
                                                        setSelectedComplaint(complaint);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <i className="fas fa-eye mr-1"></i> View
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-400">
                                                {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-slate-700 max-w-[200px] truncate" title={complaint.subject}>
                                                    {complaint.subject}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200">
                                                    {complaint.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getPriorityBadgeStyles(complaint.priority)}`}>
                                                    {complaint.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${getStatusBadgeStyles(complaint.status)}`}>
                                                    {complaint.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    className="bg-transparent border border-slate-200 text-slate-600 text-[11px] font-black uppercase tracking-wider rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none appearance-none cursor-pointer text-center group-hover:border-blue-300"
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
                </div>
            </div>

            {/* Complaint Detail Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity -z-3" aria-hidden="true" onClick={() => setShowModal(false)}></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block my-20 align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl  transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full animate-scale-in">
                            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center text-slate-800">
                                <h3 className="text-xl font-extrabold text-blue-600 flex items-center gap-3 mb-0" id="modal-title">
                                    <i className="fas fa-clipboard-list"></i> Complaint Details
                                </h3>
                                <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setShowModal(false)}>
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>

                            {selectedComplaint && (
                                <div className="p-5">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 space-y-8">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Subject</p>
                                                <h4 className="text-2xl font-black text-slate-800 leading-tight">{selectedComplaint.subject}</h4>
                                            </div>

                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Description</p>
                                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-600 leading-relaxed italic text-lg shadow-inner">
                                                    "{selectedComplaint.description}"
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Incident Location</p>
                                                    <p className="text-slate-800 font-bold">{selectedComplaint.address || 'Address not provided'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-5 shadow-sm">
                                                <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-slate-200 pb-2">Status overview</h6>

                                                <div className="flex justify-between items-center">
                                                    <p className="text-xs font-bold text-slate-500 mb-0">Status</p>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 ${getStatusBadgeStyles(selectedComplaint.status)}`}>
                                                        {selectedComplaint.status}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <p className="text-xs font-bold text-slate-500 mb-0">Priority</p>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getPriorityBadgeStyles(selectedComplaint.priority)}`}>
                                                        {selectedComplaint.priority}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <p className="text-xs font-bold text-slate-500 mb-0">Category</p>
                                                    <p className="text-xs font-black text-slate-800 mb-0 uppercase tracking-widest">{selectedComplaint.category}</p>
                                                </div>

                                                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                                                    <p className="text-[10px] font-bold text-slate-400 mb-0">Submitted</p>
                                                    <p className="text-[10px] font-bold text-slate-600 mb-0">{selectedComplaint.createdAt ? new Date(selectedComplaint.createdAt).toLocaleDateString() : '-'}</p>
                                                </div>
                                            </div>

                                            <div className="bg-blue-600 p-6 rounded-3xl text-white space-y-4 shadow-lg shadow-blue-100">
                                                <h6 className="text-[10px] font-black text-blue-200 uppercase tracking-[0.2em] mb-2">Complainant details</h6>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                        <i className="fas fa-user text-xs"></i>
                                                    </div>
                                                    <p className="text-sm font-bold mb-0">{selectedComplaint.fullName || selectedComplaint.name}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                        <i className="fas fa-envelope text-xs"></i>
                                                    </div>
                                                    <p className="text-[11px] font-medium mb-0 truncate w-[180px]">{selectedComplaint.email}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                        <i className="fas fa-phone text-xs"></i>
                                                    </div>
                                                    <p className="text-[11px] font-medium mb-0">{selectedComplaint.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mb-0">Complaint Unique Token:</p>
                                            <code className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">{selectedComplaint.id}</code>
                                        </div>
                                        <button
                                            type="button"
                                            className="w-full sm:w-auto bg-slate-800 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close Details
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
