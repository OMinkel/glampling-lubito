import '../styles/experiencias.css';

export default function Experiencias() {
    return (
        <main>
            <section className="hero" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.70)), url("/Experiencias/IMG/Fondo.jpeg")' }}>
                <div className="hero-inner">
                    <p className="hero-eyebrow">En Glamping Lubito</p>
                    <h2 className="hero-title">Cada detalle es una <em>experiencia</em></h2>
                    <p className="hero-sub">
                        Diseñamos cada rincón para que la conexión con la naturaleza sea<br />
                        profunda, sensorial y memorable.
                    </p>
                </div>
            </section>

            <section className="collage-wrapper">
                <div className="collage">
                    {[
                        { src: "/Experiencias/IMG/1.jpeg", alt: "Glamping lubito", label: "Glamping lubito" },
                        { src: "/Experiencias/IMG/2.jpg", alt: "Fogata", label: "Fogata" },
                        { src: "/Experiencias/IMG/3.jpeg", alt: "Jacuzzi", label: "Jacuzzi" },
                        { src: "/Experiencias/IMG/4.jpeg", alt: "Naturaleza", label: "Naturaleza" },
                        { src: "/Experiencias/IMG/5.jpeg", alt: "Fogón", label: "Fogón" },
                        { src: "/Experiencias/IMG/6.jpeg", alt: "Cielo", label: "Cielo" },
                        { src: "/Experiencias/IMG/7.jpeg", alt: "Desayuno", label: "Desayuno" },
                        { src: "/Experiencias/IMG/8.jpeg", alt: "Jardín", label: "Jardín" }
                    ].map((img, i) => (
                        <div className="collage-item" key={i}>
                            <div className="collage-placeholder">
                                <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                </svg>
                                <img src={img.src} alt={img.alt} />
                            </div>
                            <span className="collage-label">{img.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="llegar-section">
                <div className="llegar-inner">
                    <div className="llegar-header">
                        <p className="llegar-eyebrow">Encuéntranos</p>
                        <h2 className="llegar-title">Cómo <em>llegar</em></h2>
                        <p className="llegar-sub">A 40 minutos de Medellín, en las montañas de Retiro, Antioquia.</p>
                    </div>

                    <div className="llegar-grid">
                        <div className="llegar-mapa">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.6241444265747!2d-75.47798998907243!3d6.046194428499893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e46909de3fc7dad%3A0xf3f30d613a73d06!2sLejos%20del%20Nido%2C%20Retiro%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1781310749173!5m2!1ses!2sco"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación Glamping Lubito">
                            </iframe>
                        </div>

                        <div className="llegar-info">
                            <div className="llegar-item">
                                <div className="llegar-icon">📍</div>
                                <div>
                                    <p className="llegar-item-title">Dirección</p>
                                    <p className="llegar-item-desc">Vereda Lejos del Nido, Retiro, Antioquia, Colombia</p>
                                </div>
                            </div>
                            <div className="llegar-item">
                                <div className="llegar-icon">🚗</div>
                                <div>
                                    <p className="llegar-item-title">Desde Medellín</p>
                                    <p className="llegar-item-desc">~40 minutos por la vía Las Palmas. Ruta señalizada desde el peaje.</p>
                                </div>
                            </div>
                            <div className="llegar-item">
                                <div className="llegar-icon">🚌</div>
                                <div>
                                    <p className="llegar-item-title">Transporte público</p>
                                    <p className="llegar-item-desc">Bus desde Terminal del Sur hacia Retiro. Avisanos y coordinamos recogida.</p>
                                </div>
                            </div>
                            <div className="llegar-item">
                                <div className="llegar-icon">📱</div>
                                <div>
                                    <p className="llegar-item-title">¿Te perdiste?</p>
                                    <p className="llegar-item-desc">Escríbenos por WhatsApp y te guiamos en tiempo real.</p>
                                </div>
                            </div>

                            <a
                                href="https://maps.app.goo.gl/9TnWXbaBdfiuDs1y6"
                                target="_blank"
                                rel="noreferrer"
                                className="llegar-btn">
                                Abrir en Google Maps →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
