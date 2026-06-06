import { useState, useRef, useEffect } from 'react';
import './App.css';
import fotoGlam1 from './assets/foto-glam1.jpeg';
import fotoGlam2 from './assets/foto-glam2.jpeg';
import fotoGlam3 from './assets/foto-glam3.jpeg';
import decoAmor1 from './assets/deco-amor1.jpeg';
import decoAmor2 from './assets/deco-amor2.jpeg';
import decoCumple1 from './assets/deco-cumple1.jpeg';
import decoCumple2 from './assets/deco-cumple2.jpeg';
import decoCumple3 from './assets/deco-cumple3.jpeg';
import decoAmor3 from './assets/deco-amor3.jpeg';
import decoAmor4 from './assets/deco-amor4.jpeg';
import decoAmor5 from './assets/deco-amor5.jpeg';
import decoAmor6 from './assets/deco-amor6.jpeg';

interface GuestState {
  rooms: number;
  adults: number;
  children: number;
}

const TABS = [
  { id: 'Inicio', label: 'Inicio' },
  { id: 'Ubicacion', label: 'Ubicación' },
  { id: 'Contacto', label: 'Contacto' },
];

const LISTINGS = [
  {
    id: 1,
    title: 'Alojamiento por Noche',
    location: 'El Retiro · Antioquia',
    rating: 5.0,
    reviews: 142,
    category: 'Excelente',
    price: '$200.000',
    priceUnit: '/ noche',
    tags: ['Jacuzzi Privado', 'Cocina', 'Zona BBQ', 'Pet Friendly 🐾'],
    img: fotoGlam1,
    images: [fotoGlam1, fotoGlam2, fotoGlam3],
    details: {
      ubicacion: 'Vereda Lejos del Nido, Retiro – Antioquia. A 20 minutos del Retiro y 20 minutos de La Ceja.',
      incluye: [
        'Cama doble cómoda',
        'Jacuzzi privado',
        'Cocina equipada y nevera',
        'Baño privado con agua caliente',
        'Zona BBQ y fogata',
        'Iluminación cálida',
        'Espacio pet friendly 🐾'
      ],
      tarifasParejas: [
        { label: 'Noche fin de semana (viernes, sábado o domingo)', price: '$260.000' },
        { label: 'Noche entre semana (lunes, martes, miércoles o jueves)', price: '$200.000' }
      ],
      estanciaOcasional: [],
      momentoRapido: [],
      hasta4Personas: [
        { label: 'Fin de semana', price: '$380.000' },
        { label: 'Entre semana', price: '$320.000' }
      ],
      horarios: 'Check-in: 3:00 p.m. | Check-out: 1:00 p.m.',
      nota: '💦 Jacuzzi incluido en todas las noches.'
    }
  },
  {
    id: 2,
    title: 'Estancia Ocasional',
    location: 'El Retiro · Antioquia',
    rating: 5.0,
    reviews: 89,
    category: 'Escapada',
    price: '$160.000',
    priceUnit: '/ 6 horas',
    tags: ['Jacuzzi Incluido', '6 Horas', 'Relajación Total', 'Privacidad'],
    img: fotoGlam2,
    images: [fotoGlam2, fotoGlam3, fotoGlam1],
    details: {
      ubicacion: 'Vereda Lejos del Nido, Retiro – Antioquia. A 20 minutos del Retiro y 20 minutos de La Ceja.',
      incluye: [
        'Cama doble cómoda',
        'Jacuzzi privado',
        'Baño privado con agua caliente',
        'Privacidad y tranquilidad',
      ],
      tarifasParejas: [],
      hasta4Personas: [],
      estanciaOcasional: [
        { label: 'Tarifa única (6 horas con jacuzzi)', price: '$160.000' }
      ],
      momentoRapido: [],
      horarios: 'Estancia de 6 horas en el horario de tu preferencia (sujeto a disponibilidad).',
      nota: '💦 Jacuzzi privado incluido durante toda la estancia.'
    }
  },
  {
    id: 3,
    title: 'Momento Rápido',
    location: 'El Retiro · Antioquia',
    rating: 5.0,
    reviews: 56,
    category: 'Express',
    price: '$100.000',
    priceUnit: '/ 3 horas',
    tags: ['3 Horas', 'Desconexión', 'Opcional Jacuzzi'],
    img: fotoGlam3,
    images: [fotoGlam3, fotoGlam1, fotoGlam2],
    details: {
      ubicacion: 'Vereda Lejos del Nido, Retiro – Antioquia. A 20 minutos del Retiro y 20 minutos de La Ceja.',
      incluye: [
        'Cama doble cómoda',
        'Baño privado con agua caliente',
        'Privacidad garantizada'
      ],
      tarifasParejas: [],
      hasta4Personas: [],
      estanciaOcasional: [],
      momentoRapido: [
        { label: 'Tarifa con jacuzzi (3 horas)', price: '$120.000' },
        { label: 'Tarifa sin jacuzzi (3 horas)', price: '$100.000' }
      ],
      horarios: 'Estancia de 3 horas (sujeto a disponibilidad).',
      nota: 'Personaliza tu experiencia añadiendo o no el jacuzzi.'
    }
  }
];

