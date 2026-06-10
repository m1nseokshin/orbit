import React, { useState } from 'react';
import { BackIcon } from './Shared/Icons';

const imgContainer = "https://www.figma.com/api/mcp/asset/55b8ecb3-5db2-4376-94f1-663c62c84f9c";
const imgContainer1 = "https://www.figma.com/api/mcp/asset/3d317d1b-dd24-47e7-9928-208c560155a1";
const imgContainer2 = "https://www.figma.com/api/mcp/asset/107d8b3c-ef44-4f39-9360-4f4ada09815b";
const imgContainer3 = "https://www.figma.com/api/mcp/asset/2160234c-fd3e-4edd-91a9-afebbf7ed6ff";

export default function DevicePairing({ onBack, onPairPurifier, onPairLight, isPurifierPaired, isLightPaired, isDarkMode }) {
  const [purifierStatus, setPurifierStatus] = useState(isPurifierPaired ? 'paired' : 'idle'); // 'idle' | 'pairing' | 'paired'
  const [lightStatus, setLightStatus] = useState(isLightPaired ? 'paired' : 'idle'); // 'idle' | 'pairing' | 'paired'

  const handlePairPurifier = () => {
    if (purifierStatus !== 'idle') return;
    setPurifierStatus('pairing');
    setTimeout(() => {
      setPurifierStatus('paired');
      onPairPurifier();
    }, 1500);
  };

  const handlePairLight = () => {
    if (lightStatus !== 'idle') return;
    setLightStatus('pairing');
    setTimeout(() => {
      setLightStatus('paired');
      onPairLight();
    }, 1500);
  };

  return (
    <div className={`flex-1 w-full h-full pb-10 overflow-y-auto no-scrollbar scroll-smooth px-6 transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-[#fafafa] text-neutral-900'
    }`} data-node-id="11:2670" data-name="기기 관리 - 페어링">
      {/* Header */}
      <div className="flex items-center gap-4 pt-14 pb-4">
        <BackIcon onClick={onBack} className={`w-8 h-8 transition-colors ${
          isDarkMode ? 'text-white hover:text-neutral-300' : 'text-neutral-900 hover:text-neutral-600'
        }`} />
        <h1 className={`text-[22px] font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>기기 추가</h1>
      </div>

      {/* Scanner Visual Header */}
      <div className="flex flex-col items-center py-6 text-center" data-node-id="52:1441">
        {/* Animated Scanner Radar */}
        <div className="w-[120px] h-[120px] flex items-center justify-center relative mb-4">
          <div className={`absolute inset-0 border rounded-full animate-scan ${isDarkMode ? 'border-white/20' : 'border-black/10'}`} style={{ animationDelay: '0ms' }} />
          <div className={`absolute inset-0 border rounded-full animate-scan ${isDarkMode ? 'border-white/20' : 'border-black/10'}`} style={{ animationDelay: '1000ms' }} />
          <div className={`absolute inset-0 border rounded-full animate-scan ${isDarkMode ? 'border-white/20' : 'border-black/10'}`} style={{ animationDelay: '2000ms' }} />
          
          <div className={`w-[64px] h-[64px] rounded-full border flex items-center justify-center shadow-lg ${
            isDarkMode ? 'bg-[#1b1b1b] border-white/10 shadow-black' : 'bg-white border-neutral-200 shadow-neutral-200/50'
          }`} data-node-id="52:1447">
            <img alt="Scanning" className={`w-[22px] h-[25px] object-contain animate-bounce ${isDarkMode ? '' : 'invert'}`} src={imgContainer} />
          </div>
        </div>

        <div>
          <h2 className="text-[28px] font-bold tracking-tight">기기 페어링</h2>
          <p className={`text-[15px] mt-2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-650'}`}>
            {purifierStatus === 'pairing' || lightStatus === 'pairing' 
              ? '기기와 동기화하는 중입니다...' 
              : '주변의 스마트 기기를 탐색하고 있습니다...'}
          </p>
        </div>
      </div>

      {/* Discovered Devices Grid */}
      <div className="space-y-4 mt-4" data-node-id="52:1455">
        {/* Device 1: Smart Air Purifier */}
        <div className={`rounded-[32px] p-6 relative overflow-hidden shadow-xl border transition-all ${
          isDarkMode ? 'bg-[#1b1b1b]/30 border-white/10 shadow-black/30' : 'bg-white border-neutral-200 shadow-md'
        }`} data-node-id="52:1456">
          <div className="flex items-start justify-between">
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-250'
            }`}>
              <img alt="Purifier" className={`w-[20px] h-[18px] object-contain ${isDarkMode ? '' : 'invert'}`} src={imgContainer1} />
            </div>
            <span className={`text-[12px] font-bold tracking-widest px-3 py-1 rounded-full border ${
              isDarkMode ? 'text-white/50 bg-white/10 border-white/5' : 'text-neutral-600 bg-neutral-100 border-neutral-200'
            }`}>
              {purifierStatus === 'paired' ? '연결됨' : '발견됨'}
            </span>
          </div>
          
          <div className="mt-4">
            <h3 className={`text-[18px] font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>스마트 공기청정기</h3>
            <p className="text-[15px] text-neutral-500 mt-0.5">Samsung Air Infinite Line</p>
          </div>

          <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-neutral-200'}`}>
            <button 
              onClick={handlePairPurifier}
              disabled={purifierStatus !== 'idle'}
              className={`w-full py-3 rounded-full flex items-center justify-center gap-2 font-bold text-[14px] transition-all duration-300 ${
                purifierStatus === 'paired' 
                  ? (isDarkMode ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed')
                  : purifierStatus === 'pairing'
                  ? (isDarkMode ? 'bg-white/10 text-white cursor-wait' : 'bg-neutral-100 text-neutral-600 cursor-wait')
                  : (isDarkMode ? 'bg-white text-black hover:bg-neutral-200 active:scale-[0.98]' : 'bg-black text-white hover:bg-neutral-800 active:scale-[0.98]')
              }`}
            >
              {purifierStatus === 'pairing' && (
                <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${isDarkMode ? 'border-white' : 'border-black'}`} />
              )}
              {purifierStatus === 'paired' && (
                <img alt="Checkmark" className={`w-3.5 h-[7.5px] object-contain opacity-60 ${isDarkMode ? 'invert' : ''}`} src={imgContainer2} />
              )}
              <span>
                {purifierStatus === 'paired' 
                  ? '연결 완료' 
                  : purifierStatus === 'pairing' 
                  ? '연결 중...' 
                  : '연결하기'}
              </span>
            </button>
          </div>
        </div>

        {/* Device 2: Smart Lighting */}
        <div className={`rounded-[32px] p-6 relative overflow-hidden shadow-xl border transition-all ${
          isDarkMode ? 'bg-[#1b1b1b]/30 border-white/10 shadow-black/30' : 'bg-white border-neutral-200 shadow-md'
        }`} data-node-id="52:1475">
          <div className="flex items-start justify-between">
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-250'
            }`}>
              <img alt="Light" className={`w-[15px] h-[20px] object-contain ${isDarkMode ? '' : 'invert'}`} src={imgContainer3} />
            </div>
            <span className={`text-[12px] font-bold tracking-widest px-3 py-1 rounded-full border ${
              isDarkMode ? 'text-white/50 bg-white/10 border-white/5' : 'text-neutral-600 bg-neutral-100 border-neutral-200'
            }`}>
              {lightStatus === 'paired' ? '연결됨' : '발견됨'}
            </span>
          </div>
          
          <div className="mt-4">
            <h3 className={`text-[18px] font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>스마트 조명</h3>
            <p className="text-[15px] text-neutral-500 mt-0.5">IKEA Tagarp Floor Uplighter</p>
          </div>

          <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-neutral-200'}`}>
            <button 
              onClick={handlePairLight}
              disabled={lightStatus !== 'idle'}
              className={`w-full py-3 rounded-full flex items-center justify-center gap-2 font-bold text-[14px] transition-all duration-300 ${
                lightStatus === 'paired' 
                  ? (isDarkMode ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed')
                  : lightStatus === 'pairing'
                  ? (isDarkMode ? 'bg-white/10 text-white cursor-wait' : 'bg-neutral-100 text-neutral-600 cursor-wait')
                  : (isDarkMode ? 'bg-white text-black hover:bg-neutral-200 active:scale-[0.98]' : 'bg-black text-white hover:bg-neutral-800 active:scale-[0.98]')
              }`}
            >
              {lightStatus === 'pairing' && (
                <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${isDarkMode ? 'border-white' : 'border-black'}`} />
              )}
              {lightStatus === 'paired' && (
                <img alt="Checkmark" className={`w-3.5 h-[7.5px] object-contain opacity-60 ${isDarkMode ? 'invert' : ''}`} src={imgContainer2} />
              )}
              <span>
                {lightStatus === 'paired' 
                  ? '연결 완료' 
                  : lightStatus === 'pairing' 
                  ? '연결 중...' 
                  : '연결하기'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
