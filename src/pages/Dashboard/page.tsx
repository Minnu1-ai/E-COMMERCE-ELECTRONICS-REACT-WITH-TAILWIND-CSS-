import { useEffect, useMemo, useRef, useState } from 'react';
import { Chart, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, DoughnutController, BarController } from 'chart.js';
Chart.register(BarController, DoughnutController, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Product { id: string; name: string; category: string; brand: string; price: number; stock: number; rating: number; available: boolean; image: string; }

const STOCK_KEY = 'techhavenStock';
function uuid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

const SEED_PRODUCTS: Omit<Product, 'id'>[] = [
  { name: 'Apple Elite 14',       category: 'Laptops & PCs', brand: 'Apple',       price: 1663.85, stock: 12, rating: 4.5, available: true,  image: '/images/laptops/Product1.jpg' },
  { name: 'MSI Premium 70',       category: 'Laptops & PCs', brand: 'MSI',         price: 938.84,  stock: 8,  rating: 4.2, available: true,  image: '/images/laptops/Product2.jpg' },
  { name: 'Asus Advanced 98',     category: 'Laptops & PCs', brand: 'Asus',        price: 1026.02, stock: 3,  rating: 4.0, available: true,  image: '/images/laptops/Product3.jpg' },
  { name: 'Asus Lite 31',         category: 'Laptops & PCs', brand: 'Asus',        price: 1960.94, stock: 7,  rating: 4.1, available: true,  image: '/images/laptops/Product4.jpg' },
  { name: 'Acer Mini 75',         category: 'Laptops & PCs', brand: 'Acer',        price: 161.93,  stock: 20, rating: 3.8, available: true,  image: '/images/laptops/product5.jpeg' },
  { name: 'Razer Elite 48',       category: 'Laptops & PCs', brand: 'Razer',       price: 2815.55, stock: 5,  rating: 4.6, available: true,  image: '/images/laptops/Product6.jpg' },
  { name: 'Acer Advanced 62',     category: 'Laptops & PCs', brand: 'Acer',        price: 540.65,  stock: 14, rating: 4.0, available: true,  image: '/images/laptops/Product7.jpg' },
  { name: 'MSI Lite 84',          category: 'Laptops & PCs', brand: 'MSI',         price: 1909.42, stock: 6,  rating: 4.3, available: true,  image: '/images/laptops/Product8.jpg' },
  { name: 'Dell Mini 82',         category: 'Laptops & PCs', brand: 'Dell',        price: 349.16,  stock: 10, rating: 4.1, available: true,  image: '/images/laptops/Product9.jpg' },
  { name: 'HP Air 53',            category: 'Laptops & PCs', brand: 'HP',          price: 2226.16, stock: 4,  rating: 4.4, available: true,  image: '/images/laptops/Product10.jpg' },
  { name: 'MSI Max 41',           category: 'Laptops & PCs', brand: 'MSI',         price: 2525.47, stock: 3,  rating: 4.5, available: true,  image: '/images/laptops/Product11.jpg' },
  { name: 'Razer Air 88',         category: 'Laptops & PCs', brand: 'Razer',       price: 1837.83, stock: 9,  rating: 4.3, available: true,  image: '/images/laptops/Product12.jpg' },
  { name: 'HP Air 10',            category: 'Laptops & PCs', brand: 'HP',          price: 2898.79, stock: 2,  rating: 4.6, available: true,  image: '/images/laptops/Product13.jpg' },
  { name: 'Oppo Elite 19',        category: 'Smartphones',   brand: 'Oppo',        price: 981.51,  stock: 15, rating: 4.3, available: true,  image: '/images/smartphones/Product1.jpg' },
  { name: 'Apple Max 93',         category: 'Smartphones',   brand: 'Apple',       price: 2935.31, stock: 6,  rating: 4.8, available: true,  image: '/images/smartphones/Product2.jpg' },
  { name: 'Sony Air 86',          category: 'Smartphones',   brand: 'Sony',        price: 1593.86, stock: 2,  rating: 4.1, available: true,  image: '/images/smartphones/Product3.jpg' },
  { name: 'Google Max 38',        category: 'Smartphones',   brand: 'Google',      price: 2912.02, stock: 8,  rating: 4.5, available: true,  image: '/images/smartphones/Product4.jpg' },
  { name: 'OnePlus Mini 93',      category: 'Smartphones',   brand: 'OnePlus',     price: 1009.82, stock: 11, rating: 4.2, available: true,  image: '/images/smartphones/Product5.jpg' },
  { name: 'Google Elite 12',      category: 'Smartphones',   brand: 'Google',      price: 1254.22, stock: 7,  rating: 4.4, available: true,  image: '/images/smartphones/Product6.jpg' },
  { name: 'Xiaomi Ultra 15',      category: 'Smartphones',   brand: 'Xiaomi',      price: 2794.88, stock: 4,  rating: 4.6, available: true,  image: '/images/smartphones/Product7.jpg' },
  { name: 'Sony Max 14',          category: 'Smartphones',   brand: 'Sony',        price: 734.05,  stock: 13, rating: 4.0, available: true,  image: '/images/smartphones/Product8.jpg' },
  { name: 'Vivo Ultra 61',        category: 'Smartphones',   brand: 'Vivo',        price: 1644.95, stock: 9,  rating: 4.2, available: true,  image: '/images/smartphones/Product9.jpg' },
  { name: 'Xiaomi Max 16',        category: 'Smartphones',   brand: 'Xiaomi',      price: 1851.71, stock: 5,  rating: 4.3, available: true,  image: '/images/smartphones/Product10.jpg' },
  { name: 'Xiaomi Pro 28',        category: 'Smartphones',   brand: 'Xiaomi',      price: 2813.73, stock: 3,  rating: 4.7, available: true,  image: '/images/smartphones/Product11.jpg' },
  { name: 'Sony Max 13',          category: 'Smartphones',   brand: 'Sony',        price: 1992.27, stock: 10, rating: 4.4, available: true,  image: '/images/smartphones/Product12.jpg' },
  { name: 'Xiaomi Premium 80',    category: 'Smartphones',   brand: 'Xiaomi',      price: 1344.28, stock: 6,  rating: 4.1, available: true,  image: '/images/smartphones/Product13.jpg' },
  { name: 'Jabra Mini 20',        category: 'Audio',         brand: 'Jabra',       price: 1589.01, stock: 9,  rating: 4.4, available: true,  image: '/images/audio/Product1.jpg' },
  { name: 'Apple Max 63',         category: 'Audio',         brand: 'Apple',       price: 1503.12, stock: 14, rating: 4.5, available: true,  image: '/images/audio/Product2.jpg' },
  { name: 'Beats Lite 30',        category: 'Audio',         brand: 'Beats',       price: 1652.18, stock: 7,  rating: 4.2, available: true,  image: '/images/audio/Product3.jpg' },
  { name: 'Skullcandy Pro 83',    category: 'Audio',         brand: 'Skullcandy',  price: 1867.33, stock: 1,  rating: 3.9, available: true,  image: '/images/audio/Product4.jpg' },
  { name: 'Sennheiser Lite 20',   category: 'Audio',         brand: 'Sennheiser',  price: 1835.78, stock: 5,  rating: 4.3, available: true,  image: '/images/audio/Product5.jpg' },
  { name: 'Sony Ultra 69',        category: 'Audio',         brand: 'Sony',        price: 1605.36, stock: 8,  rating: 4.4, available: true,  image: '/images/audio/Product6.jpg' },
  { name: 'Sennheiser Pro 75',    category: 'Audio',         brand: 'Sennheiser',  price: 867.18,  stock: 12, rating: 4.1, available: true,  image: '/images/audio/Product7.jpg' },
  { name: 'Bose Pro 78',          category: 'Audio',         brand: 'Bose',        price: 2800.25, stock: 7,  rating: 4.7, available: true,  image: '/images/audio/Product8.jpg' },
  { name: 'Jabra Ultra 44',       category: 'Audio',         brand: 'Jabra',       price: 1120.50, stock: 10, rating: 4.3, available: true,  image: '/images/audio/Product9.jpg' },
  { name: 'Beats Max 55',         category: 'Audio',         brand: 'Beats',       price: 980.00,  stock: 6,  rating: 4.2, available: true,  image: '/images/audio/Product10.jpg' },
  { name: 'Sony Elite 32',        category: 'Audio',         brand: 'Sony',        price: 1450.75, stock: 4,  rating: 4.4, available: true,  image: '/images/audio/Product11.jpg' },
  { name: 'Bose Air 21',          category: 'Audio',         brand: 'Bose',        price: 2100.00, stock: 3,  rating: 4.6, available: true,  image: '/images/audio/Product12.jpg' },
  { name: 'Sennheiser Max 90',    category: 'Audio',         brand: 'Sennheiser',  price: 1750.00, stock: 9,  rating: 4.5, available: true,  image: '/images/audio/Product13.jpg' },
  { name: 'Apple Watch Pro 1',    category: 'Wearables',     brand: 'Apple',       price: 799.99,  stock: 11, rating: 4.6, available: true,  image: '/images/wearables/Product1.jpg' },
  { name: 'Samsung Band 2',       category: 'Wearables',     brand: 'Samsung',     price: 249.99,  stock: 18, rating: 4.0, available: true,  image: '/images/wearables/Product2.jpg' },
  { name: 'Fitbit Ultra 3',       category: 'Wearables',     brand: 'Fitbit',      price: 349.99,  stock: 18, rating: 4.0, available: true,  image: '/images/wearables/Product3.jpg' },
  { name: 'Garmin Elite 4',       category: 'Wearables',     brand: 'Garmin',      price: 599.99,  stock: 4,  rating: 4.2, available: true,  image: '/images/wearables/Product4.jpg' },
  { name: 'Apple Watch SE 5',     category: 'Wearables',     brand: 'Apple',       price: 499.99,  stock: 8,  rating: 4.4, available: true,  image: '/images/wearables/Product5.jpg' },
  { name: 'Samsung Watch 6',      category: 'Wearables',     brand: 'Samsung',     price: 399.99,  stock: 12, rating: 4.3, available: true,  image: '/images/wearables/Product6.jpg' },
  { name: 'Fitbit Charge 7',      category: 'Wearables',     brand: 'Fitbit',      price: 179.99,  stock: 20, rating: 4.1, available: true,  image: '/images/wearables/Product7.jpg' },
  { name: 'Garmin Fenix 8',       category: 'Wearables',     brand: 'Garmin',      price: 899.99,  stock: 3,  rating: 4.7, available: true,  image: '/images/wearables/Product8.jpg' },
  { name: 'Apple Watch Ultra 9',  category: 'Wearables',     brand: 'Apple',       price: 999.99,  stock: 5,  rating: 4.8, available: true,  image: '/images/wearables/Product9.jpg' },
  { name: 'Samsung Gear 10',      category: 'Wearables',     brand: 'Samsung',     price: 299.99,  stock: 15, rating: 4.0, available: true,  image: '/images/wearables/Product10.jpg' },
  { name: 'Fitbit Sense 11',      category: 'Wearables',     brand: 'Fitbit',      price: 279.99,  stock: 16, rating: 4.2, available: true,  image: '/images/wearables/Product11.jpg' },
  { name: 'Garmin Venu 12',       category: 'Wearables',     brand: 'Garmin',      price: 449.99,  stock: 7,  rating: 4.3, available: true,  image: '/images/wearables/Product12.jpg' },
  { name: 'Apple Band 13',        category: 'Wearables',     brand: 'Apple',       price: 149.99,  stock: 22, rating: 3.9, available: true,  image: '/images/wearables/Product13.jpg' },
  { name: 'Canon EOS R1',         category: 'Cameras',       brand: 'Canon',       price: 2499.99, stock: 5,  rating: 4.9, available: true,  image: '/images/cameras/Product1.jpg' },
  { name: 'Sony Alpha A2',        category: 'Cameras',       brand: 'Sony',        price: 1999.99, stock: 0,  rating: 4.5, available: false, image: '/images/cameras/Product2.jpg' },
  { name: 'Nikon Z9 3',           category: 'Cameras',       brand: 'Nikon',       price: 3499.99, stock: 3,  rating: 4.8, available: true,  image: '/images/cameras/Product3.jpg' },
  { name: 'Canon PowerShot 4',    category: 'Cameras',       brand: 'Canon',       price: 599.99,  stock: 10, rating: 4.2, available: true,  image: '/images/cameras/Product4.jpg' },
  { name: 'Sony ZV-E5',           category: 'Cameras',       brand: 'Sony',        price: 999.99,  stock: 8,  rating: 4.4, available: true,  image: '/images/cameras/Product5.jpg' },
  { name: 'Nikon D850 6',         category: 'Cameras',       brand: 'Nikon',       price: 2799.99, stock: 2,  rating: 4.7, available: true,  image: '/images/cameras/Product6.jpg' },
  { name: 'Canon M50 7',          category: 'Cameras',       brand: 'Canon',       price: 849.99,  stock: 6,  rating: 4.3, available: true,  image: '/images/cameras/Product7.jpg' },
  { name: 'Sony A7 IV 8',         category: 'Cameras',       brand: 'Sony',        price: 2499.99, stock: 4,  rating: 4.6, available: true,  image: '/images/cameras/Product8.jpg' },
  { name: 'Nikon Z6 9',           category: 'Cameras',       brand: 'Nikon',       price: 1999.99, stock: 7,  rating: 4.5, available: true,  image: '/images/cameras/Product9.jpg' },
  { name: 'Canon R6 10',          category: 'Cameras',       brand: 'Canon',       price: 2299.99, stock: 3,  rating: 4.6, available: true,  image: '/images/cameras/Product10.jpg' },
  { name: 'Sony A6400 11',        category: 'Cameras',       brand: 'Sony',        price: 899.99,  stock: 9,  rating: 4.3, available: true,  image: '/images/cameras/Product11.jpg' },
  { name: 'Nikon Z50 12',         category: 'Cameras',       brand: 'Nikon',       price: 799.99,  stock: 11, rating: 4.2, available: true,  image: '/images/cameras/Product12.jpg' },
  { name: 'Canon R50 13',         category: 'Cameras',       brand: 'Canon',       price: 679.99,  stock: 14, rating: 4.1, available: true,  image: '/images/cameras/Product13.jpg' },
];

function getProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STOCK_KEY);
    if (raw) {
      const parsed: Product[] = JSON.parse(raw);
      if (parsed.length < SEED_PRODUCTS.length) {
        const seeded = SEED_PRODUCTS.map(p => ({ ...p, id: uuid() }));
        localStorage.setItem(STOCK_KEY, JSON.stringify(seeded));
        return seeded;
      }
      return parsed;
    }
  } catch { /* fall through */ }
  const seeded = SEED_PRODUCTS.map(p => ({ ...p, id: uuid() }));
  localStorage.setItem(STOCK_KEY, JSON.stringify(seeded));
  return seeded;
}
function saveProducts(products: Product[]) { localStorage.setItem(STOCK_KEY, JSON.stringify(products)); }

