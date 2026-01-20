import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Upload,
  ArrowLeft,
  ChevronRight,
  Home,
  Store,
  Receipt,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Truck,
  MessageCircle
} from 'lucide-react';

// --- MOCK DATA ---
const PRODUCTS = [
  { id: 1, name: "Beras Pandan Wangi 5kg", category: "Beras & Biji", subcategory: "Beras", price: 68500, originalPrice: 75000, image: "https://images.unsplash.com/photo-1586201327693-86629f7bb1f3?auto=format&fit=crop&q=80&w=600", stock: 50, unit: "sak", trending: true },
  { id: 2, name: "Minyak Goreng Bimoli 2L", category: "Minyak Goreng", subcategory: "Minyak Kelapa", price: 34500, originalPrice: 38000, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600", stock: 100, unit: "pouch", trending: true },
  { id: 3, name: "Gula Pasir Gulaku 1kg", category: "Bumbu Dapur", subcategory: "Gula", price: 16000, originalPrice: 17500, image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=600", stock: 75, unit: "pack", trending: true },
  { id: 4, name: "Telur Ayam Negeri 1kg", category: "Telur & Susu", subcategory: "Telur", price: 28000, originalPrice: 30000, image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=600", stock: 30, unit: "kg", trending: true },
  { id: 5, name: "Garam Meja Refina 250g", category: "Bumbu Dapur", subcategory: "Garam", price: 5000, originalPrice: 6000, image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=600", stock: 200, unit: "pack" },
  { id: 6, name: "Susu UHT Full Cream 1L", category: "Telur & Susu", subcategory: "Susu", price: 18500, originalPrice: 21000, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600", stock: 60, unit: "kotak" },
  { id: 7, name: "Tepung Terigu Segitiga 1kg", category: "Bumbu Dapur", subcategory: "Tepung", price: 12000, originalPrice: 14000, image: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&q=80&w=600", stock: 80, unit: "pack" },
  { id: 8, name: "Sabun Cuci Rinso 800g", category: "Sabun & Cuci", subcategory: "Detergent", price: 24500, originalPrice: 27000, image: "https://images.unsplash.com/photo-1585670149967-b4f4da88cc9f?auto=format&fit=crop&q=80&w=600", stock: 45, unit: "pack" },
  { id: 9, name: "Daging Sapi Sirloin 500g", category: "Daging", subcategory: "Sapi", price: 85000, originalPrice: 95000, image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=600", stock: 20, unit: "pack" },
  { id: 10, name: "Ikan Kembung Segar 1kg", category: "Ikan", subcategory: "Ikan Laut", price: 45000, originalPrice: 50000, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600", stock: 15, unit: "kg" },
];

const PROMO_BANNERS = [
  { id: 1, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800", title: "Diskon Akhir Pekan", subtitle: "Hemat hingga 20%" },
  { id: 2, image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800", title: "Produk Segar Baru", subtitle: "Langsung dari sumbernya" },
];

const CATEGORIES = [
  {
    id: 'beras-biji',
    name: "Beras & Biji",
    icon: "🍚",
    subcategories: ["Beras", "Kacang", "Biji-bijian"]
  },
  {
    id: 'minyak-goreng',
    name: "Minyak Goreng",
    icon: "💧",
    subcategories: ["Minyak Kelapa", "Minyak Sawit"]
  },
  {
    id: 'bumbu-dapur',
    name: "Bumbu Dapur",
    icon: "�️",
    subcategories: ["Gula", "Garam", "Tepung", "Penyedap"]
  },
  {
    id: 'sabun-cuci',
    name: "Sabun & Cuci",
    icon: "�",
    subcategories: ["Detergent", "Pembersih Lantai"]
  },
  {
    id: 'bulk-product',
    name: "Bulk Product",
    icon: "📦",
    subcategories: ["Kartonan"]
  },
  {
    id: 'hb',
    name: "H&B",
    icon: "🧴",
    subcategories: ["Sabun Mandi", "Shampoo"]
  },
  {
    id: 'sauces-spices',
    name: "Sauces & Spices",
    icon: "�",
    subcategories: ["Kecap", "Saus Sambal"]
  },
  {
    id: 'milk-coffee-tea',
    name: "Milk/Coffee/Tea",
    icon: "☕",
    subcategories: ["Susu", "Kopi", "Teh"]
  },
  {
    id: 'drinks',
    name: "Drinks",
    icon: "�",
    subcategories: ["Air Mineral", "Minuman Berasa"]
  },
  {
    id: 'fish',
    name: "Fish",
    icon: "🐟",
    subcategories: ["Ikan Laut", "Ikan Tawar"]
  },
  {
    id: 'meat',
    name: "Meat",
    icon: "🥩",
    subcategories: ["Sapi", "Ayam"]
  },
];

// --- UTILS ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const getNextDays = (daysCount = 5) => {
  const days = [];
  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'short' };

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1); // Start from tomorrow
    days.push({
      value: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('id-ID', options),
      simpleLabel: i === 0 ? 'Besok' : (i === 1 ? 'Lusa' : d.toLocaleDateString('id-ID', { weekday: 'long' }))
    });
  }
  return days;
};

const generateInvoiceId = () => `INV-${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

// --- COMPONENTS ---

// 1. Footer Component (New)
const Footer = () => (
  <footer className="bg-white border-t border-gray-100 pt-16 pb-24 md:pb-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#25a18e] rounded-lg flex items-center justify-center text-white">
              <Store size={16} />
            </div>
            <span className="font-bold text-[#25a18e] text-lg uppercase">Bergas Waras</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            Koperasi yang menyediakan kebutuhan pokok berkualitas dengan harga grosir untuk kesejahteraan anggota.
          </p>
          <div className="flex gap-3">
            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#25a18e] hover:text-white transition"><Facebook size={14} /></button>
            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#25a18e] hover:text-white transition"><Instagram size={14} /></button>
            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#25a18e] hover:text-white transition"><Phone size={14} /></button>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 mb-4">Layanan Pelanggan</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-[#25a18e] cursor-pointer">Cara Pembelian</li>
            <li className="hover:text-[#25a18e] cursor-pointer">Pengiriman</li>
            <li className="hover:text-[#25a18e] cursor-pointer">Metode Pembayaran</li>
            <li className="hover:text-[#25a18e] cursor-pointer">Pengembalian Barang</li>
            <li className="hover:text-[#25a18e] cursor-pointer">Hubungi Kami</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 mb-4">Kategori Populer</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-[#25a18e] cursor-pointer">Beras Premium</li>
            <li className="hover:text-[#25a18e] cursor-pointer">Minyak Goreng</li>
            <li className="hover:text-[#25a18e] cursor-pointer">Gula & Pemanis</li>
            <li className="hover:text-[#25a18e] cursor-pointer">Perlengkapan Bayi</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 mb-4">Kontak Kami</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-[#25a18e] mt-0.5 flex-shrink-0" />
              <span>Jl. Jendral Sudirman No. 123, Semarang, Jawa Tengah</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[#25a18e] flex-shrink-0" />
              <span>0812-3456-7890 (WhatsApp)</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-[#25a18e] flex-shrink-0" />
              <span>cs@bergaswaras.id</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>&copy; 2024 Koperasi Bergas Waras Peduli. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span>Kebijakan Privasi</span>
          <span>Syarat & Ketentuan</span>
        </div>
      </div>
    </div>
  </footer>
);

// 2. Navbar Component (Updated with Sidebar Toggle)
const Navbar = ({ cartCount, onViewChange, currentView, onOpenSidebar }) => (
  <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-20">
        {/* Sidebar Toggle & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSidebar}
            className="p-2 hover:bg-gray-100 rounded-xl transition lg:flex items-center gap-2 group"
          >
            <Menu className="text-gray-600 group-hover:text-[#25a18e]" size={24} />
            <span className="hidden md:block text-sm font-bold text-gray-700">Kategori</span>
          </button>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onViewChange('home')}
          >
            <div className="w-10 h-10 bg-[#25a18e] rounded-xl flex items-center justify-center shadow-lg shadow-[#25a18e]/20">
              <Store className="text-white" size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-gray-800 tracking-tight leading-none">BERGAS</h1>
              <span className="text-[10px] font-bold text-[#25a18e] tracking-widest uppercase">Koperasi Waras</span>
            </div>
          </div>
        </div>

        {/* Search Bar - Responsive */}
        <div className="hidden lg:block flex-1 max-w-md mx-8">
          <div className="relative group">
            <input
              type="text"
              placeholder="Cari beras, minyak, gula..."
              className="w-full bg-gray-50 border-none rounded-2xl py-3 px-6 text-sm focus:ring-2 focus:ring-[#25a18e]/20 transition pr-12"
            />
            <button className="absolute right-4 top-3 text-[#25a18e]">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div
            className="relative cursor-pointer text-gray-600 hover:text-[#25a18e] transition"
            onClick={() => onViewChange('cart')}
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onViewChange('orders')}
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-[#25a18e] group-hover:text-white transition">
              <User size={16} />
            </div>
            <span className="text-sm font-semibold hidden sm:block">Akun Saya</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

// 2.5 Sidebar Component
const Sidebar = ({ isOpen, onClose, categories, onSelectCategory }) => {
  const [expanded, setExpanded] = useState(null);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="fixed top-0 left-0 h-full w-[300px] bg-white z-[70] shadow-2xl flex flex-col animate-slide-right">
        <div className="p-6 bg-[#25a18e] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu size={20} />
            <h2 className="font-bold text-lg">Semua Kategori</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {categories.map((cat) => (
            <div key={cat.id} className="border-b border-gray-50 last:border-0">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => {
                  if (cat.subcategories) {
                    setExpanded(expanded === cat.id ? null : cat.id);
                  } else {
                    onSelectCategory(cat, null);
                    onClose();
                  }
                }}
              >
                <div className="flex items-center">
                  <span className={`text-sm font-bold ${expanded === cat.id ? 'text-[#25a18e]' : 'text-gray-700'}`}>
                    {cat.name}
                  </span>
                </div>
                {cat.subcategories && (
                  <ChevronRight
                    size={18}
                    className={`text-gray-400 transition-transform duration-300 ${expanded === cat.id ? 'rotate-90 text-[#25a18e]' : ''}`}
                  />
                )}
              </div>

              {expanded === cat.id && cat.subcategories && (
                <div className="bg-gray-50/50 py-2">
                  {cat.subcategories.map((sub) => (
                    <div
                      key={sub}
                      className="px-12 py-3 text-sm text-gray-600 hover:text-[#25a18e] hover:bg-white cursor-pointer transition font-medium"
                      onClick={() => {
                        onSelectCategory(cat, sub);
                        onClose();
                      }}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <p className="text-[10px] text-gray-400 font-medium">Jelajahi lebih dari {categories.length} kategori produk</p>
        </div>
      </div>
    </>
  );
};

// 3. Product Card Component (Updated for Detail Navigation)
const ProductCard = ({ product, onAddToCart, onSelectProduct }) => {
  const [qty, setQty] = useState(1);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product, qty);
    setQty(1);
  };

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full relative cursor-pointer"
    >
      <div className="h-48 bg-gray-50 relative overflow-hidden flex-shrink-0">
        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={product.name} />
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md">
            Hemat {discountPercent}%
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-1">{product.category}</p>
        <h3 className="font-bold text-gray-800 mb-1 leading-tight flex-1 text-sm md:text-base line-clamp-2">{product.name}</h3>

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[#25a18e] font-bold text-lg">{formatCurrency(product.price)}</span>
            <span className="text-xs text-gray-400">/{product.unit || 'pcs'}</span>
          </div>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-300 line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>

        {/* Quick Order UI */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            >
              <Minus size={14} />
            </button>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 w-full text-center border-gray-200 rounded-lg py-1 text-sm font-semibold focus:ring-[#25a18e] focus:border-[#25a18e]"
            />
            <button
              onClick={() => setQty(qty + 1)}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="w-full bg-[#25a18e] text-white py-2 rounded-xl font-bold text-sm hover:bg-[#7ae582] transition flex items-center justify-center gap-2 active:scale-95 transform"
          >
            <ShoppingCart size={16} /> Tambah
          </button>
        </div>
      </div>
    </div>
  );
};

// 3.5 Category View Component
const CategoryView = ({ category, subcategory, products, onAddToCart, onSelectProduct, onBack }) => {
  const filteredProducts = products.filter(p => {
    if (subcategory) return p.subcategory === subcategory;
    return p.category === category.name;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-[#25a18e] mb-6 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Kembali ke Beranda
      </button>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
          {subcategory && <p className="text-gray-500 font-medium">Subkategori: <span className="text-[#25a18e]">{subcategory}</span></p>}
        </div>
        <p className="text-sm font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
          {filteredProducts.length} Produk Ditemukan
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
          <Store size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400 font-medium">Belum ada produk di kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 3.6 Product Detail View Component
const ProductDetailView = ({ product, onAddToCart, onBack }) => {
  const [qty, setQty] = useState(1);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-[#25a18e] mb-8 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Kembali
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-50">
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="bg-gray-50 p-8 flex items-center justify-center relative">
            <img src={product.image} className="w-full h-auto max-h-[400px] object-contain rounded-2xl mix-blend-multiply" alt={product.name} />
            {discountPercent > 0 && (
              <div className="absolute top-8 left-8 bg-red-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform -rotate-6">
                Hemat {discountPercent}%
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-8 md:p-12 flex flex-col">
            <div className="mb-6">
              <span className="bg-[#25a18e]/10 text-[#25a18e] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                {product.category} {product.subcategory && `• ${product.subcategory}`}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-black text-[#25a18e]">{formatCurrency(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-300 line-through font-medium">{formatCurrency(product.originalPrice)}</span>
                )}
              </div>
              <p className="text-sm text-gray-400 font-bold">Harga per {product.unit || 'pcs'} • Stok tersedia: {product.stock}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-sm text-gray-800 mb-2">Deskripsi Produk</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Produk pilihan berkualitas tinggi dari Koperasi Bergas. Dijamin asli dan segar.
                Cocok untuk kebutuhan rumah tangga maupun usaha kuliner Anda.
                Belanja lebih hemat dengan harga grosir langsung hanya di Koperasi kami.
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-4 border-2 border-gray-100 rounded-2xl p-2 bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-12 h-12 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-8 text-center text-lg font-black">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-12 h-12 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase font-black text-gray-400 mb-1 ml-1">Subtotal</p>
                  <p className="text-2xl font-black text-gray-800">{formatCurrency(product.price * qty)}</p>
                </div>
              </div>

              <button
                onClick={() => onAddToCart(product, qty)}
                className="w-full bg-[#25a18e] text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-[#7ae582] transition-all shadow-xl shadow-[#25a18e]/30 flex items-center justify-center gap-3 active:scale-95 transform"
              >
                <ShoppingCart size={24} /> Masukkan Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Cart View
const CartView = ({ cart, updateQty, removeFromCart, checkout }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Kosong</h2>
        <p className="text-gray-500 mb-8">Yuk isi kebutuhan dapurmu dengan harga grosir!</p>
        <button onClick={() => checkout('home')} className="bg-[#25a18e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#7ae582] transition">
          Mulai Belanja
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Keranjang Belanja ({cart.length} Item)</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {cart.map((item) => (
          <div key={item.id} className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-50" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-[#25a18e] font-semibold">{formatCurrency(item.price)}</p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2 border rounded-lg p-1">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
                  className="w-12 text-center border-none p-0 text-sm font-bold focus:ring-0"
                />
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-600 p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600 font-medium">Total Tagihan</span>
            <span className="text-2xl font-bold text-[#25a18e]">{formatCurrency(total)}</span>
          </div>
          <button
            onClick={() => checkout('checkout')}
            className="w-full bg-[#25a18e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#7ae582] transition shadow-lg shadow-[#25a18e]/20"
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. Checkout View (Enhanced with Bank Selection)
const CheckoutView = ({ cart, onSubmitOrder, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryDates: [], // Modified
    deliveryTimes: [], // Modified
    notes: '',
    paymentMethod: 'transfer',
    selectedBank: '',
    paymentTerm: 'now'
  });

  const toggleArrayItem = (field, value) => {
    setFormData(prev => {
      const current = prev[field] || [];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
      };
    });
  };

  const availableDates = useMemo(() => getNextDays(7), []);
  const timeSlots = [
    { id: 'pagi', label: 'Pagi', time: '08:00 - 11:00' },
    { id: 'siang', label: 'Siang', time: '13:00 - 16:00' },
    { id: 'sore', label: 'Sore', time: '16:00 - 19:00' },
  ];

  const banks = [
    { id: 'bca', name: 'BCA', acc: '123-456-7890', owner: 'Koperasi Bergas Waras' },
    { id: 'mandiri', name: 'Mandiri', acc: '098-765-4321', owner: 'Koperasi Bergas Waras' },
    { id: 'bri', name: 'BRI', acc: '1122-3344-5566', owner: 'Koperasi Bergas Waras' },
  ];

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.deliveryDates.length === 0 || formData.deliveryTimes.length === 0) {
      alert("Mohon pilih setidaknya satu tanggal dan waktu pengiriman.");
      return;
    }
    if (formData.paymentMethod === 'transfer' && !formData.selectedBank) {
      alert("Mohon pilih bank tujuan transfer.");
      return;
    }
    onSubmitOrder(formData);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 md:py-12">
      <button onClick={onBack} className="group flex items-center text-gray-500 hover:text-[#25a18e] mb-8 font-semibold transition-all">
        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mr-3 group-hover:border-[#25a18e]/30 group-hover:shadow-md transition-all">
          <ArrowLeft size={16} />
        </div>
        Kembali ke Keranjang
      </button>

      <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-8 tracking-tight">Checkout & Pengiriman</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 items-start">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <User size={20} className="text-[#25a18e]" /> Data Penerima
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  required
                  type="text"
                  className="w-full border-gray-200 rounded-lg focus:ring-[#25a18e] focus:border-[#25a18e]"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Budi Santoso"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                <input
                  required
                  type="tel"
                  className="w-full border-gray-200 rounded-lg focus:ring-[#25a18e] focus:border-[#25a18e]"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0812..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea
                  required
                  rows="3"
                  className="w-full border-gray-200 rounded-lg focus:ring-[#25a18e] focus:border-[#25a18e]"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Jalan, RT/RW, Kelurahan..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-[#25a18e]" /> Jadwal & Catatan
            </h3>
            <div className="space-y-6">
              {/* Enhanced Date Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Tanggal Pengiriman (Bisa pilih Lebih dari 1)</label>
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  {availableDates.map(date => (
                    <div
                      key={date.value}
                      onClick={() => toggleArrayItem('deliveryDates', date.value)}
                      className={`min-w-[100px] p-3 rounded-xl border cursor-pointer transition text-center flex-shrink-0
                          ${formData.deliveryDates.includes(date.value) ? 'border-[#25a18e] bg-[#25a18e] text-white shadow-md' : 'border-gray-200 hover:border-[#25a18e] bg-white'}`}
                    >
                      <span className="block text-xs font-semibold opacity-80 uppercase">{date.simpleLabel}</span>
                      <span className="block text-sm font-bold">{date.label.split(',')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slot Selector */}
              <div className="pt-2">
                <label className="block text-sm font-bold text-gray-700 mb-3">Pilih Waktu (Bisa pilih Lebih dari 1)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map(slot => (
                    <div
                      key={slot.id}
                      onClick={() => toggleArrayItem('deliveryTimes', slot.time)}
                      className={`p-2 rounded-lg border cursor-pointer text-center transition
                          ${formData.deliveryTimes.includes(slot.time) ? 'border-[#25a18e] bg-[#25a18e]/10 text-[#25a18e] font-black' : 'border-gray-200 hover:border-[#25a18e] bg-white'}`}
                    >
                      <span className="block text-xs font-bold">{slot.label}</span>
                      <span className="block text-[10px] text-gray-500">{slot.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan (Opsional)</label>
                <input
                  type="text"
                  className="w-full border-gray-200 rounded-lg focus:ring-[#25a18e] focus:border-[#25a18e]"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Misal: Titip di pos satpam"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6 md:space-y-8">
          <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-[#25a18e]" /> Metode Pembayaran
            </h3>

            <div className="space-y-3">
              <label className={`block p-4 border rounded-xl cursor-pointer transition ${formData.paymentMethod === 'transfer' ? 'border-[#25a18e] bg-[#25a18e]/5' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="text-[#25a18e] focus:ring-[#25a18e]"
                  />
                  <div>
                    <span className="font-bold block">Transfer Bank</span>
                    <span className="text-xs text-gray-500">Otomatis tampilkan akun bank pilihan</span>
                  </div>
                </div>
              </label>

              {formData.paymentMethod === 'transfer' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 animate-fade-in px-1">
                  {banks.map(bank => (
                    <div
                      key={bank.id}
                      onClick={() => setFormData({ ...formData, selectedBank: bank.id })}
                      className={`p-2 border rounded-lg text-center cursor-pointer transition text-xs font-bold
                        ${formData.selectedBank === bank.id ? 'border-[#25a18e] bg-[#25a18e] text-white shadow-md' : 'border-gray-100 bg-gray-50 hover:border-[#25a18e]'}`}
                    >
                      {bank.name}
                    </div>
                  ))}
                </div>
              )}

              <label className={`block p-4 border rounded-xl cursor-pointer transition ${formData.paymentMethod === 'manual' ? 'border-[#25a18e] bg-[#25a18e]/5' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="manual"
                    checked={formData.paymentMethod === 'manual'}
                    onChange={e => setFormData({ ...formData, paymentMethod: e.target.value, selectedBank: '' })}
                    className="text-[#25a18e] focus:ring-[#25a18e]"
                  />
                  <div>
                    <span className="font-bold block">Tunai / COD</span>
                    <span className="text-xs text-gray-500">Bayar saat barang sampai</span>
                  </div>
                </div>
              </label>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Jatuh Tempo Pembayaran</label>
                <select
                  className="w-full border-gray-200 rounded-lg focus:ring-[#25a18e] focus:border-[#25a18e]"
                  value={formData.paymentTerm}
                  onChange={e => setFormData({ ...formData, paymentTerm: e.target.value })}
                >
                  <option value="now">Bayar Sekarang / Saat Pengiriman</option>
                  <option value="h1">Tempo H+1 (Besok)</option>
                  <option value="h2">Tempo H+2 (Lusa)</option>
                </select>
                <p className="text-xs text-gray-400 mt-1 italic">* Khusus Anggota Koperasi Terdaftar</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 sm:p-8 rounded-3xl border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">Ringkasan Pesanan</h3>
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.qty}x {item.name}</span>
                  <span className="font-medium">{formatCurrency(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Total Bayar</span>
              <span className="font-bold text-xl text-[#25a18e]">{formatCurrency(total)}</span>
            </div>
            <button
              type="submit"
              className="w-full bg-[#25a18e] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#25a18e]/90 active:scale-[0.98] transition-all shadow-xl shadow-[#25a18e]/20"
            >
              Buat Pesanan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// 6. Invoice/Detail Order View (Updated with Selected Bank)
const InvoiceView = ({ order, onViewChange, onUploadProof }) => {
  if (!order) return null;

  const isOverdue = new Date() > new Date(order.dueDate) && order.status !== 'paid';

  const getStatusLabel = (status) => {
    switch (status) {
      case 'paid': return 'Lunas';
      case 'pending': return 'Menunggu Pembayaran';
      case 'verification': return 'Sedang Diverifikasi';
      default: return status;
    }
  };

  const banks = {
    bca: { name: 'BCA', acc: '123-456-7890', owner: 'Koperasi Bergas Waras' },
    mandiri: { name: 'Mandiri', acc: '098-765-4321', owner: 'Koperasi Bergas Waras' },
    bri: { name: 'BRI', acc: '1122-3344-5566', owner: 'Koperasi Bergas Waras' },
  };

  const selectedBank = banks[order.customer.selectedBank];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden print:shadow-none">
        {/* Header Invoice */}
        <div className="bg-[#25a18e] text-white p-8 relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Invoice</h1>
              <p className="opacity-90">#{order.id}</p>
              <p className="text-sm mt-4 opacity-80">{new Date(order.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="text-right">
              <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase mb-2 ${order.status === 'paid' ? 'bg-white text-[#25a18e]' : 'bg-yellow-400 text-yellow-900'}`}>
                {getStatusLabel(order.status)}
              </div>
              {isOverdue && <div className="text-red-200 text-xs font-bold mt-1">JATUH TEMPO</div>}
            </div>
          </div>
          <div className="absolute -right-10 -bottom-20 opacity-10">
            <Store size={200} />
          </div>
        </div>

        <div className="p-8">
          {/* Info Customer & Payment */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 border-b border-gray-100 pb-8">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ditagihkan Kepada</h3>
              <p className="font-bold text-gray-800 text-lg">{order.customer.name}</p>
              <p className="text-gray-600">{order.customer.phone}</p>
              <p className="text-gray-600 text-sm mt-1">{order.customer.address}</p>
              <div className="mt-4 flex flex-col gap-2 text-[#25a18e] text-sm font-medium bg-[#25a18e]/5 p-3 rounded-xl w-full">
                <div className="flex items-center gap-2">
                  <Truck size={16} />
                  <span className="font-bold">Jadwal Pengiriman:</span>
                </div>
                <div className="pl-6 space-y-1">
                  <p>Tanggal: {order.customer.deliveryDates?.map(d => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })).join(', ')}</p>
                  <p>Waktu: {order.customer.deliveryTimes?.join(', ')}</p>
                </div>
              </div>
            </div>
            <div className="text-right md:text-left">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Metode Pembayaran</h3>
              <p className="font-bold text-gray-800 capitalize">
                {order.customer.paymentMethod === 'transfer' ? `Transfer ${selectedBank?.name || ''}` : 'Tunai / COD'}
              </p>
              <p className="text-gray-600 text-sm">Jatuh Tempo: <span className="text-red-500 font-semibold">{new Date(order.dueDate).toLocaleDateString('id-ID')}</span></p>
              {order.customer.paymentMethod === 'transfer' && selectedBank && (
                <div className="mt-2 bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Tujuan Transfer {selectedBank.name}</p>
                    <p className="font-black text-gray-800 text-lg tracking-wider">{selectedBank.acc}</p>
                    <p className="text-xs text-gray-500 font-bold">a.n {selectedBank.owner}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100 text-[#25a18e] font-bold text-[10px]">
                    SALIN
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-400">
                  <th className="pb-2 font-medium">Item</th>
                  <th className="pb-2 font-medium text-center">Qty</th>
                  <th className="pb-2 font-medium text-right">Harga</th>
                  <th className="pb-2 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 font-medium text-gray-800">{item.name}</td>
                    <td className="py-3 text-center text-gray-600">{item.qty}</td>
                    <td className="py-3 text-right text-gray-600">{formatCurrency(item.price)}</td>
                    <td className="py-3 text-right font-bold text-gray-800">{formatCurrency(item.price * item.qty)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="flex flex-col items-end mb-8">
            <div className="w-full md:w-1/2 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Biaya Layanan</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-[#25a18e] pt-4 border-t border-gray-200">
                <span>Total Tagihan</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {order.status !== 'paid' && order.customer.paymentMethod === 'transfer' && (
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200 mb-8 text-center animate-pulse-subtle">
              {order.status === 'verification' ? (
                <div className="text-[#25a18e] flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#25a18e]/10 rounded-full flex items-center justify-center">
                    <Clock size={24} />
                  </div>
                  <p className="font-bold">Bukti pembayaran sedang diverifikasi admin</p>
                  <p className="text-xs text-gray-400">Terima kasih telah melakukan pembayaran!</p>
                </div>
              ) : (
                <div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload size={24} className="text-gray-400" />
                  </div>
                  <p className="text-sm font-bold text-gray-600 mb-4">Sudah transfer? Upload bukti pembayaran di sini.</p>
                  <button
                    onClick={() => onUploadProof(order.id)}
                    className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl text-sm font-black hover:bg-gray-50 transition flex items-center justify-center gap-2 mx-auto shadow-sm"
                  >
                    <Upload size={18} /> Upload Bukti Transfer
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.print()}
              className="flex-1 border border-gray-200 py-4 rounded-2xl font-black text-gray-600 hover:bg-gray-50 transition"
            >
              Cetak Invoice
            </button>
            <button
              onClick={() => onViewChange('home')}
              className="flex-1 bg-[#25a18e] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#25a18e]/90 transition shadow-lg shadow-[#25a18e]/20"
            >
              Belanja Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. Order List (My Account)
const OrderHistory = ({ orders, onViewOrder }) => {
  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <Receipt size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-bold text-gray-600">Belum ada pesanan</h3>
        <p className="text-gray-400">Riwayat belanja Anda akan muncul di sini.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Riwayat Pesanan</h2>
      <div className="space-y-4">
        {orders.slice().reverse().map(order => (
          <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition cursor-pointer" onClick={() => onViewOrder(order)}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-[#25a18e]">{order.id}</h3>
                <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {order.status === 'verification' ? 'Verifikasi' : order.status}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">{order.items.length} Barang</p>
              <p className="font-bold">{formatCurrency(order.total)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// 8. Floating WhatsApp Component
const FloatingWhatsApp = () => (
  <div className="fixed bottom-24 right-6 z-[100] group flex flex-col items-end gap-3 md:bottom-10">
    <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 mb-2 animate-bounce-slow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      <p className="text-sm font-bold text-gray-700">Ada yang bisa dibantu? chat yuk!</p>
    </div>
    <a
      href="https://wa.me/6281234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group shadow-[#25D366]/30"
    >
      <MessageCircle size={32} />
      <span className="absolute top-0 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse shadow-sm"></span>
    </a>
  </div>
);


// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState('home'); // home, cart, checkout, invoice, orders, category, productDetail
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  // New States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('koperasi_cart');
    const savedOrders = localStorage.getItem('koperasi_orders');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('koperasi_cart', JSON.stringify(cart));
    localStorage.setItem('koperasi_orders', JSON.stringify(orders));
  }, [cart, orders]);

  // View Handlers
  const handleSelectCategory = (cat, sub) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(sub);
    setView('category');
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setView('productDetail');
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedProduct(null);
  };

  // Cart Logic
  const addToCart = (product, qty) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, qty }];
    });
    // Notification simulation or just visual feedback
    if (view === 'productDetail') {
      alert("Produk berhasil ditambahkan ke keranjang!");
    }
  };

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Checkout Logic
  const handleOrderSubmit = (customerData) => {
    // Calculate Due Date based on H+1/H+2 logic
    const today = new Date();
    let dueDate = new Date(today);

    if (customerData.paymentTerm === 'h1') dueDate.setDate(today.getDate() + 1);
    else if (customerData.paymentTerm === 'h2') dueDate.setDate(today.getDate() + 2);

    const newOrder = {
      id: generateInvoiceId(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
      customer: customerData,
      status: 'pending', // pending, verification, paid, overdue
      date: new Date().toISOString(),
      dueDate: dueDate.toISOString(),
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    setCart([]); // Clear cart
    setActiveOrder(newOrder);
    setView('invoice');
  };

  const handleUploadProof = (orderId) => {
    // Simulation: Update status to 'verification'
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: 'verification' } : o);
    setOrders(updatedOrders);
    setActiveOrder(updatedOrders.find(o => o.id === orderId));
    alert("Bukti pembayaran berhasil diupload! Admin akan melakukan verifikasi.");
  };

  const handleViewOrder = (order) => {
    setActiveOrder(order);
    setView('invoice');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-gray-800 font-sans flex flex-col">
      <div className="bg-[#25a18e] text-white py-2 text-[10px] md:text-sm text-center font-bold tracking-wider">
        BELANJA GROSIR LEBIH HEMAT & MUDAH | HUBUNGI KAMI: 0812-3456-7890
      </div>

      <Navbar
        cartCount={cart.length}
        onViewChange={setView}
        currentView={view}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={CATEGORIES}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content Area */}
      <main className="flex-grow pb-10">
        {view === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 mt-8">
              <div className="relative rounded-[2.5rem] overflow-hidden bg-[#25a18e] h-[400px] flex items-center shadow-2xl">
                <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1500" className="w-full h-full object-cover opacity-20" alt="Sembako Grosir" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#25a18e] via-[#25a18e]/60 to-transparent"></div>
                </div>
                <div className="relative z-10 px-8 md:px-16 md:w-2/3 text-white">
                  <span className="bg-[#7ae582] text-[#25a18e] px-4 py-1.5 rounded-full text-xs font-black uppercase mb-6 inline-block shadow-lg">Harga Grosir Langsung</span>
                  <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 italic drop-shadow-xl">Solusi Belanja Sembako Cepat & Hemat</h1>
                  <p className="text-sm md:text-xl opacity-90 mb-10 hidden md:block font-medium">Penuhi kebutuhan dapur Anda tanpa perlu antre. Pesan sekarang, belanja harga grosir dari genggaman!</p>
                  <button onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })} className="bg-white text-[#25a18e] px-10 py-4 rounded-2xl font-black text-lg hover:bg-[#7ae582] hover:text-white transition shadow-2xl transform active:scale-95">Belanja Sekarang</button>
                </div>
              </div>
            </section>
            {/* Promo Banners */}
            <section className="max-w-7xl mx-auto px-4 mt-12 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                {PROMO_BANNERS.map(banner => (
                  <div key={banner.id} className="relative h-48 md:h-64 rounded-3xl overflow-hidden group shadow-lg">
                    <img src={banner.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={banner.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
                      <h3 className="text-white text-xl md:text-2xl font-black mb-1">{banner.title}</h3>
                      <p className="text-white/80 font-bold text-sm">{banner.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Trending Products */}
            <section className="max-w-7xl mx-auto px-4 mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-orange-500 rounded-full"></span>
                  Trending Sekarang
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {PRODUCTS.filter(p => p.trending).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onSelectProduct={handleSelectProduct}
                  />
                ))}
              </div>
            </section>

            {/* Product Catalog */}
            <section id="catalog" className="max-w-7xl mx-auto px-4 mt-20 mb-16">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-gray-800 italic uppercase">Semua Produk</h2>
                  <p className="text-sm font-bold text-gray-400 mt-1">Pilihan produk harian terbaik dengan harga koperasi</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {PRODUCTS.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onSelectProduct={handleSelectProduct}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {view === 'category' && (
          <CategoryView
            category={selectedCategory}
            subcategory={selectedSubcategory}
            products={PRODUCTS}
            onAddToCart={addToCart}
            onSelectProduct={handleSelectProduct}
            onBack={handleBackToHome}
          />
        )}

        {view === 'productDetail' && (
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setView(selectedCategory ? 'category' : 'home')}
          />
        )}

        {view === 'cart' && (
          <CartView
            cart={cart}
            updateQty={updateQty}
            removeFromCart={removeFromCart}
            checkout={setView}
          />
        )}

        {view === 'checkout' && (
          <CheckoutView
            cart={cart}
            onSubmitOrder={handleOrderSubmit}
            onBack={() => setView('cart')}
          />
        )}

        {view === 'invoice' && (
          <InvoiceView
            order={activeOrder}
            onViewChange={setView}
            onUploadProof={handleUploadProof}
          />
        )}

        {view === 'orders' && (
          <OrderHistory orders={orders} onViewOrder={handleViewOrder} />
        )}
      </main>

      {/* Footer is now included */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] bg-[#25a18e] text-white px-8 py-4 rounded-[2rem] shadow-2xl flex justify-between items-center z-50">
        <button onClick={handleBackToHome} className={`flex flex-col items-center gap-1 ${view === 'home' ? 'opacity-100' : 'opacity-60'}`}>
          <Home size={22} />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => setIsSidebarOpen(true)} className="flex flex-col items-center gap-1 opacity-60">
          <Menu size={22} />
          <span className="text-[10px] font-bold">Kategori</span>
        </button>
        <button onClick={() => setView('orders')} className={`flex flex-col items-center gap-1 ${view === 'orders' ? 'opacity-100' : 'opacity-60'}`}>
          <Receipt size={22} />
          <span className="text-[10px] font-bold">Pesanan</span>
        </button>
        <button onClick={() => setView('cart')} className={`flex flex-col items-center gap-1 ${view === 'cart' ? 'opacity-100' : 'opacity-60'}`}>
          <div className="relative">
            <ShoppingCart size={22} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-[#25a18e]"></span>}
          </div>
          <span className="text-[10px] font-bold">Keranjang</span>
        </button>
      </div>
    </div>
  );
}