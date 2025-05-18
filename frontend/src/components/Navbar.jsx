import React from 'react';
import { Leaf } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="w-full bg-white/10 backdrop-blur-md py-4 px-6 sm:px-8 border-b border-white/10 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Leaf className="w-8 h-8 text-green-500 mr-2" />
                    <span className="text-xl font-bold text-green-700 tracking-tight">
                        NutriAI
                    </span>
                </div>
                <a
                    href="/auth"
                    className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                    Sign Up / Login
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
