'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { CgGym } from 'react-icons/cg';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const NavLinks = () => (
    <>
      <Link href="/" className="hover:text-slate-300 transition">
        Home
      </Link>
      <Link href="/about" className="hover:text-slate-300 transition">
        About
      </Link>
      <Link href="/contact" className="hover:text-slate-300 transition">
        Contact
      </Link>
      {session ? (
        <button
          onClick={() => signOut()}
          className="bg-pink-600 px-4 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => router.push('/login')}
          className="bg-pink-600 px-4 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Login
        </button>
      )}
    </>
  );

  return (
    <nav className="bg-slate-950 text-white px-4 shadow-md fixed top-0 left-0 right-0 z-50 h-16">
  <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <CgGym className="text-pink-500" size={24} />
          AI Fitness Buddy
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-4 px-4 pb-4">
          <NavLinks />
        </div>
      )}
    </nav>
  );
}
