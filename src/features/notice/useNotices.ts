import { useEffect, useState } from 'react';
import type { Notice } from '../../types/notice';
import { fetchDataJson } from '../../lib/fetchJson';
import { parseNotices } from '../../lib/notices';

type NoticesState = { status: 'loading' | 'ready' | 'error'; notices: Notice[] };

let cache: Promise<Notice[]> | null = null;

/** 한 번 읽은 notices.json은 페이지 이동 간 재사용 */
function loadNotices(): Promise<Notice[]> {
  if (!cache) {
    cache = fetchDataJson('notices.json')
      .then(parseNotices)
      .catch((err) => {
        cache = null;
        throw err;
      });
  }
  return cache;
}

export function useNotices(): NoticesState {
  const [state, setState] = useState<NoticesState>({ status: 'loading', notices: [] });

  useEffect(() => {
    let alive = true;
    loadNotices()
      .then((notices) => alive && setState({ status: 'ready', notices }))
      .catch((err) => {
        console.error('[notices.json]', err);
        if (alive) setState({ status: 'error', notices: [] });
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
