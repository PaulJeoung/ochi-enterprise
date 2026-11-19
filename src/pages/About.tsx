import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, ExternalLink, MapPin } from 'lucide-react';
import emblem from '../assets/ochi_emblem.png';
import logoKr from '../assets/ochi_logo_kr.png';
import PageHeader from '../components/ui/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import { DIVISIONS } from '../data/business';
import { useSite } from '../features/site/SiteContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLang } from '../i18n/LanguageContext';
import { googleMapUrl, naverMapUrl } from '../lib/link';

export default function About() {
  const { t, lang } = useLang();
  const { company, registration, contact } = useSite();

  usePageMeta(
    { ko: '회사소개', en: 'About' },
    { ko: '오치상사 인사말, 회사개요, 오시는 길', en: 'Greeting, company overview, and location of OCHI GLOBAL.' },
  );

  const address = lang === 'ko' ? contact.addressKo : contact.addressEn;
  /** 지도 검색은 국내 지도에서 정확한 한글 주소 우선 */
  const mapQuery = contact.addressKo || contact.addressEn;
  const hours = lang === 'ko' ? contact.hoursKo : contact.hoursEn;
  const overview = [
    { label: { ko: '상호', en: 'Company' }, value: `${company.nameKo} (${company.nameEn})` },
    { label: { ko: '대표', en: 'CEO' }, value: company.ceo },
    { label: { ko: '설립', en: 'Established' }, value: company.established },
    { label: { ko: '사업자등록번호', en: 'Business Reg. No.' }, value: registration.businessNo },
    { label: { ko: '통신판매업 신고번호', en: 'Mail-order Reg. No.' }, value: registration.mailOrderNo },
    { label: { ko: '수출자 번호', en: 'Exporter No.' }, value: registration.exporterNo },
    { label: { ko: '사업 분야', en: 'Business' }, value: DIVISIONS.map((d) => t(d.name)).join(' · ') },
    { label: { ko: '소재지', en: 'Address' }, value: address },
    { label: { ko: '연락처', en: 'Phone' }, value: contact.phone },
    { label: { ko: '이메일', en: 'Email' }, value: contact.email },
  ].filter((row) => row.value);

  return (
    <>
      <PageHeader
        title={{ ko: '회사소개', en: 'About' }}
        subtitle={{ ko: '세계를 잇는 신뢰의 항해, 오치상사', en: 'OCHI GLOBAL — a trusted voyage that connects the world' }}
      />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6">
        <section aria-labelledby="greeting">
          <SectionTitle id="greeting" eyebrow="Greeting" title={t({ ko: '인사말', en: 'Greeting' })} />
          <div className="grid items-center gap-8 md:grid-cols-[1fr_280px]">
            <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              {/* TODO(문구 확정): 대표님 인사말 초안입니다. 실제 문구로 교체해 주세요. */}
              <p>
                {t({
                  ko: '오치상사 홈페이지를 찾아주셔서 감사합니다.',
                  en: 'Thank you for visiting OCHI GLOBAL.',
                })}
              </p>
              <p>
                {t({
                  ko: '오치상사는 산업용 자석과 실리콘 등 원자재의 수입·납품, 해외 한인 사업자를 위한 국내 제품 소싱과 수출, 그리고 앱·홈페이지 제작과 SI/SM 인력 공급까지 고객의 비즈니스에 필요한 것을 정확하게 연결하는 일을 하고 있습니다.',
                  en: 'We import and supply raw materials such as industrial magnets and silicone, source and export Korean products for Korean-owned businesses overseas, and provide app and website development and SI/SM staffing.',
                })}
              </p>
              <p>
                {t({
                  ko: '규모보다 약속을 지키는 회사, 한 번 맺은 거래를 오래 이어가는 파트너가 되겠습니다.',
                  en: 'We aim to be a partner that keeps its promises and builds long-term relationships.',
                })}
              </p>
              <p className="font-semibold text-ochi-navy-800">
                {t({ ko: '오치상사', en: 'OCHI GLOBAL' })}
                {company.ceo && ` ${t({ ko: '대표', en: 'CEO' })} ${company.ceo}`}
              </p>
            </div>
            <img src={logoKr} alt={t({ ko: '오치상사 로고', en: 'OCHI logo' })} className="mx-auto w-56 rounded-lg shadow-md md:w-full" />
          </div>
        </section>

        <section aria-labelledby="overview">
          <SectionTitle id="overview" eyebrow="Overview" title={t({ ko: '회사개요', en: 'Company overview' })} />
          <div className="grid gap-8 md:grid-cols-[1fr_200px]">
            <table className="w-full border-t-2 border-ochi-navy-600 text-sm">
              <tbody>
                {overview.map((row) => (
                  <tr key={row.label.ko} className="border-b border-slate-200">
                    <th scope="row" className="w-36 bg-ochi-navy-50 px-4 py-3 text-left font-semibold text-ochi-navy-800 sm:w-44">
                      {t(row.label)}
                    </th>
                    <td className="px-4 py-3 text-slate-700">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <img src={emblem} alt={t({ ko: '오치상사 엠블럼', en: 'OCHI emblem' })} className="mx-auto w-40 object-contain md:w-full" />
          </div>
        </section>

        <section aria-labelledby="location">
          <SectionTitle id="location" eyebrow="Location" title={t({ ko: '오시는 길', en: 'Location' })} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded border border-slate-200 p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ochi-amber-500" aria-hidden="true" />
              <div>
                <div className="font-semibold text-ochi-navy-800">{t({ ko: '소재지', en: 'Address' })}</div>
                {mapQuery ? (
                  <a
                    href={naverMapUrl(mapQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm text-slate-600 underline-offset-4 hover:text-ochi-navy-500 hover:underline"
                  >
                    {address}
                  </a>
                ) : (
                  <div className="mt-1 text-sm text-slate-600">-</div>
                )}
                {hours && <div className="mt-1 text-xs text-slate-500">{hours}</div>}
                {mapQuery && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={naverMapUrl(mapQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded bg-[#03C75A] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                    >
                      {t({ ko: '네이버 지도', en: 'Naver Map' })} <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href={googleMapUrl(mapQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      {t({ ko: '구글 지도', en: 'Google Maps' })} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3 rounded border border-slate-200 p-5">
              <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-ochi-amber-500" aria-hidden="true" />
              <div>
                <div className="font-semibold text-ochi-navy-800">{t({ ko: '방문 상담은 사전 예약제', en: 'Visits by appointment' })}</div>
                <p className="mt-1 text-sm text-slate-600">
                  {t({
                    ko: '방문 상담을 원하시면 일정 조율을 위해 먼저 연락 주세요.',
                    en: 'Please contact us before visiting so we can arrange a time.',
                  })}
                </p>
                <Link to="/contact" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-ochi-navy-600 hover:text-ochi-navy-500">
                  {t({ ko: '상담 예약하기', en: 'Book a visit' })} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
