'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';
import ReactMarkdown from 'react-markdown';
import { MdCancel } from "react-icons/md";

export default function Page() {
  const { data: session, status } = useSession();
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [isUpload, setIsUpload] = useState(false);


  useEffect(() => {

    if (status === 'authenticated' && session?.user?.email) {

      fetchHistory(session.user.email);
    }
  }, [session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      return setMessage('Input is required.');
    }

    setIsUpload(true);

    const formData = new FormData();
    formData.append('email', session.user.email);
    formData.append('input', input);
    if (file) {
      formData.append('file', file);
    }

    try {
      const res = await axios.post('/api/users/communcation', formData);
      setMessage(res.data.message);
      fetchHistory(session.user.email);
    } catch (error) {
      console.error(error);
      setMessage(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsUpload(false);
      setInput('');
    }
  };

  const fetchHistory = async (email) => {
    try {
      const res = await axios.get('/api/users/communcation', {
        params: { email }
      });
      setHistory(res.data.user?.history || []);
    } catch (error) {
      console.error(error);
      setMessage('Failed to fetch history');
    }
  };

  if (status === 'loading') {
    return <p className="p-6">Checking session...</p>;
  }

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
    <div className='w-full h-full bg-pink-200 min-h-full'>
      <div className="p-6 max-w-xl mx-auto font-mono ">
        <h1 className="text-2xl font-bold mb-4">💪 Talk to Your AI Fitness Buddy</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="How was your workout today? Or ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            rows={4}
            required
          />

          <div className=' flex '>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
            />
            <div onClick={()=>(setFile(null))}>
              <MdCancel size={26}  className='text-pink-600'/>
            </div>
          </div>

          {
            file &&
            <img src={URL.createObjectURL(file)}
              className='h-20 w-20'
              alt="No image to show" />
          }

          <button
            disabled={isUpload}
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {isUpload ? '⏳ Waiting for AI response...' : '🚀 Send to AI'}
          </button>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">📜 Conversation History</h2>
          {history.length === 0 ? (
            <p className="text-gray-500">No history yet.</p>
          ) : (
            <ul className="space-y-4">
              {history.map((item, index) => (
                <li key={index} className="border p-4 rounded shadow">
                  <p><strong>{item.role}</strong>:</p>
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                  {item.image && (
                    <img
                      src={item.image}
                      alt="Uploaded"
                      className="mt-2 w-full max-w-xs rounded"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
}
