import { Link } from 'react-router-dom';
import { BookOpen, Instagram, Youtube } from 'lucide-react';
import emblem from '../assets/ochi_emblem.png';
import { NAV } from '../data/navigation';
import { useLang } from '../i18n/LanguageContext';
import { useSite } from '../features/site/SiteContext';

export default function Footer() {
  const { t, lang } = useLang();
  const site = useSite();
  const { company, registration, contact, channels } = site;

  const bizInfo = [
    { label: t({ ko: '대표', en: 'CEO' }), value: company.ceo },
    { label: t({ ko: '사업자등록번호', en: 'Business Reg. No.' }), value: registration.businessNo },
    { label: t({ ko: '통신판매업 신고번호', en: 'Mail-order Reg. No.' }), value: registration.mailOrderNo },
    { label: t({ ko: '수출자 번호', en: 'Exporter No.' }), value: registration.exporterNo },
  ].filter((item) => item.value);

  const address = lang === 'ko' ? contact.addressKo : contact.addressEn;
  const hours = lang === 'ko' ? contact.hoursKo : contact.hoursEn;
  const social = [
    { href: channels.youtube, label: 'YouTube', icon: Youtube },
    { href: channels.instagram, label: 'Instagram', icon: Instagram },
    { href: channels.blog, label: 'Blog', icon: BookOpen },
  ].filter((s) => s.href);

  return (
    <footer className="bg-ochi-navy-800 text-ochi-navy-200">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <img src={emblem} alt="" className="h-16 w-16 shrink-0 object-contain" />
            <div className="space-y-1.5 text-xs leading-relaxed">
              <div className="text-base font-semibold text-white">
                {company.nameKo} <span className="font-normal text-ochi-navy-200">{company.nameEn}</span>
              </div>
              {bizInfo.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  {bizInfo.map((item) => (
                    <span key={item.label}>
                      {item.label} : {item.value}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                {address && <span>{address}</span>}
                {contact.phone && <span>T. {contact.phone}</span>}
                {contact.email && <span>E. {contact.email}</span>}
                {hours && <span>{hours}</span>}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <nav className="flex flex-wrap gap-x-5 gap-y-1 text-xs" aria-label={t({ ko: '하단 메뉴', en: 'Footer menu' })}>
              {NAV.map((item) => (
                <Link key={item.to} to={item.to} className="hover:text-ochi-amber-400">
                  {t(item.label)}
                </Link>
              ))}
            </nav>
            {social.length > 0 && (
              <div className="flex gap-2">
                {social.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded border border-ochi-navy-500 p-2 hover:border-ochi-amber-500 hover:text-ochi-amber-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-ochi-navy-600 pt-5 text-[11px] text-ochi-navy-200/80">
          © {new Date().getFullYear()} {company.nameEn}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
