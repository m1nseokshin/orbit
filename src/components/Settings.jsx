import React, { useState } from 'react';

const imgStarIcon = import.meta.env.BASE_URL + "figma/bf97bbf3-084b-4161-b752-b97518236e7f.svg";
const imgContainer = import.meta.env.BASE_URL + "figma/1da1fca4-d275-41b6-92bd-a07e95e2d681.svg";
const imgContainer1 = import.meta.env.BASE_URL + "figma/150b1356-d391-4704-953a-928262f7c938.svg";
const imgContainer2 = import.meta.env.BASE_URL + "figma/4d3a7ea4-9253-4605-91af-6c64773feb8a.svg";
const imgContainer3 = import.meta.env.BASE_URL + "figma/0b4766b0-c491-43e2-97ea-cbfa552dbade.svg";
const imgContainer4 = import.meta.env.BASE_URL + "figma/9075c068-c82a-4082-ae82-bcf0d2a228bb.svg";
const imgContainer5 = import.meta.env.BASE_URL + "figma/1e9d3df6-448a-44f7-9eee-58d1c645c3da.svg";
const imgContainer6 = import.meta.env.BASE_URL + "figma/795cfb10-dfe3-44ef-a96c-94fee6f301a3.svg";
const imgContainer7 = import.meta.env.BASE_URL + "figma/e9806ba3-2bf7-456c-9495-6266cb038c7f.svg";
const imgContainer8 = import.meta.env.BASE_URL + "figma/37769b95-cccc-42eb-92f2-421505f0e026.svg";

