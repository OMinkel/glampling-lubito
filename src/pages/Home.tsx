import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
    return (
        <main>
            {/* HERO */}
            <section className="hero">
                <div className="overlay"></div>
                <div className="hero-content">
                    <span className="ubicacion">ANTIOQUIA · COLOMBIA</span>

                    <h1>
                        Donde la naturaleza
                        <span>te abraza de noche</span>
                    </h1>

                    <p>
                        Escapa de la rutina y descubre un refugio entre montañas. 
                        Disfruta del confort, la tranquilidad y la magia de reconectar con la naturaleza.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/reservas" className="btn-primary">Reservar ahora</Link>
                        <Link to="/planes" className="btn-secondary">Ver planes</Link>
                    </div>

                    <div className="scroll">
                        <span className="scroll-label">DESLIZA</span>
                        <div className="scroll-line"></div>
                    </div>
                </div>
            </section>

            {/* PLANES */}
            <section className="planes">
                <div className="planes-header">
                    <span>NUESTROS PLANES PRINCIPALES</span>

                    <h2>
                        Disfruta nuestros planes con<br />
                        <em>el sonido relajante del agua</em>
                    </h2>
                </div>

                <div className="cards-planes">
                    {/* Noche */}
                    <div className="card card-noche">
                        <div className="badge">Familiar</div>
                        <div className="icono">🌙</div>
                        <h3>Noche</h3>
                        <p>
                            Regálate una pausa. Escucha el sonido del agua, respira aire puro y déjate abrazar por la tranquilidad de la naturaleza. Entre montañas, estrellas y momentos de paz, aquí encontrarás el descanso que mereces.
                        </p>
                        <div className="precio">
                            <span>Desde</span>
                            <h4>$200.000<span>/noche</span></h4>
                        </div>
                        <div className="capacidad">
                            👥 hasta 4
                        </div>
                    </div>

                    {/* Ocasional */}
                    <div className="card card-ocasional">
                        <div className="badge">Más popular</div>
                        <div className="icono">🔥</div>
                        <h3>Ocasional</h3>
                        <p>
                            Disfruta de glamping Lubito a tu ritmo. Ya sea por unas horas o durante toda la experiencia, encontrarás el espacio perfecto para desconectarte de la rutina y reconectar con la tranquilidad de la naturaleza.
                        </p>
                        <div className="precio">
                            <span>Desde</span>
                            <h4>$120.000<span>/por horas</span></h4>
                        </div>
                        <div className="capacidad">
                            👥 hasta 2
                        </div>
                    </div>
                </div>
            </section>

            <section className="lubito-hero">
                <div className="lubito-content">
                    <h2 className="lubito-title">
                        Cada noche en Lubito
                        <span className="lubito-italic">es inolvidable</span>
                    </h2>
                    <p className="lubito-sub">
                        Pocas plazas disponibles cada fin de semana. Reserva con anticipación y asegura tu escapada.
                    </p>
                    <Link to="/reservas" className="lubito-btn">Ver disponibilidad →</Link>
                </div>
            </section>
        </main>
    );
}
