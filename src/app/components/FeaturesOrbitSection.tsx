import { motion } from 'motion/react';
import {
  ShieldCheck, Headphones, Sparkles, BarChart3,
  FileSearch, Award, FileText, Zap,
} from 'lucide-react';

/* ── Keyframe CSS injected once ─────────────────────────────────────── */
const ORBIT_CSS = `
@keyframes ppe-cw {
  from { transform: rotate(0deg)   translateX(var(--ppe-r)) rotate(0deg);   }
  to   { transform: rotate(360deg) translateX(var(--ppe-r)) rotate(-360deg); }
}
@keyframes ppe-ccw {
  from { transform: rotate(0deg)    translateX(var(--ppe-r)) rotate(0deg);  }
  to   { transform: rotate(-360deg) translateX(var(--ppe-r)) rotate(360deg);}
}
.ppe-orbit-inner { animation: ppe-cw  32s linear infinite; --ppe-r: 160px; }
.ppe-orbit-outer { animation: ppe-ccw 52s linear infinite; --ppe-r: 268px; }
.ppe-orbit-inner:hover, .ppe-orbit-outer:hover { animation-play-state: paused; }
`;

/* ── Data ────────────────────────────────────────────────────────────── */
const INNER = [
  { icon: ShieldCheck, label: '100% Seguro',  accent: '#60b0ff' },
  { icon: Headphones,  label: 'Suporte BR',   accent: '#60b0ff' },
  { icon: Sparkles,    label: 'IA Integrada', accent: '#a78bfa' },
  { icon: BarChart3,   label: 'Tempo Real',   accent: '#60b0ff' },
];
const OUTER = [
  { icon: FileSearch, label: 'Análise Editais', accent: '#60b0ff' },
  { icon: Award,      label: 'Certidões',       accent: '#a78bfa' },
  { icon: FileText,   label: 'Propostas',        accent: '#60b0ff' },
  { icon: Zap,        label: 'Automação',        accent: '#fbbf24' },
];

const DUR_INNER = 32;
const DUR_OUTER = 52;

/* ── Bubble ──────────────────────────────────────────────────────────── */
function Bubble({
  feat, orbitClass, idx, total, dur,
}: {
  feat: typeof INNER[0];
  orbitClass: string;
  idx: number;
  total: number;
  dur: number;
}) {
  const size = orbitClass === 'ppe-orbit-inner' ? 72 : 80;
  const Icon = feat.icon;
  return (
    <div
      className={orbitClass}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -size / 2,
        marginLeft: -size / 2,
        width: size,
        height: size,
        animationDelay: `-${(idx / total) * dur}s`,
        cursor: 'default',
      }}
    >
      {/* The bubble itself doesn't rotate — it's counter-rotated inside the keyframe */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.22)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset, 0 6px 28px rgba(0,0,0,0.25), 0 2px 0 rgba(255,255,255,0.12) inset',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          transition: 'box-shadow 0.3s',
        }}
      >
        <Icon size={Math.round(size * 0.33)} color="white" strokeWidth={1.6} />
        <span style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: '7.5px',
          fontFamily: 'monospace',
          letterSpacing: '0.04em',
          textAlign: 'center',
          padding: '0 5px',
          lineHeight: 1.25,
          textTransform: 'uppercase',
        }}>
          {feat.label}
        </span>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────── */
export function FeaturesOrbitSection() {
  return (
    <section className="relative py-20 overflow-hidden pp-animated-bg">
      <style>{ORBIT_CSS}</style>

      {/* Ambient orbs */}
      <div className="absolute pointer-events-none" style={{ top: '10%', left: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(29,76,209,0.22) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '10%', right: '12%', width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(133,77,255,0.15) 0%, transparent 70%)', filter: 'blur(70px)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section label */}
        <motion.p
          className="text-center font-mono text-xs uppercase tracking-[0.2em] mb-3"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          [ Ecossistema Integrado ]
        </motion.p>

        {/* ── DESKTOP ORBIT (md+) ─────────────────────────────── */}
        <div className="hidden md:block">
          <div style={{ position: 'relative', width: 640, height: 640, margin: '0 auto' }}>

            {/* Outer orbit ring path */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 536, height: 536, marginTop: -268, marginLeft: -268, borderRadius: '50%', border: '1px dashed rgba(138,165,255,0.1)' }} />
            {/* Inner orbit ring path */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 320, height: 320, marginTop: -160, marginLeft: -160, borderRadius: '50%', border: '1px dashed rgba(138,165,255,0.12)' }} />

            {/* Outer bubbles */}
            {OUTER.map((f, i) => (
              <Bubble key={`o${i}`} feat={f} orbitClass="ppe-orbit-outer" idx={i} total={OUTER.length} dur={DUR_OUTER} />
            ))}
            {/* Inner bubbles */}
            {INNER.map((f, i) => (
              <Bubble key={`i${i}`} feat={f} orbitClass="ppe-orbit-inner" idx={i} total={INNER.length} dur={DUR_INNER} />
            ))}

            {/* ── Central glass card ── */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 230,
                height: 230,
                marginTop: -115,
                marginLeft: -115,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(29,76,209,0.12)',
                boxShadow: '0 8px 40px rgba(29,76,209,0.18), inset 0 1px 0 rgba(255,255,255,1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '28px',
                textAlign: 'center',
                zIndex: 4,
              }}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{ color: 'rgba(29,76,209,0.7)', fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '10px' }}>
                PricePilot
              </p>
              <h3 style={{ color: '#0D1A34', fontSize: '1.05rem', fontWeight: 300, letterSpacing: '-0.3px', lineHeight: 1.3, marginBottom: '10px' }}>
                Todos os recursos<br />em um só lugar
              </h3>
              <p style={{ color: 'rgba(13,26,52,0.5)', fontSize: '0.72rem', lineHeight: 1.55 }}>
                8 módulos integrados para licitações públicas
              </p>
            </motion.div>

          </div>
        </div>

        {/* ── MOBILE GRID (< md) ─────────────────────────────── */}
        <div className="md:hidden">
          <motion.h2
            className="lato-bold text-white text-center mb-2"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 2rem)', letterSpacing: '-0.3px', lineHeight: 1.2 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            Todos os recursos<br />em um só lugar
          </motion.h2>
          <p className="text-center mb-10" style={{ color: 'rgba(230,236,255,0.5)', fontSize: '0.9rem' }}>
            8 módulos integrados para licitações públicas
          </p>
          <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
            {[...INNER, ...OUTER].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div style={{ width: 58, height: 58, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.22)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color="white" strokeWidth={1.6} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.6rem', fontFamily: 'monospace', textAlign: 'center', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.3 }}>
                    {f.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}