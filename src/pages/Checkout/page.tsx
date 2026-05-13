import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface CartItem {
  name: string;
  price: number;
  image: string;
  category: string;
  qty: number;
}

const getCart = (): CartItem[] => {
  try { return JSON.parse(localStorage.getItem('cartItems') || '[]'); } catch { return []; }
};

function Checkout() {
  const [cart, setCart] = useState<CartItem[]>(getCart);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNum, setOrderNum] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setCart(getCart());
    window.addEventListener('cartUpdated', sync);
    return () => window.removeEventListener('cartUpdated', sync);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) { alert('Your cart is empty!'); return; }
    setPlacing(true);
    setTimeout(() => {
      localStorage.removeItem('cartItems');
      window.dispatchEvent(new Event('cartUpdated'));
      setOrderNum('#TH' + Math.floor(10000 + Math.random() * 90000));
      setOrderPlaced(true);
      setPlacing(false);
    }, 1800);
  };

  if (orderPlaced) {
    return (
      <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-10">
        <div className="flex flex-col items-center text-center py-16 gap-5">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl">
            <i className="fas fa-check"></i>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 m-0 leading-tight">Order Placed!</h2>
          <p className="text-slate-600 m-0">Thank you for shopping with TechHaven.</p>
          <p className="text-brand-primary font-bold text-lg m-0">Order {orderNum}</p>
          <p className="text-slate-600 m-0">A confirmation email will be sent to you shortly.</p>
          <div className="flex gap-4 flex-wrap justify-center mt-2">
            <Link to="/"
              className="inline-flex items-center justify-center bg-brand-primary text-white font-semibold px-7 py-3.5 rounded-md text-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 no-underline">
              Back to Home
            </Link>
            <Link to="/shop"
              className="inline-flex items-center justify-center bg-transparent border-2 border-brand-primary text-brand-primary font-semibold px-7 py-3.5 rounded-md text-lg hover:bg-brand-primary hover:text-white transition-all duration-300 no-underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const inputCls = "w-full px-4 py-3 border border-slate-200 rounded-md bg-white text-slate-900 font-sans text-base focus:outline-none focus:border-brand-third transition-colors duration-300";
  const labelCls = "block mb-2 font-medium text-slate-900 text-sm";

  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-10">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-3 mt-0 leading-tight">Checkout</h1>
        <p className="text-slate-600 leading-relaxed m-0">Complete your order securely.</p>
      </section>

      {/* Steps */}
      <div className="flex items-center justify-center gap-0">
        {[
          { num: '1', label: 'Cart',         active: true },
          { num: '2', label: 'Checkout',     active: true },
          { num: '3', label: 'Confirmation', active: false },
        ].map((step, i, arr) => (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${step.active ? 'bg-brand-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                {step.num}
              </div>
              <span className={`text-xs font-medium ${step.active ? 'text-brand-primary' : 'text-slate-400'}`}>{step.label}</span>
            </div>
            {i < arr.length - 1 && (
              <div className="w-16 h-0.5 mx-2 mb-5 bg-slate-200">
                <div className={`h-full ${step.active && arr[i + 1].active ? 'bg-brand-primary' : 'bg-slate-200'}`}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        {/* Form */}
        <div>
          <form id="checkout-form" onSubmit={handleSubmit}>
            {/* Billing */}
            <div className="bg-white rounded-md border border-slate-200 p-6 mb-6">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-5">
                <i className="fas fa-map-marker-alt text-brand-primary"></i> Billing Details
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className={labelCls}>First Name *</label>
                  <input type="text" placeholder="John" required className={inputCls} />
                </div>
                <div className="flex flex-col">
                  <label className={labelCls}>Last Name *</label>
                  <input type="text" placeholder="Doe" required className={inputCls} />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label className={labelCls}>Company Name <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input type="text" placeholder="Your company" className={inputCls} />
              </div>
              <div className="flex flex-col mb-4">
                <label className={labelCls}>Street Address *</label>
                <input type="text" placeholder="House number and street name" required className={inputCls} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className={labelCls}>Town / City *</label>
                  <input type="text" placeholder="New York" required className={inputCls} />
                </div>
                <div className="flex flex-col">
                  <label className={labelCls}>ZIP Code *</label>
                  <input type="text" placeholder="10001" required className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className={labelCls}>Phone *</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" required className={inputCls} />
                </div>
                <div className="flex flex-col">
                  <label className={labelCls}>Email Address *</label>
                  <input type="email" placeholder="john@example.com" required className={inputCls} />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-md border border-slate-200 p-6">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-5">
                <i className="fas fa-credit-card text-brand-primary"></i> Payment Method
              </div>

              {/* Credit card */}
              <div className="border border-slate-200 rounded-md p-4 mb-3">
                <label className="flex items-center gap-3 cursor-pointer font-medium text-slate-700">
                  <input type="radio" name="payment" value="credit" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} className="accent-brand-primary" />
                  <i className="fas fa-credit-card text-brand-primary"></i> Credit / Debit Card
                  <span className="ml-auto flex gap-2 text-xl text-slate-400">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                  </span>
                </label>
                {paymentMethod === 'credit' && (
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="flex flex-col">
                      <label className={labelCls}>Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} required className={inputCls} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className={labelCls}>Expiry Date</label>
                        <input type="text" placeholder="MM / YY" maxLength={7} required className={inputCls} />
                      </div>
                      <div className="flex flex-col">
                        <label className={labelCls}>CVC</label>
                        <input type="text" placeholder="123" maxLength={4} required className={inputCls} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PayPal */}
              <div className="border border-slate-200 rounded-md p-4 mb-3">
                <label className="flex items-center gap-3 cursor-pointer font-medium text-slate-700">
                  <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="accent-brand-primary" />
                  <i className="fab fa-paypal text-blue-600"></i> PayPal
                  <span className="ml-auto text-xl text-slate-400"><i className="fab fa-cc-paypal"></i></span>
                </label>
              </div>

              {/* COD */}
              <div className="border border-slate-200 rounded-md p-4">
                <label className="flex items-center gap-3 cursor-pointer font-medium text-slate-700">
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-brand-primary" />
                  <i className="fas fa-money-bill-wave text-green-600"></i> Cash on Delivery
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <aside className="bg-white rounded-md border border-slate-200 overflow-hidden">
          <div className="bg-brand-secondary text-white px-5 py-4 font-bold flex items-center gap-2">
            <i className="fas fa-shopping-bag"></i> Your Order
          </div>
          <div className="flex flex-col divide-y divide-slate-100 max-h-64 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8 m-0">Your cart is empty.</p>
            ) : (
              cart.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4">
                  <img
                    className="w-14 h-14 object-contain rounded-md bg-bg-main p-1 flex-shrink-0"
                    src={item.image}
                    alt={item.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/laptops/Product1.jpg'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 text-sm truncate">{item.name}</div>
                    <div className="text-slate-500 text-xs">Qty: {item.qty} &times; ${item.price.toFixed(2)}</div>
                  </div>
                  <div className="font-bold text-slate-900 text-sm flex-shrink-0">${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>
          <div className="p-5 flex flex-col gap-2 border-t border-slate-100">
            <div className="flex justify-between text-sm text-slate-700"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-slate-700"><span>Shipping</span><span className="text-green-600 font-semibold">Free</span></div>
            <div className="flex justify-between text-sm text-slate-700"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-200 mt-1"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          <div className="px-5 pb-5">
            <button
              type="submit"
              form="checkout-form"
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-md font-semibold text-white border-none transition-all duration-300 ${placing || cart.length === 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-brand-primary hover:bg-blue-700 hover:-translate-y-0.5 cursor-pointer'}`}
              disabled={placing || cart.length === 0}
            >
              {placing
                ? <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                : <><i className="fas fa-lock"></i> Place Order</>
              }
            </button>
          </div>
          <div className="flex justify-center gap-3 text-2xl text-slate-400 pb-4">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-apple-pay"></i>
            <span className="text-xs text-slate-400 self-center font-medium ml-1">SSL Secured</span>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Checkout;
