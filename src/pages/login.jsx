import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../fire';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            addToast('Login Successful!', 'success');
            navigate('/admin'); // Redirect to Admin dashboard on success
        } catch (error) {
            console.error("Login Error:", error);
            let errorMessage = "Failed to login. Please check your credentials.";
            if (error.code === 'auth/user-not-found') errorMessage = "User not found.";
            if (error.code === 'auth/wrong-password') errorMessage = "Incorrect password.";
            addToast(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-icon">
                    <i className="fas fa-lock"></i>
                </div>
                <h2 className="mb-4 fw-bold text-dark">Admin Login</h2>
                <p className="text-muted mb-4">Please login to access the admin dashboard</p>

                <form onSubmit={handleLogin} className="login-form text-start">
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingEmail"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button type="submit" className="login-submit-btn mb-3" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'} <i className="fas fa-arrow-right ms-2"></i>
                    </button>

                    <button type="button" className="btn w-100 rounded-pill border" style={{ padding: '12px', fontWeight: 600, color: 'var(--primary-color)' }} onClick={() => navigate('/home')}>
                        Enter as User <i className="fas fa-user ms-2"></i>
                    </button>

                    <div className="text-center mt-4">
                        <a href="#" className="text-decoration-none small text-muted" onClick={(e) => { e.preventDefault(); addToast('Contact your system administrator to reset password.', 'info') }}>Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;