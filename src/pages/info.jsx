import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Reusing home styles for consistency
import LottieAnimation from "../lottie";
import home from "../aminations/Safe City.json";

function Info() {
    return (
        <div className="container main-container py-5">
            <div className="text-center mb-5">
                <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 rounded-pill fw-bold">About Us</span>
                <h1 className="display-4 fw-bold mb-3">Empowering Citizens, <span className="gradient-text">Solving Problems</span></h1>
                <p className="lead text-muted w-75 mx-auto">
                    The Smart Smart Complaint Management System is a government-backed initiative designed to bridge the gap between citizens and municipal authorities.
                </p>
            </div>

            {/* Mission Section */}
            <div className="row align-items-center mb-5 pb-5">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="p-4 bg-white rounded-4 shadow-sm border-start border-5 border-primary h-100">
                        <h3 className="fw-bold mb-3 text-dark">Our Mission</h3>
                        <p className="text-muted mb-0" style={{ lineHeight: '1.8' }}>
                            Our goal is to create a transparent, efficient, and responsive civic grievance redressal mechanism. We believe that every citizen deserves a clean, safe, and well-maintained environment. By leveraging technology, we ensure that your voice is heard and acted upon by the relevant government departments in real-time.
                        </p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="row g-3">
                        <div className="col-6">
                            <div className="p-3 bg-light rounded-3 text-center">
                                <i className="fas fa-users fa-2x text-primary mb-2"></i>
                                <h5 className="fw-bold">Citizen First</h5>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="p-3 bg-light rounded-3 text-center">
                                <i className="fas fa-landmark fa-2x text-primary mb-2"></i>
                                <h5 className="fw-bold">Govt. Backed</h5>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="p-3 bg-light rounded-3 text-center">
                                <i className="fas fa-history fa-2x text-primary mb-2"></i>
                                <h5 className="fw-bold">24/7 Service</h5>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="p-3 bg-light rounded-3 text-center">
                                <i className="fas fa-lock fa-2x text-primary mb-2"></i>
                                <h5 className="fw-bold">Secure Data</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="mb-5 pb-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Complaint Resolution Process</h2>
                    <p className="text-muted">How your complaint travels from your phone to resolution</p>
                </div>

                <div className="row g-4 text-center">
                    <div className="col-md-3">
                        <div className="position-relative p-3">
                            <div className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3" style={{ width: '60px', height: '60px', fontSize: '24px' }}>1</div>
                            <h5 className="fw-bold">Submission</h5>
                            <p className="small text-muted">You register a complaint with details, location, and photos.</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="position-relative p-3">
                            <div className="d-inline-flex align-items-center justify-content-center bg-info text-white rounded-circle mb-3" style={{ width: '60px', height: '60px', fontSize: '24px' }}>2</div>
                            <h5 className="fw-bold">Assignment</h5>
                            <p className="small text-muted">System automatically assigns it to the relevant department (e.g., Sanitation, Roads).</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="position-relative p-3">
                            <div className="d-inline-flex align-items-center justify-content-center bg-warning text-dark rounded-circle mb-3" style={{ width: '60px', height: '60px', fontSize: '24px' }}>3</div>
                            <h5 className="fw-bold">Action</h5>
                            <p className="small text-muted">Field officers investigate and resolve the issue on the ground.</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="position-relative p-3">
                            <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle mb-3" style={{ width: '60px', height: '60px', fontSize: '24px' }}>4</div>
                            <h5 className="fw-bold">Closure</h5>
                            <p className="small text-muted">You receive proof of resolution and the complaint is closed.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gov Section */}
            <div className="bg-light rounded-4 p-5 mb-5">
                <div className="row align-items-center">
                    <div className="col-lg-8">
                        <h3 className="fw-bold mb-3">Government Accountability</h3>
                        <p className="text-muted mb-4">
                            This portal is directly monitored by the municipal corporation. We adhere to strict SLAs (Service Level Agreements) to ensure timely resolution.
                        </p>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Potholes: 48 Hours</li>
                            <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Garbage Collection: 24 Hours</li>
                            <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Street Lights: 72 Hours</li>
                        </ul>
                    </div>
                    <div className="col-lg-4 text-center mt-4 mt-lg-0">
                        <LottieAnimation lotti={home} height={300} width={300} />
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center py-4">
                <h3 className="mb-3">Have an issue to report?</h3>
                <Link to="/register" className="btn btn-primary btn-lg rounded-pill px-5 shadow">
                    Register Complaint
                </Link>
            </div>
        </div>
    );
}

export default Info;