const SERVICES = [
  {
    id: 1,
    title: 'Noche Romántica',
    description: 'Decoración especial con pétalos, velas y un ambiente lleno de amor para sorprender a tu pareja.',
    img: decoAmor1,
    images: [decoAmor1, decoAmor2, decoAmor3, decoAmor4],
    price: 'Consultar tarifa',
  },
  {
    id: 2,
    title: 'Aniversario',
    description: 'Celebra esa fecha especial con detalles únicos, vino y la mejor atención para que sea inolvidable.',
    img: decoAmor2,
    images: [decoAmor2, decoAmor5, decoAmor6, decoAmor1],
    price: 'Consultar tarifa',
  },
  {
    id: 3,
    title: 'Cumpleaños',
    description: 'Una decoración festiva con globos, pastel y mucha alegría para festejar rodeados de naturaleza.',
    img: decoCumple1,
    images: [decoCumple1, decoCumple2, decoCumple3],
    price: 'Consultar tarifa',
  }
];

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('Inicio');
  const [selectedListing, setSelectedListing] = useState<typeof LISTINGS[0] | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (imgs: string[]) => {
    if (imgs && imgs.length > 0) {
      setSelectedGallery(imgs);
      setGalleryIndex(0);
    }
  };
  const [openDropdown, setOpenDropdown] = useState<'checkin' | 'checkout' | 'guests' | null>(null);
  const [checkInDate, setCheckInDate] = useState(new Date(2026, 5, 7));
  const [checkOutDate, setCheckOutDate] = useState(new Date(2026, 5, 8));
  const [guests, setGuests] = useState<GuestState>({ rooms: 1, adults: 2, children: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fmt = (d: Date) => {
    const days = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${days[d.getDay()]}, ${String(d.getDate()).padStart(2, '0')} de ${months[d.getMonth()]}`;
  };

  const june2026 = (() => {
    const date = new Date(2026, 5, 1);
    const arr: (Date | null)[] = [];
    for (let i = 0; i < date.getDay(); i++) arr.push(null);
    while (date.getMonth() === 5) { arr.push(new Date(date)); date.setDate(date.getDate() + 1); }
    return arr;
  })();

  const handleDateSelect = (date: Date, type: 'checkin' | 'checkout') => {
    if (type === 'checkin') {
      setCheckInDate(date);
      if (date >= checkOutDate) {
        const next = new Date(date); next.setDate(date.getDate() + 1); setCheckOutDate(next);
      }
      setOpenDropdown('checkout');
    } else {
      if (date > checkInDate) { setCheckOutDate(date); setOpenDropdown(null); }
    }
  };

  const changeGuest = (field: keyof GuestState, op: 'add' | 'sub') => {
    setGuests(prev => {
      const min = field === 'children' ? 0 : 1;
      return { ...prev, [field]: op === 'add' ? prev[field] + 1 : Math.max(min, prev[field] - 1) };
    });
  };

  const totalGuests = guests.adults + guests.children;

  return (
    <div className="page">

      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-inner">
          {/* Logo */}
          <a href="/" className="logo">
            <span className="logo-mark">GL</span>
            <span className="logo-text">glamping<em>lubito</em></span>
          </a>

          {/* Search bar */}
          <div className="header-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Buscar fechas, huéspedes..." />
          </div>

          {/* Nav */}
          <nav className="header-nav">
            <button type="button" className="lang-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              COP
            </button>
            <button type="button" className="login-btn">Reservar ahora</button>
          </nav>
        </div>
      </header>

      {/* ── TABS ── */}
      <nav className="tabs-bar">
        <div className="tabs-inner">
          <ul className="tabs-list">
            {TABS.map(t => (
              <li key={t.id} className={activeTab === t.id ? 'active' : ''}>
                <button type="button" onClick={() => setActiveTab(t.id)}>{t.label}</button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── BREADCRUMBS ── */}
      <div className="breadcrumbs">
        <div className="breadcrumbs-inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#colombia">Colombia</a><span>›</span>
            <a href="#antioquia">Antioquia</a><span>›</span>
            <a href="#elretiro">El Retiro</a><span>›</span>
            <span className="crumb-current">Glamping Lubito</span>
          </nav>
        </div>
      </div>

      {/* ── HERO ── */}
      {activeTab === 'Inicio' && (
        <section className="hero">
          <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="search-card" ref={dropdownRef}>
            <h1 className="search-title">Reserva tu estancia en Glamping Lubito</h1>
            <div className="search-row">

              {/* Check-in */}
              <div
                className={`search-field ${openDropdown === 'checkin' ? 'open' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'checkin' ? null : 'checkin')}
              >
                <span className="field-icon"><CalendarIcon /></span>
                <span className="field-body">
                  <span className="field-label">Check-in</span>
                  <span className="field-val">{fmt(checkInDate)}</span>
                </span>
                <span className="field-chevron"><ChevronDown /></span>
                {openDropdown === 'checkin' && (
                  <div className="dropdown" onClick={e => e.stopPropagation()}>
                    <div className="dp-head"><span className="dp-title">Selecciona Check-in</span><span className="dp-month">Junio 2026</span></div>
                    <div className="cal-grid">
                      {['Do','Lu','Ma','Mi','Ju','Vi','Sá'].map(d => <div key={d} className="cal-weekday">{d}</div>)}
                      {june2026.map((date, i) => !date
                        ? <div key={`e${i}`} />
                        : <button key={date.toISOString()} type="button"
                            className={`cal-day ${date.toDateString() === checkInDate.toDateString() ? 'sel' : ''}`}
                            onClick={() => handleDateSelect(date, 'checkin')}>
                            {date.getDate()}
                          </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="search-divider" />

              {/* Check-out */}
              <div
                className={`search-field ${openDropdown === 'checkout' ? 'open' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'checkout' ? null : 'checkout')}
              >
                <span className="field-icon"><CalendarIcon /></span>
                <span className="field-body">
                  <span className="field-label">Check-out</span>
                  <span className="field-val">{fmt(checkOutDate)}</span>
                </span>
                <span className="field-chevron"><ChevronDown /></span>
                {openDropdown === 'checkout' && (
                  <div className="dropdown" onClick={e => e.stopPropagation()}>
                    <div className="dp-head"><span className="dp-title">Selecciona Check-out</span><span className="dp-month">Junio 2026</span></div>
                    <div className="cal-grid">
                      {['Do','Lu','Ma','Mi','Ju','Vi','Sá'].map(d => <div key={d} className="cal-weekday">{d}</div>)}
                      {june2026.map((date, i) => !date
                        ? <div key={`e${i}`} />
                        : <button key={date.toISOString()} type="button"
                            className={`cal-day ${date.toDateString() === checkOutDate.toDateString() ? 'sel' : ''}`}
                            disabled={date <= checkInDate}
                            onClick={() => handleDateSelect(date, 'checkout')}>
                            {date.getDate()}
                          </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="search-divider" />

              {/* Guests */}
              <div
                className={`search-field ${openDropdown === 'guests' ? 'open' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'guests' ? null : 'guests')}
              >
                <span className="field-icon"><UsersIcon /></span>
                <span className="field-body">
                  <span className="field-label">Habitaciones / huéspedes</span>
                  <span className="field-val">{guests.rooms} domo, {totalGuests} huéspedes</span>
                </span>
                <span className="field-chevron"><ChevronDown /></span>
                {openDropdown === 'guests' && (
                  <div className="dropdown dropdown-guests" onClick={e => e.stopPropagation()}>
                    {[
                      { key: 'rooms',    label: 'Domos/Cabañas', sub: '' },
                      { key: 'adults',   label: 'Adultos',       sub: 'Mayores de 13 años' },
                      { key: 'children', label: 'Niños',         sub: 'Edades de 0 a 12 años' },
                    ].map(({ key, label, sub }) => (
                      <div key={key} className="guest-row">
                        <div className="guest-info">
                          <span className="guest-label">{label}</span>
                          {sub && <span className="guest-sub">{sub}</span>}
                        </div>
                        <div className="guest-ctrl">
                          <button type="button" className="ctrl-btn"
                            disabled={(key === 'children' ? guests[key as keyof GuestState] <= 0 : guests[key as keyof GuestState] <= 1)}
                            onClick={() => changeGuest(key as keyof GuestState, 'sub')}>−</button>
                          <span className="ctrl-val">{guests[key as keyof GuestState]}</span>
                          <button type="button" className="ctrl-btn"
                            onClick={() => changeGuest(key as keyof GuestState, 'add')}>+</button>
                        </div>
                      </div>
                    ))}
                    <button type="button" className="done-btn" onClick={() => setOpenDropdown(null)}>Listo</button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
      )}

      {/* ── LISTINGS ── */}
      <main className="main">
        <div className="main-inner">
          {activeTab === 'Inicio' && (
            <>
              <div className="listings-head">
                <h2 className="listings-title">Nuestros Planes</h2>
                <p className="listings-sub">Descubre los alojamientos y planes que tenemos para que disfrutes de Glamping Lubito.</p>
              </div>

              <div className="cards-grid">
                {LISTINGS.map(item => (
                  <article key={item.id} className="card">
                    <div className="card-img-wrap">
                      <img src={item.img} alt={item.title} className="card-img" loading="lazy" style={{ cursor: 'pointer' }} onClick={() => openGallery(item.images)} />
                      <span className="card-badge">★ {item.category}</span>
                    </div>
                    <div className="card-body">
                      <div className="card-rating">
                        <span className="rating-pill">{item.rating.toFixed(1)}</span>
                        <span className="rating-label">{item.category}</span>
                        <span className="rating-count">{item.reviews} opiniones</span>
                      </div>
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-loc">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        {item.location}
                      </p>
                      <div className="card-tags">
                        {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                      <div className="card-foot">
                        <div>
                          <span className="card-price">Desde {item.price}</span>
                          <span className="card-night"> {item.priceUnit}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button type="button" className="card-cta-outline" onClick={() => setSelectedListing(item)}>Ver Tarifas</button>
                          <button type="button" className="card-cta">Reservar</button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* ── SERVICIOS ADICIONALES ── */}
              <div className="listings-head" style={{ marginTop: '80px' }}>
                <h2 className="listings-title">Servicios Adicionales</h2>
                <p className="listings-sub">Servicios totalmente independientes de los planes, pensados para hacer tu estadía aún más especial.</p>
              </div>

              <div className="cards-grid">
                {SERVICES.map(svc => (
                  <article key={svc.id} className="card">
                    <div className="card-img-wrap">
                      <img src={svc.img} alt={svc.title} className="card-img" loading="lazy" style={{ cursor: 'pointer' }} onClick={() => openGallery(svc.images)} />
                      <span className="card-badge">✨ Adicional</span>
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{svc.title}</h3>
                      <p style={{ color: '#6b7280', fontSize: '14.5px', lineHeight: '1.5', flex: 1, marginBottom: '24px' }}>
                        {svc.description}
                      </p>
                      <div className="card-foot">
                        <div>
                          <span className="card-price" style={{ fontSize: '17px' }}>{svc.price}</span>
                        </div>
                        <button type="button" className="card-cta-outline">Añadir</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === 'Ubicacion' && (
            <div className="location-section">
              <div className="listings-head">
                <h2 className="listings-title">Ubicación</h2>
                <p className="listings-sub">Descubre cómo llegar a nuestro oasis de tranquilidad.</p>
              </div>
              <div className="contact-grid" style={{ display: 'grid', gap: '24px' }}>
                <div className="contact-card" style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <p style={{ marginBottom: '16px', color: '#374151', fontSize: '16px', lineHeight: '1.6' }}>
                    <strong>📍 Dirección:</strong> Vereda Lejos del Nido, Retiro – Antioquia.<br/><br/>
                    Nos encontramos a tan solo 20 minutos de El Retiro y 20 minutos de La Ceja. El acceso es apto para cualquier tipo de vehículo.
                  </p>
                  <div style={{ width: '100%', height: '400px', backgroundColor: '#f3f4f6', borderRadius: '12px', overflow: 'hidden' }}>
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.702967664673!2d-75.467885!3d6.061805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e469904d60a5e8f%3A0xc39f2010c7b645b2!2sEl%20Retiro%2C%20Antioquia!5e0!3m2!1sen!2sco!4v1700000000000" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Contacto' && (
            <div className="contact-section">
              <div className="listings-head">
                <h2 className="listings-title">Contacto</h2>
                <p className="listings-sub">¿Tienes alguna duda o quieres hacer una reserva especial? Contáctanos.</p>
              </div>
              <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div className="contact-card" style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>📱</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>WhatsApp</h3>
                  <p style={{ color: '#6b7280', marginBottom: '24px' }}>Escríbenos para una atención más rápida y personalizada.</p>
                  <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: '#25D366', color: '#fff', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'all 0.2s ease' }}>Enviar Mensaje</a>
                </div>
                <div className="contact-card" style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>📸</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Instagram</h3>
                  <p style={{ color: '#6b7280', marginBottom: '24px' }}>Síguenos para ver fotos, videos y promociones.</p>
                  <a href="https://instagram.com/lubito_2" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: '#E1306C', color: '#fff', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'all 0.2s ease' }}>@lubito_2</a>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-brand">glamping<em>lubito</em></span>
          <span className="footer-copy">© {new Date().getFullYear()} Glamping Lubito · El Retiro, Antioquia, Colombia</span>
        </div>
      </footer>

      {/* ── GALLERY MODAL ── */}
      {selectedGallery && (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.95)', zIndex: 2000 }} onClick={() => setSelectedGallery(null)}>
          <button className="modal-close" style={{ top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', color: '#fff' }} onClick={() => setSelectedGallery(null)}>✕</button>
          
          <button className="modal-close" style={{ top: '50%', left: '20px', background: 'rgba(255,255,255,0.1)', color: '#fff', transform: 'translateY(-50%)' }} onClick={(e) => { e.stopPropagation(); setGalleryIndex(prev => prev === 0 ? selectedGallery.length - 1 : prev - 1); }}>‹</button>

          <img src={selectedGallery[galleryIndex]} alt="Gallery" style={{ maxHeight: '85vh', maxWidth: '85vw', objectFit: 'contain', borderRadius: '12px', userSelect: 'none' }} onClick={e => e.stopPropagation()} />

          <button className="modal-close" style={{ top: '50%', right: '20px', background: 'rgba(255,255,255,0.1)', color: '#fff', transform: 'translateY(-50%)' }} onClick={(e) => { e.stopPropagation(); setGalleryIndex(prev => prev === selectedGallery.length - 1 ? 0 : prev + 1); }}>›</button>

          <div style={{ position: 'absolute', bottom: '24px', color: '#fff', fontWeight: 600, fontSize: '16px', letterSpacing: '2px' }}>
            {galleryIndex + 1} / {selectedGallery.length}
          </div>
        </div>
      )}

      {/* ── MODAL DETALLES ── */}
      {selectedListing && (
        <div className="modal-overlay" onClick={() => setSelectedListing(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedListing(null)}>✕</button>
            
            <div className="modal-header">
              <h3 className="modal-title">{selectedListing.title} - Tarifas 2026</h3>
              <div className="modal-subtitle">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {selectedListing.details?.ubicacion}
              </div>
            </div>

            <div className="modal-body">
              {selectedListing.details && (
                <>
                  {selectedListing.details.incluye.length > 0 && (
                    <div className="modal-section">
                      <h4 className="modal-section-title">🛖 El alojamiento incluye</h4>
                      <ul className="modal-list">
                        {selectedListing.details.incluye.map((inc, i) => (
                          <li key={i}>{inc}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedListing.details.tarifasParejas.length > 0 && (
                    <div className="modal-section">
                      <h4 className="modal-section-title">💰 Tarifas Parejas</h4>
                      {selectedListing.details.tarifasParejas.map((t, i) => (
                        <div key={i} className="price-row">
                          <span className="price-label">{t.label}</span>
                          <span className="price-val">{t.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedListing.details.hasta4Personas.length > 0 && (
                    <div className="modal-section">
                      <h4 className="modal-section-title">👨‍👩‍👧‍👦 Hasta 4 personas</h4>
                      {selectedListing.details.hasta4Personas.map((t, i) => (
                        <div key={i} className="price-row">
                          <span className="price-label">{t.label}</span>
                          <span className="price-val">{t.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedListing.details.estanciaOcasional.length > 0 && (
                    <div className="modal-section">
                      <h4 className="modal-section-title">⏰ Estancia ocasional (6 horas)</h4>
                      {selectedListing.details.estanciaOcasional.map((t, i) => (
                        <div key={i} className="price-row">
                          <span className="price-label">{t.label}</span>
                          <span className="price-val">{t.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedListing.details.momentoRapido.length > 0 && (
                    <div className="modal-section">
                      <h4 className="modal-section-title">⚡ Momento rápido (3 horas)</h4>
                      {selectedListing.details.momentoRapido.map((t, i) => (
                        <div key={i} className="price-row">
                          <span className="price-label">{t.label}</span>
                          <span className="price-val">{t.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="modal-info-box">
                    <div className="modal-info-text">🕒 {selectedListing.details.horarios}</div>
                    {selectedListing.details.nota && (
                      <div className="modal-info-text">{selectedListing.details.nota}</div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
