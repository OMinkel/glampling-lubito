import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="brand" onClick={closeMenu}>
                    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 4 C10 8, 6 10, 8 16 C10 12, 13 11, 14 8 C15 11, 18 12, 20 16 C22 10, 18 8, 14 4Z" fill="#7a9a5a"/>
                        <path d="M11 10 C8 13, 6 16, 8 21 C10 17, 12 16, 13 13 C14 16, 16 17, 18 21 C20 16, 18 13, 11 10Z" fill="#5a7a3a" opacity="0.85"/>
                        <line x1="14" y1="8" x2="14" y2="26" stroke="#5a7a3a" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="brand-name">Glamping lubito</span>
                </Link>

                <ul className="nav-links">
                    <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink></li>
                    <li><NavLink to="/planes" className={({ isActive }) => isActive ? 'active' : ''}>Planes</NavLink></li>
                    <li><NavLink to="/experiencias" className={({ isActive }) => isActive ? 'active' : ''}>Experiencias</NavLink></li>
                    <li><NavLink to="/reservas" className={({ isActive }) => isActive ? 'active' : ''}>Reservar</NavLink></li>
                </ul>

                <button className={`hamburger ${isOpen ? 'open' : ''}`} id="ham" aria-label="Abrir menú" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            <div className={`mobile-menu ${isOpen ? 'open' : ''}`} id="mobileMenu">
                <ul>
                    <li><NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink></li>
                    <li><NavLink to="/planes" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Planes</NavLink></li>
                    <li><NavLink to="/experiencias" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Experiencias</NavLink></li>
                    <li><NavLink to="/reservas" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Reservar</NavLink></li>
                </ul>
            </div>
        </>
    );
}
