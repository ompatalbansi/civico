import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="group inline-block">
                            <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm transform group-hover:rotate-12 transition-transform">
                                    <i className="fas fa-city text-xs"></i>
                                </span>
                                Civico<span className="text-blue-500">.</span>
                            </h3>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 font-medium max-w-xs">
                            Empowering citizens with a seamless platform to voice their concerns and track resolutions in real-time. Together for a better community.
                        </p>
                        <div className="flex gap-4">
                            {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((icon) => (
                                <a key={icon} href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    <i className={`fab fa-${icon} text-sm`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Useful Links</h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'Home', path: '/home' },
                                { name: 'Register Complaint', path: '/register' },
                                { name: 'Track Status', path: '/track' },
                                { name: 'Admin Portal', path: '/login' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-sm font-bold hover:text-blue-500 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Contact & Support</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <i className="fas fa-envelope text-blue-500 mt-1"></i>
                                <div>
                                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Email Support</p>
                                    <p className="text-sm font-bold text-slate-200">{import.meta.env.VITE_EMAIL || 'support@civico.gov'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <i className="fas fa-headset text-blue-500 mt-1"></i>
                                <div>
                                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Emergency Help</p>
                                    <p className="text-sm font-bold text-slate-200">+1 (800) CIVIC-SAFE</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Newsletter</h4>
                        <p className="text-sm text-slate-400 font-medium">Subscribe to stay updated with civic developments and announcements.</p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-3.5 pl-5 pr-12 text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-600 focus:bg-slate-800"
                            />
                            <button className="absolute right-2 top-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
                                <i className="fas fa-paper-plane text-xs"></i>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        &copy; 2024 Civico Smart Infrastructure. All Rights Reserved.
                    </p>
                    <div className="flex gap-8">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
                            <a key={item} href="#" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] hover:text-white transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
