import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ochiSymbol from '../assets/ochi_logo_round_en.png';
import { NAV, HOME_SUBNAV } from '../data/navigation';
import { useLang } from '../i18n/LanguageContext';

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex overflow-hidden rounded border border-ochi-navy-100 text-xs" role="group" aria-label="Language">
      {(['ko', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2 py-1 font-semibold uppercase ${
            lang === l ? 'bg-ochi-navy-600 text-white' : 'text-slate-500 hover:bg-ochi-navy-50'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  const current = NAV.find((item) => pathname.startsWith(item.to));
  const subItems = current ? current.children : HOME_SUBNAV;

  return (
    <header className="sticky top-0 z-40 border-t-[3px] border-ochi-navy-800 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-20">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={ochiSymbol} alt="" className="h-10 w-10 rounded-md lg:h-12 lg:w-12" />
          <div className="leading-tight">
            <div className="text-lg font-bold text-ochi-navy-800 lg:text-xl">{t({ ko: '오치상사', en: 'OCHI GLOBAL' })}</div>
            <div className="text-[11px] font-medium tracking-wide text-slate-500">{t({ ko: 'OCHI GLOBAL', en: '오치상사' })}</div>
          </div>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <nav aria-label={t({ ko: '주 메뉴', en: 'Main menu' })} className="flex text-sm">
            {NAV.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border-l border-slate-200 px-6 py-1 transition-colors ${i === NAV.length - 1 ? 'border-r' : ''} ${
                    isActive
                      ? 'font-semibold text-ochi-navy-600 underline decoration-ochi-amber-500 decoration-2 underline-offset-[10px]'
                      : 'text-slate-700 hover:text-ochi-navy-500'
                  }`
                }
              >
                {t(item.label)}
              </NavLink>
            ))}
          </nav>
          <LangToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LangToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={t({ ko: '메뉴 열기', en: 'Open menu' })}
            className="p-2 text-ochi-navy-800"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 서브바 */}
      <div className="hidden bg-ochi-navy-500 lg:block">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-center gap-8 px-6 text-xs text-white/90">
          {subItems.map((child) => (
            <Link key={child.to} to={child.to} className="hover:text-ochi-amber-400">
              {t(child.label)}
            </Link>
          ))}
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 pb-4 lg:hidden" aria-label={t({ ko: '모바일 메뉴', en: 'Mobile menu' })}>
          {NAV.map((item) => (
            <div key={item.to} className="border-b border-slate-100 py-3">
              <NavLink
                to={item.to}
                className={({ isActive }) => `block font-semibold ${isActive ? 'text-ochi-navy-600' : 'text-slate-800'}`}
              >
                {t(item.label)}
              </NavLink>
              {item.children.length > 1 && (
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                  {item.children.map((child) => (
                    <Link key={child.to} to={child.to} className="hover:text-ochi-navy-500">
                      {t(child.label)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
