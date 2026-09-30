import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onSelectDivision }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '사업영역', href: '#business' },
    { label: 'IT·SI 솔루션', href: '#business', onClick: () => onSelectDivision('IT_SI') },
    { label: '정밀 산업소재', href: '#business', onClick: () => onSelectDivision('MATERIAL') },
    { label: '글로벌 F&B', href: '#business', onClick: () => onSelectDivision('FNB') },
    { label: '고객지원·공지', href: '#board' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-400 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-500/20">
            五
          </div>
          <div>
            <div className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
              오치상사 <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">OCHI</span>
            </div>
            <div className="text-[10px] text-slate-500 tracking-wider font-semibold">IT · 소재부품 · 글로벌F&B</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={item.onClick}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm shadow-blue-500/30 transition-all hover:shadow"
          >
            통합 견적 접수
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => {
                if (item.onClick) item.onClick();
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-base font-medium text-slate-700 hover:text-blue-600"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full mt-2 py-3 rounded-lg bg-blue-600 text-white font-semibold"
          >
            통합 견적 접수
          </a>
        </div>
      )}
    </header>
  );
}