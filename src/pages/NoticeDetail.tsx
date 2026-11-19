import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ExternalLink, List } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SmartLink from '../components/ui/SmartLink';
import { NOTICE_CATEGORY_LABEL } from '../data/noticeCategories';
import { useNotices } from '../features/notice/useNotices';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLang } from '../i18n/LanguageContext';
import { formatDate } from '../lib/date';
import { hostOf, isInternalUrl } from '../lib/link';

export default function NoticeDetail() {
  const { t } = useLang();
  const { id } = useParams();
  const { status, notices } = useNotices();
  const notice = notices.find((n) => n.id === id && n.visible);

  usePageMeta(
    notice ? { ko: notice.title, en: notice.title } : { ko: '공지사항', en: 'Notice' },
    notice ? { ko: notice.content.slice(0, 120), en: notice.content.slice(0, 120) } : { ko: '오치상사 공지사항', en: 'OCHI GLOBAL notice' },
  );

  return (
    <>
      <PageHeader title={{ ko: '공지사항', en: 'Notice' }} subtitle={{ ko: '오치상사의 새로운 소식을 알려드립니다.', en: 'News and updates from OCHI GLOBAL.' }} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {status === 'loading' && <p className="py-16 text-center text-sm text-slate-400">{t({ ko: '불러오는 중…', en: 'Loading…' })}</p>}

        {status !== 'loading' && !notice && (
          <div className="py-16 text-center">
            <p className="text-sm text-slate-500">{t({ ko: '해당 공지를 찾을 수 없습니다.', en: "We couldn't find that notice." })}</p>
          </div>
        )}

        {notice && (
          <article className="border-t-2 border-ochi-navy-600">
            <header className="border-b border-slate-200 px-2 py-5">
              <span className="text-xs font-semibold text-ochi-amber-600">{t(NOTICE_CATEGORY_LABEL[notice.category])}</span>
              <h2 className="mt-1 text-xl font-bold leading-snug text-ochi-navy-800">{notice.title}</h2>
              <p className="mt-2 text-xs text-slate-400">
                {notice.author} · {formatDate(notice.date)}
              </p>
            </header>
            <div className="min-h-[160px] whitespace-pre-line px-2 py-8 text-sm leading-relaxed text-slate-700 sm:text-base">{notice.content}</div>
            {notice.link && (
              <div className="px-2 pb-8">
                <SmartLink
                  href={notice.link.url}
                  className="inline-flex items-center gap-2 rounded bg-ochi-amber-500 px-5 py-2.5 text-sm font-semibold text-ochi-amber-900 hover:bg-ochi-amber-400"
                >
                  {notice.link.label}
                  {isInternalUrl(notice.link.url) ? <ArrowRight className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                </SmartLink>
                {!isInternalUrl(notice.link.url) && (
                  <p className="mt-2 text-xs text-slate-400">{t({ ko: '새 창에서 열립니다', en: 'Opens in a new tab' })}{hostOf(notice.link.url) && ` · ${hostOf(notice.link.url)}`}</p>
                )}
              </div>
            )}
          </article>
        )}

        <div className="mt-6 flex justify-center border-t border-slate-200 pt-6">
          <Link to="/notice" className="inline-flex items-center gap-2 rounded border border-slate-300 px-5 py-2 text-sm text-slate-700 hover:bg-slate-50">
            <List className="h-4 w-4" /> {t({ ko: '목록으로', en: 'Back to list' })}
          </Link>
        </div>
      </div>
    </>
  );
}
