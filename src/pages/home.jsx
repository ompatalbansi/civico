import { Link } from 'react-router-dom';
import './home.css';
import LottieAnimation from "../lottie";
import home from "../aminations/Placement Assistance.json";


function Home() {
    return (
        <div className="container main-container">
            {/* Hero Section */}
            <div className="row align-items-center hero-section">
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <span className="badge bg-light text-primary mb-3 px-3 py-2 rounded-pill shadow-sm fw-bold">
                        <i className="fas fa-check-circle me-1"></i> #1 Complaint Management System
                    </span>
                    <h1 className="display-4 fw-bold mb-3" style={{ lineHeight: '1.2' }}>
                        Transforming Civic Issues into <span className="gradient-text">Smart Solutions</span>
                    </h1>
                    <p className="hero-subtitle mb-4">
                        Empower your community by reporting issues instantly. Track progress in real-time and ensure a better living environment for everyone.
                    </p>
                    <div className="d-flex gap-3">
                        <Link to="/register" className="btn btn-premium btn-lg">
                            <i className="fas fa-paper-plane me-2"></i> Report Issue
                        </Link>
                        <Link to="/track" className="btn btn-outline-premium btn-lg">
                            <i className="fas fa-search me-2"></i> Track Status
                        </Link>
                    </div>

                    <div className="stats-row row mt-5 text-center">
                        <div className="col-4 border-end">
                            <div className="stat-item">
                                <h3 className="mb-0">50k+</h3>
                                <small className="text-muted">Complaints Solved</small>
                            </div>
                        </div>
                        <div className="col-4 border-end">
                            <div className="stat-item">
                                <h3 className="mb-0">98%</h3>
                                <small className="text-muted">Resolution Rate</small>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="stat-item">
                                <h3 className="mb-0">24h</h3>
                                <small className="text-muted">Avg. Response</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 text-center">
                    <div className="lottie-container position-relative">
                        {/* Placeholder for Lottie Animation */}
                        <div className="bg-light rounded-circle shadow-lg mx-auto d-flex align-items-center justify-content-center"
                            style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, #e0eafe 0%, #ffffff 70%)' }}>
                            <LottieAnimation lotti={home} height={300} width={300} />
                        </div>

                        {/* Floating Cards (Decorative) */}
                        <div className="position-absolute top-0 end-0 bg-white p-3 rounded shadow glass-effect"
                            style={{ transform: 'translate(10px, 40px)', animation: 'float 5s ease-in-out infinite' }}>
                            <i className="fas fa-check-circle text-success me-2"></i> Issue Resolved
                        </div>
                        <div className="position-absolute bottom-0 start-0 bg-white p-3 rounded shadow glass-effect"
                            style={{ transform: 'translate(-20px, -40px)', animation: 'float 7s ease-in-out infinite' }}>
                            <i className="fas fa-user-clock text-warning me-2"></i> Agent Assigned
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="row g-4 mb-5 pb-5">
                <div className="col-md-4">
                    <div className="card feature-card h-100 p-4 border-0 shadow-sm rounded-4">
                        <div className="card-body text-center">
                            <div className="feature-icon-wrapper mx-auto">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <h4 className="fw-bold mb-3">Instant Reporting</h4>
                            <p className="text-muted">
                                Submit complaints in seconds with our user-friendly interface. No account required for quick submissions.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card feature-card h-100 p-4 border-0 shadow-sm rounded-4">
                        <div className="card-body text-center">
                            <div className="feature-icon-wrapper mx-auto">
                                <i className="fas fa-map-marked-alt"></i>
                            </div>
                            <h4 className="fw-bold mb-3">Geo-Tagging</h4>
                            <p className="text-muted">
                                Automatically tag accurate locations to help authorities identify and resolve issues faster.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card feature-card h-100 p-4 border-0 shadow-sm rounded-4">
                        <div className="card-body text-center">
                            <div className="feature-icon-wrapper mx-auto">
                                <i className="fas fa-tasks"></i>
                            </div>
                            <h4 className="fw-bold mb-3">Real-time Tracking</h4>
                            <p className="text-muted">
                                Stay updated at every step. Receive SMS and email notifications as your complaint status changes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="info-section text-center py-5 mb-5 rounded-4" style={{ background: 'linear-gradient(135deg, #0d6efd10, #fff)' }}>
                <h2 className="mb-4 fw-bold">Ready to Make a Difference?</h2>
                <p className="text-muted mb-4 lead w-75 mx-auto">
                    Your voice matters. Use our platform to report infrastructure, sanitation, and safety issues in your neighborhood.
                </p>
                <Link to="/info" className="btn btn-dark btn-lg rounded-pill px-5 shadow-sm">
                    Learn More <i className="fas fa-arrow-right ms-2"></i>
                </Link>
            </div>
        </div>
    )
}

export default Home;