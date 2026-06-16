export default function Footer() {
    return (
        <>
            {/* WHATSAPP */}
            <a href="https://wa.me/573234875109" target="_blank" rel="noreferrer" className="whatsapp-flotante">
                <i className="fa-brands fa-whatsapp"></i>
            </a>

            {/* FOOTER */}
            <footer className="lubito-footer">
                <div className="footer-content">
                    <div className="footer-icon">🌿</div>

                    <div className="footer-brand">
                        <span className="footer-logo">Glamping lubito</span>
                        <p className="footer-location">Retiro, Antioquia · Colombia</p>
                    </div>

                    <div className="footer-divider"></div>

                    <div className="footer-contact">
                        <a href="tel:+573234875109" className="contact-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8734a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
                            </svg>
                            +57 323 487 5109
                        </a>
                        <span className="contact-dot">·</span>
                        <a href="mailto:lubitoglampig@gmail.com" className="contact-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c084b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                            </svg>
                            lubitoglampig@gmail.com
                        </a>
                        <span className="contact-dot">·</span>
                        <span className="contact-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8734a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                            Vereda Lejos del nido, Retiro, Antioquia
                        </span>
                    </div>

                    <p className="footer-copy">© 2026 Glamping lubito · Todos los derechos reservados</p>
                </div>
            </footer>
        </>
    );
}
