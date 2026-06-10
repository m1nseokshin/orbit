import React, { useState } from 'react';
import { BackIcon } from './Shared/Icons';

const imgSamsungAirInfiniteLine = "https://www.figma.com/api/mcp/asset/d5bff180-f1df-407c-8dce-3acc40897156";
const imgContainer = "https://www.figma.com/api/mcp/asset/7c63853c-aa88-4efa-acc4-85245ec82219"; // Power icon
const imgIcon = "https://www.figma.com/api/mcp/asset/20d4890b-bd3f-4122-904e-ea2ebc9e91bf"; // PM icon
const imgStarIcon = "https://www.figma.com/api/mcp/asset/9b926673-7baf-4bfe-ac82-da0863fa68ad"; // Star icon

export default function DeviceDetail({ 
  deviceType = 'purifier', 
  onBack, 
  isPurifierOn, 
  onTogglePurifier, 
  isLightOn,
  onToggleLight,
  isLightAuto,
  onToggleLightMode,
  isHumidifierOn,
  onToggleHumidifier,
  targetHumidity = 50,
  onChangeTargetHumidity,
  isMedicationTaken,
  onToggleMedication,
  isNestOn,
  onToggleNest,
  isDysonOn,
  onToggleDyson,
  dysonTemp = 22,
  onChangeDysonTemp,
  nestVolume = 45,
  onChangeNestVolume,
  isDarkMode 
}) {
  // Local state for interactive sliders
  const [localBrightness, setLocalBrightness] = useState(75);
  const [localTemp, setLocalTemp] = useState(4500); // Kelvin
  const [localFanSpeed, setLocalFanSpeed] = useState(5);
  const [localNestBrightness, setLocalNestBrightness] = useState(80);
  const [localNestMode, setLocalNestMode] = useState("대시보드"); // "시계" | "액자" | "대시보드"

  // Chart data definitions
  const historyData = [
    { height: '64px', opacity: 'opacity-30' },
    { height: '96px', opacity: 'opacity-30' },
    { height: '85.3px', opacity: 'opacity-50' },
    { height: '64px', opacity: 'opacity-30' },
    { height: '106.6px', opacity: 'opacity-70' },
    { height: '128px', opacity: 'opacity-60' },
    { height: '85.3px', opacity: 'opacity-80' },
    { height: '64px', opacity: 'opacity-30' },
    { height: '42.6px', opacity: 'opacity-30' },
    { height: '64px', opacity: 'opacity-30' },
    { height: '102.4px', opacity: 'opacity-90' },
    { height: '96px', opacity: 'opacity-60' },
  ];

  // Helper to render title & descriptions depending on deviceType
  const getDeviceMeta = () => {
    switch (deviceType) {
      case 'dyson':
        return {
          title: "Dyson Purifier",
          subTitle: "Dyson Purifier Hot+Cool",
          verified: "Connected",
          guideText: isDysonOn 
            ? `실내 온도가 설정 온도 ${dysonTemp}°C에 도달하여 아늑하고 쾌적한 실내 온도를 유지 중입니다. 지속적인 공기 순환으로 미세먼지를 차단합니다.`
            : "온풍기가 대기 모드에 있습니다. 실내 온도 조절 및 보온을 위해 전원을 켜주시기 바랍니다.",
          statusTitle: isDysonOn ? `실내 온도 관리 작동 중 (${dysonTemp}°C)` : "작동 정지"
        };
      case 'nest':
        return {
          title: "Google Nest Hub",
          subTitle: "Google Nest Hub Max",
          verified: "Verified",
          guideText: isNestOn
            ? `스마트 홈 허브가 켜져 있으며 볼륨이 ${nestVolume}%로 설정되어 있습니다. 오르비와 연동되어 음악 및 안내 음성을 출력 중입니다.`
            : "스마트 허브가 대기 모드에 있습니다. 스마트홈 연동 및 음성 안내를 활성화하려면 전원을 켜주십시오.",
          statusTitle: isNestOn ? `스마트 허브 연결 활성화 (볼륨 ${nestVolume}%)` : "작동 정지"
        };
      case 'humidity':
        return {
          title: "습도 관리 가습기",
          subTitle: "Dyson Purifier Humidify+Cool",
          verified: "Active",
          guideText: isHumidifierOn 
            ? "실내 상대습도가 쾌적한 45~50% 내외로 안정적으로 유지되고 있어, 호흡기 점막을 보호하고 피부 건강을 유지하는 데 긍정적입니다."
            : "가습 장치가 대기 모드에 있습니다. 대기질 쾌적도를 개선하기 위해 전원을 켜주시기 바랍니다.",
          statusTitle: isHumidifierOn ? "동작 시간: 1시간 30분" : "작동 대기 중"
        };
      case 'light':
        return {
          title: "스마트 조명",
          subTitle: "IKEA Tagarp Floor Uplighter",
          verified: "Connected",
          guideText: isLightOn
            ? (isLightAuto 
                ? "오르비의 생체 리듬(Circadian Rhythm) 모드가 켜져 있어 시간에 맞게 밝기와 색온도가 자동으로 최적화되어 수면 장애를 예방합니다."
                : "수동 조작 모드로 작동 중입니다. 최적의 휴식을 위해 은은한 3000K 색온도를 조절해 보시는 것이 좋습니다.")
            : "조명이 꺼져 있습니다. 주변 환경 조도를 일정하게 맞추기 위해 조명을 켜주세요.",
          statusTitle: isLightOn ? (isLightAuto ? "자동 조명 관리 작동 중" : "수동 모드 제어 중") : "전원이 꺼져 있습니다."
        };
      case 'medication':
        return {
          title: "약 복용 알리미",
          subTitle: "Orbi Smart Medication Tracker",
          verified: "Active",
          guideText: isMedicationTaken
            ? "오늘 예정된 오후 1시 복용 약을 정상적으로 섭취하였습니다. 꾸준한 복용은 원활한 혈행 흐름과 피로 개선에 필수적입니다!"
            : "아직 오늘의 정해진 복용 약(오후 1시)이 등록되지 않았습니다. 약을 드셨다면 아래 '복용 완료'를 눌러 기록해 주세요.",
          statusTitle: isMedicationTaken ? "오늘의 복용 완료" : "복용 예정 (13:00)"
        };
      case 'purifier':
      default:
        return {
          title: "Samsung Air",
          subTitle: "Smart Air Purifier",
          verified: "Verified",
          guideText: isPurifierOn
            ? "실내 초미세먼지 농도 수치가 '좋음' 상태로 유지 중입니다. 호흡기 자극을 줄여 수면과 안정을 유도하기에 가장 적합한 실내 공기 상태입니다."
            : "공기청정 장치가 꺼져 있습니다. 실내 미세먼지 차단 및 쾌적성 유지를 위해 전원을 켜 주시기 바랍니다.",
          statusTitle: isPurifierOn ? "2시간 동안 연속 작동 중" : "작동 정지"
        };
    }
  };

  const meta = getDeviceMeta();

  return (
    <div className={`flex-1 w-full h-full pb-10 overflow-y-auto no-scrollbar scroll-smooth px-6 transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-[#fafafa] text-neutral-900'
    }`} data-name="index-info">
      
      {/* Top Header Navigation */}
      <div className="flex items-center gap-4 pt-14 pb-6">
        <BackIcon onClick={onBack} className={`w-8 h-8 transition-colors ${
          isDarkMode ? 'text-white hover:text-neutral-350' : 'text-neutral-900 hover:text-neutral-600'
        }`} />
        <h1 className={`text-[22px] font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>내 기기 정보</h1>
      </div>

      {/* Device Summary Section */}
      <div className="flex gap-6 items-center py-6">
        {/* Device Image container - CROPPED TOP HALF AND FULLY FILLED */}
        <div className={`w-[136px] h-[180px] rounded-[24px] overflow-hidden relative shrink-0 flex items-center justify-center border ${
          isDarkMode ? 'bg-neutral-900/60 border-white/5 shadow-inner' : 'bg-white border-neutral-200 shadow-md'
        }`}>
          {deviceType === 'purifier' && (
            <img alt="Samsung Air Purifier" className="absolute top-0 left-0 w-full h-[200%] object-cover object-top transition-transform hover:scale-105 duration-350" src={imgSamsungAirInfiniteLine} />
          )}
          {deviceType === 'dyson' && (
            <img 
              alt="Dyson Purifier" 
              className={`absolute top-0 left-0 w-full h-[200%] object-cover object-top transition-transform hover:scale-105 duration-350 ${
                isDysonOn ? '' : 'opacity-40 grayscale'
              }`} 
              src="/dyson.png" 
            />
          )}
          {deviceType === 'nest' && (
            <img 
              alt="Google Nest Hub" 
              className={`absolute top-0 left-0 w-full h-[200%] object-cover object-top transition-transform hover:scale-105 duration-350 ${
                isNestOn ? '' : 'opacity-40 grayscale'
              }`} 
              src="/nest.png" 
            />
          )}
          {deviceType === 'humidity' && (
            <img 
              alt="LG Humidifier" 
              className={`absolute top-0 left-0 w-full h-[200%] object-cover object-top transition-transform hover:scale-105 duration-350 ${
                isHumidifierOn ? '' : 'opacity-40 grayscale'
              }`} 
              src="/humidifier.png" 
            />
          )}
          {deviceType === 'light' && (
            <img 
              alt="IKEA Lamp" 
              className={`absolute top-0 left-0 w-full h-[200%] object-cover object-top transition-transform hover:scale-105 duration-350 ${
                isLightOn ? '' : 'opacity-40 grayscale'
              }`} 
              src="/lamp.png" 
            />
          )}
          {deviceType === 'medication' && (
            /* Premium Medication Dispenser design */
            <div className="w-[80px] h-[140px] flex flex-col items-center justify-center relative">
              <div className={`absolute w-[50px] h-[50px] rounded-full blur-md transition-all duration-700 ${isMedicationTaken ? 'bg-emerald-500/20' : 'bg-orange-500/10'}`} />
              <div className={`w-[64px] h-[90px] rounded-[18px] border flex flex-col items-center justify-between p-3 relative ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-300'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isMedicationTaken ? 'bg-emerald-500/10 text-emerald-450' : 'bg-orange-500/10 text-orange-450'}`}>
                  <img alt="Alarm Star" className={`w-4 h-4 object-contain ${isDarkMode ? '' : 'invert'}`} src={imgStarIcon} />
                </div>
                <div className="w-full flex justify-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${isMedicationTaken ? 'bg-emerald-500' : 'bg-neutral-500/40'}`} />
                  <span className="w-2 h-2 rounded-full bg-neutral-500/40" />
                  <span className="w-2 h-2 rounded-full bg-neutral-500/40" />
                </div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
        
        {/* Info */}
        <div className="flex-1">
          <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide mb-2 ${
            isDarkMode ? 'bg-white/15 text-white/90' : 'bg-neutral-200 text-neutral-800'
          }`}>
            {meta.verified}
          </div>
          <h2 className={`text-[20px] font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            {meta.title}
          </h2>
          <p className={`text-[12px] mt-1 ${isDarkMode ? 'text-white/40' : 'text-neutral-500'}`}>{meta.subTitle}</p>
        </div>
      </div>

      {/* Main Power Controls Card */}
      <div className={`rounded-[28px] p-6 flex items-center justify-between shadow-2xl mt-4 border transition-all ${
        isDarkMode ? 'bg-[#111111] border-white/5 text-white shadow-black/40' : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-200/50'
      }`}>
        <div className="flex gap-4 items-center">
          {/* Power Icon container */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'
          }`}>
            <img alt="Power" className={`w-5 h-5 object-contain ${
              (deviceType === 'purifier' && isPurifierOn) ||
              (deviceType === 'dyson' && isDysonOn) ||
              (deviceType === 'nest' && isNestOn) ||
              (deviceType === 'humidity' && isHumidifierOn) ||
              (deviceType === 'light' && isLightOn) ||
              (deviceType === 'medication' && isMedicationTaken)
                ? 'opacity-100 scale-105' 
                : 'opacity-40 scale-100'
            } ${isDarkMode ? '' : 'invert'}`} src={imgContainer} />
          </div>
          
          <div>
            <p className="text-[14px] font-semibold">
              {deviceType === 'medication' ? '복용 기록 완료' : '전원 상태'}
            </p>
            <p className={`text-[12px] mt-0.5 ${isDarkMode ? 'text-white/40' : 'text-neutral-500'}`}>
              {deviceType === 'purifier' && (isPurifierOn ? '정상 작동 중' : '작동 정지 상태')}
              {deviceType === 'dyson' && (isDysonOn ? '온풍 및 공기 순환 중' : '작동 대기 중')}
              {deviceType === 'nest' && (isNestOn ? '연동 및 음성 출력 대기 중' : '작동 대기 중')}
              {deviceType === 'humidity' && (isHumidifierOn ? '자동 가습 운전 중' : '작동 대기 중')}
              {deviceType === 'light' && (isLightOn ? '조명 조절 작동 중' : '조명 소등 상태')}
              {deviceType === 'medication' && (isMedicationTaken ? '오늘 복용을 완료했습니다.' : '아직 미복용 상태입니다.')}
            </p>
          </div>
        </div>

        {/* Toggle Switch Buttons depending on type */}
        {deviceType === 'purifier' && (
          <button 
            onClick={onTogglePurifier}
            className={`w-[56px] h-[32px] rounded-full p-1 transition-colors duration-300 relative ${
              isPurifierOn 
                ? (isDarkMode ? 'bg-white' : 'bg-black') 
                : (isDarkMode ? 'bg-neutral-800 border border-white/10' : 'bg-neutral-200 border border-neutral-300')
            }`}
          >
            <div className={`w-[24px] h-[24px] rounded-full shadow-md transition-all duration-300 ${
              isPurifierOn ? (isDarkMode ? 'bg-black translate-x-6' : 'bg-white translate-x-6') : 'bg-neutral-500 translate-x-0'
            }`} />
          </button>
        )}

        {deviceType === 'dyson' && (
          <button 
            onClick={onToggleDyson}
            className={`w-[56px] h-[32px] rounded-full p-1 transition-colors duration-300 relative ${
              isDysonOn 
                ? (isDarkMode ? 'bg-white' : 'bg-black') 
                : (isDarkMode ? 'bg-neutral-800 border border-white/10' : 'bg-neutral-200 border border-neutral-300')
            }`}
          >
            <div className={`w-[24px] h-[24px] rounded-full shadow-md transition-all duration-300 ${
              isDysonOn ? (isDarkMode ? 'bg-black translate-x-6' : 'bg-white translate-x-6') : 'bg-neutral-500 translate-x-0'
            }`} />
          </button>
        )}

        {deviceType === 'nest' && (
          <button 
            onClick={onToggleNest}
            className={`w-[56px] h-[32px] rounded-full p-1 transition-colors duration-300 relative ${
              isNestOn 
                ? (isDarkMode ? 'bg-white' : 'bg-black') 
                : (isDarkMode ? 'bg-neutral-800 border border-white/10' : 'bg-neutral-200 border border-neutral-300')
            }`}
          >
            <div className={`w-[24px] h-[24px] rounded-full shadow-md transition-all duration-300 ${
              isNestOn ? (isDarkMode ? 'bg-black translate-x-6' : 'bg-white translate-x-6') : 'bg-neutral-500 translate-x-0'
            }`} />
          </button>
        )}

        {deviceType === 'humidity' && (
          <button 
            onClick={onToggleHumidifier}
            className={`w-[56px] h-[32px] rounded-full p-1 transition-colors duration-300 relative ${
              isHumidifierOn 
                ? (isDarkMode ? 'bg-white' : 'bg-black') 
                : (isDarkMode ? 'bg-neutral-800 border border-white/10' : 'bg-neutral-200 border border-neutral-300')
            }`}
          >
            <div className={`w-[24px] h-[24px] rounded-full shadow-md transition-all duration-300 ${
              isHumidifierOn ? (isDarkMode ? 'bg-black translate-x-6' : 'bg-white translate-x-6') : 'bg-neutral-500 translate-x-0'
            }`} />
          </button>
        )}

        {deviceType === 'light' && (
          <button 
            onClick={onToggleLight}
            className={`w-[56px] h-[32px] rounded-full p-1 transition-colors duration-300 relative ${
              isLightOn 
                ? (isDarkMode ? 'bg-white' : 'bg-black') 
                : (isDarkMode ? 'bg-neutral-800 border border-white/10' : 'bg-neutral-200 border border-neutral-300')
            }`}
          >
            <div className={`w-[24px] h-[24px] rounded-full shadow-md transition-all duration-300 ${
              isLightOn ? (isDarkMode ? 'bg-black translate-x-6' : 'bg-white translate-x-6') : 'bg-neutral-500 translate-x-0'
            }`} />
          </button>
        )}

        {deviceType === 'medication' && (
          <button 
            onClick={onToggleMedication}
            className={`h-[32px] px-3.5 rounded-full font-bold text-[12px] transition-all ${
              isMedicationTaken 
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                : (isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800')
            }`}
          >
            {isMedicationTaken ? '복용 취소' : '복용 완료'}
          </button>
        )}
      </div>

      {/* Advanced Control Settings (Sliders) */}
      {isDysonOn && deviceType === 'dyson' && (
        <div className={`rounded-[28px] p-6 mt-4 border flex flex-col gap-5 transition-all ${
          isDarkMode ? 'bg-[#111111] border-white/5 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
        }`}>
          {/* Temperature Setting */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[14px] font-bold">설정 희망 온도</span>
              <span className="text-[16px] font-extrabold text-blue-500">{dysonTemp}°C</span>
            </div>
            <input 
              type="range" 
              min="16" 
              max="30" 
              step="1"
              value={dysonTemp}
              onChange={(e) => onChangeDysonTemp(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-full bg-blue-500/15 cursor-pointer accent-blue-500"
            />
          </div>

          {/* Fan Speed Setting */}
          <div className="flex flex-col gap-2 pt-3 border-t border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-semibold">바람 세기 설정</span>
              <span className="text-[15px] font-bold text-blue-500">{localFanSpeed} 단계</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={localFanSpeed}
              onChange={(e) => setLocalFanSpeed(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-full cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      )}

      {isNestOn && deviceType === 'nest' && (
        <div className={`rounded-[28px] p-6 mt-4 border flex flex-col gap-5 transition-all ${
          isDarkMode ? 'bg-[#111111] border-white/5 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
        }`}>
          {/* Volume Setting */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[14px] font-bold">오디오 볼륨 조절</span>
              <span className="text-[16px] font-extrabold text-orange-500">{nestVolume}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="5"
              value={nestVolume}
              onChange={(e) => onChangeNestVolume(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-full bg-orange-500/15 cursor-pointer accent-orange-500"
            />
          </div>

          {/* Screen Brightness Setting */}
          <div className="flex flex-col gap-2 pt-3 border-t border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-semibold">화면 밝기 설정</span>
              <span className="text-[15px] font-bold text-orange-500">{localNestBrightness}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={localNestBrightness}
              onChange={(e) => setLocalNestBrightness(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-full cursor-pointer accent-orange-500"
            />
          </div>

          {/* Ambient Screen Mode */}
          <div className="flex flex-col gap-2 pt-3 border-t border-white/5">
            <span className="text-[13px] font-semibold">대기 화면 모드</span>
            <div className="flex gap-2 mt-1">
              {["시계", "액자", "대시보드"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLocalNestMode(mode)}
                  className={`flex-1 h-[32px] rounded-lg text-[11px] font-bold border transition-colors ${
                    localNestMode === mode
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : (isDarkMode ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10' : 'bg-neutral-100 border-neutral-300 text-neutral-800 hover:bg-neutral-200')
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isHumidifierOn && deviceType === 'humidity' && (
        <div className={`rounded-[28px] p-6 mt-4 border flex flex-col gap-3 transition-all ${
          isDarkMode ? 'bg-[#111111] border-white/5 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
        }`}>
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-bold">희망 습도 조절</span>
            <span className="text-[16px] font-extrabold text-blue-500">{targetHumidity}%</span>
          </div>
          <input 
            type="range" 
            min="30" 
            max="80" 
            step="5"
            value={targetHumidity}
            onChange={(e) => onChangeTargetHumidity(parseInt(e.target.value))}
            className="w-full h-1.5 rounded-full bg-blue-500/15 cursor-pointer accent-blue-500"
          />
        </div>
      )}

      {isLightOn && deviceType === 'light' && (
        <div className={`rounded-[28px] p-6 mt-4 border flex flex-col gap-5 transition-all ${
          isDarkMode ? 'bg-[#111111] border-white/5 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
        }`}>
          {/* Light Mode: Auto Circadian vs Manual */}
          <div className="flex justify-between items-center pb-3 border-b border-white/5">
            <div>
              <span className="text-[14px] font-bold block">생체 리듬(Circadian) 모드</span>
              <span className={`text-[10px] ${isDarkMode ? 'text-white/40' : 'text-neutral-500'}`}>수면/활동에 맞춰 색온도 자동화</span>
            </div>
            <button 
              onClick={onToggleLightMode}
              className={`h-[28px] px-3 rounded-full text-[11px] font-bold border transition-colors ${
                isLightAuto 
                  ? 'bg-yellow-500 border-yellow-500 text-white' 
                  : (isDarkMode ? 'bg-white/5 border-white/10 text-white/60' : 'bg-neutral-100 border-neutral-300 text-neutral-800')
              }`}
            >
              {isLightAuto ? '자동 제어 온' : '수동 제어'}
            </button>
          </div>

          {/* Brightness slider - Only interactive in manual mode */}
          <div className={`flex flex-col gap-2 ${isLightAuto ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-semibold">밝기 조절</span>
              <span className="text-[15px] font-bold text-yellow-500">{localBrightness}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={localBrightness}
              onChange={(e) => setLocalBrightness(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-full cursor-pointer accent-yellow-500"
            />
          </div>

          {/* Temperature slider - Only interactive in manual mode */}
          <div className={`flex flex-col gap-2 ${isLightAuto ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-semibold">색온도 조절</span>
              <span className="text-[15px] font-bold text-orange-450">{localTemp}K</span>
            </div>
            <input 
              type="range" 
              min="2700" 
              max="6500" 
              step="100"
              value={localTemp}
              onChange={(e) => setLocalTemp(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-full cursor-pointer accent-orange-500"
            />
          </div>
        </div>
      )}

      {/* Sensor Grid Section */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Metric 1 Card */}
        <div className={`rounded-[27px] p-5 flex flex-col justify-between h-[130px] border transition-all ${
          isDarkMode ? 'bg-[#111111] border-white/5 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            {deviceType === 'purifier' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPurifierOn ? 'bg-emerald-500/10 text-emerald-450' : 'bg-neutral-500/10 text-neutral-450'}`}>{isPurifierOn ? 'GOOD' : 'OFF'}</span>}
            {deviceType === 'dyson' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isDysonOn ? 'bg-blue-500/10 text-blue-450' : 'bg-neutral-500/10 text-neutral-450'}`}>{isDysonOn ? 'ACTIVE' : 'OFF'}</span>}
            {deviceType === 'nest' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isNestOn ? 'bg-orange-500/10 text-orange-450' : 'bg-neutral-500/10 text-neutral-450'}`}>{isNestOn ? 'ONLINE' : 'OFF'}</span>}
            {deviceType === 'humidity' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isHumidifierOn ? 'bg-blue-500/10 text-blue-450' : 'bg-neutral-500/10 text-neutral-450'}`}>{isHumidifierOn ? 'NORMAL' : 'OFF'}</span>}
            {deviceType === 'light' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isLightOn ? 'bg-yellow-500/10 text-yellow-450' : 'bg-neutral-500/10 text-neutral-450'}`}>{isLightOn ? 'ACTIVE' : 'OFF'}</span>}
            {deviceType === 'medication' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isMedicationTaken ? 'bg-emerald-500/10 text-emerald-450' : 'bg-orange-500/10 text-orange-450'}`}>{isMedicationTaken ? 'COMPLETE' : 'PENDING'}</span>}
          </div>
          <div>
            <span className={`text-[12px] font-bold block tracking-wider ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>
              {deviceType === 'purifier' && "PM 2.5"}
              {deviceType === 'dyson' && "설정 희망 온도"}
              {deviceType === 'nest' && "기기 연결 상태"}
              {deviceType === 'humidity' && "현재 실내 습도"}
              {deviceType === 'light' && "조명 제어 모드"}
              {deviceType === 'medication' && "복용 스케줄"}
            </span>
            <div className="flex items-baseline mt-1">
              <span className="text-[24px] font-extrabold leading-none">
                {deviceType === 'purifier' && (isPurifierOn ? '12' : '-')}
                {deviceType === 'dyson' && (isDysonOn ? `${dysonTemp}` : '-')}
                {deviceType === 'nest' && (isNestOn ? '양호' : '-')}
                {deviceType === 'humidity' && (isHumidifierOn ? '45' : '-')}
                {deviceType === 'light' && (isLightOn ? (isLightAuto ? '생체자동' : '수동모드') : '-')}
                {deviceType === 'medication' && "오후 13:00"}
              </span>
              {deviceType === 'purifier' && isPurifierOn && <span className={`text-[12px] ml-1 ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>µg/m³</span>}
              {deviceType === 'dyson' && isDysonOn && <span className={`text-[12px] ml-1 ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>°C</span>}
              {deviceType === 'humidity' && isHumidifierOn && <span className={`text-[12px] ml-1 ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>%</span>}
            </div>
          </div>
        </div>

        {/* Metric 2 Card */}
        <div className={`rounded-[27px] p-5 flex flex-col justify-between h-[130px] border transition-all ${
          isDarkMode ? 'bg-[#111111] border-white/5 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            {deviceType === 'purifier' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPurifierOn ? 'bg-emerald-500/10 text-emerald-450' : 'bg-neutral-500/10 text-neutral-450'}`}>{isPurifierOn ? 'GOOD' : 'OFF'}</span>}
            {deviceType === 'dyson' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isDysonOn ? 'bg-blue-500/10 text-blue-450' : 'bg-neutral-500/10 text-neutral-450'}`}>{isDysonOn ? 'OPTIMAL' : 'OFF'}</span>}
            {deviceType === 'nest' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isNestOn ? 'bg-orange-500/10 text-orange-450' : 'bg-neutral-500/10 text-neutral-450'}`}>{isNestOn ? 'LINKED' : 'OFF'}</span>}
            {deviceType === 'humidity' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isHumidifierOn ? 'bg-blue-500/10 text-blue-450' : 'bg-neutral-500/10 text-neutral-450'}`}>{isHumidifierOn ? 'STABLE' : 'OFF'}</span>}
            {deviceType === 'light' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isLightOn ? 'bg-yellow-500/10 text-yellow-450' : 'bg-neutral-500/10 text-neutral-450'}`}>{isLightOn ? 'OPTIMAL' : 'OFF'}</span>}
            {deviceType === 'medication' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isMedicationTaken ? 'bg-emerald-500/10 text-emerald-450' : 'bg-neutral-500/10 text-neutral-450'}`}>{isMedicationTaken ? 'EXCELLENT' : 'NORMAL'}</span>}
          </div>
          <div>
            <span className={`text-[12px] font-bold block tracking-wider ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>
              {deviceType === 'purifier' && "PM 10"}
              {deviceType === 'dyson' && "팬 바람 속도"}
              {deviceType === 'nest' && "현재 연동된 기기"}
              {deviceType === 'humidity' && "설정 목표 습도"}
              {deviceType === 'light' && "기기 밝기 수치"}
              {deviceType === 'medication' && "주간 준수율"}
            </span>
            <div className="flex items-baseline mt-1">
              <span className="text-[24px] font-extrabold leading-none">
                {deviceType === 'purifier' && (isPurifierOn ? '24' : '-')}
                {deviceType === 'dyson' && (isDysonOn ? `${localFanSpeed}` : '-')}
                {deviceType === 'nest' && (isNestOn ? '4개 기기' : '-')}
                {deviceType === 'humidity' && (isHumidifierOn ? `${targetHumidity}` : '-')}
                {deviceType === 'light' && (isLightOn ? `${localBrightness}` : '-')}
                {deviceType === 'medication' && "94%"}
              </span>
              {deviceType === 'purifier' && isPurifierOn && <span className={`text-[12px] ml-1 ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>µg/m³</span>}
              {deviceType === 'dyson' && isDysonOn && <span className={`text-[12px] ml-1 ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>단계</span>}
              {deviceType === 'humidity' && isHumidifierOn && <span className={`text-[12px] ml-1 ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>%</span>}
              {deviceType === 'light' && isLightOn && <span className={`text-[12px] ml-1 ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>%</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Auto Management Information Card */}
      <div className={`rounded-[27px] p-5 mt-4 space-y-4 border transition-all ${
        isDarkMode ? 'bg-[#111111] border-white/5 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold">
            {meta.statusTitle}
          </h3>
          {((deviceType === 'purifier' && isPurifierOn) ||
            (deviceType === 'dyson' && isDysonOn) ||
            (deviceType === 'nest' && isNestOn) ||
            (deviceType === 'humidity' && isHumidifierOn) ||
            (deviceType === 'light' && isLightOn) ||
            (deviceType === 'medication' && isMedicationTaken)) && (
            <span className={`text-[14px] font-semibold text-emerald-500`}>Clean</span>
          )}
        </div>
        
        {/* Progress bar */}
        <div className={`h-[6px] overflow-hidden rounded-full w-full ${isDarkMode ? 'bg-white/5' : 'bg-neutral-100'}`}>
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              isDarkMode ? 'bg-white' : 'bg-black'
            }`}
            style={{
              width: ((deviceType === 'purifier' && isPurifierOn) ||
                     (deviceType === 'dyson' && isDysonOn) ||
                     (deviceType === 'nest' && isNestOn) ||
                     (deviceType === 'humidity' && isHumidifierOn) ||
                     (deviceType === 'light' && isLightOn) ||
                     (deviceType === 'medication' && isMedicationTaken)) ? '75%' : '0%'
            }}
          />
        </div>

        <div className={`text-[14px] leading-relaxed space-y-2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          <p>{meta.guideText}</p>
          <div className={`text-[12px] pt-2 border-t ${isDarkMode ? 'text-white/40 border-white/5' : 'text-neutral-450 border-neutral-200'}`}>
            *해당 서비스는 Orbi 의료 AI 가이드라인을 준수합니다.{' '}
            <span className={`underline cursor-pointer ${isDarkMode ? 'hover:text-white' : 'hover:text-neutral-800'}`}>자세히보기</span>
          </div>
        </div>
      </div>

      {/* Device History Chart */}
      <div className={`rounded-[32px] p-6 mt-4 flex flex-col gap-6 border transition-all ${
        isDarkMode ? 'bg-[#111111] border-white/5 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-semibold tracking-wide">준수 현황 및 사용 기록</h3>
          <span className={`text-[12px] tracking-wider ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>최근 기록</span>
        </div>

        {/* Chart Bars */}
        <div className="h-[128px] flex items-end justify-between gap-1 mt-2">
          {historyData.map((data, idx) => (
            <div 
              key={idx} 
              className={`flex-1 rounded-t-[2px] transition-all duration-700 ${
                isDarkMode ? 'bg-white' : 'bg-black'
              }`}
              style={{ 
                height: ((deviceType === 'purifier' && isPurifierOn) ||
                         (deviceType === 'dyson' && isDysonOn) ||
                         (deviceType === 'nest' && isNestOn) ||
                         (deviceType === 'humidity' && isHumidifierOn) ||
                         (deviceType === 'light' && isLightOn) ||
                         (deviceType === 'medication' && isMedicationTaken)) ? data.height : '4px',
                opacity: ((deviceType === 'purifier' && isPurifierOn) ||
                         (deviceType === 'dyson' && isDysonOn) ||
                         (deviceType === 'nest' && isNestOn) ||
                         (deviceType === 'humidity' && isHumidifierOn) ||
                         (deviceType === 'light' && isLightOn) ||
                         (deviceType === 'medication' && isMedicationTaken)) 
                  ? (idx === 10 ? 0.8 : (idx === 4 ? 0.7 : 0.2)) 
                  : 0.05
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
