import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ClientLogo {
  name: string;
  domain?: string;   // clearbit domain → logo image
  color?: string;    // brand color for text fallback
  wide?: boolean;    // wider logos
}

const CLIENT_LIST: ClientLogo[] = [
  { name: 'SAMSUNG',        domain: 'samsung.com',       wide: true },
  { name: 'HYUNDAI STEEL',  domain: 'hyundai-steel.com'  },
  { name: 'HYUNDAI',        domain: 'hyundai.com'        },
  { name: 'PEPSI',          domain: 'pepsi.com'          },
  { name: 'EMIRATES',       domain: 'emirates.com'       },
  { name: 'COWAY',          domain: 'coway.com'          },
  { name: 'AMOREPACIFIC',   domain: 'amorepacific.com',  wide: true },
  { name: 'OLIVE YOUNG',    domain: 'oliveyoung.com',    wide: true },
  { name: 'GAONCHIPS',      domain: 'gaonchips.com'      },
  { name: 'NUMBUZIN',                                     },
  { name: 'HECTO',          domain: 'hecto.co.kr'        },
  { name: 'K2 SAFETY',      domain: 'k2safety.co.kr'     },
  { name: 'KOVA',           domain: 'kova.or.kr'         },
  { name: 'BEREX',          domain: 'berex.co.kr'        },
  { name: 'PAT',            domain: 'pat.co.kr'          },
  { name: 'PREED',                                        },
  { name: 'KWDA',                                         },
  { name: 'M2美度',                                        },
  { name: 'JUNG SAEM MOOL', domain: 'jungsaemmool.com',  wide: true },
  { name: 'ACMÉ DE LA VIE', domain: 'adlv.co.kr',        wide: true },
  { name: 'HD HYUNDAI',     domain: 'hdhyundai.com'      },
  { name: 'KIA',            domain: 'kia.com'            },
  { name: 'CALVIN KLEIN',   domain: 'calvinklein.com',   wide: true },
  { name: 'DIOR',           domain: 'dior.com'           },
  { name: 'DASIQUE',                                      },
  { name: 'ABIB',                                         },
  { name: 'SKINFOOD',       domain: 'skinfood.co.kr'     },
  { name: 'TONYMOLY',       domain: 'tonymoly.com'       },
  { name: 'THE SAEM',       domain: 'thesaem.com',       wide: true },
  { name: 'SKIN1004',                                     },
  { name: 'ELLE',           domain: 'elle.com'           },
  { name: 'THE NEW GREY',                                 },
  { name: 'NUDAKE',                                       },
];

// Split into two rows
const ROW1 = CLIENT_LIST.slice(0, Math.ceil(CLIENT_LIST.length / 2));
const ROW2 = CLIENT_LIST.slice(Math.ceil(CLIENT_LIST.length / 2));

interface LogoItemProps {
  client: ClientLogo;
}

const LogoItem: React.FC<LogoItemProps> = ({ client }) => {
  const [imgOk, setImgOk] = useState(!!client.domain);

  return (
    <div className="flex items-center justify-center px-10 md:px-14 h-full shrink-0 group">
      <div className="relative flex items-center justify-center" style={{ height: 36 }}>
        {imgOk && client.domain ? (
          <img
            src={`https://logo.clearbit.com/${client.domain}?size=80`}
            alt={client.name}
            onError={() => setImgOk(false)}
            className="max-h-[28px] w-auto object-contain transition-all duration-300"
            style={{
              filter: 'brightness(0) invert(1)',
              opacity: 0.6,
            }}
          />
        ) : (
          <span
            className="font-bold tracking-tight whitespace-nowrap"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(11px, 1.3vw, 15px)',
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.04em',
            }}
          >
            {client.name}
          </span>
        )}
        {/* Hover underline */}
        <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#FFB800] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </div>
  );
};

interface MarqueeRowProps {
  clients: ClientLogo[];
  reverse?: boolean;
  speed?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ clients, reverse = false, speed = 40 }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (rowRef.current) setWidth(rowRef.current.scrollWidth / 2);
  }, []);

  // Duplicate for seamless loop
  const doubled = [...clients, ...clients];

  return (
    <div className="overflow-hidden" style={{ height: 64 }}>
      <motion.div
        ref={rowRef}
        className="flex items-center h-full"
        animate={{ x: reverse ? [0, width] : [0, -width] }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((client, i) => (
          <LogoItem key={`${client.name}-${i}`} client={client} />
        ))}
      </motion.div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Clients: React.FC = () => {
  return (
    <section id="clients" className="relative w-full bg-black py-20 overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#FFB800] font-bold mb-3">
            OUR PARTNERS
          </p>
          <div className="flex items-baseline justify-between">
            <h2
              className="font-black leading-none text-white"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.2rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
            >
              {CLIENT_LIST.length}+ BRANDS
            </h2>
            <p className="text-white/20 text-xs tracking-widest hidden md:block">
              TRUSTED BY THE BEST
            </p>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white/8 mb-0" />

      {/* Row 1 — left */}
      <div className="relative z-10 border-b border-white/8">
        <MarqueeRow clients={ROW1} reverse={false} speed={50} />
      </div>

      {/* Row 2 — right (reverse) */}
      <div className="relative z-10 border-b border-white/8">
        <MarqueeRow clients={ROW2} reverse={true} speed={45} />
      </div>

      {/* CTA line */}
      <motion.div
        className="relative z-10 px-8 md:px-16 lg:px-24 mt-14 flex items-center justify-between"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="text-white/20 text-[11px] tracking-widest">
          SAMSUNG · HYUNDAI · PEPSI · EMIRATES · AMOREPACIFIC · OLIVE YOUNG +{CLIENT_LIST.length - 6} MORE
        </p>
      </motion.div>
    </section>
  );
};

export default Clients;
