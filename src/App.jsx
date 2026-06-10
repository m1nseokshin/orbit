import React, { useState, useEffect, useRef } from 'react';
import Splash from './components/Splash';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import DeviceDetail from './components/DeviceDetail';
import OrbiGateway from './components/OrbiGateway';
import OrbiChat from './components/OrbiChat';
import DeviceList from './components/DeviceList';
import DevicePairing from './components/DevicePairing';
import InsightDashboard from './components/InsightDashboard';
import Settings from './components/Settings';
import CheckupDetail from './components/CheckupDetail';

// Bottom Navigation Icons
const ICON_HOME = "https://www.figma.com/api/mcp/asset/38bd4e76-9dd5-4fac-b577-3ea494b3fd9b";
const ICON_ORBI = "https://www.figma.com/api/mcp/asset/6c57b8a1-9396-43bf-9615-565746d77738";
const ICON_DEVICE = "https://www.figma.com/api/mcp/asset/1e6ddca6-7096-4349-be45-d63b8e176b66";
const ICON_INSIGHT = "https://www.figma.com/api/mcp/asset/3ec5e492-c1d5-4e83-9f10-a3ce841ce3db";
const ICON_SETTINGS = "https://www.figma.com/api/mcp/asset/18fcfcd9-0cbd-4ff2-9d1d-46a21d3adcf5";