function computeKPIs(products: Product[]) {
  const total = products.length;
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const outOfStock = products.filter(p => p.stock === 0).length;
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0);
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5);
  return { total, totalStock, outOfStock, totalValue, lowStock };
}

const CATS   = ['Laptops & PCs', 'Smartphones', 'Audio', 'Wearables', 'Cameras'];
const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed'];

// CHARTS


function DashboardCharts({ products }: { products: Product[] }) {
  const barRef    = useRef<HTMLCanvasElement>(null);
  const doughRef  = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const barInst   = useRef<Chart<any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doughInst = useRef<Chart<any> | null>(null);

  useEffect(() => {
    const perCatCount = CATS.map(c => products.filter(p => p.category === c).length);
    const perCatStock = CATS.map(c => products.filter(p => p.category === c).reduce((s, p) => s + p.stock, 0));
    if (barRef.current) {
      barInst.current?.destroy();
      barInst.current = new Chart(barRef.current, {
        type: 'bar',
        data: { labels: CATS, datasets: [{ label: 'Products', data: perCatCount, backgroundColor: COLORS, borderRadius: 6, borderSkipped: false as const }] },
        options: { responsive: true, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0f172a', padding: 10, cornerRadius: 8 } }, scales: { y: { beginAtZero: true, ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: '#f1f5f9' } }, x: { ticks: { color: '#64748b', font: { size: 11 } }, grid: { display: false } } } },
      });
    }
    if (doughRef.current) {
      doughInst.current?.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      doughInst.current = new Chart(doughRef.current, {
        type: 'doughnut',
        data: { labels: CATS, datasets: [{ data: perCatStock, backgroundColor: COLORS, borderWidth: 3, borderColor: '#fff', hoverOffset: 6 }] },
        options: { responsive: true, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { padding: 14, font: { size: 11 }, color: '#334155', usePointStyle: true, pointStyleWidth: 8 } }, tooltip: { backgroundColor: '#0f172a', padding: 10, cornerRadius: 8 } } },
      } as any);
    }
    return () => { barInst.current?.destroy(); doughInst.current?.destroy(); };
  }, [products]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/[0.04]">
        <div className="flex items-center mb-5">
          <h3 className="m-0 text-base font-bold text-slate-900 flex items-center gap-2">
            <i className="fas fa-chart-bar text-blue-600"></i> Products by Category
          </h3>
        </div>
        <canvas ref={barRef} aria-label="Products per category" className="max-h-[280px]"></canvas>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/[0.04]">
        <div className="flex items-center mb-5">
          <h3 className="m-0 text-base font-bold text-slate-900 flex items-center gap-2">
            <i className="fas fa-chart-pie text-purple-600"></i> Stock Distribution
          </h3>
        </div>
        <canvas ref={doughRef} aria-label="Stock units per category" className="max-h-[280px]"></canvas>
      </div>
    </div>
  );
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">Out of Stock</span>;
  if (stock <= 5)  return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200"><i className="fas fa-exclamation-triangle"></i> {stock} left</span>;
  return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">{stock} in stock</span>;
}


