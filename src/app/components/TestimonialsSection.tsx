import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* Initials avatar — no external fetch needed */
const AVATAR_COLORS = ['#1D4CD1','#2563eb','#7c3aed','#0891b2','#059669','#d97706','#dc2626'];
function InitialsAvatar({ name, size = 36, className = '' }: { name: string; size?: number; className?: string }) {
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  return (
    <div
      className={className}
      style={{
        width: size, height: size, borderRadius: '50%',
        background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, color: 'white',
        fontFamily: 'Lato, sans-serif', fontWeight: 700,
        fontSize: size * 0.38,
        letterSpacing: '0.02em',
      }}
    >
      {initials}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const featured = [
  {
    name: 'Carlos Mendes',
    role: 'Diretor Comercial',
    company: 'Construtora Horizonte S/A',
    quote:
      'Antes do PricePilot, cada proposta era uma luta de 3 dias. Hoje fechamos em 6 horas, com muito mais confiança nos números fiscais. A governança automática foi um divisor de águas.',
    result: '65% de redução no tempo de preparação',
  },
  {
    name: 'Mariana Silva',
    role: 'CFO',
    company: 'Infratech Serviços Ltda',
    quote:
      'Eliminamos os erros de cálculo de CPRB e PIS/COFINS de uma vez. Nosso time parou de retrabalhar planilhas e passou a focar em estratégia comercial de verdade.',
    result: '100% de conformidade fiscal garantida',
  },
  {
    name: 'Roberto Alves',
    role: 'Sócio-fundador',
    company: 'GovServ Consultoria',
    quote:
      'Simular cenários de margem e BDI virou rotina. Agora a gente consegue otimizar cada proposta e aumentar nossa competitividade sem precisar abrir uma planilha sequer.',
    result: '40% mais propostas vencedoras',
  },
];

const allTestimonials = [
  {
    text: 'Antes do PricePilot, cada proposta era uma batalha. Hoje fechamos em horas com muito mais confiança nos números.',
    name: 'Carlos Mendes',
    role: 'Diretor Comercial · Construtora Horizonte',
  },
  {
    text: 'A governança fiscal automática foi um divisor de águas. Eliminamos erros e ganhamos agilidade estratégica.',
    name: 'Mariana Silva',
    role: 'CFO · Infratech Serviços',
  },
  {
    text: 'Simular cenários virou rotina. Aumentamos nossas propostas vencedoras em mais de 40% no primeiro trimestre.',
    name: 'Roberto Alves',
    role: 'Sócio · GovServ Consultoria',
  },
  {
    text: 'Compliance com a Lei 14.133 finalmente resolvido. Toda a rastreabilidade que o TCU exige está ali, automática.',
    name: 'Ana Paula Costa',
    role: 'Gerente de Contratos · Infraobras S/A',
  },
  {
    text: 'Nossa equipe dobrou de produtividade. O tempo que perdíamos com planilhas agora vai direto para análise estratégica.',
    name: 'João Ferreira',
    role: 'CEO · TecGov Soluções',
  },
  {
    text: 'Exportar para Excel com toda a memória de cálculo pronta é incrível. Os auditores adoraram.',
    name: 'Patrícia Souza',
    role: 'Diretora Financeira · Logi-Tech',
  },
  {
    text: 'Subir a base fiscal uma vez e nunca mais precisar reconfigurar. Esse detalhe sozinho já pagou o plano.',
    name: 'Fernando Lima',
    role: 'Analista de Licitações · DataConstr',
  },
  {
    text: 'O PricePilot transformou nosso setor comercial. Agora competimos de igual para igual com empresas muito maiores.',
    name: 'Camila Rocha',
    role: 'Controller · ViaObras',
  },
  {
    text: 'Implantamos em um dia. Na segunda proposta já recuperamos o investimento do mês. Produto simplesmente excelente.',
    name: 'Marcos Oliveira',
    role: 'Diretor Comercial · SysGov',
  },
];

const col1 = allTestimonials.slice(0, 3);
const col2 = allTestimonials.slice(3, 6);
const col3 = allTestimonials.slice(6, 9);

/* ─────────────────────────────────────────────
   SCROLLING COLUMN
───────────────────────────────────────────── */
function TestimonialsColumn({
  testimonials,
  duration = 15,
  className = '',
}: {
  testimonials: typeof allTestimonials;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`flex-1 min-w-[220px] max-w-xs ${className}`}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-4 pb-4"
      >
        {[...new Array(2)].map((_, outerIdx) => (
          <React.Fragment key={outerIdx}>
            {testimonials.map(({ text, name, role }, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(29,76,209,0.12)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 24px rgba(29,76,209,0.07)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...new Array(5)].map((_, s) => (
                    <span key={s} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{text}</p>
                <div className="flex items-center gap-3">
                  <InitialsAvatar name={name} size={36} />
                  <div>
                    <p className="font-semibold text-[#0D1A34] text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROFILE CAROUSEL
───────────────────────────────────────────── */
function ProfileCarousel() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % featured.length);
  const prev = () => setCurrent((c) => (c - 1 + featured.length) % featured.length);
  const t = featured[current];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Desktop */}
      

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4 }}
            >
              <InitialsAvatar name={t.name} size={96} />
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={t.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center px-4"
          >
            <div className="text-4xl text-[#1D4CD1] opacity-30 mb-2">"</div>
            <p className="text-gray-800 leading-relaxed mb-4">{t.quote}</p>
            <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-[#1D4CD1] mb-4" style={{ background: 'rgba(29,76,209,0.08)' }}>
              ✓ {t.result}
            </div>
            <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700 }} className="text-[#0D1A34]">{t.name}</p>
            <p className="text-sm text-gray-500">{t.role} · {t.company}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export function TestimonialsSection() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">


      <div className="absolute top-20 left-0 w-96 h-96 bg-[#1D4CD1] opacity-5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#1D4CD1] opacity-5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-8 mb-20">
          {[
            { value: '70%', label: 'Redução no tempo de preparação' },
            { value: '100%', label: 'Conformidade fiscal garantida' },
            { value: '250+', label: 'Propostas processadas mensalmente' },
          ].map(({ value, label }) => (
            <motion.div key={value} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-60px' }} transition={{ duration: 0.6 }}>
              <div className="lato-bold text-5xl sm:text-6xl text-[#1D4CD1] mb-2">{value}</div>
              <p className="text-gray-600 text-base">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-12">
          <div className="inline-block border px-4 py-1 rounded-lg text-sm text-[#1D4CD1] mb-4" style={{ borderColor: 'rgba(29,76,209,0.3)', background: 'rgba(29,76,209,0.05)', backdropFilter: 'blur(8px)' }}>
            Depoimentos
          </div>
          <h2 className="lato-bold text-3xl sm:text-4xl lg:text-5xl text-[#0D1A34] mb-4">O que dizem nossos clientes</h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
            Empresas que transformaram a operação de licitações com o PricePilot
          </p>
        </motion.div>

        {/* Profile carousel */}
        <div className="mb-20">
          <ProfileCarousel />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 border-t" style={{ borderColor: 'rgba(29,76,209,0.12)' }} />
          <span className="text-sm text-gray-400 whitespace-nowrap">O que dizem nossos clientes</span>
          <div className="flex-1 border-t" style={{ borderColor: 'rgba(29,76,209,0.12)' }} />
        </div>

        {/* Scrolling columns */}
        <div className="flex gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[520px] overflow-hidden">
          <TestimonialsColumn testimonials={col1} duration={18} />
          <TestimonialsColumn testimonials={col2} duration={22} className="hidden md:block" />
          <TestimonialsColumn testimonials={col3} duration={16} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}