import React from 'react';

const imgContainer = "https://www.figma.com/api/mcp/asset/e2e97ac8-ce20-4212-a4fe-def225396730";
const imgContainer1 = "https://www.figma.com/api/mcp/asset/dad03881-8d9b-404a-8da5-eb0bb0e92a42";
const imgContainer2 = "https://www.figma.com/api/mcp/asset/d840cabe-beee-4ecc-bc3d-eec2018c033b";
const imgContainer3 = "https://www.figma.com/api/mcp/asset/2599e725-1e84-4500-848e-0f79985d822d";

export default function DeviceList({ onNavigate, isPurifierOn, onTogglePurifier, isLightOn, isLightAuto, onToggleLightMode, isPurifierPaired, isLightPaired, isDarkMode }) {
  return (
    <div className={`flex-1 w-full h-full pb-32 overflow-y-auto no-scrollbar scroll-smooth px-6 transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-[#fafafa] text-neutral-900'
    }`} data-node-id="11:2668" data-name="기기 관리">
      {/* Title Header - spacious pt-[91px] */}
      <div className="pt-[45px] md:pt-[91px] pb-4 animate-fadeInUp">
        <h2 className={`text-[32px] font-bold leading-[42px] tracking-tight ${
          isDarkMode ? 'text-white' : 'text-neutral-900'
        }`} data-node-id="52:1380">
          기기를 페어링하고
          <br />
          자동으로 관리해보세요.
        </h2>
        <p className={`text-[13px] leading-relaxed mt-3 ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
        }`} data-node-id="52:1382">
          최초 등록만 하면 스마트홈 기능이 있는 기기를 
          자동으로 관리하고, 사용자의 개입없이 사용할 수 있습니다.
        </p>
      </div>

      {/* Pairing Action Button */}
      <div className="flex pb-8 animate-fadeInUp delay-75">
        <button 
          onClick={() => onNavigate('pairing')}
          className={`font-semibold h-[44px] px-8 rounded-full flex items-center justify-center text-[15px] active:scale-95 duration-200 shadow-lg ${
            isDarkMode 
              ? 'bg-white text-black border border-[#cdcdcd] hover:bg-neutral-200 shadow-white/5' 
              : 'bg-black text-white hover:bg-neutral-800'
          }`}
          data-node-id="52:1376"
        >
          페어링하기
        </button>
      </div>

      {/* Active Device Grid */}
      <div className="grid grid-cols-2 gap-4 animate-fadeInUp delay-150" data-node-id="52:1304" data-name="Device Cards Section">
        {/* Air Purifier Card */}
        {isPurifierPaired ? (
          <div 
            onClick={() => onNavigate('device-detail', 'purifier')}
            className={`rounded-[35px] p-[25px] flex flex-col justify-between h-[188px] cursor-pointer transition-all duration-300 border ${
              isDarkMode 
                ? 'glass-panel-heavy border-white/5 hover:border-white/20' 
                : 'bg-white border-neutral-200 shadow-md hover:border-neutral-400'
            } ${
              isPurifierOn ? 'opacity-100' : 'opacity-50'
            }`}
            data-node-id="52:1305"
          >
            <div className="flex items-start justify-between">
              <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-white/10' : 'bg-neutral-100'
              }`}>
                <img alt="Air" className={`w-3.5 h-3 object-contain ${isDarkMode ? '' : 'invert'}`} src={imgContainer} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-[12px] text-neutral-500 block">대기질 관리</span>
              <span className={`text-[16px] font-bold block mt-0.5 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>공기 청정 제어</span>
              <div className="flex gap-2 items-center mt-3">
                <span className="text-[14px] text-neutral-500 font-medium">{isPurifierOn ? 'On' : 'Off'}</span>
                <div className={`flex-1 h-[4px] overflow-hidden rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                  <div className={`h-full rounded-full transition-all duration-500 ${
                    isPurifierOn ? (isDarkMode ? 'bg-white w-[66.7%]' : 'bg-black w-[66.7%]') : 'w-0'
                  }`} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`border border-dashed rounded-[35px] p-5 flex flex-col justify-center items-center h-[188px] text-center ${
            isDarkMode ? 'border-white/10 text-white/30' : 'border-neutral-300 text-neutral-450'
          }`}>
            <span className="text-[12px]">대기질 관리</span>
            <span className="text-[14px] font-semibold mt-1">미연결</span>
          </div>
        )}

        {/* Humidity Card */}
        <div 
          onClick={() => onNavigate('device-detail', 'humidity')}
          className={`rounded-[35px] p-[25px] flex flex-col justify-between h-[188px] border cursor-pointer transition-all duration-300 ${
            isDarkMode 
              ? 'glass-panel-heavy border-white/5 hover:border-white/20 opacity-80' 
              : 'bg-white border-neutral-200 shadow-md hover:border-neutral-400 opacity-90'
          }`}
          data-node-id="52:1325"
        >
          <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-white/10' : 'bg-neutral-100'
          }`}>
            <img alt="Humidity" className={`w-[10px] h-[12px] object-contain ${isDarkMode ? '' : 'invert'}`} src={imgContainer1} />
          </div>
          <div className="mt-4">
            <span className="text-[12px] text-neutral-500 block">대기질 관리</span>
            <span className={`text-[16px] font-bold block mt-0.5 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>습도 관리</span>
            <div className="flex gap-2 items-center mt-3">
              <span className="text-[14px] text-neutral-500 font-medium">45%</span>
              <div className={`flex-1 h-[4px] overflow-hidden rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                <div className={`h-full rounded-full w-[50%] ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Lighting Card */}
        {isLightPaired ? (
          <div 
            onClick={() => onNavigate('device-detail', 'light')}
            className={`rounded-[35px] p-[25px] flex flex-col justify-between h-[188px] cursor-pointer transition-all duration-300 border ${
              isDarkMode 
                ? 'glass-panel-heavy border-white/5 hover:border-white/20' 
                : 'bg-white border-neutral-200 shadow-md hover:border-neutral-400'
            } ${
              isLightAuto ? 'opacity-100' : 'opacity-70'
            }`}
            data-node-id="52:1342"
          >
            <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-white/10' : 'bg-neutral-100'
            }`}>
              <img alt="Light" className={`w-[9px] h-[12px] object-contain ${isDarkMode ? '' : 'invert'}`} src={imgContainer2} />
            </div>
            <div className="mt-4">
              <span className="text-[12px] text-neutral-500 block">조도 관리</span>
              <span className={`text-[16px] font-bold block mt-0.5 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>수동 모드 / 자동화</span>
              <div className="flex gap-2 items-center mt-3">
                <span className="text-[14px] text-neutral-500 font-medium">{isLightAuto ? 'Auto' : 'Manual'}</span>
                <div className={`flex-1 h-[4px] overflow-hidden rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                  <div className={`h-full rounded-full transition-all duration-500 ${
                    isLightAuto 
                      ? (isDarkMode ? 'bg-white w-[75%]' : 'bg-black w-[75%]') 
                      : (isDarkMode ? 'bg-white w-[25%]' : 'bg-black w-[25%]')
                  }`} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`border border-dashed rounded-[35px] p-5 flex flex-col justify-center items-center h-[188px] text-center ${
            isDarkMode ? 'border-white/10 text-white/30' : 'border-neutral-300 text-neutral-450'
          }`}>
            <span className="text-[12px]">조도 관리</span>
            <span className="text-[14px] font-semibold mt-1">미연결</span>
          </div>
        )}

        {/* Medication Card */}
        <div 
          onClick={() => onNavigate('device-detail', 'medication')}
          className={`rounded-[35px] p-[25px] flex flex-col justify-between h-[188px] border cursor-pointer transition-all duration-300 ${
            isDarkMode 
              ? 'glass-panel-heavy border-white/5 hover:border-white/20' 
              : 'bg-white border-neutral-200 shadow-md hover:border-neutral-400'
          }`}
          data-node-id="52:1359"
        >
          <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-white/10' : 'bg-neutral-100'
          }`}>
            <img alt="Medication" className={`w-2.5 h-3 object-contain ${isDarkMode ? '' : 'invert'}`} src={imgContainer3} />
          </div>
          <div className="mt-4">
            <span className="text-[12px] text-neutral-500 block">스마트 자동화</span>
            <span className={`text-[16px] font-bold block mt-0.5 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>약 복용 알림</span>
            <div className="flex gap-2 items-center mt-3">
              <span className="text-[14px] text-neutral-500 font-medium">13:00</span>
              <div className={`flex-1 h-[4px] overflow-hidden rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-neutral-100'}`}>
                <div className={`h-full rounded-full w-full ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
