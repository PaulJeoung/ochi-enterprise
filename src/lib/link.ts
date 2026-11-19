/** '/'로 시작하면 사이트 내부 경로 */
export const isInternalUrl = (url: string): boolean => url.startsWith('/') && !url.startsWith('//');

/** 외부 URL의 도메인 (형식이 잘못되면 빈 문자열) */
export const hostOf = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
};

/** 주소 검색 결과로 여는 지도 링크 */
export const naverMapUrl = (address: string): string => `https://map.naver.com/p/search/${encodeURIComponent(address)}`;
export const googleMapUrl = (address: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

/** "010-1234-5678" → "tel:01012345678" */
export const telHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`;
