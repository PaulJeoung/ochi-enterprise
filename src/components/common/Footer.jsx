import React from 'react';
import ochiLogoCircle from '../../assets/ochi_logo_circle_en.png';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-14 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
                <img src={ochiLogoCircle} alt="오치상사 OCHI LOGO" className="w-full h-full object-contain"/>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">오치상사 (OCHI TRADING CO.)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              산업용 정밀 자석/특수 고무재 공급, 엔터프라이즈 응용소프트웨어 개발 및 전문 SI 인력 파견/운영, 북미 및 국내 프리미엄 베이커리 디저트 원자재 수출입 솔루션을 제공하는 통합 전문 파트너입니다.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">사업부 바로가기</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#business" className="hover:text-white transition">IT / SI 솔루션 사업부</a></li>
              <li><a href="#business" className="hover:text-white transition">정밀 산업소재(자석·고무)</a></li>
              <li><a href="#business" className="hover:text-white transition">글로벌 베이커리·F&B 유통</a></li>
              <li><a href="#board" className="hover:text-white transition">고객지원 & 견적문의</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">인증 및 보안</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              B2B 보안 도면 전송 및 NDA(기밀유지협약) 체결 기준을 준수합니다.
            </p>
            <div className="text-[11px] text-slate-400">
              상담시간: 평일 09:00 ~ 18:00 (KST)
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          {/* <div>
            대표자: 정병오 | 사업자등록번호: [145-22-02322] | 통신판매업신고: [제202X-서울강남-0000호]
          </div> */}
          <div>
            대표자 : 정병오 | 사업자등록번호 : 145-22-02322
          </div>
          <div>© {new Date().getFullYear()} OCHI TRADING CO. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}