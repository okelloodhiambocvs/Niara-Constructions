import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'graphic';
  height?: number | string;
  light?: boolean;
}

export default function Logo({ className = '', variant = 'full', height = '100%', light = false }: LogoProps) {
  // Brand color scheme from the logo:
  // Left side: Dark teal (#0F7A6D)
  // Right side: Light teal (#1CB09E)
  const leftColor = '#0F7A6D';
  const rightColor = '#1CB09E';
  const textColor = light ? '#FFFFFF' : '#0B1E1D';
  const subtextColor = light ? 'rgba(255, 255, 255, 0.8)' : '#0F7A6D';

  const logoGraphic = (
    <g id="niara-brand-mark">
      {/* Level 1 (Top Peak) */}
      <path
        d="M 250,20 L 250,90 L 120,245 Z"
        fill={leftColor}
        className="transition-colors duration-300"
      />
      <path
        d="M 250,20 L 250,90 L 380,245 Z"
        fill={rightColor}
        className="transition-colors duration-300"
      />

      {/* Level 2 */}
      <path
        d="M 250,105 L 250,175 L 75,270 Z"
        fill={leftColor}
        className="transition-colors duration-300"
      />
      <path
        d="M 250,105 L 250,175 L 425,270 Z"
        fill={rightColor}
        className="transition-colors duration-300"
      />

      {/* Level 3 */}
      <path
        d="M 250,190 L 250,260 L 35,295 Z"
        fill={leftColor}
        className="transition-colors duration-300"
      />
      <path
        d="M 250,190 L 250,260 L 465,295 Z"
        fill={rightColor}
        className="transition-colors duration-300"
      />

      {/* Level 4 */}
      <path
        d="M 250,275 L 250,345 L 10,315 Z"
        fill={leftColor}
        className="transition-colors duration-300"
      />
      <path
        d="M 250,275 L 250,345 L 490,315 Z"
        fill={rightColor}
        className="transition-colors duration-300"
      />

      {/* Level 5 (Bottom) */}
      <path
        d="M 250,360 L 250,410 L 2,330 Z"
        fill={leftColor}
        className="transition-colors duration-300"
      />
      <path
        d="M 250,360 L 250,410 L 498,330 Z"
        fill={rightColor}
        className="transition-colors duration-300"
      />
    </g>
  );

  if (variant === 'graphic') {
    return (
      <svg
        viewBox="0 0 500 420"
        className={className}
        style={{ height }}
        id="niara-logo-graphic"
      >
        {logoGraphic}
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`} id="niara-logo-horizontal">
        <svg
          viewBox="0 0 500 420"
          className="flex-shrink-0"
          style={{ height: height || 40, width: 'auto' }}
        >
          {logoGraphic}
        </svg>
        <div className="flex flex-col">
          <span 
            className={`font-display font-bold text-xl tracking-[0.1em] leading-none transition-colors duration-300 ${light ? 'text-white' : 'text-brand-primary'}`}
          >
            NIARA
          </span>
          <span 
            className={`text-[8px] font-bold tracking-[0.22em] uppercase transition-colors duration-300 mt-1 ${light ? 'text-white/80' : 'text-brand-accent'}`}
          >
            CONSTRUCTION
          </span>
        </div>
      </div>
    );
  }

  // Full traditional brand layout (matching the uploaded image perfectly)
  return (
    <div className={`flex flex-col items-center text-center ${className}`} id="niara-logo-full">
      {/* SVG Graphic */}
      <svg
        viewBox="0 0 500 420"
        className="w-full max-w-[280px]"
        style={{ height: 'auto', maxHeight: '180px' }}
      >
        {logoGraphic}
      </svg>

      {/* Text Elements */}
      <div className="mt-4 select-none">
        <h1 
          className="font-display font-medium text-5xl md:text-6xl tracking-[0.25em] pl-[0.25em] leading-none font-black"
          style={{ color: textColor }}
        >
          NIARA
        </h1>
        
        <h2 
          className="text-[10px] md:text-xs font-bold tracking-[0.34em] pl-[0.34em] uppercase mt-3"
          style={{ color: subtextColor }}
        >
          CONSTRUCTION COMPANY LTD
        </h2>
        
        <p 
          className="text-lg md:text-xl mt-4 font-normal tracking-wide italic"
          style={{ 
            fontFamily: "'Alex Brush', 'Georgia', cursive",
            color: textColor 
          }}
        >
          Building tomorrow's legacy today
        </p>
      </div>
    </div>
  );
}
