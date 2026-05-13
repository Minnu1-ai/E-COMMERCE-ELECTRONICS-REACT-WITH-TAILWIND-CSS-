import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface CartItem {
  id?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  qty: number;
}

const getCart = (): CartItem[] => {
  try { return JSON.parse(localStorage.getItem('cartItems') || '[]'); } catch { return []; }
};
const saveCart = (items: CartItem[]) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
  window.dispatchEvent(new Event('cartUpdated'));
};

function Cart() {
  const [cart, setCart] = useState<CartItem[]>(getCart);
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setCart(getCart());
    window.addEventListener('cartUpdated', sync);
    return () => window.removeEventListener('cartUpdated', sync);
  }, []);

  const updateQty = (index: number, delta: number) => {
    const updated = [...cart];
    updated[index].qty = Math.max(1, updated[index].qty + delta);
    saveCart(updated);
    setCart([...updated]);
  };

  const setQty = (index: number, val: number) => {
    const updated = [...cart];
    updated[index].qty = Math.max(1, val || 1);
    saveCart(updated);
    setCart([...updated]);
  };

  const removeItem = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    saveCart(updated);
    setCart(updated);
  };

  const clearCart = () => {
    if (window.confirm('Remove all items from your cart?')) {
      saveCart([]);
      setCart([]);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-10">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-3 mt-0 leading-tight">Your Cart</h1>
        <p className="text-slate-600 leading-relaxed m-0">Review your items before checkout.</p>
      </section>

      {/* Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-slate-900 m-0 leading-tight">
              Cart Items{' '}
              {totalItems > 0 && (
                <span className="text-base font-normal text-slate-500">({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
              )}
            </h3>
            {cart.length > 0 && (
              <button
                type="button"
                className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer hover:bg-red-100 transition-colors duration-300"
                onClick={clearCart}
              >
                <i className="fas fa-trash"></i> Clear All
              </button>
            )}
          </div>

          <div className="flex flex-col gap-0 bg-white rounded-md border border-slate-200 overflow-hidden">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center gap-4">
                <i className="fas fa-shopping-cart text-5xl text-slate-300"></i>
                <h3 className="text-2xl font-semibold text-slate-900 m-0 leading-tight">Your cart is empty</h3>
                <p className="text-slate-500 m-0">Looks like you haven't added anything yet.</p>
                <Link to="/shop"
                  className="inline-flex items-center justify-center bg-brand-primary text-white font-semibold px-7 py-3.5 rounded-md text-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 no-underline">
                  Start Shopping
                </Link>
              </div>
            ) : (
              cart.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border-b border-slate-100 last:border-b-0">
                  <img
                    className="w-20 h-20 object-contain rounded-md bg-bg-main p-2 flex-shrink-0"
                    src={item.image}
                    alt={item.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/laptops/Product1.jpg'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 text-sm mb-0.5 truncate">{item.name}</div>
                    <div className="text-slate-500 text-xs mb-0.5">{item.category}</div>
                    <div className="text-slate-500 text-xs">Unit: ${item.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center border border-slate-200 rounded-md overflow-hidden flex-shrink-0">
                    <button type="button"
                      className="w-8 h-8 flex items-center justify-center bg-bg-main text-slate-700 font-bold border-none cursor-pointer hover:bg-slate-200 transition-colors duration-300"
                      onClick={() => updateQty(i, -1)}>-</button>
                    <input
                      type="number"
                      value={item.qty}
                      min={1}
                      max={99}
                      className="w-10 h-8 text-center border-none border-x border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none"
                      onChange={(e) => setQty(i, parseInt(e.target.value))}
                    />
                    <button type="button"
                      className="w-8 h-8 flex items-center justify-center bg-bg-main text-slate-700 font-bold border-none cursor-pointer hover:bg-slate-200 transition-colors duration-300"
                      onClick={() => updateQty(i, 1)}>+</button>
                  </div>
                  <div className="font-bold text-slate-900 text-sm w-20 text-right flex-shrink-0">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                  <button
                    type="button"
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 bg-transparent border-none cursor-pointer transition-colors duration-300 flex-shrink-0"
                    aria-label="Remove item"
                    onClick={() => removeItem(i)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-4">
            <Link to="/shop"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-brand-primary text-brand-primary font-semibold px-4 py-2 rounded-md text-sm hover:bg-brand-primary hover:text-white transition-all duration-300 no-underline">
              <i className="fas fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-md border border-slate-200 p-6 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-slate-900 m-0 leading-tight">Order Summary</h3>
          <p className="text-slate-500 text-sm m-0">Prices include applicable taxes</p>
          <div className="flex justify-between text-sm text-slate-700 py-2 border-b border-slate-100">
            <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-700 py-2 border-b border-slate-100">
            <span>Shipping</span><span className="text-green-600 font-semibold">Free</span>
          </div>
          <div className="flex justify-between text-sm text-slate-700 py-2 border-b border-slate-100">
            <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-900 text-lg py-2">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-md font-semibold text-white border-none transition-all duration-300 ${cart.length === 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-brand-primary hover:bg-blue-700 hover:-translate-y-0.5 cursor-pointer'}`}
            disabled={cart.length === 0}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout <i className="fas fa-arrow-right"></i>
          </button>
          <div className="flex justify-center gap-4 text-2xl text-slate-400 mt-2">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-apple-pay"></i>
          </div>
          <p className="text-center text-slate-400 text-xs m-0">
            <i className="fas fa-lock mr-1"></i> Secure checkout
          </p>
        </div>
      </section>
    </main>
  );
}

export default Cart;
