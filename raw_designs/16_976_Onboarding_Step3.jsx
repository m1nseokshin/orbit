const imgGroup1707481713 = "https://www.figma.com/api/mcp/asset/6f55aa54-1ab7-4b3a-9ebb-4e6fadebc912";
const imgEllipse716 = "https://www.figma.com/api/mcp/asset/db6d77a7-5709-4371-9d67-905b36865c06";
const imgVector1 = "https://www.figma.com/api/mcp/asset/ac654734-8255-47ee-a631-42867fdf7af9";
const imgVector2 = "https://www.figma.com/api/mcp/asset/5926c653-da16-405f-888e-3ec874c48482";

export default function Onboarding() {
  return (
    <div className="bg-black relative size-full" data-node-id="16:976" data-name="Onboarding">
      <div className="[word-break:break-word] absolute font-['Pretendard:Bold'] leading-[0] left-[20px] not-italic text-[30px] text-white top-[138px] whitespace-nowrap" data-node-id="16:978">
        <p className="leading-[normal] mb-0 whitespace-pre">{`AI가 `}</p>
        <p className="leading-[normal] whitespace-pre">건강 상태를 요약합니다.</p>
      </div>
      <div className="absolute h-[9px] left-[calc(40%+8.8px)] top-[763px] w-[60.545px]" data-node-id="16:979">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1707481713} />
      </div>
      <p className="[word-break:break-word] absolute font-['Pretendard:Medium'] h-[120px] leading-[1.5] left-[calc(50%-176.5px)] not-italic text-[#bebebe] text-[16px] top-[231px] w-[328px]" data-node-id="16:984">
        복잡한 데이터를 대신 해석하고
        <br aria-hidden />
        필요한 정보만 전달합니다.
      </p>
      <p className="[word-break:break-word] absolute font-['Pretendard:Regular'] leading-[normal] left-[calc(80%+14.6px)] not-italic text-[#bebebe] text-[16px] top-[84px] whitespace-nowrap" data-node-id="18:47">
        SKIP
      </p>
      <div className="absolute left-[21.9px] size-[258px] top-[367.87px]" data-node-id="25:25">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse716} />
      </div>
      <div className="absolute h-[318.854px] left-[-127px] top-[351px] w-[604.114px]" data-node-id="25:26">
        <div className="absolute inset-[-0.31%_-0.17%]">
          <img alt="" className="block max-w-none size-full" src={imgVector1} />
        </div>
      </div>
      <div className="absolute flex h-[669.871px] items-center justify-center left-[-186px] top-[210px] w-[663px]">
        <div className="flex-none rotate-[46.03deg]">
          <div className="h-[335.766px] relative w-[606.868px]" data-node-id="25:28">
            <div className="absolute inset-[-0.3%_-0.16%]">
              <img alt="" className="block max-w-none size-full" src={imgVector2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}