import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLang } from '../i18n/LanguageContext';

export default function NotFound() {
  const { t } = useLang();
  usePageMeta({ ko: '페이지를 찾을 수 없음', en: 'Page not found' }, { ko: '요청한 페이지가 없습니다.', en: 'The page you requested does not exist.' });

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="text-5xl font-bold text-ochi-navy-600">404</div>
      <p className="mt-4 text-slate-600">{t({ ko: '요청하신 페이지를 찾을 수 없습니다.', en: "We couldn't find that page." })}</p>
      <Link to="/" className="mt-6 inline-block rounded bg-ochi-navy-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ochi-navy-500">
        {t({ ko: '홈으로', en: 'Go home' })}
      </Link>
    </div>
  );
}
