import React, { useState, useRef, useEffect } from 'react';

const imgGroup1707481716 = import.meta.env.BASE_URL + "figma/a8636f37-1252-4184-aff9-5cccfa12e287.svg";
const imgFrame1707481717 = import.meta.env.BASE_URL + "figma/0086d5f3-9e88-4585-85e5-e6b8dce00f87.svg";
const imgFrame1707481722 = import.meta.env.BASE_URL + "figma/2e843176-bd05-476f-805b-45da5d041bf8.svg";

const MOCK_CONVERSATIONS = [
  {
    id: 'conv1',
    title: "어제 수면 품질 및 심박수 분석",
    date: "어제 10:24",
    messages: [
      {
        id: 1,
        sender: 'orbi',
        text: "안녕하세요! 어제 수면 상태에 대해 질문하셨죠. 분석 결과 어제 총 수면 시간은 7시간 15분이었으며 깊은 수면 비중(22%)이 매우 양호했습니다."
      },
      {
        id: 2,
        sender: 'user',
        text: "깊은 수면이 잘 나와서 다행이네."
      },
      {
        id: 3,
        sender: 'orbi',
        text: "네, 맞습니다! 다만 입면 시간이 다소 지연되는 경향이 있으니, 잠들기 전 스마트폰 사용을 30분 정도 줄여보시면 수면의 질이 더 나아질 것입니다."
      }
    ]
  },
  {
    id: 'conv2',
    title: "가벼운 아침 스트레칭 추천",
    date: "어제 08:15",
    messages: [
      {
        id: 1,
        sender: 'orbi',
        text: "좋은 아침입니다! 밤사이 긴장되었던 척추와 어깨를 풀어주기 위해 가벼운 아침 요가나 스트레칭을 5분간 하시는 것이 좋습니다."
      },
      {
        id: 2,
        sender: 'user',
        text: "어깨 스트레칭 하니까 뻐근한 게 많이 풀렸어."
      },
      {
        id: 3,
        sender: 'orbi',
        text: "정말 다행이네요! 혈액 순환이 촉진되어 하루를 더 활기차게 시작하실 수 있을 거예요."
      }
    ]
  },
  {
    id: 'conv3',
    title: "두통 및 어깨 결림 해결 방안",
    date: "6월 4일",
    messages: [
      {
        id: 1,
        sender: 'user',
        text: "머리가 지끈거리고 목 뒷부분이 뻐근해."
      },
      {
        id: 2,
        sender: 'orbi',
        text: "뇌 피로나 자세 불균형으로 인한 일시적인 긴장성 두통일 가능성이 있습니다. 턱을 가슴 쪽으로 당겨 목 뒷부분을 펴주는 스트레칭과 함께 충분한 수분 섭취를 해주세요."
      }
    ]
  },
  {
    id: 'conv4',
    title: "일일 수분 보충 권장 가이드",
    date: "6월 3일",
    messages: [
      {
        id: 1,
        sender: 'orbi',
        text: "현재 기록된 오늘의 수분 섭취량이 부족한 편입니다. 대사 효율을 위해 물 한 잔을 마셔보는 건 어떨까요?"
      },
      {
        id: 2,
        sender: 'user',
        text: "마침 오르비 알림 보고 물 한 잔 챙겨 마셨어!"
      }
    ]
  }
];

