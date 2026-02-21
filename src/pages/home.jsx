import { Link } from 'react-router-dom';
import LottieAnimation from "../lottie";
import home from "../aminations/Placement Assistance.json";

function Home() {

    return (
        <div className="container mx-auto px-4 max-w-[1200px] animate-fade-in-up">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center py-20 min-h-[85vh] relative overflow-hidden">
                <div className="lg:w-1/2 mb-12 lg:mb-0">
                    <span className="inline-block bg-blue-50 text-blue-600 mb-4 px-4 py-1.5 rounded-full shadow-sm font-bold text-sm">
                        <i className="fas fa-check-circle mr-1"></i> #1 Complaint Management System
                    </span>
                    <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-slate-900 tracking-tight">
                        Transforming Civic Issues into <span className="bg-gradient-to from-[#393c9f] to-blue-600 bg-clip-text text-transparent">Smart Solutions</span>
                    </h1>
                    <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-xl">
                        Empower your community by reporting issues instantly. Track progress in real-time and ensure a better living environment for everyone.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/register" className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:shadow-indigo-200/50 hover:text-white no-underline">
                            <i className="fas fa-paper-plane mr-2"></i> Report Issue
                        </Link>
                        <Link to="/track" className="inline-flex items-center border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg no-underline">
                            <i className="fas fa-search mr-2"></i> Track Status
                        </Link>
                    </div>

                    <div className="mt-12 bg-white p-8 rounded-3xl grid grid-cols-3 text-center shadow-sm">
                        <div className="border-r border-gray-200">
                            <h3 className="text-3xl font-extrabold text-blue-600 mb-0">50k+</h3>
                            <small className="text-gray-500 font-medium">Complaints Solved</small>
                        </div>
                        <div className="border-r border-gray-200">
                            <h3 className="text-3xl font-extrabold text-blue-600 mb-0">98%</h3>
                            <small className="text-gray-500 font-medium">Resolution Rate</small>
                        </div>
                        <div>
                            <h3 className="text-3xl font-extrabold text-blue-600 mb-0">24h</h3>
                            <small className="text-gray-500 font-medium">Avg. Response</small>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 text-center">
                    <div className="relative animate-float drop-shadow-2xl">
                        <div className="bg-white rounded-full mx-auto flex items-center justify-center p-8 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] shadow-inner">
                            <LottieAnimation lotti={home} height={300} width={300} />
                        </div>

                        {/* Floating Cards (Decorative) */}
                        <div className="absolute top-0 right-0 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/30 animate-float delay-700 hidden sm:block">
                            <i className="fas fa-check-circle text-green-500 mr-2"></i> Issue Resolved
                        </div>
                        <div className="absolute bottom-10 left-0 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/30 animate-float hidden sm:block">
                            <i className="fas fa-user-clock text-yellow-500 mr-2"></i> Agent Assigned
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <div className="group bg-white p-8 border border-gray-100 rounded-3xl shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-300">
                    <div className="w-[70px] h-[70px] rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:[ transform:rotateY(180deg) ] text-2xl">
                        <i className="fas fa-bolt"></i>
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-center">Instant Reporting</h4>
                    <p className="text-gray-500 text-center leading-relaxed">
                        Submit complaints in seconds with our user-friendly interface. No account required for quick submissions.
                    </p>
                </div>
                <div className="group bg-white p-8 border border-gray-100 rounded-3xl shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-300">
                    <div className="w-[70px] h-[70px] rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white text-2xl">
                        <i className="fas fa-map-marked-alt"></i>
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-center">Geo-Tagging</h4>
                    <p className="text-gray-500 text-center leading-relaxed">
                        Automatically tag accurate locations to help authorities identify and resolve issues faster.
                    </p>
                </div>
                <div className="group bg-white p-8 border border-gray-100 rounded-3xl shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-300">
                    <div className="w-[70px] h-[70px] rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:[ transform:rotateY(180deg)  ] text-2xl">
                        <i className="fas fa-tasks"></i>
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-center">Real-time Tracking</h4>
                    <p className="text-gray-500 text-center leading-relaxed">
                        Stay updated at every step. Receive SMS and email notifications as your complaint status changes.
                    </p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white text-center py-16 mb-20 rounded-3xl border border-blue-100/50">
                <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                    Your voice matters. Use our platform to report infrastructure, sanitation, and safety issues in your neighborhood.
                </p>
                <Link to="/info" className="inline-flex items-center bg-gray-900 text-white px-10 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:bg-black hover:shadow-xl no-underline">
                    Learn More <i className="fas fa-arrow-right ml-2"></i>
                </Link>
            </div>
        </div>
    )
}

export default Home;
