import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) { setError('Email is required.'); return; }
    if (!password) { setError('Password is required.'); return; }

    let accounts: { email: string; password: string; firstName: string }[] = [];
    try { accounts = JSON.parse(localStorage.getItem('userAccounts') || '[]'); } catch { accounts = []; }

    if (accounts.length > 0) {
      const match = accounts.find(
        (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
      );
      if (!match) { setError('Invalid email or password.'); return; }
      localStorage.setItem('userSession', JSON.stringify({ email: match.email, firstName: match.firstName }));
    } else {
      const firstName = email.split('@')[0];
      localStorage.setItem('userSession', JSON.stringify({ email: email.trim().toLowerCase(), firstName }));
    }

    navigate('/');
  };

  const inputCls = "w-full px-4 py-3 border border-slate-200 rounded-md bg-white text-slate-900 font-sans text-base focus:outline-none focus:border-brand-third transition-colors duration-300";

  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-10">
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-3 mt-0 leading-tight">Welcome Back</h1>
        <p className="text-slate-600 leading-relaxed m-0">Login to access your account.</p>
      </section>

      <section>
        <form
          className="bg-white p-10 rounded-md border border-slate-200 max-w-[500px] mx-auto flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900 m-0 leading-tight">Login</h2>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-md px-4 py-3 text-sm font-medium">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-900 text-sm">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              className={inputCls}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-900 text-sm">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              className={inputCls}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 font-medium">
              <input type="checkbox" className="accent-brand-primary" /> Remember me
            </label>
            <a href="#" className="text-brand-primary text-sm font-medium hover:text-blue-700 transition-colors duration-300 no-underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-brand-primary text-white font-semibold py-3 rounded-md text-base hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 border-none cursor-pointer"
          >
            Sign In
          </button>
          <div className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-primary font-semibold hover:text-blue-700 transition-colors duration-300 no-underline">
              Register here
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
