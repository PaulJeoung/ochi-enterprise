import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Megaphone, X } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import SmartLink from '../../components/ui/SmartLink';
import { NOTICE_CATEGORY_LABEL } from '../../data/noticeCategories';
import { useLang } from '../../i18n/LanguageContext';
import { formatDate, todayKST } from '../../lib/date';
import { activePopups } from '../../lib/notices';
import { hidePopup, isPopupHidden } from '../../lib/popupStorage';
import type { Notice } from '../../types/notice';
import { useNotices } from './useNotices';

/** notices.json의 popup 설정에 따라 접속 시 공지 팝업 표시 (여러 개면 넘겨보기) */
export default function NoticePopup() {
  const { t } = useLang();
  const { status, notices } = useNotices();
  const [queue, setQueue] = useState<Notice[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (status !== 'ready') return;
    const today = todayKST();
    setQueue(activePopups(notices, today, (id) => isPopupHidden(id, today)));
    setIndex(0);
  }, [status, notices]);

  const current = queue[index];
  if (!current?.popup) return null;
  const popup = current.popup;

  /** 현재 공지를 목록에서 빼고 다음 공지로 */
  const dismissCurrent = (hide?: 'TODAY' | 'NEVER') => {
    if (hide) hidePopup(current.id, hide, todayKST());
    const next = queue.filter((n) => n.id !== current.id);
    setQueue(next);
    setIndex((i) => Math.min(i, Math.max(next.length - 1, 0)));
  };
  const closeAll = () => setQueue([]);

  return (
    <Modal open onClose={closeAll} labelledBy="notice-popup-title">
      <div className="flex items-center justify-between bg-ochi-navy-800 px-5 py-3 text-white">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-ochi-navy-100">
          <Megaphone className="h-4 w-4 text-ochi-amber-400" aria-hidden="true" />
          {t({ ko: '알림', en: 'Announcement' })}
          {queue.length > 1 && (
            <span className="ml-1 text-ochi-navy-200">
              {index + 1} / {queue.length}
            </span>
          )}
        </div>
        <button type="button" onClick={closeAll} aria-label={t({ ko: '닫기', en: 'Close' })} className="p-1 text-ochi-navy-100 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <span className="inline-block rounded bg-ochi-amber-50 px-2 py-0.5 text-xs font-semibold text-ochi-amber-900">
          {t(NOTICE_CATEGORY_LABEL[current.category])}
        </span>
        <h2 id="notice-popup-title" className="mt-2 text-lg font-bold leading-snug text-ochi-navy-800">
          {current.title}
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          {formatDate(current.date)} · {current.author}
        </p>
        <div className="mt-4 max-h-60 overflow-y-auto whitespace-pre-line rounded border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
          {current.content}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {current.link && (
            <SmartLink
              href={current.link.url}
              onClick={closeAll}
              className="rounded bg-ochi-amber-500 px-4 py-2 text-xs font-semibold text-ochi-amber-900 hover:bg-ochi-amber-400"
            >
              {current.link.label}
            </SmartLink>
          )}
          {current.visible && (
            <Link
              to={`/notice/${encodeURIComponent(current.id)}`}
              onClick={closeAll}
              className="rounded border border-ochi-navy-100 px-4 py-2 text-xs font-semibold text-ochi-navy-600 hover:bg-ochi-navy-50"
            >
              {t({ ko: '공지 자세히 보기', en: 'View notice' })}
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs">
        <div className="flex items-center gap-3 text-slate-600">
          {popup.allowHideToday && (
            <button type="button" onClick={() => dismissCurrent('TODAY')} className="underline underline-offset-4 hover:text-ochi-navy-600">
              {t({ ko: '오늘 하루 보지 않기', en: "Don't show today" })}
            </button>
          )}
          {popup.allowHideForever && (
            <button type="button" onClick={() => dismissCurrent('NEVER')} className="underline underline-offset-4 hover:text-ochi-navy-600">
              {t({ ko: '다시 보지 않기', en: "Don't show again" })}
            </button>
          )}
        </div>
        <div className="ml-auto flex items-center gap-1">
          {queue.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + queue.length) % queue.length)}
                aria-label={t({ ko: '이전 알림', en: 'Previous' })}
                className="rounded p-1.5 text-slate-500 hover:bg-slate-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % queue.length)}
                aria-label={t({ ko: '다음 알림', en: 'Next' })}
                className="rounded p-1.5 text-slate-500 hover:bg-slate-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
          <button type="button" onClick={() => dismissCurrent()} className="rounded bg-ochi-navy-800 px-4 py-1.5 font-semibold text-white hover:bg-ochi-navy-600">
            {t({ ko: '닫기', en: 'Close' })}
          </button>
        </div>
      </div>
    </Modal>
  );
}
