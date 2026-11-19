# 데이터 편집 가이드 (공지·팝업·회사정보)

코드 수정 없이 `public/data/` 아래 JSON 파일만 고치면 됩니다. 수정 → GitHub push → 배포 사이트에 자동 반영.

> JSON 주의사항
> - 문자열은 반드시 큰따옴표 `"..."`
> - 마지막 항목 뒤에 쉼표 금지
> - 본문 줄바꿈은 `\n`
> - 저장 전 https://jsonlint.com 에 붙여넣어 형식 확인 권장
> - 형식이 잘못된 공지는 화면에서 빠지고 브라우저 콘솔(F12)에 `[notices.json] ...` 경고가 표시됩니다.

---

## 1. 공지사항·팝업 — `public/data/notices.json`

```json
{
  "notices": [
    {
      "id": "2026-005",
      "category": "NOTICE",
      "title": "연말 휴무 안내",
      "author": "오치상사",
      "date": "2026-12-20",
      "content": "12월 31일 ~ 1월 1일은 휴무입니다.\n문의는 홈페이지로 남겨 주세요.",
      "visible": true,
      "pinned": false,
      "link": { "url": "/contact", "label": "문의 남기기" },
      "popup": {
        "enabled": true,
        "start": "2026-12-20",
        "end": "2027-01-01",
        "priority": 1,
        "allowHideToday": true,
        "allowHideForever": true
      }
    }
  ]
}
```

| 필드 | 필수 | 설명 |
|---|---|---|
| `id` | ✅ | 공지마다 다른 값. **팝업 '다시 보지 않기'가 이 id 기준**이라, 새 공지는 새 id를 쓰면 다시 노출됩니다. |
| `category` | ✅ | `NOTICE`(공지) / `MATERIAL`(원자재) / `SOURCING`(소싱) / `IT` |
| `title` | ✅ | 제목 |
| `date` | ✅ | 등록일 `YYYY-MM-DD` |
| `content` |  | 본문. 줄바꿈 `\n` |
| `author` |  | 작성자 (기본: 오치상사) |
| `visible` |  | 게시판 노출 여부 (기본 `true`). `false`면 게시판에서 숨김 |
| `pinned` |  | `true`면 목록 맨 위 고정 |
| `link` |  | 버튼 링크. 사이트 내부는 `/contact`처럼 `/`로 시작, 외부는 `https://...` |
| `popup` |  | 없으면 팝업 안 뜸 |

**popup 설정**

| 필드 | 설명 |
|---|---|
| `enabled` | 팝업 사용 여부 (`false`면 기간 내라도 미노출) |
| `start` / `end` | 노출 기간 (한국시간, 양 끝 날짜 포함) |
| `priority` | 팝업이 여러 개일 때 순서 (작을수록 먼저). 여러 개면 한 창에서 `1/3`처럼 넘겨봄 |
| `allowHideToday` | '오늘 하루 보지 않기' 버튼 표시 (당일 자정까지 숨김) |
| `allowHideForever` | '다시 보지 않기' 버튼 표시 (해당 공지 id는 이후 계속 숨김) |

**활용 예**
- 팝업만 띄우고 게시판엔 안 보이게: `"visible": false` + `popup.enabled: true`
- 팝업 즉시 내리기: `"enabled": false`
- 공지 삭제: 해당 `{ ... }` 블록 삭제 (앞뒤 쉼표 주의)

---

## 2. 회사·연락처 정보 — `public/data/site.json`

값을 `""`(빈 문자열)로 두면 화면에서 해당 항목이 **자동으로 숨겨집니다.**

| 위치 | 필드 | 표시되는 곳 |
|---|---|---|
| `company` | `nameKo`, `nameEn`, `ceo`, `established`(설립연도) | 푸터, 회사소개 |
| `registration` | `businessNo` 사업자등록번호 / `mailOrderNo` 통신판매업 신고번호 / `exporterNo` 수출자(무역업) 번호 | 푸터, 회사소개 |
| `contact` | `phone`, `email`, `hoursKo/En`, `addressKo/En` | 홈, 푸터, 회사소개, 문의, 모바일 하단 바 |
| `channels` | `kakao`(카카오톡 채널 URL), `youtube`, `instagram`, `blog`, `playStore` | 푸터, 모바일 하단 바, 사업영역(IT 포트폴리오) |

- 카카오톡 채널 URL을 넣으면 모바일 하단 바에 **카톡 상담** 버튼이 생깁니다. (예: `https://pf.kakao.com/_xxxxx`)
- 주소는 공개용이므로 시/구 단위까지만 적는 것을 권장합니다. 이 파일은 누구나 `/data/site.json`으로 열어볼 수 있습니다.

---

## 3. 사업별 사진 교체

1. 사진 파일을 `src/assets/photos/`에 저장 (예: `magnet.webp`)
2. `src/data/photos.ts`에서 import 후 값 지정
   ```ts
   import magnet from '../assets/photos/magnet.webp';
   export const PHOTOS = { magnet, bakery: undefined, it: undefined, logistics: undefined };
   ```
사진이 없는 항목은 브랜드 색 자리표시 이미지로 표시됩니다. (사진은 코드에 포함되므로 교체 후 재배포 필요)
