# 오치상사 (OCHI TRADING CO.) - Enterprise Web Platform

오치상사의 3대 핵심 사업 영역을 통합 소개하고, 고객사 전용 견적 접수 및 B2B 고객지원 게시판을 제공하는 반응형 엔터프라이즈 웹 애플리케이션입니다.

---

## 🏢 Business Divisions (3대 핵심 사업 영역)

1. **IT & 소프트웨어 / SI 사업본부**
   - 엔터프라이즈 응용 소프트웨어 라이선스 공급 및 클라우드 맞춤 솔루션 개발
   - 전문 SI 개발 인력(프론트엔드/백엔드/클라우드) 파견·도급 및 SM 유지보수 운영

2. **정밀 산업소재 사업본부**
   - 고성능 영구자석 (네오디뮴 NdFeB N35~N52, 페라이트, 고무자석 시트)
   - 산업용 특수 고무 부품 (NBR, EPDM, Viton, 실리콘 규격 오링 및 도면 가공 가스켓)

3. **글로벌 F&B & 베이커리 사업본부**
   - 프리미엄 베이커리·디저트 원부자재(프리믹스, 파우더, 충전물, 시럽 등)
   - 친환경 베이킹 패키징 공급 및 한국 ↔ 북미(미국) 직수출입 물류 파이프라인 운영

---

## 🛠 Tech Stack

- **Framework / UI Library**: [React 18](https://react.dev/)
- **Bundler & Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
ochi-enterprise/
├── src/
│   ├── assets/              # 정적 에셋 (로고, 이미지 등)
│   ├── components/
│   │   ├── common/          # 공통 UI 컴포넌트 (Navbar, Footer, Toast 등)
│   │   ├── sections/        # 메인 페이지 섹션 (Hero, Business, Contact 등)
│   │   └── board/           # B2B 게시판 및 모달 컴포넌트
│   ├── data/                # 초기 더미 데이터 (공지사항 등)
│   ├── App.jsx              # 메인 애플리케이션 루트 컴포넌트
│   ├── index.css            # Tailwind CSS 기본 지시문
│   └── main.jsx             # React DOM 엔트리 포인트
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── README.md
└── package.json