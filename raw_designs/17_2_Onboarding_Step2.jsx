const imgEllipse723 = "https://www.figma.com/api/mcp/asset/9ee0b1c0-70ae-40bd-8ce9-b062eaf19285";
const imgEllipse724 = "https://www.figma.com/api/mcp/asset/d468196f-c19e-44ae-80e3-a749c572ab3f";
const imgEllipse719 = "https://www.figma.com/api/mcp/asset/60287f0a-a28f-438d-bc7f-4f4594464483";

export default function Onboarding() {
  return (
    <div className="bg-black relative size-full" data-node-id="17:2" data-name="Onboarding">
      <p className="[word-break:break-word] absolute font-['Pretendard:Regular'] leading-[normal] left-[-134px] not-italic text-[#bebebe] text-[16px] top-[84px] whitespace-nowrap" data-node-id="17:3">
        SKIP
      </p>
      <div className="[word-break:break-word] absolute font-['Pretendard:Bold'] leading-[0] left-[20px] not-italic text-[30px] text-white top-[138px] whitespace-nowrap" data-node-id="17:4">
        <p className="leading-[normal] mb-0">행동보다</p>
        <p className="leading-[normal]">자연스러운 케어</p>
      </div>
      <div className="[word-break:break-word] absolute font-['Pretendard:Medium'] h-[120px] leading-[0] left-[calc(50%-176.5px)] not-italic text-[#bebebe] text-[16px] top-[231px] w-[328px]" data-node-id="17:10">
        <p className="leading-[1.5] mb-0">기록하지 않아도, 신경 쓰지 않아도.</p>
        <p className="leading-[1.5]">건강한 일상이 지속될 수 있도록.</p>
      </div>
      <a className="absolute contents cursor-pointer left-[26px] top-[724px]" data-node-id="18:46">
        <div className="absolute bg-black border border-solid border-white h-[54px] left-[26px] rounded-[13px] top-[724px] w-[342px]" data-node-id="18:38" />
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Pretendard:SemiBold'] leading-[24px] left-[calc(40%+39.8px)] not-italic text-[19px] text-center text-white top-[739px] whitespace-nowrap" data-node-id="18:44">
          시작하기
        </p>
      </a>
      <div className="[word-break:break-word] absolute bg-white content-stretch flex font-['SF_Pro:Semibold'] font-[590] gap-[5px] h-[54px] items-center justify-center left-[26px] px-[15px] rounded-[14px] text-[19px] text-black top-[649px] w-[342px] whitespace-nowrap" data-node-id="18:39" data-name="Sign in with Apple - White Background">
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col justify-center leading-[0] relative shrink-0 text-center" data-node-id="I18:39;26:357" style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[normal]">{`\uF8FF`}</p>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[24px] relative shrink-0" data-node-id="I18:39;26:345" style={{ fontVariationSettings: '"wdth" 100' }}>
          Sign in with Apple
        </p>
      </div>
      <div className="absolute flex h-[212.233px] items-center justify-center left-[9px] top-[374.14px] w-[362.092px]">
        <div className="flex-none rotate-[25.93deg]">
          <div className="h-[52.695px] relative w-[377px]" data-node-id="26:191">
            <div className="absolute inset-[-0.94%_-0.13%_-0.95%_-0.13%]">
              <img alt="" className="block max-w-none size-full" src={imgEllipse723} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[153.341px] items-center justify-center left-[-127.77px] top-[408.17px] w-[563.248px]">
        <div className="flex-none rotate-[-9.3deg]">
          <div className="h-[63.667px] relative w-[560.323px]" data-node-id="26:196">
            <div className="absolute inset-[-0.78%_0_-0.79%_0]">
              <img alt="" className="block max-w-none size-full" src={imgEllipse724} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[calc(20%+26.4px)] size-[211px] top-[351px]" data-node-id="26:193">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse719} />
      </div>
    </div>
  );
}