/**
 * 사업별 대표 사진 (Unsplash 무료 라이선스).
 * 교체하려면 src/assets/photos/의 파일을 바꾸거나 아래 import를 수정하세요.
 * 값이 undefined면 브랜드 색상 자리표시 이미지가 표시됩니다.
 */
import magnet from '../assets/photos/magnet.webp';
import bakery from '../assets/photos/bakery.webp';
import it from '../assets/photos/it.webp';
import logistics from '../assets/photos/logistics.webp';

export type PhotoKey = 'magnet' | 'bakery' | 'it' | 'logistics';

export const PHOTOS: Record<PhotoKey, string | undefined> = {
  magnet, // unsplash.com/photos/skueKVlDV9M
  bakery, // unsplash.com/photos/neu4T59mTcY
  it, // unsplash.com/photos/pKRNxEguRgM
  logistics, // unsplash.com/photos/CpsTAUPoScw
};
