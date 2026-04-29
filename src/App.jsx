import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Handshake,
  Sparkles,
  Store,
  Utensils,
  Waves,
  X,
} from "lucide-react";
import "./index.css";

const socialLinks = {
  facebook: "https://www.facebook.com/westedmall",
  twitter: "https://x.com/Official_WEM",
  youtube: "https://www.youtube.com/@OfficialWEM",
  instagram: "https://www.instagram.com/official_wem/",
  linkedin: "https://www.linkedin.com/company/west-edmonton-mall",
};

const modules = {
  property: {
    level: "OVERVIEW",
    eyebrow: "WHY THIS PROPERTY",
    title: "A commercial city built inside a destination.",
    video: "/videos/interior.mp4",
    icon: Building2,
    text: "West Edmonton Mall combines retail, attractions, hotels, dining, tourism, and year-round programming into one high-traffic destination platform.",
    points: ["30M+ annual visitors", "800+ stores & services", "16 major attractions", "2 hotels on property"],
    cta: "Start a business conversation",
  },
  luxury: {
    level: "LEVEL 01",
    eyebrow: "LUXURY EXPERIENCE",
    title: "Premium presence for high-value brands.",
    video: "/videos/luxury.mp4",
    icon: Sparkles,
    text: "A polished environment where luxury and premium brands can create visibility, exclusivity, and destination-level impact.",
    points: ["Luxury positioning", "High-spend audiences", "Tourist visibility", "Experience-led retail"],
    cta: "Discuss luxury placement",
  },
  retail: {
    level: "LEVEL 02",
    eyebrow: "RETAIL LEASING",
    title: "A retail ecosystem built for discovery and conversion.",
    video: "/videos/retail.mp4",
    icon: Store,
    text: "Brands do not just rent space here. They enter a high-density retail environment powered by attractions, dining, events, tourism, and full-day dwell time.",
    points: ["Global fashion brands", "Premium storefronts", "Pop-up retail", "Specialty leasing"],
    cta: "Explore leasing paths",
  },
  dining: {
    level: "LEVEL 03",
    eyebrow: "DINING & LIFESTYLE",
    title: "Food turns visits into full-day experiences.",
    video: "/videos/dining.mp4",
    icon: Utensils,
    text: "Dining extends dwell time, increases spend, and supports event-driven traffic across the property.",
    points: ["100+ dining options", "Family dining", "Lifestyle traffic", "Event-day demand"],
    cta: "Explore F&B opportunities",
  },
  attractions: {
    level: "LEVEL 04",
    eyebrow: "ATTRACTIONS",
    title: "The reason people stay longer.",
    video: "/videos/attractions.mp4",
    icon: Waves,
    text: "World-class attractions transform the mall into a repeat-visit entertainment destination for families, tourists, and local audiences.",
    points: ["World Waterpark", "Galaxyland", "Ice Palace", "Marine Life"],
    cta: "View attraction partnerships",
  },
  events: {
    level: "LEVEL 05",
    eyebrow: "EVENTS PLATFORM",
    title: "Built-in audience. Zero cold start.",
    video: "/videos/events.mp4",
    icon: CalendarDays,
    text: "Product launches, concerts, celebrity moments, and activations happen inside a destination that already has the crowd.",
    points: ["Product launches", "Concerts", "Brand activations", "Corporate events"],
    cta: "Book an activation",
  },
  sponsorship: {
    level: "LEVEL 06",
    eyebrow: "SPONSORSHIP",
    title: "Turn foot traffic into brand presence.",
    video: "/videos/sponsorship.mp4",
    icon: Handshake,
    text: "Sponsors can own physical and digital moments across the mall through naming rights, takeovers, and immersive activations.",
    points: ["Naming rights", "Digital takeovers", "Immersive pop-ups", "Seasonal campaigns"],
    cta: "Build a partnership",
  },
};

const floorLinks = [
  { key: "luxury", label: "Luxury Experience", level: "LEVEL 01" },
  { key: "retail", label: "Retail Leasing", level: "LEVEL 02" },
  { key: "dining", label: "Dining & Lifestyle", level: "LEVEL 03" },
  { key: "attractions", label: "Attractions", level: "LEVEL 04" },
  { key: "events", label: "Events Platform", level: "LEVEL 05" },
  { key: "sponsorship", label: "Sponsorship", level: "LEVEL 06" },
];

