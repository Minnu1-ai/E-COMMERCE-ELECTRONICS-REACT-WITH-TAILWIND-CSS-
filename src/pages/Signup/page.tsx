import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim()) { setError('First name is required.'); return; }
    if (!lastName.trim()) { setError('Last name is required.'); return; }
    if (!email.trim()) { setError('Email is required.'); return; }
    if (!password) { setError('Password is required.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (!agreed) { setError('You must agree to the Terms & Conditions.'); return; }

    let accounts: { email: string; password: string; firstName: string; lastName: string }[] = [];
    try { accounts = JSON.parse(localStorage.getItem('userAccounts') || '[]'); } catch { accounts = []; }

    if (accounts.some((a) => a.email.toLowerCase() === email.trim().toLowerCase())) {
      setError('An account with this email already exists.');
      return;
    }

    accounts.push({ email: email.trim().toLowerCase(), password, firstName: firstName.trim(), lastName: lastName.trim() });
    localStorage.setItem('userAccounts', JSON.stringify(accounts));
    navigate('/login');
  };

  const inputCls = "w-full px-4 py-3 border border-slate-200 rounded-md bg-white text-slate-900 font-sans text-base focus:outline-none focus:border-brand-third transition-colors duration-300";

  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-10">
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-3 mt-0 leading-tight">Create an Account</h1>
        <p className="text-slate-600 leading-relaxed m-0">Join TechHaven today.</p>
      </section>

      <section>
        <form
          className="bg-white p-10 rounded-md border border-slate-200 max-w-[500px] mx-auto flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900 m-0 leading-tight">Register</h2>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-md px-4 py-3 text-sm font-medium">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-900 text-sm">First Name</label>
              <input type="text" required value={firstName} className={inputCls}
                onChange={(e) => { setFirstName(e.target.value); setError(''); }} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-900 text-sm">Last Name</label>
              <input type="text" required value={lastName} className={inputCls}
                onChange={(e) => { setLastName(e.target.value); setError(''); }} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-900 text-sm">Email Address</label>
            <input type="email" placeholder="you@example.com" required value={email} className={inputCls}
              onChange={(e) => { setEmail(e.target.value); setError(''); }} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-900 text-sm">Password</label>
            <input type="password" placeholder="Min. 8 characters" required value={password} className={inputCls}
              onChange={(e) => { setPassword(e.target.value); setError(''); }} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-900 text-sm">Confirm Password</label>
            <input type="password" placeholder="••••••••" required value={confirm} className={inputCls}
              onChange={(e) => { setConfirm(e.target.value); setError(''); }} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 font-medium">
              <input type="checkbox" className="accent-brand-primary" checked={agreed}
                onChange={(e) => { setAgreed(e.target.checked); setError(''); }} />
              I agree to the Terms &amp; Conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-brand-primary text-white font-semibold py-3 rounded-md text-base hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 border-none cursor-pointer"
          >
            Create Account
          </button>
          <div className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-primary font-semibold hover:text-blue-700 transition-colors duration-300 no-underline">
              Login here
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Signup;
