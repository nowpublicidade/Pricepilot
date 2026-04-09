import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Menu, X, Check, ChevronDown, ChevronRight,
  SearchCheck, Files, ShieldAlert, BarChart2, Users,
  TrendingUp, ShieldCheck, Zap, MoreHorizontal,
} from 'lucide-react';

/* ── Viewport config ── */
const VP = { once: false, margin: '-60px' } as const;

/* ── Global CSS ── */
const STYLES = `
  @keyframes pp-gradient-drift {
    0%   { background-position: 0% 0%; }
    33%  { background-position: 100% 50%; }
    66%  { background-position: 50% 100%; }
    100% { background-position: 0% 0%; }
  }
  .pp-animated-bg {
    background: linear-gradient(170deg, #060118 0%, #0d0870 30%, #160da8 62%, #1a10b5 80%, #0d0870 100%);
    background-size: 250% 250%;
    animation: pp-gradient-drift 14s ease infinite;
  }
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
  @keyframes pp-float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }
  @keyframes pp-icon-float {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-6px) scale(1.05); }
  }
  @keyframes pp-scroll-up-1 { from { transform: translateY(0); } to { transform: translateY(-50%); } }
  @keyframes pp-scroll-up-2 { from { transform: translateY(0); } to { transform: translateY(-50%); } }
  @keyframes pp-scroll-up-3 { from { transform: translateY(0); } to { transform: translateY(-50%); } }
  .pp-col-1 { animation: pp-scroll-up-1 36s linear infinite; }
  .pp-col-2 { animation: pp-scroll-up-2 44s linear infinite; }
  .pp-col-3 { animation: pp-scroll-up-3 32s linear infinite; }
`;

/* ── Nav link ── */
const flipFront = { initial: { rotateX: 0, opacity: 1 }, hover: { rotateX: -90, opacity: 0 } };
const flipBack  = { initial: { rotateX: 90, opacity: 0 }, hover: { rotateX: 0, opacity: 1 } };
const ft = { type: 'spring' as const, stiffness: 120, damping: 22 };

function GlowNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="block">
      <motion.div className="relative overflow-hidden rounded-lg px-3 py-1.5" style={{ perspective: 600 }} whileHover="hover" initial="initial">
        <motion.span className="absolute inset-0 rounded-lg pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)' }} variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.3 }} />
        <motion.span className="relative block text-white/75 z-10" variants={flipFront} transition={ft} style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}>{children}</motion.span>
        <motion.span className="absolute inset-0 flex items-center justify-center text-white z-10" variants={flipBack} transition={ft} style={{ transformStyle: 'preserve-3d', transformOrigin: 'center top', rotateX: 90 }}>{children}</motion.span>
      </motion.div>
    </a>
  );
}

