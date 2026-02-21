import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

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
            // Simulated login logic
            addToast('Login Successful!', 'success');
            navigate('/admin'); // Redirect to Admin dashboard on success
        } catch (error) {
            console.error("Login Error:", error);
            let errorMessage = "Failed to login. Please check your credentials.";
            addToast(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-6 bg-fixed">
            <div className="w-full max-w-md relative group">
                {/* Decorative Blobs */}
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-600/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-cyan-400/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000"></div>

                <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-8 sm:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                    {/* Top Accent Bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400"></div>

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl shadow-blue-200 text-white text-3xl mb-6 transform hover:rotate-12 transition-transform duration-500">
                            <i className="fas fa-shield-alt"></i>
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Admin Portal</h2>
                        <p className="text-slate-500 font-medium mt-2">Secure access for officials only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative group/input">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none group-focus-within/input:text-blue-600 text-slate-400 transition-colors">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <input
                                        type="email"
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-2xl text-slate-700 font-bold outline-none transition-all placeholder:text-slate-300"
                                        placeholder="admin@civico.gov"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative group/input">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block">Secret Key</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none group-focus-within/input:text-blue-600 text-slate-400 transition-colors">
                                        <i className="fas fa-key"></i>
                                    </div>
                                    <input
                                        type="password"
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-2xl text-slate-700 font-bold outline-none transition-all placeholder:text-slate-300"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                disabled={loading}
                            >
                                {loading ? (
                                    <i className="fas fa-circle-notch animate-spin"></i>
                                ) : (
                                    <i className="fas fa-sign-in-alt"></i>
                                )}
                                {loading ? 'Authorizing...' : 'Authorize Access'}
                            </button>
                        </div>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                            <div className="relative flex justify-center"><span className="bg-white/80 px-4 text-xs font-black text-slate-300 uppercase tracking-widest">Or</span></div>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-white border-2 border-slate-100 text-slate-600 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-3"
                            onClick={() => navigate('/')}
                        >
                            <i className="fas fa-home"></i>
                            Back to Home
                        </button>

                        <div className="text-center pt-4">
                            <button
                                type="button"
                                className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
                                onClick={() => addToast('Contact IT Support to reset your credentials.', 'info')}
                            >
                                Forgot Credentials?
                            </button>
                        </div>
                    </form>
                </div>

                <p className="text-center mt-8 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Civico Secure Infrastructure v4.0
                </p>
            </div>
        </div>
    );
}

export default Login;
