import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Redesign',
  afterLabel = 'After ADR Transformation',
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientPositionX: number, rect: DOMRect) => {
    const x = clientPositionX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <div
      className="relative w-full h-[360px] md:h-[450px] rounded-2xl overflow-hidden select-none border border-slate-700/60 shadow-2xl cursor-ew-resize bg-slate-900"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Full Container) */}
      <img
        src={afterImage}
        alt="After Redesign"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute top-4 right-4 bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-md z-10">
        {afterLabel}
      </span>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeImage}
          alt="Before Redesign"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: '100%', maxWidth: 'none' }}
        />
        <span className="absolute top-4 left-4 bg-slate-900/90 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-md z-10">
          {beforeLabel}
        </span>
      </div>

      {/* Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.8)] z-20"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white">
          <SlidersHorizontal className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
