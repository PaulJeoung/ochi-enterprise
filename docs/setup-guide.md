# 설정·배포 가이드

## 1. 환경 변수 (`.env`, 배포 플랫폼 환경 변수에도 동일하게 등록)

| 변수 | 필수 | 설명 |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | ✅ | EmailJS Service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | ✅ | 문의 접수용 템플릿 ID (기존 'Contact Us') |
| `VITE_EMAILJS_PUBLIC_KEY` | ✅ | EmailJS Public Key |
| `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID` |  | 고객 자동 회신 템플릿 ID. 비우면 자동 회신 안 보냄 |
| `VITE_PORT` |  | 로컬 개발 포트 (기본 5164) |

`VITE_` 변수는 빌드 결과물에 포함되어 공개됩니다(EmailJS Public Key는 원래 공개용). 그래서 아래 2-3의 보안 설정을 꼭 해 주세요.

## 2. EmailJS 대시보드 작업

### 2-1. 기존 문의 템플릿
템플릿 변수는 기존과 동일합니다: `{{division}}`, `{{company}}`, `{{name}}`, `{{email}}`, `{{phone}}`, `{{detailType}}`, `{{content}}`
- `division`: 문의 분야 (원자재 수입·납품 / 국내 제품 소싱 / IT 공급·운영)
- `detailType`: 세부 견적 정보 (예: `품목: 네오디뮴 / 규격·등급: N52 / 수량: 10,000개`)

### 2-2. 고객 자동 회신 템플릿 (선택)
1. Email Templates → Create New Template
2. **To Email**: `{{email}}`, **Reply To**: 회사 이메일
3. 본문 예시
   ```
   {{name}}님, 오치상사에 문의해 주셔서 감사합니다.
   아래 내용으로 접수되었으며 확인 후 빠르게 연락드리겠습니다.

   문의 분야: {{division}}
   세부 정보: {{detailType}}
   문의 내용: {{content}}
   ```
4. 템플릿 ID를 `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID`에 등록

### 2-3. 스팸 방지
- Account → Security → **Allowed origins**에 실제 도메인과 `http://localhost:5164`만 등록
- 필요하면 같은 화면에서 요청 수 제한(Rate limit) 설정
- 폼에는 봇 차단용 숨김 필드가 이미 들어가 있습니다.

## 3. 배포 (Vercel / Netlify / Render)

- Build command: `npm run build` / Output directory: `dist`
- 새로고침 시 404 방지 설정이 포함되어 있습니다.
  - Vercel: `vercel.json`
  - Netlify: `public/_redirects`
  - Render(Static Site): Redirects/Rewrites에 `/*` → `/index.html` (Rewrite) 추가
- 위 1번 환경 변수를 플랫폼 설정에 등록 후 재배포

## 4. 검색 등록 (도메인 확정 후)

1. `public/robots.txt`의 Sitemap 주석을 실제 도메인으로 수정
2. `public/sitemap.xml` 생성 (페이지: `/`, `/about`, `/business`, `/notice`, `/contact`)
3. `index.html`의 `og:image`를 `https://도메인/ochi-icon.png` 절대 주소로 변경 (카톡 공유 미리보기)
4. 등록
   - Google Search Console: https://search.google.com/search-console → 도메인 추가 → sitemap 제출
   - 네이버 서치어드바이저: https://searchadvisor.naver.com → 사이트 등록 → 소유 확인 → sitemap 제출