/* ── Button ── */
function PilotButton({ href, children, size = 'md', variant = 'primary', fullWidth = false, className = '' }: {
  href?: string; children: React.ReactNode;
  size?: 'sm'|'md'|'lg'; variant?: 'primary'|'white'|'ghost';
  fullWidth?: boolean; className?: string;
}) {
  const pad   = { sm: 'px-4 py-2', md: 'px-6 py-[10px]', lg: 'px-8 py-[14px]' }[size];
  const tSize = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }[size];
  const fill  = variant === 'white' ? 'bg-white group-hover:bg-gray-100' : variant === 'ghost' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-[#1D4CD1] group-hover:bg-[#1535a0]';
  const textCol = variant === 'white' ? 'text-[#1D4CD1]' : 'text-white';
  const borderGrad = variant === 'ghost' ? 'linear-gradient(135deg,rgba(255,255,255,0.45),rgba(255,255,255,0.08))' : 'linear-gradient(135deg,rgba(107,158,255,0.6),rgba(29,76,209,0.18) 55%,transparent)';
  const outerBg = variant === 'ghost' ? 'rgba(255,255,255,0.06)' : variant === 'white' ? 'rgba(255,255,255,0.12)' : 'rgba(29,76,209,0.12)';
  const cls = `relative overflow-hidden rounded-[8px] group ${pad} ${fullWidth ? 'w-full' : ''} cursor-pointer ${className}`;
  const inner = (
    <>
      <span className="absolute inset-0 rounded-[8px] pointer-events-none" style={{ background: borderGrad, padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
      <span className={`absolute inset-[1px] rounded-[7px] transition-colors duration-200 ${fill}`} />
      <span className={`relative flex items-center justify-center gap-2 lato-bold tracking-[-0.3px] ${textCol} ${tSize}`}>{children}</span>
    </>
  );
  return href ? <a href={href} className={cls} style={{ background: outerBg }}>{inner}</a>
              : <button className={cls} style={{ background: outerBg }}>{inner}</button>;
}

/* ── Testimonials data ── */
const TESTIMONIALS = [
  { text: 'Eu montava proposta de facilities em planilha e sempre esquecia algum encargo. Perdi dinheiro em dois contratos. Com o PricePilot, cadastrei minha equipe com uniformes, VR e ferramentas. Agora sei que o preço cobre tudo.', name: 'Carlos Mendes', role: 'Sócio · CM Serviços Ltda', color: '#1D4CD1' },
  { text: 'Eu não entendia quais impostos incluir na proposta de manutenção de TI. O PricePilot calcula tudo automaticamente. Parei de ter medo de mandar preço errado.', name: 'Mariana Silva', role: 'Resp. Licitações · MS Tecnologia ME', color: '#2563eb' },
  { text: 'Participava de 3 pregões por mês porque não dava tempo de montar mais. Hoje participo de 12. Não contratei ninguém. Só parei de perder horas refazendo planilha.', name: 'Roberto Alves', role: 'Dono · RA Fornecimentos EPP', color: '#0891b2' },
  { text: 'O alerta de preço baixo demais me salvou. Ia ganhar uma licitação que daria prejuízo. O sistema mostrou na hora e ajustei antes de enviar.', name: 'Ana Paula Costa', role: 'Sócia · AP Suprimentos', color: '#059669' },
  { text: 'Comecei a usar no mesmo dia. Na primeira proposta já vi a diferença. O sistema é simples e o cálculo sai completo na hora.', name: 'João Ferreira', role: 'Diretor · JF Serviços Técnicos', color: '#7c3aed' },
  { text: 'Exportei a proposta em PDF organizado. O pregoeiro elogiou a clareza da planilha. Nunca mais precisei montar nada na mão.', name: 'Patrícia Souza', role: 'Diretora · PS Consultoria', color: '#d97706' },
  { text: 'Cadastrei a empresa uma vez. Cada proposta sai pronta com os dados certos. Economizo pelo menos 4 horas por pregão.', name: 'Fernando Lima', role: 'Sócio · FL Licitações', color: '#dc2626' },
  { text: 'Eu achava que não tinha como competir com empresa grande. Agora tenho a mesma tecnologia e ganho licitações que antes nem tentava.', name: 'Camila Rocha', role: 'MEI · CR Materiais', color: '#0891b2' },
  { text: 'Recuperei o investimento na segunda proposta. A análise de margem mostrou onde eu deixava dinheiro na mesa toda vez.', name: 'Marcos Oliveira', role: 'Sócio · MO Soluções', color: '#7c3aed' },
];

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name.split(' ').slice(0,2).map(n => n[0]).join('').toUpperCase();
  return (
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '0.85rem' }}>{initials}</div>
  );
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(29,76,209,0.12)', borderRadius: 16, padding: 20, boxShadow: '0 4px 24px rgba(29,76,209,0.07)', marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 2, marginBottom: 12, fontSize: '0.85rem', color: '#f59e0b' }}>★★★★★</div>
      <p style={{ fontSize: '0.83rem', color: '#374151', lineHeight: 1.6, marginBottom: 16 }}>{t.text}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name={t.name} color={t.color} />
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0D1A34' }}>{t.name}</div>
          <div style={{ fontSize: '0.72rem', color: '#888' }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCol({ testimonials, animClass }: { testimonials: typeof TESTIMONIALS; animClass: string }) {
  return (
    <div style={{ flex: 1, minWidth: 200 }}>
      <div className={animClass} style={{ display: 'flex', flexDirection: 'column' }}>
        {[...testimonials, ...testimonials].map((t, i) => <TestimonialCard key={i} t={t} />)}
      </div>
    </div>
  );
}

/* ── Comparison flip card (scroll-driven) ── */
function CompareCard({ type, items }: { type: 'sem'|'com'; items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 10%'] });
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const isSem = type === 'sem';
  const accent = isSem ? '#ff6b6b' : '#60b0ff';
  const badgeBg = isSem ? 'rgba(220,30,30,0.18)' : 'rgba(29,76,209,0.28)';
  const badgeBorder = isSem ? 'rgba(220,80,80,0.35)' : 'rgba(100,180,255,0.35)';
  const dividerCol = isSem ? 'rgba(220,80,80,0.2)' : 'rgba(100,160,255,0.2)';
  const glassStyle = {
    backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
    borderRadius: 20, position: 'absolute' as const, inset: 0,
    backfaceVisibility: 'hidden' as const, overflow: 'hidden' as const,
  };
  return (
    <div ref={ref} style={{ perspective: 1400, height: 400 }}>
      <motion.div style={{ rotateY, transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}>
        {/* Front */}
        <div style={{ ...glassStyle, background: isSem ? 'rgba(255,255,255,0.06)' : 'rgba(29,76,209,0.13)', border: `1px solid ${isSem ? 'rgba(255,255,255,0.13)' : 'rgba(100,160,255,0.22)'}`, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 32 }}>
          <div style={{ width: 68, height: 68, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, background: badgeBg, border: `1px solid ${badgeBorder}`, color: accent }}>{isSem ? '✕' : '✓'}</div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: accent, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.75, marginBottom: 10 }}>{isSem ? '[ sem o pricepilot ]' : '[ com o pricepilot ]'}</p>
            <h3 style={{ color: '#fff', fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', fontWeight: 300, letterSpacing: '-0.4px' }}>{isSem ? 'Incerteza e conta errada' : 'Preço certo. Contrato com lucro.'}</h3>
          </div>
          <motion.p animate={{ opacity: [0.3, 0.65, 0.3] }} transition={{ duration: 2.4, repeat: Infinity }} style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.73rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}>↓ role para revelar</motion.p>
        </div>
        {/* Back */}
        <div style={{ ...glassStyle, transform: 'rotateY(180deg)', background: isSem ? 'rgba(200,30,30,0.1)' : 'rgba(29,76,209,0.18)', border: `1px solid ${isSem ? 'rgba(220,80,80,0.28)' : 'rgba(100,160,255,0.28)'}`, padding: '28px 36px' }}>
          <div style={{ borderBottom: `1px solid ${dividerCol}`, paddingBottom: 14, marginBottom: 18 }}>
            <p style={{ color: accent, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.75, marginBottom: 6 }}>{isSem ? '[ sem o pricepilot ]' : '[ com o pricepilot ]'}</p>
            <h3 style={{ color: '#fff', fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontWeight: 300, letterSpacing: '-0.3px' }}>{isSem ? 'Incerteza e conta errada' : 'Preço certo. Contrato com lucro.'}</h3>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, background: badgeBg, border: `1px solid ${badgeBorder}`, color: accent, marginTop: 2 }}>{isSem ? '✕' : '✓'}</span>
                <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE COMPONENT
══════════════════════════════════════════════ */
export default function LandingPageV2() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-[8px] rounded-[10px] flex items-center gap-[30px] px-5 py-[13px]" style={{ background: 'rgba(13,26,52,0.75)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="lato-bold text-white" style={{ fontSize: '1.4rem', letterSpacing: '-0.5px' }}>Price<span style={{ color: '#4d8df7' }}>Pilot</span></span>
            </div>
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {[['#problemas','Problemas'],['#plataforma','Solução'],['#como-funciona','Como Funciona'],['#preco','Preços'],['#faq','FAQ']].map(([href, label]) => (
                <GlowNavLink key={href} href={href}>{label}</GlowNavLink>
              ))}
            </div>
            <div className="hidden md:flex items-center flex-shrink-0">
              <PilotButton href="#cta" size="md">Teste grátis agora</PilotButton>
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden ml-auto text-white">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden mt-2 max-w-7xl mx-auto rounded-[10px] overflow-hidden" style={{ background: 'rgba(13,26,52,0.96)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-4 space-y-2">
              {[['#problemas','Problemas'],['#plataforma','Solução'],['#como-funciona','Como Funciona'],['#preco','Preços'],['#faq','FAQ']].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMobileOpen(false)} className="block text-white/75 hover:text-white py-2 transition-colors">{label}</a>
              ))}
              <PilotButton href="#cta" size="md" fullWidth className="mt-2">Teste grátis agora</PilotButton>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pp-animated-bg">
        <div className="absolute pointer-events-none" style={{ top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 700, background: 'radial-gradient(ellipse 65% 55% at 50% 35%, rgba(100,60,255,0.45) 0%, rgba(40,20,200,0.2) 45%, transparent 75%)', filter: 'blur(24px)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center" style={{ paddingTop: 160, paddingBottom: 56 }}>
          {/* Badge */}
          <motion.div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm text-white/70" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4d8df7', flexShrink: 0 }}></span>
            🎯 PricePilot | seu co-piloto de preços
          </motion.div>

          <motion.h1
            className="lato-bold text-white mb-6"
            style={{ fontSize: 'clamp(1.9rem, 5vw, 3.8rem)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 22, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Pare de montar proposta de licitação no escuro. Calcule o preço certo e participe com segurança.
          </motion.h1>

          <motion.p
            className="text-white/75 max-w-[540px] mx-auto mb-10 leading-relaxed"
            style={{ fontSize: '1rem' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            O PricePilot faz o cálculo completo da sua proposta: impostos, encargos, uniformes, VR, VT, ferramentas de trabalho e margem de lucro. Tudo o que você precisa preencher em uma proposta de serviços já está no sistema. Sem planilhas soltas, sem erro, sem surpresa na hora de executar o contrato.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}>
            <PilotButton href="#cta" size="lg" variant="ghost">Teste grátis agora &nbsp;→</PilotButton>
          </motion.div>
        </div>

        {/* Hero mockup */}
        <motion.div className="relative z-10 max-w-3xl mx-auto px-4" style={{ marginBottom: -80 }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}>
          <motion.div
            className="pp-glass-card rounded-2xl p-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          >
            <div className="flex items-center justify-between mb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 16 }}>
              <div className="flex items-center gap-2">
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1D4CD1' }}></div>
                <span className="text-white/90 text-sm">Proposta de Serviços #0124 — CM Serviços Ltda</span>
              </div>
              <span className="text-white/30 text-xs font-mono">MARGEM: <span style={{ color: '#4d8df7' }}>+18,4%</span></span>
            </div>
            <div className="flex gap-8 items-end">
              <div style={{ flex: 1 }}>
                <div className="flex items-end gap-[4px] h-20">
                  {[40, 55, 48, 72, 62, 85, 68, 95, 75, 88, 58, 78, 65, 90, 70, 82].map((h, i) => (
                    <motion.div key={i} style={{ flex: 1, borderRadius: '3px 3px 0 0', background: 'linear-gradient(180deg, #3a72e8 0%, #1D4CD1 100%)', opacity: i % 3 === 0 ? 0.5 : 0.85, height: `${h}%` }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5, delay: 0.3 + i * 0.03 }} />
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                {[['IMPOSTOS','R$ 18.240','Automático'],['ENCARGOS','R$ 12.380','VR · VT · INSS'],['MARGEM','18,4%','Segura ✓']].map(([label, val, sub]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', marginBottom: 4 }}>{label}</div>
                    <div className="lato-bold text-white" style={{ fontSize: '1rem', color: label === 'MARGEM' ? '#4d8df7' : '#fff' }}>{val}</div>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(29,76,209,0.18)', border: '1px solid rgba(29,76,209,0.3)' }}>
              <span style={{ color: '#4d8df7' }}>✅</span>
              <p className="text-white/80 text-xs">Margem dentro da faixa segura. Todos os encargos incluídos. Proposta pronta para envio.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── PROBLEMS ── */}
      <section id="problemas" className="relative py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(29,76,209,0.05) 0%, transparent 55%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <motion.div className="mb-14" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.7 }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(29,76,209,0.5)' }}>[ Por que as empresas perdem dinheiro ]</p>
            <h2 className="lato-bold text-[#0D1A34]" style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', maxWidth: 620 }}>
              5 problemas que fazem sua empresa{' '}
              <span style={{ color: '#1D4CD1' }}>perder dinheiro em licitações</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: '📋', num: '01', title: 'Proposta montada no achismo', desc: 'Você abre a planilha, preenche os custos que lembra, torce pra não esquecer nenhum encargo. O erro só aparece depois que você ganha a licitação e precisa executar o contrato.' },
              { icon: '🧮', num: '02', title: 'Impostos e encargos calculados na mão', desc: 'CNAE, Simples, PIS/COFINS, INSS patronal, frete, encargos trabalhistas. Tudo feito na raça, debaixo de pressão. Um número errado e toda a proposta fica comprometida.' },
              { icon: '👷', num: '03', title: 'Custos do funcionário esquecidos', desc: 'Uniforme, EPI, ferramentas de trabalho, VR, VT, benefícios. Na hora de montar a proposta de serviços, é fácil esquecer um item. E esse item esquecido sai do seu lucro.' },
              { icon: '⚠️', num: '04', title: 'Risco de ganhar e sair no prejuízo', desc: 'Preço inexequível: você ganha a licitação, mas o valor não cobre os custos reais. Resultado: multa, suspensão por até 5 anos e prejuízo financeiro.' },
              { icon: '📈', num: '05', title: 'Não dá pra crescer participando de mais pregões', desc: 'Quanto mais licitações você tenta, mais erros acontecem. Cada proposta começa do zero. Sem tecnologia, escalar é impossível.' },
            ].map((p, i) => (
              <motion.div
                key={p.num}
                className="pp-glass-white flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <p className="mb-6 text-[11px] tracking-widest text-[#1D4CD1]/60 font-mono uppercase">[ PROBLEMA {p.num} ]</p>
                <div className="flex-1 flex items-center justify-center py-6">
                  <motion.div
                    style={{ width: 80, height: 80, borderRadius: 18, background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(29,76,209,0.08))', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 28px rgba(29,76,209,0.14), inset 0 1px 0 #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
                  >
                    {p.icon}
                  </motion.div>
                </div>
                <h3 className="lato-bold text-[#0D1A34] mb-2 leading-snug text-base">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM ── */}
      <section id="plataforma" className="relative py-24 overflow-hidden pp-animated-bg">
        <motion.div className="absolute rounded-full pointer-events-none" style={{ width: 750, height: 750, top: '-20%', left: '-15%', background: 'radial-gradient(circle, rgba(8,10,90,0.75) 0%, transparent 60%)', filter: 'blur(50px)' }} animate={{ x: [0,70,-35,0], y: [0,-45,35,0] }} transition={{ duration: 18, repeat: Infinity }} />
        <motion.div className="absolute rounded-full pointer-events-none" style={{ width: 600, height: 600, bottom: '-15%', right: '-10%', background: 'radial-gradient(circle, rgba(40,55,220,0.65) 0%, transparent 60%)', filter: 'blur(55px)' }} animate={{ x: [0,-55,45,0], y: [0,35,-55,0] }} transition={{ duration: 22, repeat: Infinity, delay: 3 }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Glass card */}
            <motion.div initial={{ opacity: 0, x: -48 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.8 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" style={{ color: '#1D4CD1' }} />
                    <span className="text-white/90 text-sm">Simulação de Proposta de Serviços</span>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-white/30" />
                </div>
                <div className="mx-5 mt-4">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(29,76,209,0.18)', border: '1px solid rgba(29,76,209,0.3)' }}>
                    <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: '#4d8df7' }} />
                    <p className="text-white/80 text-xs">Margem de <span className="text-[#4d8df7] font-semibold">18,4%</span> com todos os encargos incluídos.</p>
                  </div>
                </div>
                <div className="flex items-start justify-between px-5 mt-5 mb-1">
                  <div>
                    <p className="lato-bold text-white text-2xl" style={{ letterSpacing: '-0.5px' }}>R$ 148.290</p>
                    <p className="text-white/40 text-xs mt-0.5">Proposta completa calculada</p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs text-white/60" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    Este mês <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
                <div className="px-5 pt-2 pb-5">
                  <div className="flex items-end gap-[5px] h-28">
                    {[38,52,45,70,58,80,65,90,72,85,60,75,55,88,78,95].map((h, idx) => (
                      <motion.div key={idx} className="flex-1 rounded-sm" style={{ background: 'linear-gradient(180deg, #3a72e8 0%, #1D4CD1 100%)', opacity: idx % 3 === 0 ? 0.5 : 0.85, height: `${h}%` }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={VP} transition={{ duration: 0.5, delay: 0.3 + idx * 0.03 }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div initial={{ opacity: 0, x: 48 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.8, delay: 0.12 }}>
              <p className="font-mono text-xs tracking-[0.2em] uppercase mb-5" style={{ color: '#4d8df7' }}>[ Plataforma ]</p>
              <h2 className="lato-bold text-white mb-6" style={{ fontSize: 'clamp(1.7rem,3.5vw,2.5rem)', lineHeight: 1.15, letterSpacing: '-0.5px' }}>
                Tudo o que você precisa pra montar uma proposta de serviços está aqui dentro
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed text-sm">
                O PricePilot calcula o preço da sua proposta com todos os custos incluídos: impostos, encargos trabalhistas, benefícios, uniformes, ferramentas e margem de lucro. Você cadastra seus funcionários e os itens que cada um precisa. O sistema faz o resto. Sem planilha, sem conta errada.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  { icon: '🧮', text: 'Calcular impostos de forma automática: CNAE, regime tributário, INSS, PIS/COFINS, frete' },
                  { icon: '👷', text: 'Cadastrar cada funcionário com todos os custos: salário, VR, VT, uniforme, EPI, ferramentas' },
                  { icon: '📊', text: 'Simular diferentes preços antes de enviar a proposta' },
                  { icon: '✅', text: 'Saber na hora se o preço vai dar lucro ou prejuízo' },
                  { icon: '🔒', text: 'Guardar o histórico de cada proposta, pronto pra comprovar se precisar' },
                ].map(({ icon, text }, i) => (
                  <motion.li key={i} className="flex items-start gap-3" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}>
                    <span className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-sm mt-0.5" style={{ background: 'rgba(29,76,209,0.25)', border: '1px solid rgba(29,76,209,0.4)' }}>{icon}</span>
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

      {/* ── HOW IT WORKS ── */}
      <section id="como-funciona" className="relative overflow-hidden pp-animated-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.65 }}>
            <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>[ Como funciona ]</p>
            <h2 className="lato-bold text-white" style={{ fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', letterSpacing: '-0.5px', lineHeight: 1.12, maxWidth: 560 }}>
              3 passos para montar sua proposta sem erro e com lucro garantido
            </h2>
          </motion.div>

          <div className="space-y-5">
            {[
              { num: '01', title: 'Cadastre sua empresa e sua equipe', headline: 'Você faz isso uma vez. O sistema usa pra sempre.', desc: 'Informe o CNAE, regime tributário e alíquotas da sua empresa. Depois, cadastre seus funcionários com tudo que eles precisam: salário, uniforme, EPI, VR, VT, ferramentas de trabalho. O PricePilot salva tudo e aplica automaticamente em cada nova proposta.', tags: ['Cadastro','Equipe','Configuração'], visual: '🏢' },
              { num: '02', title: 'Monte a proposta e veja o preço completo na hora', headline: 'Sem achismo. O preço certo aparece na tela.', desc: 'Adicione os itens do edital, selecione os funcionários que vão atender o contrato e defina a margem que você quer. O PricePilot calcula impostos, encargos e preço final de forma automática. Você ainda pode testar diferentes cenários antes de decidir.', tags: ['Proposta','Precificação','Simulação'], visual: '📊' },
              { num: '03', title: 'Exporte e participe com segurança', headline: 'Proposta pronta. Sem erro. Sem surpresa.', desc: 'Gere sua proposta em Excel ou PDF com todos os cálculos organizados. Você sabe exatamente quanto vai custar executar aquele contrato. E se precisar comprovar como chegou no preço, está tudo registrado.', tags: ['Exportação','Histórico','Comprovação'], visual: '📤' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                className="relative rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.28)' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <div className="flex flex-col lg:flex-row items-stretch">
                  <div className="flex-1 flex flex-col justify-between gap-6 px-9 py-10">
                    <div>
                      <span className="font-mono text-xs mb-4 block" style={{ color: 'rgba(255,255,255,0.35)' }}>[ {step.num} ]</span>
                      <h3 className="lato-bold text-white mb-3" style={{ fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', letterSpacing: '-0.3px', lineHeight: 1.2 }}>{step.title}</h3>
                      <p className="mb-4">
                        <span style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 4, padding: '2px 8px', border: '1px solid rgba(255,255,255,0.18)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>{step.headline}</span>
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.875rem', lineHeight: 1.8 }}>{step.desc}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {step.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full font-mono text-xs" style={{ color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-[40%] min-h-[200px] flex items-center justify-center" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(135deg, rgba(29,76,209,0.2), rgba(13,26,52,0.6))' }}>
                    <motion.div style={{ fontSize: '4rem', textAlign: 'center' }} animate={{ y: [0,-8,0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}>{step.visual}</motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#1D4CD1] opacity-5 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-8 mb-20">
            {[['4x','Mais licitações com a mesma equipe'],['0','Erros de cálculo nas propostas'],['250+','Propostas montadas todo mês']].map(([val, label]) => (
              <motion.div key={val} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6 }}>
                <div className="lato-bold text-5xl sm:text-6xl text-[#1D4CD1] mb-2">{val}</div>
                <p className="text-gray-600 text-base">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.7 }} className="text-center mb-12">
            <div className="inline-block border px-4 py-1 rounded-lg text-sm text-[#1D4CD1] mb-4" style={{ borderColor: 'rgba(29,76,209,0.3)', background: 'rgba(29,76,209,0.05)' }}>Depoimentos</div>
            <h2 className="lato-bold text-3xl sm:text-4xl lg:text-5xl text-[#0D1A34] mb-4">Empresas que pararam de errar o preço e começaram a lucrar de verdade</h2>
            <p className="text-gray-500 text-base max-w-2xl mx-auto">MEIs, MEs e EPPs de facilities, manutenção e serviços que usam o PricePilot no dia a dia</p>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 border-t" style={{ borderColor: 'rgba(29,76,209,0.12)' }} />
            <span className="text-sm text-gray-400 whitespace-nowrap">O que dizem nossos clientes</span>
            <div className="flex-1 border-t" style={{ borderColor: 'rgba(29,76,209,0.12)' }} />
          </div>

          {/* Scrolling columns */}
          <div className="flex gap-4 max-h-[520px] overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
            <TestimonialCol testimonials={TESTIMONIALS.slice(0,3)} animClass="pp-col-1" />
            <TestimonialCol testimonials={TESTIMONIALS.slice(3,6)} animClass="pp-col-2" />
            <div style={{ flex: 1, minWidth: 200 }} className="hidden lg:block">
              <div className="pp-col-3" style={{ display: 'flex', flexDirection: 'column' }}>
                {[...TESTIMONIALS.slice(6,9), ...TESTIMONIALS.slice(6,9)].map((t, i) => <TestimonialCard key={i} t={t} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="relative py-20 overflow-hidden pp-animated-bg">
        <div className="absolute pointer-events-none" style={{ top: -80, left: '10%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(220,30,30,0.18), transparent 70%)', filter: 'blur(65px)' }} />
        <div className="absolute pointer-events-none" style={{ bottom: 40, right: '8%', width: 440, height: 440, background: 'radial-gradient(circle, rgba(29,76,209,0.28), transparent 70%)', filter: 'blur(65px)' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.65 }}>
            <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>[ A diferença na prática ]</p>
            <h2 className="lato-bold text-white" style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', letterSpacing: '-0.5px', lineHeight: 1.15 }}>
              Planilha vs. PricePilot: veja a{' '}
              <span style={{ color: '#60a5fa', fontStyle: 'italic' }}>diferença na prática</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.7 }}>
              De um lado, incerteza e conta errada. Do outro, você sabe que o preço está certo e que o contrato vai dar lucro.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CompareCard type="sem" items={['Planilha com risco de erro em cada linha','Impostos, BDI e encargos calculados na mão','Cada proposta começa do zero','Esqueceu uniforme, VT ou VR? Só descobre depois','Não tem como comprovar como chegou no preço','Risco real de ganhar e não conseguir entregar']} />
            <CompareCard type="com" items={['Proposta montada com todos os cálculos corretos','Impostos, BDI e encargos calculados de forma automática','Dados dos funcionários já cadastrados, é só reutilizar','Todos os custos do funcionário preenchidos no sistema','Histórico completo de cada proposta salvo na plataforma','Você sabe antes de enviar se o contrato vai dar lucro']} />
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="preco" className="relative py-24 overflow-hidden pp-animated-bg">
        <div className="absolute pointer-events-none" style={{ top: -60, left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(29,76,209,0.28), transparent 70%)', filter: 'blur(90px)' }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="flex justify-center mb-7" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}>
            <div style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(34px)', borderRadius: 26, padding: '7px 20px', border: '1px solid rgba(41,52,255,0.22)' }}>
              <span style={{ backgroundImage: 'linear-gradient(105deg, #8aa5ff 22%, #854dff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Planos &amp; Preços</span>
            </div>
          </motion.div>
          <motion.h2 className="lato-bold text-white text-center mb-4" style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', letterSpacing: '-0.5px' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ delay: 0.05 }}>
            Escolha o plano que cabe no ritmo da sua empresa
          </motion.h2>
          <motion.p className="text-center mx-auto mb-14" style={{ color: 'rgba(230,236,255,0.62)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 420 }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ delay: 0.1 }}>
            Comece grátis. Cresça conforme participar de mais licitações.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-4 items-stretch">
            {/* Starter */}
            <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} style={{ background: 'linear-gradient(212deg, rgba(138,165,255,0.3) 0%, rgba(29,76,209,0.12) 55%, transparent 100%)', borderRadius: 18, padding: 1, boxShadow: '0 8px 32px rgba(0,0,0,0.28)' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', borderRadius: 17, padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="lato-bold text-white text-base mb-4">Starter</div>
                <div className="flex items-baseline gap-2 mb-5"><span className="lato-bold text-white" style={{ fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>R$0</span><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>/mês</span></div>
                <a href="#cta" style={{ display: 'block', background: 'rgba(29,76,209,0.55)', border: '1px solid rgba(138,165,255,0.35)', borderRadius: 10, padding: '10px 18px', color: '#fff', textAlign: 'center', fontSize: '0.9rem', marginBottom: 20, fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>Começar grátis</a>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12 }}>Incluído:</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {['Até 5 propostas por mês','Cálculo básico de impostos','1 usuário','Suporte por e-mail'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check style={{ width: 14, height: 14, color: '#6B9EFF', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Pro */}
            <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ delay: 0.1 }} className="relative md:-mt-3 md:-mb-3" style={{ background: 'linear-gradient(212deg, rgba(138,165,255,0.75) 0%, rgba(133,77,255,0.5) 40%, rgba(29,76,209,0.2) 100%)', borderRadius: 22, padding: 1, boxShadow: '0 0 60px rgba(133,77,255,0.2), 0 24px 48px rgba(0,0,0,0.3)', zIndex: 2 }}>
              <div style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(28px)', borderRadius: 21, padding: 24, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #8aa5ff, #854dff, #8aa5ff)' }} />
                <div className="flex items-center gap-2 mb-4">
                  <span className="lato-bold text-white text-base">Pro</span>
                  <div style={{ background: 'rgba(133,77,255,0.55)', border: '1px solid rgba(167,139,250,0.4)', borderRadius: 99, padding: '2px 10px' }}>
                    <span style={{ color: '#fff', fontSize: '0.72rem', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>Mais popular</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-5"><span className="lato-bold text-white" style={{ fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>R$497</span><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>/mês</span></div>
                <a href="#cta" style={{ display: 'block', background: 'linear-gradient(135deg, rgba(29,76,209,0.8), rgba(133,77,255,0.8))', border: '1px solid rgba(138,165,255,0.35)', borderRadius: 10, padding: '10px 18px', color: '#fff', textAlign: 'center', fontSize: '0.9rem', marginBottom: 20, boxShadow: '0 4px 14px rgba(133,77,255,0.3)', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>Começar agora</a>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12 }}>Incluído:</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {['Propostas ilimitadas','Cálculo completo de impostos e encargos','Cadastro de funcionários (uniformes, VR, VT, ferramentas)','Até 5 usuários','Simulação de preços antes de enviar','Histórico completo de propostas','Suporte prioritário'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check style={{ width: 14, height: 14, color: '#6B9EFF', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Enterprise */}
            <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ delay: 0.2 }} style={{ background: 'linear-gradient(212deg, rgba(138,165,255,0.3) 0%, rgba(29,76,209,0.12) 55%, transparent 100%)', borderRadius: 18, padding: 1, boxShadow: '0 8px 32px rgba(0,0,0,0.28)' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', borderRadius: 17, padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="lato-bold text-white text-base mb-4">Enterprise</div>
                <div className="mb-5"><span className="lato-bold text-white" style={{ fontSize: '1.8rem', letterSpacing: '-0.04em' }}>Sob consulta</span></div>
                <a href="#cta" style={{ display: 'block', background: 'rgba(29,76,209,0.55)', border: '1px solid rgba(138,165,255,0.35)', borderRadius: 10, padding: '10px 18px', color: '#fff', textAlign: 'center', fontSize: '0.9rem', marginBottom: 20, fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>Falar com vendas</a>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12 }}>Incluído:</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {['Tudo do plano Pro','Usuários ilimitados','Integrações personalizadas','Ajuda na configuração inicial','Atendimento dedicado','Suporte 24/7'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check style={{ width: 14, height: 14, color: '#6B9EFF', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Value anchor */}
          <motion.div className="mt-12 p-6 rounded-xl text-center max-w-3xl mx-auto" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}>
            <p style={{ color: 'rgba(230,236,255,0.7)', fontSize: '0.95rem', lineHeight: 1.75 }}>
              <strong style={{ color: 'rgba(138,165,255,0.95)', fontFamily: 'Lato, sans-serif' }}>Um único erro de preço</strong> pode tirar sua empresa do mercado por até 5 anos. O PricePilot custa menos que uma hora de assessoria contábil e trabalha por você em cada proposta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="relative py-20 md:py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <motion.div className="lg:sticky lg:top-24 self-start" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP}>
              <div className="inline-block border px-4 py-1 rounded-lg text-sm text-[#1D4CD1] mb-4" style={{ borderColor: 'rgba(29,76,209,0.3)', background: 'rgba(29,76,209,0.06)' }}>FAQ</div>
              <h2 className="lato-bold text-[clamp(1.8rem,3.5vw,2.4rem)] text-[#0D1A34] mb-4 leading-tight">Perguntas<br />Frequentes</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">Não encontrou o que precisava? Fale com nosso time de especialistas.</p>
              <a href="#cta" className="inline-flex items-center gap-2 text-[#1D4CD1] transition-all hover:gap-3" style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>
                Falar com especialista <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div className="space-y-3" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ delay: 0.1 }}>
              {[
                { q: 'O PricePilot substitui minha planilha?', a: 'Sim. Você não precisa mais montar proposta na planilha. O PricePilot faz todos os cálculos dentro da plataforma: impostos, encargos trabalhistas, custos de funcionários, margem e preço final. Se quiser exportar para Excel no fim, pode. Mas a dor de cabeça de montar tudo na mão acaba.' },
                { q: 'Como funciona o cálculo de impostos?', a: 'Você informa seu CNAE e regime tributário uma única vez. A partir daí, o PricePilot aplica os impostos corretos em cada proposta de forma automática. Não precisa consultar a tabela nem lembrar da alíquota.' },
                { q: 'Eu consigo cadastrar meus funcionários?', a: 'Sim. No PricePilot, você cadastra cada funcionário com tudo que ele precisa para atender o contrato: salário, uniforme, EPI, ferramentas de trabalho, VR, VT, encargos. Quando for montar uma proposta, é só selecionar a equipe. O cálculo sai completo na hora.' },
                { q: 'Posso testar antes de pagar?', a: 'Sim. O plano gratuito permite montar até 5 propostas por mês. Você já consegue ver como o sistema funciona na prática, sem precisar colocar cartão.' },
                { q: 'É para quem já participa ou para quem está começando?', a: 'Para os dois. Se você já participa, vai economizar horas e parar de errar o preço. Se está começando, o PricePilot te guia no processo de montar uma proposta correta, sem precisar entender de tudo antes.' },
                { q: 'Minha equipe precisa de treinamento?', a: 'Não. O sistema foi feito pra ser simples. A maioria das pessoas começa a usar no mesmo dia. Se precisar de ajuda, temos suporte em português.' },
                { q: 'E se eu já tive propostas antigas em planilha?', a: 'No plano Pro e Enterprise, ajudamos você a trazer o histórico de custos e propostas anteriores para dentro do PricePilot. Entre em contato que resolvemos juntos.' },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: openFaq === i ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.72)',
                    border: openFaq === i ? '1px solid rgba(29,76,209,0.25)' : '1px solid rgba(29,76,209,0.1)',
                    borderLeft: openFaq === i ? '4px solid #1D4CD1' : '4px solid transparent',
                    boxShadow: openFaq === i ? '0 4px 24px rgba(29,76,209,0.1)' : '0 2px 12px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-5 text-left flex justify-between items-center gap-4" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <span className="lato-bold text-base text-[#0D1A34]">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#1D4CD1] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</div>}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="cta" className="relative py-24 overflow-hidden pp-animated-bg">
        <div className="absolute pointer-events-none" style={{ top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(29,76,209,0.3), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 className="lato-bold text-white mb-6" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.1, letterSpacing: '-0.8px' }} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}>
            Chega de perder dinheiro por causa de proposta mal calculada
          </motion.h2>
          <motion.p className="text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto" style={{ fontSize: 'clamp(1rem,2vw,1.15rem)' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ delay: 0.1 }}>
            Você escolhe: continuar na planilha, torcendo pra não esquecer nenhum custo. Ou usar o PricePilot e saber que o preço está certo, que os encargos estão inclusos e que o contrato vai dar lucro.
          </motion.p>
          <motion.div className="mb-12" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VP} transition={{ delay: 0.2 }}>
            <a
              href="#"
              className="inline-flex items-center gap-3"
              style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 14, padding: '18px 40px', color: '#fff', fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 'clamp(1rem,2vw,1.15rem)', letterSpacing: '-0.2px', boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)', transition: 'background 0.25s, transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.16)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Começar grátis agora <span style={{ fontSize: '1.1em' }}>→</span>
            </a>
          </motion.div>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {['✓ Sem cartão de crédito','✓ Cancele quando quiser','✓ Suporte em português'].map((badge, i) => (
              <motion.div key={badge} className="px-5 py-2.5 rounded-full text-white/85 text-sm" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)' }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ delay: 0.3 + i * 0.08 }}>
                {badge}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative text-white py-12 pp-animated-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(4,6,28,0.55)', backdropFilter: 'blur(24px)' }} />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="lato-bold text-white mb-3 block" style={{ fontSize: '1.25rem' }}>Price<span style={{ color: '#4d8df7' }}>Pilot</span></span>
              <p className="text-white/60 text-sm leading-relaxed">Seu copiloto de preços para licitações públicas. Feito por quem viveu o problema.</p>
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