'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleLogin = () => {
    signIn('google'); // optional: add callbackUrl
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
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

export default page;
