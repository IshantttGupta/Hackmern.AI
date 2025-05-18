import React, { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/dashboard');
    };

    const handleLogin = () => {
        navigate('/home');
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Leaf className="w-8 h-8 text-green-500 mr-2" />
                        <span className="text-xl font-bold text-green-700 tracking-tight">
                            NutriAI
                        </span>
                    </div>
                    <button
                        onClick={isLoggedIn ? handleLogout : handleLogin}
                        className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-green-600 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    >
                        {isLoggedIn ? 'Logout' : 'Sign Up / Login'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
