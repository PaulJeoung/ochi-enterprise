import type { Notice, NoticeCategory, NoticePopupConfig } from '../types/notice';
import { isValidDate } from './date';

export const NOTICE_CATEGORIES: NoticeCategory[] = ['NOTICE', 'MATERIAL', 'SOURCING', 'IT'];

type Raw = Record<string, unknown>;

const isObject = (v: unknown): v is Raw => typeof v === 'object' && v !== null && !Array.isArray(v);
const text = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');
const flag = (v: unknown, fallback: boolean): boolean => (typeof v === 'boolean' ? v : fallback);

function warn(where: string, message: string) {
  console.warn(`[notices.json] ${where}: ${message} → 이 항목은 건너뜁니다.`);
}

function parsePopup(raw: unknown, id: string): NoticePopupConfig | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (!isObject(raw)) {
    warn(id, 'popup은 객체여야 합니다');
    return undefined;
  }
  const start = text(raw.start);
  const end = text(raw.end);
  if (!isValidDate(start) || !isValidDate(end) || start > end) {
    warn(id, `popup.start/end 날짜가 잘못되었습니다 (start: "${start}", end: "${end}")`);
    return undefined;
  }
  return {
    enabled: flag(raw.enabled, false),
    start,
    end,
    priority: typeof raw.priority === 'number' ? raw.priority : 99,
    allowHideToday: flag(raw.allowHideToday, true),
    allowHideForever: flag(raw.allowHideForever, true),
  };
}

function parseNotice(raw: unknown, index: number): Notice | null {
  const where = `notices[${index}]`;
  if (!isObject(raw)) {
    warn(where, '객체 형식이 아닙니다');
    return null;
  }

  const id = text(raw.id);
  const title = text(raw.title);
  const date = text(raw.date);
  const category = text(raw.category) as NoticeCategory;

  const error = !id
    ? 'id가 비어 있습니다'
    : !title
      ? 'title이 비어 있습니다'
      : !isValidDate(date)
        ? `date 형식이 잘못되었습니다 ("${date}", 예: 2026-11-20)`
        : !NOTICE_CATEGORIES.includes(category)
          ? `category는 ${NOTICE_CATEGORIES.join(', ')} 중 하나여야 합니다`
          : null;
  if (error) {
    warn(id || where, error);
    return null;
  }

  const link =
    isObject(raw.link) && text(raw.link.url)
      ? { url: text(raw.link.url), label: text(raw.link.label) || '바로가기' }
      : undefined;

  return {
    id,
    category,
    title,
    author: text(raw.author) || '오치상사',
    date,
    content: typeof raw.content === 'string' ? raw.content : '',
    visible: flag(raw.visible, true),
    pinned: flag(raw.pinned, false),
    link,
    popup: parsePopup(raw.popup, id),
  };
}

/** notices.json 내용을 검증해 올바른 항목만 반환. id가 중복되면 처음 것만 사용 */
export function parseNotices(data: unknown): Notice[] {
  const list = isObject(data) && Array.isArray(data.notices) ? data.notices : Array.isArray(data) ? data : null;
  if (!list) {
    console.warn('[notices.json] 최상위에 "notices" 배열이 없습니다.');
    return [];
  }

  const seen = new Set<string>();
  const result: Notice[] = [];
  list.forEach((raw, i) => {
    const notice = parseNotice(raw, i);
    if (!notice) return;
    if (seen.has(notice.id)) {
      warn(notice.id, 'id가 중복되었습니다');
      return;
    }
    seen.add(notice.id);
    result.push(notice);
  });
  return result;
}

/** 게시판용: visible만, 고정글 먼저, 그다음 최신순 */
export function boardNotices(notices: Notice[]): Notice[] {
  return notices
    .filter((n) => n.visible)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date));
}

export function filterNotices(notices: Notice[], category: NoticeCategory | 'ALL', query: string): Notice[] {
  const q = query.trim().toLowerCase();
  return notices.filter(
    (n) =>
      (category === 'ALL' || n.category === category) &&
      (!q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)),
  );
}

/** 오늘 노출할 팝업: enabled + 기간 내 + 사용자가 숨기지 않음. priority 오름차순, 같으면 최신순 */
export function activePopups(notices: Notice[], today: string, isHidden: (id: string) => boolean): Notice[] {
  return notices
    .filter((n) => n.popup?.enabled && n.popup.start <= today && today <= n.popup.end && !isHidden(n.id))
    .sort((a, b) => (a.popup!.priority - b.popup!.priority) || b.date.localeCompare(a.date));
}
