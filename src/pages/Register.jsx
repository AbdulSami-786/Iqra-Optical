import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    localStorage.setItem('iqra_user', JSON.stringify({ email: form.email, name: form.name }));
    navigate('/profile');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-cream/40">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 md:p-10">
        <h1 className="text-2xl font-serif font-semibold text-ink mb-2 text-center">Create Account</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Join us for a personalized shopping experience</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 outline-none focus:border-ink transition-colors text-sm"
            />
          </div>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 outline-none focus:border-ink transition-colors text-sm"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 outline-none focus:border-ink transition-colors text-sm"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-ink hover:text-gold">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
