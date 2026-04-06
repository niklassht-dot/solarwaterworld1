/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Anchor, 
  Sun, 
  Waves, 
  Clock, 
  Users, 
  Euro, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight,
  ArrowUp,
  ShieldCheck,
  Wifi,
  Music,
  Coffee,
  Accessibility
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Tour {
  id: number;
  title: string;
  duration: string;
  capacity: string;
  times: string[];
  price: string;
  features: string[];
  image: string;
}

interface Ship {
  id: number;
  name: string;
  year: string;
  capacity: string;
  recommended: { summer: string; winter: string };
  features: string[];
  description: string;
  image: string;
}

interface Milestone {
  date: string;
  title: string;
  description: string;
}

// --- Data ---

const TOURS: Tour[] = [
  {
    id: 1,
    title: "Berlin Highlight Tour",
    duration: "2,5 Stunden",
    capacity: "bis 90 Personen",
    times: ["12:00", "15:00"],
    price: "ab 29,50 € / Person",
    features: ["Barrierefrei", "Audioguide in 7 Sprachen"],
    image: "https://www.berlin-welcomecard.de/system/files/styles/theme_bwc_hero_low_full_xs_1x/private/images/blick_auf_die_museumsinsel_berlin_welcomecard.jpg?h=822c77c6&itok=0X08J6AQ"
  },
  {
    id: 2,
    title: "Exclusive Highlight Tour (SunCat 46)",
    duration: "2,5 Stunden",
    capacity: "bis 36 Personen",
    times: ["10:00", "13:00", "16:00"],
    price: "ab 35,50 € / Person",
    features: ["Halt am Fischerinsel-Hafen", "Barrierefrei", "Audioguide"],
    image: "https://www.solarwaterworld.de/wp-content/uploads/sites/3/2023/02/Solon09_2022_web-803A5795-Edit.jpg"
  },
  {
    id: 3,
    title: "Sunset Tour",
    duration: "2,5 Stunden",
    capacity: "Groß & Klein",
    times: ["18:30", "19:30"],
    price: "Preis auf Anfrage",
    features: ["Romantische Atmosphäre", "Solar-elektrisch leise"],
    image: "https://cdn-imgix.headout.com/media/images/65764407ca6ec718c2b2c4fa8bae0fe1-AdobeStock-288103840.jpeg?w=1041.6000000000001&h=651&crop=faces&auto=compress%2Cformat&fit=min"
  },
  {
    id: 4,
    title: "Abend-Illumination Tour",
    duration: "2,5 Stunden",
    capacity: "Konvoi aus 3–4 Schiffen",
    times: ["20:00"],
    price: "Preis auf Anfrage",
    features: ["Beleuchtete Schiffe", "Einzigartiges Erlebnis"],
    image: "https://www.visitberlin.de/system/files/styles/visitberlin_gallery_item_visitberlin_mobile_1x/private/image/Festival_of_Lights_Illumination_586610515_c_GettyImages_fhm_web.jpg.jpg?itok=G6EVfbQl"
  }
];

const FLEET: Ship[] = [
  {
    id: 1,
    name: "SunCat 46",
    year: "Zertifiziert 2014",
    capacity: "46 Personen (+2 Crew)",
    recommended: { summer: "36 Pers.", winter: "20 Pers." },
    features: ["Barrierefrei (inkl. WC)", "Innen- & Außenlautsprecher", "Bar & Catering", "WLAN (Aufpreis)"],
    description: "Berlins erstes klimaneutrales Fahrgastschiff.",
    image: "https://www.solarwaterworld.de/wp-content/uploads/sites/3/2023/02/suncat46_ch3_slide6.png"
  },
  {
    id: 2,
    name: "SunCat 58 „Solon“",
    year: "In Betrieb seit 2010",
    capacity: "55 Personen (inkl. Crew)",
    recommended: { summer: "45 Pers.", winter: "26 Pers." },
    features: ["25 Außensitzplätze", "Barrierefrei (inkl. WC)", "Soundsystem", "Bar & Catering"],
    description: "Getauft vom Berliner Bürgermeister. Ein Klassiker der Solarflotte.",
    image: "https://www.solarwaterworld.de/wp-content/uploads/sites/3/2023/02/SOLON_ch1_banner.png"
  },
  {
    id: 3,
    name: "SunCat 120 „Hermine“",
    year: "In Betrieb seit 2020",
    capacity: "180 Personen (inkl. Crew)",
    recommended: { summer: "130–140 Pers.", winter: "50–70 Pers." },
    features: ["2 Bars (innen & außen)", "Tanzfläche", "14 Bestuhlung-Layouts", "Barrierefrei"],
    description: "Berlins modernstes Solarschiff für große Events.",
    image: "https://www.berlin.de/binaries/asset/image_assets/6229428/source/1594368340/1000x500/"
  }
];

const MILESTONES: Milestone[] = [
  { date: "Nov 2024", title: "Weihnachtspost per Solarboot", description: "Deutsche Post liefert per Solarboot nach Himmelpfort." },
  { date: "Aug 2023", title: "DHL-Erweiterung", description: "350 Pakete täglich emissionsfrei per Solarboot." },
  { date: "Okt 2022", title: "Cargo-Partnerschaft", description: "Start der Kooperation Solarwaterworld × DHL × BEHALA." },
  { date: "Mai 2022", title: "GoBoat-Partnerschaft", description: "6 Picnic-18-Boote am Berliner Osthafen." }
];

// --- Components ---

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'active' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-bottom border-slate-100">
        <nav className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-secondary">
              <Anchor size={24} />
            </div>
            <div>
              <span className="text-xl font-bold text-primary block leading-none">Solarwaterworld</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Solar-Ahoi</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#touren" className="nav-link">Touren</a>
            <a href="#flotte" className="nav-link">Flotte</a>
            <a href="#charter" className="nav-link">Charter</a>
            <a href="#kontakt" className="nav-link">Kontakt</a>
            <button className="btn btn-primary px-5 py-2 text-sm">Jetzt Buchen</button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menü öffnen"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 right-0 bg-white border-t border-slate-100 shadow-2xl md:hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <a href="#touren" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 hover:bg-slate-50 rounded-lg">Touren</a>
                <a href="#flotte" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 hover:bg-slate-50 rounded-lg">Flotte</a>
                <a href="#charter" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 hover:bg-slate-50 rounded-lg">Charter</a>
                <a href="#kontakt" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 hover:bg-slate-50 rounded-lg">Kontakt</a>
                <button className="btn btn-primary w-full mt-2">Jetzt Buchen</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10" />
            <img 
              src="https://www.solarwaterworld.de/schiffstouren/wp-content/uploads/sites/4/2022/08/banner.jpg" 
              alt="Solarboot in Berlin" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="section-padding relative z-20 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <Sun size={14} /> 100% Solar-Elektrisch
              </div>
              <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
                Solar-Ahoi.<br />
                <span className="text-secondary italic">Schifffahrt neu erleben.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-slate-200 font-light max-w-xl">
                Erleben Sie Berlin vom Wasser aus – nachhaltig, leise und klimaneutral. Wasser ist Leben.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#touren" className="btn btn-secondary">Touren entdecken</a>
                <a href="#charter" className="btn border-2 border-white/30 text-white hover:bg-white/10">Charter anfragen</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-white border-y border-slate-100 py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8 md:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                <Waves size={24} />
              </div>
              <div>
                <span className="block font-bold">Emissionsfrei</span>
                <span className="text-xs text-slate-500">Kein CO2, kein Lärm</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                <Accessibility size={24} />
              </div>
              <div>
                <span className="block font-bold">Barrierefrei</span>
                <span className="text-xs text-slate-500">Inkl. WC an Bord</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                <ShieldCheck size={24} />
              </div>
              <div>
                <span className="block font-bold">Sicher & Modern</span>
                <span className="text-xs text-slate-500">Zertifizierte Flotte</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                <Music size={24} />
              </div>
              <div>
                <span className="block font-bold">Audioguide</span>
                <span className="text-xs text-slate-500">In 7 Sprachen</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tours Section */}
        <section id="touren" className="section-padding">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-primary">Unsere Schiffstouren</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Entdecken Sie die Highlights Berlins auf unseren öffentlichen Rundfahrten. 
              Leise gleiten wir durch die Stadt, während Sie die Aussicht genießen.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TOURS.map((tour, idx) => (
              <ScrollReveal key={tour.id} className={`delay-${idx * 100}`}>
                <div className="card h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={tour.image} 
                      alt={tour.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                      {tour.duration}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl mb-4 text-primary leading-tight">{tour.title}</h3>
                    <div className="space-y-2 mb-6 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-primary-light" />
                        <span>Abfahrten: {tour.times.join(' / ')} Uhr</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-primary-light" />
                        <span>{tour.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Euro size={16} className="text-primary-light" />
                        <span className="font-bold text-primary">{tour.price}</span>
                      </div>
                    </div>
                    <ul className="space-y-1 mb-6">
                      {tour.features.map((f, i) => (
                        <li key={i} className="text-xs flex items-center gap-2 text-slate-500">
                          <CheckCircle2 size={14} className="text-green-500" /> {f}
                        </li>
                      ))}
                    </ul>
                    <button className="btn btn-primary w-full py-2 text-sm mt-auto">Details & Buchung</button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal className="mt-12 p-6 bg-blue-50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                <Music size={24} />
              </div>
              <p className="text-sm md:text-base text-primary font-medium">
                <strong>Audioguide inklusive:</strong> Deutsch, Englisch, Französisch, Spanisch, Italienisch, Russisch, Hebräisch
              </p>
            </div>
            <button className="text-primary font-bold flex items-center gap-1 hover:underline">
              Mehr erfahren <ChevronRight size={20} />
            </button>
          </ScrollReveal>
        </section>

        {/* Fleet Section */}
        <section id="flotte" className="bg-slate-900 text-white py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4 text-secondary">Die Solarflotte</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Unsere Schiffe sind 100 % solar-elektrisch und bieten höchsten Komfort für Ihre Fahrt durch Berlin.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
              {FLEET.map((ship) => (
                <ScrollReveal key={ship.id} className="h-full">
                  <div className="group flex flex-col h-full">
                    <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                      <img 
                        src={ship.image} 
                        alt={ship.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      <div className="absolute bottom-4 left-6">
                        <h3 className="text-2xl font-bold text-white">{ship.name}</h3>
                        <span className="text-secondary text-sm font-medium">{ship.year}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-6 italic min-h-[3rem]">"{ship.description}"</p>
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                        <span className="text-slate-400">Max. Kapazität</span>
                        <span className="font-bold">{ship.capacity}</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                        <span className="text-slate-400">Empfehlung Sommer</span>
                        <span className="font-bold">{ship.recommended.summer}</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                        <span className="text-slate-400">Empfehlung Winter</span>
                        <span className="font-bold">{ship.recommended.winter}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {ship.features.map((f, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-slate-300 border border-white/10">
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <button className="w-full py-3 border border-secondary/30 text-secondary rounded-full font-bold hover:bg-secondary hover:text-primary transition-all">
                        Schiff anfragen
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Charter Section */}
        <section id="charter" className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full -z-10" />
                <img 
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/a2/fb/34/der-solarkatamaran-solon.jpg?w=1200&h=900&s=1" 
                  alt="Charter Event" 
                  className="rounded-3xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl hidden md:block max-w-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={24} />
                    </div>
                    <span className="font-bold text-primary">Alles Inklusive</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Kapitän, Servicepersonal, Getränkeservice & individuelle Routenwahl für Ihr Event.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl mb-6 text-primary">Ihr privates Event auf dem Wasser</h2>
              <p className="text-lg text-slate-600 mb-8">
                Ob Geburtstag, Hochzeit oder Firmenevent – unsere Solarschiffe bieten den perfekten Rahmen für unvergessliche Momente.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex gap-4">
                  <div className="text-primary-light mt-1"><Coffee size={20} /></div>
                  <div>
                    <h4 className="font-bold mb-1">Catering</h4>
                    <p className="text-sm text-slate-500">Buffet, BBQ oder exklusives Sitzessen auf Anfrage.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary-light mt-1"><Music size={20} /></div>
                  <div>
                    <h4 className="font-bold mb-1">Entertainment</h4>
                    <p className="text-sm text-slate-500">DJ-Service und modernes Soundsystem (innen/außen).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary-light mt-1"><Wifi size={20} /></div>
                  <div>
                    <h4 className="font-bold mb-1">Konnektivität</h4>
                    <p className="text-sm text-slate-500">Highspeed WLAN für Ihre Gäste (auf Aufpreis).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary-light mt-1"><Accessibility size={20} /></div>
                  <div>
                    <h4 className="font-bold mb-1">Barrierefrei</h4>
                    <p className="text-sm text-slate-500">Alle Schiffe sind für Rollstuhlfahrer geeignet.</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-primary rounded-3xl text-white">
                <h4 className="text-xl font-bold mb-4">Jetzt unverbindlich anfragen</h4>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-secondary" required />
                    <input type="email" placeholder="E-Mail" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-secondary" required />
                  </div>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-secondary text-white/60">
                    <option value="">Anlass wählen</option>
                    <option value="geburtstag">Geburtstag</option>
                    <option value="hochzeit">Hochzeit</option>
                    <option value="firmenevent">Firmenevent</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                  <textarea placeholder="Ihre Nachricht" rows={3} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-secondary" required></textarea>
                  <button type="submit" className="btn btn-secondary w-full">Anfrage senden</button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4 text-primary">Meilensteine & Presse</h2>
              <p className="text-slate-500">Innovation und Nachhaltigkeit seit über einem Jahrzehnt.</p>
            </ScrollReveal>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/10 hidden md:block" />
              
              <div className="space-y-12">
                {MILESTONES.map((m, idx) => (
                  <ScrollReveal key={idx} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                      <div className={`p-6 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-md ${idx % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                        <span className="text-primary-light font-bold text-sm mb-2 block">{m.date}</span>
                        <h4 className="text-lg font-bold text-primary mb-2">{m.title}</h4>
                        <p className="text-sm text-slate-500">{m.description}</p>
                      </div>
                    </div>
                    <div className="relative z-10 w-4 h-4 bg-secondary rounded-full border-4 border-white shadow-md hidden md:block" />
                    <div className="md:w-1/2" />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="kontakt" className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <ScrollReveal className="lg:col-span-1">
              <h2 className="text-4xl mb-8 text-primary">Kontakt</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Standort</h4>
                    <p className="text-sm text-slate-500">
                      Schlesische Straße 28, 10997 Berlin
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Waves size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Hafen (Abfahrt)</h4>
                    <p className="text-sm text-slate-500">
                      Stralauer Allee 3, 10245 Berlin<br />
                      (hinter nhow Hotel)
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Telefon</h4>
                    <a href="tel:+4930814534960" className="text-sm text-slate-500 hover:text-primary transition-colors">+49 (0)30 814 534 960</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">E-Mail</h4>
                    <a href="mailto:info@solarwaterworld.de" className="text-sm text-slate-500 hover:text-primary transition-colors">info@solarwaterworld.de</a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-2">
              <div className="h-full min-h-[400px] bg-slate-200 rounded-3xl overflow-hidden relative">
                {/* Placeholder for Map */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                  <div className="text-center p-8">
                    <MapPin size={48} className="text-primary/20 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium italic">Interaktive Karte lädt...</p>
                  </div>
                </div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.847424564567!2d13.43987137713318!3d52.49861693754021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e4f766d749d%3A0x421b14534960!2sSchlesische%20Str.%2028%2C%2010997%20Berlin!5e0!3m2!1sde!2sde!4v1712395000000!5m2!1sde!2sde" 
                  className="absolute inset-0 w-full h-full border-0 grayscale opacity-80"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-primary">
                  <Anchor size={18} />
                </div>
                <span className="text-xl font-bold">Solarwaterworld</span>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                Pionier der emissionsfreien Schifffahrt in Berlin. Seit über 10 Jahren leise und sauber auf der Spree.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/solarwaterworld" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com/solarwaterworld.de" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Schnellzugriff</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#touren" className="hover:text-secondary transition-colors">Schiffstouren</a></li>
                <li><a href="#flotte" className="hover:text-secondary transition-colors">Unsere Flotte</a></li>
                <li><a href="#charter" className="hover:text-secondary transition-colors">Charter & Events</a></li>
                <li><a href="#kontakt" className="hover:text-secondary transition-colors">Kontakt</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Geschäftsführung</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>
                  <span className="block text-white font-medium">Tim-Derek Schultze (CEO)</span>
                  <span className="text-xs">Business Development & Produktmanagement</span>
                </li>
                <li>
                  <span className="block text-white font-medium">Louise Ahrens (CEO)</span>
                  <span className="text-xs">Touren, Charter, Marketing & Personal</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Rechtliches</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="https://www.solarwaterworld.de/impressum/" className="hover:text-secondary transition-colors">Impressum</a></li>
                <li><a href="https://www.solarwaterworld.de/datenschutzbestimmungen/" className="hover:text-secondary transition-colors">Datenschutz</a></li>
                <li><a href="https://www.solarwaterworld.de/agbs/" className="hover:text-secondary transition-colors">AGB</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Solarwaterworld AG. Alle Rechte vorbehalten.</p>
            <p>Design & Entwicklung mit ❤️ für die Umwelt.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-secondary text-primary rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-yellow-400 transition-colors"
            aria-label="Nach oben scrollen"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