const ctaDetails = {
  property: {
    title: "Start a Business Conversation",
    items: ["Retail leasing", "Sponsorship partnerships", "Event hosting", "Destination-wide commercial opportunities"],
    button: "Contact Commercial Team",
  },
  events: {
    title: "Book an Event",
    items: ["Product launches and brand activations", "Concerts and performances", "Corporate events", "Built-in foot traffic from mall visitors"],
    button: "Start Event Booking",
  },
  luxury: {
    title: "Discuss Luxury Placement",
    items: ["Premium storefront positioning", "High-spend audience visibility", "Tourist-focused visibility", "Immersive luxury retail formats"],
    button: "Request Luxury Placement",
  },
  retail: {
    title: "Explore Leasing Paths",
    items: ["Flagship retail stores", "Pop-up and short-term leasing", "Specialty leasing opportunities", "F&B and experiential retail concepts"],
    button: "Start Leasing Inquiry",
  },
  dining: {
    title: "Explore F&B Opportunities",
    items: ["Full-service restaurants", "Fast-casual dining concepts", "Cafes and beverage formats", "Event-day and family traffic demand"],
    button: "Explore F&B Leasing",
  },
  attractions: {
    title: "View Attraction Partnerships",
    items: ["World Waterpark partnerships", "Galaxyland campaigns", "Family and tourism activations", "Seasonal attraction sponsorships"],
    button: "Discuss Attraction Partnership",
  },
  sponsorship: {
    title: "Build a Partnership",
    items: ["Naming rights and branded zones", "Digital screen takeovers", "Immersive pop-up activations", "Seasonal and event sponsorship packages"],
    button: "Build Partnership Plan",
  },
};

