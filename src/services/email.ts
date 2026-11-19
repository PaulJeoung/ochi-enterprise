import emailjs from '@emailjs/browser';

/** EmailJS 템플릿 변수. 기존 'Contact Us' 템플릿과 키 이름을 그대로 유지 */
export type InquiryParams = {
  division: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  detailType: string;
  content: string;
};

export class EmailConfigError extends Error {}

const env = import.meta.env;

export function isEmailConfigured(): boolean {
  return Boolean(env.VITE_EMAILJS_SERVICE_ID && env.VITE_EMAILJS_TEMPLATE_ID && env.VITE_EMAILJS_PUBLIC_KEY);
}

/** 문의 메일 발송. 자동 회신 템플릿이 설정돼 있으면 고객에게도 접수 확인 메일 발송(실패해도 문의는 성공 처리) */
export async function sendInquiry(params: InquiryParams): Promise<void> {
  const serviceId = env.VITE_EMAILJS_SERVICE_ID;
  const templateId = env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = env.VITE_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) {
    throw new EmailConfigError('EmailJS 환경 변수가 설정되지 않았습니다.');
  }

  await emailjs.send(serviceId, templateId, { ...params }, publicKey);

  const autoReplyId = env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
  if (autoReplyId) {
    try {
      await emailjs.send(serviceId, autoReplyId, { ...params }, publicKey);
    } catch (err) {
      console.warn('자동 회신 메일 발송 실패:', err);
    }
  }
}
