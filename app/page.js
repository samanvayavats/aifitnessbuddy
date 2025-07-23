'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession()


  const router = useRouter();

  const handleStartClick = () => {
    router.push('/aifitnessbuddy');
  };

  if (!session) {
    return (
      <div className="p-6 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Login Required</h1>
        <button
          onClick={() => signIn('google')}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      </div>
    );
  }


  return (

    <div className="min-h-screen w-full bg-gradient-to-b from-rose-100 to-pink-200 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-pink-300">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-6">
          Start Your Fitness Journey Now
        </h1>

        {/* Button */}
        <button
          onClick={handleStartClick}
          className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-3 rounded-full transition duration-300 shadow-md"
        >
          Start Now
        </button>

        {/* Description */}
        <p className="mt-8 text-gray-800 text-md md:text-lg leading-relaxed">
          <strong>AI Fitness Buddy</strong> is your smart companion designed to help you achieve your fitness goals with ease.
          Whether you’re tracking workouts, asking health questions, or uploading progress photos, our AI gives you
          personalized responses and tips — instantly. Powered by advanced AI models and your input, it's like having a
          personal trainer in your pocket, 24/7.
        </p>
      </div>
    </div>
  );
}
