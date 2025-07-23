'use client';

import React from 'react';
import { useSession  ,signIn} from 'next-auth/react';


export default function AboutPage() {
  const {data : session} = useSession()


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
      <div className="max-w-3xl bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-pink-300">
        <h1 className="text-4xl font-bold text-pink-700 text-center mb-6">
          About AI Fitness Buddy
        </h1>

        <p className="text-gray-800 text-lg leading-relaxed">
          <strong>AI Fitness Buddy</strong> is your personal virtual coach designed to make your fitness journey easier, smarter, and more personalized.
          Whether you’re a beginner or an advanced athlete, our AI listens to your daily input and helps guide your workouts, mindset, and health habits.

          <br /><br />
          Upload your progress photos, share your daily routine, ask for workout suggestions, or just talk about your challenges — 
          AI Fitness Buddy is always here to help. It's powered by cutting-edge AI models, and built with love to support you every step of the way.

          <br /><br />
          💡 Think of it as your 24/7 personal trainer, accountability partner, and motivational friend — all rolled into one. No judgment, just support.

          <br /><br />
          Join us and start building the strongest, healthiest version of yourself — one conversation at a time.
        </p>
      </div>
    </div>
  );
}
