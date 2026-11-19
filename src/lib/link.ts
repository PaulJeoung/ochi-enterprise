/** '/'로 시작하면 사이트 내부 경로 */
export const isInternalUrl = (url: string): boolean => url.startsWith('/') && !url.startsWith('//');

/** "010-1234-5678" → "tel:01012345678" */
export const telHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`;
