import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionTemplate, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type LinkChip = { label: string; url?: string; overlay?: string };

type RollingItem = { src: string; name: string; pos?: string };

type HubItem = {
  id: string;
  num: string;
  title: string;
  kr: string;
  desc: string;
  color: string;
  img?: string;
  videos?: string[]; // 포폴 영상 플레이리스트
  rolling?: RollingItem[]; // 아티스트 롤링
  links: LinkChip[];
};

const ITEMS: HubItem[] = [
  {
    id: 'moment',
    num: '01',
    title: 'NADAUN MOMENT',
    kr: '사진 · 영상 기획 · 제작',
    desc: '사진 · 영상 콘텐츠 기획 및 제작 — 기업의 순간을 정제된 감각으로 기록',
    color: '#FF8C00',
    videos: [
      'https://media.nadaun.co/video/%EA%B0%80%EB%A1%9C/20241022%20PEPSI%20FESTA%20SKETCH%20FILM%20v3_1080p.mp4',
      'https://media.nadaun.co/video/%EA%B0%80%EB%A1%9C/20240404_%EC%86%A1%ED%98%9C%EA%B5%90_%EB%AF%B8%EB%9E%98%EB%AF%B8_SKETCH_1080p.mp4',
      'https://media.nadaun.co/video/%EA%B0%80%EB%A1%9C/20251029%20JAY%20B%20OPEN%20VCR_1080p.mp4',
      'https://media.nadaun.co/video/%EA%B0%80%EB%A1%9C/20260113%20HD%ED%98%84%EB%8C%80%20%EC%8B%A0%EB%85%84%EC%82%AC%20%EC%8A%A4%EC%BC%80%EC%B9%98_1080p.mp4',
      'https://media.nadaun.co/video/%EA%B0%80%EB%A1%9C/20240505_m2%20%EC%86%90%EC%98%88%EC%A7%84_SKETCH_1080p.mp4',
      'https://media.nadaun.co/video/%EA%B0%80%EB%A1%9C/MUSINSA%20STANDARD%20BRAND%20FILM%20AD_1080p.mp4',
    ],
    links: [
      { label: 'PHOTO', url: 'https://photo.nadaun.co' },
      { label: 'VIDEO', url: 'https://video.nadaun.co' },
    ],
  },
  {
    id: 'starlogin',
    num: '02',
    title: 'STARLOGIN',
    kr: '국내 · 글로벌 에이전시',
    desc: '국내 · 글로벌 에이전시, IP 컨설팅, 글로벌 유통 · 제작 — 브랜드를 세계와 연결',
    color: '#FF6B35',
    rolling: [
      { src: '/starlogin/aespa.jpg', name: 'aespa' },
      { src: '/starlogin/ive.jpg', name: 'IVE' },
      { src: '/starlogin/txt.jpg', name: 'TOMORROW X TOGETHER' },
      { src: '/starlogin/lesserafim.jpg', name: 'LE SSERAFIM' },
      { src: '/starlogin/babymonster.jpg', name: 'BABYMONSTER' },
      { src: '/starlogin/straykids.jpg', name: 'Stray Kids' },
      { src: '/starlogin/blackpink.jpg', name: 'BLACKPINK' },
      { src: '/starlogin/zb1.jpg', name: 'ZEROBASEONE' },
    ],
    links: [{ label: 'GLOBAL AGENCY', url: 'https://starlogin.com' }],
  },
  {
    id: 'marketing',
    num: '03',
    title: 'MARKETING',
    kr: '종합 마케팅',
    desc: '온라인 · 오프라인, 국내 · 국외 풀퍼널 캠페인 설계와 집행',
    color: '#FFB800',
    rolling: [
      { src: 'https://media.nadaun.co/collective/btl/01-subway.webp', name: '지하철 스크린도어' },
      { src: 'https://media.nadaun.co/collective/btl/03-taxi.webp', name: '택시 미디어' },
      { src: 'https://media.nadaun.co/collective/btl/04-bus.webp', name: '버스 외부광고' },
    ],
    links: [
      { label: '통합 솔루션', overlay: 'integrated-solution' },
      { label: '미디어 · 매체', overlay: 'global-network' },
    ],
  },
  {
    id: 'ailab',
    num: '04',
    title: 'AI LAB',
    kr: 'AI 이노베이션 랩',
    desc: '사이니지 제작 · 유통, 글로벌 사이트 제작 등 — 데이터로 예측하는 마케팅의 새로운 차원',
    color: '#00FF94',
    img: 'https://media.nadaun.co/collective/btl/02-outdoor.webp',
    links: [{ label: 'AI LAB', overlay: 'ai-lab' }],
  },
  {
    id: 'influencer',
    num: '05',
    title: 'INFLUENCER',
    kr: '뷰티 인플루언서',
    desc: '뷰티 인플루언서 협찬 · 광고 · 제작 — 새로운 서비스를 준비하고 있습니다',
    color: '#FF4D9D',
    links: [],
  },
  {
    id: 'space',
    num: '06',
    title: 'NADAUN SPACE',
    kr: '스튜디오 · 장비 구매 · 렌탈',
    desc: '스튜디오 장비 구매 및 렌탈 — 모든 창작의 시작이 되는 공간 인프라',
    color: '#00C2FF',
    rolling: [
      { src: 'https://media.nadaun.co/collective/space/07.webp', name: '다크 세트', pos: 'center' },
      { src: 'https://media.nadaun.co/collective/space/15.webp', name: '조명 리그', pos: 'center 45%' },
      { src: 'https://media.nadaun.co/collective/space/03.webp', name: '호리존 현장', pos: 'center 55%' },
      { src: 'https://media.nadaun.co/collective/space/02.webp', name: '모니터링 현장', pos: 'center 45%' },
      { src: 'https://media.nadaun.co/collective/space/16.webp', name: '로케이션 세팅', pos: 'center' },
      { src: 'https://media.nadaun.co/collective/space/09.webp', name: '야외 로케이션', pos: 'center' },
    ],
    links: [
      { label: '자사몰', url: 'https://www.rainbowbene.com/' },
      { label: '스토어', url: 'https://smartstore.naver.com/rainbowbene' },
      { label: '블로그', url: 'https://blog.naver.com/nadaunstudio' },
      { label: '블로그스팟', url: 'https://nadaunspace.blogspot.com/' },
    ],
  },
];

