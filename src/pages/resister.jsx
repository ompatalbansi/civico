import { useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

function Resister(props) {
    const { addToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedId, setSubmittedId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const submitComplaint = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const formData = new FormData(form);

        const complaintData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            category: formData.get('category'),
            subject: formData.get('subject'),
            description: formData.get('description'),
            priority: formData.get('priority'),
            status: 'Pending',
        };

        try {
            const res = await axios.post(import.meta.env.VITE_API + '/api/v1/register', complaintData)
            setSubmittedId(res.data._id);
            navigator.clipboard.writeText(res.data._id); // Auto-copy ID
            addToast("Complaint registered successfully!", "success");
            form.reset();
        } catch (error) {
            console.error("Error adding document: ", error);
            addToast("Error registering complaint. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCopy = () => {
        if (submittedId) {
            navigator.clipboard.writeText(submittedId);
            const btn = document.getElementById('copyBtn');
            if (btn) {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                btn.classList.remove('text-blue-600', 'border-blue-600');
                btn.classList.add('bg-green-500', 'text-white', 'border-green-500');
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.classList.remove('bg-green-500', 'text-white', 'border-green-500');
                    btn.classList.add('text-blue-600', 'border-blue-600');
                }, 2000);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSubmittedId(null);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 relative">
            <div className="max-w-[1200px] mx-auto">
                <div className="bg-white rounded-2xl p-10 shadow-xl mb-8 text-center animate-fade-in-up">
                    <h1 className="text-4xl font-extrabold text-[#0d6efd] mb-4">
                        <i className="fas fa-clipboard-list mr-2"></i> Smart Complaint Management System
                    </h1>
                    <p className="text-slate-500 text-lg">Streamline your complaint handling process with our intelligent platform</p>
                </div>

                <div className="bg-white rounded-2xl p-12 shadow-xl text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">Ready to Register Your Complaint?</h2>
                    <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
                        Join thousands of users who trust our platform for efficient complaint management
                    </p>
                    <button className="bg-white text-black px-12 py-4 rounded-full text-xl font-bold transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl uppercase tracking-wider" onClick={() => setShowModal(true)}>
                        <i className="fas fa-pencil-alt mr-2"></i> Register Complaint
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-10 shadow-xl mb-8">
                    <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-slate-50 p-8 rounded-2xl text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                            <div className="text-5xl text-blue-600 mb-6 flex justify-center">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-cyan-500">Fast Processing</h4>
                            <p className="text-slate-500 leading-relaxed">Quick and efficient complaint registration and tracking system</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                            <div className="text-5xl text-blue-600 mb-6 flex justify-center">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-cyan-500">Secure & Private</h4>
                            <p className="text-slate-500 leading-relaxed">Your data is encrypted and protected with industry standards</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                            <div className="text-5xl text-blue-600 mb-6 flex justify-center">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-cyan-500">Real-time Tracking</h4>
                            <p className="text-slate-500 leading-relaxed">Monitor complaint status and get instant updates</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-around pt-8 border-t border-slate-100">
                        <div className="text-center p-5 min-w-[150px]">
                            <div className="text-4xl font-bold text-blue-600 mb-1">15K+</div>
                            <div className="text-slate-500 font-medium">Complaints Resolved</div>
                        </div>
                        <div className="text-center p-5 min-w-[150px]">
                            <div className="text-4xl font-bold text-blue-600 mb-1">98%</div>
                            <div className="text-slate-500 font-medium">Satisfaction Rate</div>
                        </div>
                        <div className="text-center p-5 min-w-[150px]">
                            <div className="text-4xl font-bold text-blue-600 mb-1">24/7</div>
                            <div className="text-slate-500 font-medium">Support Available</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tailwind Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 -z-3 bg-slate-900/60 backdrop-blur-sm transition-opacity " aria-hidden="true" onClick={closeModal}></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full animate-scale-in">
                            <div className="bg-slate-50 px-8 py-6 flex justify-between items-center text-slate-800 border-b border-slate-100">
                                <h3 className="text-2xl font-black flex items-center gap-3 mb-0" id="modal-title">
                                    {submittedId ? (
                                        <><i className="fas fa-check-circle text-green-500"></i> Submission Success</>
                                    ) : (
                                        <><i className="fas fa-file-signature text-blue-600"></i> Register New Complaint</>
                                    )}
                                </h3>
                                <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors" onClick={closeModal}>
                                    <i className="fas fa-times text-2xl"></i>
                                </button>
                            </div>

                            <div className="bg-white px-8 pt-8 pb-10">
                                {submittedId ? (
                                    <div className="text-center py-12 ">
                                        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                                            <i className="fas fa-check text-4xl"></i>
                                        </div>
                                        <h3 className="text-4xl font-black text-slate-800 mb-4">All Set!</h3>
                                        <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto">Your complaint has been logged in our system. We have copied your reference ID to the clipboard.</p>

                                        <div className="bg-slate-50 p-8 rounded-[30px] border border-slate-100 inline-block mb-10">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Reference ID</p>
                                            <div className="flex items-center gap-6">
                                                <code className="text-3xl font-black text-blue-600 tracking-wider">{submittedId}</code>
                                                <button id="copyBtn" className="w-12 h-12 rounded-2xl border-2 border-slate-200 text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center" onClick={handleCopy}>
                                                    <i className="fas fa-copy"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <button className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-black transition-all" onClick={closeModal}>
                                                Return Home
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={submitComplaint} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label htmlFor="fullName" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                                <input type="text" className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-2xl px-5 py-4 text-slate-700 font-bold outline-none transition-all placeholder:text-slate-300" name="fullName" id="fullName" placeholder="Entry your name" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                                <input type="email" className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-2xl px-5 py-4 text-slate-700 font-bold outline-none transition-all placeholder:text-slate-300" name="email" id="email" placeholder="example@email.com" required />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label htmlFor="phone" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                                                <input type="tel" className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-2xl px-5 py-4 text-slate-700 font-bold outline-none transition-all placeholder:text-slate-300" name="phone" id="phone" placeholder="+1 (555) 000-0000" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="category" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                                <select className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-2xl px-5 py-4 text-slate-700 font-bold outline-none transition-all appearance-none" name="category" id="category" required>
                                                    <option value="">Select Department</option>
                                                    <option value="garbage">Sanitation / Garbage</option>
                                                    <option value="potholes">Roads / Potholes</option>
                                                    <option value="streetlight">Lighting / Security</option>
                                                    <option value="waterleakage">Water Infrastructure</option>
                                                    <option value="other">General Inquiry</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="address" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Incident Location</label>
                                            <textarea className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-2xl px-5 py-4 text-slate-700 font-bold outline-none transition-all placeholder:text-slate-300 resize-none" name="address" id="address" rows="2" placeholder="Describe the specific location..." required></textarea>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Issue Subject</label>
                                            <input type="text" className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-2xl px-5 py-4 text-slate-700 font-bold outline-none transition-all placeholder:text-slate-300" name="subject" id="subject" placeholder="Short summary of the problem" required />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="description" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Report</label>
                                            <textarea className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-2xl px-5 py-4 text-slate-700 font-bold outline-none transition-all placeholder:text-slate-300 resize-none" name="description" id="description" rows="4" placeholder="Provide as much detail as possible..." required></textarea>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Priority Assignment</label>
                                            <div className="flex flex-wrap gap-4">
                                                {['low', 'medium', 'high', 'urgent'].map(pr => (
                                                    <div key={pr} className="flex-1 min-w-[100px]">
                                                        <input type="radio" id={`priority-${pr}`} name="priority" value={pr} className="hidden peer" defaultChecked={pr === 'medium'} />
                                                        <label htmlFor={`priority-${pr}`} className="w-full block py-3 rounded-2xl border-2 border-slate-100 text-center cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition-all text-xs font-black uppercase tracking-widest text-slate-400">
                                                            {pr}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-4 pt-8">
                                            <button type="button" className="px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors" onClick={closeModal}>Cancel</button>
                                            <button type="submit" className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-3" disabled={isSubmitting}>
                                                {isSubmitting ? <><i className="fas fa-circle-notch animate-spin"></i> Processing</> : <><i className="fas fa-paper-plane"></i> Submit Report</>}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Resister;
