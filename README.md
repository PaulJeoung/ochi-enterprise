# 오치상사 (OCHI GLOBAL) 홈페이지

원자재 수입·납품, 국내 제품 소싱·수출, IT 공급·운영을 소개하고 온라인 견적 문의를 받는 회사 홈페이지입니다. (한/영 지원)

## 사업 영역
1. **원자재 수입·납품** — 네오디뮴 맥세이프 자석, 모터용 페라이트 자석, 실리콘 소재
2. **국내 제품 소싱** — 한인 사업자 대상 카페·베이커리 부자재 수출·공급
3. **IT 공급·운영** — 앱·홈페이지 제작, SW 기업 SI/SM 인력 소싱·공급

## 기술 스택
React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · React Router 6 · EmailJS · lucide-react

## 실행
```bash
npm install
npm run dev        # http://localhost:5164
npm run typecheck  # 타입 검사
npm run build      # dist/ 생성
```

## 운영 문서
- [데이터 편집 가이드](docs/data-guide.md) — 공지·팝업(`public/data/notices.json`), 회사정보(`public/data/site.json`), 사진 교체
- [설정·배포 가이드](docs/setup-guide.md) — 환경 변수, EmailJS, 배포, 검색 등록

## 구조
```text
public/data/        notices.json, site.json (코드 수정 없이 편집)
src/
  pages/            Home, About, Business, NoticeList, NoticeDetail, Contact, NotFound
  layouts/          Header(+서브바), Footer, MobileQuickBar, SiteLayout
  features/         notice(목록 로딩·팝업), contact(문의 폼), site(회사정보 로딩)
  components/ui/    Modal, PageHeader, Photo, SectionTitle, SmartLink
  data/             사업영역·메뉴·문의 항목·사진 정의
  lib/              공지 검증/필터, 팝업 숨김 저장, 날짜(KST)
  services/email.ts EmailJS 발송
  i18n/             한/영 전환
```
