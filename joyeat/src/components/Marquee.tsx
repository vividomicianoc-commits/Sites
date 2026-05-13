'use client';

const words = [
  'FAST CASUAL SAUDÁVEL',
  'COMIDA DE VERDADE',
  'EM TEMPO DE COMER BEM',
  'GOIÂNIA',
  'JOYEAT',
  'SEM RADICALISMO',
  'SEM ESFORÇO MENTAL',
  'JOYBODY',
  'JOYPOWER',
  'ALIMENTAÇÃO REAL',
];

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...words, ...words];

  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '20px 0',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(255,255,255,0.01)',
      }}
    >
      <div
        className="marquee-track"
        style={{
          animation: `marquee ${reverse ? '25s' : '20s'} linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {doubled.map((word, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: i % 3 === 0 ? 'var(--joy-orange)' : i % 3 === 1 ? 'rgba(250,250,250,0.2)' : 'var(--joy-green)',
              whiteSpace: 'nowrap',
              marginRight: '60px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '60px',
            }}
          >
            {word}
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
