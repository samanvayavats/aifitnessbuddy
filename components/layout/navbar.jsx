'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Install lucide-react: npm install lucide-react
import { useSession, signIn, signOut } from "next-auth/react"
import { CgGym } from "react-icons/cg";
import { useRouter } from 'next/navigation';
// import { userAgent } from 'next/server';
export default function navbar() {

    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()


    return (
        <nav className="bg-slate-950 text-white px-4 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <div className=" flex items-center  text-xl font-bold">
                    <CgGym />
                    AI Fitness Buddy
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6">
                    <a href="#" className="hover:text-slate-300 transition">Home</a>
                    <a href="#" className="hover:text-slate-300 transition">About</a>
                    <a href="#" className="hover:text-slate-300 transition">Contact</a>
                    {
                        session ?
                            <button
                                onClick={() => { signOut() }}
                                className="bg-pink-600 px-4 py-2 rounded-md hover:bg-pink-700 transition">
                                Logout
                            </button>
                            : <button
                                onClick={() => router.push('/login')}
                                className="bg-pink-600 px-4 py-2 rounded-md hover:bg-pink-700 transition">
                                Login
                            </button>
                    }
                </div>

                {/* Hamburger Icon */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 px-2">
                    <a href="#" className="hover:text-slate-300 transition">Home</a>
                    <a href="#" className="hover:text-slate-300 transition">About</a>
                    <a href="#" className="hover:text-slate-300 transition">Contact</a>
                    {
                        session ?
                            <button
                                onClick={() => { signOut() }}
                                className="bg-pink-600 px-4 py-2 rounded-md hover:bg-pink-700 transition">
                                Logout
                            </button>
                            : <button
                                onClick={() => router.push('/login')}
                                className="bg-pink-600 px-4 py-2 rounded-md hover:bg-pink-700 transition">
                                Login
                            </button>
                    }
                </div>
            )}
        </nav>
    );
}