export default function App() {
  const [screen, setScreen] = useState('splash'); // 'splash' | 'onboarding' | 'dashboard' | 'device-detail' | 'pairing' | 'chat'
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'orbi' | 'devices' | 'insights' | 'settings'
  const [isOnboardingTransitioning, setIsOnboardingTransitioning] = useState(false);
  const [isSplashTransitioning, setIsSplashTransitioning] = useState(false);

  // Global shared state
  const [userName, setUserName] = useState('김서희');
  const [isPurifierOn, setIsPurifierOn] = useState(true);
  const [isLightOn, setIsLightOn] = useState(false);
  const [isLightAuto, setIsLightAuto] = useState(true);
  const [isPurifierPaired, setIsPurifierPaired] = useState(true);
  const [isLightPaired, setIsLightPaired] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editProfileOnLoad, setEditProfileOnLoad] = useState(false);
  const [selectedDeviceType, setSelectedDeviceType] = useState('purifier');
  const [isHumidifierOn, setIsHumidifierOn] = useState(true);
  const [targetHumidity, setTargetHumidity] = useState(50);
  const [isMedicationTaken, setIsMedicationTaken] = useState(false);
  const [isNestOn, setIsNestOn] = useState(false);
  const [isDysonOn, setIsDysonOn] = useState(true);
  const [dysonTemp, setDysonTemp] = useState(22);
  const [nestVolume, setNestVolume] = useState(45);

  // Push Notification States
  const [activeNotification, setActiveNotification] = useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const dragStartY = useRef(null);

  // Sync HTML/Body backgrounds and theme-color meta tag with isDarkMode
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const themeColor = isDarkMode ? '#000000' : '#fafafa';
    
    // Set CSS Variable
    root.style.setProperty('--theme-bg', themeColor);
    
    // Set inline styles for absolute assurance
    root.style.backgroundColor = themeColor;
    body.style.backgroundColor = themeColor;

    // Find and update theme-color meta tag
    let meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', themeColor);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      meta.setAttribute('content', themeColor);
      document.head.appendChild(meta);
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (screen === 'splash' || screen === 'onboarding') {
      setIsNotificationVisible(false);
      return;
    }

    let hideTimer;
    const runAlert = () => {
      const notifications = [
        { title: "약 복용 알림", body: `${userName}님, 오후 영양제(비타민 및 오메가3)를 복용할 시간입니다.`, type: "med" },
        { title: "시력 보호 안내", body: "시각 보호를 위해 스마트 조명의 조도와 색온도가 자동으로 조절되었습니다.", type: "light" },
        { title: "청력 보호 조치", body: "청력 손실을 방지하기 위해 스마트 스피커의 볼륨을 안전 범위로 낮췄습니다.", type: "speaker" },
        { title: "수분 보충 안내", body: "수분 섭취 기록 후 2시간이 경과했습니다. 미온수 한 잔을 섭취하세요.", type: "water" },
        { title: "실내 환기 추천", body: "실내 이산화탄소 농도가 상승했습니다. 가볍게 환기를 하거나 환기 필터를 가동하세요.", type: "air" },
        { title: "스트레칭 제안", body: "장시간 비활동 상태가 감지되었습니다. 굳어있는 허리를 풀기 위해 기지개를 켜보세요.", type: "stretch" }
      ];
      const randomAlert = notifications[Math.floor(Math.random() * notifications.length)];
      setActiveNotification(randomAlert);
      setIsNotificationVisible(true);

      // Hide after 5 seconds
      hideTimer = setTimeout(() => {
        setIsNotificationVisible(false);
      }, 5000);
    };

    // Loop every 40 seconds
    const interval = setInterval(() => {
      runAlert();
    }, 40000);

    // Initial alert after 5 seconds of entering the main dashboard
    const initialTimer = setTimeout(() => {
      runAlert();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [screen, userName]);

  const handleBannerTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
  };

  const handleBannerTouchMove = (e) => {
    if (dragStartY.current === null) return;
    const deltaY = e.touches[0].clientY - dragStartY.current;
    if (deltaY < -15) { // swiped up by 15px
      setIsNotificationVisible(false);
      dragStartY.current = null;
    }
  };

  const handleBannerMouseDown = (e) => {
    dragStartY.current = e.clientY;
  };

  const handleBannerMouseMove = (e) => {
    if (dragStartY.current === null) return;
    const deltaY = e.clientY - dragStartY.current;
    if (deltaY < -15) { // dragged up by 15px
      setIsNotificationVisible(false);
      dragStartY.current = null;
    }
  };

  const handleBannerDragEnd = () => {
    dragStartY.current = null;
  };


  // Window size listener and scale factor logic (Figma Blueprint: 402px x 874px)
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 402,
    height: typeof window !== 'undefined' ? window.innerHeight : 874
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Disable image/text dragging, context menu, and copying globally
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleDragStart = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isMobile = dimensions.width < 768;
  const padding = isMobile ? 0 : 48; // Breathing room padding on desktop
  const availWidth = dimensions.width - padding;
  const availHeight = dimensions.height - padding;
  
  // On mobile, scale to fit width and let canvas height stretch to fill the screen.
  // On desktop, scale to fit the 402x874 aspect ratio box.
  const scale = isMobile ? (availWidth / 402) : Math.min(availWidth / 402, availHeight / 874);

  const canvasWidth = 402;
  const canvasHeight = isMobile ? (availHeight / scale) : 874;

  const scaledWidth = canvasWidth * scale;
  const scaledHeight = canvasHeight * scale;

  // Clear transition after slide animation is complete
  useEffect(() => {
    if (isOnboardingTransitioning) {
      const timer = setTimeout(() => {
        setIsOnboardingTransitioning(false);
      }, 3150);
      return () => clearTimeout(timer);
    }
  }, [isOnboardingTransitioning]);

  // Clear splash transition
  useEffect(() => {
    if (isSplashTransitioning) {
      const timer = setTimeout(() => {
        setIsSplashTransitioning(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isSplashTransitioning]);

  const handleSplashComplete = () => {
    setIsSplashTransitioning(true);
    setScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setIsOnboardingTransitioning(true);
    setScreen('dashboard');
  };

  const handleNavigate = (targetScreen, deviceType = null) => {
    setScreen(targetScreen);
    if (deviceType) {
      setSelectedDeviceType(deviceType);
    }
  };

  const handleEditProfile = () => {
    setActiveTab('settings');
    setEditProfileOnLoad(true);
  };

  const handleLogout = () => {
    setScreen('splash');
    setActiveTab('home');
    // Reset defaults
    setUserName('김서희');
    setIsPurifierOn(true);
    setIsLightOn(false);
    setIsLightAuto(true);
    setIsPurifierPaired(true);
    setIsLightPaired(true);
    setIsHumidifierOn(true);
    setTargetHumidity(50);
    setIsMedicationTaken(false);
    setIsNestOn(false);
    setIsDysonOn(true);
    setDysonTemp(22);
    setNestVolume(45);
  };

  const togglePurifier = () => {
    setIsPurifierOn(!isPurifierOn);
  };

  const toggleLight = () => {
    setIsLightOn(!isLightOn);
  };

  const toggleLightMode = () => {
    setIsLightAuto(!isLightAuto);
    if (isLightAuto) {
      setIsLightOn(true); // turn on light if manual mode activated
    }
  };

  const handleViewOrbiAnalysis = () => {
    setActiveTab('orbi');
  };

  const handleStartMeditation = () => {
    setScreen('chat');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`w-full h-full flex items-center justify-center transition-colors duration-500 overflow-hidden ${
      isMobile ? 'fixed inset-0' : 'min-h-screen'
    } ${
      isDarkMode ? 'bg-[#0d0d0d]' : 'bg-[#fafafa]'
    }`}>
      {/* Outer Scaled Wrapper */}
      <div 
        style={{ 
          width: isMobile ? '100%' : `${scaledWidth}px`, 
          height: isMobile ? '100%' : `${scaledHeight}px`,
          position: 'relative',
          overflow: 'hidden'
        }}
        className={`transition-all duration-300 ${
          isMobile 
            ? 'rounded-none' 
            : `rounded-[40px] ${
                isDarkMode 
                  ? 'border border-white/10 shadow-2xl shadow-black' 
                  : 'border border-neutral-200 shadow-2xl shadow-neutral-400/50'
              }`
        }`}
      >
        {/* Inner Figma-Locked 402x874 Canvas */}
        <div 
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            left: 0,
            top: 0
          }}
          className={`overflow-hidden relative flex flex-col select-none transition-colors duration-500 ${
            isDarkMode ? 'bg-black text-white' : 'bg-[#fafafa] text-neutral-900'
          }`}
        >
        
        {/* Content Area */}
        <div className="flex-1 w-full h-full relative overflow-hidden flex flex-col">
          {(screen === 'splash' || isSplashTransitioning) && (
            <div className={`absolute inset-0 w-full h-full z-40 ${isSplashTransitioning ? 'pointer-events-none animate-slideLeftOut' : ''}`}>
              <Splash onComplete={handleSplashComplete} />
            </div>
          )}

          {(screen === 'onboarding' || isOnboardingTransitioning || isSplashTransitioning) && (
            <div className={`absolute inset-0 w-full h-full z-10 ${
              isSplashTransitioning ? 'animate-slideLeftIn' : ''
            } ${
              isOnboardingTransitioning ? 'pointer-events-none animate-fadeOut' : ''
            }`}>
              <Onboarding 
                onComplete={handleOnboardingComplete} 
                forceStep={isOnboardingTransitioning ? 3 : (isSplashTransitioning ? 0 : undefined)} 
              />
            </div>
          )}

          {screen === 'device-detail' && (
            <DeviceDetail 
              deviceType={selectedDeviceType}
              onBack={() => setScreen('dashboard')} 
              isPurifierOn={isPurifierOn} 
              onTogglePurifier={togglePurifier} 
              isLightOn={isLightOn}
              onToggleLight={toggleLight}
              isLightAuto={isLightAuto}
              onToggleLightMode={toggleLightMode}
              isHumidifierOn={isHumidifierOn}
              onToggleHumidifier={() => setIsHumidifierOn(!isHumidifierOn)}
              targetHumidity={targetHumidity}
              onChangeTargetHumidity={setTargetHumidity}
              isMedicationTaken={isMedicationTaken}
              onToggleMedication={() => setIsMedicationTaken(!isMedicationTaken)}
              isNestOn={isNestOn}
              onToggleNest={() => setIsNestOn(!isNestOn)}
              isDysonOn={isDysonOn}
              onToggleDyson={() => setIsDysonOn(!isDysonOn)}
              dysonTemp={dysonTemp}
              onChangeDysonTemp={setDysonTemp}
              nestVolume={nestVolume}
              onChangeNestVolume={setNestVolume}
              isDarkMode={isDarkMode}
            />
          )}

          {screen === 'pairing' && (
            <DevicePairing 
              onBack={() => setScreen('dashboard')} 
              onPairPurifier={() => setIsPurifierPaired(true)} 
              onPairLight={() => setIsLightPaired(true)} 
              isPurifierPaired={isPurifierPaired} 
              isLightPaired={isLightPaired} 
              isDarkMode={isDarkMode}
            />
          )}

          {screen === 'chat' && (
            <OrbiChat onBack={() => setScreen('dashboard')} isDarkMode={isDarkMode} userName={userName} />
          )}

          {screen === 'checkup-detail' && (
            <CheckupDetail onBack={() => setScreen('dashboard')} isDarkMode={isDarkMode} />
          )}


          {screen === 'dashboard' && (
            <div className={`w-full h-full flex flex-col justify-between relative overflow-hidden ${
              isOnboardingTransitioning ? 'animate-slideUpSlower absolute inset-0 z-30' : ''
            }`}>
              {/* Active Tab Screen */}
              {activeTab === 'home' && (
                <Home 
                  onNavigate={handleNavigate} 
                  isPurifierOn={isPurifierOn} 
                  onTogglePurifier={togglePurifier} 
                  isLightOn={isLightOn} 
                  onToggleLight={toggleLight}
                  isNestOn={isNestOn}
                  onToggleNest={() => setIsNestOn(!isNestOn)}
                  isDysonOn={isDysonOn}
                  onToggleDyson={() => setIsDysonOn(!isDysonOn)}
                  dysonTemp={dysonTemp}
                  nestVolume={nestVolume}
                  onViewOrbiAnalysis={handleViewOrbiAnalysis}
                  onEditProfile={handleEditProfile}
                  isDarkMode={isDarkMode}
                  userName={userName}
                />
              )}

              {activeTab === 'orbi' && (
                <OrbiGateway onNavigate={setScreen} isDarkMode={isDarkMode} />
              )}

              {activeTab === 'devices' && (
                <DeviceList 
                  onNavigate={handleNavigate} 
                  isPurifierOn={isPurifierOn} 
                  onTogglePurifier={togglePurifier} 
                  isLightOn={isLightOn} 
                  isLightAuto={isLightAuto} 
                  onToggleLightMode={toggleLightMode}
                  isPurifierPaired={isPurifierPaired}
                  isLightPaired={isLightPaired}
                  isDarkMode={isDarkMode}
                />
              )}

              {activeTab === 'insights' && (
                <InsightDashboard onStartMeditation={handleStartMeditation} isDarkMode={isDarkMode} />
              )}

              {activeTab === 'settings' && (
                <Settings 
                  onNavigate={setScreen} 
                  userName={userName} 
                  onChangeUserName={setUserName} 
                  onLogout={handleLogout} 
                  isDarkMode={isDarkMode}
                  onToggleTheme={toggleTheme}
                  forceEditName={editProfileOnLoad}
                  onClearForceEdit={() => setEditProfileOnLoad(false)}
                />
              )}

              {/* Shared Bottom Navigation Bar (rendered exactly as figma index design) */}
              <nav 
                style={{
                  paddingBottom: 'calc(12px + env(safe-area-inset-bottom))'
                }}
                className={`absolute bottom-0 left-0 right-0 backdrop-blur-[35px] border-t pt-[14px] px-[26px] flex justify-between items-center z-40 transition-all duration-500 rounded-t-[32px] ${
                  isDarkMode 
                    ? 'bg-black/80 border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]' 
                    : 'bg-white/80 border-neutral-200 shadow-[0_-8px_32px_rgba(0,0,0,0.05)]'
                }`}
              >
                {/* Home tab */}
                <button 
                  onClick={() => setActiveTab('home')} 
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                    activeTab === 'home' 
                      ? 'opacity-100 scale-105 font-bold' 
                      : 'opacity-50 hover:opacity-80 scale-100 font-medium'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${activeTab === 'home' ? 'bg-white/10' : ''}`}>
                    <img src={ICON_HOME} alt="Home" className={`w-5 h-5 object-contain ${!isDarkMode && activeTab !== 'home' ? 'invert' : ''}`} />
                  </div>
                  <span className="text-[10px] tracking-wide">홈</span>
                </button>

                {/* Orbi tab */}
                <button 
                  onClick={() => setActiveTab('orbi')} 
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                    activeTab === 'orbi' 
                      ? 'opacity-100 scale-105 font-bold' 
                      : 'opacity-50 hover:opacity-80 scale-100 font-medium'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${activeTab === 'orbi' ? 'bg-white/10' : ''}`}>
                    <img src={ICON_ORBI} alt="Orbi" className={`w-5 h-5 object-contain ${!isDarkMode && activeTab !== 'orbi' ? 'invert' : ''}`} />
                  </div>
                  <span className="text-[10px] tracking-wide">오르비</span>
                </button>

                {/* Devices tab */}
                <button 
                  onClick={() => setActiveTab('devices')} 
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                    activeTab === 'devices' 
                      ? 'opacity-100 scale-105 font-bold' 
                      : 'opacity-50 hover:opacity-80 scale-100 font-medium'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${activeTab === 'devices' ? 'bg-white/10' : ''}`}>
                    <img src={ICON_DEVICE} alt="Devices" className={`w-5 h-5 object-contain ${!isDarkMode && activeTab !== 'devices' ? 'invert' : ''}`} />
                  </div>
                  <span className="text-[10px] tracking-wide">기기 관리</span>
                </button>

                {/* Insights tab */}
                <button 
                  onClick={() => setActiveTab('insights')} 
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                    activeTab === 'insights' 
                      ? 'opacity-100 scale-105 font-bold' 
                      : 'opacity-50 hover:opacity-80 scale-100 font-medium'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${activeTab === 'insights' ? 'bg-white/10' : ''}`}>
                    <img src={ICON_INSIGHT} alt="Insights" className={`w-5 h-5 object-contain ${!isDarkMode && activeTab !== 'insights' ? 'invert' : ''}`} />
                  </div>
                  <span className="text-[10px] tracking-wide">인사이트</span>
                </button>

                {/* Settings tab */}
                <button 
                  onClick={() => setActiveTab('settings')} 
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                    activeTab === 'settings' 
                      ? 'opacity-100 scale-105 font-bold' 
                      : 'opacity-50 hover:opacity-80 scale-100 font-medium'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${activeTab === 'settings' ? 'bg-white/10' : ''}`}>
                    <img src={ICON_SETTINGS} alt="Settings" className={`w-5 h-5 object-contain ${!isDarkMode && activeTab !== 'settings' ? 'invert' : ''}`} />
                  </div>
                  <span className="text-[10px] tracking-wide">설정</span>
                </button>
              </nav>
            </div>
          )}
          {/* iOS-style Global Push Notification Banner */}
          {activeNotification && (
            <div 
              onMouseDown={handleBannerMouseDown}
              onMouseMove={handleBannerMouseMove}
              onMouseUp={handleBannerDragEnd}
              onMouseLeave={handleBannerDragEnd}
              onTouchStart={handleBannerTouchStart}
              onTouchMove={handleBannerTouchMove}
              onTouchEnd={handleBannerDragEnd}
              className={`absolute top-[20px] left-[16px] right-[16px] z-[9999] p-4 rounded-[20px] backdrop-blur-md shadow-2xl flex flex-col gap-1 border transition-all duration-500 cursor-grab active:cursor-grabbing select-none ${
                isNotificationVisible 
                  ? 'animate-notification-in translate-y-0 opacity-100' 
                  : 'animate-notification-out -translate-y-full opacity-0 pointer-events-none'
              } ${
                isDarkMode 
                  ? 'bg-black/75 border-white/10 text-white shadow-black/80' 
                  : 'bg-white/85 border-neutral-200 text-neutral-900 shadow-neutral-300/40'
              }`}
              style={{
                touchAction: 'none'
              }}
            >
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md overflow-hidden bg-black flex items-center justify-center shadow-sm shrink-0 border border-white/10">
                    <img src="/orbi-logo.png" alt="Orbi Logo" className="w-full h-full object-cover pointer-events-none" />
                  </div>
                  <span className="text-[11px] font-extrabold tracking-tight">Orbi</span>
                </div>
                <span className={`text-[10px] font-semibold ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>지금</span>
              </div>
              <h4 className="text-[13px] font-extrabold tracking-tight">{activeNotification.title}</h4>
              <p className={`text-[11.5px] leading-snug font-semibold ${isDarkMode ? 'text-white/80' : 'text-neutral-600'}`}>{activeNotification.body}</p>
              
              {/* Swipe-up indicator bar */}
              <div className={`w-8 h-[3px] rounded-full mx-auto mt-2 ${isDarkMode ? 'bg-white/25' : 'bg-neutral-300'}`} />
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
