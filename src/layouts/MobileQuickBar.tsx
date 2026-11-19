import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { useSite } from '../features/site/SiteContext';
import { telHref } from '../lib/link';

/** 모바일 하단 고정 빠른 연락 바. 전화·카톡은 site.json 값이 있을 때만 표시 */
export default function MobileQuickBar() {
  const { t } = useLang();
  const { contact, channels } = useSite();
  const itemClass = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium';

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex bg-ochi-navy-800 text-white shadow-[0_-2px_8px_rgba(0,0,0,0.15)] lg:hidden">
      {contact.phone && (
        <a href={telHref(contact.phone)} className={itemClass}>
          <Phone className="h-5 w-5" aria-hidden="true" />
          {t({ ko: '전화', en: 'Call' })}
        </a>
      )}
      {channels.kakao && (
        <a href={channels.kakao} target="_blank" rel="noopener noreferrer" className={`${itemClass} bg-ochi-amber-500 text-ochi-amber-900`}>
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {t({ ko: '카톡 상담', en: 'KakaoTalk' })}
        </a>
      )}
      <Link to="/contact" className={`${itemClass} bg-ochi-navy-500`}>
        <Mail className="h-5 w-5" aria-hidden="true" />
        {t({ ko: '견적 문의', en: 'Get a quote' })}
      </Link>
    </div>
  );
}
