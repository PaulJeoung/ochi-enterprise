import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLang, type L } from '../../i18n/LanguageContext';

type Props = { title: L; subtitle: L };

/** 서브 페이지 상단 배너 */
export default function PageHeader({ title, subtitle }: Props) {
  const { t } = useLang();
  return (
    <div className="border-b border-ochi-navy-100 bg-ochi-navy-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <nav aria-label="breadcrumb" className="mb-3 flex items-center gap-1 text-xs text-slate-500">
          <Link to="/" className="flex items-center hover:text-ochi-navy-600" aria-label={t({ ko: '홈', en: 'Home' })}>
            <Home className="h-3.5 w-3.5" />
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <span className="text-ochi-navy-600">{t(title)}</span>
        </nav>
        <h1 className="text-2xl font-bold text-ochi-navy-800 sm:text-3xl">{t(title)}</h1>
        <div className="mt-3 h-0.5 w-10 bg-ochi-amber-500" />
        <p className="mt-3 text-sm text-slate-600 sm:text-base">{t(subtitle)}</p>
      </div>
    </div>
  );
}
