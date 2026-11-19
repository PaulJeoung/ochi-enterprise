export type NoticeCategory = 'NOTICE' | 'MATERIAL' | 'SOURCING' | 'IT';

export type NoticeLink = {
  url: string;
  label: string;
};

export type NoticePopupConfig = {
  enabled: boolean;
  /** 노출 시작일 YYYY-MM-DD (포함, 한국시간) */
  start: string;
  /** 노출 종료일 YYYY-MM-DD (포함, 한국시간) */
  end: string;
  /** 숫자가 작을수록 먼저 노출 */
  priority: number;
  allowHideToday: boolean;
  allowHideForever: boolean;
};

export type Notice = {
  id: string;
  category: NoticeCategory;
  title: string;
  author: string;
  /** YYYY-MM-DD */
  date: string;
  content: string;
  visible: boolean;
  pinned: boolean;
  link?: NoticeLink;
  popup?: NoticePopupConfig;
};