const NADAUN_SPRING = { type: 'spring' as const, stiffness: 90, damping: 26, restDelta: 0.0005 };
const NADAUN_EASE = [0.16, 1, 0.3, 1] as const;
const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
// 모바일 = 블러 필터 미사용 (GPU 부하 절감, 부드러움 우선)
const BLUR = (px: number) => (isMobile ? 'blur(0px)' : `blur(${px}px)`);

/** 연예인 이미지가 차례대로 샤샤샥 지나가는 롤링 (+아티스트명 캡션) */
const RollingImages: React.FC<{ items: RollingItem[]; active: boolean; color: string }> = ({ items, active, color }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active) return; // 선택된 타일만 롤링
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 1500);
    return () => clearInterval(t);
  }, [items.length, active]);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={idx}
          src={items[idx].src}
          alt={items[idx].name}
          initial={{ opacity: 0, x: 60, scale: 1.05 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -60, scale: 1.02 }}
          transition={{ duration: 0.55, ease: NADAUN_EASE as any }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: items[idx].pos ?? 'center top' }}
        />
      </AnimatePresence>
      {/* 아티스트명 캡션 */}
      <div className="absolute top-3 right-3 z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 8, filter: BLUR(6) }}
            animate={{ opacity: 1, y: 0, filter: BLUR(0) }}
            exit={{ opacity: 0, y: -8, filter: BLUR(6) }}
            transition={{ duration: 0.4, ease: NADAUN_EASE as any }}
            className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider bg-black/55 ${isMobile ? '' : 'backdrop-blur-sm'}`}
            style={{ color, fontFamily: 'Manrope, sans-serif' }}
          >
            {items[idx].name}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

/** 포폴 영상 플레이리스트 — 선택된 타일에서만 재생, 3.2초마다 다음 영상의 랜덤 구간으로 (짧게 짧게) */
const TileVideo: React.FC<{ srcs: string[]; active: boolean }> = ({ srcs, active }) => {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (v) {
      if (active) v.play().catch(() => {});
      else v.pause();
    }
    if (!active) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % srcs.length), 3200);
    return () => clearInterval(t);
  }, [active, srcs.length, idx]);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.video
          key={idx}
          ref={ref}
          src={srcs[idx]}
          muted
          loop
          playsInline
          preload={active ? 'auto' : 'metadata'}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (v.duration && isFinite(v.duration)) {
              v.currentTime = v.duration * (0.1 + Math.random() * 0.6);
            }
            if (active) v.play().catch(() => {});
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: NADAUN_EASE as any }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

const LinkWord: React.FC<{ link: LinkChip; index: number; color: string; onOverlay: (id: string) => void }> = ({ link, index, color, onOverlay }) => {
  const inner = (
    <motion.span
      initial={{ opacity: 0, y: 16, filter: BLUR(9) }}
      animate={{ opacity: 1, y: 0, filter: BLUR(0) }}
      exit={{ opacity: 0, y: 8, filter: BLUR(6) }}
      transition={{ duration: 0.5, delay: 0.25 + index * 0.09, ease: NADAUN_EASE as any }}
      className="inline-flex items-center gap-1.5 font-bold tracking-tight text-white transition-colors duration-300"
      style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.15rem, 1.7vw, 1.45rem)' }}
      whileHover={{ x: 5, color }}
    >
      {link.label}
      <ArrowUpRight className="w-[0.85em] h-[0.85em] opacity-70" />
    </motion.span>
  );
  return link.url ? (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer select-none">
      {inner}
    </a>
  ) : (
    <button onClick={(e) => { e.stopPropagation(); link.overlay && onOverlay(link.overlay); }} className="cursor-pointer select-none text-left">
      {inner}
    </button>
  );
};

const Tiles: React.FC<{ activeId: string; setActiveId: (id: string) => void; onOverlay: (id: string) => void; onCenter?: (idx: number) => void }> = ({ activeId, setActiveId, onOverlay, onCenter }) => {
  // 모바일: 화면 가운데 오는 타일이 스크롤 따라 차례대로 선택 (센터 스파이)
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastRef = useRef<string>('');
  useEffect(() => {
    if (!isMobile) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = window.innerHeight / 2;
        let bestIdx = -1;
        let bestDist = window.innerHeight * 0.32; // 중앙 아주 근처만 판정 — 타일에 오래 머묾
        tileRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const d = Math.abs((r.top + r.bottom) / 2 - mid);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        });
        if (bestIdx >= 0 && ITEMS[bestIdx].id !== lastRef.current) {
          lastRef.current = ITEMS[bestIdx].id;
          if (onCenter) onCenter(bestIdx); // 체이서 경유 — 한 칸씩 지나감
          else setActiveId(ITEMS[bestIdx].id);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [setActiveId, onCenter]);

  return (
  <div
    className="flex flex-col lg:flex-row w-full"
    style={{ paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' }}
  >
    {ITEMS.map((item, ti) => {
      const active = activeId === item.id;
      return (
        <motion.div
          key={item.id}
          ref={(el) => { tileRefs.current[ti] = el; }}
          onClick={() => setActiveId(item.id)}
          animate={{ flexGrow: active ? 2.6 : 1, height: isMobile ? (active ? '48vh' : '17vh') : '58vh' }}
          transition={isMobile ? { duration: 0.6, ease: NADAUN_EASE as any } : { type: 'spring', stiffness: 65, damping: 23, restDelta: 0.0005 }}
          className="group relative overflow-hidden cursor-pointer basis-auto lg:basis-0 min-w-0 flex-grow"
          style={{ ['--ac' as any]: item.color }}
        >
          {/* image / rolling */}
          <div
            className={`absolute inset-0 ${
              isMobile ? '' : `transition-[filter] duration-700 ${active ? '' : 'grayscale-[65%] brightness-[0.55] group-hover:grayscale-0 group-hover:brightness-90'}`
            }`}
          >
            {item.rolling ? (
              <RollingImages items={item.rolling} active={active} color={item.color} />
            ) : item.videos ? (
              <TileVideo srcs={item.videos} active={active} />
            ) : item.img ? (
              <motion.img
                src={item.img}
                alt={item.title}
                animate={{ scale: active ? 1.06 : 1 }}
                transition={{ duration: 1.2, ease: NADAUN_EASE as any }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              /* 준비중 타일 — 미디어 없음 */
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(255,77,157,0.12), #0a0a0a 70%)' }}>
                <motion.span
                  animate={{ opacity: [0.25, 0.6, 0.25] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="uppercase select-none"
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', letterSpacing: '-0.02em', color: 'transparent', WebkitTextStroke: '1.2px rgba(255,255,255,0.35)' }}
                >
                  Soon
                </motion.span>
              </div>
            )}
          </div>
          {/* 모바일 비활성 딤 — filter 대신 오버레이(GPU 경량) */}
          {isMobile && (
            <div
              className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500"
              style={{ opacity: active ? 0 : 0.45 }}
            />
          )}
          {/* gradient — 활성 시 하단을 더 눌러 텍스트 가독 확보 */}
          <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none transition-opacity duration-500 ${active ? 'from-black/95 via-black/40 to-black/25' : 'from-black/85 via-black/15 to-black/30'}`} />
          {/* active accent line */}
          <motion.span
            className="absolute top-0 left-0 right-0 h-[3px] origin-left"
            style={{ background: item.color }}
            animate={{ scaleX: active ? 1 : 0 }}
            transition={NADAUN_SPRING}
          />

          {/* label */}
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
            <div className="flex items-center gap-3 mb-1.5">
              {/* 모바일은 번호 제거, 얇은 폰트로 좌측 정렬 (대표 지시 2026-07-15) */}
              {!isMobile && (
                <span className="text-[12px] font-bold tracking-[0.25em] text-white/40">
                  {item.num}
                </span>
              )}
              <span className={isMobile ? 'text-[15px] font-normal text-white/80 tracking-wide truncate' : 'text-[13px] font-semibold text-white/75 tracking-wide truncate'}>
                {item.kr}
              </span>
            </div>
            <h3
              className="text-white leading-none whitespace-nowrap"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                fontSize: active
                  ? isMobile
                    ? '1.9rem'
                    : 'clamp(1.6rem, 2.8vw, 2.6rem)'
                  : isMobile
                    ? '1.35rem'
                    : 'clamp(1.1rem, 1.55vw, 1.5rem)',
                transition: 'font-size 0.5s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {item.title}
            </h3>

            <AnimatePresence>
              {active && (
                <motion.div
                  key="panel"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: NADAUN_EASE as any }}
                  className="overflow-hidden"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 12, filter: BLUR(8) }}
                    animate={{ opacity: 1, y: 0, filter: BLUR(0) }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, delay: 0.12, ease: NADAUN_EASE as any }}
                    className="mt-3 text-[14px] md:text-[16px] text-white/75 leading-relaxed break-keep max-w-[560px]"
                  >
                    {item.desc}
                  </motion.p>
                  <div className="mt-3.5 flex flex-wrap items-center gap-x-7 gap-y-2.5">
                    {item.links.length > 0 ? (
                      item.links.map((link, li) => (
                        <LinkWord key={link.label} link={link} index={li} color={item.color} onOverlay={onOverlay} />
                      ))
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, y: 12, filter: BLUR(8) }}
                        animate={{ opacity: 1, y: 0, filter: BLUR(0) }}
                        transition={{ duration: 0.5, delay: 0.2, ease: NADAUN_EASE as any }}
                        className="inline-block rounded-full border px-4 py-1.5 text-[13px] font-bold tracking-wider"
                        style={{ borderColor: `${item.color}66`, color: item.color }}
                      >
                        COMING SOON
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      );
    })}
  </div>
  );
};

