import React, { useState, useEffect } from 'react';

export default function CountUp({ to, duration = 800, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = parseFloat(to);
    if (isNaN(end)) {
      setCount(to);
      return;
    }
    if (end === 0) {
      setCount(0);
      return;
    }

    const totalFrames = 30; // 30 frames animation
    const frameDuration = duration / totalFrames;
    const increment = end / totalFrames;

    let currentFrame = 0;
    let timer = setInterval(() => {
      currentFrame++;
      const nextVal = Math.min(increment * currentFrame, end);
      setCount(nextVal);
      if (currentFrame >= totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [to, duration]);

  const displayValue = typeof count === 'number' ? count.toFixed(decimals) : count;

  return <>{displayValue}{suffix}</>;
}
