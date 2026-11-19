import { Link } from 'react-router-dom';
import { ArrowRight, Check, ExternalLink, Monitor, Smartphone } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Photo from '../components/ui/Photo';
import { DIVISIONS } from '../data/business';
import { useSite } from '../features/site/SiteContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLang } from '../i18n/LanguageContext';

/** IT 사업부 포트폴리오 카드 */
function Portfolio() {
  const { t } = useLang();
  const { channels } = useSite();

  const items = [
    {
      icon: Smartphone,
      title: { ko: '아이들 놀이 앱', en: "Kids' play app" },
      desc: { ko: 'Google Play 스토어 출시 Android 앱', en: 'Android app released on Google Play' },
      href: channels.playStore,
      linkLabel: { ko: 'Google Play에서 보기', en: 'View on Google Play' },
    },
    {
      icon: Monitor,
      title: { ko: '오치상사 홈페이지', en: 'OCHI GLOBAL website' },
      desc: { ko: '지금 보고 계신 반응형 회사 홈페이지 (React · TypeScript)', en: 'The responsive site you are viewing now (React, TypeScript)' },
      href: '',
      linkLabel: { ko: '', en: '' },
    },
  ];

  return (
    <div className="mt-8">
      <h4 className="mb-3 text-sm font-bold text-ochi-navy-800">{t({ ko: '제작 사례', en: 'Portfolio' })}</h4>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(({ icon: Icon, title, desc, href, linkLabel }) => (
          <div key={title.ko} className="flex gap-4 rounded border border-slate-200 bg-white p-4">
            <span className="h-fit rounded bg-ochi-navy-50 p-2.5 text-ochi-navy-600">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <div className="font-semibold text-slate-800">{t(title)}</div>
              <div className="mt-0.5 text-xs text-slate-500">{t(desc)}</div>
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-ochi-navy-600 hover:text-ochi-navy-500"
                >
                  {t(linkLabel)} <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Business() {
  const { t } = useLang();

  usePageMeta(
    { ko: '사업영역', en: 'Business' },
    {
      ko: '원자재(네오디뮴·페라이트 자석, 실리콘) 수입·납품, 한인 사업자 대상 국내 제품 소싱·수출, 앱·홈페이지 제작 및 SI/SM 인력 공급',
      en: 'Magnet and silicone imports, Korean product sourcing and export, app and website development, SI/SM staffing',
    },
  );

  return (
    <>
      <PageHeader
        title={{ ko: '사업영역', en: 'Business' }}
        subtitle={{ ko: '원자재 · 국내 제품 소싱 · IT, 세 가지 분야로 고객의 비즈니스를 지원합니다.', en: 'Supporting your business in three areas: materials, sourcing, and IT.' }}
      />

      <div className="mx-auto max-w-6xl divide-y divide-slate-200 px-4 sm:px-6">
        {DIVISIONS.map((d, i) => (
          <section key={d.key} id={d.anchor} aria-labelledby={`${d.anchor}-title`} className="py-14">
            <div className={`grid items-start gap-8 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Photo photo={d.photo} tone={d.key === 'SOURCING' ? 'warm' : d.key === 'IT' ? 'slate' : 'navy'} alt={t(d.name)} className="aspect-[4/3] w-full rounded" />

              <div>
                <div className="inline-flex items-center gap-2 rounded bg-ochi-navy-50 px-2.5 py-1 text-xs font-semibold text-ochi-navy-600">
                  <d.icon className="h-4 w-4" aria-hidden="true" /> {String(i + 1).padStart(2, '0')}
                </div>
                <h2 id={`${d.anchor}-title`} className="mt-3 text-2xl font-bold text-ochi-navy-800">
                  {t(d.name)}
                </h2>
                <p className="mt-1 text-sm font-medium text-ochi-amber-600">{t(d.tagline)}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{t(d.description)}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {d.items.map((item) => (
                    <div key={item.title.ko} className="rounded border border-slate-200 p-3">
                      <div className="text-sm font-semibold text-slate-800">{t(item.title)}</div>
                      <div className="mt-1 text-xs leading-relaxed text-slate-500">{t(item.desc)}</div>
                    </div>
                  ))}
                </div>

                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {d.strengths.map((s) => (
                    <li key={s.ko} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ochi-amber-500" aria-hidden="true" />
                      {t(s)}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?division=${d.key}`}
                  className="mt-6 inline-flex items-center gap-2 rounded bg-ochi-navy-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ochi-navy-500"
                >
                  {t(d.cta)} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {d.key === 'IT' && <Portfolio />}
          </section>
        ))}
      </div>
    </>
  );
}