export default function OrbiChat({ onBack, isDarkMode, userName }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'orbi',
      text: `안녕하세요, ${userName}님! 의료 전문 AI 오르비입니다. 오늘 어떤 도움이 필요하신가요?`
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [activeConvId, setActiveConvId] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, newMsg]);
    const userQuery = inputValue;
    setInputValue('');

    // Simulate AI typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const q = userQuery.toLowerCase().trim();
      const words = q.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).filter(w => w.length >= 2);
      const containsAny = (list) => list.some(item => q.includes(item));
      const disclaimer = `🚨 [전문 의료 AI 오르비 진단서]\n본 소견은 개인 헬스케어 데이터를 기반으로 생성되었으며 전문의의 진단을 대체하지 않습니다.\n\n`;

      let replyText = "";

      // 1. Cardiovascular (심혈관)
      if (containsAny(['가슴', '흉통', '답답', '심장', '통증', '혈압', '맥박', '조인다'])) {
        const mainWord = words.find(w => ['가슴', '흉통', '심장', '통증', '혈압', '맥박'].some(k => w.includes(k))) || "심장 및 가슴";
        replyText = `${disclaimer}🩺 생체 신호 분석:\n최근 수집된 심전도 센서 분석 및 ${userName}님이 입력하신 '${mainWord}' 상태와 관련하여 혈류 저항이 일시적으로 항진되었을 위험이 감지됩니다.\n\n💧 권장 조치:\n의복을 편안하게 릴랙스하고, 스마트 냉난방기를 작동하여 실내 온도를 혈관 수축을 유도하지 않는 22~23°C로 조절하세요. 10분간 천천히 호흡을 들이쉬고 내쉬는 4-6 호흡법을 하시면 안정을 취하는 데 매우 효과적입니다.\n\n⚠️ 응급 안내:\n통증이 가슴 중앙을 조이듯 번지거나 호흡 곤란이 심해진다면, 즉시 119 구급대를 호출해 신속히 의료진의 응급 검진을 받으시기 바랍니다.`;
      }
      // 2. Respiratory (호흡기/발열)
      else if (containsAny(['열', '발열', '기침', '감기', '독감', '목', '코로나', '목구멍', '콧물'])) {
        const mainWord = words.find(w => ['열', '발열', '기침', '감기', '독감', '목', '콧물'].some(k => w.includes(k))) || "호흡기 및 발열";
        replyText = `${disclaimer}🩺 생체 신호 분석:\n${userName}님이 입력하신 '${mainWord}' 상태는 면역 체계가 체내 침투한 바이러스 또는 감염성 인자와 싸우는 자연스러운 면역반응 기전입니다. 체온이 상승할 때 체내 수분 소비율이 동반 급증합니다.\n\n💧 권장 조치:\n탈수를 예방하기 위해 미온수를 1시간 단위로 150ml씩 나누어 섭취하십시오. 또한 건조한 공기가 기관지 점막을 자극해 기침을 유발할 수 있으므로, 방 안 가습기를 기동해 가습도를 55~60% 선으로 조절하시기 바랍니다.\n\n⚠️ 내원 권장:\n고열이 38.5°C 이상 유지되거나 심한 인후통, 기침 발작이 3일 이상 지속되는 경우 인근 이비인후과에서 정밀 진찰 및 처방을 받으십시오.`;
      }
      // 3. Sleep & Fatigue (수면/피로)
      else if (containsAny(['잠', '수면', '피곤', '피로', '무기력', '지쳐', '불면', '졸려'])) {
        const mainWord = words.find(w => ['잠', '수면', '피곤', '피로', '무기력', '불면', '졸려'].some(k => w.includes(k))) || "수면 및 피로";
        replyText = `${disclaimer}🩺 바이오 리듬 분석:\n${userName}님의 최근 기록된 멜라토닌 분비 주기와 '${mainWord}' 관련 불균형은 자율신경 활성화 상태 및 이산화탄소 대사 지연과 상관관계가 높습니다.\n\n💧 권장 조치:\n뇌에 산소를 즉시 공급하도록 10분간 대면 환기를 진행하거나 실내 공기청정기를 기동하십시오. 밤 시간 취침 1시간 전에는 블루라이트를 차단하기 위해 스마트 전등을 취침 등(따뜻한 색온도, 밝기 15% 이하)으로 일원화하는 것을 추천해 드립니다.\n\n⚠️ 건강 팁:\n체내 영양 불균형으로 인한 무기력은 영양제 복용(비타민 B군 및 비타민 C)으로 개선할 수 있습니다. 2주 이상 지속 시 의사와 혈액 검사를 상담하십시오.`;
      }
      // 4. Hydration (수분)
      else if (containsAny(['물', '수분', '음수', '목마', '갈증'])) {
        replyText = `💧 [Orbi 수분 대사 리포트]\n\n🩺 생체 순환 분석:\n현재 ${userName}님의 체내 삼투압 상태가 경미한 탈수 단계로 접어들었을 가능성이 큽니다. 수분 부족은 혈액 점도를 높이고 심장에 무리를 주며 두통을 발생시키는 주원인입니다.\n\n💧 권장 조치:\n한 번에 과다한 음수 보다는 미온수 200ml 가량을 매시간 소량씩 나눠 마시는 것이 체내 세포 흡수율에 가장 좋습니다. 스마트 가습기를 켜서 방 안의 건조함을 막는 것도 수분 손실을 방지합니다.`;
      }
      // 5. Dynamic Heuristic Response Generator
      else if (words.length > 0) {
        const keyStr = words.slice(0, 3).join(", ");
        const keywordRef = words[0];
        
        replyText = `🤖 [Orbi AI 실시간 자가진단]\n\n🩺 개인 헬스케어 데이터 매핑 분석:\n${userName}님이 제시해주신 '${keyStr}' 주제와 최근 웨어러블 바이오 데이터(평균 심박수, 스트레스 지수, 수면 효율)를 대조해 보았습니다.\n\n`;
        
        if (q.includes('아파') || q.includes('통증') || q.includes('결려') || q.includes('뻐근') || q.includes('저려')) {
          replyText += `🩺 생체 신호 소견:\n'${keywordRef}' 부위 또는 증상은 교감신경의 갑작스러운 흥분이나 신체 근막의 긴장으로 촉발되었을 가능성이 엿보입니다.\n\n💧 권장 조치:\n즉각적인 육체적 안정을 취하시고, 스마트 난방을 통해 실온을 따뜻하게 제어해 근육 이완을 도우십시오. 코로 4초간 들이쉬고 입으로 6초간 뱉는 심호흡을 5회 반복하시면 통증 유발 긴장이 완화됩니다.\n\n⚠️ 경고:\n만약 통증 강도가 극심해지거나 지속 시간이 24시간을 상회한다면 의료진의 정확한 임상 감별을 받으셔야 안전합니다.`;
        } else if (q.includes('추천') || q.includes('방법') || q.includes('어떻게') || q.includes('팁') || q.includes('추천해')) {
          replyText += `🩺 실시간 예방 의학 제안:\n'${keywordRef}' 관리와 관련하여 오늘의 활동 칼로리 소모량과 수면 상태를 기준으로 최적의 가이드를 안내해 드립니다.\n\n💧 맞춤 솔루션:\n1) 매 시간 200ml의 미온수 음용을 실천하세요.\n2) 기상 후와 취침 전에는 조도를 조절하여 생체 주기를 동기화하세요.\n3) 뻐근함이 축적된 척추를 풀기 위해 가벼운 어깨 롤링 스트레칭을 3분간 가볍게 시작해 보세요.`;
        } else {
          replyText += `🩺 라이프 밸런스 소견:\n보내주신 '${keywordRef}' 데이터는 현재 사용자의 바이오 밸런스(건강 점수 84점) 상태 내에서 안정적으로 제어 및 조율이 가능합니다.\n\n💧 일상 권장 사항:\n스마트 가습 및 공기 청정 기능을 활성화하여 실내 대기 쾌적도를 확보하시고, 규칙적인 영양 섭취와 수면 시간대를 지켜 대사 효율을 보존하십시오. 더 구체적인 증상이 있다면 편하게 추가 질문을 건네주세요!`;
        }
      } else {
        replyText = `🤖 [Orbi AI 자가진단 안내]\n\n안녕하세요, ${userName}님! 의료 전문 AI 오르비입니다. 건강 데이터 분석 및 실시간 바이오 모니터링을 토대로 맞춤형 의학 가이드와 스마트홈 컨트롤 연동 방안을 제언해 드릴 수 있습니다.\n\n더 상세한 증상(가슴 통증, 감기 발열, 피로 무기력, 혈압 상승, 수분 보충 등)을 입력해주시면 더 정교한 분석 결과를 안내해 드리겠습니다.`;
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'orbi',
        text: replyText
      }]);
    }, 1500);
  };

  const handleStartNewChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'orbi',
        text: `안녕하세요, ${userName}님! 의료 전문 AI 오르비입니다. 오늘 어떤 도움이 필요하신가요?`
      }
    ]);
    setActiveConvId(null);
    setShowDrawer(false);
  };

  const handleLoadConversation = (conv) => {
    setMessages(conv.messages);
    setActiveConvId(conv.id);
    setShowDrawer(false);
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-[#fafafa] text-neutral-900'
    }`} data-node-id="11:2666" data-name="orbi-chat">
      
      {/* Drawer Overlay */}
      {showDrawer && (
        <div 
          onClick={() => setShowDrawer(false)}
          className="absolute inset-0 bg-black/60 z-40 transition-opacity duration-300"
        />
      )}

      {/* Drawer Panel */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-[280px] border-r z-50 flex flex-col justify-between transition-transform duration-300 transform ${
          showDrawer ? 'translate-x-0' : '-translate-x-full'
        } ${
          isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-neutral-200 shadow-2xl'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar p-5">
          <div className={`flex items-center justify-between pb-4 border-b mb-4 ${
            isDarkMode ? 'border-white/10' : 'border-neutral-200'
          }`}>
            <h2 className={`text-[18px] font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>대화 목록</h2>
            <button 
              onClick={() => setShowDrawer(false)}
              className={`hover:opacity-80 ${isDarkMode ? 'text-white/50' : 'text-neutral-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleStartNewChat}
            className={`w-full h-[44px] rounded-[12px] font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors mb-4 ${
              isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            새 대화 시작
          </button>

          {/* Conversation History List */}
          <div className="space-y-2 flex-1">
            {MOCK_CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleLoadConversation(conv)}
                className={`w-full text-left p-3.5 rounded-[12px] transition-all flex flex-col gap-1 border ${
                  activeConvId === conv.id 
                    ? (isDarkMode ? 'bg-white/10 border-white/20' : 'bg-neutral-100 border-neutral-300') 
                    : 'bg-transparent border-transparent hover:bg-neutral-500/5'
                }`}
              >
                <span className={`text-[14px] font-semibold block truncate w-full ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>{conv.title}</span>
                <span className={`text-[10px] ${isDarkMode ? 'text-white/30' : 'text-neutral-450'}`}>{conv.date}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className={`p-5 border-t flex items-center gap-3 ${
          isDarkMode ? 'border-white/5 bg-[#0a0a0a]' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <div className={`w-[32px] h-[32px] rounded-full overflow-hidden border flex items-center justify-center shrink-0 ${
            isDarkMode ? 'border-white/10 bg-neutral-900' : 'border-neutral-200 bg-neutral-100'
          }`}>
            <img alt="Orbi Avatar" className="w-full h-full object-cover" src={imgFrame1707481722} />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`text-[12px] block ${isDarkMode ? 'text-white/40' : 'text-neutral-400'}`}>Powered by</span>
            <span className={`text-[13px] font-bold block truncate leading-none ${isDarkMode ? 'text-white' : 'text-neutral-850'}`}>Orbi AI Assist</span>
          </div>
        </div>
      </div>

      {/* Top Navbar */}
      <div className={`h-20 px-6 pt-12 flex justify-between items-center border-b z-10 ${
        isDarkMode ? 'bg-black border-white/5' : 'bg-[#fafafa] border-neutral-200'
      }`}>
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setShowDrawer(true)}
            className={`hover:opacity-85 p-1 transition-colors ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}
            aria-label="대화 목록"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <h1 className={`text-[22px] font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`} data-node-id="36:2167">Orbi Chat</h1>
        </div>
        {/* X Close (Back) button */}
        <button 
          onClick={onBack} 
          className={`hover:opacity-85 transition-colors p-1 ${isDarkMode ? 'text-white/60' : 'text-neutral-500'}`}
          aria-label="닫기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Chat Messages Feed Container */}
      <div className={`flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-5 flex flex-col ${
        isDarkMode ? 'bg-black' : 'bg-neutral-50/50'
      }`}>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col max-w-[80%] ${
              msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            {/* Bubble */}
            <div 
              className={`p-4 rounded-[22px] text-[15px] leading-relaxed tracking-normal font-sans border transition-all duration-300 ${
                msg.sender === 'user' 
                  ? (isDarkMode 
                      ? 'bg-[#333] border-[#555] text-white rounded-tr-none shadow-md shadow-white/5' 
                      : 'bg-neutral-800 border-neutral-900 text-white rounded-tr-none shadow-md') 
                  : (isDarkMode 
                      ? 'bg-[#141414]/90 border-white/10 text-white rounded-tl-none' 
                      : 'bg-white border-neutral-200 text-neutral-800 rounded-tl-none shadow-sm')
              }`}
            >
              {msg.text}
            </div>
            {/* Sender Label */}
            <span className={`text-[10px] mt-1 px-1 ${isDarkMode ? 'text-white/30' : 'text-neutral-400'}`}>
              {msg.sender === 'user' ? 'Me' : 'Orbi AI'}
            </span>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex flex-col max-w-[80%] self-start items-start animate-pulse">
            <div className={`p-4 rounded-[22px] rounded-tl-none text-[15px] border ${
              isDarkMode ? 'bg-[#141414]/90 border-white/10 text-neutral-400' : 'bg-white border-neutral-200 text-neutral-500'
            }`}>
              <span className="inline-flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-neutral-450 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-neutral-450 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-neutral-450 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
            <span className={`text-[10px] mt-1 px-1 ${isDarkMode ? 'text-white/30' : 'text-neutral-400'}`}>Orbi AI</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Box */}
      <form 
        onSubmit={handleSend}
        className={`px-6 py-6 border-t flex items-center justify-between gap-4 z-10 ${
          isDarkMode ? 'bg-black border-white/5' : 'bg-[#fafafa] border-neutral-200'
        }`}
      >
        <div className={`flex-1 h-[54px] rounded-full border flex items-center px-4 gap-3 ${
          isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-neutral-200 shadow-sm'
        }`}>
          <img alt="Mic" className={`w-4 h-4 object-contain opacity-50 ${isDarkMode ? '' : 'invert'}`} src={imgGroup1707481716} />
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Orbi에게 물어보세요!"
            className={`flex-1 bg-transparent text-[15px] focus:outline-none ${
              isDarkMode ? 'text-white placeholder-white/30' : 'text-neutral-950 placeholder-neutral-450'
            }`}
          />
        </div>
        <button 
          type="submit" 
          disabled={!inputValue.trim()}
          className={`w-[54px] h-[54px] rounded-full flex items-center justify-center transition-all active:scale-95 duration-200 ${
            inputValue.trim() 
              ? (isDarkMode ? 'bg-white hover:bg-neutral-200' : 'bg-black hover:bg-neutral-800') 
              : (isDarkMode ? 'bg-white/5 border border-white/10 opacity-30 cursor-not-allowed' : 'bg-neutral-100 border border-neutral-200 opacity-40 cursor-not-allowed')
          }`}
        >
          <img 
            alt="Send" 
            className={`w-[20px] h-[20px] object-contain ${
              inputValue.trim() ? (isDarkMode ? 'invert' : '') : (isDarkMode ? 'invert-0' : '')
            }`} 
            src={imgFrame1707481717} 
          />
        </button>
      </form>
    </div>
  );
}
