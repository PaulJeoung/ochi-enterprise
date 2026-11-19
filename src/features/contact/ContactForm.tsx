import { useEffect, useId, useState, type FormEvent, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { DIVISIONS, findDivision, type DivisionKey } from '../../data/business';
import { DETAIL_FIELDS } from '../../data/contactFields';
import { useLang } from '../../i18n/LanguageContext';
import { EmailConfigError, sendInquiry } from '../../services/email';

type FormState = {
  company: string;
  name: string;
  email: string;
  phone: string;
  content: string;
  details: Record<string, string>;
  consent: boolean;
  /** 스팸 봇 차단용 숨김 필드. 사람이 입력할 일이 없음 */
  website: string;
};

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'content' | 'consent', string>>;
type Result = { type: 'success' | 'error'; message: string } | null;

const EMPTY: FormState = { company: '', name: '', email: '', phone: '', content: '', details: {}, consent: false, website: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-()\s]{8,20}$/;

const inputClass =
  'w-full rounded border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-ochi-navy-500 focus:outline-none focus:ring-2 focus:ring-ochi-navy-100';

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-ochi-amber-600">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ initialDivision }: { initialDivision?: string | null }) {
  const { t } = useLang();
  const uid = useId();
  const [division, setDivision] = useState<DivisionKey>(findDivision(initialDivision)?.key ?? 'MATERIAL');
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result>(null);

  useEffect(() => {
    const found = findDivision(initialDivision);
    if (found) setDivision(found.key);
  }, [initialDivision]);

  const id = (name: string) => `${uid}-${name}`;
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key as keyof Errors]: undefined }));
  };
  const errorProps = (name: keyof Errors) =>
    errors[name] ? { 'aria-invalid': true, 'aria-describedby': `${id(name)}-error` } : {};

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = t({ ko: '담당자 성함을 입력해 주세요.', en: 'Enter your name.' });
    if (!EMAIL_RE.test(form.email.trim())) e.email = t({ ko: '올바른 이메일 주소를 입력해 주세요.', en: 'Enter a valid email address.' });
    if (!PHONE_RE.test(form.phone.trim())) e.phone = t({ ko: '연락처를 확인해 주세요. (예: 010-1234-5678)', en: 'Check your phone number.' });
    if (!form.content.trim()) e.content = t({ ko: '문의 내용을 입력해 주세요.', en: 'Enter your message.' });
    if (!form.consent) e.consent = t({ ko: '개인정보 수집·이용에 동의해 주세요.', en: 'Agree to the privacy notice to continue.' });
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setResult(null);
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(id(first))?.focus();
      return;
    }

    // 봇이 숨김 필드를 채운 경우: 발송하지 않고 성공처럼 처리
    if (form.website) {
      setResult({ type: 'success', message: t({ ko: '문의가 접수되었습니다.', en: 'Your inquiry has been sent.' }) });
      setForm(EMPTY);
      return;
    }

    const divisionInfo = findDivision(division)!;
    const detailType =
      DETAIL_FIELDS[division]
        .filter((f) => form.details[f.name]?.trim())
        .map((f) => `${f.label.ko}: ${form.details[f.name].trim()}`)
        .join(' / ') || '미지정';

    setSubmitting(true);
    try {
      await sendInquiry({
        division: divisionInfo.name.ko,
        company: form.company.trim() || '(개인/미기재)',
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        detailType,
        content: form.content.trim(),
      });
      setForm(EMPTY);
      setResult({
        type: 'success',
        message: t({
          ko: '문의가 접수되었습니다. 확인 후 빠르게 연락드리겠습니다.',
          en: "Your inquiry has been sent. We'll get back to you soon.",
        }),
      });
    } catch (err) {
      console.error('문의 메일 발송 실패:', err);
      setResult({
        type: 'error',
        message:
          err instanceof EmailConfigError
            ? t({ ko: '메일 발송 설정이 아직 완료되지 않았습니다. 전화 또는 이메일로 문의해 주세요.', en: "Online inquiries aren't set up yet. Contact us by phone or email." })
            : t({ ko: '발송 중 문제가 생겼습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.', en: "Couldn't send your inquiry. Try again later or call us." }),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-xs font-semibold text-slate-700">
          {t({ ko: '문의 분야', en: 'Inquiry type' })}
          <span className="ml-0.5 text-ochi-amber-600">*</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {DIVISIONS.map(({ key, name, icon: Icon }) => (
            <label
              key={key}
              className={`flex cursor-pointer items-center gap-2 rounded border px-3 py-2.5 text-sm font-semibold transition ${
                division === key ? 'border-ochi-navy-600 bg-ochi-navy-600 text-white' : 'border-slate-300 text-slate-600 hover:border-ochi-navy-500'
              }`}
            >
              <input type="radio" name="division" value={key} checked={division === key} onChange={() => setDivision(key)} className="sr-only" />
              <Icon className="h-4 w-4" aria-hidden="true" />
              {t(name)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={id('company')} label={t({ ko: '회사명 / 상호', en: 'Company' })}>
          <input id={id('company')} className={inputClass} value={form.company} onChange={(e) => set('company', e.target.value)} placeholder={t({ ko: '(주)오치파트너스', en: 'OCHI Partners Inc.' })} autoComplete="organization" />
        </Field>
        <Field id={id('name')} label={t({ ko: '담당자 성함 / 직함', en: 'Name / title' })} required error={errors.name}>
          <input id={id('name')} className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder={t({ ko: '홍길동 팀장', en: 'Jane Kim, Manager' })} autoComplete="name" {...errorProps('name')} />
        </Field>
        <Field id={id('email')} label={t({ ko: '회신 이메일', en: 'Email' })} required error={errors.email}>
          <input id={id('email')} type="email" className={inputClass} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="buyer@company.com" autoComplete="email" {...errorProps('email')} />
        </Field>
        <Field id={id('phone')} label={t({ ko: '연락처', en: 'Phone' })} required error={errors.phone}>
          <input id={id('phone')} type="tel" className={inputClass} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="010-0000-0000" autoComplete="tel" {...errorProps('phone')} />
        </Field>
      </div>

      <div className="rounded border border-ochi-navy-100 bg-ochi-navy-50/60 p-4">
        <div className="mb-3 text-xs font-semibold text-ochi-navy-800">
          {t({ ko: '세부 견적 정보 (선택)', en: 'Quote details (optional)' })}
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {DETAIL_FIELDS[division].map((f) => (
            <Field key={`${division}-${f.name}`} id={id(`detail-${f.name}`)} label={t(f.label)}>
              <input
                id={id(`detail-${f.name}`)}
                className={`${inputClass} bg-white`}
                value={form.details[f.name] ?? ''}
                onChange={(e) => set('details', { ...form.details, [f.name]: e.target.value })}
                placeholder={t(f.placeholder)}
              />
            </Field>
          ))}
        </div>
      </div>

      <Field id={id('content')} label={t({ ko: '문의 내용 (요구 사양, 납기, 예산 등)', en: 'Message (specs, timeline, budget)' })} required error={errors.content}>
        <textarea
          id={id('content')}
          rows={6}
          className={`${inputClass} resize-y`}
          value={form.content}
          onChange={(e) => set('content', e.target.value)}
          placeholder={t({ ko: '필요한 사양, 희망 납기, 예산 범위 등을 적어 주시면 더 정확한 견적이 가능합니다.', en: 'Share specs, delivery dates, and budget for a more accurate quote.' })}
          {...errorProps('content')}
        />
      </Field>

      {/* 스팸 봇 차단용 숨김 필드 */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} />
        </label>
      </div>

      <div className="rounded border border-slate-200 p-4">
        <div className="text-xs font-semibold text-slate-700">{t({ ko: '개인정보 수집·이용 안내', en: 'Privacy notice' })}</div>
        <ul className="mt-2 space-y-0.5 text-xs leading-relaxed text-slate-500">
          <li>{t({ ko: '· 수집 항목: 회사명, 성함/직함, 이메일, 연락처, 문의 내용', en: '· Collected: company, name/title, email, phone, message' })}</li>
          <li>{t({ ko: '· 이용 목적: 견적·상담 문의 회신 및 응대', en: '· Purpose: replying to your quote or inquiry' })}</li>
          <li>{t({ ko: '· 보유 기간: 문의 처리 완료 후 1년 이내 파기', en: '· Retention: deleted within 1 year after the inquiry is handled' })}</li>
          <li>{t({ ko: '· 동의를 거부할 수 있으나, 거부 시 온라인 문의 접수가 제한됩니다.', en: '· You may decline, but we then cannot accept your online inquiry.' })}</li>
        </ul>
        <label htmlFor={id('consent')} className="mt-3 flex items-center gap-2 text-sm text-slate-700">
          <input id={id('consent')} type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} className="h-4 w-4 accent-ochi-navy-600" {...errorProps('consent')} />
          {t({ ko: '개인정보 수집·이용에 동의합니다. (필수)', en: 'I agree to the privacy notice. (required)' })}
        </label>
        {errors.consent && (
          <p id={`${id('consent')}-error`} className="mt-1 text-xs text-red-600">
            {errors.consent}
          </p>
        )}
      </div>

      {result && (
        <div
          role={result.type === 'error' ? 'alert' : 'status'}
          className={`flex items-start gap-2 rounded p-4 text-sm ${
            result.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'
          }`}
        >
          {result.type === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
          {result.message}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded bg-ochi-amber-500 py-3.5 text-sm font-bold text-ochi-amber-900 transition hover:bg-ochi-amber-400 disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitting ? t({ ko: '보내는 중…', en: 'Sending…' }) : t({ ko: '견적·상담 문의 보내기', en: 'Send inquiry' })}
      </button>
    </form>
  );
}
