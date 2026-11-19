import type { L } from '../i18n/LanguageContext';
import type { DivisionKey } from './business';

export type DetailField = {
  name: string;
  label: L;
  placeholder: L;
};

/** 사업부별 세부 견적 항목 (선택 입력). 메일에는 detailType으로 합쳐서 전송 */
export const DETAIL_FIELDS: Record<DivisionKey, DetailField[]> = {
  MATERIAL: [
    { name: 'type', label: { ko: '품목', en: 'Item' }, placeholder: { ko: '네오디뮴 맥세이프 / 페라이트 / 실리콘', en: 'Neodymium MagSafe / ferrite / silicone' } },
    { name: 'spec', label: { ko: '규격·등급', en: 'Spec / grade' }, placeholder: { ko: '예: 링 OD54*ID46*0.8T, N52', en: 'e.g. Ring OD54*ID46*0.8T, N52' } },
    { name: 'quantity', label: { ko: '수량', en: 'Quantity' }, placeholder: { ko: '예: 10,000개', en: 'e.g. 10,000 pcs' } },
  ],
  SOURCING: [
    { name: 'items', label: { ko: '품목', en: 'Items' }, placeholder: { ko: '예: 마카롱 프리믹스, 쿠키박스', en: 'e.g. macaron premix, cookie boxes' } },
    { name: 'quantity', label: { ko: '수량', en: 'Quantity' }, placeholder: { ko: '예: 월 200kg', en: 'e.g. 200 kg per month' } },
    { name: 'destination', label: { ko: '도착 국가·도시', en: 'Destination' }, placeholder: { ko: '예: 미국 LA', en: 'e.g. Los Angeles, US' } },
  ],
  IT: [
    { name: 'type', label: { ko: '문의 유형', en: 'Request type' }, placeholder: { ko: '앱 제작 / 홈페이지 제작 / SI·SM 인력', en: 'App / website / SI·SM staffing' } },
    { name: 'budget', label: { ko: '예산', en: 'Budget' }, placeholder: { ko: '예: 500만 원 내외', en: 'e.g. around 5M KRW' } },
    { name: 'schedule', label: { ko: '희망 일정', en: 'Timeline' }, placeholder: { ko: '예: 3월 오픈 희망', en: 'e.g. launch in March' } },
  ],
};
