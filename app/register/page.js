'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import "../globals.css";

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://mini-notes-app-rjui.onrender.com/api/register', { username, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error registering');
    }
  };

  return (
    <div className="fullscreen-center">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <p>
          Have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
