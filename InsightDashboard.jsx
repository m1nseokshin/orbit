import React, { useState } from 'react';

// Image constants from Figma context
const ICON_MENU = "https://www.figma.com/api/mcp/asset/cb6a72d9-1546-42f3-8c82-26eda1f9c6b1";
const ICON_ORBI_REC = "https://www.figma.com/api/mcp/asset/a83c0d99-e52d-4bd6-85d5-62793b84592a";
const ICON_HOME = "https://www.figma.com/api/mcp/asset/38bd4e76-9dd5-4fac-b577-3ea494b3fd9b";
const ICON_ORBI = "https://www.figma.com/api/mcp/asset/6c57b8a1-9396-43bf-9615-565746d77738";
const ICON_DEVICE = "https://www.figma.com/api/mcp/asset/1e6ddca6-7096-4349-be45-d63b8e176b66";
const ICON_INSIGHT = "https://www.figma.com/api/mcp/asset/3ec5e492-c1d5-4e83-9f10-a3ce841ce3db";
const ICON_SETTINGS = "https://www.figma.com/api/mcp/asset/18fcfcd9-0cbd-4ff2-9d1d-46a21d3adcf5";

const InsightDashboard = () => {
  const [activeTab, setActiveTab] = useState('sleep');

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

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      {/* Container with max-width for mobile-like feel */}
      <div className="max-w-[402px] mx-auto relative min-h-screen pb-32">
        
        {/* Header Section */}
        <header className="px-6 pt-16 pb-12">
          <p className="text-white/70 text-sm tracking-wider mb-2">오늘의 건강 점수</p>
          <div className="flex items-baseline gap-2">
            <h1 className="text-5xl font-extrabold tracking-tighter">84</h1>
            <span className="text-white/60 text-lg">/ 100</span>
          </div>
          <p className="mt-6 text-white/80 text-base leading-relaxed">
            어제보다 수면 질이 향상되어 전반적인<br />
            컨디션이 좋습니다.
          </p>
        </header>

        {/* User Analysis Section */}
        <section className="px-6 space-y-4">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-lg shadow-white/10'
                    : 'bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Chart Area */}
          <div className="bg-[#1e1e1e66] border border-white/10 rounded-[28px] p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white/90">주간 수면 시간</h3>
              <img src={ICON_MENU} alt="menu" className="w-3.5 h-[3.3px] opacity-70" />
            </div>

            {/* Mock Chart Visualization */}
            <div className="h-48 flex items-end justify-between gap-1 relative mt-4">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                <div className="border-t border-white w-full" />
                <div className="border-t border-white w-full" />
                <div className="border-t border-white w-full" />
              </div>

              {/* Y-axis labels */}
              <div className="absolute -left-2 top-0 bottom-8 flex flex-col justify-between text-[10px] text-white/30">
                <span>8h</span>
                <span>4h</span>
                <span>0h</span>
              </div>

              {/* Bars */}
              {sleepData.map((data) => (
                <div key={data.day} className="flex flex-col items-center gap-2 flex-1 group">
                  <div className="relative w-full flex items-end justify-center h-32">
                    <div 
                      className={`w-1.5 rounded-full transition-all duration-500 ease-out ${
                        data.day === '금' ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/10'
                      }`}
                      style={{ height: `${(data.hours / 10) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs tracking-widest ${data.day === '금' ? 'text-white font-medium' : 'text-white/50'}`}>
                    {data.day}
                  </span>
                </div>
              ))}
            </div>

            {/* Average Footer */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-white/70">평균 수면 시간</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
                <span className="font-bold">7시간 15분</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Recommendation Card */}
        <section className="px-6 mt-6">
          <div className="bg-[#1e1e1e66] border-t border-r border-b border-l-4 border-white/10 border-l-white/80 rounded-[25px] p-6 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-[30px] h-[30px] bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={ICON_ORBI_REC} alt="Orbi" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-sm font-semibold tracking-wide">Orbi 추천 행동</h3>
            </div>
            <p className="text-white/90 text-base leading-relaxed">
              현재 심박수가 평소보다 높습니다. 안정을<br />
              위해 10분간의 명상을 추천합니다.
            </p>
            <button className="w-full bg-white text-black font-bold py-3 rounded-full shadow-lg hover:bg-neutral-200 transition-colors active:scale-[0.98]">
              명상 시작하기
            </button>
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[402px] bg-white/15 backdrop-blur-3xl border-t border-white/20 rounded-t-[32px] px-6 pt-4 pb-8 flex justify-between items-center shadow-[0_-8px_32px_rgba(0,0,0,0.1)]">
          {[
            { icon: ICON_HOME, label: '홈' },
            { icon: ICON_ORBI, label: '오르비' },
            { icon: ICON_DEVICE, label: '기기 관리' },
            { icon: ICON_INSIGHT, label: '인사이트', active: true },
            { icon: ICON_SETTINGS, label: '설정' },
          ].map((item, idx) => (
            <div key={idx} className={`flex flex-col items-center gap-1 cursor-pointer transition-opacity ${item.active ? 'opacity-100' : 'opacity-60'}`}>
              <div className={`p-2 rounded-xl transition-colors ${item.active ? 'bg-white/20' : ''}`}>
                <img src={item.icon} alt={item.label} className="w-5 h-5 object-contain" />
              </div>
              <span className="text-[10px] font-bold tracking-wider">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default InsightDashboard;
