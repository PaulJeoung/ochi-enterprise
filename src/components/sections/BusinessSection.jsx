import React from 'react';
import { Cpu, Layers, Globe2, ArrowRight } from 'lucide-react';

export default function BusinessSection({ onSelectDivision }) {
  return (
    <section id="business" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase">Business Areas</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">사업 영역별 특화 경쟁력</h2>
          <p className="text-slate-600 mt-4 text-base">각 사업부별 전문 조직과 인프라를 바탕으로 B2B 고객사의 성공을 견인합니다.</p>
        </div>

        <div className="space-y-16">
          {/* 사업부 1: IT & SI */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 hover:shadow-xl transition duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-bold mb-4">
                  <Cpu className="w-4 h-4" /> IT & SI 사업본부
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  응용 소프트웨어 공급 & 전문 SI 인력 운영·개발
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  엔터프라이즈 SaaS, 클라우드 인프라 연동, 맞춤형 사내 업무 포털 개발을 수행합니다. 
                  프로젝트 단계별(초기 분석, 설계, 풀스택 개발, PMO) 적합 인력을 즉각 투입하여 성공적인 런칭을 보장합니다.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block text-sm">응용 소프트웨어 개발/공급</span>
                    <span className="text-xs text-slate-500 mt-1 block">웹/앱 솔루션, 클라우드 모니터링 시스템</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block text-sm">전문 SI 인력 소싱 & SM</span>
                    <span className="text-xs text-slate-500 mt-1 block">경력 개발자 파견, 외주 도급, 안정적 운영 관리</span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectDivision('IT_SI')}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  IT/SI 프로젝트 인력 및 개발 견적 요청 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-indigo-950 p-6 sm:p-8 rounded-2xl text-white">
                <h4 className="font-bold text-lg mb-4 text-sky-300">주요 수행 및 지원 역량</h4>
                <ul className="space-y-3 text-sm text-slate-200">
                  <li className="flex items-center gap-2">✓ React / Vue / TypeScript 기반 모던 프론트엔드</li>
                  <li className="flex items-center gap-2">✓ Python / Node.js / Spring 백엔드 아키텍처</li>
                  <li className="flex items-center gap-2">✓ AWS, Azure, GCP 클라우드 인프라 및 비용 최적화</li>
                  <li className="flex items-center gap-2">✓ NDA 체결 및 지적재산권 안전 보장</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 사업부 2: 산업소재 */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 hover:shadow-xl transition duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
                  <Layers className="w-4 h-4" /> 산업소재 사업본부
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  고성능 자석 & 특수 고무 부품 정밀 유통
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  초정밀 모터, 센서, 전자부품에 사용되는 강력 네오디뮴·페라이트 영구자석과 고내열/내화학성 오링, 
                  맞춤 규격 실링 가스켓을 다이렉트 제조 네트워크를 통해 고품질·단납기로 공급합니다.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block text-sm">영구 자석 솔루션</span>
                    <span className="text-xs text-slate-500 mt-1 block">네오디뮴(N35~N52), 페라이트, 고무자석 시트</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block text-sm">산업용 고무 성형 & 오링</span>
                    <span className="text-xs text-slate-500 mt-1 block">NBR, EPDM, 실리콘, Viton 오링 및 맞춤 가스켓</span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectDivision('MATERIAL')}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
                >
                  자석/고무 샘플 및 규격 단가 요청 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 p-6 sm:p-8 rounded-2xl text-white">
                <h4 className="font-bold text-lg mb-4 text-emerald-300">소재 품질 및 가공 기준</h4>
                <ul className="space-y-3 text-sm text-slate-200">
                  <li className="flex items-center gap-2">✓ 정밀 공차 관리 (CAD 도면 맞춤 제작 지원)</li>
                  <li className="flex items-center gap-2">✓ RoHS / REACH 유해물질 검증 규격 준수</li>
                  <li className="flex items-center gap-2">✓ 대량 양산 및 소량 다품종 샘플 신속 발송</li>
                  <li className="flex items-center gap-2">✓ 표면 처리 (Ni, Zn 코팅) 및 방진/기밀 설계</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 사업부 3: 글로벌 F&B */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 hover:shadow-xl transition duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold mb-4">
                  <Globe2 className="w-4 h-4" /> 글로벌 F&B 유통팀
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  국내외(미국) 프리미엄 베이커리·디저트 원부자재 납품
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  국내 카페/베이커리 프랜차이즈부터 북미(미국) 거점 K-디저트 유통 채널까지, 엄선된 제과 원부재료, 프리믹스, 토핑류, 
                  그리고 친환경 전용 포장 패키징을 안정적인 콜드체인 및 수출입 라인으로 공급합니다.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block text-sm">베이커리 핵심 원부재료</span>
                    <span className="text-xs text-slate-500 mt-1 block">특수 프리믹스, 파우더, 버터/퓨레, 시럽</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block text-sm">미국 수출입 및 패키징</span>
                    <span className="text-xs text-slate-500 mt-1 block">FDA 기준 준수 패키징, 해외 지사 공급망</span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectDivision('FNB')}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800"
                >
                  국내/미국 F&B 자재 공급선 문의 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="lg:col-span-5 bg-gradient-to-br from-amber-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white">
                <h4 className="font-bold text-lg mb-4 text-amber-300">물류 및 유통 신뢰성</h4>
                <ul className="space-y-3 text-sm text-slate-200">
                  <li className="flex items-center gap-2">✓ 한국 ↔ 미국 직송 및 현지 유통 물류 파이프라인</li>
                  <li className="flex items-center gap-2">✓ 정기 컨테이너 선적 & 급송 항공화물 옵션</li>
                  <li className="flex items-center gap-2">✓ 프랜차이즈 전용 OEM/ODM 규격 소분 패키징</li>
                  <li className="flex items-center gap-2">✓ 원산지 증명 및 위생 안전 증빙 철저 관리</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}