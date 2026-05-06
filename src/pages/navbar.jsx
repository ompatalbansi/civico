import {useEffect} from 'react';
import { Link,useLocation } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
// import { Cookies } from 'react-cookie';

function Navbar(props) {
    const { addToast } = useToast();
    const location = useLocation();

    return (
        <nav className="w-full sticky top-0 z-100 py-4 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="max-w-[1200px] mx-auto flex justify-between items-center px-5">
                <div
                    className="text-2xl font-extrabold text-[#667eea] cursor-pointer transition-colors duration-300 hover:text-[#764ba2]"
                    onClick={() => window.location.href = '/'} 
                > <i className="fa-solid fa-city mr-2"></i>
                    Civico
                </div>
                <div className="flex items-center gap-8">
                   
                    <Link to="/home" className="no-underline text-gray-800 font-medium transition-colors duration-300 relative hover:text-[#667eea] group" aria-disabled="false" >
                        Home
                        { location.pathname=="/home"?<><span className="absolute -bottom-1 left-0 h-0.5 bg-[#667eea] w-full"></span></>:
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#667eea] transition-all duration-300 group-hover:w-full"></span>
                         }
                    </Link>
                    
                    {
                        
                            <Link to="/register" className="no-underline text-gray-800 font-medium transition-colors duration-300 relative hover:text-[#667eea] group">
                                Register Complaint
                                {location.pathname=="/register"?<><span className="absolute -bottom-1 left-0 h-0.5 bg-[#667eea] w-full"></span></>:
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#667eea] transition-all duration-300 group-hover:w-full"></span>
                                }
                            </Link>
                    }
                    <Link to="/track" className="no-underline text-gray-800 font-medium transition-colors duration-300 relative hover:text-[#667eea] group">
                        Track Complaint
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#667eea] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    {location.pathname=="/" ||location.pathname=="/login" ?<></>:<Link
                        to="/login"
                        className="bg-white text-black no-underline text-center px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out shadow-md hover:-translate-y-0.5 hover:text-[#f7f7f8] hover:bg-[#667eea] hover:shadow-xl"
                    >
                        Admin Login
                    </Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar