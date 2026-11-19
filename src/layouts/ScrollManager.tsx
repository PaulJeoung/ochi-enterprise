import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** 페이지 이동 시 맨 위로, #앵커가 있으면 해당 위치로 스크롤 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    // 페이지 렌더 직후 요소가 생기도록 한 프레임 대기
    const id = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}
