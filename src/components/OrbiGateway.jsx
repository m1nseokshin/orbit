import React from 'react';
import CountUp from './Shared/CountUp';

const imgImage3 = import.meta.env.BASE_URL + "figma/08a055df-8e49-4c1e-add3-41958cc2b94d.png";
const imgContainer = import.meta.env.BASE_URL + "figma/5df5637f-d342-4c53-90f5-be3d63d7c917.svg";

export default function OrbiGateway({ onNavigate, isDarkMode }) {
  return (
    <div className={`flex-1 w-full h-full pb-24 overflow-y-auto no-scrollbar scroll-smooth px-6 transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-[#fafafa] text-neutral-900'
    }`} data-node-id="11:2664" data-name="orbi">
      
      {/* Orbi Assistant Visual Header - Restored sphere from 125px to 178px per design integrity */}
      <div className="flex flex-col items-center pt-[45px] md:pt-[91px] pb-6 animate-fadeInUp">
        <div className="w-[178px] h-[178px] relative rounded-full flex items-center justify-center overflow-hidden animate-pulse duration-1000 shadow-xl shadow-neutral-500/10">
          <img alt="Orbi Glowing Assistant" className="w-full h-full object-contain scale-110" src={imgImage3} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
        <h2 className={`text-[22px] font-bold tracking-wide mt-4 text-center ${
          isDarkMode ? 'text-white' : 'text-neutral-900'
        }`}>
          건강 관리는 Orbi와 함께
        </h2>
        <p className={`text-[13px] leading-relaxed text-center px-2 mt-2.5 w-full ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          Orbi는 Personal Intelligence가 탑재된 의료전문 AI입니다. 
          사용자의 신체상태를 분석하고 자동으로 행동을 추천해줍니다.
        </p>
      </div>

      {/* Action Button: Talk to Orbi */}
      <div className="flex justify-center pb-6 animate-fadeInUp delay-75">
        <button 
          onClick={() => onNavigate('chat')}
          className={`font-semibold h-[44px] px-8 rounded-full flex items-center justify-center text-[14px] active:scale-95 duration-200 shadow-md ${
            isDarkMode 
              ? 'bg-white text-black border border-[#cdcdcd] hover:bg-neutral-200 shadow-white/5' 
              : 'bg-black text-white hover:bg-neutral-800 shadow-neutral-300'
          }`}
        >
          Orbi와 대화하기
        </button>
      </div>

      {/* Summary Metrics Section - Restored Figma metrics fonts and paddings */}
      <div className={`rounded-[24px] p-6 space-y-5 animate-fadeInUp delay-150 ${
        isDarkMode ? 'bg-[#111111] border border-white/5' : 'bg-white border border-neutral-200 shadow-md'
      }`}>
        <h3 className={`text-[12px] font-bold tracking-widest uppercase mb-1 ${
          isDarkMode ? 'text-white/40' : 'text-neutral-400'
        }`}>요약</h3>
        
        {/* Water Intake */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className={`text-[13px] font-medium ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>수분 섭취</span>
            <div className="flex items-baseline gap-0.5">
              <span className={`text-[22px] font-bold leading-none ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                <CountUp to="1.8" decimals={1} />
              </span>
              <span className={`text-[12px] font-semibold ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>/2.5L</span>
            </div>
          </div>
          <div className={`h-[6px] overflow-hidden rounded-full w-full ${isDarkMode ? 'bg-white/5' : 'bg-neutral-100'}`}>
            <div className={`h-full rounded-full w-[72%] transition-all duration-[1200ms] ease-out ${
              isDarkMode ? 'bg-white' : 'bg-neutral-900'
            }`} />
          </div>
        </div>

        {/* Sleep time */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className={`text-[13px] font-medium ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>수면 시간</span>
            <span className={`text-[22px] font-bold leading-none ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>6h 40m</span>
          </div>
          <div className={`h-[6px] overflow-hidden rounded-full w-full ${isDarkMode ? 'bg-white/5' : 'bg-neutral-100'}`}>
            <div className={`h-full rounded-full w-[83%] transition-all duration-[1200ms] ease-out ${
              isDarkMode ? 'bg-neutral-400' : 'bg-neutral-600'
            }`} />
          </div>
        </div>

        {/* Heart Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className={`text-[13px] font-medium ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>심박수</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-[22px] font-bold leading-none ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                <CountUp to="72" />
              </span>
              <span className={`text-[12px] font-semibold ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>BPM</span>
            </div>
          </div>
          <div className={`h-[6px] overflow-hidden rounded-full w-full ${isDarkMode ? 'bg-white/5' : 'bg-neutral-100'}`}>
            <div className={`h-full rounded-full w-[60%] transition-all duration-[1200ms] ease-out ${
              isDarkMode ? 'bg-neutral-600' : 'bg-neutral-450'
            }`} />
          </div>
        </div>
      </div>

      {/* Appointment Status Card */}
      <div 
        onClick={() => onNavigate('checkup-detail')}
        className={`rounded-[24px] p-6 flex flex-col gap-3.5 mt-5 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 animate-fadeInUp delay-225 ${
          isDarkMode 
            ? 'bg-[#111111] border border-white/5 hover:border-white/10' 
            : 'bg-white border border-neutral-200 hover:border-neutral-300 shadow-md'
        }`}
      >
        <div className="flex gap-2 items-center">
          <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-white' : 'bg-neutral-800'}`} />
          <span className={`text-[13px] font-semibold tracking-wide ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>다음 검진 예약</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h4 className={`text-[22px] font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>10월 24일</h4>
            <p className={`text-[13px] mt-0.5 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>오후 2:30 · 일반 검진</p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('checkup-detail');
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors active:scale-95 duration-200 ${
              isDarkMode ? 'bg-white hover:bg-neutral-200' : 'bg-neutral-100 hover:bg-neutral-200 border border-neutral-200'
            }`}
          >
            <img alt="Detail" className={`w-2.5 h-3 object-contain ${isDarkMode ? 'invert' : ''}`} src={imgContainer} />
          </button>
        </div>
      </div>
      
    </div>
  );
}
