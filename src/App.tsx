import { useState, useRef, useEffect } from 'react';
import './App.css';

interface GuestState {
  rooms: number;
  adults: number;
  children: number;
}

const TABS = [
  { id: 'Alojamientos', label: 'Nuestros Domos' },
  { id: 'Servicios', label: 'Servicios' },
  { id: 'Ubicacion', label: 'Ubicación' },
  { id: 'Contacto', label: 'Contacto' },
];

const LISTINGS = [
  {
    id: 1,
    title: 'Glamping Lubito',
    location: 'El Retiro · Antioquia',
    rating: 5.0,
    reviews: 142,
    category: 'Excelente',
    price: '$450.000',
    tags: ['Jacuzzi Privado', 'Desayuno', 'Naturaleza', 'Malla Catamarán'],
    img: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=85',
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
  const [activeTab, setActiveTab] = useState('Alojamientos');
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

      {/* ── LISTINGS ── */}
      <main className="main">
        <div className="main-inner">
          <div className="listings-head">
            <h2 className="listings-title">Conoce nuestros alojamientos</h2>
            <p className="listings-sub">Disfruta de la naturaleza en El Retiro con todas las comodidades de un hotel cinco estrellas.</p>
          </div>

          <div className="cards-grid">
            {LISTINGS.map(item => (
              <article key={item.id} className="card">
                <div className="card-img-wrap">
                  <img src={item.img} alt={item.title} className="card-img" loading="lazy" />
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
                      <span className="card-price">{item.price} COP</span>
                      <span className="card-night"> / noche</span>
                    </div>
                    <button type="button" className="card-cta">Reservar</button>
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
          <span className="footer-copy">© {new Date().getFullYear()} Glamping Lubito · El Retiro, Antioquia, Colombia</span>
        </div>
      </footer>

    </div>
  );
}

export default App;
