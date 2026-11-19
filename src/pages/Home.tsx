import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Mail, MessageCircle, Phone } from 'lucide-react';
import emblem from '../assets/ochi_emblem.png';
import Photo from '../components/ui/Photo';
import { DIVISIONS } from '../data/business';
import { NOTICE_CATEGORY_LABEL } from '../data/noticeCategories';
import { useNotices } from '../features/notice/useNotices';
import { useSite } from '../features/site/SiteContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLang } from '../i18n/LanguageContext';
import { formatDate } from '../lib/date';
import { boardNotices } from '../lib/notices';

function ColumnTitle({ title, to }: { title: string; to: string }) {
  const { t } = useLang();
  return (
    <div className="mb-4 flex items-center justify-between border-b border-slate-200">
      <h2 className="-mb-px border-b-2 border-ochi-amber-500 pb-2 text-base font-bold text-ochi-navy-600">{title}</h2>
      <Link to={to} className="text-xs text-slate-400 hover:text-ochi-navy-500" aria-label={`${title} ${t({ ko: '더보기', en: 'more' })}`}>
        more +
      </Link>
    </div>
  );
}

export default function Home() {
  const { t } = useLang();
  const { contact, channels } = useSite();
  const { status, notices } = useNotices();
  const recent = boardNotices(notices).slice(0, 4);

  usePageMeta(null, {
    ko: '오치상사 - 자석·실리콘 원자재 수입·납품, 한인 사업자 대상 국내 제품 소싱·수출, 앱·홈페이지 제작 및 SI/SM 인력 공급.',
    en: 'OCHI GLOBAL - Magnet and silicone imports, Korean product sourcing and export, app and website development, SI/SM staffing.',
  });

  return (
    <>
      {/* 히어로 콜라주 */}
      <section className="bg-slate-200/70">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
          <div className="grid gap-1.5 md:h-[420px] md:grid-cols-[2fr_1fr_1.25fr] md:grid-rows-2">
            <Photo photo="magnet" alt={t({ ko: '네오디뮴 · 페라이트 자석', en: 'Neodymium and ferrite magnets' })} className="h-48 w-full md:row-span-2 md:h-full" />
            <Photo photo="bakery" tone="warm" alt={t({ ko: '카페 · 베이커리 부자재', en: 'Café and bakery supplies' })} className="hidden h-full w-full md:flex" />

            <div className="flex flex-col justify-between gap-6 bg-ochi-navy-800 p-6 text-white md:row-span-2 lg:p-8">
              <div>
                <div className="font-serif text-2xl tracking-wide text-ochi-gold lg:text-3xl">OCHI GLOBAL</div>
                <div className="my-4 h-0.5 w-10 bg-ochi-amber-500" />
                <p className="text-sm leading-relaxed text-ochi-navy-100">
                  {t({
                    ko: '소재부터 소싱, IT까지\n믿을 수 있는 한 곳의 파트너',
                    en: 'From materials to sourcing and IT,\none partner you can rely on',
                  })
                    .split('\n')
                    .map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                </p>
              </div>
              <div className="space-y-1.5 text-xs text-ochi-navy-100">
                {contact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-ochi-amber-400" aria-hidden="true" /> {contact.phone}
                  </div>
                )}
                {channels.kakao && (
                  <a href={channels.kakao} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-ochi-amber-400">
                    <MessageCircle className="h-3.5 w-3.5 text-ochi-amber-400" aria-hidden="true" />
                    {t({ ko: '카카오톡 오픈채팅 상담', en: 'Chat on KakaoTalk' })}
                  </a>
                )}
                {contact.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-ochi-amber-400" aria-hidden="true" /> {contact.email}
                  </div>
                )}
              </div>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 rounded bg-ochi-amber-500 py-2.5 text-sm font-semibold text-ochi-amber-900 hover:bg-ochi-amber-400"
              >
                {t({ ko: '견적 문의하기', en: 'Request a quote' })} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <Photo photo="it" tone="slate" alt={t({ ko: 'IT · 개발', en: 'IT and development' })} className="hidden h-full w-full md:flex" />
          </div>
        </div>
      </section>

      {/* 하단 3단 */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <ColumnTitle title={t({ ko: '회사소개', en: 'About us' })} to="/about" />
          <div className="flex gap-4">
            <img src={emblem} alt="" className="h-20 w-20 shrink-0 object-contain" />
            <div>
              <div className="text-xs text-slate-500">Global Trading Partner</div>
              <Link to="/about" className="mt-0.5 flex items-center gap-1 font-semibold text-ochi-navy-800 hover:text-ochi-navy-500">
                {t({ ko: '오치상사 소개', en: 'Meet OCHI' })} <ChevronRight className="h-4 w-4 text-ochi-amber-500" />
              </Link>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {t({
                  ko: '원자재 수입, 국내 제품 소싱, IT 서비스를 한 곳에서 연결합니다.',
                  en: 'Materials, sourcing, and IT services connected in one place.',
                })}
              </p>
            </div>
          </div>
        </div>

        <div>
          <ColumnTitle title={t({ ko: '사업영역', en: 'Business' })} to="/business" />
          <ul className="space-y-3">
            {DIVISIONS.map(({ key, anchor, icon: Icon, name, tagline }) => (
              <li key={key}>
                <Link to={`/business#${anchor}`} className="group flex items-start gap-3">
                  <span className="rounded bg-ochi-navy-50 p-2 text-ochi-navy-600 group-hover:bg-ochi-amber-50 group-hover:text-ochi-amber-600">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-800 group-hover:text-ochi-navy-500">{t(name)}</span>
                    <span className="block text-xs text-slate-500">{t(tagline)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle title={t({ ko: '공지사항', en: 'Notice' })} to="/notice" />
          {status === 'loading' && <p className="text-xs text-slate-400">{t({ ko: '불러오는 중…', en: 'Loading…' })}</p>}
          {status !== 'loading' && recent.length === 0 && (
            <p className="text-xs text-slate-400">{t({ ko: '등록된 공지가 없습니다.', en: 'No notices yet.' })}</p>
          )}
          <ul className="divide-y divide-slate-100">
            {recent.map((n) => (
              <li key={n.id}>
                <Link to={`/notice/${encodeURIComponent(n.id)}`} className="flex items-center justify-between gap-3 py-2 text-sm hover:text-ochi-navy-500">
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                        n.pinned ? 'bg-ochi-amber-50 text-ochi-amber-900' : 'bg-ochi-navy-50 text-ochi-navy-600'
                      }`}
                    >
                      {n.pinned ? t({ ko: '고정', en: 'Pinned' }) : t(NOTICE_CATEGORY_LABEL[n.category])}
                    </span>
                    <span className="truncate text-slate-700">{n.title}</span>
                  </span>
                  <span className="shrink-0 text-xs text-slate-400">{formatDate(n.date).slice(5)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
