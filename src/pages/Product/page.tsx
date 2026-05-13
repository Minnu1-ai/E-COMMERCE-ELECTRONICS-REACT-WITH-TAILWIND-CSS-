import { useState } from 'react';
import { Link } from 'react-router-dom';

const PRODUCT = {
  id: 'prod-1',
  name: 'Premium Wireless Headphones',
  price: 349.99,
  category: 'Audio',
  images: [
    '/images/audio/Product1.jpg',
    '/images/audio/Product2.jpg',
    '/images/audio/Product3.jpg',
  ],
};

function Product() {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    let cartItems: { id: string; name: string; price: number; image: string; category: string; qty: number }[] = [];
    try { cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]'); } catch { cartItems = []; }
    const idx = cartItems.findIndex((i) => i.id === PRODUCT.id);
    if (idx > -1) {
      cartItems[idx].qty += qty;
    } else {
      cartItems.push({ id: PRODUCT.id, name: PRODUCT.name, price: PRODUCT.price, image: PRODUCT.images[0], category: PRODUCT.category, qty });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-brand-primary transition-colors duration-300 no-underline text-slate-500">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-brand-primary transition-colors duration-300 no-underline text-slate-500">Audio</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Premium Wireless Headphones</span>
      </div>

      {/* Product layout */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="bg-bg-main rounded-md p-6 flex items-center justify-center border border-slate-200">
              <img src={PRODUCT.images[activeImg]} alt="Premium Wireless Headphones"
                className="w-full max-h-[380px] object-contain" />
            </div>
            <div className="flex gap-3">
              {PRODUCT.images.map((src, i) => (
                <div
                  key={i}
                  className={`cursor-pointer rounded-md border-2 p-2 transition-all duration-300 ${activeImg === i ? 'border-brand-primary' : 'border-slate-200 opacity-60 hover:opacity-100'}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={src} alt={`View ${i + 1}`} className="w-20 h-20 object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-5xl font-extrabold text-slate-900 mb-3 mt-0 leading-tight">Premium Wireless Headphones</h1>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-1 text-amber-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <span className="text-slate-500 text-sm">(124 Reviews)</span>
              </div>
              <p className="text-3xl font-bold text-brand-primary m-0">$349.99</p>
            </div>

            <p className="text-slate-600 leading-relaxed m-0">
              Industry-leading noise cancellation, exceptional sound quality, and up to 30 hours of battery life. These headphones are designed for the ultimate listening experience.
            </p>

            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {['Advanced Noise Cancellation', 'Hi-Res Audio Compatible', 'Built-in Alexa & Google Assistant', 'Touch Controls'].map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-slate-700 text-sm">
                  <i className="fas fa-check-circle text-green-500"></i> {feat}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center border border-slate-200 rounded-md overflow-hidden">
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center bg-bg-main text-slate-700 font-bold text-lg border-none cursor-pointer hover:bg-slate-200 transition-colors duration-300"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >-</button>
                <input
                  type="number"
                  value={qty}
                  min={1}
                  className="w-14 h-10 text-center border-none border-x border-slate-200 text-slate-900 font-semibold focus:outline-none"
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center bg-bg-main text-slate-700 font-bold text-lg border-none cursor-pointer hover:bg-slate-200 transition-colors duration-300"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >+</button>
              </div>
              <button
                type="button"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-semibold text-white border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${added ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-primary hover:bg-blue-700'}`}
                onClick={handleAddToCart}
              >
                <i className={`fas ${added ? 'fa-check' : 'fa-shopping-cart'}`}></i>
                {added ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section>
        <h2 className="text-4xl font-bold text-slate-900 mb-6 mt-0 leading-tight">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-md border border-slate-200 p-8">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4 mt-0 leading-tight">Description</h3>
            <p className="text-slate-600 leading-relaxed mb-4 mt-0">
              Experience your music like never before. With two processors controlling eight microphones, our Auto NC Optimizer automatically optimizes noise canceling based on your wearing conditions and environment.
            </p>
            <p className="text-slate-600 leading-relaxed mb-0 mt-0">
              With up to 30 hours of battery life, you'll have enough power for long trips. And if you need to top up in a hurry, you can get 3 hours' worth of charge after just 3 minutes.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4 mt-0 leading-tight">Specifications</h3>
            <div className="flex flex-col gap-0">
              {[
                { label: 'Weight',        value: '250g' },
                { label: 'Battery Life',  value: 'Up to 30 Hours' },
                { label: 'Bluetooth',     value: 'Version 5.2' },
                { label: 'Charging Time', value: 'Approx. 3.5 Hours' },
              ].map((spec) => (
                <div key={spec.label} className="flex justify-between py-3 border-b border-slate-100 last:border-b-0">
                  <span className="text-slate-500 text-sm font-medium">{spec.label}</span>
                  <span className="text-slate-800 text-sm font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Product;
