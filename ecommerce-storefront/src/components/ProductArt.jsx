// Draws a product illustration as inline SVG, so the store needs no image files
// and every product is coloured from its catalog entry.

const SHADOW = <ellipse cx="100" cy="176" rx="62" ry="7" fill="#16213E" opacity="0.1" />;

function Notebook({ color, accent }) {
  return (
    <g transform="rotate(-6 100 102)">
      <rect x="59" y="40" width="92" height="128" rx="6" fill="#FFFFFF" />
      <rect x="54" y="36" width="92" height="128" rx="6" fill={color} />
      <rect x="54" y="36" width="12" height="128" rx="3" fill="#000" opacity="0.14" />
      <rect x="128" y="36" width="6" height="128" fill={accent} />
      <rect x="76" y="62" width="42" height="24" rx="3" fill="#FFFFFF" opacity="0.92" />
      <rect x="82" y="70" width="30" height="3" rx="1.5" fill={color} opacity="0.55" />
      <rect x="82" y="77" width="20" height="3" rx="1.5" fill={color} opacity="0.35" />
    </g>
  );
}

function Pen({ color, accent }) {
  return (
    <g transform="rotate(40 100 100)">
      <rect x="89" y="22" width="22" height="104" rx="11" fill={color} />
      <rect x="89" y="84" width="22" height="6" fill={accent} />
      <rect x="109" y="28" width="5" height="46" rx="2.5" fill={accent} />
      <path d="M92 126 H108 L104 146 H96 Z" fill="#16213E" opacity="0.85" />
      <path d="M96 146 H104 L100 170 Z" fill="#C9A227" />
      <line x1="100" y1="152" x2="100" y2="166" stroke="#6E5512" strokeWidth="1.2" />
    </g>
  );
}

function InkBottle({ color, accent }) {
  return (
    <g>
      <rect x="84" y="40" width="32" height="22" rx="4" fill={accent} />
      <rect x="90" y="60" width="20" height="12" fill="#C7CCD6" />
      <rect x="56" y="70" width="88" height="98" rx="16" fill="#FFFFFF" opacity="0.6" />
      <rect x="56" y="70" width="88" height="98" rx="16" fill="none" stroke={accent} strokeOpacity="0.2" strokeWidth="2" />
      <rect x="62" y="100" width="76" height="62" rx="11" fill={color} />
      <rect x="70" y="112" width="60" height="28" rx="3" fill="#FFFFFF" />
      <rect x="78" y="121" width="44" height="3" rx="1.5" fill={color} />
      <rect x="78" y="129" width="28" height="3" rx="1.5" fill={color} opacity="0.5" />
    </g>
  );
}

function Pencil({ body, lead, angle }) {
  return (
    <g transform={`rotate(${angle} 100 164)`}>
      <path d="M91 52 L100 24 L109 52 Z" fill="#E9C99A" />
      <path d="M96.8 33.6 L100 24 L103.2 33.6 Z" fill={lead} />
      <rect x="91" y="52" width="18" height="96" fill={body} />
      <rect x="91" y="52" width="6" height="96" fill="#FFFFFF" opacity="0.22" />
      <rect x="91" y="148" width="18" height="10" fill="#C7CCD6" />
      <rect x="91" y="157" width="18" height="12" rx="4" fill="#F3A6B5" />
    </g>
  );
}

function Pencils({ color, accent }) {
  const isGraphite = color === '#2B2D42';
  return (
    <g>
      <Pencil body={accent} lead={isGraphite ? '#2B2D42' : accent} angle={-22} />
      <Pencil body="#E0A526" lead={isGraphite ? '#2B2D42' : '#E0A526'} angle={22} />
      <Pencil body={color} lead={isGraphite ? '#2B2D42' : color} angle={0} />
    </g>
  );
}

function Palette({ color, accent }) {
  const pans = ['#E85D75', '#E0A526', accent, '#2F7D5B', '#2141B8', '#6C4FA3'];
  return (
    <g>
      <rect x="30" y="60" width="132" height="88" rx="10" fill={color} />
      {pans.map((pan, i) => (
        <rect key={pan + i} x={42 + (i % 3) * 38} y={i < 3 ? 72 : 108} width="30" height="28" rx="5" fill={pan} />
      ))}
      <g transform="rotate(-38 150 140)">
        <rect x="146" y="92" width="8" height="74" rx="4" fill="#E9C99A" />
        <rect x="145" y="82" width="10" height="13" fill="#C7CCD6" />
        <path d="M145 82 Q150 60 155 82 Z" fill="#16213E" />
      </g>
    </g>
  );
}

