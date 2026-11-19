/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  /** 선택: 고객 자동 회신 템플릿 ID. 비어 있으면 자동 회신을 보내지 않음 */
  readonly VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID?: string;
  readonly VITE_PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
