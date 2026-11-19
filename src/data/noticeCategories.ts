import type { L } from '../i18n/LanguageContext';
import type { NoticeCategory } from '../types/notice';

export const NOTICE_CATEGORY_LABEL: Record<NoticeCategory, L> = {
  NOTICE: { ko: '공지', en: 'Notice' },
  MATERIAL: { ko: '원자재', en: 'Materials' },
  SOURCING: { ko: '소싱', en: 'Sourcing' },
  IT: { ko: 'IT', en: 'IT' },
};
