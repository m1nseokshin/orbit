import React, { useState, useEffect, useRef } from 'react';

// Step 1 assets (Figma Node 16:964)
const imgGroup1707481713_s0 = "https://www.figma.com/api/mcp/asset/319fa6af-85b5-4154-8741-477af328a466";
const imgEllipse711_s0 = "https://www.figma.com/api/mcp/asset/606829dc-8cdf-42a5-8b3b-7d2e7c498d21";
const imgEllipse712_s0 = "https://www.figma.com/api/mcp/asset/bedaf8b4-afa3-47aa-bccd-1a8e54aa1be3";
const imgEllipse713_s0 = "https://www.figma.com/api/mcp/asset/4ff07e6b-ca68-419e-a788-e2e4f307bb1f";
const imgArrow2_s0 = "https://www.figma.com/api/mcp/asset/bf4ea9b8-f20b-4458-8dad-e346e201624e";
const imgEllipse714_s0 = "https://www.figma.com/api/mcp/asset/ce7c073e-cb7d-4fab-8a27-bc7fc472bb96";
const imgEllipse715_s0 = "https://www.figma.com/api/mcp/asset/7cbec364-b4e6-4b2d-9d95-b819ec0df914";

// Step 2 assets (Figma Node 16:976)
const imgGroup1707481713_s1 = "https://www.figma.com/api/mcp/asset/6f55aa54-1ab7-4b3a-9ebb-4e6fadebc912";
const imgEllipse716_s1 = "https://www.figma.com/api/mcp/asset/db6d77a7-5709-4371-9d67-905b36865c06";
const imgVector1_s1 = "https://www.figma.com/api/mcp/asset/ac654734-8255-47ee-a631-42867fdf7af9";
const imgVector2_s1 = "https://www.figma.com/api/mcp/asset/5926c653-da16-405f-888e-3ec874c48482";

// Step 3 assets (Figma Node 16:987)
const imgGroup1707481713_s2 = "https://www.figma.com/api/mcp/asset/0569414d-a4be-4aa1-b6a5-e3d1930414c5";
const imgVector3_s2 = "https://www.figma.com/api/mcp/asset/1fb11b17-e22a-46ef-911e-929fe8cb7e33";
const imgVector2_s2 = "https://www.figma.com/api/mcp/asset/6223e570-3ab0-46a9-a002-593fbb60c21f";
const imgEllipse719_s2 = "https://www.figma.com/api/mcp/asset/81da14ef-c9cc-46af-95c2-631c19092008";
const imgEllipse720_s2 = "https://www.figma.com/api/mcp/asset/71a5918f-fd03-4256-8a7c-e4d8862b2df5";
const imgEllipse721_s2 = "https://www.figma.com/api/mcp/asset/5ecb0129-60de-4706-aeae-14d8d9acc100";
const imgEllipse722_s2 = "https://www.figma.com/api/mcp/asset/9290f10c-a760-45de-9ee9-cfbc30ff17c8";

// Step 4 assets (Figma Node 17:2)
const imgEllipse723_s3 = "https://www.figma.com/api/mcp/asset/9ee0b1c0-70ae-40bd-8ce9-b062eaf19285";
const imgEllipse724_s3 = "https://www.figma.com/api/mcp/asset/d468196f-c19e-44ae-80e3-a749c572ab3f";
const imgEllipse719_s3 = "https://www.figma.com/api/mcp/asset/60287f0a-a28f-438d-bc7f-4f4594464483";

