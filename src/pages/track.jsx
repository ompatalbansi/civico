import { useState } from 'react';
import axios from 'axios';

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
            const res = await axios.get(`${import.meta.env.VITE_API}/${import.meta.env.VITE_API_KEY}/v1/${searchId}`);
            setComplaint({ id: res.data._id, ...res.data });
        } catch (err) {
            console.error("Error fetching complaint:", err);
            if (err.response && err.response.status === 404) {
                setError('Complaint not found. Please check the ID.');
            } else {
                setError('Error fetching details. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'in progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100">
                    <div className="bg-white text-black p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md mb-4">
                            <i className="fas fa-search-location text-3xl"></i>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Track Your Complaint</h2>
                        <p className="text-blue-500 opacity-90">Enter your complaint ID to check real-time status</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-2">
                            <div className="flex-row">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <i className="fas fa-hashtag text-slate-400"></i>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-mono tracking-wider"
                                        placeholder="Enter Complaint ID..."
                                        value={searchId}
                                        onChange={(e) => setSearchId(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 min-w-[160px]"
                                disabled={loading}
                            >
                                {loading ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-search"></i>}
                                {loading ? 'Tracking...' : 'Track Status'}
                            </button>
                        </form>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl mb-8 animate-shake">
                        <div className="flex items-center gap-3 text-red-700">
                            <i className="fas fa-exclamation-circle text-xl"></i>
                            <p className="font-bold">{error}</p>
                        </div>
                    </div>
                )}

                {complaint && (
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-slide-up">
                        <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center flex-wrap gap-4">
                            <div>
                                <p className="text-xs uppercase font-black text-slate-400 tracking-widest mb-1">Complaint Details</p>
                                <h3 className="text-xl font-bold text-slate-800">{complaint.subject}</h3>
                            </div>
                            <span className={`px-5 py-2 rounded-full font-black text-xs uppercase border-2 tracking-widest ${getStatusColor(complaint.status)}`}>
                                {complaint.status}
                            </span>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Description</label>
                                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{complaint.description}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Location</label>
                                    <p className="text-slate-600 flex items-start gap-2">
                                        <i className="fas fa-map-marker-alt text-red-500 mt-1"></i>
                                        {complaint.address}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Category</label>
                                        <p className="font-bold text-slate-700 capitalize">{complaint.category}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Priority</label>
                                        <p className={`font-bold capitalize ${complaint.priority === 'urgent' ? 'text-red-500' : 'text-slate-700'}`}>
                                            {complaint.priority}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Last Updated</label>
                                    <p className="font-bold text-slate-700">
                                        {complaint.updatedAt ? new Date(complaint.updatedAt).toLocaleString() : 'Just now'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Track;
