import { Cpu, Magnet, Package, type LucideIcon } from 'lucide-react';
import type { L } from '../i18n/LanguageContext';
import type { PhotoKey } from './photos';

export type DivisionKey = 'MATERIAL' | 'SOURCING' | 'IT';

export type Division = {
  key: DivisionKey;
  /** /business#anchor */
  anchor: string;
  icon: LucideIcon;
  photo: PhotoKey;
  name: L;
  tagline: L;
  description: L;
  items: { title: L; desc: L }[];
  strengths: L[];
  cta: L;
};

export const DIVISIONS: Division[] = [
  {
    key: 'MATERIAL',
    anchor: 'material',
    icon: Magnet,
    photo: 'magnet',
    name: { ko: '원자재 수입·납품', en: 'Raw Materials' },
    tagline: { ko: '마그넷 · 실리콘 소재 수입 및 납품', en: 'Magnet and silicone import and supply' },
    description: {
      ko: '네오디뮴 맥세이프 자석, 모터용 페라이트 자석 등 산업용 자석과 실리콘 소재를 해외 제조 네트워크를 통해 수입하여 필요한 규격과 수량으로 납품합니다.',
      en: 'We import industrial magnets such as neodymium MagSafe magnets and ferrite motor magnets, along with silicone materials, and supply them in the specs and volumes you need.',
    },
    items: [
      {
        title: { ko: '네오디뮴 맥세이프 자석', en: 'Neodymium MagSafe magnets' },
        desc: { ko: '맥세이프 액세서리용 링·원형 자석 수입/공급', en: 'Ring and disc magnets for MagSafe accessories' },
      },
      {
        title: { ko: '모터용 페라이트 자석', en: 'Ferrite motor magnets' },
        desc: { ko: '모터·센서용 세그먼트·아크 페라이트 수입/공급', en: 'Segment and arc ferrite magnets for motors and sensors' },
      },
      {
        title: { ko: '실리콘 소재', en: 'Silicone materials' },
        desc: { ko: '규격 및 도면 기반 실리콘 소재·부품 공급', en: 'Silicone materials and parts made to spec or drawing' },
      },
    ],
    strengths: [
      { ko: '도면·규격 기반 맞춤 사양 대응', en: 'Custom specs based on your drawings' },
      { ko: 'RoHS / REACH 유해물질 규격 확인', en: 'RoHS / REACH compliance checks' },
      { ko: '소량 샘플부터 양산 물량까지', en: 'From small samples to mass production' },
      { ko: '표면 처리(Ni, Zn 코팅) 옵션 협의', en: 'Surface coating options (Ni, Zn)' },
    ],
    cta: { ko: '자석·소재 견적 문의', en: 'Request a materials quote' },
  },
  {
    key: 'SOURCING',
    anchor: 'sourcing',
    icon: Package,
    photo: 'bakery',
    name: { ko: '국내 제품 소싱', en: 'Product Sourcing' },
    tagline: { ko: '한인 사업자를 위한 국내 제품 소싱·수출', en: 'Korean product sourcing for Korean-owned businesses abroad' },
    description: {
      ko: '해외 한인 사업자분들이 필요로 하는 국내 제품을 찾아 연결하고, 카페·베이커리 부자재를 수출·공급합니다.',
      en: 'We find and connect Korean products for Korean-owned businesses overseas, and export café and bakery supplies.',
    },
    items: [
      {
        title: { ko: '카페·베이커리 부자재', en: 'Café and bakery supplies' },
        desc: { ko: '프리믹스, 파우더, 토핑, 시럽 등 원부자재', en: 'Premixes, powders, toppings, syrups, and more' },
      },
      {
        title: { ko: '포장·패키징', en: 'Packaging' },
        desc: { ko: '쿠키박스 등 베이커리 전용 포장재', en: 'Cookie boxes and other bakery packaging' },
      },
      {
        title: { ko: '국내 제품 소싱 대행', en: 'Sourcing on request' },
        desc: { ko: '요청 품목의 국내 공급처 탐색 및 구매', en: 'Finding and purchasing Korean suppliers for your items' },
      },
    ],
    strengths: [
      { ko: '한국 → 미국 수출 물류 연계', en: 'Export logistics from Korea to the US' },
      { ko: '원산지·위생 관련 서류 준비 지원', en: 'Help with origin and hygiene documents' },
      { ko: '매장 규모에 맞춘 소분·혼적 대응', en: 'Split and consolidated shipments for your store size' },
      { ko: '한국어로 편하게 상담', en: 'Consultation in Korean or English' },
    ],
    cta: { ko: '소싱·수출 문의', en: 'Ask about sourcing' },
  },
  {
    key: 'IT',
    anchor: 'it',
    icon: Cpu,
    photo: 'it',
    name: { ko: 'IT 공급·운영', en: 'IT Services' },
    tagline: { ko: '앱·홈페이지 제작과 SI/SM 인력 공급', en: 'App and website development, SI/SM staffing' },
    description: {
      ko: '소상공인·중소기업을 위한 앱과 홈페이지를 제작하고, SW 기업에 필요한 SI/SM 개발 인력을 소싱·공급합니다.',
      en: 'We build apps and websites for small businesses, and source SI/SM developers for software companies.',
    },
    items: [
      {
        title: { ko: '앱 제작', en: 'App development' },
        desc: { ko: 'Android 앱 기획·개발·스토어 출시', en: 'Android app planning, development, and store release' },
      },
      {
        title: { ko: '홈페이지 제작', en: 'Website development' },
        desc: { ko: '반응형 회사·매장 홈페이지 제작 및 운영', en: 'Responsive company and store websites' },
      },
      {
        title: { ko: 'SI/SM 인력 소싱', en: 'SI/SM staffing' },
        desc: { ko: '프로젝트 단계별 개발·운영 인력 연결', en: 'Developers and operators for each project phase' },
      },
    ],
    strengths: [
      { ko: 'React / TypeScript 기반 웹 개발', en: 'Web development with React and TypeScript' },
      { ko: 'Python / Node.js / Spring 백엔드', en: 'Python, Node.js, and Spring backends' },
      { ko: '클라우드 배포 및 유지보수', en: 'Cloud deployment and maintenance' },
      { ko: '필요 시 NDA(비밀유지계약) 체결', en: 'NDA available on request' },
    ],
    cta: { ko: '앱·홈페이지·인력 문의', en: 'Ask about IT services' },
  },
];

export const findDivision = (key: string | null | undefined): Division | undefined =>
  DIVISIONS.find((d) => d.key === key);
