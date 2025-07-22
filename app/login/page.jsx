'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // When user is authenticated, register them and redirect
    const registerUser = async () => {
      try {
        await axios.post('/api/users/register', {
          email: session.user.email,
        });
      } catch (error) {
        console.error('Registration error:', error?.response?.data?.message || error.message);
      }
    };

    if (status === 'authenticated' && session?.user?.email) {
      registerUser();
      router.push('/');
    }
  }, [session, status, router]);

  const handleLogin = () => {
    signIn('google'); // triggers Google OAuth flow
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-pink-200">
      <button
        onClick={handleLogin}
        className="flex items-center gap-2 px-5 py-3 border-2 border-black rounded text-black hover:bg-gray-100 transition"
      >
        <FaGoogle size={20} />
        <span>Login using Google</span>
      </button>
    </div>
  );
};

export default Page;