interface ServiceHubV2Props {
  onOverlay: (id: string) => void;
  introFinished?: boolean;
}

const ServiceHubV2: React.FC<ServiceHubV2Props> = ({ onOverlay, introFinished = true }) => {
  const [activeId, setActiveId] = useState<string>('moment');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const sp = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.0005 });

  // ── 체이서: 목표 타일까지 한 칸씩 순서대로 따라감 — 빠른 스크롤에도 모든 타일이 지나가는 느낌 ──
  const curIdxRef = useRef(0);
  const targetIdxRef = useRef(0);
  const stepTimerRef = useRef<number | null>(null);
  const stepToward = () => {
    if (stepTimerRef.current !== null) return;
    const step = () => {
      const cur = curIdxRef.current;
      const t = targetIdxRef.current;
      if (cur === t) {
        stepTimerRef.current = null;
        return;
      }
      const next = cur + Math.sign(t - cur);
      curIdxRef.current = next;
      setActiveId(ITEMS[next].id);
      stepTimerRef.current = window.setTimeout(step, 380);
    };
    step();
  };
  const goToward = (target: number) => {
    targetIdxRef.current = target;
    stepToward();
  };
  // 클릭/탭 직접 선택 — 체이서 중단 후 즉시 이동
  const selectTile = (id: string) => {
    const i = ITEMS.findIndex((x) => x.id === id);
    if (i < 0) return;
    if (stepTimerRef.current !== null) {
      clearTimeout(stepTimerRef.current);
      stepTimerRef.current = null;
    }
    curIdxRef.current = i;
    targetIdxRef.current = i;
    setActiveId(id);
  };
  useEffect(() => () => {
    if (stepTimerRef.current !== null) clearTimeout(stepTimerRef.current);
  }, []);

  // ── 인트로 대형 워드 — 시작 시 자동 등장(스태거), 스크롤은 퇴장만 (대표 지시 2026-07-15) ──
  const introOp = useTransform(sp, [0.15, 0.24], [1, 0]);
  const introBlurN = useTransform(sp, [0.15, 0.24], [0, 12]);
  const introFilter = useMotionTemplate`blur(${introBlurN}px)`;

  // ── 콘텐츠(타일 세션) — 인트로 뒤에 디졸브로 등장 ──
  const contOp = useTransform(sp, [0.22, 0.32], [0, 1]);
  const contY = useTransform(sp, [0.22, 0.34], [90, 0]);
  const contBlurN = useTransform(sp, [0.22, 0.32], [10, 0]);
  const contFilter = useMotionTemplate`blur(${contBlurN}px)`;
  const contPointer = useTransform(scrollYProgress, (v) => (v > 0.20 ? 'auto' : 'none'));

  // ── PC: 타일 세션에서 계속 스크롤하면 모먼트부터 차례대로 선택 (안정적·편안한 전환) ──
  // 선택 판정은 스프링 지연 없는 원시 진행도로 — 빠른 스크롤에도 마지막 타일 보장
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (isMobile) return;
    if (v < 0.32) return;
    // 타일당 스크롤 ~42vh + 마지막 타일 ~95vh 여운
    const seg = Math.min(ITEMS.length - 1, Math.floor(((v - 0.32) / 0.56) * ITEMS.length));
    goToward(seg); // 건너뛰지 않고 한 칸씩
  });

  // ── 모바일: 키비주얼 글씨는 켜자마자 바로 등장(마운트 스태거), 스크롤은 퇴장만 스크럽 ──
  const mOutOp = useTransform(sp, [0.35, 0.75], [1, 0]);
  const mOutY = useTransform(sp, [0.35, 0.75], ['0%', '-6%']);

  // ── 컬러 진행띠 — PC: 스크롤에 1:1 연속으로 흐름 (transform만 사용, GPU 경량) ──
  const barX = useTransform(sp, [0.32, 0.88], ['0%', `${(ITEMS.length - 1) * 100}%`], { clamp: true });
  const activeIdx = Math.max(0, ITEMS.findIndex((x) => x.id === activeId));
  const activeColor = ITEMS[activeIdx].color;

  // 푸터 LET'S TOGETHER처럼 화면을 꽉 채우는 스케일 (대표 지시 2026-07-13)
  const bigWord: React.CSSProperties = {
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(3rem, 11vw, 11rem)',
    letterSpacing: '-0.045em',
    lineHeight: 0.94,
    color: '#fff',
    display: 'block',
    whiteSpace: 'nowrap',
  };

  // 모바일 = 인트로 스크롤텔링(푸터 방식) → 타일 세션 일반 플로우
  if (isMobile) {
    const mWord: React.CSSProperties = {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 900,
      fontSize: 'clamp(2.4rem, 12vw, 4.2rem)',
      letterSpacing: '-0.045em',
      lineHeight: 0.95,
      whiteSpace: 'nowrap',
      color: 'rgba(255,255,255,0.92)',
      display: 'block',
    };
    return (
      <>
        {/* 키비주얼 — 켜자마자 글씨 등장(좌/우/아래 스태거), 스크롤 시 퇴장 스크럽 */}
        <div ref={ref} style={{ height: '150vh' }} className="relative bg-black">
          <div
            className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center"
            style={{ paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' }}
          >
            <motion.div style={{ opacity: mOutOp, y: mOutY }}>
              <motion.p
                initial={{ opacity: 0, x: '-12%' }}
                animate={introFinished ? { opacity: 1, x: '0%' } : { opacity: 0, x: '-12%' }}
                transition={{ type: 'spring', stiffness: 55, damping: 20, delay: 0.1 }}
                className="text-[11px] tracking-[0.5em] uppercase font-bold mb-6"
              >
                <span style={{ color: '#FFB800' }}>What We Do</span>
              </motion.p>
              <motion.span
                initial={{ opacity: 0, x: '-12%' }}
                animate={introFinished ? { opacity: 1, x: '0%' } : { opacity: 0, x: '-12%' }}
                transition={{ type: 'spring', stiffness: 55, damping: 20, delay: 0.2 }}
                style={mWord}
              >
                하나의
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: '12%' }}
                animate={introFinished ? { opacity: 1, x: '0%' } : { opacity: 0, x: '12%' }}
                transition={{ type: 'spring', stiffness: 55, damping: 20, delay: 0.45 }}
                style={mWord}
              >
                컬렉티브<span style={{ color: '#FFB800' }}>,</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: '14%' }}
                animate={introFinished ? { opacity: 1, y: '0%' } : { opacity: 0, y: '14%' }}
                transition={{ type: 'spring', stiffness: 55, damping: 20, delay: 0.7 }}
                style={{ ...mWord, color: '#ffffff' }}
              >
                브랜드의 A to Z<span style={{ color: '#FFB800' }}>.</span>
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* 타일 세션 */}
        <section className="relative bg-black min-h-[100svh] flex flex-col justify-center py-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.65, ease: NADAUN_EASE as any }}
          >
            <div className="mb-4" style={{ paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' }}>
              <h2
                className="text-white font-extrabold"
                style={{ fontFamily: 'Manrope, sans-serif', fontSize: '19px', letterSpacing: '-0.03em' }}
              >
                하나의 컬렉티브, 브랜드의 A to Z<span style={{ color: '#FFB800' }}>.</span>
              </h2>
            </div>
            {/* 컬러 진행띠 — 상단 고정, 선택 타일 따라 스프링 이동 (transform만, 경량) */}
            <div className="sticky top-[72px] z-30 mb-4" style={{ paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' }}>
              <div className="relative h-[3px] rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute top-0 bottom-0 rounded-full"
                  style={{ width: `${100 / ITEMS.length}%` }}
                  animate={{ x: `${activeIdx * 100}%`, backgroundColor: activeColor }}
                  transition={{ type: 'spring', stiffness: 65, damping: 23 }}
                />
              </div>
            </div>
            <Tiles activeId={activeId} setActiveId={selectTile} onOverlay={onOverlay} onCenter={goToward} />
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <div ref={ref} style={{ height: '550vh' }} className="relative bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* ── 인트로 대형 타이포 ── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col justify-center pointer-events-none"
          style={{ opacity: introOp, filter: introFilter, paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' }}
        >
          <motion.p
            initial={{ opacity: 0, x: '-12%' }}
            animate={introFinished ? { opacity: 1, x: '0%' } : { opacity: 0, x: '-12%' }}
            transition={{ type: 'spring', stiffness: 55, damping: 20, delay: 0.1 }}
            className="text-[12px] tracking-[0.5em] uppercase font-bold mb-8"
          >
            <span style={{ color: '#FFB800' }}>What We Do</span>
          </motion.p>
          {/* 1행: 왼쪽에서 / 2행: 오른쪽에서 — 한 줄 배치 (푸터 LET'S BE 방식, 자동 등장) */}
          <div className="flex flex-row items-baseline gap-x-[0.45em] whitespace-nowrap">
            <motion.span
              initial={{ opacity: 0, x: '-12%' }}
              animate={introFinished ? { opacity: 1, x: '0%' } : { opacity: 0, x: '-12%' }}
              transition={{ type: 'spring', stiffness: 55, damping: 20, delay: 0.2 }}
              style={{ ...bigWord, color: 'rgba(255,255,255,0.92)' }}
            >
              하나의
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: '12%' }}
              animate={introFinished ? { opacity: 1, x: '0%' } : { opacity: 0, x: '12%' }}
              transition={{ type: 'spring', stiffness: 55, damping: 20, delay: 0.45 }}
              style={{ ...bigWord, color: 'rgba(255,255,255,0.92)' }}
            >
              컬렉티브<span style={{ color: '#FFB800' }}>,</span>
            </motion.span>
          </div>
          {/* 3행: 아래에서 (TOGETHER. 방식, 자동 등장) */}
          <motion.span
            initial={{ opacity: 0, y: '14%' }}
            animate={introFinished ? { opacity: 1, y: '0%' } : { opacity: 0, y: '14%' }}
            transition={{ type: 'spring', stiffness: 55, damping: 20, delay: 0.7 }}
            style={bigWord}
          >
            브랜드의 A to Z<span style={{ color: '#FFB800' }}>.</span>
          </motion.span>
        </motion.div>

        {/* ── 타일 세션 ── */}
        <motion.div style={{ opacity: contOp, y: contY, filter: contFilter, pointerEvents: contPointer as any }} className="relative z-20 flex flex-col justify-center">
          <div
            className="mb-5 flex items-end justify-between"
            style={{ paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' }}
          >
            <h2 className="text-white font-extrabold leading-[0.95]" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 2.6vw, 2.3rem)', letterSpacing: '-0.03em' }}>
              하나의 컬렉티브, 브랜드의 A to Z<span style={{ color: '#FFB800' }}>.</span>
            </h2>
          </div>

          {/* 컬러 진행띠 — 스크롤 따라 연속으로 흐르며 현재 사업 컬러로 물듦 */}
          <div className="mb-3" style={{ paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' }}>
            <div className="relative h-[3px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="absolute top-0 bottom-0 rounded-full"
                style={{ width: `${100 / ITEMS.length}%`, x: barX }}
                animate={{ backgroundColor: activeColor }}
                transition={{ duration: 0.5, ease: NADAUN_EASE as any }}
              />
            </div>
          </div>

          <Tiles activeId={activeId} setActiveId={selectTile} onOverlay={onOverlay} onCenter={goToward} />

          <div
            className="mt-5 flex items-center justify-between"
            style={{ paddingLeft: 'var(--header-pad, 1.5rem)', paddingRight: 'var(--header-pad, 1.5rem)' }}
          >
            <p className="text-white/35 text-[14px] tracking-wide">공간 인프라부터 사진·영상, 글로벌 에이전시, 온·오프라인 종합 마케팅까지.</p>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-white/25 text-[10px] tracking-[0.4em] uppercase"
            >
              Scroll
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceHubV2;
