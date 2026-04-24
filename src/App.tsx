/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trees, Waypoints, User, ShieldCheck, Info, TrendingUp, 
  Database, Users, Tag, Armchair, ShoppingCart, Receipt, List as ListIcon, 
  Key, Crown, Copy, Check, Star, Smartphone, Lock, ShoppingBag, Image as ImageIcon, BarChart3, ChevronDown, CheckCircle2, CopyIcon, Code2, AlertTriangle, Link as LinkIcon, Layers
} from 'lucide-react';

// --- Reusable Components ---

const SectionHeading = ({ icon: Icon, title, id }: { icon: any, title: string, id: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="flex items-center gap-3 mb-8 pt-20 -mt-12" id={id}
  >
    <div className="p-2.5 bg-[#141414] border border-[#262626] rounded-xl text-[#C5A059]">
      <Icon className="w-5 h-5" />
    </div>
    <h2 className="font-display text-3xl font-bold text-[#E5E5E5]">{title}</h2>
  </motion.div>
);

const CopyButton = ({ text, label }: { text: string, label?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className={`group flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${copied ? 'bg-[#0F0F0F] text-green-400 border border-green-900/50' : 'bg-[#1A1A1A] text-[#888] border border-transparent hover:border-[#262626] hover:bg-[#262626] hover:text-[#C5A059]'}`}
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />}
      {label && <span>{label}</span>}
    </button>
  );
};

