import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, Building, ShieldCheck, Loader2, Youtube, Instagram, BookOpen, ExternalLink } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactSection({ selectedDivision, onSelectDivision, onToast }) {
  const [formData, setFormData] = useState({
    division: selectedDivision,
    company: '',
    name: '',
    email: '',
    phone: '',
    detailType: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ ...prev, division: selectedDivision }));
  }, [selectedDivision]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company || !formData.name || !formData.email || !formData.content) {
      alert('필수 입력 항목을 모두 작성해 주세요.');
      return;
    }

    setIsSubmitting(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS 환경 변수가 설정되지 않았습니다.');
      alert('메일 서비스 설정이 완료되지 않았습니다. 관리자에게 문의해주세요.');
      setIsSubmitting(false);
      return;
    }

    const divisionNames = {
      IT_SI: 'IT·SI 솔루션',
      MATERIAL: '정밀 산업소재(자석/고무)',
      FNB: '글로벌 베이커리·F&B'
    };

    const templateParams = {
      division: divisionNames[formData.division] || formData.division,
      company: formData.company,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      detailType: formData.detailType || '미지정',
      content: formData.content
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      onToast(`[${formData.company}] 견적 요청이 성공적으로 전송되었습니다.`);
      
      setFormData({
        division: selectedDivision,
        company: '',
        name: '',
        email: '',
        phone: '',
        detailType: '',
        content: ''
      });
    } catch (error) {
      console.error('메일 전송 실패:', error);
      alert('메일 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주시거나 전화로 문의해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative">
      {/* ... 기존 안내 및 상호 정보 코드 동일 ... */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 사업자 기본 정보 */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-blue-400 font-semibold text-xs tracking-wider uppercase">Contact Us</span>
              <h2 className="text-3xl font-extrabold mt-2">사업부별 견적 & 제휴 문의</h2>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                원하시는 사업 부문을 선택하시면 해당 부서의 전문 담당자에게 실시간 전달되어 빠르고 정확한 단가와 일정을 제안해 드립니다.
              </p>
            </div>

            <div className="space-y-5 border-y border-slate-800 py-6 text-sm">
              <div className="flex items-start gap-4">
                <Building className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-200">상호명: 오치상사 (OCHI TRADING CO.)</div>
                  <div className="text-xs text-slate-400 mt-0.5">사업자등록번호: 145-22-02322</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-200">사업장 소재지</div>
                  <div className="text-xs text-slate-400 mt-0.5">경기도 용인시 기흥구 동백8로131번길 9 (우. 16999)</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-200">연락처</div>
                  <div className="text-xs text-slate-400 mt-0.5">010-2910-5164</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-200">공식 이메일 접수</div>
                  <div className="text-xs text-slate-400 mt-0.5">kuni05@naver.com</div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-400 mb-2.5">공식 미디어 & 소통 채널</div>
                <div className="grid grid-cols-3 gap-2.5">
                  <a
                    href="https://www.youtube.com/@ochi-trading-company"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-800/90 hover:bg-red-600/20 border border-slate-700 hover:border-red-500/50 text-slate-300 hover:text-red-400 transition-all text-xs font-medium group"
                  >
                    <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                    <span>유튜브</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <a
                    href="https://www.instagram.com/reel/DYha44dO0av/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-800/90 hover:bg-pink-600/20 border border-slate-700 hover:border-pink-500/50 text-slate-300 hover:text-pink-400 transition-all text-xs font-medium group"
                  >
                    <Instagram className="w-4 h-4 text-pink-500 shrink-0" />
                    <span>인스타</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <a
                    href="https://blog.naver.com/kuni05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-800/90 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 transition-all text-xs font-medium group"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>블로그</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="text-xs text-slate-300">
                고객사의 도면, 소스코드 및 사업계획서는 철저히 암호화 관리되며 필요 시 사전 NDA(비밀유지계약) 체결 후 진행됩니다.
              </div>
            </div>
          </div>

          {/* 견적 문의 폼 */}
          <div className="lg:col-span-7 bg-slate-800/90 p-8 sm:p-10 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6 text-white">온라인 상담 및 견적 신청서</h3>

            {/* 사업부 탭 선택 */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-300 mb-2">상담 대상 사업부 선택 *</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'IT_SI', label: 'IT·SI 솔루션' },
                  { key: 'MATERIAL', label: '정밀 산업소재' },
                  { key: 'FNB', label: '글로벌 베이커리·F&B' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      onSelectDivision(item.key);
                      setFormData(prev => ({ ...prev, division: item.key }));
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                      formData.division === item.key
                        ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">회사명 / 기관명 *</label>
                  <input
                    type="text"
                    required
                    placeholder="(주)오치파트너스"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">담당자 성함 / 직함 *</label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동 팀장"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">회신 이메일 *</label>
                  <input
                    type="email"
                    required
                    placeholder="buyer@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">연락처 (휴대전화/직통) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">세부 문의 항목</label>
                {formData.division === 'IT_SI' && (
                  <input
                    type="text"
                    placeholder="예: 클라우드 SaaS 웹개발 / 풀스택 인력 2명 3개월 투입 등"
                    value={formData.detailType}
                    onChange={(e) => setFormData({ ...formData, detailType: e.target.value })}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                )}
                {formData.division === 'MATERIAL' && (
                  <input
                    type="text"
                    placeholder="예: 네오디뮴 원형 N35 D10*3T 10,000개 / Viton 오링 P-15 도면"
                    value={formData.detailType}
                    onChange={(e) => setFormData({ ...formData, detailType: e.target.value })}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                )}
                {formData.division === 'FNB' && (
                  <input
                    type="text"
                    placeholder="예: 프리미엄 베이킹 믹스 월 5톤 / 미국 캘리포니아 현지 납품 등"
                    value={formData.detailType}
                    onChange={(e) => setFormData({ ...formData, detailType: e.target.value })}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">상세 요청 사항 및 납기 일정 *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="요구 스펙, 목표 납품 기한, 예산 범위, 규격 공차 등을 기재해 주시면 신속한 견적이 가능합니다."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    견적 요청 메일 전송 중...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    상담 및 견적서 요청 접수
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}