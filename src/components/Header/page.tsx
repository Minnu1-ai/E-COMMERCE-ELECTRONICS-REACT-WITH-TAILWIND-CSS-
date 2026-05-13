import { Link } from 'react-router-dom';

function Header() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4 mt-0 leading-tight">
            Next-Gen Tech For Your Lifestyle
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4 mt-0">
            Discover premium electronics, smart home devices, and cutting-edge accessories designed to elevate your everyday experience.
          </p>
        </div>
        <div>
          <Link to="/contact" className="text-brand-primary font-semibold hover:text-blue-700 transition-colors duration-300 no-underline">
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Header;