function Tape({ color, accent, tint }) {
  return (
    <g>
      {/* unrolled strip with a torn end, lying under the roll */}
      <path d="M96 140 H168 L175 145.5 L168 151 L175 156.5 L168 162 H96 Z" fill={color} />
      <path d="M118 151 H160" stroke={accent} strokeWidth="7" strokeLinecap="round" strokeDasharray="0 14" opacity="0.8" />
      <circle cx="96" cy="104" r="58" fill={color} />
      <circle cx="96" cy="104" r="44" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" strokeDasharray="0 15" opacity="0.8" />
      <circle cx="96" cy="104" r="27" fill={tint} />
      <circle cx="96" cy="104" r="27" fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="4" />
    </g>
  );
}

function Lamp({ color, accent }) {
  return (
    <g>
      <path d="M124 92 L178 168 H96 Z" fill={accent} opacity="0.3" />
      <rect x="44" y="160" width="76" height="10" rx="5" fill={color} />
      <path d="M82 160 L66 102 L118 66" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="66" cy="102" r="7" fill={accent} />
      <g transform="rotate(38 128 72)">
        <path d="M108 60 H148 L140 88 H116 Z" fill={color} />
      </g>
      <circle cx="132" cy="92" r="7" fill={accent} />
    </g>
  );
}

function Pot({ color, accent }) {
  return (
    <g>
      <rect x="72" y="44" width="11" height="62" rx="2" fill={accent} transform="rotate(-12 77 75)" />
      <rect x="95" y="32" width="11" height="74" rx="2" fill="#16213E" />
      <rect x="118" y="50" width="11" height="56" rx="2" fill="#E85D75" transform="rotate(11 123 78)" />
      <path d="M60 92 H140 L134 164 Q133 170 127 170 H73 Q67 170 66 164 Z" fill={color} />
      <rect x="57" y="87" width="86" height="10" rx="4" fill={color} />
      <rect x="57" y="87" width="86" height="10" rx="4" fill="#000" opacity="0.12" />
      <rect x="74" y="106" width="6" height="50" rx="3" fill="#FFFFFF" opacity="0.22" />
    </g>
  );
}

function Cards({ color, accent }) {
  return (
    <g>
      <rect x="44" y="60" width="112" height="78" rx="4" fill="#FFFFFF" transform="rotate(-9 100 100)" />
      <rect x="44" y="70" width="112" height="78" rx="4" fill={color} />
      <path d="M44 74 L100 114 L156 74" fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="100" cy="114" r="9" fill={accent} />
    </g>
  );
}

function Sticky({ color, accent }) {
  return (
    <g>
      <rect x="50" y="56" width="100" height="112" rx="4" fill={accent} />
      <rect x="50" y="56" width="100" height="102" rx="4" fill="#2141B8" />
      <rect x="50" y="56" width="100" height="92" rx="4" fill="#2F7D5B" />
      <rect x="50" y="56" width="100" height="82" rx="4" fill={color} />
      <path d="M150 116 V138 H128 Z" fill="#000" opacity="0.12" />
      <rect x="64" y="74" width="58" height="4" rx="2" fill="#16213E" opacity="0.35" />
      <rect x="64" y="86" width="44" height="4" rx="2" fill="#16213E" opacity="0.35" />
      <rect x="64" y="98" width="52" height="4" rx="2" fill="#16213E" opacity="0.35" />
    </g>
  );
}

function Tote({ color, accent }) {
  return (
    <g>
      <path d="M78 82 Q78 40 100 40 Q122 40 122 82" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
      <path d="M54 78 H146 L154 168 Q154 172 150 172 H50 Q46 172 46 168 Z" fill={color} />
      <rect x="76" y="106" width="48" height="36" rx="4" fill={accent} />
      <path d="M86 120 H114 M86 129 H104" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Pouch({ color, accent }) {
  return (
    <g>
      <rect x="32" y="72" width="136" height="80" rx="32" fill={color} />
      <path d="M50 94 H150" stroke={accent} strokeWidth="4" strokeDasharray="3 3" />
      <rect x="140" y="88" width="9" height="24" rx="3" fill={accent} />
      <rect x="62" y="112" width="40" height="18" rx="3" fill="#FFFFFF" opacity="0.85" />
    </g>
  );
}

const DRAWINGS = {
  notebook: Notebook,
  pen: Pen,
  ink: InkBottle,
  pencils: Pencils,
  palette: Palette,
  tape: Tape,
  lamp: Lamp,
  pot: Pot,
  cards: Cards,
  sticky: Sticky,
  tote: Tote,
  pouch: Pouch,
};

export default function ProductArt({ art, label, className = '' }) {
  const Drawing = DRAWINGS[art.type] ?? Notebook;
  return (
    <div className={`product-art ${className}`} style={{ backgroundColor: art.tint }}>
      <svg viewBox="0 0 200 200" role="img" aria-label={label}>
        {SHADOW}
        <Drawing {...art} />
      </svg>
    </div>
  );
}
