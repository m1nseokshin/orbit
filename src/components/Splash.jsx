import React, { useEffect } from 'react';

const imgImage3 = "https://www.figma.com/api/mcp/asset/f78c633b-a330-4e64-999e-9500e8ead95e";

export default function Splash({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="bg-black relative w-full h-full flex items-center justify-center overflow-hidden" data-node-id="16:953" data-name="Splash">
      <div className="w-[332px] h-[332px] animate-pulse duration-1000" data-node-id="25:61" data-name="image 3">
        <img alt="Orbi Logo" className="w-full h-full object-contain" src={imgImage3} />
      </div>
    </div>
  );
}
