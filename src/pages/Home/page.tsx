import { useState } from 'react';
import { Link } from 'react-router-dom';

interface TrendingProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

const trendingProducts: TrendingProduct[] = [
  { id: 'trend-1', name: 'Premium Wireless Headphones',  category: 'Audio',         price: '349.99',    image: '/images/top products/Product1.jpg' },
  { id: 'trend-2', name: 'Ultra-Slim Creator Laptop 16"', category: 'Laptops & PCs', price: '2,499.00',  image: '/images/top products/Product2.jpg' },
  { id: 'trend-3', name: 'Pro Max Smartphone 5G',         category: 'Smartphones',   price: '1,199.00',  image: '/images/top products/Product3.jpg' },
  { id: 'trend-4', name: 'Mirrorless Digital Camera',     category: 'Cameras',       price: '1,799.00',  image: '/images/top products/Product4.jpg' },
];

function Home() {
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAddToCart = (product: TrendingProduct) => {
    let cartItems: { id: string; name: string; price: number; image: string; category: string; qty: number }[] = [];
    try { cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]'); } catch { cartItems = []; }
    const idx = cartItems.findIndex((i) => i.id === product.id);
    if (idx > -1) {
      cartItems[idx].qty++;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price.replace(/,/g, '')),
        image: product.image,
        category: product.category,
        qty: 1,
      });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => { const next = new Set(prev); next.delete(product.id); return next; });
    }, 1500);
  };

  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-10">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl px-10 py-16 text-center text-white">
        <h1 className="text-5xl font-extrabold text-white mb-4 mt-0 leading-tight">
          Next-Gen Tech For Your Lifestyle
        </h1>
        <p className="text-blue-100 text-lg leading-relaxed mb-8 mt-0 max-w-2xl mx-auto">
          Discover our latest collection of premium electronics, smart home devices, and
          cutting-edge accessories designed to elevate your everyday experience.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/shop"
            className="inline-flex items-center justify-center bg-white text-brand-primary font-bold px-7 py-3.5 rounded-md text-lg hover:bg-blue-50 transition-all duration-300 no-underline">
            Shop Collection &rarr;
          </Link>
          <Link to="/contact"
            className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold px-7 py-3.5 rounded-md text-lg hover:bg-white hover:text-brand-primary transition-all duration-300 no-underline">
            View Offers
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-slate-900 m-0 leading-tight">Shop by Category</h2>
          <Link to="/shop"
            className="inline-flex items-center justify-center bg-transparent border-2 border-brand-primary text-brand-primary font-semibold px-4 py-2 rounded-md text-sm hover:bg-brand-primary hover:text-white transition-all duration-300 no-underline">
            View all categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-[900px] mx-auto my-9">
          {[
            { img: '/images/categories/cat1.jpg', label: 'Laptops & PCs',  link: '/shop?category=Laptops%20%26%20PCs', count: '120+ Products' },
            { img: '/images/categories/cat2.jpg', label: 'Smartphones',    link: '/shop?category=Smartphones',         count: '85+ Products' },
            { img: '/images/categories/cat3.jpg', label: 'Audio',          link: '/shop?category=Audio',               count: '64+ Products' },
            { img: '/images/categories/cat4.jpg', label: 'Wearables',      link: '/shop?category=Wearables',           count: '42+ Products' },
          ].map((cat) => (
            <div key={cat.label} className="flex flex-col bg-white rounded-md border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <img src={cat.img} alt={cat.label}
                className="block w-full h-[200px] object-contain bg-bg-main p-4 transition-transform duration-300 hover:scale-105" />
              <div className="p-4 flex flex-col flex-1">
                <Link to={cat.link} className="font-semibold text-slate-900 text-base mb-1.5 leading-snug hover:text-brand-primary transition-colors duration-300 no-underline">
                  {cat.label}
                </Link>
                <p className="text-slate-600 leading-relaxed mb-0 mt-0 text-sm">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section>
        <div className="mb-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-1 mt-0 leading-tight">Trending Now</h2>
          <p className="text-slate-500 m-0">Top picks from our community</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingProducts.map((product) => {
            const isAdded = addedIds.has(product.id);
            return (
              <div key={product.id} className="flex flex-col bg-white rounded-md border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Link to="/product">
                  <img src={product.image} alt={product.name}
                    className="block w-full h-[200px] object-contain bg-bg-main p-4 transition-transform duration-300 hover:scale-105" />
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <Link to="/product" className="font-semibold text-slate-900 text-base mb-1.5 leading-snug line-clamp-2 hover:text-brand-primary transition-colors duration-300 no-underline">
                    {product.name}
                  </Link>
                  <span className="inline-block text-xs font-medium text-brand-primary bg-blue-50 px-2.5 py-0.5 rounded-full mb-3">
                    {product.category}
                  </span>
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-slate-200">
                    <span className="font-bold text-[1.15rem] text-brand-primary">${product.price}</span>
                    <button
                      type="button"
                      className={`w-[34px] h-[34px] p-0 rounded-full text-sm flex-shrink-0 flex items-center justify-center text-white font-semibold cursor-pointer border-none transition-all duration-300 ${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-primary hover:bg-blue-700 hover:-translate-y-0.5'}`}
                      aria-label="Add to cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className={`fas ${isAdded ? 'fa-check' : 'fa-plus'}`}></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}

export default Home;