type AdminView = 'home' | 'stock' | 'stockForm' | 'cart';
const PAGE_SIZE = 10;

function AdminShell() {
  const session = { username: 'Admin', email: 'admin@techhaven.com' };
  const [view, setView]               = useState<AdminView>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts]       = useState<Product[]>(getProducts);
  const [notification, setNotification] = useState('');
  const [searchQ, setSearchQ]         = useState('');
  const [catFilter, setCatFilter]     = useState('');
  const [page, setPage]               = useState(1);
  const [editId, setEditId]           = useState<string | null>(null);
  const [fName, setFName]             = useState('');
  const [fCat, setFCat]               = useState('');
  const [fBrand, setFBrand]           = useState('');
  const [fPrice, setFPrice]           = useState('');
  const [fStock, setFStock]           = useState('');
  const [fRating, setFRating]         = useState('');
  const [fImage, setFImage]           = useState('');
  const [fAvail, setFAvail]           = useState(true);
  const [formError, setFormError]     = useState('');

  const navigate = (v: AdminView) => { setView(v); setSidebarOpen(false); };
  const showNotif = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(''), 4000); };

  const openAddForm = () => {
    setEditId(null); setFName(''); setFCat(''); setFBrand('');
    setFPrice(''); setFStock(''); setFRating(''); setFImage(''); setFAvail(true); setFormError('');
    navigate('stockForm');
  };
  const openEditForm = (p: Product) => {
    setEditId(p.id); setFName(p.name); setFCat(p.category); setFBrand(p.brand);
    setFPrice(String(p.price)); setFStock(String(p.stock)); setFRating(String(p.rating));
    setFImage(p.image); setFAvail(p.available); setFormError('');
    navigate('stockForm');
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fName.trim()) { setFormError('Product name is required.'); return; }
    if (!fCat)         { setFormError('Category is required.'); return; }
    if (!fBrand.trim()){ setFormError('Brand is required.'); return; }
    if (!fPrice)       { setFormError('Price is required.'); return; }
    if (!fStock)       { setFormError('Stock quantity is required.'); return; }
    const updated = [...products];
    if (editId) {
      const idx = updated.findIndex(p => p.id === editId);
      if (idx > -1) updated[idx] = { id: editId, name: fName.trim(), category: fCat, brand: fBrand.trim(), price: parseFloat(fPrice), stock: parseInt(fStock), rating: parseFloat(fRating) || 0, available: fAvail, image: fImage.trim() };
    } else {
      updated.push({ id: uuid(), name: fName.trim(), category: fCat, brand: fBrand.trim(), price: parseFloat(fPrice), stock: parseInt(fStock), rating: parseFloat(fRating) || 0, available: fAvail, image: fImage.trim() });
    }
    saveProducts(updated); setProducts(updated);
    showNotif(editId ? 'Product updated successfully.' : 'Product added successfully.');
    navigate('stock');
  };
  const handleDelete = (id: string, name: string) => {
    if (!window.confirm('Delete "' + name + '"?')) return;
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated); setProducts(updated); showNotif('Product deleted.');
  };

  const filtered = useMemo(() => {
    return products.filter(p => {
      const q = searchQ.toLowerCase();
      if (q && !p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
      if (catFilter && p.category !== catFilter) return false;
      return true;
    });
  }, [products, searchQ, catFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const kpi = computeKPIs(products);
  const titles: Record<AdminView, string> = { home: 'Dashboard', stock: 'Stock Management', stockForm: editId ? 'Edit Product' : 'Add Product', cart: 'Cart View' };

  const sidebarLinkCls = (active: boolean) =>
    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl mb-0.5 font-medium text-sm no-underline transition-all duration-200 ' +
    (active ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/40' : 'text-white/65 hover:bg-white/[0.09] hover:text-white hover:translate-x-0.5');

  const inputCls = 'w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition-colors duration-200';

  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[999] lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={"w-[260px] bg-gradient-to-b from-slate-900 to-slate-800 fixed top-0 left-0 h-screen overflow-y-auto z-[1000] flex flex-col shadow-xl transition-transform duration-300 " + (sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}
        aria-label="Admin navigation"
      >
        <div className="px-5 py-6 border-b border-white/[0.08] flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-extrabold text-base shadow-lg shadow-blue-600/40 flex-shrink-0">TH</div>
          <div>
            <p className="text-white font-bold text-[1.1rem] m-0 leading-tight">TechHaven</p>
            <p className="text-white/40 text-[0.65rem] font-semibold uppercase tracking-widest m-0">Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-2">
          <span className="block px-3.5 pt-4 pb-1.5 text-[0.65rem] font-bold uppercase tracking-[1.4px] text-white/35 pointer-events-none">Main</span>
          <a href="#" className={sidebarLinkCls(view === 'home')} onClick={e => { e.preventDefault(); navigate('home'); }}><i className="fas fa-tachometer-alt w-[18px] text-center text-[0.95rem]"></i> Dashboard</a>
          <span className="block px-3.5 pt-4 pb-1.5 text-[0.65rem] font-bold uppercase tracking-[1.4px] text-white/35 pointer-events-none">Inventory</span>
          <a href="#" className={sidebarLinkCls(view === 'stock')} onClick={e => { e.preventDefault(); navigate('stock'); }}><i className="fas fa-boxes w-[18px] text-center text-[0.95rem]"></i> All Products</a>
          <a href="#" className={sidebarLinkCls(view === 'stockForm' && !editId)} onClick={e => { e.preventDefault(); openAddForm(); }}><i className="fas fa-plus-circle w-[18px] text-center text-[0.95rem]"></i> Add Product</a>
          <span className="block px-3.5 pt-4 pb-1.5 text-[0.65rem] font-bold uppercase tracking-[1.4px] text-white/35 pointer-events-none">Store</span>
          <a href="#" className={sidebarLinkCls(view === 'cart')} onClick={e => { e.preventDefault(); navigate('cart'); }}><i className="fas fa-shopping-cart w-[18px] text-center text-[0.95rem]"></i> Cart View</a>
          <a href="/shop" className={sidebarLinkCls(false)}><i className="fas fa-store w-[18px] text-center text-[0.95rem]"></i> Visit Store</a>
          <a href="/" className={sidebarLinkCls(false)}><i className="fas fa-home w-[18px] text-center text-[0.95rem]"></i> Homepage</a>
        </nav>
        <div className="px-3 py-4 border-t border-white/[0.08]">
          <a href="/" className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-red-500/[0.12] text-red-300 border border-red-500/20 rounded-xl text-sm font-medium no-underline hover:bg-red-500/[0.22] hover:text-red-200 transition-all duration-200">
            <i className="fas fa-home"></i> Back to Store
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-[260px] flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <div className="bg-white border-b border-[#e8edf2] px-8 h-[68px] flex justify-between items-center sticky top-0 z-[100] shadow-sm">
          <div className="flex items-center gap-4">
            <button type="button" className="lg:hidden w-[38px] h-[38px] bg-bg-main border border-slate-200 rounded-xl text-base text-slate-600 flex items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200" aria-label="Toggle sidebar" onClick={() => setSidebarOpen(o => !o)}>
              <i className="fas fa-bars"></i>
            </button>
            <h2 className="m-0 text-[1.35rem] font-bold text-slate-900 tracking-tight">{titles[view]}</h2>
          </div>
          <div className="flex items-center gap-3">
            <a href="/shop" className="w-[38px] h-[38px] rounded-xl bg-bg-main border border-slate-200 text-slate-500 flex items-center justify-center no-underline hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200" title="Visit Store">
              <i className="fas fa-store text-[0.95rem]"></i>
            </a>
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-bg-main border border-slate-200 rounded-full">
              <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                {session.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-slate-900">{session.username}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-7 lg:p-8">

          {/* HOME VIEW */}
          {view === 'home' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-800 to-purple-700 rounded-2xl px-8 py-7 mb-7 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="text-white m-0 mb-1.5 text-[1.4rem] font-bold">Welcome back, {session.username}</h2>
                  <p className="text-white/75 m-0 text-sm">Here is what is happening with your inventory today.</p>
                </div>
                <a href="#" className="flex items-center gap-2 bg-white/15 text-white border border-white/25 px-5 py-2.5 rounded-xl font-semibold text-sm no-underline hover:bg-white/25 transition-all duration-200" onClick={e => { e.preventDefault(); openAddForm(); }}>
                  <i className="fas fa-plus"></i> Add New Product
                </a>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
                {[
                  { color: 'blue',  icon: 'fa-box-open',    value: kpi.total,                              label: 'Total Products',   topGrad: 'from-blue-600 to-blue-400',   iconBg: 'bg-blue-50',   iconColor: 'text-blue-600' },
                  { color: 'green', icon: 'fa-cubes',        value: kpi.totalStock.toLocaleString(),        label: 'Stock Units',      topGrad: 'from-green-600 to-green-400', iconBg: 'bg-green-50',  iconColor: 'text-green-600' },
                  { color: 'red',   icon: 'fa-times-circle', value: kpi.outOfStock,                         label: 'Out of Stock',     topGrad: 'from-red-600 to-red-400',     iconBg: 'bg-red-50',    iconColor: 'text-red-600' },
                  { color: 'amber', icon: 'fa-dollar-sign',  value: '$' + (kpi.totalValue / 1000).toFixed(1) + 'K', label: 'Inventory Value', topGrad: 'from-amber-600 to-amber-400', iconBg: 'bg-amber-50',  iconColor: 'text-amber-600' },
                ].map(card => (
                  <div key={card.label} className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm border border-black/[0.04] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 relative overflow-hidden">
                    <div className={'absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r ' + card.topGrad}></div>
                    <div className={'w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ' + card.iconBg + ' ' + card.iconColor}>
                      <i className={'fas ' + card.icon}></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-[1.9rem] font-extrabold text-slate-900 m-0 mb-1 leading-none tracking-tight">{card.value}</p>
                      <p className="text-xs text-slate-400 m-0 font-medium uppercase tracking-wide">{card.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <DashboardCharts products={products} />

              {/* Quick Actions */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="m-0 text-[1.1rem] font-bold text-slate-900 flex items-center gap-2"><i className="fas fa-bolt text-amber-500"></i> Quick Actions</h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
                {[
                  { icon: 'fa-boxes',         label: 'View All Stock',   onClick: (e: React.MouseEvent) => { e.preventDefault(); navigate('stock'); } },
                  { icon: 'fa-plus-circle',   label: 'Add New Product',  onClick: (e: React.MouseEvent) => { e.preventDefault(); openAddForm(); } },
                  { icon: 'fa-shopping-cart', label: 'View Cart',        onClick: (e: React.MouseEvent) => { e.preventDefault(); navigate('cart'); } },
                  { icon: 'fa-store',         label: 'Visit Store',      href: '/shop' },
                ].map(action => (
                  <a key={action.label} href={action.href || '#'} className="bg-white rounded-2xl py-6 px-5 text-center no-underline flex flex-col items-center gap-3 shadow-sm border border-black/[0.04] relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition-all duration-200" onClick={action.onClick}>
                    <i className={'fas ' + action.icon + ' text-[1.8rem] text-blue-600 relative z-10 group-hover:text-white transition-colors duration-200'}></i>
                    <span className="font-semibold text-slate-900 text-sm relative z-10 group-hover:text-white transition-colors duration-200">{action.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </a>
                ))}
              </div>

              {/* Low Stock Alerts */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="m-0 text-[1.1rem] font-bold text-slate-900 flex items-center gap-2"><i className="fas fa-exclamation-triangle text-amber-500"></i> Low Stock Alerts</h3>
                <a href="#" className="text-sm text-blue-600 font-medium no-underline hover:underline hover:text-blue-700" onClick={e => { e.preventDefault(); navigate('stock'); }}>View all</a>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04]">
                {kpi.lowStock.length === 0 ? (
                  <div className="py-12 px-5 text-center text-slate-400"><strong className="text-slate-600">All good!</strong> No products are running low.</div>
                ) : (
                  <table className="w-full border-collapse">
                    <thead className="bg-bg-main border-b border-[#e8edf2]">
                      <tr>
                        {['Product','Category','Brand','Stock','Action'].map(h => (
                          <th key={h} className="px-[18px] py-3 text-left font-semibold text-slate-500 text-xs uppercase tracking-[0.6px]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {kpi.lowStock.map(p => (
                        <tr key={p.id} className="border-b border-slate-50 last:border-b-0 hover:bg-bg-main">
                          <td className="px-[18px] py-3.5 text-sm font-semibold text-slate-800">{p.name}</td>
                          <td className="px-[18px] py-3.5"><span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">{p.category}</span></td>
                          <td className="px-[18px] py-3.5 text-sm text-slate-600">{p.brand}</td>
                          <td className="px-[18px] py-3.5"><StockBadge stock={p.stock} /></td>
                          <td className="px-[18px] py-3.5"><a href="#" className="text-sm text-blue-600 font-medium no-underline hover:text-blue-700" onClick={e => { e.preventDefault(); openEditForm(p); }}><i className="fas fa-edit mr-1"></i>Update</a></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* STOCK LIST VIEW */}
          {view === 'stock' && (
            <div>
              {notification && (
                <div className="flex items-center gap-2.5 bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
                  <i className="fas fa-check-circle"></i><span>{notification}</span>
                </div>
              )}
              <div className="flex gap-3 items-center mb-5 flex-wrap">
                <input
                  type="text"
                  placeholder="Search by name or brand..."
                  value={searchQ}
                  onChange={e => { setSearchQ(e.target.value); setPage(1); }}
                  className="flex-1 min-w-[200px] px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition-colors duration-200"
                />
                <select
                  value={catFilter}
                  onChange={e => { setCatFilter(e.target.value); setPage(1); }}
                  className="w-auto px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition-colors duration-200"
                >
                  <option value="">All Categories</option>
                  <option>Laptops &amp; PCs</option>
                  <option>Smartphones</option>
                  <option>Audio</option>
                  <option>Wearables</option>
                  <option>Cameras</option>
                </select>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        {['Product','Category','Brand','Price','Stock','Available','Actions'].map(h => (
                          <th key={h} className="px-4 py-3.5 text-left font-semibold text-xs text-slate-500 bg-bg-main border-b border-[#e8edf2] uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageItems.length === 0 ? (
                        <tr><td colSpan={7} className="text-center py-10 text-slate-400">No products found.</td></tr>
                      ) : pageItems.map(p => (
                        <tr key={p.id} className="border-b border-slate-50 last:border-b-0 hover:bg-bg-main">
                          <td className="px-4 py-3 text-sm font-semibold text-slate-800">{p.name}</td>
                          <td className="px-4 py-3"><span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">{p.category}</span></td>
                          <td className="px-4 py-3 text-sm text-slate-600">{p.brand}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">${p.price.toFixed(2)}</td>
                          <td className="px-4 py-3"><StockBadge stock={p.stock} /></td>
                          <td className={"px-4 py-3 text-sm font-semibold " + (p.available ? 'text-green-600' : 'text-red-500')}>{p.available ? 'Yes' : 'No'}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button type="button" className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors duration-200 cursor-pointer" onClick={() => openEditForm(p)}>
                                <i className="fas fa-edit"></i> Edit
                              </button>
                              <button type="button" className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors duration-200 cursor-pointer" onClick={() => handleDelete(p.id, p.name)}>
                                <i className="fas fa-trash"></i> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center px-4 py-3 border-t border-slate-100 flex-wrap gap-3">
                  <span className="text-sm text-slate-500">
                    Showing {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}
                  </span>
                  <div className="flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 text-sm disabled:opacity-40 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed" disabled={page===1} onClick={() => setPage(p => p-1)}>
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i+1).map(n => (
                      <button key={n} className={"w-8 h-8 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors duration-200 cursor-pointer " + (n===page ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200')} onClick={() => setPage(n)}>{n}</button>
                    ))}
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 text-sm disabled:opacity-40 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed" disabled={page===totalPages} onClick={() => setPage(p => p+1)}>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STOCK FORM VIEW */}
          {view === 'stockForm' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/[0.04] max-w-3xl">
              {formError && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
                  <i className="fas fa-exclamation-circle"></i><span>{formError}</span>
                </div>
              )}
              <form onSubmit={handleSave}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-900">Product Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g. Apple MacBook Pro 14" value={fName} onChange={e => setFName(e.target.value)} required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-900">Category <span className="text-red-500">*</span></label>
                    <select value={fCat} onChange={e => setFCat(e.target.value)} required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition-colors duration-200">
                      <option value="">Select category...</option>
                      <option>Laptops &amp; PCs</option>
                      <option>Smartphones</option>
                      <option>Audio</option>
                      <option>Wearables</option>
                      <option>Cameras</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-900">Brand <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g. Apple" value={fBrand} onChange={e => setFBrand(e.target.value)} required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-900">Price ($) <span className="text-red-500">*</span></label>
                    <input type="number" placeholder="0.00" min={0} step={0.01} value={fPrice} onChange={e => setFPrice(e.target.value)} required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-900">Stock Quantity <span className="text-red-500">*</span></label>
                    <input type="number" placeholder="0" min={0} step={1} value={fStock} onChange={e => setFStock(e.target.value)} required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-900">Rating (0–5)</label>
                    <input type="number" placeholder="4.5" min={0} max={5} step={0.1} value={fRating} onChange={e => setFRating(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-900">Image Path</label>
                    <input type="text" placeholder="e.g. /images/laptops/Product1.jpg" value={fImage} onChange={e => setFImage(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                      <input type="checkbox" id="f-available" checked={fAvail} onChange={e => setFAvail(e.target.checked)} className="accent-blue-600" />
                      Available for purchase
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap mt-6">
                  <button type="submit"
                    className="flex items-center gap-2 px-7 py-3 bg-blue-600 text-white font-semibold rounded-xl border-none cursor-pointer hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200">
                    <i className="fas fa-save"></i> Save Product
                  </button>
                  <button type="button"
                    className="flex items-center gap-2 px-7 py-3 bg-transparent border-2 border-blue-600 text-blue-600 font-semibold rounded-xl cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-200"
                    onClick={() => navigate('stock')}>
                    <i className="fas fa-times"></i> Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* CART VIEW */}
          {view === 'cart' && (
            <div>
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
                <i className="fas fa-eye"></i> Read-only — customer cart snapshot
              </div>
              {(() => {
                let items: { name: string; price: number; qty: number; image: string; category: string }[] = [];
                try { items = JSON.parse(localStorage.getItem('cartItems') || '[]'); } catch { items = []; }
                if (items.length === 0) return (
                  <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                    <i className="fas fa-shopping-cart text-5xl text-slate-300"></i>
                    <h3 className="text-2xl font-semibold text-slate-900 m-0">Cart is empty</h3>
                    <p className="text-slate-500 m-0">No items in the customer cart.</p>
                  </div>
                );
                const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
                return (
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04]">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            {['Product','Category','Unit Price','Qty','Total'].map(h => (
                              <th key={h} className="px-4 py-3.5 text-left font-semibold text-xs text-slate-500 bg-bg-main border-b border-[#e8edf2] uppercase tracking-wide">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, i) => (
                            <tr key={i} className="border-b border-slate-50 last:border-b-0 hover:bg-bg-main">
                              <td className="px-4 py-3 text-sm font-semibold text-slate-800">{item.name}</td>
                              <td className="px-4 py-3"><span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">{item.category}</span></td>
                              <td className="px-4 py-3 text-sm text-slate-700">${item.price.toFixed(2)}</td>
                              <td className="px-4 py-3 text-sm text-slate-700">{item.qty}</td>
                              <td className="px-4 py-3 text-sm font-bold text-slate-900">${(item.price * item.qty).toFixed(2)}</td>
                            </tr>
                          ))}
                          <tr className="bg-slate-50">
                            <td colSpan={4} className="px-4 py-3 text-sm font-bold text-slate-700 text-right">Subtotal</td>
                            <td className="px-4 py-3 text-sm font-bold text-blue-600">${subtotal.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return <AdminShell />;
}

export default Dashboard;
