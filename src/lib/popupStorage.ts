type HidePref = { type: 'TODAY'; date: string } | { type: 'NEVER' };

const keyOf = (id: string) => `ochi_popup:${id}`;

/** 공지별로 '오늘 하루'(해당 날짜까지) 또는 '다시 보지 않기' 상태를 확인 */
export function isPopupHidden(id: string, today: string): boolean {
  try {
    const raw = localStorage.getItem(keyOf(id));
    if (!raw) return false;
    const pref = JSON.parse(raw) as HidePref;
    if (pref.type === 'NEVER') return true;
    if (pref.type === 'TODAY') return pref.date === today;
  } catch {
    // 저장소 접근 불가 또는 손상된 값 → 숨기지 않음
  }
  return false;
}

export function hidePopup(id: string, type: HidePref['type'], today: string): void {
  const pref: HidePref = type === 'NEVER' ? { type } : { type, date: today };
  try {
    localStorage.setItem(keyOf(id), JSON.stringify(pref));
  } catch {
    // 저장 실패 시 이번 방문에서만 닫힘
  }
}
