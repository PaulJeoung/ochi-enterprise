import { useSearchParams } from 'react-router-dom';
import { Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import ContactForm from '../features/contact/ContactForm';
import { useSite } from '../features/site/SiteContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLang } from '../i18n/LanguageContext';
import { telHref } from '../lib/link';

export default function Contact() {
  const { t, lang } = useLang();
  const { contact, channels } = useSite();
  const [params] = useSearchParams();

  usePageMeta(
    { ko: '문의하기', en: 'Contact' },
    { ko: '자석·소재, 국내 제품 소싱, 앱·홈페이지·IT 인력 견적과 상담을 온라인으로 문의하세요.', en: 'Request a quote for materials, sourcing, or IT services online.' },
  );

  const hours = lang === 'ko' ? contact.hoursKo : contact.hoursEn;
  const address = lang === 'ko' ? contact.addressKo : contact.addressEn;
  const infos = [
    contact.phone && { icon: Phone, label: t({ ko: '전화', en: 'Phone' }), value: contact.phone, href: telHref(contact.phone) },
    contact.email && { icon: Mail, label: t({ ko: '이메일', en: 'Email' }), value: contact.email, href: `mailto:${contact.email}` },
    channels.kakao && { icon: MessageCircle, label: t({ ko: '카카오톡', en: 'KakaoTalk' }), value: t({ ko: '채널 상담하기', en: 'Chat with us' }), href: channels.kakao },
    hours && { icon: Clock, label: t({ ko: '상담 시간', en: 'Hours' }), value: hours, href: '' },
    address && { icon: MapPin, label: t({ ko: '소재지', en: 'Address' }), value: address, href: '' },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href: string }[];

  return (
    <>
      <PageHeader
        title={{ ko: '문의하기', en: 'Contact' }}
        subtitle={{ ko: '문의 분야를 선택하고 내용을 남겨 주시면 확인 후 빠르게 회신드립니다.', en: "Choose a category and leave a message. We'll reply soon." }}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          <div className="bg-ochi-navy-800 p-6 text-white">
            <div className="font-serif text-xl text-ochi-gold">OCHI GLOBAL</div>
            <div className="my-3 h-0.5 w-8 bg-ochi-amber-500" />
            <ul className="space-y-4 text-sm">
              {infos.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ochi-amber-400" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-ochi-navy-200">{label}</div>
                    {href ? (
                      <a href={href} className="hover:text-ochi-amber-400" {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        {value}
                      </a>
                    ) : (
                      <div>{value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-start gap-3 border border-slate-200 p-4 text-xs leading-relaxed text-slate-600">
            <ShieldCheck className="h-5 w-5 shrink-0 text-ochi-navy-500" aria-hidden="true" />
            {t({
              ko: '보내주신 도면·사양·사업 정보는 견적 목적 외에 사용하지 않으며, 필요 시 NDA(비밀유지계약) 체결 후 진행합니다.',
              en: 'Drawings, specs, and business details you share are used only for quoting. NDAs are available on request.',
            })}
          </div>
        </aside>

        <section aria-label={t({ ko: '문의 양식', en: 'Inquiry form' })}>
          <h2 className="mb-6 text-xl font-bold text-ochi-navy-800">{t({ ko: '온라인 견적·상담 신청', en: 'Online quote request' })}</h2>
          <ContactForm initialDivision={params.get('division')} />
        </section>
      </div>
    </>
  );
}
