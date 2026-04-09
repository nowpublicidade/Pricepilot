import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

const semItems = [
  'Horas vasculhando portais pra achar oportunidades no seu CNAE',
  'Toda proposta começa do zero — mesmos dados preenchidos de novo',
  'Cálculos na raça: impostos, encargos, VR, VT, tudo na planilha',
  'Você não sabe se vai dar lucro até ganhar e começar a executar',
  'Planilha de comprovação montada na mão depois de ganhar',
];

const comItems = [
  'Filtro inteligente: só as licitações que fazem sentido pra você',
  'Cadastro único — cada nova proposta puxa os dados automaticamente',
  'Cálculos automáticos: impostos, encargos e preço final na tela',
  'Análise de margem em tempo real — você sabe antes de enviar',
  'Exportação automática da comprovação no padrão do órgão',
];

interface FlipCardProps {
  type: 'sem' | 'com';
  items: string[];
  rotateY: MotionValue<number>;
}

function FlipCard({ type, items, rotateY }: FlipCardProps) {
  const isSem = type === 'sem';
  const accentColor   = isSem ? '#ff6b6b'              : '#60b0ff';
  const badgeBg       = isSem ? 'rgba(220,30,30,0.18)' : 'rgba(29,76,209,0.28)';
  const badgeBorder   = isSem ? 'rgba(220,80,80,0.35)' : 'rgba(100,180,255,0.35)';
  const dividerColor  = isSem ? 'rgba(220,80,80,0.2)'  : 'rgba(100,160,255,0.2)';
  const shineColor    = isSem ? 'rgba(255,100,100,0.35)': 'rgba(100,160,255,0.4)';

  const sharedGlass: React.CSSProperties = {
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    borderRadius: '20px',
    position: 'absolute',
    inset: 0,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  };

  const frontStyle: React.CSSProperties = {
    ...sharedGlass,
    background: isSem ? 'rgba(255,255,255,0.06)' : 'rgba(29,76,209,0.13)',
    border: `1px solid ${isSem ? 'rgba(255,255,255,0.13)' : 'rgba(100,160,255,0.22)'}`,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.4)',
  };

  const backStyle: React.CSSProperties = {
    ...sharedGlass,
    transform: 'rotateY(180deg)',
    background: isSem ? 'rgba(200,30,30,0.1)' : 'rgba(29,76,209,0.18)',
    border: `1px solid ${isSem ? 'rgba(220,80,80,0.28)' : 'rgba(100,160,255,0.28)'}`,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.4)',
  };

  return (
    <div style={{ perspective: '1400px' }} className="h-[400px]">
      <motion.div
        style={{
          rotateY,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* ── FRONT FACE ── */}
        <div style={frontStyle} className="flex flex-col items-center justify-center gap-5 p-8">
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${shineColor}, transparent)` }}
          />

          <div style={{
            width: '68px', height: '68px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', background: badgeBg,
            border: `1px solid ${badgeBorder}`, color: accentColor,
            boxShadow: `0 0 28px ${isSem ? 'rgba(220,30,30,0.22)' : 'rgba(29,76,209,0.32)'}`,
          }}>
            {isSem ? '✕' : '✓'}
          </div>

          <div className="text-center">
            <p style={{
              color: accentColor, fontFamily: 'monospace', fontSize: '0.68rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              opacity: 0.75, marginBottom: '10px',
            }}>
              {isSem ? '[ sem o pricepilot ]' : '[ com o pricepilot ]'}
            </p>
            <h3 style={{
              color: 'white', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
              fontWeight: 300, letterSpacing: '-0.4px', lineHeight: 1.2,
            }}>
              {isSem ? 'Horas perdidas e incerteza' : 'A plataforma faz o trabalho pesado'}
            </h3>
          </div>

          <motion.p
            animate={{ opacity: [0.3, 0.65, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.73rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}
          >
            ↓ role para revelar
          </motion.p>
        </div>

        {/* ── BACK FACE ── */}
        <div style={backStyle} className="flex flex-col p-7 sm:p-9 mx-[28px] my-[-33px]">
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${shineColor}, transparent)` }}
          />

          <div style={{ borderBottom: `1px solid ${dividerColor}`, paddingBottom: '14px', marginBottom: '18px' }}>
            <p style={{
              color: accentColor, fontFamily: 'monospace', fontSize: '0.68rem',
              letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.75, marginBottom: '6px',
            }}>
              {isSem ? '[ sem o pricepilot ]' : '[ com o pricepilot ]'}
            </p>
            <h3 style={{
              color: 'white', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              fontWeight: 300, letterSpacing: '-0.3px', lineHeight: 1.2,
            }}>
              {isSem ? 'Horas perdidas e incerteza' : 'A plataforma faz o trabalho pesado'}
            </h3>
          </div>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
                <span style={{
                  flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 700,
                  background: badgeBg, border: `1px solid ${badgeBorder}`,
                  color: accentColor, marginTop: '2px',
                }}>
                  {isSem ? '✕' : '✓'}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.91rem', lineHeight: 1.6 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'start 10%'],
  });

  const card1Rotate = useTransform(scrollYProgress, [0, 0.9],  [0, 180]);
  const card2Rotate = useTransform(scrollYProgress, [0.12, 1], [0, 180]);

  return (
    <section ref={sectionRef} style={{ position: 'relative' }} className="relative py-20 overflow-hidden pp-animated-bg">
      {/* Ambient orbs */}
      <div className="absolute pointer-events-none" style={{
        top: '-80px', left: '10%', width: '420px', height: '420px',
        background: 'radial-gradient(circle, rgba(220,30,30,0.18) 0%, transparent 70%)',
        filter: 'blur(65px)',
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '40px', right: '8%', width: '440px', height: '440px',
        background: 'radial-gradient(circle, rgba(29,76,209,0.28) 0%, transparent 70%)',
        filter: 'blur(65px)',
      }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
            [ A diferença real ]
          </p>
          <h2 className="lato-bold text-white" style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            letterSpacing: '-0.5px', lineHeight: 1.15,
          }}>
            O que muda quando você para de{' '}
            <span style={{ color: '#60a5fa', fontStyle: 'italic' }}>fazer tudo na mão</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.7 }}>
            De um lado, horas perdidas e incerteza. Do outro, uma plataforma que faz o trabalho pesado por você.
          </p>
        </motion.div>

        {/* Flip cards — side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FlipCard type="sem" items={semItems} rotateY={card1Rotate} />
          <FlipCard type="com" items={comItems} rotateY={card2Rotate} />
        </div>

      </div>
    </section>
  );
}