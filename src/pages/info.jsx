import React from 'react';
import { Link } from 'react-router-dom';
import LottieAnimation from "../lottie";
import city from "../aminations/Safe City.json";

function Info() {
    return (
        <div className="min-h-screen bg-white py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-20 animate-fade-in">
                    <span className="inline-block bg-blue-100/50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6 border border-blue-200">
                        About Us
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight mb-6">
                        Empowering Citizens, <span className="text-blue-500 bg-clip-text bg-gradient-to from-blue-600 to-cyan-500">Solving Problems</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
                        Civico is a government-backed initiative designed to bridge the gap between citizens and municipal authorities through transparency and technology.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
                    <div className="bg-slate-50 p-10 rounded-[40px] border-l-8 border-blue-600 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-800 mb-6">Our Mission</h3>
                        <p className="text-slate-600 text-lg leading-relaxed font-medium">
                            Our goal is to create a transparent, efficient, and responsive civic grievance redressal mechanism. We believe that every citizen deserves a clean, safe, and well-maintained environment. By leveraging technology, we ensure that your voice is heard and acted upon by the relevant government departments in real-time.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: 'users', label: 'Citizen First' },
                            { icon: 'landmark', label: 'Govt. Backed' },
                            { icon: 'history', label: '24/7 Service' },
                            { icon: 'lock', label: 'Secure Data' }
                        ].map((item) => (
                            <div key={item.label} className="bg-slate-50 p-8 rounded-3xl text-center hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl shadow-lg shadow-blue-200">
                                    <i className={`fas fa-${item.icon}`}></i>
                                </div>
                                <h5 className="font-black text-slate-700 uppercase tracking-widest text-[11px]">{item.label}</h5>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Process Steps */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-slate-800 mb-4">Resolution Lifecycle</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">How it works</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '1', color: 'bg-blue-600', title: 'Submission', desc: 'Register a complaint with precise details and location.' },
                            { step: '2', color: 'bg-cyan-500', title: 'Assignment', desc: 'Auto-assigned to the relevant municipal department.' },
                            { step: '3', color: 'bg-amber-500', title: 'Action', desc: 'Field officers investigate and resolve the issue.' },
                            { step: '4', color: 'bg-emerald-500', title: 'Closure', desc: 'Verify resolution and provide your feedback.' }
                        ].map((item, index) => (
                            <div key={item.title} className="relative p-6 group">
                                <div className={`${item.color} w-16 h-16 rounded-3xl shadow-xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-500`}>
                                    {item.step}
                                </div>
                                <h5 className="text-lg font-black text-slate-800 mb-2">{item.title}</h5>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-14 left-[70%] w-full h-0.5 bg-slate-100"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gov Accountability Card */}
                <div className="bg-slate-900 rounded-[50px] p-12 md:p-16 mb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-3xl font-black text-white mb-4">Government Accountability</h3>
                                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                    Directly monitored by the municipal corporation. We adhere to strict service level agreements for timely resolution.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { label: 'Potholes', time: '48 Hours' },
                                    { label: 'Waste Collection', time: '24 Hours' },
                                    { label: 'Street Lights', time: '72 Hours' },
                                    { label: 'Water Issues', time: '36 Hours' }
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                        <i className="fas fa-check-circle text-emerald-500"></i>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                                            <p className="text-sm font-bold text-white leading-none">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <div className="bg-blue-600/10 p-4 rounded-full border border-white/20">
                                <LottieAnimation lotti={city} height={300} width={300} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Register CTA */}
                <div className="text-center py-12 border-t border-slate-100">
                    <h3 className="text-2xl font-black text-slate-800 mb-8">Ready to make a difference?</h3>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-3xl font-black uppercase text-sm tracking-widest shadow-2xl shadow-blue-200 active:scale-95 transition-all"
                    >
                        Register a Complaint
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Info;
