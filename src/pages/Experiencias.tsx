import { useState } from 'react';
import '../styles/experiencias.css';

export default function Experiencias() {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    const images = [
        "/Experiencias/IMG/1.jpeg",
        "/Experiencias/IMG/2.jpg",
        "/Experiencias/IMG/3.jpeg",
        "/Experiencias/IMG/4.jpeg",
        "/Experiencias/IMG/5.jpeg",
        "/Experiencias/IMG/6.jpeg",
        "/Experiencias/IMG/7.jpeg",
        "/Experiencias/IMG/8.jpeg"
    ];

    const openModal = (src: string) => setSelectedImg(src);
    const closeModal = () => setSelectedImg(null);

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
                    {images.map((src, i) => (
                        <div className="collage-item" key={i} onClick={() => openModal(src)}>
                            <div className="collage-placeholder">
                                <img src={src} alt={`Experiencia ${i + 1}`} loading="lazy" />
                                <div className="zoom-icon">
                                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* LIGHTBOX MODAL */}
            {selectedImg && (
                <div className="lightbox" onClick={closeModal}>
                    <div className="lightbox-close" onClick={closeModal}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <img src={selectedImg} alt="Experiencia expandida" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
                </div>
            )}

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
                                <div className="llegar-icon"><i className="fa-solid fa-location-dot"></i></div>
                                <div>
                                    <p className="llegar-item-title">Dirección</p>
                                    <p className="llegar-item-desc">Vereda Lejos del Nido, Retiro, Antioquia, Colombia</p>
                                </div>
                            </div>
                            <div className="llegar-item">
                                <div className="llegar-icon"><i className="fa-solid fa-car"></i></div>
                                <div>
                                    <p className="llegar-item-title">Desde Medellín</p>
                                    <p className="llegar-item-desc">~40 minutos por la vía Las Palmas. Ruta señalizada desde el peaje.</p>
                                </div>
                            </div>
                            <div className="llegar-item">
                                <div className="llegar-icon"><i className="fa-solid fa-bus"></i></div>
                                <div>
                                    <p className="llegar-item-title">Transporte público</p>
                                    <p className="llegar-item-desc">Bus desde Terminal del Sur hacia Retiro. Avisanos y coordinamos recogida.</p>
                                </div>
                            </div>
                            <div className="llegar-item">
                                <div className="llegar-icon"><i className="fa-brands fa-whatsapp"></i></div>
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
