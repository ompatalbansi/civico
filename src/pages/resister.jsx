import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../fire';
import './resister.css';

function Resister(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedId, setSubmittedId] = useState(null);

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
            createdAt: serverTimestamp()
        };

        try {
            const docRef = await addDoc(collection(db, 'complaints'), complaintData);
            setSubmittedId(docRef.id);
            navigator.clipboard.writeText(docRef.id); // Auto-copy ID
            form.reset();
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error registering complaint. Please try again.");
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
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-success');
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-outline-primary');
                }, 2000);
            }
        }
    };

    const resetModal = () => {
        setSubmittedId(null);
    };

    return (
        <>
            <div className="container main-container">
                <div className="header-section">
                    <h1><i className="fas fa-clipboard-list"></i> Smart Complaint Management System</h1>
                    <p>Streamline your complaint handling process with our intelligent platform</p>
                </div>
                <div className="cta-section">
                    <h2 className="mb-4" style={{ color: 'var(--secondary-color)', fontWeight: 700 }}>Ready to Register Your Complaint?</h2>
                    <p className="lead text-muted mb-4">Join thousands of users who trust our platform for efficient complaint management</p>
                    <button className="btn register-btn" data-bs-toggle="modal" data-bs-target="#complaintModal" onClick={resetModal}>
                        <i className="fas fa-pencil-alt"></i> Register Complaint
                    </button>
                </div>
            </div>

            <div className="features-section mb-5">
                <h2 className="text-center mb-5" style={{ color: 'var(--secondary-color)', fontWeight: 700 }}>Why Choose Us?</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <h4>Fast Processing</h4>
                            <p className="text-muted">Quick and efficient complaint registration and tracking system</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h4>Secure & Private</h4>
                            <p className="text-muted">Your data is encrypted and protected with industry standards</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <h4>Real-time Tracking</h4>
                            <p className="text-muted">Monitor complaint status and get instant updates</p>
                        </div>
                    </div>
                </div>

                <div className="stats-container">
                    <div className="stat-box">
                        <div className="stat-number">15K+</div>
                        <div className="stat-label">Complaints Resolved</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-number">98%</div>
                        <div className="stat-label">Satisfaction Rate</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Support Available</div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="complaintModal" tabIndex="-1" aria-labelledby="complaintModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="complaintModalLabel">
                                {submittedId ? <span className="text-success"><i className="fas fa-check-circle"></i> Success</span> : <span><i className="fas fa-file-alt"></i> Register New Complaint</span>}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetModal}></button>
                        </div>
                        <div className="modal-body">
                            {submittedId ? (
                                <div className="text-center py-5">
                                    <div className="mb-4 text-success">
                                        <i className="fas fa-check-circle fa-5x"></i>
                                    </div>
                                    <h3 className="fw-bold mb-3">Complaint Registered!</h3>
                                    <p className="text-muted mb-4 lead">Your complaint has been successfully submitted.<br />We've copied the ID to your clipboard.</p>

                                    <div className="bg-light p-4 rounded-3 mb-4 border d-inline-block mx-auto" style={{ minWidth: '300px' }}>
                                        <p className="mb-1 small text-muted text-uppercase fw-bold">Complaint ID</p>
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <span className="fw-bold fs-3 text-secondary tracking-wider">{submittedId}</span>
                                            <button id="copyBtn" className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={handleCopy}>
                                                <i className="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <button className="btn btn-primary btn-lg px-5 rounded-pill" data-bs-dismiss="modal" onClick={resetModal}>
                                            Done
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form id="complaintForm" onSubmit={submitComplaint}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="fullName" className="form-label">Full Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" name="fullName" id="fullName" required />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                                            <input type="email" className="form-control" name="email" id="email" required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="phone" className="form-label">Phone Number <span className="text-danger">*</span></label>
                                            <input type="tel" className="form-control" name="phone" id="phone" required />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="category" className="form-label">Complaint Category <span className="text-danger">*</span></label>
                                            <select className="form-select" name="category" id="category" required>
                                                <option value="">Select Category</option>
                                                <option value="garbage">Garbage Issue</option>
                                                <option value="potholes">Potholes</option>
                                                <option value="streetlight">Street Light Issue</option>
                                                <option value="waterleakage">Water Leakage</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Added Address Field */}
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address / Location <span className="text-danger">*</span></label>
                                        <textarea className="form-control" name="address" id="address" rows="2" placeholder="Start typing your address..." required></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="subject" className="form-label">Subject <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" name="subject" id="subject" placeholder="Brief subject of the issue" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description <span className="text-danger">*</span></label>
                                        <textarea className="form-control" name="description" id="description" rows="5" placeholder="Detailed description of the problem..." required></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="priority" className="form-label">Priority Level</label>
                                        <select className="form-select" name="priority" id="priority" defaultValue="medium">
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                            <option value="urgent">Urgent</option>
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ background: 'var(--primary-color)', border: 'none' }}>
                                            <i className="fas fa-paper-plane"></i> {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Resister;