import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const getCartCount = (): number => {
  try {
    const items: { qty: number }[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    return items.reduce((sum, item) => sum + item.qty, 0);
  } catch {
    return 0;
  }
};

function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount]     = useState(getCartCount);
  const searchInputRef                = useRef<HTMLInputElement>(null);
  const navigate                      = useNavigate();

  const activeClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-brand-primary font-semibold'
      : 'text-slate-600 font-medium hover:text-brand-primary transition-colors duration-300';

  const toggleMenu  = () => setMenuOpen((o) => !o);
  const closeMenu   = () => setMenuOpen(false);

  const openSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };
  const closeSearch = () => { setSearchOpen(false); setSearchQuery(''); };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      closeSearch();
      navigate(`/shop?search=${encodeURIComponent(q)}`);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchOpen ? closeSearch() : setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  useEffect(() => {
    const update = () => setCartCount(getCartCount());
    window.addEventListener('cartUpdated', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('cartUpdated', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-[1000] bg-white border-b border-slate-200 transition-shadow duration-300">
        <nav className="flex justify-between items-center px-[30px] py-[15px] max-w-[1400px] mx-auto w-full relative">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 text-2xl font-bold text-brand-secondary no-underline" onClick={closeMenu}>
            <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center bg-brand-primary text-white font-extrabold text-base flex-shrink-0">
              TH
            </div>
            <span className="tracking-tight">TechHaven</span>
          </NavLink>

          {/* Hamburger */}
          <button
            type="button"
            className="md:hidden bg-transparent border-none text-2xl text-slate-800 cursor-pointer p-0 flex items-center justify-center"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
          >
            <i className={`fas fa-bars transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`} aria-hidden="true" />
          </button>

          {/* Desktop nav links */}
          <ul className="hidden md:flex gap-[30px] items-center list-none p-0 m-0">
            <li><NavLink to="/" end className={activeClass} onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to="/shop" className={activeClass} onClick={closeMenu}>Shop</NavLink></li>
            <li><NavLink to="/contact" className={activeClass} onClick={closeMenu}>Contact</NavLink></li>
            <li><NavLink to="/dashboard" className={activeClass} onClick={closeMenu}>Dashboard</NavLink></li>
            <li className="flex gap-[18px] items-center">
              <a href="#" aria-label="Search" onClick={openSearch}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full text-slate-600 hover:bg-bg-main hover:text-brand-primary transition-all duration-300">
                <i className="fas fa-search text-base" aria-hidden="true" />
              </a>
              <NavLink to="/login" onClick={closeMenu} aria-label="User account"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full text-slate-600 hover:bg-bg-main hover:text-brand-primary transition-all duration-300">
                <i className="fas fa-user text-base" aria-hidden="true" />
              </NavLink>
              <NavLink to="/cart" onClick={closeMenu} aria-label="View cart"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full text-slate-600 hover:bg-bg-main hover:text-brand-primary transition-all duration-300 relative">
                <i className="fas fa-shopping-cart text-base" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Mobile menu */}
          <ul className={`md:hidden flex flex-col absolute top-full left-0 w-full bg-white border-b border-slate-200 overflow-hidden transition-all duration-300 shadow-lg z-50 list-none p-0 m-0 ${menuOpen ? 'max-h-[500px] opacity-100 py-4 px-5' : 'max-h-0 opacity-0'}`}>
            <li className="w-full text-center py-3 border-b border-slate-100">
              <NavLink to="/" end className={activeClass} onClick={closeMenu}>Home</NavLink>
            </li>
            <li className="w-full text-center py-3 border-b border-slate-100">
              <NavLink to="/shop" className={activeClass} onClick={closeMenu}>Shop</NavLink>
            </li>
            <li className="w-full text-center py-3 border-b border-slate-100">
              <NavLink to="/contact" className={activeClass} onClick={closeMenu}>Contact</NavLink>
            </li>
            <li className="w-full text-center py-3 border-b border-slate-100">
              <NavLink to="/dashboard" className={activeClass} onClick={closeMenu}>Dashboard</NavLink>
            </li>
            <li className="w-full flex justify-center gap-2 pt-2 pb-1">
              <a href="#" aria-label="Search" onClick={openSearch}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-bg-main text-slate-600 text-lg hover:bg-brand-primary hover:text-white transition-all duration-300">
                <i className="fas fa-search" />
              </a>
              <NavLink to="/login" onClick={closeMenu} aria-label="User account"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-bg-main text-slate-600 text-lg hover:bg-brand-primary hover:text-white transition-all duration-300">
                <i className="fas fa-user" />
              </NavLink>
              <NavLink to="/cart" onClick={closeMenu} aria-label="View cart"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-bg-main text-slate-600 text-lg hover:bg-brand-primary hover:text-white transition-all duration-300 relative">
                <i className="fas fa-shopping-cart" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-24" role="dialog" aria-modal="true" aria-label="Search">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeSearch} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 z-10">
            <form className="flex items-center gap-3 px-5 py-4" onSubmit={handleSearchSubmit} autoComplete="off">
              <span className="text-slate-400 text-lg"><i className="fas fa-search" /></span>
              <input
                ref={searchInputRef}
                type="text"
                className="flex-1 border-none outline-none text-lg text-slate-800 placeholder-slate-400 bg-transparent"
                placeholder="Search products..."
                aria-label="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="bg-transparent border-none text-slate-400 hover:text-slate-700 cursor-pointer text-lg p-1"
                aria-label="Close search"
                onClick={closeSearch}
              >
                <i className="fas fa-times" />
              </button>
            </form>
            <p className="text-center text-sm text-slate-400 pb-3">Press Enter to search · Esc to close</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
