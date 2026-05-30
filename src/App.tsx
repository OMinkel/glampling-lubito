import { useState, useRef, useEffect } from 'react';
import './App.css';

interface GuestState {
  rooms: number;
  adults: number;
  children: number;
}

const TABS = [
  { id: 'Medellin', label: 'Medellín' },
  { id: 'Actividades', label: 'Cosas que hacer' },
  { id: 'Hoteles', label: 'Hoteles' },
  { id: 'Restaurantes', label: 'Restaurantes' },
  { id: 'Cruceros', label: 'Cruceros' },
  { id: 'Foros', label: 'Foros' },
];

const LISTINGS = [
  {
    id: 1,
    title: 'Domo Geodésico Vista Estelar',
    location: 'Guatapé · Antioquia',
    rating: 5.0,
    reviews: 142,
    category: 'Excelente',
    price: '$450.000',
    tags: ['Jacuzzi Privado', 'Desayuno', 'Pet Friendly'],
    img: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 2,
    title: 'Nido del Águila — Safari Luxury',
    location: 'Santa Elena · Medellín',
    rating: 4.8,
    reviews: 98,
    category: 'Excelente',
    price: '$380.000',
    tags: ['Fogata', 'Mirador 360°', 'Eco-Friendly'],
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 3,
    title: 'Cabaña Alpina en el Bosque',
    location: 'Envigado · Antioquia',
    rating: 4.7,
    reviews: 57,
    category: 'Muy bueno',
    price: '$520.000',
    tags: ['Calefacción', 'Spa', 'Vista Panorámica'],
    img: 'https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=85',
  },
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
  const [activeTab, setActiveTab] = useState('Hoteles');
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Buscar" defaultValue="Medellín" />
          </div>

          {/* Nav */}
          <nav className="header-nav">
            <a href="#descubrir" className="nav-link">Descubrir</a>
            <a href="#opinion" className="nav-link">Escribir opinión</a>
            <button type="button" className="icon-btn" aria-label="Notificaciones">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button type="button" className="lang-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              COP
            </button>
            <button type="button" className="login-btn">Iniciar sesión</button>
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
            <a href="#latam">América del Sur</a><span>›</span>
            <a href="#co">Colombia</a><span>›</span>
            <a href="#ant">Departamento de Antioquia</a><span>›</span>
            <a href="#med">Medellín</a><span>›</span>
            <a href="#hoteles">Hoteles en Medellín</a><span>›</span>
            <span className="crumb-current">Estancias de glamping en Medellín</span>
          </nav>
          <span className="crumbs-meta"><strong>5 mejores</strong> estancias de glamping en Medellín</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="search-card" ref={dropdownRef}>
            <h1 className="search-title">Estancias de glamping en Medellín</h1>
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
                  <span className="field-val">{guests.rooms} habitación, {totalGuests} huéspedes</span>
                </span>
                <span className="field-chevron"><ChevronDown /></span>
                {openDropdown === 'guests' && (
                  <div className="dropdown dropdown-guests" onClick={e => e.stopPropagation()}>
                    {[
                      { key: 'rooms',    label: 'Habitaciones',  sub: '' },
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

      {/* ── LISTINGS ── */}
      <main className="main">
        <div className="main-inner">
          <div className="listings-head">
            <h2 className="listings-title">Los mejores glampings cerca de Medellín</h2>
            <p className="listings-sub">Experiencias de lujo en medio de la naturaleza antioqueña</p>
          </div>

          <div className="cards-grid">
            {LISTINGS.map(item => (
              <article key={item.id} className="card">
                <div className="card-img-wrap">
                  <img src={item.img} alt={item.title} className="card-img" loading="lazy" />
                  <span className="card-badge">★ {item.category}</span>
                  <button type="button" className="card-save" aria-label="Guardar">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
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
                      <span className="card-price">{item.price} COP</span>
                      <span className="card-night"> / noche</span>
                    </div>
                    <button type="button" className="card-cta">Ver disponibilidad</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-brand">glamping<em>lubito</em></span>
          <span className="footer-copy">© {new Date().getFullYear()} Glamping Lubito · Medellín, Colombia</span>
          <div className="footer-links">
            <a href="#privacidad">Privacidad</a>
            <a href="#terminos">Términos</a>
            <a href="#contacto">Contacto</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
