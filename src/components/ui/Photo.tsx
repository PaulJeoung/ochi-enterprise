import { ImageIcon } from 'lucide-react';
import { PHOTOS, type PhotoKey } from '../../data/photos';

type Props = {
  photo: PhotoKey;
  alt: string;
  className?: string;
  /** 사진이 없을 때 자리표시 배경색 */
  tone?: 'navy' | 'slate' | 'warm';
};

const TONE = {
  navy: 'bg-ochi-navy-600',
  slate: 'bg-ochi-navy-500',
  warm: 'bg-[#8A6A3E]',
};

export default function Photo({ photo, alt, className = '', tone = 'navy' }: Props) {
  const src = PHOTOS[photo];
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
  }
  return (
    <div role="img" aria-label={alt} className={`flex flex-col items-center justify-center gap-1 text-white/70 ${TONE[tone]} ${className}`}>
      <ImageIcon className="h-6 w-6" aria-hidden="true" />
      <span className="px-2 text-center text-xs">{alt}</span>
    </div>
  );
}
