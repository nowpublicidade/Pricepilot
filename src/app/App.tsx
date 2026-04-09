import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Check, ChevronDown, ChevronRight, FileText, Building2, DollarSign, CheckCircle2, ChevronLeft, Files, ShieldAlert, BarChart2, SearchCheck, Users, TrendingUp, ShieldCheck, Zap, MoreHorizontal } from 'lucide-react';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ComparisonSection } from './components/ComparisonSection';
import { FeaturesOrbitSection } from './components/FeaturesOrbitSection';
import stepImg01 from 'figma:asset/7f668e210343a08aa0103ba352df8bce67d2202c.png';
import stepImg02 from 'figma:asset/8f9c9d62d76df3a62d68d523cc56c18eff620824.png';
import stepImg03 from 'figma:asset/766a458d86dbac42cdb6e4cf1fb3ffd9bacfb381.png';
import logoColorful from 'figma:asset/3708841680927d1f84aca8553afa7881232456f9.png';
import logoWhite from 'figma:asset/f94892723fbbb0a4f2f32308df8ee1f6af782af3.png';

const STEP_IMAGES = [stepImg01, stepImg02, stepImg03];

/* ── Glow nav link ── */
const flipFront = { initial: { rotateX: 0, opacity: 1 }, hover: { rotateX: -90, opacity: 0 } };
const flipBack  = { initial: { rotateX: 90, opacity: 0 }, hover: { rotateX: 0, opacity: 1 } };
const flipTransition = { type: 'spring' as const, stiffness: 120, damping: 22 };

function GlowNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="block">
      <motion.div className="relative overflow-hidden rounded-lg px-3 py-1.5" style={{ perspective: 600 }} whileHover="hover" initial="initial">
        <motion.span className="absolute inset-0 rounded-lg pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)' }} variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.3 }} />
        <motion.span className="relative block text-white/75 z-10" variants={flipFront} transition={flipTransition} style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}>{children}</motion.span>
        <motion.span className="absolute inset-0 flex items-center justify-center text-white z-10" variants={flipBack} transition={flipTransition} style={{ transformStyle: 'preserve-3d', transformOrigin: 'center top', rotateX: 90 }}>{children}</motion.span>
      </motion.div>
    </a>
  );
}

/* ── PilotButton ── */
type PilotBtnSize = 'sm' | 'md' | 'lg' | 'xl';
type PilotBtnVariant = 'primary' | 'white' | 'ghost';

