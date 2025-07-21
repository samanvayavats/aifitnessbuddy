import Link from 'next/link'
import { CgGym } from 'react-icons/cg';
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
export default function footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 px-4 py-8 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo + Description */}
        <div>
          
          <div className=" flex items-center  text-xl font-bold">
                <CgGym  />
                    AI Fitness Buddy
                </div>

          <p className="mt-2 text-sm">
            Your personal AI-powered fitness partner. Get custom workouts, track your progress, and reach your goals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm flex ">
            <li><a href="#" className="hover:text-white transition mr-1">Home</a></li>
            <li><a href="#" className="hover:text-white transition mr-1">About</a></li>
            <li><a href="#" className="hover:text-white transition mr-1">Contact</a></li>
          </ul>
        </div>

        {/* Subscribe or Social */}
        <div>
          <h3 className="font-semibold text-white mb-2">Stay Connected</h3>
          <div className="flex gap-2 text-white">
             <Link href="/"><FaGithub /></Link>
            <Link href="/"><CiLinkedin /></Link> 
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} AI Fitness Buddy. All rights reserved.
      </div>
    </footer>
  );
}