export default function Settings({ onNavigate, userName, onChangeUserName, onLogout, isDarkMode, onToggleTheme, forceEditName, onClearForceEdit }) {
  const [showEditName, setShowEditName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [aiWorkflowEnabled, setAiWorkflowEnabled] = useState(true);

  React.useEffect(() => {
    if (forceEditName) {
      setTempName(userName);
      setShowEditName(true);
      if (onClearForceEdit) {
        onClearForceEdit();
      }
    }
  }, [forceEditName]);

  const handleSaveName = (e) => {
    if (e) e.preventDefault();
    if (tempName.trim()) {
      onChangeUserName(tempName.trim());
      setShowEditName(false);
    }
  };

  return (
    <div className="flex-1 w-full h-full pb-32 overflow-y-auto no-scrollbar scroll-smooth px-6" data-node-id="52:1600" data-name="설정">
      {/* Title */}
      <div className="pt-[45px] md:pt-14 pb-4">
        <h1 className={`text-[32px] font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>설정</h1>
      </div>

      {/* Profile Card */}
      <div className={`rounded-[30px] p-6 backdrop-blur-md relative overflow-hidden shadow-xl border transition-all ${
        isDarkMode ? 'border-white/10 bg-[#1b1b1b]/30 shadow-black/30' : 'bg-white border-neutral-200 shadow-md'
      }`} data-node-id="52:1757">
        <div className="flex gap-4 items-center">
          {/* Avatar */}
          <div className={`w-[80px] h-[80px] rounded-full border flex items-center justify-center relative shrink-0 transition-all ${
            isDarkMode ? 'border-white/10 bg-white/5' : 'bg-neutral-100 border-neutral-200'
          }`}>
            <img alt="User Avatar" className={`w-[38px] h-[38px] object-contain ${isDarkMode ? '' : 'invert'}`} src={imgStarIcon} />
          </div>
          {/* Details */}
          <div className="flex-1">
            {showEditName ? (
              <form onSubmit={handleSaveName} className="flex gap-2">
                <input 
                  type="text" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className={`rounded-[8px] px-2 py-1 text-[16px] w-[140px] focus:outline-none border transition-all ${
                    isDarkMode ? 'bg-white/10 text-white border-white/20' : 'bg-neutral-100 text-neutral-900 border-neutral-300'
                  }`}
                  autoFocus
                />
                <button type="submit" className={`px-3 py-1 rounded-[8px] text-[12px] font-bold transition-all ${
                  isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                }`}>저장</button>
              </form>
            ) : (
              <div>
                <h3 className={`text-[24px] font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`} data-node-id="52:1762">{userName}님</h3>
                <button 
                  onClick={() => {
                    setTempName(userName);
                    setShowEditName(true);
                  }}
                  className={`flex gap-1.5 items-center mt-1 transition-colors ${
                    isDarkMode ? 'text-white/60 hover:text-white' : 'text-neutral-500 hover:text-neutral-850'
                  }`}
                  data-node-id="52:1766"
                >
                  <img alt="Edit" className={`w-3.5 h-3.5 object-contain opacity-60 ${isDarkMode ? '' : 'invert'}`} src={imgContainer} />
                  <span className="text-[12px] font-medium">프로필 수정</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section: Connections (연동 설정) */}
      <div className="space-y-3 mt-6" data-node-id="52:1774">
        <h4 className={`text-[12px] font-bold tracking-widest uppercase pl-2 ${
          isDarkMode ? 'text-white/40' : 'text-neutral-400'
        }`} data-node-id="52:1777">연동 설정</h4>
        
        <div className={`rounded-[22px] backdrop-blur-md overflow-hidden shadow-lg border transition-all ${
          isDarkMode ? 'border-white/10 bg-[#1b1b1b]/30 shadow-black/20' : 'bg-white border-neutral-200 shadow-sm'
        }`} data-node-id="52:1778">
          {/* Device Pairing navigation */}
          <button 
            onClick={() => onNavigate('pairing')}
            className={`w-full flex items-center justify-between p-[18px] border-b transition-colors duration-200 ${
              isDarkMode ? 'border-white/5 hover:bg-white/5 active:bg-white/10' : 'border-neutral-100 hover:bg-neutral-50 active:bg-neutral-100'
            }`}
            data-node-id="52:1779"
          >
            <div className="flex gap-4 items-center">
              <img alt="Devices" className={`w-5 h-4 object-contain opacity-65 ${isDarkMode ? '' : 'invert'}`} src={imgContainer1} />
              <span className={`text-[15px] font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>디바이스 페어링</span>
            </div>
            <img alt="Go" className={`w-2 h-3 object-contain opacity-30 ${isDarkMode ? '' : 'invert'}`} src={imgContainer2} />
          </button>

          {/* External API integration */}
          <button 
            className={`w-full flex items-center justify-between p-[18px] transition-colors duration-200 ${
              isDarkMode ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-neutral-50 active:bg-neutral-100'
            }`}
            data-node-id="52:1787"
          >
            <div className="flex gap-4 items-center">
              <img alt="API" className={`w-5 h-5 object-contain opacity-65 ${isDarkMode ? '' : 'invert'}`} src={imgContainer3} />
              <span className={`text-[15px] font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>외부 API 통합</span>
            </div>
            <img alt="Go" className={`w-2 h-3 object-contain opacity-30 ${isDarkMode ? '' : 'invert'}`} src={imgContainer2} />
          </button>
        </div>
      </div>

      {/* Section: Automation (자동화 설정) */}
      <div className="space-y-3 mt-6" data-node-id="52:1795">
        <h4 className={`text-[12px] font-bold tracking-widest uppercase pl-2 ${
          isDarkMode ? 'text-white/40' : 'text-neutral-400'
        }`} data-node-id="52:1796">자동화 설정</h4>

        <div className={`rounded-[22px] backdrop-blur-md overflow-hidden shadow-lg border transition-all ${
          isDarkMode ? 'border-white/10 bg-[#1b1b1b]/30 shadow-black/20' : 'bg-white border-neutral-200 shadow-sm'
        }`} data-node-id="52:1799">
          {/* AI workflow toggle */}
          <div 
            className={`w-full flex items-center justify-between p-[18px] border-b transition-colors duration-200 cursor-pointer ${
              isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-neutral-100 hover:bg-neutral-50'
            }`}
            onClick={() => setAiWorkflowEnabled(!aiWorkflowEnabled)}
            data-node-id="52:1800"
          >
            <div className="flex gap-4 items-center">
              <img alt="Workflow" className={`w-5 h-5 object-contain opacity-65 ${isDarkMode ? '' : 'invert'}`} src={imgContainer4} />
              <span className={`text-[15px] font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>AI 분석 워크플로우</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className={`text-[12px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                aiWorkflowEnabled 
                  ? (isDarkMode ? 'bg-white/15 text-white border-white/10' : 'bg-neutral-200 text-neutral-800 border-neutral-300') 
                  : (isDarkMode ? 'bg-transparent text-white/30 border-white/5' : 'bg-transparent text-neutral-400 border-neutral-200')
              }`}>
                {aiWorkflowEnabled ? '활성화됨' : '비활성'}
              </span>
              <img alt="Go" className={`w-2 h-3 object-contain opacity-30 ${isDarkMode ? '' : 'invert'}`} src={imgContainer2} />
            </div>
          </div>

          {/* Report generation */}
          <button 
            className={`w-full flex items-center justify-between p-[18px] transition-colors duration-200 ${
              isDarkMode ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-neutral-50 active:bg-neutral-100'
            }`}
            data-node-id="52:1811"
          >
            <div className="flex gap-4 items-center">
              <img alt="Reports" className={`w-5 h-5 object-contain opacity-65 ${isDarkMode ? '' : 'invert'}`} src={imgContainer5} />
              <span className={`text-[15px] font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>예약 리포트 생성</span>
            </div>
            <img alt="Go" className={`w-2 h-3 object-contain opacity-30 ${isDarkMode ? '' : 'invert'}`} src={imgContainer2} />
          </button>
        </div>
      </div>

      {/* Section: Preferences (기타 설정) */}
      <div className="space-y-3 mt-6" data-node-id="52:1819">
        <h4 className={`text-[12px] font-bold tracking-widest uppercase pl-2 ${
          isDarkMode ? 'text-white/40' : 'text-neutral-400'
        }`} data-node-id="52:1820">기타 설정</h4>

        <div className={`rounded-[22px] backdrop-blur-md overflow-hidden shadow-lg border transition-all ${
          isDarkMode ? 'border-white/10 bg-[#1b1b1b]/30 shadow-black/20' : 'bg-white border-neutral-200 shadow-sm'
        }`} data-node-id="52:1823">
          {/* Theme setting */}
          <button 
            onClick={onToggleTheme}
            className={`w-full flex items-center justify-between p-[18px] border-b transition-colors duration-200 ${
              isDarkMode ? 'border-white/5 hover:bg-white/5 active:bg-white/10' : 'border-neutral-100 hover:bg-neutral-50 active:bg-neutral-100'
            }`}
            data-node-id="52:1824"
          >
            <div className="flex gap-4 items-center">
              <img alt="Theme" className={`w-5 h-5 object-contain opacity-65 ${isDarkMode ? '' : 'invert'}`} src={imgContainer6} />
              <span className={`text-[15px] font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>테마 모드</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className={`text-[12px] transition-colors ${isDarkMode ? 'text-white/50' : 'text-neutral-500'}`}>{isDarkMode ? '다크 모드' : '라이트 모드'}</span>
              <img alt="Go" className={`w-2 h-3 object-contain opacity-30 ${isDarkMode ? '' : 'invert'}`} src={imgContainer2} />
            </div>
          </button>

          {/* Privacy and Security */}
          <button 
            className={`w-full flex items-center justify-between p-[18px] border-b transition-colors duration-200 ${
              isDarkMode ? 'border-white/5 hover:bg-white/5 active:bg-white/10' : 'border-neutral-100 hover:bg-neutral-50 active:bg-neutral-100'
            }`}
            data-node-id="52:1832"
          >
            <div className="flex gap-4 items-center">
              <img alt="Security" className={`w-4 h-5 object-contain opacity-65 ${isDarkMode ? '' : 'invert'}`} src={imgContainer7} />
              <span className={`text-[15px] font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>개인정보 및 보안</span>
            </div>
            <img alt="Go" className={`w-2 h-3 object-contain opacity-30 ${isDarkMode ? '' : 'invert'}`} src={imgContainer2} />
          </button>

          {/* Logout */}
          <button 
            onClick={onLogout}
            className={`w-full flex items-center p-[18px] transition-colors duration-200 ${
              isDarkMode ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-neutral-50 active:bg-neutral-100'
            }`}
            data-node-id="52:1840"
          >
            <div className="flex gap-4 items-center">
              <img alt="Logout" className={`w-[18px] h-[18px] object-contain opacity-65 ${isDarkMode ? '' : 'invert'}`} src={imgContainer8} />
              <span className={`text-[15px] font-medium transition-colors ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-neutral-500 hover:text-neutral-800'}`}>로그아웃</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
