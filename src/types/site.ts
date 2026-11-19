/** public/data/site.json 구조. 빈 문자열("")인 항목은 화면에서 숨김 */
export type SiteConfig = {
  company: {
    nameKo: string;
    nameEn: string;
    ceo: string;
    /** 설립연도 (예: "2009"). 비우면 표시 안 함 */
    established: string;
  };
  registration: {
    /** 사업자등록번호 */
    businessNo: string;
    /** 통신판매업 신고번호 */
    mailOrderNo: string;
    /** 수출자(무역업) 고유번호 */
    exporterNo: string;
  };
  contact: {
    phone: string;
    email: string;
    hoursKo: string;
    hoursEn: string;
    /** 공개용 주소 (시/구 단위 권장) */
    addressKo: string;
    addressEn: string;
  };
  channels: {
    /** 카카오톡 채널 URL (예: https://pf.kakao.com/_xxxx) */
    kakao: string;
    youtube: string;
    instagram: string;
    blog: string;
    playStore: string;
  };
};
