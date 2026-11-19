import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { isInternalUrl } from '../../lib/link';

type Props = { href: string; className?: string; children: ReactNode; onClick?: () => void };

/** 내부 경로는 라우터 Link, 외부 주소는 새 창 */
export default function SmartLink({ href, className, children, onClick }: Props) {
  if (isInternalUrl(href)) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {children}
    </a>
  );
}
