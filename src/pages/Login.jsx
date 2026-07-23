import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    localStorage.setItem('iqra_user', JSON.stringify({ email: form.email, name: form.email.split('@')[0] }));
    navigate('/profile');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-cream/40">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 md:p-10">
        <h1 className="text-2xl font-serif font-semibold text-ink mb-2 text-center">Welcome Back</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Sign in to manage your orders and wishlist</p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-300 outline-none focus:border-ink transition-colors text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-ink hover:text-gold">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