function PilotButton({ href, onClick, children, className = '', size = 'md', variant = 'primary', disabled = false, fullWidth = false }: {
  href?: string; onClick?: () => void; children: React.ReactNode;
  className?: string; size?: PilotBtnSize; variant?: PilotBtnVariant;
  disabled?: boolean; fullWidth?: boolean;
}) {
  const pad   = { sm: 'px-4 py-2', md: 'px-6 py-[10px]', lg: 'px-8 py-[14px]', xl: 'px-12 py-5' }[size];
  const tSize = { sm: 'text-xs', md: 'text-sm', lg: 'text-base', xl: 'text-xl' }[size];
  const fill  = disabled ? 'bg-gray-400' : variant === 'white' ? 'bg-white group-hover:bg-gray-100' : variant === 'ghost' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-[#1D4CD1] group-hover:bg-[#1535a0]';
  const textCol = variant === 'white' ? 'text-[#1D4CD1]' : 'text-white';
  const borderGrad = variant === 'ghost' ? 'linear-gradient(135deg,rgba(255,255,255,0.45) 0%,rgba(255,255,255,0.08) 100%)' : variant === 'white' ? 'linear-gradient(135deg,rgba(29,76,209,0.75) 0%,rgba(107,158,255,0.25) 100%)' : 'linear-gradient(135deg,rgba(107,158,255,0.6) 0%,rgba(29,76,209,0.18) 55%,transparent 100%)';
  const outerBg = variant === 'ghost' ? 'rgba(255,255,255,0.06)' : variant === 'white' ? 'rgba(255,255,255,0.12)' : disabled ? 'rgba(150,150,150,0.1)' : 'rgba(29,76,209,0.12)';
  const base = `relative overflow-hidden rounded-[8px] group ${pad} ${fullWidth ? 'w-full' : ''} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`;
  const inner = (
    <>
      <span className="absolute inset-0 rounded-[8px] pointer-events-none" style={{ background: borderGrad, padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
      <span className={`absolute inset-[1px] rounded-[7px] transition-colors duration-200 ${fill}`} />
      <span className={`relative flex items-center justify-center gap-2 lato-bold tracking-[-0.3px] ${textCol} ${tSize}`}>{children}</span>
    </>
  );
  if (href) return <a href={href} className={base} style={{ background: outerBg }}>{inner}</a>;
  return <button onClick={onClick} disabled={disabled} className={base} style={{ background: outerBg }}>{inner}</button>;
}

/* ── Global styles ── */
const GLOW_STYLES = `
  @keyframes pp-glow-pulse {
    0%,100% { box-shadow: 0 0 18px rgba(255,255,255,0.35), 0 0 40px rgba(147,197,253,0.2); }
    50%      { box-shadow: 0 0 32px rgba(255,255,255,0.75), 0 0 80px rgba(147,197,253,0.4); }
  }
  @keyframes pp-glow-pulse-blue {
    0%,100% { box-shadow: 0 0 18px rgba(29,76,209,0.3), 0 0 40px rgba(29,76,209,0.1); }
    50%      { box-shadow: 0 0 32px rgba(29,76,209,0.6), 0 0 80px rgba(29,76,209,0.2); }
  }
  .pp-glow-white { animation: pp-glow-pulse 2.8s ease-in-out infinite; }
  .pp-glow-blue  { animation: pp-glow-pulse-blue 2.8s ease-in-out infinite; }

  @keyframes pp-gradient-drift {
    0%   { background-position: 0% 0%;   }
    33%  { background-position: 100% 50%; }
    66%  { background-position: 50% 100%; }
    100% { background-position: 0% 0%;   }
  }
  .pp-animated-bg {
    background: linear-gradient(170deg, #060118 0%, #0d0870 30%, #160da8 62%, #1a10b5 80%, #0d0870 100%);
    background-size: 250% 250%;
    animation: pp-gradient-drift 14s ease infinite;
  }

  .pp-bridge-top, .pp-bridge-bottom, .pp-bridge-top-md { display: none; }

  /* Glass card base */
  .pp-glass-card {
    background: rgba(255,255,255,0.07);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.13);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.25);
  }
  .pp-glass-white {
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(29,76,209,0.14);
    box-shadow: 0 4px 24px rgba(29,76,209,0.08), inset 0 1px 0 rgba(255,255,255,0.9);
  }
`;

import heroMockupImage from 'figma:asset/b45db7ab8c674ad92483b802f10a9128a075e418.png';
import baseTributariaImage from 'figma:asset/2a1242c933acca66d9023ad40b5fa722a3766521.png';

/* ── Viewport config: once:false so elements re-animate on scroll back ── */
const VP = { once: false, margin: '-60px' } as const;

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: GLOW_STYLES }} />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-[8px] rounded-[10px] flex items-center gap-[30px] px-5 py-[13px]" style={{ background: 'rgba(13,26,52,0.75)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 flex-shrink-0">
              <img src={logoWhite} alt="PricePilot" className="w-auto h-[150px]" />
            </div>
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
              <GlowNavLink href="#problemas">Problemas</GlowNavLink>
              <GlowNavLink href="#solucao">Solução</GlowNavLink>
              <GlowNavLink href="#como-funciona">Como Funciona</GlowNavLink>
              <GlowNavLink href="#preco">Preços</GlowNavLink>
              <GlowNavLink href="#faq">FAQ</GlowNavLink>
            </div>
            <div className="hidden md:flex items-center flex-shrink-0">
              <PilotButton href="#cta" size="md">Começar agora</PilotButton>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden ml-auto text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 max-w-7xl mx-auto rounded-[10px] overflow-hidden" style={{ background: 'rgba(13,26,52,0.96)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-4 space-y-1">
              {['#problemas:Problemas','#solucao:Solução','#como-funciona:Como Funciona','#preco:Preços','#faq:FAQ'].map(s => {
                const [href, label] = s.split(':');
                return <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="block text-white/75 hover:text-white py-2 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</a>;
              })}
              <PilotButton href="#cta" size="md" fullWidth className="mt-2 text-center justify-center">Começar agora</PilotButton>
            </div>
          </div>
        )}
      </nav>

      {/* ── SECTION 1 · HERO ── */}
      <section className="relative overflow-hidden pp-animated-bg">
        <div className="absolute pointer-events-none" style={{ top: '-5%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse 65% 55% at 50% 35%, rgba(100,60,255,0.45) 0%, rgba(40,20,200,0.2) 45%, transparent 75%)', filter: 'blur(24px)' }} />
        <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(80,20,200,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(80,20,200,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center" style={{ paddingTop: '150px', paddingBottom: '56px' }}>
          <motion.h1
            className="lato-bold text-white mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.6rem)', letterSpacing: '-1.6px', lineHeight: 1.08 }}
            initial={{ opacity: 0, y: 22, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Decisões mais inteligentes<br />para competir e vencer
          </motion.h1>
          <motion.p
            className="text-white/75 max-w-[420px] mx-auto mb-10 leading-relaxed"
            style={{ fontSize: '1rem' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            Centralize o pricing, simulações e operação de propostas em uma experiência mais segura, estratégica e auditável.
          </motion.p>
          <motion.div className="flex justify-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}>
            <PilotButton href="#cta" size="lg" variant="ghost">Começar grátis</PilotButton>
          </motion.div>
        </div>

        <motion.div className="relative z-10 w-full" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}>
          <motion.img
            src={heroMockupImage}
            alt="PricePilot Platform"
            className="w-4/5 sm:w-3/4 block mx-auto mx-[207px] my-[-80px]"
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: [0, -10, 0], filter: 'blur(0px)' }}
            transition={{ opacity: { duration: 1.1 }, filter: { duration: 1.1 }, y: { delay: 1.1, duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }}
          />
        </motion.div>


      </section>

      {/* ── SECTION 2 · 5 PROBLEMS ── */}
      <section id="problemas" className="relative py-24 bg-white overflow-hidden">
        {/* Bridges */}
        <div className="pp-bridge-top" style={{ background: 'linear-gradient(to bottom, rgba(6,1,24,0.6) 0%, transparent 100%)' }} />
        <div className="pp-bridge-bottom" />

        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(29,76,209,0.05) 0%, transparent 55%), radial-gradient(circle at 10% 80%, rgba(29,76,209,0.04) 0%, transparent 50%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
          <motion.div className="mb-14" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <h2 className="lato-bold text-[clamp(2rem,4vw,3.2rem)] text-[#0D1A34]">
              5 problemas que{' '}
              <span className="text-[#1D4CD1]">custam caro</span>{' '}
              na sua operação
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'PROBLEMA 01', icon: Files, title: 'Planilhas isoladas e sem controle de versão', desc: 'Cada proposta é um arquivo solto, sem rastreabilidade nem histórico consolidado.' },
              { label: 'PROBLEMA 02', icon: ShieldAlert, title: 'Governança fiscal manual e suscetível a erro', desc: 'CNAE, Simples, CPRB, PIS/COFINS — tudo calculado na mão, sob pressão.' },
              { label: 'PROBLEMA 03', icon: BarChart2, title: 'Simulação de cenários feita no "achômetro"', desc: 'Testar margem, BDI e risco demanda retrabalho em múltiplas cópias de arquivo.' },
              { label: 'PROBLEMA 04', icon: SearchCheck, title: 'Ausência de auditoria e rastreabilidade', desc: 'Se o TCU bater na porta, você tem registro completo de como cada preço foi formado?' },
              { label: 'PROBLEMA 05', icon: Users, title: 'Equipe presa em tarefas operacionais', desc: 'Seu time gasta mais tempo formatando planilhas do que analisando estratégia.' },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.label}
                  className="pp-glass-white group flex flex-col rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
                >
                  <p className="mb-6 text-[11px] tracking-widest text-[#1D4CD1]/60 font-mono uppercase">[ {p.label} ]</p>
                  <div className="flex-1 flex items-center justify-center py-6">
                    <div className="relative">
                      <motion.div className="absolute inset-0 rounded-2xl" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(29,76,209,0.22) 0%, transparent 70%)', filter: 'blur(12px)' }} animate={{ opacity: [0.45, 1, 0.45], scale: [0.85, 1.18, 0.85] }} transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: i * 0.4 }} />
                      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.2, ease: 'easeInOut', repeat: Infinity, delay: i * 0.35 }}>
                        <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.80) 0%, rgba(29,76,209,0.10) 100%)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 4px 28px rgba(29,76,209,0.14), inset 0 1px 0 rgba(255,255,255,1)' }}>
                          <motion.div className="absolute -top-4 -left-6 w-10 h-32 pointer-events-none" style={{ background: 'rgba(255,255,255,0.5)', filter: 'blur(7px)', transform: 'rotate(-35deg)' }} animate={{ x: [-24, 72, -24] }} transition={{ duration: 4.8, ease: 'easeInOut', repeat: Infinity, delay: i * 0.55 }} />
                          <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }} transition={{ duration: 3.2, ease: 'easeInOut', repeat: Infinity, delay: i * 0.35 }}>
                            <Icon className="w-9 h-9 relative z-10" style={{ color: '#1D4CD1', filter: 'drop-shadow(0 2px 8px rgba(29,76,209,0.4))' }} strokeWidth={1.5} />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  <div>
                    <h3 className="lato-bold text-[#0D1A34] mb-2 leading-snug text-base">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 · POSITIONING ── */}
      <section className="relative py-24 overflow-hidden pp-animated-bg">
        {/* Top bridge from Problems white */}
        <div className="pp-bridge-top-md" style={{ background: 'linear-gradient(to bottom, white 0%, transparent 100%)' }} />

        <div className="absolute inset-0 pointer-events-none mx-[0px] my-[4px]" style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(8,10,60,0.55) 100%)' }} />
        <motion.div className="absolute rounded-full pointer-events-none" style={{ width: 750, height: 750, top: '-20%', left: '-15%', background: 'radial-gradient(circle, rgba(8,10,90,0.75) 0%, transparent 60%)', filter: 'blur(50px)' }} animate={{ x: [0, 70, -35, 0], y: [0, -45, 35, 0] }} transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }} />
        <motion.div className="absolute rounded-full pointer-events-none" style={{ width: 600, height: 600, bottom: '-15%', right: '-10%', background: 'radial-gradient(circle, rgba(40,55,220,0.65) 0%, transparent 60%)', filter: 'blur(55px)' }} animate={{ x: [0, -55, 45, 0], y: [0, 35, -55, 0] }} transition={{ duration: 22, ease: 'easeInOut', repeat: Infinity, delay: 3 }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Glass dashboard card */}
            <motion.div initial={{ opacity: 0, x: -48 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" style={{ color: '#1D4CD1' }} />
                    <span className="text-white/90 text-sm">Simulação de Proposta</span>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-white/30" />
                </div>
                <div className="mx-5 mt-4">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(29,76,209,0.18)', border: '1px solid rgba(29,76,209,0.3)' }}>
                    <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: '#4d8df7' }} />
                    <p className="text-white/80 text-xs">Sua margem está <span className="text-[#4d8df7] font-semibold">8% acima</span> da média do setor este mês.</p>
                  </div>
                </div>
                <div className="flex items-start justify-between px-5 mt-5 mb-1">
                  <div>
                    <p className="lato-bold text-white text-2xl" style={{ letterSpacing: '-0.5px' }}>R$ 2,8M</p>
                    <p className="text-white/40 text-xs mt-0.5">Valor total em propostas</p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs text-white/60 cursor-pointer" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    Este mês <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
                <div className="px-5 pt-2 pb-5">
                  <div className="flex items-end gap-[5px] h-28">
                    {[38, 52, 45, 70, 58, 80, 65, 90, 72, 85, 60, 75, 55, 88, 78, 95].map((h, idx) => (
                      <motion.div key={idx} className="flex-1 rounded-sm" style={{ background: 'linear-gradient(180deg, #3a72e8 0%, #1D4CD1 100%)', minWidth: 0, opacity: idx % 3 === 0 ? 0.5 : 0.85 }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={VP} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 + idx * 0.03 }} animate={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-white/30 text-[10px]">11 Jan</span>
                    <span className="text-white/30 text-[10px]">12 Fev</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Text */}
            <motion.div initial={{ opacity: 0, x: 48 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}>
              <p className="font-mono text-xs tracking-[0.2em] uppercase mb-5" style={{ color: '#4d8df7' }}>[ Plataforma ]</p>
              <h2 className="lato-bold text-white mb-6" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', lineHeight: 1.12, letterSpacing: '-0.5px' }}>
                Precificação inteligente para quem compete em licitações
              </h2>
              <p className="text-white/60 mb-10 leading-relaxed">
                PricePilot centraliza pricing, simulações e operação de propostas em uma experiência mais segura, estratégica e auditável — do cálculo fiscal ao envio.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  { icon: ShieldCheck, text: 'Governança fiscal automática — CNAE, Simples, CPRB, PIS/COFINS' },
                  { icon: BarChart2,   text: 'Simulação de cenários em tempo real com comparativo de BDI e margem' },
                  { icon: Zap,         text: 'Auditoria completa e rastreável, pronta para fiscalização do TCU' },
                ].map(({ icon: Icon, text }, i) => (
                  <motion.li key={i} className="flex items-start gap-3" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 + i * 0.1 }}>
                    <span className="mt-0.5 w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(29,76,209,0.25)', border: '1px solid rgba(29,76,209,0.4)' }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: '#4d8df7' }} strokeWidth={1.8} />
                    </span>
                    <span className="text-white/70 text-sm leading-relaxed">{text}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.a href="#como-funciona" className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase transition-all" style={{ color: '#4d8df7' }} whileHover={{ gap: '12px' }}>
                VER COMO FUNCIONA <ChevronRight className="w-3.5 h-3.5" />
              </motion.a>
            </motion.div>
          </div>
        </div>


      </section>

      {/* ── SECTION 4 · SOCIAL PROOF ── */}
      <TestimonialsSection />

      {/* ── SECTION 5 · HOW IT WORKS ── */}
      <section id="como-funciona" className="relative overflow-hidden pp-animated-bg px-[21px] py-[80px]">
        {/* Top bridge from Testimonials white */}
        <div className="pp-bridge-top-md" style={{ background: 'linear-gradient(to bottom, white 0%, transparent 100%)' }} />

        <div className="absolute pointer-events-none" style={{ top: '-80px', right: '10%', width: '480px', height: '480px', background: 'radial-gradient(circle, rgba(29,76,209,0.35) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '60px', left: '5%', width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(19,24,184,0.3) 0%, transparent 70%)', filter: 'blur(50px)' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
          <motion.div className="mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.65, ease: 'easeOut' }}>
            <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>[ Como funciona ]</p>
            <h2 className="lato-bold text-white" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', letterSpacing: '-0.5px', lineHeight: 1.12, maxWidth: '560px' }}>
              Em 3 passos, sua operação de propostas vira estratégia.
            </h2>
          </motion.div>

          <div className="space-y-5">
            {[
              { num: '01', title: 'Configure a base fiscal da empresa', headline: 'Sua base fiscal fica organizada, sem depender de planilha.', desc: 'Defina CNAE, regime tributário, alíquotas e CPRB uma única vez. O sistema passa a usar essa referência em todas as propostas — com consistência e conformidade automáticas.', tags: ['Base Fiscal', 'Onboarding'], img: 'https://images.unsplash.com/photo-1762427354397-854a52e0ded7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXglMjBkb2N1bWVudHMlMjBidXNpbmVzcyUyMHNwcmVhZHNoZWV0fGVufDF8fHx8MTc3NTY4MTg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
              { num: '02', title: 'Monte a proposta com simulação em tempo real', headline: 'Simule cenários fiscais e defina a margem ideal antes de enviar.', desc: 'Insira itens, custos e margens. O PricePilot calcula impostos, BDI e preço final automaticamente. Teste quantos cenários quiser em segundos.', tags: ['Simulação', 'Precificação'], img: 'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhdGElMjBkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzc1NjgxODY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
              { num: '03', title: 'Exporte, audite e aprenda com cada disputa', headline: 'Rastreabilidade completa, pronta para o TCU.', desc: 'Gere relatórios auditáveis, exporte para Excel ou PDF e mantenha histórico completo de cada decisão. Cada proposta se transforma em inteligência estratégica para as próximas licitações.', tags: ['Auditoria', 'Exportação'], img: 'https://images.unsplash.com/photo-1578016981482-d4dd3db297b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpdCUyMHJlcG9ydCUyMGZpbmFuY2lhbCUyMGRvY3VtZW50JTIwZXhwb3J0fGVufDF8fHx8MTc3NTY4MTg2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                className="relative rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.28)' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              >
                <div className="absolute inset-x-0 top-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }} />
                <div className="flex flex-col lg:flex-row items-stretch">
                  <div className="flex-1 flex flex-col justify-between gap-7 px-[36px] py-[115px] mx-[1px] my-[-35px]">
                    <div>
                      <div className="flex items-center gap-1 mb-5">
                        <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>[ {step.num} ]</span>
                      </div>
                      <h3 className="lato-bold text-white mb-3" style={{ fontSize: 'clamp(1.45rem, 2.6vw, 2rem)', letterSpacing: '-0.3px', lineHeight: 1.18 }}>{step.title}</h3>
                      <p className="mb-4" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        <span style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '4px', padding: '2px 6px', border: '1px solid rgba(255,255,255,0.18)' }}>{step.headline}</span>
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.92rem', lineHeight: 1.75 }}>{step.desc}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {step.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full font-mono text-xs" style={{ color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-[45%] min-h-[220px] lg:min-h-[300px] relative overflow-hidden" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                    <motion.img
                      src={STEP_IMAGES[i]}
                      alt={step.title}
                      className="w-full h-full object-cover object-center rounded-[0px] mx-[-4px] my-[-3px]"
                      style={{ filter: 'brightness(0.75) saturate(0.9) contrast(1.05)' }}
                      initial={{ scale: 1.08, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={VP}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = 'none';
                        const parent = el.parentElement;
                        if (parent && !parent.querySelector('.img-fallback')) {
                          const fb = document.createElement('div');
                          fb.className = 'img-fallback';
                          fb.style.cssText = 'position:absolute;inset:0;background:linear-gradient(135deg,rgba(29,76,209,0.35),rgba(13,26,52,0.8));display:flex;align-items:center;justify-content:center;';
                          parent.appendChild(fb);
                        }
                      }}
                    />
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ORBIT ── */}
      <FeaturesOrbitSection />

      {/* ── SECTION 6 · COMPARISON ── */}
      <ComparisonSection />

      {/* ── SECTION 7 · PRICING ── */}
      <section id="preco" className="relative py-24 overflow-hidden pp-animated-bg">
        <div className="absolute pointer-events-none" style={{ top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse, rgba(29,76,209,0.28) 0%, transparent 70%)', filter: 'blur(90px)' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="flex justify-center mb-7" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.55, ease: 'easeOut' }}>
            <div style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(34px)', WebkitBackdropFilter: 'blur(34px)', borderRadius: '26px', padding: '7px 20px', border: '1px solid rgba(41,52,255,0.22)' }}>
              <span style={{ backgroundImage: 'linear-gradient(105deg, #8aa5ff 22%, #854dff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                Planos &amp; Preços
              </span>
            </div>
          </motion.div>

          <motion.h2 className="lato-bold text-white text-center mb-4" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', letterSpacing: '-0.5px', lineHeight: 1.12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}>
            Planos flexíveis para crescer
          </motion.h2>
          <motion.p className="text-center mx-auto mb-10" style={{ color: 'rgba(230,236,255,0.62)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '440px' }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            Invista menos do que custa um único erro fiscal — e escale conforme sua operação cresce.
          </motion.p>

          {/* Toggle */}
          <motion.div className="flex justify-center mb-14" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '34px', overflow: 'hidden' }}>
              <div style={{ padding: '10px 18px', color: 'white', fontSize: '0.95rem', letterSpacing: '-0.02em', position: 'relative' }}>
                Mensal
                <div style={{ position: 'absolute', bottom: 0, left: '18px', width: '50px', height: '2px', background: 'rgba(138,165,255,0.55)' }} />
              </div>
              <div style={{ width: '1px', height: '27px', background: 'rgba(138,165,255,0.25)' }} />
              <div style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'rgba(230,236,255,0.6)', fontSize: '0.95rem', letterSpacing: '-0.02em' }}>Anual</span>
                <div style={{ background: 'rgba(29,76,209,0.35)', border: '1px solid rgba(138,165,255,0.3)', borderRadius: '192px', padding: '3px 12px' }}>
                  <span style={{ color: 'rgba(138,165,255,0.9)', fontSize: '0.8rem' }}>20% off</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 items-stretch">
            {/* Starter */}
            <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }} style={{ background: 'linear-gradient(212deg, rgba(138,165,255,0.3) 0%, rgba(29,76,209,0.12) 55%, transparent 100%)', borderRadius: '18px', padding: '1px', boxShadow: '0 8px 32px rgba(0,0,0,0.28)' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: '17px', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="lato-bold" style={{ color: 'white', fontSize: '1rem', marginBottom: '18px' }}>Starter</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                  <span className="lato-bold" style={{ color: 'white', fontSize: '2.75rem', letterSpacing: '-0.04em', lineHeight: 1 }}>R$0</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>/mês</span>
                </div>
                <a href="#cta" style={{ display: 'block', background: 'rgba(29,76,209,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(138,165,255,0.35)', borderRadius: '10px', padding: '10px 18px', color: 'white', textAlign: 'center', fontSize: '0.95rem', textDecoration: 'none', marginBottom: '24px', cursor: 'pointer', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>Começar grátis</a>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', marginBottom: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Incluído:</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', flex: 1 }}>
                  {['Até 5 propostas/mês','Governança fiscal básica','1 usuário','Suporte por e-mail'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <Check style={{ width: '15px', height: '15px', color: '#6B9EFF', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Pro */}
            <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.65, ease: [0.22,1,0.36,1], delay: 0.1 }} className="relative md:-mt-3 md:-mb-3" style={{ background: 'linear-gradient(212deg, rgba(138,165,255,0.75) 0%, rgba(133,77,255,0.5) 40%, rgba(29,76,209,0.2) 100%)', borderRadius: '22px', padding: '1px', boxShadow: '0 0 60px rgba(133,77,255,0.2), 0 24px 48px rgba(0,0,0,0.3)', zIndex: 2 }}>
              <div style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', borderRadius: '21px', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #8aa5ff, #854dff, #8aa5ff)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                  <span className="lato-bold" style={{ color: 'white', fontSize: '1rem' }}>Pro</span>
                  <div style={{ background: 'rgba(133,77,255,0.55)', border: '1px solid rgba(167,139,250,0.4)', borderRadius: '99px', padding: '3px 12px' }}>
                    <span style={{ color: 'white', fontSize: '0.75rem', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>Popular</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                  <span className="lato-bold" style={{ color: 'white', fontSize: '2.75rem', letterSpacing: '-0.04em', lineHeight: 1 }}>R$497</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>/mês</span>
                </div>
                <a href="#cta" style={{ display: 'block', background: 'linear-gradient(135deg,rgba(29,76,209,0.8),rgba(133,77,255,0.8))', backdropFilter: 'blur(8px)', border: '1px solid rgba(138,165,255,0.35)', borderRadius: '10px', padding: '10px 18px', color: 'white', textAlign: 'center', fontSize: '0.95rem', textDecoration: 'none', marginBottom: '24px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(133,77,255,0.3)', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>Começar agora</a>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', marginBottom: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Incluído:</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', flex: 1 }}>
                  {['Propostas ilimitadas','Governança fiscal completa','Até 5 usuários','Simulação avançada de cenários','Auditoria e rastreabilidade','Suporte prioritário'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <Check style={{ width: '15px', height: '15px', color: '#6B9EFF', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Enterprise */}
            <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.65, ease: [0.22,1,0.36,1], delay: 0.2 }} style={{ background: 'linear-gradient(212deg, rgba(138,165,255,0.3) 0%, rgba(29,76,209,0.12) 55%, transparent 100%)', borderRadius: '18px', padding: '1px', boxShadow: '0 8px 32px rgba(0,0,0,0.28)' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: '17px', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="lato-bold" style={{ color: 'white', fontSize: '1rem', marginBottom: '18px' }}>Enterprise</div>
                <div style={{ marginBottom: '20px' }}>
                  <span className="lato-bold" style={{ color: 'white', fontSize: '2.75rem', letterSpacing: '-0.04em', lineHeight: 1 }}>Custom</span>
                </div>
                <a href="#cta" style={{ display: 'block', background: 'rgba(29,76,209,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(138,165,255,0.35)', borderRadius: '10px', padding: '10px 18px', color: 'white', textAlign: 'center', fontSize: '0.95rem', textDecoration: 'none', marginBottom: '24px', cursor: 'pointer', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>Falar com vendas</a>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', marginBottom: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Incluído:</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', flex: 1 }}>
                  {['Tudo do Professional','Usuários ilimitados','Integrações personalizadas','Onboarding dedicado','SLA garantido','Suporte 24/7'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <Check style={{ width: '15px', height: '15px', color: '#6B9EFF', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Value anchor */}
          <motion.div className="mt-12 p-6 rounded-xl text-center max-w-3xl mx-auto" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <p style={{ color: 'rgba(230,236,255,0.7)', fontSize: '0.95rem', lineHeight: 1.75 }}>
              <strong style={{ color: 'rgba(138,165,255,0.95)', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>Um único erro fiscal</strong> pode custar dezenas de milhares de reais e desqualificar sua empresa. O PricePilot custa menos que uma hora de consultoria tributária — e trabalha para você 24/7.
            </p>
          </motion.div>
        </div>


      </section>

      {/* ── SECTION 8 · FAQ ── */}
      <section id="faq" className="relative py-20 md:py-32 bg-gray-50 overflow-hidden">
        {/* Bridges */}
        <div className="pp-bridge-top" style={{ background: 'linear-gradient(to bottom, rgba(6,1,24,0.55) 0%, transparent 100%)' }} />
        <div className="pp-bridge-bottom" />

        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(29,76,209,0.04) 0%, transparent 55%), radial-gradient(circle at 80% 70%, rgba(29,76,209,0.03) 0%, transparent 50%)' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">

            {/* Left sticky */}
            <motion.div className="lg:sticky lg:top-24 self-start" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.65, ease: 'easeOut' }}>
              <div className="inline-block border px-4 py-1 rounded-lg text-sm text-[#1D4CD1] mb-4" style={{ borderColor: 'rgba(29,76,209,0.3)', background: 'rgba(29,76,209,0.06)', backdropFilter: 'blur(8px)' }}>
                FAQ
              </div>
              <h2 className="lato-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-[#0D1A34] mb-4 leading-tight">
                Perguntas<br />Frequentes
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Não encontrou o que precisava? Fale com nosso time de especialistas.
              </p>
              <a href="#cta" className="inline-flex items-center gap-2 text-[#1D4CD1] hover:gap-3 transition-all" style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>
                Falar com especialista <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Right accordion */}
            <motion.div className="space-y-3" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}>
              {[
                { q: 'O PricePilot substitui minhas planilhas de Excel?', a: 'Sim e não. O PricePilot centraliza toda a lógica de formação de preços, governança fiscal e simulação de cenários. Você pode continuar exportando para Excel quando precisar de um relatório final, mas a gestão estratégica acontece na plataforma.' },
                { q: 'Como funciona a governança fiscal automática?', a: 'Você configura a base fiscal da empresa uma vez (CNAE, regime tributário, alíquotas, CPRB). A partir daí, o sistema aplica automaticamente as regras corretas em cada proposta, calculando impostos, margens e preços finais com precisão.' },
                { q: 'Posso testar antes de assinar?', a: 'Sim! O plano Starter é gratuito e permite até 5 propostas por mês. Você pode testar toda a lógica fiscal, simulação básica e exportação sem compromisso.' },
                { q: 'O sistema atende a Lei de Licitações (14.133/2021)?', a: 'Sim. O PricePilot foi desenvolvido com base nas exigências da Nova Lei de Licitações e mantém auditoria completa de cada proposta, garantindo rastreabilidade e conformidade.' },
                { q: 'Minha equipe precisa de treinamento?', a: 'O PricePilot foi desenhado para ser intuitivo. A maioria dos usuários começa a operar em menos de 1 hora. No plano Enterprise, oferecemos onboarding dedicado para times maiores.' },
                { q: 'Posso importar minhas planilhas antigas?', a: 'No plano Professional e Enterprise, oferecemos importação assistida de bases de custos e histórico de propostas. Entre em contato com nosso time de onboarding.' },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: openFaq === i ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.72)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: openFaq === i ? '1px solid rgba(29,76,209,0.25)' : '1px solid rgba(29,76,209,0.1)',
                    borderLeft: openFaq === i ? '4px solid #1D4CD1' : '4px solid transparent',
                    boxShadow: openFaq === i ? '0 4px 24px rgba(29,76,209,0.1)' : '0 2px 12px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s ease',
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <button onClick={() => toggleFaq(i)} className="w-full p-5 text-left flex justify-between items-center gap-4 transition-colors" style={{ background: 'transparent' }}>
                    <span className="lato-bold text-base text-[#0D1A34]">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#1D4CD1] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9 · FINAL CTA ── */}
      <section id="cta" className="relative py-24 overflow-hidden pp-animated-bg">
        {/* Top bridge from FAQ white */}
        <div className="pp-bridge-top-md" style={{ background: 'linear-gradient(to bottom, #f9fafb 0%, transparent 100%)' }} />

        <div className="absolute pointer-events-none" style={{ top: '20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(29,76,209,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-8">
          <motion.h2
            className="lato-bold text-white mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.08, letterSpacing: '-0.8px' }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Pare de perder licitações<br />por erro de planilha
          </motion.h2>
          <motion.p
            className="text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            Você escolhe: continuar com planilhas e aceitar o risco — ou usar o PricePilot e operar com precisão estratégica.
          </motion.p>

          <motion.div className="mb-12" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VP} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}>
            <a
              href="#"
              className="inline-flex items-center gap-3 group"
              style={{
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: '14px',
                padding: '18px 40px',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                letterSpacing: '-0.2px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                transition: 'background 0.25s, box-shadow 0.25s, transform 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.16)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Começar gratuitamente agora
              <span style={{ fontSize: '1.1em' }}>→</span>
            </a>
          </motion.div>

          <div className="flex justify-center items-center gap-4 flex-wrap">
            {['✓ Sem cartão de crédito', '✓ Cancele quando quiser', '✓ Suporte em português'].map((badge, i) => (
              <motion.div key={badge} className="px-5 py-2.5 rounded-full text-white/85 text-sm" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.15)' }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}>
                {badge}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative text-white py-12 pp-animated-bg">
        {/* Glass overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(4,6,28,0.55)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }} />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoWhite} alt="PricePilot" className="w-auto h-[32px]" />
              </div>
              <p className="text-white/60 text-sm leading-relaxed">Seu copiloto de preços para licitações públicas.</p>
            </div>
            {[
              { title: 'Produto', links: [['Funcionalidades','#'],['Preços','#preco'],['Cases','#'],['Atualizações','#']] },
              { title: 'Recursos', links: [['Blog','#'],['Guias','#'],['FAQ','#faq'],['Suporte','#']] },
              { title: 'Empresa',  links: [['Sobre','#'],['Contato','#'],['Termos','#'],['Privacidade','#']] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="lato-bold mb-4 text-white text-sm">{col.title}</h4>
                <ul className="space-y-2 text-white/55 text-sm">
                  {col.links.map(([label, href]) => (
                    <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
            © 2026 PricePilot. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