export default function App() {
  const [stage, setStage] = useState("hero");
  const [activeModule, setActiveModule] = useState(null);
  const [showFloorSigns, setShowFloorSigns] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(null);
  const [flyArrow, setFlyArrow] = useState(null);
  const [transitioningTo, setTransitioningTo] = useState(null); 

  const playVoice = () => {
    const audio = new Audio("/audio/voiceover.mp3");
    audio.volume = 0.8;
    audio.play().catch((err) => console.log("Audio blocked:", err));
  };

  const playAmbient = () => {
    const ambient = new Audio("/audio/bg.mp3");
    ambient.loop = true;
    ambient.volume = 0.12;
    ambient.play().catch((err) => console.log("Ambient blocked:", err));
  };

  useEffect(() => {
    if (stage === "entering") {
      const timer = setTimeout(() => {
        setStage("floors");
        setShowFloorSigns(false);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const active = activeModule ? modules[activeModule] : null;
  const ActiveIcon = active?.icon || Building2;

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        {stage === "hero" && (
          <motion.section key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8 }} className="relative h-screen">
            <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/65" />
            <Header />

            <div className="relative z-10 flex h-full items-center justify-center px-5 text-center md:px-8">
              <div className="max-w-6xl">
                <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-5 text-xs uppercase tracking-[0.55em] text-yellow-200 md:mb-6 md:text-sm md:tracking-[0.7em]">
                  West Edmonton Mall
                </motion.p>

                <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="text-glow text-4xl font-semibold leading-tight sm:text-5xl md:text-7xl lg:text-8xl">
                  Where millions come to experience more.
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/90 md:mt-7 md:text-lg md:leading-8">
                  Not a mall. A built-in audience for brands, events, sponsors, and destination experiences.
                </motion.p>

                <motion.button initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}  onClick={() => {   playVoice();    playAmbient();   setStage("entering"); }} className="mt-8 rounded-full bg-white px-7 py-3 text-sm font-bold text-black shadow-2xl transition hover:bg-yellow-300 md:mt-10 md:px-8 md:py-4">
                  Enter Experience <ArrowRight className="ml-2 inline" size={17} />
                </motion.button>
              </div>
            </div>
          </motion.section>
        )}

        {stage === "entering" && (
          <motion.section key="entering" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="relative h-screen bg-black">
            <video autoPlay muted playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src="/videos/entering.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />
            <div className="relative z-10 flex h-full items-end justify-center pb-16">
              <p className="animate-pulse rounded-full bg-black/40 px-5 py-2 text-xs uppercase tracking-[0.35em] text-white/90 backdrop-blur md:tracking-[0.45em]">
                Entering the destination
              </p>
            </div>
          </motion.section>
        )}

        {stage === "floors" && (
          <motion.section key="floors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="relative h-screen overflow-y-auto md:overflow-hidden">
            <video autoPlay muted playsInline className="absolute inset-0 h-full w-full object-cover" onPlay={() => { setTimeout(() => {setShowFloorSigns(true); }, 5800);  }}>
              <source src="/videos/floors.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,220,120,0.18),transparent_42%)]" />
            <Header />

            {!showFloorSigns && (
              <div className="relative z-10 flex h-full items-end justify-center pb-12">
                <p className="rounded-full bg-black/45 px-5 py-2 text-xs uppercase tracking-[0.35em] backdrop-blur-xl md:tracking-[0.4em]">
                  Arriving at the opportunity hub
                </p>
              </div>
            )}

            <AnimatePresence>
              {showFloorSigns && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 grid min-h-screen place-items-center px-5 py-20 md:px-8 md:py-16 xl:py-24">
                  <div className="grid w-full max-w-7xl items-center gap-5 md:gap-8 lg:grid-cols-[0.75fr_1.25fr]">
                    <motion.div initial={{ opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }} className="readable-panel rounded-[2rem] p-6 text-white md:p-8">
                      <p className="mb-4 text-xs uppercase tracking-[0.35em] text-yellow-200 md:tracking-[0.45em]">You are inside WEM</p>
                      <h2 className="text-glow text-3xl font-semibold leading-tight md:text-5xl">Explore the floors of opportunity.</h2>
                      <p className="mt-5 text-sm leading-7 text-white/90 md:text-base">
                        Each level opens a dedicated business pathway for leasing, sponsorship, events, lifestyle, and entertainment partnerships.
                      </p>
                      <button onClick={() => setActiveModule("property")} className="mt-7 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-yellow-300">
                        Why this property?
                      </button>
                    </motion.div>

                    <div className="floor-stack">
                      {floorLinks.map((item, index) => (
                        <motion.button
                          key={item.key}
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08 }}
                          whileHover={{ rotateX: 3, rotateY: -4 }}
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();

                            setFlyArrow({
                              x: rect.right - 20,
                              y: rect.top + rect.height / 2,
                              key: item.key,
                            });
                          }}
                          className="readable-card group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition hover:scale-[1.015] hover:border-yellow-200 hover:bg-yellow-200/95 hover:text-black md:px-5 md:py-3.5 xl:px-7 xl:py-5"
                        >
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] opacity-80 md:tracking-[0.35em]">{item.level}</p>
                            <h3 className="mt-1 text-xl font-semibold md:text-2xl xl:text-3xl">{item.label}</h3>
                          </div>
                          <ArrowRight className="transition group-hover:translate-x-2" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.section key={active.title} initial={{ x: "-100%", opacity: 0, scale: 0.96 }}  animate={{ x: 0, opacity: 1, scale: 1 }}  exit={{ x: "100%", opacity: 0, scale: 0.96 }}  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 z-50 overflow-hidden bg-black">
            <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src={active.video} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,213,91,0.22),transparent_35%)]" />

            <FloorSideNav setActiveModule={setActiveModule} />

            <button onClick={() => setActiveModule(null)} className="absolute right-5 top-5 z-50 rounded-full border border-white/35 bg-black/45 px-4 py-2 text-sm backdrop-blur-xl transition hover:bg-yellow-300 hover:text-black md:right-8 md:top-8 md:px-5 md:py-3">
              <X className="mr-2 inline" size={16} />
              Back to floors
            </button>

            <div className="relative z-10 grid h-screen items-center gap-6 overflow-y-auto px-5 py-24 md:gap-10 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="max-w-2xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-black/45 text-yellow-200 backdrop-blur-xl md:mb-7 md:h-16 md:w-16">
                  <ActiveIcon size={32} />
                </div>

                <p className="mb-4 text-xs uppercase tracking-[0.35em] text-yellow-200 md:mb-5 md:text-sm md:tracking-[0.45em]">
                  {active.level} / {active.eyebrow}
                </p>

                <h2 className="text-glow text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
                  {active.title}
                </h2>

                <p className="mt-6 text-base leading-7 text-white/90 md:mt-7 md:text-lg md:leading-8">
                  {active.text}
                </p>

                <button onClick={() => setCtaOpen(activeModule)} className="mt-8 rounded-full bg-white px-7 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 md:mt-9">
                  {active.cta}
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {active.points.map((point, index) => (
                  <motion.div key={point} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="readable-card rounded-3xl p-5 md:p-6">
                    <p className="text-lg font-semibold md:text-xl">{point}</p>
                    <p className="mt-3 text-sm leading-6 text-white/80">
                      Designed to push prospects toward leasing, sponsorship, event booking, or partnership action.
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ctaOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[70] grid place-items-center bg-black/70 px-5 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }} className="w-full max-w-2xl rounded-[2rem] border border-white/25 bg-black/75 p-7 text-white shadow-2xl md:p-10">
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.4em] text-yellow-200">Next step</p>
                  <h2 className="text-3xl font-semibold md:text-5xl">{ctaDetails[ctaOpen].title}</h2>
                </div>

                <button onClick={() => setCtaOpen(null)} className="rounded-full border border-white/25 bg-white/10 p-3 transition hover:bg-yellow-300 hover:text-black">
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-3">
                {ctaDetails[ctaOpen].items.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    {item}
                  </div>
                ))}
              </div>

              <button className="mt-8 rounded-full bg-white px-7 py-3 text-sm font-bold text-black transition hover:bg-yellow-300">
                {ctaDetails[ctaOpen].button}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {flyArrow && (
          <motion.div
            initial={{
              position: "fixed",
              left: flyArrow.x,
              top: flyArrow.y,
              zIndex: 100,
            }}
            animate={{
              offsetDistance: "100%",
              rotate: [0, 15, 0],
              scale: [1, 1.2, 0.8],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            style={{
              offsetPath: "path('M0,0 C120,-120 260,120 420,0')",
            }}
            onUpdate={(latest) => {
              const progress = latest.offsetDistance
                ? parseFloat(latest.offsetDistance)
                : 0;

              // 🔥 FIRE ONCE ONLY
              if (progress > 0.35 && !activeModule) {
                setActiveModule(flyArrow.key);
              }
            }}
            onAnimationComplete={() => {
              setFlyArrow(null);
            }}
          >
            <ArrowRight
              size={42}
              className="text-yellow-300 drop-shadow-[0_0_25px_rgba(253,224,71,0.95)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Header() {
  return (
    <header className="absolute left-0 top-0 z-40 flex w-full items-start justify-between px-5 py-5 md:items-center md:px-8 md:py-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.32em] text-white/85 md:text-xs md:tracking-[0.45em]">
        </p>
        <h1 className="mt-1 text-xs font-semibold tracking-[0.25em] text-white md:text-sm md:tracking-[0.35em]">
          WEST EDMONTON MALL
        </h1>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="social">f</a>
        <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="social">X</a>
        <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="social">▶</a>
        <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="social">◎</a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="social">in</a>
      </div>
    </header>
  );
}

function FloorSideNav({ setActiveModule }) {
  return (
    <div className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 group md:block">
      <div className="flex flex-col gap-2 rounded-l-2xl border border-white/25 bg-black/40 p-2 backdrop-blur-xl">
        {floorLinks.map((item) => (
          <button key={item.key} onClick={() => setActiveModule(item.key)} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white transition hover:bg-yellow-300 hover:text-black">
            <span className="font-bold group-hover:hidden">{item.level.replace("LEVEL ", "")}</span>
            <span className="hidden whitespace-nowrap group-hover:block">{item.level} — {item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}