const AccordionItem = ({ title, icon: Icon, children, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[#141414] rounded-xl shadow-sm border border-[#262626] overflow-hidden mb-4 transition-all hover:border-[#C5A059]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-[#141414] hover:bg-[#1A1A1A] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#0F0F0F] border border-[#262626] text-[#C5A059] rounded-lg">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-[#E5E5E5] font-mono">{title}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-[#888]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="p-5 pt-0 border-t border-[#262626] bg-[#141414]">
              {children}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['alur', 'database', 'akun', 'fitur'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-[#C5A059]/30 selection:text-[#C5A059]">
      
      {/* Header */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="bg-gradient-to-br from-[#C5A059] to-[#8A6D3B] p-2 rounded-lg text-black shadow-inner">
              <Trees className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#E5E5E5] leading-tight">Prigel Joyo</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">Dokumentasi</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center bg-[#0F0F0F]/80 backdrop-blur-md px-2 py-1.5 rounded-full shadow-sm border border-[#262626]">
            {['Alur', 'Database', 'Akun', 'Fitur'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeSection === item.toLowerCase() ? 'bg-[#C5A059] text-black shadow-md' : 'text-[#888] hover:text-[#C5A059] hover:bg-[#141414]'}`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        
        {/* Hero Section */}
        <div className="text-center mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-[#C5A059] text-[10px] tracking-widest font-bold uppercase mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-[#8A6D3B]" />
            Sistem Pemasaran & Penjualan v1.0
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#E5E5E5] tracking-tight leading-tight mb-6"
          >
            Dokumentasi <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#C5A059] to-[#8A6D3B]">Sistem</span><br/>
            Prigel Joyo Mebel
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-md text-[#888] tracking-widest uppercase max-w-2xl mx-auto"
          >
            Panduan lengkap memahami arsitektur database, alur pengguna, serta fitur-fitur pada platform e-commerce furniture custom.
          </motion.p>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        </div>

        {/* Alur Website */}
        <section className="mb-24 relative">
          <SectionHeading id="alur" icon={Waypoints} title="Alur Sistem interaktif" />
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Customer Flow */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="group bg-[#141414] rounded-xl p-8 border border-[#262626] hover:border-[#C5A059] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#0F0F0F] rounded-lg border border-[#262626] flex items-center justify-center mb-6 text-[#C5A059] group-hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#E5E5E5] mb-6 group-hover:text-[#C5A059] transition-colors">Flow Customer</h3>
              
              <ul className="space-y-6 relative">
                <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-[#262626]"></div>
                {[
                  "Registrasi / Login akun",
                  "Eksplorasi katalog produk",
                  "Lihat detail produk",
                  "Tambah ke keranjang belanja",
                  "Checkout Transfer / COD",
                  "Pantau status pesanan"
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4 pl-6 relative">
                    <div className={`absolute left-[2.5px] top-1 w-3 h-3 rounded-full ring-4 ring-[#141414] shadow-sm z-10 ${i === 0 ? 'bg-[#C5A059]' : 'bg-[#262626]'}`}></div>
                    <div className="text-[#888] text-sm font-medium -mt-1 leading-snug">{step}</div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Admin Flow */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="group bg-[#141414] rounded-xl p-8 border border-[#262626] hover:border-[#C5A059] transition-all duration-300"
            >
               <div className="w-12 h-12 bg-[#0F0F0F] rounded-lg border border-[#262626] flex items-center justify-center mb-6 text-[#C5A059] group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#E5E5E5] mb-6 group-hover:text-[#C5A059] transition-colors">Flow Admin</h3>
              
              <ul className="space-y-6 relative">
                <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-[#262626]"></div>
                {[
                  "Login ke portal admin",
                  "Tinjau dashboard analitik",
                  "Kelola master data",
                  "Proses transaksi",
                  "Manajemen pelanggan",
                  "Cetak laporan bulanan"
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4 pl-6 relative">
                    <div className={`absolute left-[2.5px] top-1 w-3 h-3 rounded-full ring-4 ring-[#141414] shadow-sm z-10 ${i === 0 ? 'bg-[#C5A059]' : 'bg-[#262626]'}`}></div>
                    <div className="text-[#888] text-sm font-medium -mt-1 leading-snug">{step}</div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* 3. Panduan Penggunaan */}
        <section className="mb-32">
          <SectionHeading id="panduan" icon={BookOpen} title="Panduan Penggunaan" />
          <div className="flex p-1 bg-[#0F0F0F] border border-[#262626] rounded-2xl w-fit mb-10">
            <button onClick={() => setActiveTab('customer')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-bold transition-all ${activeTab === 'customer' ? 'bg-[#C5A059] text-black shadow-lg' : 'text-[#888]'}`}>
              CUSTOMER
            </button>
            <button onClick={() => setActiveTab('admin')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-bold transition-all ${activeTab === 'admin' ? 'bg-[#C5A059] text-black shadow-lg' : 'text-[#888]'}`}>
              ADMIN PORTAL
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                  {(activeTab === 'customer' ? customerSteps : adminSteps).map((step, idx) => (
                    <div key={idx} className="group bg-[#141414] border border-[#262626] p-5 rounded-2xl flex gap-5 hover:border-[#C5A059]/40 transition-all">
                      <div className="shrink-0 w-12 h-12 bg-[#0A0A0A] border border-[#262626] rounded-xl flex items-center justify-center text-[#C5A059] group-hover:scale-110 transition-transform"><step.icon className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-[#E5E5E5] font-bold mb-1">{step.title}</h4>
                        <p className="text-[#888] text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="lg:col-span-5 bg-gradient-to-br from-[#141414] to-[#0F0F0F] border border-[#C5A059]/20 rounded-3xl p-8 sticky top-32">
              <h4 className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Catatan Penting</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-xs text-[#888] leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full mt-1.5 shrink-0"></div>
                  <span>Laporan keuangan hanya menghitung transaksi dengan status <strong>Success</strong>.</span>
                </li>
                <li className="flex gap-3 text-xs text-[#888] leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full mt-1.5 shrink-0"></div>
                  <span>Stok produk berkurang otomatis saat checkout berhasil dilakukan oleh customer.</span>
                </li>
                <li className="flex gap-3 text-xs text-[#888] leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full mt-1.5 shrink-0"></div>
                  <span>Gunakan fitur <strong>Cetak PDF</strong> di menu Laporan untuk arsip fisik mingguan/bulanan.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Struktur Database */}
        <section className="mb-24">
          <SectionHeading id="database" icon={Database} title="Struktur Database" />
          
          <div className="max-w-4xl">
            {/* Tabel Users */}
            <AccordionItem title="users" icon={Users} defaultOpen={true}>
              <div className="overflow-x-auto custom-scrollbar pb-2">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#262626]">
                      <th className="py-3 px-4 text-[10px] font-semibold text-[#888] uppercase tracking-widest">Kolom</th>
                      <th className="py-3 px-4 text-[10px] font-semibold text-[#888] uppercase tracking-widest">Tipe</th>
                      <th className="py-3 px-4 text-[10px] font-semibold text-[#888] uppercase tracking-widest">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626] text-sm">
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#C5A059]">id</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">bigint(20) unsigned PK</td><td className="py-3 px-4 text-[#666]">Primary key, auto increment</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">name</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">varchar(255)</td><td className="py-3 px-4 text-[#666]">Nama lengkap user</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">email</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">varchar(255) unique</td><td className="py-3 px-4 text-[#666]">Email untuk login</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">email_verified_at</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">timestamp nullable</td><td className="py-3 px-4 text-[#666]">Waktu verifikasi email</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">password</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">varchar(255)</td><td className="py-3 px-4 text-[#666]">Hash password</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">role</td><td className="py-3 px-4"><span className="bg-purple-900/20 text-purple-400 border border-purple-900/50 px-2 py-0.5 rounded-sm text-[10px] font-mono">enum</span></td><td className="py-3 px-4 text-[#666]">'customer' atau 'admin'</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">phone</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">varchar(255) nullable</td><td className="py-3 px-4 text-[#666]">Nomor telepon</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">address</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">text nullable</td><td className="py-3 px-4 text-[#666]">Alamat lengkap</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">photo</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">varchar(255) nullable</td><td className="py-3 px-4 text-[#666]">Foto profil</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">remember_token</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">varchar(100)</td><td className="py-3 px-4 text-[#666]">Token remember me</td></tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>

            {/* Tabel Categories */}
            <AccordionItem title="categories" icon={Layers}>
              <div className="overflow-x-auto custom-scrollbar pb-2">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#262626]">
                      <th className="py-3 px-4 text-[10px] font-semibold text-[#888] uppercase tracking-widest">Kolom</th>
                      <th className="py-3 px-4 text-[10px] font-semibold text-[#888] uppercase tracking-widest">Tipe</th>
                      <th className="py-3 px-4 text-[10px] font-semibold text-[#888] uppercase tracking-widest">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626] text-sm">
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#C5A059]">id</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">bigint(20) unsigned PK</td><td className="py-3 px-4 text-[#666]">Primary key, auto increment</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">name</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">varchar(255)</td><td className="py-3 px-4 text-[#666]">Nama kategori (contoh: Kursi)</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">slug</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">varchar(255) unique</td><td className="py-3 px-4 text-[#666]">URL friendly</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">description</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">text nullable</td><td className="py-3 px-4 text-[#666]">Deskripsi kategori</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">image</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">varchar(255) nullable</td><td className="py-3 px-4 text-[#666]">Icon atau foto kategori</td></tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>

            {/* Tabel Products */}
            <AccordionItem title="products" icon={Armchair}>
               <div className="overflow-x-auto custom-scrollbar pb-2">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#262626]">
                      <th className="py-3 px-4 text-[10px] font-semibold text-[#888] uppercase tracking-widest">Kolom</th>
                      <th className="py-3 px-4 text-[10px] font-semibold text-[#888] uppercase tracking-widest">Tipe</th>
                      <th className="py-3 px-4 text-[10px] font-semibold text-[#888] uppercase tracking-widest">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626] text-sm">
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#C5A059]">id</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">bigint(20) unsigned PK</td><td className="py-3 px-4 text-[#666]">Auto increment</td></tr>
                    <tr className="bg-[#1A1A1A]/40"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">category_id</td><td className="py-3 px-4"><span className="bg-[#8A6D3B]/20 text-[#C5A059] border border-[#8A6D3B]/50 px-2 py-0.5 rounded-sm text-[10px] font-mono flex w-fit items-center gap-1 uppercase tracking-tighter"><LinkIcon className="w-2.5 h-2.5"/> bigint(20) FK</span></td><td className="py-3 px-4 text-[#666]">Ke categories.id (Cascade)</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">name, slug</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">varchar(255)</td><td className="py-3 px-4 text-[#666]">Nama & URL slug produk</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">material, size</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">varchar(255)</td><td className="py-3 px-4 text-[#666]">Bahan & Dimensi produk</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">price, stock</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">int(11)</td><td className="py-3 px-4 text-[#666]">Harga (Rp) & Stok tersedia</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">production_process</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">text nullable</td><td className="py-3 px-4 text-[#666]">Informasi proses pembuatan</td></tr>
                    <tr className="hover:bg-[#1A1A1A] transition-colors"><td className="py-3 px-4 font-mono font-medium text-[#E5E5E5]">is_best_seller</td><td className="py-3 px-4 font-mono text-[11px] text-[#888]">tinyint(1)</td><td className="py-3 px-4 text-[#666]">1 = terlaris, 0 = biasa</td></tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>

            {/* Tabel Transaksi & Detail */}
            <AccordionItem title="Transactions & Relasi" icon={Receipt}>
               <div className="grid md:grid-cols-3 gap-6 pt-2">
                  {/* Carts */}
                  <div className="bg-[#0A0A0A] rounded-xl border border-[#262626] p-5 hover:border-[#C5A059] transition-colors group">
                    <h4 className="font-bold font-mono text-[#E5E5E5] group-hover:text-[#C5A059] mb-3 flex items-center border-b border-[#262626] pb-2 transition-colors"><ShoppingCart className="w-4 h-4 mr-2" /> carts</h4>
                    <ul className="text-[11px] space-y-2 text-[#888] font-mono">
                      <li className="flex justify-between items-center"><span className="text-[#C5A059]">id</span> <span>bigint(20) PK</span></li>
                      <li className="flex justify-between items-center"><span className="text-[#E5E5E5]">user_id</span> <span className="text-blue-400">bigint(20) FK</span></li>
                      <li className="flex justify-between items-center"><span className="text-[#E5E5E5]">product_id</span> <span className="text-blue-400">bigint(20) FK</span></li>
                      <li className="flex justify-between items-center"><span>quantity</span> <span>int(11)</span></li>
                    </ul>
                  </div>

                  {/* Transactions */}
                  <div className="bg-[#0A0A0A] rounded-xl border border-[#C5A059] p-5 relative shadow-[0_0_15px_rgba(197,160,89,0.1)]">
                    <div className="absolute -top-3 -right-3 bg-[#141414] text-[#C5A059] text-[10px] font-bold px-2 py-1 rounded-full border border-[#C5A059]">Main</div>
                    <h4 className="font-bold font-mono text-[#E5E5E5] mb-3 flex items-center border-b border-[#262626] pb-2 text-[#C5A059]"><Receipt className="w-4 h-4 mr-2" /> transactions</h4>
                     <ul className="text-[11px] space-y-2 text-[#888] font-mono">
                      <li className="flex justify-between items-center"><span className="text-[#C5A059]">id</span> <span>bigint(20) PK</span></li>
                      <li className="flex justify-between items-center"><span className="text-[#E5E5E5]">invoice_code</span> <span className="text-red-400">varchar unique</span></li>
                      <li className="flex justify-between items-center"><span>total_amount</span> <span>int(11)</span></li>
                      <li className="flex justify-between items-center"><span>status</span> <span className="text-purple-400">enum</span></li>
                      <li className="flex justify-between items-center"><span>payment_method</span> <span>varchar(255)</span></li>
                    </ul>
                  </div>

                  {/* Transaction Details */}
                  <div className="bg-[#0A0A0A] rounded-xl border border-[#262626] p-5 hover:border-[#C5A059] transition-colors group">
                    <h4 className="font-bold font-mono text-[#E5E5E5] group-hover:text-[#C5A059] mb-3 flex items-center border-b border-[#262626] pb-2 transition-colors"><ListIcon className="w-4 h-4 mr-2" /> transaction_details</h4>
                     <ul className="text-[11px] space-y-2 text-[#888] font-mono">
                      <li className="flex justify-between items-center"><span className="text-[#C5A059]">id</span> <span>bigint(20) PK</span></li>
                      <li className="flex justify-between items-center"><span className="text-[#E5E5E5]">transaction_id</span> <span className="text-blue-400">FK</span></li>
                      <li className="flex justify-between items-center"><span className="text-[#E5E5E5]">product_id</span> <span className="text-blue-400">FK</span></li>
                      <li className="flex justify-between items-center"><span>price_subtotal</span> <span>int(11)</span></li>
                    </ul>
                  </div>
               </div>
               <div className="mt-4 text-xs text-[#666] flex items-center gap-2 px-2 bg-[#0A0A0A] py-3 rounded-lg border border-[#262626]">
                 <Info className="w-4 h-4 text-[#C5A059]"/> 
                 <span>Seluruh Foreign Key diimplementasikan dengan <strong>ON DELETE CASCADE</strong> untuk integritas data.</span>
               </div>
            </AccordionItem>
          </div>
        </section>

        {/* Akun Default */}
        <section className="mb-24">
           <SectionHeading id="akun" icon={Key} title="Kredensial Default" />
           
           <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {/* Admin Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#141414] rounded-xl p-8 text-[#E5E5E5] border border-[#262626] hover:border-[#C5A059] transition-colors relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 text-[#C5A059] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                  <Crown className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-[#0F0F0F] text-[#C5A059] border border-[#262626] rounded-xl"><Crown className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-display font-bold">Admin Portal</h3>
                  </div>
                  
                  <div className="space-y-4 font-mono text-sm">
                    <div>
                      <div className="text-[#888] mb-1 text-[10px] uppercase tracking-widest font-sans">Email Address</div>
                      <div className="flex items-center justify-between bg-[#0A0A0A] p-3 rounded-xl border border-[#262626]">
                        <span className="text-[#C5A059]">admin@prigeljoyo.com</span>
                        <CopyButton text="admin@prigeljoyo.com" />
                      </div>
                    </div>
                    <div>
                      <div className="text-[#888] mb-1 text-[10px] uppercase tracking-widest font-sans">Password</div>
                      <div className="flex items-center justify-between bg-[#0A0A0A] p-3 rounded-xl border border-[#262626]">
                        <span>password123</span>
                        <CopyButton text="password123" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Customer Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#141414] rounded-xl p-8 border border-[#262626] hover:border-[#C5A059] transition-colors relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 text-[#C5A059] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                  <User className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-[#0F0F0F] text-[#C5A059] border border-[#262626] rounded-xl"><User className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-display font-bold text-[#E5E5E5]">Customer Demo</h3>
                  </div>
                  
                  <div className="space-y-4 font-mono text-sm">
                    <div>
                      <div className="text-[#888] mb-1 text-[10px] uppercase tracking-widest font-sans">Email Address</div>
                      <div className="flex items-center justify-between bg-[#0A0A0A] p-3 rounded-xl border border-[#262626]">
                        <span className="text-[#C5A059] font-medium">budi@example.com</span>
                        <CopyButton text="budi@example.com" />
                      </div>
                    </div>
                    <div>
                      <div className="text-[#888] mb-1 text-[10px] uppercase tracking-widest font-sans">Password</div>
                      <div className="flex items-center justify-between bg-[#0A0A0A] p-3 rounded-xl border border-[#262626]">
                        <span className="text-[#E5E5E5]">password123</span>
                        <CopyButton text="password123" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
           </div>
           
           <div className="max-w-4xl mt-6 flex items-start gap-3 p-4 bg-[#141414] text-[#888] rounded-2xl border border-[#262626]">
             <AlertTriangle className="w-5 h-5 shrink-0 text-[#C5A059]" />
             <p className="text-sm leading-relaxed">Tersedia juga dummy customer tambahan: <strong className="font-mono bg-[#0A0A0A] border border-[#262626] px-1 rounded">siti@example.com</strong> dan <strong className="font-mono bg-[#0A0A0A] border border-[#262626] px-1 rounded">agus@example.com</strong> dengan password yang sama. Data digenerate melalui artisan seeder.</p>
           </div>
        </section>

        {/* Fitur Unggulan */}
        <section className="mb-24">
          <SectionHeading id="fitur" icon={Star} title="Highlight Fitur" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { i: Smartphone, t: "Responsif Total", d: "Tampilan optimal di perangkat mobile, tablet, dan layar desktop lebar dengan Tailwind." },
              { i: Lock, t: "Autentikasi Aman", d: "Sistem login dan registrasi berlapis dengan pemisahan Role akses (Admin vs Customer)." },
              { i: ShoppingBag, t: "Keranjang Belanja", d: "Manajemen keranjang interaktif; ubah jumlah qty atau hapus item tanpa reload." },
              { i: BarChart3, t: "Laporan & Cetak", d: "Rekapitulasi penjualan dengan filter rentang bulan. Mendukung ekspor via Print Browser (PDF)." },
              { i: ImageIcon, t: "Manajemen Katalog", d: "CRUD produk lengkap dengan unggah gambar, spesifikasi bahan, ukuran, dan proses produksi." },
              { i: TrendingUp, t: "Dashboard Analitik", d: "Ringkasan metrik penting: total pendapatan, volume produk, dan traksi pelanggan terdaftar." }
            ].map((feature, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="bg-[#141414] p-6 rounded-xl border border-[#262626] hover:border-[#C5A059] hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 bg-[#0F0F0F] rounded-lg border border-[#262626] flex items-center justify-center text-[#C5A059] mb-4 group-hover:scale-110 transition-transform">
                  <feature.i className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#E5E5E5] mb-2 font-display text-lg group-hover:text-[#C5A059] transition-colors">{feature.t}</h4>
                <p className="text-sm text-[#888] leading-relaxed">{feature.d}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Panduan Instalasi (Updated) */}
        <section>
           <div className="bg-[#141414] border border-[#262626] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 blur-[100px] rounded-full"></div>
             
             <div className="relative z-10">
               <div className="flex items-center gap-4 mb-8">
                 <div className="p-3 bg-[#0A0A0A] text-[#C5A059] border border-[#262626] rounded-2xl"><Code2 className="w-8 h-8" /></div>
                 <div>
                   <h2 className="font-display text-3xl font-bold text-[#E5E5E5]">Persiapan Lingkungan</h2>
                   <p className="text-[#888] text-[10px] tracking-widest uppercase mt-1">Langkah Cepat Menjalankan Aplikasi</p>
                 </div>
               </div>

               <div className="space-y-4 font-mono text-sm max-w-3xl bg-[#0A0A0A] p-6 rounded-2xl border border-[#262626]">
                  {/* Langkah 1 */}
                  <div className="flex items-start gap-4 hover:bg-[#1A1A1A] p-3 rounded-lg transition-colors group">
                    <span className="text-[#C5A059] font-bold select-none">01</span>
                    <div className="flex-1">
                      <div className="text-[#E5E5E5] mb-1 font-sans font-bold">Database Setup</div>
                      <p className="text-[#888] text-xs font-sans mb-3">Buat database baru di phpMyAdmin/MySQL dengan nama <code className="text-[#C5A059] bg-[#141414] px-1 rounded">prigeljoyo</code>, lalu import file <code className="text-[#C5A059] bg-[#141414] px-1 rounded">database.sql</code> yang tersedia.</p>
                      <code className="text-[#C5A059] block bg-[#050505] p-2 rounded border border-[#262626]">CREATE DATABASE prigeljoyo;</code>
                    </div>
                  </div>

                  {/* Langkah 2 */}
                  <div className="flex items-start gap-4 hover:bg-[#1A1A1A] p-3 rounded-lg transition-colors group border-t border-[#1A1A1A] pt-4">
                    <span className="text-[#C5A059] font-bold select-none">02</span>
                    <div className="flex-1">
                      <div className="text-[#E5E5E5] mb-1 font-sans font-bold">Update Dependensi</div>
                      <p className="text-[#888] text-xs font-sans mb-3">Pastikan semua library pihak ketiga terinstal atau terupdate ke versi terbaru.</p>
                      <div className="flex items-center gap-2">
                        <code className="text-[#C5A059] bg-[#050505] p-2 rounded border border-[#262626] flex-1">composer install && npm install</code>
                        <CopyButton text="composer install && npm install" />
                      </div>
                    </div>
                  </div>

                  {/* Langkah 3 */}
                  <div className="flex items-start gap-4 hover:bg-[#1A1A1A] p-3 rounded-lg transition-colors group border-t border-[#1A1A1A] pt-4">
                    <span className="text-[#C5A059] font-bold select-none">03</span>
                    <div className="flex-1">
                      <div className="text-[#E5E5E5] mb-1 font-sans font-bold">Konfigurasi Environment</div>
                      <p className="text-[#888] text-xs font-sans mb-3">Sesuaikan file <code className="text-[#C5A059] bg-[#141414] px-1 rounded">.env</code>. Pastikan <code className="text-[#C5A059] bg-[#141414] px-1 rounded">DB_DATABASE=prigeljoyo</code>.</p>
                      <code className="text-[#C5A059] block bg-[#050505] p-2 rounded border border-[#262626]">cp .env.example .env && php artisan key:generate</code>
                    </div>
                  </div>

                  {/* Langkah 4 */}
                  <div className="flex items-start gap-4 bg-[#C5A059]/5 p-4 rounded-xl border border-[#C5A059]/20 group mt-4">
                    <span className="text-[#C5A059] font-bold select-none">❯</span>
                    <div className="flex-1">
                      <div className="text-[#C5A059] mb-1 font-sans font-bold uppercase tracking-widest text-xs">Run Application</div>
                      <div className="flex items-center gap-2">
                        <code className="text-[#E5E5E5] font-bold">php artisan serve</code>
                        <div className="ml-auto"><CopyButton text="php artisan serve" /></div>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="mt-8 flex items-center gap-3 text-[#888] text-xs font-sans px-2">
                  <Info className="w-4 h-4 text-[#C5A059]" />
                  <p>Aplikasi dapat diakses melalui <span className="text-[#C5A059] font-mono">http://127.0.0.1:8000</span> setelah server berjalan.</p>
               </div>
             </div>
           </div>
        </section>

      </main>

      <footer className="bg-[#0A0A0A] text-[#888] py-12 border-t border-[#262626] text-center mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <Trees className="w-8 h-8 text-[#262626] mx-auto mb-6" />
          <p className="text-[10px] font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} Prigel Joyo Mebel
          </p>
          <p className="text-xs mt-2 text-[#666]">Dokumentasi Sistem e-Commerce Furniture</p>
        </div>
      </footer>
    </div>
  );
}