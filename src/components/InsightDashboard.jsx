import React, { useState, useEffect } from 'react';
import CountUp from './Shared/CountUp';

const ICON_MENU = import.meta.env.BASE_URL + "figma/49e2f930-f953-4f50-b788-c6beabfb57c4.svg";
const ICON_ORBI_REC = import.meta.env.BASE_URL + "figma/ca362578-79a4-49f9-b293-493a7d36aa5f.svg";

export default function InsightDashboard({ onStartMeditation, isDarkMode }) {
  const [activeTab, setActiveTab] = useState('sleep');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'sleep', label: '수면 분석' },
    { id: 'pattern', label: '생활 패턴' },
    { id: 'health', label: '건강 변화' },
  ];

  const sleepData = [
    { day: '월', hours: 6 },
    { day: '화', hours: 7.5 },
    { day: '수', hours: 6.5 },
    { day: '목', hours: 8 },
    { day: '금', hours: 7.2 },
    { day: '토', hours: 9 },
    { day: '일', hours: 8.5 },
  ];

  const patternData = [
    { day: '월', val: 280 },
    { day: '화', val: 420 },
    { day: '수', val: 310 },
    { day: '목', val: 550 },
    { day: '금', val: 342 },
    { day: '토', val: 680 },
    { day: '일', val: 500 },
  ];

  const healthData = [
    { day: '월', val: 68 },
    { day: '화', val: 72 },
    { day: '수', val: 70 },
    { day: '목', val: 75 },
    { day: '금', val: 72 },
    { day: '토', val: 64 },
    { day: '일', val: 66 },
  ];

  return (
    <div className={`flex-1 w-full h-full pb-32 overflow-y-auto no-scrollbar scroll-smooth transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-[#fafafa] text-neutral-900'
    }`} data-node-id="11:2672" data-name="인사이트">
      
      {/* Header Section - Positioned and padded exactly like Figma top-[91px] px-[51px] */}
      <header className="px-[51px] pt-[45px] md:pt-[91px] pb-[16px] animate-fadeInUp">
        <p className={`text-[14px] tracking-[0.14px] mb-2 ${
          isDarkMode ? 'text-white/70' : 'text-neutral-500'
        }`}>오늘의 건강 점수</p>
        <div className="flex items-baseline gap-2">
          <h1 className={`text-[48px] font-extrabold tracking-[-1.92px] leading-none ${
            isDarkMode ? 'text-white' : 'text-neutral-900'
          }`}>
            <CountUp to="84" />
          </h1>
          <span className={`text-[16px] ${isDarkMode ? 'text-white/60' : 'text-neutral-400'}`}>/ 100</span>
        </div>
        <p className={`mt-8 text-[16px] leading-[24px] ${
          isDarkMode ? 'text-white/80' : 'text-neutral-700'
        }`}>
          {activeTab === 'sleep' && "어제보다 수면 질이 향상되어 전반적인 컨디션이 좋습니다."}
          {activeTab === 'pattern' && "활동 칼로리 소모량이 지난주 동기 대비 12% 증가했습니다."}
          {activeTab === 'health' && "안정시 평균 심박수가 평소 범위 내로 복귀하여 순환 건강이 안정적입니다."}
        </p>
      </header>

      {/* User Analysis Section - Tabs and Chart Card centered using Figma margins */}
      <section className="px-[26px] mt-8 space-y-4 animate-fadeInUp delay-75">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-[8px] no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-[20px] py-[11px] rounded-full text-[14px] font-semibold tracking-[0.14px] transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? (isDarkMode ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md')
                  : (isDarkMode 
                      ? 'bg-white/5 border border-white/10 text-white backdrop-blur hover:bg-white/10' 
                      : 'bg-neutral-100 border border-neutral-200 text-neutral-850 hover:bg-neutral-200')
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart Area - Matching Figma rounded-[28px] and padding p-[25px] */}
        <div className={`rounded-[28px] p-[25px] backdrop-blur-md shadow-xl relative overflow-hidden border transition-all ${
          isDarkMode ? 'bg-[#111111] border-white/5 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-md'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-[18px] font-bold tracking-[0.14px] ${
              isDarkMode ? 'text-white/90' : 'text-neutral-900'
            }`}>
              {activeTab === 'sleep' && "주간 수면 시간"}
              {activeTab === 'pattern' && "주간 활동 칼로리"}
              {activeTab === 'health' && "주간 평균 심박수"}
            </h3>
            <img src={ICON_MENU} alt="menu" className={`w-[13px] h-[3px] opacity-70 ${isDarkMode ? '' : 'invert'}`} />
          </div>

          {/* Chart Visualization */}
          <div className="h-44 flex items-end justify-between gap-1 relative mt-4">
            {/* Grid Lines */}
            <div className={`absolute inset-x-0 inset-y-6 flex flex-col justify-between pointer-events-none ${
              isDarkMode ? 'opacity-5' : 'opacity-10'
            }`}>
              <div className={`border-t w-full ${isDarkMode ? 'border-white' : 'border-neutral-800'}`} />
              <div className={`border-t w-full ${isDarkMode ? 'border-white' : 'border-neutral-800'}`} />
            </div>

            {/* Y-axis labels */}
            <div className={`absolute -left-2 top-0 bottom-6 flex flex-col justify-between text-[10px] ${
              isDarkMode ? 'text-white/30' : 'text-neutral-400'
            }`}>
              {activeTab === 'sleep' && (
                <>
                  <span>8h</span>
                  <span>4h</span>
                  <span>0h</span>
                </>
              )}
              {activeTab === 'pattern' && (
                <>
                  <span>800k</span>
                  <span>400k</span>
                  <span>0k</span>
                </>
              )}
              {activeTab === 'health' && (
                <>
                  <span>100b</span>
                  <span>50b</span>
                  <span>0b</span>
                </>
              )}
            </div>

            {/* Bars with growing transition */}
            {activeTab === 'sleep' && sleepData.map((data) => (
              <div key={data.day} className="flex flex-col items-center gap-2 flex-1 group z-10">
                <div className="relative w-full flex items-end justify-center h-28">
                  <div 
                    className={`w-1.5 rounded-full transition-all duration-1000 ease-out ${
                      data.day === '금' 
                        ? (isDarkMode 
                            ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]' 
                            : 'bg-black shadow-[0_0_6px_rgba(0,0,0,0.2)]') 
                        : (isDarkMode ? 'bg-white/15' : 'bg-neutral-200')
                    }`}
                    style={{ height: isLoaded ? `${(data.hours / 10) * 100}%` : '0%' }}
                  />
                  {/* Hover value indicator */}
                  <div className={`absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[9px] font-bold px-1.5 py-0.5 rounded shadow ${
                    isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    {data.hours}h
                  </div>
                </div>
                <span className={`text-[12px] tracking-[0.6px] ${
                  data.day === '금' 
                    ? (isDarkMode ? 'text-white font-medium' : 'text-neutral-900 font-semibold') 
                    : (isDarkMode ? 'text-white/50' : 'text-neutral-400')
                }`}>
                  {data.day}
                </span>
              </div>
            ))}

            {activeTab === 'pattern' && patternData.map((data) => (
              <div key={data.day} className="flex flex-col items-center gap-2 flex-1 group z-10">
                <div className="relative w-full flex items-end justify-center h-28">
                  <div 
                    className={`w-1.5 rounded-full transition-all duration-1000 ease-out ${
                      data.day === '금' 
                        ? (isDarkMode 
                            ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]' 
                            : 'bg-black shadow-[0_0_6px_rgba(0,0,0,0.2)]') 
                        : (isDarkMode ? 'bg-white/15' : 'bg-neutral-200')
                    }`}
                    style={{ height: isLoaded ? `${(data.val / 800) * 100}%` : '0%' }}
                  />
                  {/* Hover value indicator */}
                  <div className={`absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[9px] font-bold px-1.5 py-0.5 rounded shadow ${
                    isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    {data.val} kcal
                  </div>
                </div>
                <span className={`text-[12px] tracking-[0.6px] ${
                  data.day === '금' 
                    ? (isDarkMode ? 'text-white font-medium' : 'text-neutral-900 font-semibold') 
                    : (isDarkMode ? 'text-white/50' : 'text-neutral-400')
                }`}>
                  {data.day}
                </span>
              </div>
            ))}

            {activeTab === 'health' && healthData.map((data) => (
              <div key={data.day} className="flex flex-col items-center gap-2 flex-1 group z-10">
                <div className="relative w-full flex items-end justify-center h-28">
                  <div 
                    className={`w-1.5 rounded-full transition-all duration-1000 ease-out ${
                      data.day === '금' 
                        ? (isDarkMode 
                            ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]' 
                            : 'bg-black shadow-[0_0_6px_rgba(0,0,0,0.2)]') 
                        : (isDarkMode ? 'bg-white/15' : 'bg-neutral-200')
                    }`}
                    style={{ height: isLoaded ? `${(data.val / 100) * 100}%` : '0%' }}
                  />
                  {/* Hover value indicator */}
                  <div className={`absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[9px] font-bold px-1.5 py-0.5 rounded shadow ${
                    isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    {data.val} BPM
                  </div>
                </div>
                <span className={`text-[12px] tracking-[0.6px] ${
                  data.day === '금' 
                    ? (isDarkMode ? 'text-white font-medium' : 'text-neutral-900 font-semibold') 
                    : (isDarkMode ? 'text-white/50' : 'text-neutral-400')
                }`}>
                  {data.day}
                </span>
              </div>
            ))}
          </div>

          {/* Average Footer */}
          <div className={`mt-4 pt-[17px] border-t flex justify-between items-center ${
            isDarkMode ? 'border-white/5' : 'border-neutral-200'
          }`}>
            <span className={`text-[16px] ${isDarkMode ? 'text-white/70' : 'text-neutral-500'}`}>
              {activeTab === 'sleep' && "평균 수면 시간"}
              {activeTab === 'pattern' && "평균 칼로리 소비"}
              {activeTab === 'health' && "평균 심박수"}
            </span>
            <div className="flex items-center gap-[8px]">
              <div className={`w-[8px] h-[8px] rounded-full ${
                isDarkMode ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-black'
              }`} />
              <span className={`font-bold text-[14px] tracking-[0.14px] ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {activeTab === 'sleep' && "7시간 15분"}
                {activeTab === 'pattern' && "440 kcal"}
                {activeTab === 'health' && "71 BPM"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Recommendation Card */}
      <section className="px-[26px] mt-6 animate-fadeInUp delay-150">
        <div className={`rounded-[25px] p-[25px] flex flex-col gap-4 backdrop-blur-md shadow-xl border transition-all ${
          isDarkMode ? 'bg-[#111111] border-white/5 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-md'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] bg-white/10 rounded-md flex items-center justify-center overflow-hidden shrink-0">
              <img src={ICON_ORBI_REC} alt="Orbi" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-[14px] font-semibold tracking-[0.14px]">Orbi 추천 행동</h3>
          </div>
          
          {activeTab === 'sleep' && (
            <>
              <p className={`text-[16px] leading-[24px] ${isDarkMode ? 'text-white/90' : 'text-neutral-700'}`}>
                현재 심박수가 평소보다 높습니다. 안정을 위해 10분간의 명상을 추천합니다.
              </p>
              <button 
                onClick={onStartMeditation}
                className={`w-full h-[48px] font-bold rounded-full shadow transition-all duration-200 active:scale-[0.98] text-[14px] ${
                  isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                명상 시작하기
              </button>
            </>
          )}

          {activeTab === 'pattern' && (
            <>
              <p className={`text-[16px] leading-[24px] ${isDarkMode ? 'text-white/90' : 'text-neutral-700'}`}>
                오늘 장시간 앉아있는 패턴이 기록되었습니다. 가벼운 전신 스트레칭을 10분간 수행해 피로를 푸시는 것을 추천합니다.
              </p>
              <button 
                onClick={onStartMeditation}
                className={`w-full h-[48px] font-bold rounded-full shadow transition-all duration-200 active:scale-[0.98] text-[14px] ${
                  isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                스트레칭 가이드 보기
              </button>
            </>
          )}

          {activeTab === 'health' && (
            <>
              <p className={`text-[16px] leading-[24px] ${isDarkMode ? 'text-white/90' : 'text-neutral-700'}`}>
                최근 3일간 안정 시 심박수가 매우 좋은 추세를 보이고 있습니다. 원활한 바이오 밸런스를 유지하기 위해 마인드 호흡을 5분간 수행하십시오.
              </p>
              <button 
                onClick={onStartMeditation}
                className={`w-full h-[48px] font-bold rounded-full shadow transition-all duration-200 active:scale-[0.98] text-[14px] ${
                  isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                호흡 제어 가이드
              </button>
            </>
          )}
        </div>
      </section>

      {/* Additional Scroll Content - Sleep Stage Distribution & Tips */}
      <section className="px-[26px] mt-6 pb-12 space-y-6 animate-fadeInUp delay-225">
        <h4 className={`text-[12px] font-bold tracking-widest uppercase pl-2 mt-8 ${
          isDarkMode ? 'text-white/40' : 'text-neutral-450'
        }`}>
          {activeTab === 'sleep' && "수면 종합 레포트"}
          {activeTab === 'pattern' && "활동 종합 레포트"}
          {activeTab === 'health' && "바이오 밸런스 레포트"}
        </h4>
        
        {/* Sleep Stage Chart Card */}
        <div className={`rounded-[28px] p-[25px] space-y-4 shadow-xl border transition-all ${
          isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-neutral-200 shadow-md'
        }`}>
          {activeTab === 'sleep' && (
            <>
              <h3 className="text-[18px] font-bold tracking-tight">수면 단계 분포</h3>
              <div className="space-y-4 pt-2">
                {/* Deep Sleep */}
                <div>
                  <div className={`flex justify-between text-[13px] mb-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>
                    <span>깊은 수면</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>22% (1시간 36분)</span>
                  </div>
                  <div className={`h-2 rounded-full w-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                    <div className={`h-full rounded-full ${isDarkMode ? 'bg-white' : 'bg-neutral-800'}`} style={{ width: '22%' }} />
                  </div>
                </div>
                {/* Light Sleep */}
                <div>
                  <div className={`flex justify-between text-[13px] mb-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>
                    <span>얕은 수면</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-neutral-850'}`}>53% (3시간 50분)</span>
                  </div>
                  <div className={`h-2 rounded-full w-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                    <div className={`h-full rounded-full ${isDarkMode ? 'bg-white/60' : 'bg-neutral-500'}`} style={{ width: '53%' }} />
                  </div>
                </div>
                {/* REM Sleep */}
                <div>
                  <div className={`flex justify-between text-[13px] mb-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>
                    <span>렘 수면</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>25% (1시간 49분)</span>
                  </div>
                  <div className={`h-2 rounded-full w-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                    <div className={`h-full rounded-full ${isDarkMode ? 'bg-white/30' : 'bg-neutral-350'}`} style={{ width: '25%' }} />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'pattern' && (
            <>
              <h3 className="text-[18px] font-bold tracking-tight">일상 활동 비중</h3>
              <div className="space-y-4 pt-2">
                {/* Walking */}
                <div>
                  <div className={`flex justify-between text-[13px] mb-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>
                    <span>일반 보행</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>45% (4,800걸음)</span>
                  </div>
                  <div className={`h-2 rounded-full w-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                    <div className={`h-full rounded-full ${isDarkMode ? 'bg-white' : 'bg-neutral-800'}`} style={{ width: '45%' }} />
                  </div>
                </div>
                {/* Aerobic */}
                <div>
                  <div className={`flex justify-between text-[13px] mb-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>
                    <span>적극적 유산소</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-neutral-850'}`}>30% (35분)</span>
                  </div>
                  <div className={`h-2 rounded-full w-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                    <div className={`h-full rounded-full ${isDarkMode ? 'bg-white/60' : 'bg-neutral-500'}`} style={{ width: '30%' }} />
                  </div>
                </div>
                {/* Sitting */}
                <div>
                  <div className={`flex justify-between text-[13px] mb-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>
                    <span>앉아있는 시간</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-neutral-850'}`}>25% (6시간 20분)</span>
                  </div>
                  <div className={`h-2 rounded-full w-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                    <div className={`h-full rounded-full ${isDarkMode ? 'bg-white/30' : 'bg-neutral-350'}`} style={{ width: '25%' }} />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'health' && (
            <>
              <h3 className="text-[18px] font-bold tracking-tight">주요 건강 지표 안정도</h3>
              <div className="space-y-4 pt-2">
                {/* Heart Rate Stability */}
                <div>
                  <div className={`flex justify-between text-[13px] mb-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>
                    <span>심박 변이 안정성</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>88% (최적 범위)</span>
                  </div>
                  <div className={`h-2 rounded-full w-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                    <div className={`h-full rounded-full ${isDarkMode ? 'bg-white' : 'bg-neutral-800'}`} style={{ width: '88%' }} />
                  </div>
                </div>
                {/* Stress index */}
                <div>
                  <div className={`flex justify-between text-[13px] mb-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>
                    <span>자율신경 스트레스</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-neutral-850'}`}>24% (매우 안정)</span>
                  </div>
                  <div className={`h-2 rounded-full w-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                    <div className={`h-full rounded-full ${isDarkMode ? 'bg-white/60' : 'bg-neutral-500'}`} style={{ width: '24%' }} />
                  </div>
                </div>
                {/* Cardiovascular health */}
                <div>
                  <div className={`flex justify-between text-[13px] mb-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>
                    <span>심혈관 탄성도</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>95% (우수 수준)</span>
                  </div>
                  <div className={`h-2 rounded-full w-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                    <div className={`h-full rounded-full ${isDarkMode ? 'bg-white/30' : 'bg-neutral-350'}`} style={{ width: '95%' }} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Tip Card */}
        <div className={`rounded-[28px] p-[25px] space-y-4 shadow-xl border transition-all ${
          isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-neutral-200 shadow-md'
        }`}>
          <h3 className="text-[18px] font-bold tracking-tight">
            {activeTab === 'sleep' && "오늘의 건강 가이드"}
            {activeTab === 'pattern' && "생활 패턴 권장 가이드"}
            {activeTab === 'health' && "오르비의 종합 소견"}
          </h3>
          
          {activeTab === 'sleep' && (
            <ul className={`space-y-3 text-[14px] leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-neutral-600'}`}>
              <li className="flex gap-2">
                <span className={`font-bold select-none ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>•</span>
                <span><strong>오후 2시 이후 카페인 제한:</strong> 커피나 녹차의 각성 효과가 밤 10시까지 이어지므로 가급적 오전에만 드시는 것을 권장합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className={`font-bold select-none ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>•</span>
                <span><strong>스마트폰 블루라이트 차단:</strong> 취침 전 스마트폰 불빛은 수면 유도 호르몬인 멜라토닌 분비를 방해하므로 침대 밖에서 다뤄주세요.</span>
              </li>
              <li className="flex gap-2">
                <span className={`font-bold select-none ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>•</span>
                <span><strong>적정 실내 온도 유지:</strong> 깊은 수면 단계로 들어가기 위해서는 체온이 0.3도 정도 내려가야 합니다. 방 안 온도를 20도 안팎으로 유지해 보세요.</span>
              </li>
            </ul>
          )}

          {activeTab === 'pattern' && (
            <ul className={`space-y-3 text-[14px] leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-neutral-600'}`}>
              <li className="flex gap-2">
                <span className={`font-bold select-none ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>•</span>
                <span><strong>매 50분마다 일어서기:</strong> 오래 앉아있는 행동은 다리 정맥 혈류 속도를 늦추므로, 알람을 맞추고 50분마다 기지개를 켜십시오.</span>
              </li>
              <li className="flex gap-2">
                <span className={`font-bold select-none ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>•</span>
                <span><strong>햇볕 아래 가벼운 걷기:</strong> 낮 시간에 햇빛을 쬐면 세로토닌 합성량이 늘어나 주간 대사 촉진과 야간 멜라토닌 분비 개선에 기여합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className={`font-bold select-none ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>•</span>
                <span><strong>활동 중 수분 섭취 빈도 증가:</strong> 유산소 운동 또는 활동 중에는 매 15분마다 소량의 수분을 나누어 섭취하는 것이 대사 밸런스를 돕습니다.</span>
              </li>
            </ul>
          )}

          {activeTab === 'health' && (
            <ul className={`space-y-3 text-[14px] leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-neutral-600'}`}>
              <li className="flex gap-2">
                <span className={`font-bold select-none ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>•</span>
                <span><strong>저나트륨 식습관 유지:</strong> 최근 나트륨 수치가 높아지면 심장 부담이 가중되므로 평소보다 소금 섭취량을 하루 5g 이하로 축소하십시오.</span>
              </li>
              <li className="flex gap-2">
                <span className={`font-bold select-none ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>•</span>
                <span><strong>교감신경 이완 호흡:</strong> 스트레스 유입 시 코로 4초 들이쉬고 입으로 6초 천천히 내쉬는 호흡 주기를 하루 3회 이상 주기적으로 실천하십시오.</span>
              </li>
              <li className="flex gap-2">
                <span className={`font-bold select-none ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>•</span>
                <span><strong>심박 변이 모니터링:</strong> 매 아침 측정되는 HRV 지표를 기반으로 그날의 트레이닝 부하와 휴식 시간 스케줄을 배정하십시오.</span>
              </li>
            </ul>
          )}
        </div>
      </section>

    </div>
  );
}
