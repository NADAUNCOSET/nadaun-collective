import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';

type LinkChip = { label: string; url?: string; overlay?: string };

type HubRow = {
  id: string;
  num: string;
  title: string;
  kr: string;
  desc: string;
  color: string;
  links: LinkChip[];
};

const ROWS: HubRow[] = [
  {
    id: 'space',
    num: '01',
    title: 'NADAUN SPACE',
    kr: '스튜디오 · 장비 구매 · 렌탈',
    desc: '스튜디오 장비 구매 및 렌탈 — 모든 창작의 시작이 되는 공간 인프라',
    color: '#00C2FF',
    links: [
      { label: '자사몰', url: 'https://www.rainbowbene.com/' },
      { label: '스토어', url: 'https://smartstore.naver.com/rainbowbene' },
      { label: '블로그', url: 'https://blog.naver.com/nadaunstudio' },
      { label: '블로그스팟', url: 'https://nadaunspace.blogspot.com/' },
    ],
  },
  {
    id: 'moment',
    num: '02',
    title: 'NADAUN MOMENT',
    kr: '사진 · 영상 기획 · 제작',
    desc: '사진 · 영상 콘텐츠 기획 및 제작 — 기업의 순간을 정제된 감각으로 기록',
    color: '#FF8C00',
    links: [
      { label: 'PHOTO', url: 'https://photo.nadaun.co' },
      { label: 'VIDEO', url: 'https://video.nadaun.co' },
    ],
  },
  {
    id: 'starlogin',
    num: '03',
    title: 'STARLOGIN',
    kr: '국내 · 글로벌 에이전시',
    desc: '국내 · 글로벌 에이전시, IP 컨설팅, 글로벌 유통 · 제작 — 브랜드를 세계와 연결',
    color: '#FF6B35',
    links: [{ label: 'GLOBAL AGENCY', url: 'https://starlogin.com' }],
  },
  {
    id: 'marketing',
    num: '04',
    title: 'MARKETING',
    kr: '종합 마케팅',
    desc: '온라인 · 오프라인, 국내 · 국외 풀퍼널 캠페인 설계와 집행',
    color: '#FFB800',
    links: [
      { label: '통합 솔루션', overlay: 'integrated-solution' },
      { label: '미디어 · 매체', overlay: 'global-network' },
    ],
  },
  {
    id: 'ailab',
    num: '05',
    title: 'AI INNOVATION LAB',
    kr: 'AI 이노베이션 랩',
    desc: '사이니지 제작 · 유통, 글로벌 사이트 제작 등 — 데이터로 예측하는 마케팅의 새로운 차원',
    color: '#00FF94',
    links: [{ label: 'AI LAB', overlay: 'ai-lab' }],
  },
];

// 나다운 미감 공통 스프링/이징 (CLAUDE.md 모션 퍼스트 룰)
const NADAUN_SPRING = { stiffness: 90, damping: 26, restDelta: 0.0005 };
const NADAUN_EASE = [0.16, 1, 0.3, 1] as const;

interface ServiceHubProps {
  onOverlay: (id: string) => void;
}

/** 글자들이 자연스러운 디졸브(블러)로 날아들어오는 헤드라인 */
const BlurWords: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => (
  <span className="inline-flex flex-wrap">
    {text.split(' ').map((w, i) => (
      <motion.span
        key={i}
        className="inline-block will-change-[filter,opacity,transform]"
        initial={{ opacity: 0, y: 26, scale: 1.08, filter: 'blur(14px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: delay + i * 0.11, ease: NADAUN_EASE as any }}
      >
        {w}&nbsp;
      </motion.span>
    ))}
  </span>
);

/** 펼쳐질 때 디졸브로 날아들어오는 링크 단어 */
const LinkWord: React.FC<{ link: LinkChip; index: number; onOverlay: (id: string) => void }> = ({ link, index, onOverlay }) => {
  const inner = (
    <motion.span
      initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.08, ease: NADAUN_EASE as any }}
      className="inline-flex items-center gap-1.5 text-white/65 hover:text-[color:var(--ac)] transition-colors duration-300 font-semibold tracking-tight"
      style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.25rem, 2vw, 1.7rem)' }}
    >
      {link.label}
      <ArrowUpRight className="w-[0.9em] h-[0.9em] opacity-50" />
    </motion.span>
  );
  return link.url ? (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer select-none">
      {inner}
    </a>
  ) : (
    <button onClick={() => link.overlay && onOverlay(link.overlay)} className="cursor-pointer select-none">
      {inner}
    </button>
  );
};

