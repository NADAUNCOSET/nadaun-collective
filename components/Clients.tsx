import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface ClientLogo {
  name: string;
  logo?: string;
  domain?: string;
  wide?: boolean;
}

const CLIENT_LIST: ClientLogo[] = [
  { name: 'SAMSUNG',        logo: '/logos/samsung.svg',     wide: true },
  { name: 'HYUNDAI STEEL',  domain: 'hyundai-steel.com'                },
  { name: 'HYUNDAI',        logo: '/logos/hyundai.svg'                 },
  { name: 'PEPSI',          logo: '/logos/pepsi.svg'                   },
  { name: 'EMIRATES',       domain: 'emirates.com'                     },
  { name: 'COWAY',          logo: '/logos/coway.svg'                   },
  { name: 'AMOREPACIFIC',   domain: 'amorepacific.com',     wide: true },
  { name: 'OLIVE YOUNG',    logo: '/logos/oliveyoung.svg',  wide: true },
  { name: 'GAONCHIPS',      domain: 'gaonchips.com'                    },
  { name: 'NUMBUZIN',                                                   },
  { name: 'HECTO',          domain: 'hecto.co.kr'                      },
  { name: 'K2 SAFETY',      domain: 'k2safety.co.kr'                   },
  { name: 'KOVA',           domain: 'kova.or.kr'                       },
  { name: 'BEREX',          domain: 'berex.co.kr'                      },
  { name: 'PAT',            domain: 'pat.co.kr'                        },
  { name: 'PREED',                                                      },
  { name: 'KWDA',                                                       },
  { name: 'M2美度',                                                      },
  { name: 'JUNG SAEM MOOL', domain: 'jungsaemmool.com',     wide: true },
  { name: 'ACMÉ DE LA VIE', domain: 'adlv.co.kr',           wide: true },
  { name: 'HD HYUNDAI',     domain: 'hdhyundai.com'                    },
  { name: 'KIA',            logo: '/logos/kia.svg'                     },
  { name: 'CALVIN KLEIN',   domain: 'calvinklein.com',      wide: true },
  { name: 'DIOR',           logo: '/logos/dior.svg'                    },
  { name: 'DASIQUE',                                                    },
  { name: 'ABIB',                                                       },
  { name: 'SKINFOOD',       domain: 'skinfood.co.kr'                   },
  { name: 'TONYMOLY',       domain: 'tonymoly.com'                     },
  { name: 'THE SAEM',       domain: 'thesaem.com',          wide: true },
  { name: 'SKIN1004',                                                   },
  { name: 'ELLE',           domain: 'elle.com'                         },
  { name: 'THE NEW GREY',                                               },
  { name: 'NUDAKE',                                                     },
];

const COLS = 4;

interface LogoItemProps {
  client: ClientLogo;
  revealed: boolean;
  index: number;
}

const LogoItem: React.FC<LogoItemProps> = ({ client, revealed, index }) => {
  const [clearbitOk, setClearbitOk] = useState(!!client.domain && !client.logo);
  const imgSrc = client.logo ?? (client.domain ? `https://logo.clearbit.com/${client.domain}?size=80` : null);
  const showImg = !!(client.logo || clearbitOk);

  return (
    <motion.div
      className="flex items-center gap-4 py-4 border-b border-white/8 overflow-hidden"
      animate={{
        opacity: revealed ? 1 : 0,
        y: revealed ? 0 : 12,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % COLS) * 0.04 }}
    >
      <span className="text-[10px] text-white/20 font-mono w-5 shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>
      {showImg && imgSrc ? (
        <img
          src={imgSrc}
          alt={client.name}
          onError={() => setClearbitOk(false)}
          className="h-[18px] w-auto object-contain"
          style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
        />
      ) : (
        <span
          className="font-bold tracking-tight whitespace-nowrap leading-none"
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(10px, 1.1vw, 13px)',
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.06em',
          }}
        >
          {client.name}
        </span>
      )}
    </motion.div>
  );
};

const Clients: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress → number of revealed brands
  const rawCount = useTransform(scrollYProgress, [0.05, 0.92], [0, CLIENT_LIST.length]);

  useMotionValueEvent(rawCount, 'change', (v) => {
    const next = Math.max(0, Math.min(Math.round(v), CLIENT_LIST.length));
    setRevealedCount(next);
  });

  // Counter text: 000 → 033
  const displayCount = String(revealedCount).padStart(3, '0');

  return (
    <div ref={containerRef} style={{ height: '500vh' }} id="clients">
      <div className="sticky top-0 w-full bg-black overflow-hidden" style={{ height: '100vh' }}>

        {/* Dot grid */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        <div className="relative z-10 h-full flex flex-col px-8 md:px-16 lg:px-24 pt-20 pb-10">

          {/* Header row */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#FFB800] font-bold mb-3">
                OUR PARTNERS
              </p>
              <h2
                className="font-black leading-none text-white"
                style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
              >
                {CLIENT_LIST.length}+ BRANDS
              </h2>
            </div>

            {/* Live counter */}
            <div className="text-right hidden md:block">
              <motion.span
                className="font-black leading-none"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 'clamp(3rem, 7vw, 7rem)',
                  letterSpacing: '-0.04em',
                  color: 'rgba(255,255,255,0.08)',
                }}
              >
                {displayCount}
              </motion.span>
            </div>
          </div>

          {/* Brand grid — 4 cols */}
          <div
            className="grid flex-1 overflow-hidden"
            style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, columnGap: '2rem', alignContent: 'start' }}
          >
            {CLIENT_LIST.map((client, i) => (
              <LogoItem
                key={client.name}
                client={client}
                revealed={i < revealedCount}
                index={i}
              />
            ))}
          </div>

          {/* Bottom label */}
          <p className="text-white/15 text-[10px] tracking-[0.4em] uppercase mt-6">
            TRUSTED BY THE BEST · SINCE 2020
          </p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
};

export default Clients;
