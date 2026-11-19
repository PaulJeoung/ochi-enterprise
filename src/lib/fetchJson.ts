/** public/data/ 아래 JSON을 읽음. 배포 후 파일만 바꿔도 반영되도록 캐시 검증 */
export async function fetchDataJson(fileName: string): Promise<unknown> {
  const res = await fetch(`${import.meta.env.BASE_URL}data/${fileName}`, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${fileName} 로드 실패 (HTTP ${res.status})`);
  return res.json();
}
