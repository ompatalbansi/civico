import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import './navbar.css'

function Navbar(props) {
    const { addToast } = useToast();

    return (
        <>
            <nav className="glass-effect">
                <div className="nav-container">
                    <div className="logo" onClick={() => window.location.href = '/'}>SmartComplaint</div>
                    <div className="nav-links">
                        <Link to="/home">Home</Link>
                        <Link to="/register">Register Complaint</Link>
                        <Link to="/track">Track Complaint</Link>
                        <Link to="/login" className="login-btn text-white text-decoration-none text-center" style={{ padding: '8px 24px' }}>Admin</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar