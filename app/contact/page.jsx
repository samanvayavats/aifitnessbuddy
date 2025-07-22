'use client';

import axios from 'axios';
import React, { useState } from 'react';


export default function page() {


  const [formData, setFormData] = useState({

    name: '',
    email: '',
    message: '',
  });


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   

    try {
      const res = axios.post('api/contact', {
        formData
      })
      console.log("the response form backend ", res)
    } catch (error) {
      console.log("something went wrong")
    }
    finally {
      setFormData({ name: '', email: '', message: '' });
      
    }


  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-rose-100 to-pink-200 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-pink-300">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 text-center mb-6">
          Contact Us
        </h1>

      
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-lg transition duration-300 shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
