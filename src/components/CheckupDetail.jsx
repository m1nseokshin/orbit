import React, { useState } from 'react';

export default function CheckupDetail({ onBack, isDarkMode }) {
  const [checkupDate, setCheckupDate] = useState('10월 24일');
  const [checkupTime, setCheckupTime] = useState('오후 2:30');
  const [isQuestionnaireDone, setIsQuestionnaireDone] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('confirmed'); // 'confirmed' | 'cancelled'
  
  // Dialog/Modal states
  const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);

  // Questionnaire form states
  const [q1, setQ1] = useState(false);
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);

  // Date selection states
  const [selectedDate, setSelectedDate] = useState('10월 24일');
  const [selectedTime, setSelectedTime] = useState('오후 2:30');

  const handleQuestionnaireSubmit = (e) => {
    e.preventDefault();
    setIsQuestionnaireDone(true);
    setShowQuestionnaireModal(false);
  };

  const handleDateChangeSubmit = () => {
    setCheckupDate(selectedDate);
    setCheckupTime(selectedTime);
    setShowDatePickerModal(false);
  };

  const handleCancelConfirm = () => {
    setBookingStatus('cancelled');
    setShowCancelConfirmModal(false);
  };

  return (
    <div className={`w-full h-full overflow-y-auto pb-24 no-scrollbar scroll-smooth flex flex-col relative transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-[#fafafa] text-neutral-900'
    }`} data-name="checkup-detail">
      
      {/* Top Header */}
      <div className={`h-20 px-6 pt-12 flex justify-between items-center border-b shrink-0 z-10 ${
        isDarkMode ? 'bg-black border-white/5' : 'bg-[#fafafa] border-neutral-200'
      }`}>
        <button 
          onClick={onBack}
          className={`hover:opacity-85 transition-colors p-1 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}
          aria-label="뒤로가기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className={`text-[18px] font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>검진 예약 상세</h1>
        <div className="w-8 h-8" /> {/* Spacer to center title */}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pt-6 space-y-6">
        
        {/* Booking Card */}
        <div className={`rounded-[28px] p-6 space-y-5 shadow-xl border relative overflow-hidden transition-all ${
          isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-neutral-200 shadow-md'
        }`}>
          {bookingStatus === 'cancelled' && (
            <div className="absolute inset-0 bg-red-600/10 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-[15px] animate-fadeIn">
                예약이 취소되었습니다
              </div>
            </div>
          )}

          <div className="flex justify-between items-start">
            <div>
              <span className={`text-[12px] font-bold tracking-wider uppercase ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>
                종합 건강검진 예약
              </span>
              <h2 className="text-[24px] font-extrabold tracking-tight mt-1">서울아산병원</h2>
              <p className={`text-[13px] mt-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>
                의학관 3층 아산종합건강증진센터
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
              bookingStatus === 'confirmed' 
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}>
              {bookingStatus === 'confirmed' ? '예약 확정' : '취소 완료'}
            </span>
          </div>

          <div className={`grid grid-cols-2 gap-4 py-4 border-y ${isDarkMode ? 'border-white/5' : 'border-neutral-200'}`}>
            <div>
              <span className={`text-[11px] block ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>예약 날짜</span>
              <span className="text-[16px] font-bold mt-1 block">{checkupDate}</span>
            </div>
            <div>
              <span className={`text-[11px] block ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>예약 시간</span>
              <span className="text-[16px] font-bold mt-1 block">{checkupTime}</span>
            </div>
            <div>
              <span className={`text-[11px] block ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>검진 종류</span>
              <span className="text-[16px] font-bold mt-1 block">일반 종합 건강검진</span>
            </div>
            <div>
              <span className={`text-[11px] block ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>담당 의료진</span>
              <span className="text-[16px] font-bold mt-1 block">이재현 교수 (내과)</span>
            </div>
          </div>

          {/* Questionnaire Status */}
          <div className="flex justify-between items-center pt-1">
            <div className="flex items-center gap-2">
              <span className={`text-[13px] ${isDarkMode ? 'text-white/70' : 'text-neutral-600'}`}>사전 온라인 문진표</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                isQuestionnaireDone 
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
              }`}>
                {isQuestionnaireDone ? '작성 완료' : '작성 전'}
              </span>
            </div>
            {bookingStatus === 'confirmed' && (
              <button 
                onClick={() => setShowQuestionnaireModal(true)}
                className={`text-[12px] font-bold px-4 py-1.5 rounded-full transition-all active:scale-95 ${
                  isQuestionnaireDone 
                    ? (isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200')
                    : (isDarkMode ? 'bg-white text-black hover:bg-neutral-200 shadow-md' : 'bg-black text-white hover:bg-neutral-800 shadow-md')
                }`}
              >
                {isQuestionnaireDone ? '수정하기' : '지금 작성'}
              </button>
            )}
          </div>
        </div>

        {/* Action Panel */}
        {bookingStatus === 'confirmed' && (
          <div className="grid grid-cols-2 gap-3 animate-fadeInUp delay-75">
            <button 
              onClick={() => setShowDatePickerModal(true)}
              className={`h-[48px] rounded-[16px] font-bold text-[14px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] border ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                  : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-800 shadow-sm'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              예약 일정 변경
            </button>
            <button 
              onClick={() => setShowCancelConfirmModal(true)}
              className={`h-[48px] rounded-[16px] font-bold text-[14px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] border ${
                isDarkMode 
                  ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-500' 
                  : 'bg-red-50 border-red-200 hover:bg-red-100/50 text-red-600 shadow-sm'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              예약 취소하기
            </button>
          </div>
        )}

        {/* Clinical Checklist */}
        <div className={`rounded-[28px] p-6 space-y-4 shadow-xl border animate-fadeInUp delay-150 ${
          isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-neutral-200 shadow-md'
        }`}>
          <h3 className="text-[18px] font-bold tracking-tight">검진 전 필수 유의사항</h3>
          <ul className={`space-y-3.5 text-[13px] leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-neutral-600'}`}>
            <li className="flex gap-3 items-start">
              <span className="text-amber-500 font-extrabold select-none mt-0.5">✔</span>
              <span><strong>최소 8시간 이상 완전 금식:</strong> 검진 전날 밤 10시 이후에는 물, 껌, 담배를 포함하여 일체의 음식물 섭취를 삼가 주셔야 정확한 검사가 가능합니다.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-500 font-extrabold select-none mt-0.5">✔</span>
              <span><strong>약물 복용 지침 준수:</strong> 혈전용해제, 아스피린 계열 약물은 출혈 위험이 있으므로 담당의와 상의 후 7일 전부터 복용을 중단해 주세요. 혈압약은 소량의 물과 함께 당일 새벽 5시에 복용하세요.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-500 font-extrabold select-none mt-0.5">✔</span>
              <span><strong>간편한 복장 착용:</strong> 탈의 및 검사 진행이 용이하도록 와이어나 금속 장식이 없는 편안한 스포티 의류를 착용하고 방문해 주시기 바랍니다.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-500 font-extrabold select-none mt-0.5">✔</span>
              <span><strong>안정 및 충분한 숙면:</strong> 검진 전날에는 과도한 운동이나 음주, 야근을 피하고 최소 7시간 이상의 충분한 안정을 취해야 혈액 검사 결과의 오차를 차단할 수 있습니다.</span>
            </li>
          </ul>
        </div>

        {/* Stylized Mock Hospital Map */}
        <div className={`rounded-[28px] p-6 space-y-4 shadow-xl border animate-fadeInUp delay-225 ${
          isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-neutral-200 shadow-md'
        }`}>
          <div className="flex justify-between items-center">
            <h3 className="text-[18px] font-bold tracking-tight">병원 오시는 길</h3>
            <span className={`text-[12px] font-semibold ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>잠실나루역 1번 출구 도보 10분</span>
          </div>

          <div className={`h-40 rounded-[20px] relative overflow-hidden flex flex-col items-center justify-center border ${
            isDarkMode ? 'bg-zinc-950 border-white/5' : 'bg-neutral-50 border-neutral-200'
          }`}>
            {/* Mock Map Grid lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="absolute top-1/4 inset-x-0 border-t border-dashed border-neutral-500" />
              <div className="absolute top-2/4 inset-x-0 border-t border-dashed border-neutral-500" />
              <div className="absolute top-3/4 inset-x-0 border-t border-dashed border-neutral-500" />
              <div className="absolute left-1/4 inset-y-0 border-l border-dashed border-neutral-500" />
              <div className="absolute left-2/4 inset-y-0 border-l border-dashed border-neutral-500" />
              <div className="absolute left-3/4 inset-y-0 border-l border-dashed border-neutral-500" />
            </div>

            {/* Stylized roads */}
            <div className={`absolute w-full h-8 top-12 transform -rotate-6 ${isDarkMode ? 'bg-zinc-900/60' : 'bg-neutral-200/50'}`} />
            <div className={`absolute w-10 h-full left-1/3 transform rotate-12 ${isDarkMode ? 'bg-zinc-900/60' : 'bg-neutral-200/50'}`} />
            
            {/* Route indicator line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
              <path 
                d="M 50 140 Q 120 120 145 60 T 260 50" 
                stroke="#6366f1" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeDasharray="4 8"
                className="animate-pulse"
              />
            </svg>

            {/* Start Pin */}
            <div className="absolute left-[45px] top-[125px] flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 z-10" />
              </div>
              <span className={`text-[9px] font-bold mt-1 px-1 rounded ${
                isDarkMode ? 'bg-black/80 text-white/70' : 'bg-white/95 text-neutral-600 shadow-sm'
              }`}>출발</span>
            </div>

            {/* Hospital Pin */}
            <div className="absolute left-[245px] top-[30px] flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded shadow-md mt-0.5">서울아산병원</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Questionnaire Modal */}
      {showQuestionnaireModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className={`w-full max-w-[340px] rounded-[28px] p-6 space-y-5 shadow-2xl border transition-colors ${
            isDarkMode ? 'bg-[#121212] border-white/10 text-white' : 'bg-white border-neutral-200 text-neutral-900'
          }`}>
            <div className="flex justify-between items-center">
              <h3 className="text-[18px] font-bold">건강검진 사전 문진표</h3>
              <button 
                onClick={() => setShowQuestionnaireModal(false)}
                className={`hover:opacity-75 ${isDarkMode ? 'text-white/50' : 'text-neutral-400'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleQuestionnaireSubmit} className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-500/5 hover:bg-neutral-500/10 cursor-pointer transition-all">
                  <input 
                    type="checkbox" 
                    checked={q1}
                    onChange={(e) => setQ1(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span className="text-[13px] font-medium leading-snug">최근 3개월 이내 수술 또는 입증된 중증 질환 치료 이력이 있습니까?</span>
                </label>
                
                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-500/5 hover:bg-neutral-500/10 cursor-pointer transition-all">
                  <input 
                    type="checkbox" 
                    checked={q2}
                    onChange={(e) => setQ2(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span className="text-[13px] font-medium leading-snug">고혈압, 당뇨, 심장 질환 관련 약물을 매일 정기 복용 중이십니까?</span>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-500/5 hover:bg-neutral-500/10 cursor-pointer transition-all">
                  <input 
                    type="checkbox" 
                    checked={q3}
                    onChange={(e) => setQ3(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span className="text-[13px] font-medium leading-snug">약물, 식품, 또는 조영제 관련 특이 체질이나 알레르기가 있습니까?</span>
                </label>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowQuestionnaireModal(false)}
                  className={`flex-1 h-[44px] rounded-full text-[13px] font-bold border ${
                    isDarkMode ? 'bg-transparent border-white/10 hover:bg-white/5 text-white/80' : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-600'
                  }`}
                >
                  취소
                </button>
                <button 
                  type="submit"
                  className={`flex-1 h-[44px] rounded-full text-[13px] font-bold shadow-lg transition-colors ${
                    isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  제출 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Date Picker Modal */}
      {showDatePickerModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className={`w-full max-w-[340px] rounded-[28px] p-6 space-y-5 shadow-2xl border transition-colors ${
            isDarkMode ? 'bg-[#121212] border-white/10 text-white' : 'bg-white border-neutral-200 text-neutral-900'
          }`}>
            <h3 className="text-[18px] font-bold">예약 일정 변경</h3>
            
            <div className="space-y-4">
              {/* Date Select */}
              <div>
                <label className={`text-[11px] block font-bold mb-1.5 uppercase ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>검진 날짜 선택</label>
                <div className="grid grid-cols-3 gap-2">
                  {['10월 24일', '10월 25일', '11월 02일'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`h-[36px] rounded-lg text-[12px] font-semibold transition-all ${
                        selectedDate === d 
                          ? 'bg-indigo-600 text-white shadow-md' 
                          : (isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200')
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Select */}
              <div>
                <label className={`text-[11px] block font-bold mb-1.5 uppercase ${isDarkMode ? 'text-white/40' : 'text-neutral-450'}`}>검진 시간 선택</label>
                <div className="grid grid-cols-3 gap-2">
                  {['오전 9:00', '오전 10:30', '오후 2:30'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`h-[36px] rounded-lg text-[12px] font-semibold transition-all ${
                        selectedTime === t 
                          ? 'bg-indigo-600 text-white shadow-md' 
                          : (isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200')
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                onClick={() => setShowDatePickerModal(false)}
                className={`flex-1 h-[44px] rounded-full text-[13px] font-bold border ${
                  isDarkMode ? 'bg-transparent border-white/10 hover:bg-white/5 text-white/80' : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-600'
                }`}
              >
                취소
              </button>
              <button 
                onClick={handleDateChangeSubmit}
                className={`flex-1 h-[44px] rounded-full text-[13px] font-bold shadow-lg transition-colors ${
                  isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                변경 적용
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Cancel Confirm Modal */}
      {showCancelConfirmModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className={`w-full max-w-[320px] rounded-[28px] p-6 space-y-4 shadow-2xl border text-center transition-colors ${
            isDarkMode ? 'bg-[#121212] border-white/10 text-white' : 'bg-white border-neutral-200 text-neutral-900'
          }`}>
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-[17px] font-bold">검진 예약을 취소하시겠습니까?</h3>
              <p className={`text-[12px] leading-relaxed px-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}>
                검진 3일 전 취소 시 재예약 대기 시간이 길어질 수 있습니다. 정말로 취소 처리를 완료하시겠습니까?
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                onClick={() => setShowCancelConfirmModal(false)}
                className={`flex-1 h-[42px] rounded-full text-[13px] font-bold border ${
                  isDarkMode ? 'bg-transparent border-white/10 hover:bg-white/5 text-white/80' : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-600'
                }`}
              >
                닫기
              </button>
              <button 
                onClick={handleCancelConfirm}
                className="flex-1 h-[42px] rounded-full text-[13px] font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg transition-colors"
              >
                예약 취소
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