const HubRowItem: React.FC<{
  row: HubRow;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onOverlay: (id: string) => void;
}> = ({ row, index, isOpen, onToggle, onOverlay }) => {
  // 스크롤할 때마다 행이 좌우로 미세하게 흐르는 패럴랙스 (행마다 방향·세기 다름)
  const { scrollY } = useScroll();
  const sy = useSpring(scrollY, NADAUN_SPRING);
  const dir = index % 2 === 0 ? -1 : 1;
  const x = useTransform(sy, [0, 900], [0, dir * (26 + index * 9)]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.965, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: NADAUN_EASE as any }}
      style={{ ['--ac' as any]: row.color }}
      className="group relative border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.025]"
    >
      {/* accent bar */}
      <span
        className={`absolute left-0 top-0 bottom-0 w-[3px] origin-top transition-transform duration-500 bg-[color:var(--ac)] ${
          isOpen ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
        }`}
      />

      <motion.div style={{ x }} className="lg:pl-6">
        {/* 큰 글씨 = 토글 버튼 (누르면 사이트 단어들이 디졸브로 등장) */}
        <button onClick={onToggle} className="w-full text-left py-3.5 md:py-3 cursor-pointer select-none">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8">
            {/* num + kr + pulse dot */}
            <div className="flex items-baseline gap-4 lg:w-[195px] shrink-0">
              <motion.span
                animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.35, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
                className="w-2 h-2 rounded-full self-center shrink-0"
                style={{ background: row.color }}
              />
              <span
                className={`text-[14px] font-semibold tracking-[0.2em] transition-colors duration-300 ${
                  isOpen ? 'text-[color:var(--ac)]' : 'text-white/30 group-hover:text-[color:var(--ac)]'
                }`}
              >
                {row.num}
              </span>
              <span className="text-[15px] font-semibold text-white/60 tracking-wide whitespace-nowrap">{row.kr}</span>
            </div>

            {/* kinetic title */}
            <div className="flex-1 min-w-0">
              <motion.span
                className={`inline-flex items-center gap-3 leading-none transition-colors duration-300 ${
                  isOpen ? 'text-[color:var(--ac)]' : 'text-white group-hover:text-[color:var(--ac)]'
                }`}
                whileHover={{ x: 14 }}
                transition={{ type: 'spring', ...NADAUN_SPRING }}
                style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 3.3vw, 2.9rem)', letterSpacing: '-0.03em' }}
              >
                {row.title}
              </motion.span>
            </div>

            {/* open indicator */}
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ type: 'spring', ...NADAUN_SPRING }}
              className={`hidden lg:flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-300 shrink-0 ${
                isOpen ? 'border-[color:var(--ac)] text-[color:var(--ac)]' : 'border-white/15 text-white/40 group-hover:border-white/30'
              }`}
            >
              <Plus size={18} />
            </motion.span>
          </div>
        </button>

        {/* 디졸브로 펼쳐지는 사이트 단어들 */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="links"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: NADAUN_EASE as any }}
              className="overflow-hidden"
            >
              <div className="pb-5 lg:pl-[227px]">
                <motion.p
                  initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: NADAUN_EASE as any }}
                  className="text-[15px] md:text-base text-white/55 leading-relaxed mb-4 break-keep"
                >
                  {row.desc}
                </motion.p>
                <div className="flex flex-wrap items-center gap-x-9 gap-y-4">
                  {row.links.map((link, i) => (
                    <LinkWord key={link.label} link={link} index={i} onOverlay={onOverlay} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/** 상시 흐르는 큰 글씨 마퀴 — 지나가면서 보여지는 idle 모션 */
const Marquee: React.FC<{ reverse?: boolean; dim?: boolean }> = ({ reverse = false, dim = false }) => {
  const words = ROWS.map((r) => r.title);
  const strip = (
    <span className="inline-flex items-center shrink-0">
      {words.map((w, i) => (
        <span key={i} className="inline-flex items-center">
          <span
            className={`${dim ? 'text-white/[0.07]' : 'text-white/25'} font-extrabold uppercase whitespace-nowrap`}
            style={{ fontFamily: 'Manrope, sans-serif', fontSize: dim ? 'clamp(1.4rem, 2.6vw, 2.2rem)' : 'clamp(2.1rem, 3.8vw, 3.4rem)', letterSpacing: '-0.02em' }}
          >
            {w}
          </span>
          <span className="mx-7 text-[0.5em]" style={{ color: '#FFB800', opacity: dim ? 0.3 : 0.6 }}>
            ✦
          </span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="overflow-hidden pointer-events-none select-none" aria-hidden>
      <motion.div
        className="flex w-max"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: reverse ? 40 : 26, repeat: Infinity, ease: 'linear' }}
      >
        {strip}
        {strip}
      </motion.div>
    </div>
  );
};

const ServiceHub: React.FC<ServiceHubProps> = ({ onOverlay }) => {
  const [openId, setOpenId] = useState<string | null>('space');

  return (
    <section className="relative bg-black flex flex-col justify-center min-h-[100svh] pt-20 md:pt-24 pb-8 overflow-hidden">
      <div style={{ paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' }}>
        {/* headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: NADAUN_EASE as any }}
          className="mb-5 md:mb-6"
        >
          <div>
            <p className="text-[11px] tracking-[0.45em] uppercase font-semibold mb-3" style={{ color: '#FFB800' }}>
              What We Do
            </p>
            <h2
              className="text-white font-extrabold leading-[0.92]"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)', letterSpacing: '-0.035em' }}
            >
              <BlurWords text="하나의 컬렉티브," />
              <br />
              <BlurWords text="모든 브랜드 경험." delay={0.28} />
            </h2>
          </div>
        </motion.div>
      </div>

      {/* idle marquee */}
      <div className="mb-3 md:mb-4 border-y border-white/[0.06] py-1.5">
        <Marquee />
      </div>

      {/* editorial kinetic rows */}
      <div
        className="border-t border-white/10"
        style={{ marginLeft: 'var(--header-pad, 1.5rem)', marginRight: 'var(--header-pad, 1.5rem)' }}
      >
        {ROWS.map((row, i) => (
          <HubRowItem
            key={row.id}
            row={row}
            index={i}
            isOpen={openId === row.id}
            onToggle={() => setOpenId(openId === row.id ? null : row.id)}
            onOverlay={onOverlay}
          />
        ))}
      </div>

      {/* bottom reverse marquee — 지나가는 느낌 한 겹 더 */}
      <div className="mt-2.5">
        <Marquee reverse dim />
      </div>

      {/* footer line */}
      <div
        className="mt-2 flex items-center justify-between"
        style={{ paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' }}
      >
        <p className="text-white/35 text-[14px] tracking-wide">
          공간 인프라부터 사진·영상, 글로벌 에이전시, 온·오프라인 종합 마케팅까지.
        </p>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/25 text-[10px] tracking-[0.4em] uppercase"
        >
          Scroll
        </motion.span>
      </div>
    </section>
  );
};

export default ServiceHub;
