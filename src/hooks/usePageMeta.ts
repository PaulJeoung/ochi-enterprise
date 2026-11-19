import { useEffect } from 'react';
import { useLang, type L } from '../i18n/LanguageContext';

const SITE_NAME: L = { ko: '오치상사', en: 'OCHI GLOBAL' };

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** 페이지별 title / description / og 태그 갱신 */
export function usePageMeta(title: L | null, description: L) {
  const { t } = useLang();
  const homeTitle = t({ ko: '오치상사 | OCHI GLOBAL', en: 'OCHI GLOBAL | 오치상사' });
  const fullTitle = title ? `${t(title)} | ${t(SITE_NAME)}` : homeTitle;
  const desc = t(description);

  useEffect(() => {
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'name', 'description', desc);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc);
  }, [fullTitle, desc]);
}
