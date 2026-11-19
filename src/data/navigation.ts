import type { L } from '../i18n/LanguageContext';
import { DIVISIONS } from './business';

export type NavChild = { to: string; label: L };
export type NavItem = { to: string; label: L; children: NavChild[] };

export const NAV: NavItem[] = [
  {
    to: '/about',
    label: { ko: '회사소개', en: 'About' },
    children: [
      { to: '/about#greeting', label: { ko: '인사말', en: 'Greeting' } },
      { to: '/about#overview', label: { ko: '회사개요', en: 'Overview' } },
      { to: '/about#location', label: { ko: '오시는 길', en: 'Location' } },
    ],
  },
  {
    to: '/business',
    label: { ko: '사업영역', en: 'Business' },
    children: DIVISIONS.map((d) => ({ to: `/business#${d.anchor}`, label: d.name })),
  },
  {
    to: '/notice',
    label: { ko: '공지사항', en: 'Notice' },
    children: [{ to: '/notice', label: { ko: '공지사항', en: 'Notice' } }],
  },
  {
    to: '/contact',
    label: { ko: '문의하기', en: 'Contact' },
    children: [{ to: '/contact', label: { ko: '견적·상담 문의', en: 'Quote & inquiry' } }],
  },
];

/** 홈 화면 서브바: 사업영역 바로가기 */
export const HOME_SUBNAV: NavChild[] = NAV[1].children;
