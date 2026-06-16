import React, { useState, useRef } from 'react';
import CountUp from './Shared/CountUp';

const imgRectangle2 = import.meta.env.BASE_URL + "figma/5b9cc0c1-701e-4556-ad0b-2bcb1e2d5649.png";
const imgIcon = import.meta.env.BASE_URL + "figma/bf97bbf3-084b-4161-b752-b97518236e7f.svg";
const imgSvg = import.meta.env.BASE_URL + "figma/473c72c6-9cd8-4680-aa71-4b211184ca52.svg";
const imgBoxiconsLightBulb = import.meta.env.BASE_URL + "figma/9a40b9da-f1c3-418c-b127-73033fa16d96.svg";

export default function Home({ 
  onNavigate, 
  isPurifierOn, 
  onTogglePurifier, 
  isLightOn, 
  onToggleLight, 
  isNestOn, 
  onToggleNest, 
  isDysonOn, 
  onToggleDyson, 
  dysonTemp, 
  nestVolume, 
  onViewOrbiAnalysis, 
  onEditProfile, 
  isDarkMode,
  userName
}) {
  // Local states for additional mock smart devices (Google & Dyson)
  const [waterIntake, setWaterIntake] = useState(800);

  // Date formatting
  const today = new Date();
  const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  const dateString = today.toLocaleDateString('en-US', dateOptions);

  // Swipe Carousel control
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft } = carouselRef.current;
    // We adjust math for square card sizing gap (166px card + 14px gap)
    const cardWidthWithGap = 180; 
    const newIndex = Math.round(scrollLeft / cardWidthWithGap);
    setActiveIndex(Math.min(Math.max(newIndex, 0), 3));
  };

  const scrollToCard = (index) => {
    if (!carouselRef.current) return;
    const cardWidthWithGap = 180;
    carouselRef.current.scrollTo({
      left: index * cardWidthWithGap,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  // Swipe Carousel mouse drag control for desktop
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const onMouseDown = (e) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftPos.current = carouselRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // drag speed multiplier
    carouselRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const incrementWater = () => {
    setWaterIntake(prev => Math.min(prev + 250, 2000));
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const shift = isMobile ? 90 : 0;

  return (
    <div className={`w-full h-full overflow-y-auto pb-32 no-scrollbar scroll-smooth select-none transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-[#fafafa] text-neutral-900'
    }`} data-node-id="11:2661" data-name="index">
      
      {/* Scroll Content Wrapper (forces correct coordinate space height) */}
      <div style={{ height: `${1340 - shift}px` }} className="relative w-full flex-shrink-0">
        
        {/* Date */}
        <div style={{ top: `${146 - shift}px` }} className={`absolute left-[30px] font-sans text-[14px] animate-fadeInUp ${
          isDarkMode ? 'text-[#9ca3af]' : 'text-neutral-500'
        }`}>
          {dateString}
        </div>

        {/* Greeting Title */}
        <h2 style={{ top: `${185 - shift}px` }} className={`absolute left-[30px] w-[327px] text-[36px] font-bold leading-[45px] tracking-tight animate-fadeInUp ${
          isDarkMode ? 'text-white' : 'text-neutral-900'
        }`}>
          {userName}님
          <br />
          좋은 아침이에요!
        </h2>

        {/* Profile Button */}
        <button 
          onClick={onEditProfile} 
          style={{ top: isMobile ? '16px' : '56px' }}
          className={`absolute left-[330px] w-[42px] h-[42px] rounded-full overflow-hidden border flex items-center justify-center focus:outline-none transition-all duration-200 active:scale-95 animate-fadeInUp ${
            isDarkMode ? 'border-white/20 bg-white/5 hover:border-white/40' : 'border-neutral-200 bg-neutral-100 hover:bg-neutral-300 shadow-sm'
          }`}
        >
          <img alt="Profile" className={`w-5 h-5 object-contain ${isDarkMode ? '' : 'invert'}`} src={imgIcon} />
        </button>

        {/* Swipeable Carousel Container (top-[298px], h-[224px]) */}
        <div style={{ top: `${298 - shift}px` }} className="absolute left-0 right-0 h-[224px] animate-fadeInUp delay-75">
          
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            className="flex gap-[14px] overflow-x-auto py-1.5 px-[30px] no-scrollbar snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing select-none"
          >
            
            {/* Card 1: Samsung Bespoke Air Purifier */}
            <div 
              className={`snap-center flex-none w-[166px] h-[166px] rounded-[24px] p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isPurifierOn 
                  ? (isDarkMode ? 'bg-[#1c1c1c] border border-white/20 shadow-md shadow-white/5' : 'bg-white border border-neutral-200 shadow-md') 
                  : (isDarkMode ? 'bg-[#111111] border border-white/5 opacity-50' : 'bg-neutral-100/70 border border-neutral-200 opacity-50')
              }`}
              onClick={() => onNavigate('device-detail', 'purifier')}
            >
              <div className="flex items-start justify-between">
                <div className={`p-1.5 rounded-[10px] flex items-center justify-center ${
                  isDarkMode ? 'bg-white/10' : 'bg-neutral-100'
                }`}>
                  <img alt="Air Purifier Icon" className={`w-4 h-4 object-contain ${isDarkMode ? '' : 'invert'}`} src={imgSvg} />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePurifier();
                  }}
                  className={`px-2.5 py-1 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                    isPurifierOn 
                      ? (isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800') 
                      : (isDarkMode ? 'bg-white/10 text-neutral-400' : 'bg-neutral-200 text-neutral-500')
                  }`}
                >
                  {isPurifierOn ? 'ON' : 'OFF'}
                </button>
              </div>
              <div>
                <span className={`text-[10px] block font-medium ${isDarkMode ? 'text-white/50' : 'text-neutral-500'}`}>공기청정기</span>
                <span className={`text-[15px] font-bold block mt-0.5 leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-850'}`}>Samsung Bespoke</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className={`text-[10px] font-medium whitespace-nowrap ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>
                  {isPurifierOn ? <CountUp to="12" suffix=" ㎍" /> : '- ㎍'}
                </span>
                <div className={`flex-1 h-[3px] overflow-hidden rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-neutral-200'}`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPurifierOn ? (isDarkMode ? 'bg-white w-[66.7%]' : 'bg-black w-[66.7%]') : 'w-0'
                    }`} 
                  />
                </div>
              </div>
            </div>

            {/* Card 2: LG ThinQ Smart Lighting */}
            <div 
              className={`snap-center flex-none w-[166px] h-[166px] rounded-[24px] p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isLightOn 
                  ? (isDarkMode ? 'bg-white text-black shadow-lg shadow-white/15' : 'bg-white border border-neutral-300 text-neutral-900 shadow-md') 
                  : (isDarkMode ? 'bg-[#111111] border border-white/5 text-white opacity-50' : 'bg-neutral-100/70 border border-neutral-200 text-neutral-850 opacity-50')
              }`}
              onClick={() => onNavigate('device-detail', 'light')}
            >
              <div className="flex items-start justify-between">
                <div className={`p-1.5 rounded-[10px] flex items-center justify-center ${
                  isLightOn ? 'bg-black/10' : (isDarkMode ? 'bg-white/10' : 'bg-neutral-100')
                }`}>
                  <img 
                    alt="Light Icon" 
                    className={`w-4 h-4 object-contain ${isLightOn ? 'invert-0' : (isDarkMode ? 'invert' : 'invert-0')}`} 
                    src={imgBoxiconsLightBulb} 
                  />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLight();
                  }}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    isLightOn 
                      ? 'bg-black text-white hover:bg-neutral-800' 
                      : (isDarkMode ? 'bg-white/10 text-neutral-400' : 'bg-neutral-200 text-neutral-500')
                  }`}
                >
                  {isLightOn ? 'ON' : 'OFF'}
                </button>
              </div>
              <div>
                <span className={`text-[10px] block font-medium ${isLightOn ? 'text-black/50' : (isDarkMode ? 'text-white/50' : 'text-neutral-500')}`}>스마트 조명</span>
                <span className="text-[15px] font-bold block mt-0.5 leading-tight">LG ThinQ Smart</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className={`text-[10px] font-medium whitespace-nowrap ${isLightOn ? 'text-black/60' : (isDarkMode ? 'text-white/40' : 'text-neutral-400')}`}>
                  {isLightOn ? <CountUp to="75" suffix="%" /> : '0%'}
                </span>
                <div className={`flex-1 h-[3px] overflow-hidden rounded-full ${isLightOn ? 'bg-black/10' : (isDarkMode ? 'bg-white/10' : 'bg-neutral-200')}`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLightOn ? 'bg-black w-[75%]' : 'w-0'
                    }`} 
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Google Nest Hub Max */}
            <div 
              className={`snap-center flex-none w-[166px] h-[166px] rounded-[24px] p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isNestOn 
                  ? (isDarkMode ? 'bg-[#1c1c1c] border border-white/20 shadow-md shadow-white/5' : 'bg-white border border-neutral-300 shadow-md') 
                  : (isDarkMode ? 'bg-[#111111] border border-white/5 opacity-50' : 'bg-neutral-100/70 border border-neutral-200 opacity-50')
              }`}
              onClick={() => onNavigate('device-detail', 'nest')}
            >
              <div className="flex items-start justify-between">
                <div className={`p-1.5 rounded-[10px] flex items-center justify-center ${
                  isDarkMode ? 'bg-white/10' : 'bg-neutral-100'
                }`}>
                  <svg className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleNest();
                  }}
                  className={`px-2.5 py-1 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                    isNestOn 
                      ? (isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800') 
                      : (isDarkMode ? 'bg-white/10 text-neutral-400' : 'bg-neutral-200 text-neutral-500')
                  }`}
                >
                  {isNestOn ? 'ON' : 'OFF'}
                </button>
              </div>
              <div>
                <span className={`text-[10px] block font-medium ${isDarkMode ? 'text-white/50' : 'text-neutral-500'}`}>스마트 허브</span>
                <span className={`text-[15px] font-bold block mt-0.5 leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-850'}`}>Google Nest Hub</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className={`text-[10px] font-medium whitespace-nowrap ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>
                  Vol: {isNestOn ? <CountUp to={nestVolume} suffix="%" /> : '0%'}
                </span>
                <div className={`flex-1 h-[3px] overflow-hidden rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-neutral-200'}`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isDarkMode ? 'bg-white' : 'bg-black'}`} 
                    style={{ width: isNestOn ? `${nestVolume}%` : '0%' }}
                  />
                </div>
              </div>
            </div>

            {/* Card 4: Dyson Purifier Hot+Cool */}
            <div 
              className={`snap-center flex-none w-[166px] h-[166px] rounded-[24px] p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isDysonOn 
                  ? (isDarkMode ? 'bg-[#1c1c1c] border border-white/20 shadow-md shadow-white/5' : 'bg-white border border-neutral-300 shadow-md') 
                  : (isDarkMode ? 'bg-[#111111] border border-white/5 opacity-50' : 'bg-neutral-100/70 border border-neutral-200 opacity-50')
              }`}
              onClick={() => onNavigate('device-detail', 'dyson')}
            >
              <div className="flex items-start justify-between">
                <div className={`p-1.5 rounded-[10px] flex items-center justify-center ${
                  isDarkMode ? 'bg-white/10' : 'bg-neutral-100'
                }`}>
                  <svg className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5m14 0h-2a2 2 0 00-2 2v6m-4-8V4a1 1 0 00-1-1h-1.5a1 1 0 00-1 1v4M9 9h6m-6 4h6m-6 4h6" />
                  </svg>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleDyson();
                  }}
                  className={`px-2.5 py-1 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                    isDysonOn 
                      ? (isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800') 
                      : (isDarkMode ? 'bg-white/10 text-neutral-400' : 'bg-neutral-200 text-neutral-500')
                  }`}
                >
                  {isDysonOn ? 'ON' : 'OFF'}
                </button>
              </div>
              <div>
                <span className={`text-[10px] block font-medium ${isDarkMode ? 'text-white/50' : 'text-neutral-500'}`}>냉난방 온풍기</span>
                <span className={`text-[15px] font-bold block mt-0.5 leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>Dyson Purifier</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className={`text-[10px] font-medium whitespace-nowrap ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>
                  Temp: {isDysonOn ? <CountUp to={dysonTemp} suffix="°C" /> : '0°C'}
                </span>
                <div className={`flex-1 h-[3px] overflow-hidden rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-neutral-200'}`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isDarkMode ? 'bg-white' : 'bg-black'}`} 
                    style={{ width: isDysonOn ? `${(dysonTemp / 30) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? (isDarkMode ? 'w-4 bg-white' : 'w-4 bg-black') 
                    : (isDarkMode ? 'w-1.5 bg-white/20' : 'w-1.5 bg-black/15')
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Orbi Analysis Section - Redesigned with stable spacing inside the h-[256px] bounds */}
        <div 
          style={{ top: `${549 - shift}px` }}
          className={`absolute left-[30px] right-[30px] h-[256px] rounded-[32px] pt-[20px] pb-[20px] px-[24px] flex flex-col justify-between backdrop-blur-md overflow-hidden animate-fadeInUp delay-150 ${
            isDarkMode ? 'bg-[#111111] border border-white/5 text-white' : 'bg-white border border-neutral-200/80 text-neutral-900 shadow-lg'
          }`}
        >
          <div className="flex flex-col justify-start">
            {/* Star Icon Button for profile modification */}
            <button 
              onClick={onEditProfile}
              className={`w-[30px] h-[30px] rounded-md flex items-center justify-center overflow-hidden shrink-0 transition-all duration-200 active:scale-95 cursor-pointer ${
                isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-neutral-100 hover:bg-neutral-200'
              }`}
              title="프로필 편집"
            >
              <img alt="Orbi Assist" className={`w-[18px] h-[18px] object-contain ${isDarkMode ? '' : 'invert'}`} src={imgIcon} />
            </button>

            <div className="w-full mt-[10px]">
              <h3 className={`text-[24px] font-bold tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                Orbi의 분석
              </h3>
            </div>
            <p className={`text-[15px] leading-[22px] font-medium mt-[8px] ${isDarkMode ? 'text-white/80' : 'text-neutral-600'}`}>
              오늘 오전 심박수가 평소보다{' '}
              <span className={`font-bold underline underline-offset-4 ${isDarkMode ? 'text-white decoration-white/50' : 'text-neutral-900 decoration-neutral-900/50'}`}>
                <CountUp to="5" suffix="%" /> 높아요
              </span>. 수분 섭취를 해주세요. 안정을 위해 명상을 추천해요!
            </p>
          </div>

          {/* Learn More Button - Nested inside the container */}
          <button 
            onClick={onViewOrbiAnalysis}
            className={`w-full h-[48px] font-semibold text-[14px] rounded-[14px] flex items-center justify-center transition-colors active:scale-[0.98] duration-200 shrink-0 ${
              isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            자세히 알아보기
          </button>
        </div>
        
        {/* NEW SCROLL WIDGETS at the bottom (starting at top-[830px]) */}
        
        {/* Water Intake Widget */}
        <div 
          style={{ top: `${830 - shift}px` }}
          className={`absolute left-[30px] right-[30px] h-[130px] rounded-[28px] p-5 flex flex-col justify-between animate-fadeInUp delay-300 ${
            isDarkMode ? 'bg-[#111111] border border-white/5' : 'bg-white border border-neutral-200/80 shadow-md'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex gap-2.5 items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-800'
              }`}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 9.75A7.75 7.75 0 0112 17.5a7.75 7.75 0 01-8-7.75c0-4.5 8-11.75 8-11.75s8 7.25 8 11.75z" />
                </svg>
              </div>
              <div>
                <span className="text-[15px] font-bold block leading-none">오늘의 수분 섭취</span>
                <span className={`text-[10px] mt-1 block ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>수분 섭취 가이드</span>
              </div>
            </div>
            {/* Quick Increment button */}
            <button 
              onClick={incrementWater}
              className={`h-[28px] px-3.5 rounded-full text-[11px] font-bold flex items-center justify-center transition-all active:scale-95 ${
                isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
              }`}
            >
              +250ml
            </button>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <span className={`text-[12px] font-medium ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>목표 2000ml</span>
            <span className={`text-[17px] font-extrabold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              <CountUp to={waterIntake} /> <span className="text-[12px] font-medium text-neutral-400">ml</span>
            </span>
          </div>

          <div className={`h-[5px] rounded-full w-full overflow-hidden mt-1 ${isDarkMode ? 'bg-white/5' : 'bg-neutral-100'}`}>
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out ${isDarkMode ? 'bg-white' : 'bg-black'}`} 
              style={{ width: `${(waterIntake / 2000) * 100}%` }}
            />
          </div>
        </div>

        {/* Daily Activities Grid (Calories & Sleep) */}
        <div style={{ top: `${976 - shift}px` }} className="absolute left-[30px] right-[30px] h-[130px] flex gap-[14px] animate-fadeInUp delay-375">
          {/* Active Calories Card */}
          <div className={`flex-1 h-full rounded-[28px] p-[24px] flex flex-col justify-between ${
            isDarkMode ? 'bg-[#111111] border border-white/5' : 'bg-white border border-neutral-200/80 shadow-md'
          }`}>
            <div className="flex justify-between items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-800'
              }`}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className={`text-[10px] font-bold ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>활동량</span>
            </div>
            <div>
              <span className={`text-[11px] block font-medium ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>활동 칼로리</span>
              <span className={`text-[18px] font-extrabold mt-0.5 block ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                <CountUp to="342" /> <span className="text-[12px] font-medium text-neutral-400">kcal</span>
              </span>
            </div>
          </div>

          {/* Sleep Quality Card */}
          <div className={`flex-1 h-full rounded-[28px] p-[24px] flex flex-col justify-between ${
            isDarkMode ? 'bg-[#111111] border border-white/5' : 'bg-white border border-neutral-200/80 shadow-md'
          }`}>
            <div className="flex justify-between items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-850'
              }`}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <span className={`text-[10px] font-bold ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>바이오</span>
            </div>
            <div>
              <span className={`text-[11px] block font-medium ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>수면 효율성</span>
              <span className={`text-[18px] font-extrabold mt-0.5 block ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                <CountUp to="94" /> <span className="text-[12px] font-medium text-neutral-400">%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Indoor Climate Status Card */}
        <div 
          style={{ top: `${1122 - shift}px` }}
          className={`absolute left-[30px] right-[30px] h-[138px] rounded-[28px] p-5 flex flex-col justify-between animate-fadeInUp delay-450 ${
            isDarkMode ? 'bg-[#111111] border border-white/5' : 'bg-white border border-neutral-200/80 shadow-md'
          }`}
        >
          <div className="flex gap-2.5 items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-800'
            }`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <span className="text-[15px] font-bold block leading-none">실내 환경 모니터링</span>
              <span className={`text-[10px] mt-1 block ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>쾌적한 상태 유지 중</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-white/5">
            <div className="text-center">
              <span className={`text-[10px] font-semibold block ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>온도</span>
              <span className="text-[15px] font-extrabold text-neutral-450 mt-0.5 block">22.4°C</span>
            </div>
            <div className="text-center border-x border-white/5">
              <span className={`text-[10px] font-semibold block ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>습도</span>
              <span className="text-[15px] font-extrabold text-neutral-450 mt-0.5 block">48%</span>
            </div>
            <div className="text-center">
              <span className={`text-[10px] font-semibold block ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>초미세먼지</span>
              <span className={`text-[15px] font-extrabold mt-0.5 block ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>12㎍/㎥</span>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
}