export default function Onboarding({ onComplete, forceStep }) {
  const [step, setStep] = useState(forceStep !== undefined ? forceStep : 0);
  
  // Drag and Swipe refs
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (forceStep !== undefined) {
      setStep(forceStep);
    }
  }, [forceStep]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  // Drag and Touch Handlers
  const handleDragStart = (clientX) => {
    if (forceStep !== undefined) return;
    dragStartX.current = clientX;
    isDragging.current = true;
  };

  const handleDragEnd = (clientX) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diffX = clientX - dragStartX.current;
    const threshold = 65; // 65px threshold for drag action

    if (diffX < -threshold) {
      // Swiped Left -> Next step
      if (step < 3) {
        setStep(prev => prev + 1);
      } else {
        onComplete();
      }
    } else if (diffX > threshold) {
      // Swiped Right -> Prev step
      if (step > 0) {
        setStep(prev => prev - 1);
      }
    }
  };

  const onMouseDown = (e) => handleDragStart(e.clientX);
  const onMouseUp = (e) => handleDragEnd(e.clientX);
  const onMouseLeave = () => { isDragging.current = false; };

  const onTouchStart = (e) => handleDragStart(e.touches[0].clientX);
  const onTouchEnd = (e) => handleDragEnd(e.changedTouches[0].clientX);

  return (
    <div 
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="bg-black relative w-full h-full overflow-hidden select-none"
    >
      {/* Left Navigation Arrow */}
      {step > 0 && forceStep === undefined && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setStep(prev => prev - 1);
          }}
          className="absolute left-4 top-[50%] -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 active:scale-90 transition-all duration-200 z-30 shadow-lg text-white"
          aria-label="이전 페이지"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4.5 h-4.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      {/* Right Navigation Arrow */}
      {step < 3 && forceStep === undefined && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setStep(prev => prev + 1);
          }}
          className="absolute right-4 top-[50%] -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 active:scale-90 transition-all duration-200 z-30 shadow-lg text-white"
          aria-label="다음 페이지"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4.5 h-4.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}

      {/* SKIP Action Button */}
      {step < 3 && (
        <button 
          onClick={handleSkip} 
          className="absolute font-semibold text-[#bebebe] text-[16px] leading-[normal] left-[336px] top-[84px] hover:text-white transition-colors active:scale-95 duration-200 z-20"
        >
          SKIP
        </button>
      )}

      {/* Step 0 (Figma Node 16:964) */}
      {step === 0 && (
        <div className="absolute inset-0 size-full animate-fadeIn duration-500">
          <div className="[word-break:break-word] absolute font-bold leading-[normal] left-[20px] not-italic text-[30px] text-white top-[138px] w-[328px] whitespace-pre-wrap">
            <p className="mb-0">Orbit이 </p>
            <p>생활 패턴을 이해합니다.</p>
          </div>
          <p className="[word-break:break-word] absolute font-medium leading-[1.5] left-[37px] not-italic text-[#bebebe] text-[16px] top-[232px] w-[328px]">
            스마트폰과 웨어러블 데이터를 기반으로
            <br />
            일상의 흐름을 분석합니다.
          </p>
          
          {/* Graphics */}
          <div className="absolute left-[-191.33px] w-[442.667px] h-[442.667px] top-[316px] pointer-events-none animate-onboarding-left1">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse711_s0} />
          </div>
          <div className="absolute left-[30px] w-[221.333px] h-[228px] top-[423.33px] pointer-events-none animate-onboarding-left2">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse712_s0} />
          </div>
          <div className="absolute left-[-66.67px] w-[318.667px] h-[328px] top-[373.33px] pointer-events-none animate-onboarding-left3">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse713_s0} />
          </div>
          <div className="absolute left-[-147.33px] w-[334.667px] h-0 top-[537.33px] pointer-events-none animate-onboarding-leftArrow">
            <div className="absolute inset-[-3.68px_-0.15%_-3.68px_0]">
              <img alt="" className="block max-w-none size-full" src={imgArrow2_s0} />
            </div>
          </div>
          <div className="absolute left-[-252px] w-[344.667px] h-[577.333px] top-[250px] pointer-events-none animate-onboarding-left5">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse714_s0} />
          </div>
          <div className="absolute left-[calc(40%+53.47px)] w-[8px] h-[8px] top-[533.33px] pointer-events-none animate-onboarding-left6">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse715_s0} />
          </div>
          
          {/* Indicator */}
          <div className="absolute h-[9px] left-[calc(40%+8.8px)] bottom-[102px] w-[60.545px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1707481713_s0} />
          </div>
        </div>
      )}

      {/* Step 1 (Figma Node 16:976) */}
      {step === 1 && (
        <div className="absolute inset-0 size-full animate-fadeIn duration-500">
          <div className="[word-break:break-word] absolute font-bold leading-[normal] left-[20px] not-italic text-[30px] text-white top-[138px] w-[328px] whitespace-pre-wrap">
            <p className="mb-0">AI가 </p>
            <p>건강 상태를 요약합니다.</p>
          </div>
          <p className="[word-break:break-word] absolute font-medium leading-[1.5] left-[37px] not-italic text-[#bebebe] text-[16px] top-[231px] w-[328px]">
            복잡한 데이터를 대신 해석하고
            <br />
            필요한 정보만 전달합니다.
          </p>
          
          {/* Graphics Wrapper (rises from bottom) */}
          <div className="absolute inset-0 size-full pointer-events-none animate-onboarding-up">
            <div className="absolute left-[21.9px] w-[258px] h-[258px] top-[367.87px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse716_s1} />
            </div>
            <div className="absolute left-[-127px] w-[604.114px] h-[318.854px] top-[351px]">
              <div className="absolute inset-[-0.31%_-0.17%]">
                <img alt="" className="block max-w-none size-full" src={imgVector1_s1} />
              </div>
            </div>
            <div className="absolute flex h-[669.871px] items-center justify-center left-[-186px] top-[210px] w-[663px]">
              <div className="flex-none rotate-[46.03deg]">
                <div className="h-[335.766px] relative w-[606.868px]">
                  <div className="absolute inset-[-0.3%_-0.16%]">
                    <img alt="" className="block max-w-none size-full" src={imgVector2_s1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Indicator */}
          <div className="absolute h-[9px] left-[calc(40%+8.8px)] bottom-[102px] w-[60.545px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1707481713_s1} />
          </div>
        </div>
      )}

      {/* Step 2 (Figma Node 16:987) */}
      {step === 2 && (
        <div className="absolute inset-0 size-full animate-fadeIn duration-500">
          <div className="[word-break:break-word] absolute font-bold leading-[normal] left-[20px] not-italic text-[30px] text-white top-[138px] w-[328px] whitespace-pre-wrap">
            <p className="mb-0">사용자보다 환경이 </p>
            <p>먼저 반응하고, 대처합니다.</p>
          </div>
          <p className="[word-break:break-word] absolute font-medium leading-[1.5] left-[37px] not-italic text-[#bebebe] text-[16px] top-[231px] w-[328px]">
            조명, 공기질, 습도 등
            <br />
            주변 환경을 건강 상태에 맞게 조절합니다.
          </p>
          
          {/* Background Spotlight */}
          {/* Graphics Wrapper (descends from top with parallax) */}
          <div className="absolute inset-0 size-full pointer-events-none">
            {/* Cosmic starry field overlay dispersing */}
            <div className="absolute inset-0 size-full animate-onboarding-stars-field">
              {/* Concentric dashed cosmic orbit lines */}
              <svg className="absolute w-[800px] h-[800px] left-[-200px] top-[100px] opacity-25" viewBox="0 0 800 800" fill="none">
                <circle cx="400" cy="400" r="120" stroke="white" strokeWidth="1" strokeDasharray="3 6" />
                <circle cx="400" cy="400" r="220" stroke="white" strokeWidth="0.75" strokeDasharray="4 8" />
                <circle cx="400" cy="400" r="320" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" />
              </svg>
              {/* Scattered stars/dots */}
              {[
                { x: 40, y: 120, size: 2, delay: 0.1 },
                { x: 120, y: 80, size: 3, delay: 0.3 },
                { x: 280, y: 150, size: 1.5, delay: 0.5 },
                { x: 330, y: 90, size: 2.5, delay: 0.2 },
                { x: 80, y: 260, size: 2, delay: 0.4 },
                { x: 310, y: 290, size: 3.5, delay: 0.6 },
                { x: 190, y: 340, size: 2.5, delay: 0.1 },
                { x: 50, y: 450, size: 1.5, delay: 0.7 },
                { x: 270, y: 480, size: 2, delay: 0.2 },
                { x: 350, y: 410, size: 3, delay: 0.5 },
                { x: 110, y: 560, size: 2, delay: 0.3 },
                { x: 220, y: 620, size: 2.5, delay: 0.8 },
                { x: 60, y: 680, size: 1.5, delay: 0.4 },
                { x: 300, y: 710, size: 3, delay: 0.6 },
                { x: 150, y: 770, size: 2, delay: 0.1 },
                { x: 340, y: 220, size: 1.5, delay: 0.9 },
                { x: 90, y: 390, size: 2.5, delay: 0.2 },
                { x: 210, y: 180, size: 3, delay: 0.4 }
              ].map((star, idx) => (
                <div 
                  key={idx}
                  className="absolute bg-white rounded-full"
                  style={{
                    left: `${star.x}px`,
                    top: `${star.y}px`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    opacity: 0.7,
                    boxShadow: star.size > 2 ? '0 0 6px rgba(255,255,255,0.8)' : 'none',
                    animation: `simpleFadeIn 4s ease-out ${star.delay}s infinite alternate`
                  }}
                />
              ))}
            </div>

            {/* Parallax Background Extra Circles to simulate "many graphics space" */}
            <div className="absolute left-[-60px] top-[140px] w-[280px] h-[280px] rounded-full border border-white/5 animate-onboarding-down-bg" />
            <div className="absolute left-[240px] top-[280px] w-[180px] h-[180px] rounded-full border border-white/5 animate-onboarding-down-bg" />
            <div className="absolute left-[40px] top-[480px] w-[320px] h-[320px] rounded-full border border-white/10 animate-onboarding-down-bg" />
            <div className="absolute left-[180px] top-[80px] w-[110px] h-[110px] rounded-full border border-white/5 animate-onboarding-down-bg" />

            <div className="absolute left-[-557px] w-[604.114px] h-[318.854px] top-[353px] animate-onboarding-down-1">
              <div className="absolute inset-[-0.31%_-0.17%]">
                <img alt="" className="block max-w-none size-full" src={imgVector3_s2} />
              </div>
            </div>
            <div className="absolute flex h-[669.871px] items-center justify-center left-[-616px] top-[211px] w-[663px] animate-onboarding-down-2">
              <div className="flex-none rotate-[46.03deg]">
                <div className="h-[335.766px] relative w-[606.868px]">
                  <div className="absolute inset-[-0.3%_-0.16%]">
                    <img alt="" className="block max-w-none size-full" src={imgVector2_s2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-[calc(20%+8.71px)] w-[211px] h-[211px] top-[429px] animate-onboarding-down-3">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse719_s2} />
            </div>
            <div className="absolute left-[-47px] w-[151px] h-[151px] top-[-58px] animate-onboarding-down-1">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse720_s2} />
            </div>
            <div className="absolute left-[calc(40%+62.8px)] w-[84px] h-[84px] top-[579px] animate-onboarding-down-2">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse721_s2} />
            </div>
            <div className="absolute flex h-[214.686px] items-center justify-center left-[-11px] top-[439.91px] w-[363.285px] animate-onboarding-down-3">
              <div className="flex-none rotate-[25.93deg]">
                <div className="h-[55.422px] relative w-[377px]">
                  <div className="absolute inset-[-0.89%_-0.13%_-0.9%_-0.13%]">
                    <img alt="" className="block max-w-none size-full" src={imgEllipse722_s2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Indicator */}
          <div className="absolute h-[9px] left-[calc(40%+8.8px)] bottom-[102px] w-[60.545px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1707481713_s2} />
          </div>
        </div>
      )}

      {/* Step 3 (Figma Node 17:2) */}
      {step === 3 && (
        <div className="absolute inset-0 size-full animate-fadeIn duration-500">
          <div className="[word-break:break-word] absolute font-bold leading-[normal] left-[20px] not-italic text-[30px] text-white top-[138px] w-[328px] whitespace-pre-wrap">
            <p className="mb-0">행동보다</p>
            <p>자연스러운 케어</p>
          </div>
          <p className="[word-break:break-word] absolute font-medium leading-[1.5] left-[37px] not-italic text-[#bebebe] text-[16px] top-[231px] w-[328px]">
            기록하지 않아도, 신경 쓰지 않아도.
            <br />
            건강한 일상이 지속될 수 있도록.
          </p>

          {/* Flat Outline Saturn Vector - Individual components enter with staggered timings */}
          <div className="absolute left-[31px] top-[320px] w-[340px] h-[240px] flex items-center justify-center pointer-events-none">
            <div className="w-full h-full animate-float-saturn">
              <svg width="340" height="240" viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g transform="rotate(-14 170 120)">
                  {/* Outer thin dashed accretion ring */}
                  <g className="animate-saturn-outer">
                    <ellipse cx="170" cy="120" rx="155" ry="45" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="5 5" />
                  </g>
                  
                  {/* Saturn Main (Rings + Sphere combination as one vector) */}
                  <g className="animate-saturn-main">
                    {/* Back half of the main ring */}
                    <path d="M 40 120 A 130 36 0 0 1 300 120" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5" strokeLinecap="round" />
                    
                    {/* Central sphere (masks the back ring with a solid black fill) */}
                    <circle cx="170" cy="120" r="56" fill="#000000" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.5" />
                    
                    {/* Front half of the main ring */}
                    <path d="M 300 120 A 130 36 0 0 1 40 120" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                  
                  {/* Inner ring */}
                  <g className="animate-saturn-inner">
                    <ellipse cx="170" cy="120" rx="90" ry="24" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/* Interactive Button Group - Fades in with a 1.5x delay */}
          <div className="absolute left-0 right-0 bottom-[96px] h-[129px] animate-onboarding-welcome-buttons">
            {/* Sign in with Apple */}
            <div 
              onClick={handleNext}
              className="absolute bg-white flex font-semibold gap-[5px] h-[54px] items-center justify-center left-[26px] rounded-[14px] text-[19px] text-black top-0 w-[342px] cursor-pointer hover:bg-neutral-100 transition-colors active:scale-[0.98] duration-200"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              <span className="text-[24px] leading-[0] font-sans"></span>
              <span className="font-semibold tracking-wide">Sign in with Apple</span>
            </div>

            {/* 시작하기 Button */}
            <button 
              onClick={handleNext}
              className="absolute bg-black border border-solid border-white h-[54px] left-[26px] rounded-[13px] top-[75px] w-[342px] cursor-pointer hover:bg-neutral-900 transition-colors active:scale-[0.98] duration-200"
            >
              <p className="font-semibold leading-[24px] text-[19px] text-center text-white">
                시작하기
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
