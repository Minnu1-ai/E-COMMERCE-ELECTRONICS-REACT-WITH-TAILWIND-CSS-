import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-brand-secondary text-bg-main pt-[60px] pb-5 px-5 mt-[60px]">
      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4 w-[250px]">
          <Link to="/" className="flex items-center gap-3 text-xl font-bold text-white no-underline">
            <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center bg-brand-primary text-white font-extrabold text-base flex-shrink-0">
              TH
            </div>
            TechHaven
          </Link>
          <p className="text-slate-400 leading-relaxed m-0">
            Your ultimate destination for the latest and greatest in consumer electronics.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 w-[250px]">
          <h4 className="text-white font-semibold text-xl mb-2 mt-0">Quick Links</h4>
          <Link to="/about" className="text-slate-400 hover:text-brand-primary transition-colors duration-300 no-underline">About Us</Link>
          <Link to="/contact" className="text-slate-400 hover:text-brand-primary transition-colors duration-300 no-underline">Contact Us</Link>
          <Link to="/blog" className="text-slate-400 hover:text-brand-primary transition-colors duration-300 no-underline">Blog</Link>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-4 w-[250px]">
          <h4 className="text-white font-semibold text-xl mb-2 mt-0">Categories</h4>
          <Link to="/shop" className="text-slate-400 hover:text-brand-primary transition-colors duration-300 no-underline">Laptops &amp; Computers</Link>
          <Link to="/shop" className="text-slate-400 hover:text-brand-primary transition-colors duration-300 no-underline">Smartphones &amp; Tablets</Link>
          <Link to="/shop" className="text-slate-400 hover:text-brand-primary transition-colors duration-300 no-underline">Audio &amp; Headphones</Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1200px] mx-auto mt-10 pt-5 border-t border-slate-700 flex flex-wrap justify-between items-center gap-4">
        <p className="text-slate-400 text-sm m-0">&copy; 2026 TechHaven Electronics. All rights reserved.</p>
        <div className="flex gap-4 text-2xl text-slate-400">
          <i className="fab fa-cc-visa"></i>
          <i className="fab fa-cc-mastercard"></i>
          <i className="fab fa-cc-paypal"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
