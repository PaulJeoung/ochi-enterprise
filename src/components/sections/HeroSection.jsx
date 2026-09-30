import React from 'react';
import { ArrowUpRight, Cpu, Layers, Globe2, ShieldCheck } from 'lucide-react';

export default function HeroSection({ onSelectDivision }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white py-24 lg:py-32">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            3개 전문 사업부문 통합 B2B 솔루션
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-100">
            비즈니스의 경계를 넓히는<br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              오치상사의 3대 핵심 동력
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 font-normal leading-relaxed">
            최신 IT 소프트웨어 개발 및 전문 SI 인력 공급, 고신뢰성 자석 및 특수 고무 소재, 
            그리고 한국과 북미(미국) 시장을 잇는 프리미엄 베이커리 자재 유통망까지.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all"
            >
              사업부별 견적/상담 요청
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#business"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
            >
              사업부문 소개 보기
            </a>
          </div>
        </div>

        {/* 3대 사업부 퀵 카드 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => onSelectDivision('IT_SI')}
            className="group cursor-pointer p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-blue-500/60 hover:bg-slate-800 transition duration-200 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">IT & SI 솔루션</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              응용 소프트웨어 공급, 맞춤형 플랫폼 개발, 전문 SI 개발인력 운영 및 SM 유지보수.
            </p>
          </div>

          <div 
            onClick={() => onSelectDivision('MATERIAL')}
            className="group cursor-pointer p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-emerald-500/60 hover:bg-slate-800 transition duration-200 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">정밀 산업소재</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              초강력 네오디뮴·페라이트 영구자석, NBR/Viton 오링, 규격 및 맞춤 가스켓 도면 가공.
            </p>
          </div>

          <div 
            onClick={() => onSelectDivision('FNB')}
            className="group cursor-pointer p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/60 hover:bg-slate-800 transition duration-200 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">글로벌 베이커리·F&B</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              제과제빵 프리미엄 원부재료, 친환경 베이킹 패키징, 국내 공급 및 대미(미국) 수출입.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}