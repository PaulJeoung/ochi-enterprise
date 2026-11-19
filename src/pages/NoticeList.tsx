import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pin, Search } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { NOTICE_CATEGORY_LABEL } from '../data/noticeCategories';
import { useNotices } from '../features/notice/useNotices';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLang } from '../i18n/LanguageContext';
import { formatDate } from '../lib/date';
import { boardNotices, filterNotices, NOTICE_CATEGORIES } from '../lib/notices';
import type { NoticeCategory } from '../types/notice';

const PAGE_SIZE = 10;

export default function NoticeList() {
  const { t } = useLang();
  const { status, notices } = useNotices();
  const [category, setCategory] = useState<NoticeCategory | 'ALL'>('ALL');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  usePageMeta({ ko: '공지사항', en: 'Notice' }, { ko: '오치상사 공지사항', en: 'Announcements from OCHI GLOBAL.' });

  const filtered = useMemo(() => filterNotices(boardNotices(notices), category, query), [notices, category, query]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const tabs: { key: NoticeCategory | 'ALL'; label: string }[] = [
    { key: 'ALL', label: t({ ko: '전체', en: 'All' }) },
    ...NOTICE_CATEGORIES.map((c) => ({ key: c, label: t(NOTICE_CATEGORY_LABEL[c]) })),
  ];

  return (
    <>
      <PageHeader title={{ ko: '공지사항', en: 'Notice' }} subtitle={{ ko: '오치상사의 새로운 소식을 알려드립니다.', en: 'News and updates from OCHI GLOBAL.' }} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1" role="tablist" aria-label={t({ ko: '분류', en: 'Category' })}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={category === tab.key}
                onClick={() => {
                  setCategory(tab.key);
                  setPage(1);
                }}
                className={`rounded px-3 py-1.5 text-xs font-semibold ${
                  category === tab.key ? 'bg-ochi-navy-600 text-white' : 'text-slate-600 hover:bg-ochi-navy-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <label className="relative block sm:w-64">
            <span className="sr-only">{t({ ko: '검색', en: 'Search' })}</span>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={t({ ko: '제목 또는 내용 검색', en: 'Search title or content' })}
              className="w-full rounded border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-ochi-navy-500 focus:outline-none"
            />
          </label>
        </div>

        <div className="border-t-2 border-ochi-navy-600">
          <div className="hidden grid-cols-[80px_1fr_120px_110px] border-b border-slate-200 bg-ochi-navy-50 py-3 text-center text-xs font-semibold text-ochi-navy-800 sm:grid">
            <span>{t({ ko: '분류', en: 'Type' })}</span>
            <span>{t({ ko: '제목', en: 'Title' })}</span>
            <span>{t({ ko: '작성자', en: 'Author' })}</span>
            <span>{t({ ko: '등록일', en: 'Date' })}</span>
          </div>

          {status === 'loading' && <p className="py-16 text-center text-sm text-slate-400">{t({ ko: '불러오는 중…', en: 'Loading…' })}</p>}
          {status === 'error' && (
            <p className="py-16 text-center text-sm text-slate-500">
              {t({ ko: '공지사항을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.', en: "Couldn't load notices. Try again later." })}
            </p>
          )}
          {status === 'ready' && rows.length === 0 && (
            <p className="py-16 text-center text-sm text-slate-500">{t({ ko: '조건에 맞는 공지가 없습니다.', en: 'No matching notices.' })}</p>
          )}

          <ul>
            {rows.map((n) => (
              <li key={n.id} className="border-b border-slate-200">
                <Link
                  to={`/notice/${encodeURIComponent(n.id)}`}
                  className={`grid gap-1 px-2 py-3.5 text-sm hover:bg-ochi-navy-50/60 sm:grid-cols-[80px_1fr_120px_110px] sm:items-center sm:gap-0 sm:text-center ${
                    n.pinned ? 'bg-ochi-amber-50/50' : ''
                  }`}
                >
                  <span className="flex items-center gap-1 text-xs font-semibold text-ochi-navy-600 sm:justify-center">
                    {n.pinned && <Pin className="h-3.5 w-3.5 text-ochi-amber-600" aria-label={t({ ko: '고정', en: 'Pinned' })} />}
                    {t(NOTICE_CATEGORY_LABEL[n.category])}
                  </span>
                  <span className="truncate font-medium text-slate-800 sm:px-3 sm:text-left">{n.title}</span>
                  <span className="hidden text-xs text-slate-500 sm:block">{n.author}</span>
                  <span className="text-xs text-slate-400">{formatDate(n.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {totalPages > 1 && (
          <nav className="mt-6 flex items-center justify-center gap-1" aria-label={t({ ko: '페이지', en: 'Pages' })}>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              aria-label={t({ ko: '이전 페이지', en: 'Previous page' })}
              className="rounded p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === currentPage ? 'page' : undefined}
                className={`h-8 w-8 rounded text-sm ${p === currentPage ? 'bg-ochi-navy-600 font-semibold text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
              aria-label={t({ ko: '다음 페이지', en: 'Next page' })}
              className="rounded p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </>
  );
}
