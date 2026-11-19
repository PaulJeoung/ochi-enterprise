import type { SiteConfig } from '../../types/site';

/** site.json을 불러오기 전/실패 시 사용하는 기본값. 실제 값은 public/data/site.json에서 수정 */
export const SITE_DEFAULTS: SiteConfig = {
  company: { nameKo: '오치상사', nameEn: 'OCHI GLOBAL', ceo: '', established: '' },
  registration: { businessNo: '', mailOrderNo: '', exporterNo: '' },
  contact: { phone: '', email: '', hoursKo: '', hoursEn: '', addressKo: '', addressEn: '' },
  channels: { kakao: '', youtube: '', instagram: '', blog: '', playStore: '' },
};
