import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { SiteConfig } from '../../types/site';
import { fetchDataJson } from '../../lib/fetchJson';
import { SITE_DEFAULTS } from './siteDefaults';

const SiteContext = createContext<SiteConfig>(SITE_DEFAULTS);

/** 기본값 구조에 맞춰 문자열 값만 덮어씀 (오타·잘못된 타입은 무시) */
function mergeSite(raw: unknown): SiteConfig {
  if (typeof raw !== 'object' || raw === null) return SITE_DEFAULTS;
  const source = raw as Record<string, Record<string, unknown> | undefined>;
  const merged = structuredClone(SITE_DEFAULTS) as Record<string, Record<string, string>>;

  for (const section of Object.keys(merged)) {
    const values = source[section];
    if (typeof values !== 'object' || values === null) continue;
    for (const key of Object.keys(merged[section])) {
      const v = values[key];
      if (typeof v === 'string') merged[section][key] = v.trim();
    }
  }
  return merged as unknown as SiteConfig;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SiteConfig>(SITE_DEFAULTS);

  useEffect(() => {
    let alive = true;
    fetchDataJson('site.json')
      .then((raw) => alive && setSite(mergeSite(raw)))
      .catch((err) => console.error('[site.json]', err));
    return () => {
      alive = false;
    };
  }, []);

  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export const useSite = (): SiteConfig => useContext(SiteContext);
