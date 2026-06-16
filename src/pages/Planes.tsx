import { useNavigate } from 'react-router-dom';
import '../styles/planes.css';

export default function Planes() {
    const navigate = useNavigate();

    const irAReservar = (plan: string) => {
        navigate('/reservas', { state: { plan } });
    };

    return (
        <main>
            <section className="planes-section">
                <div className="planes-header">
                    <p className="planes-label">PLANES</p>
                    <h2 className="planes-title">Elige tu <em>plan</em></h2>
                    <p className="planes-subtitle">Todos incluyen: Parqueadero, wifi, agua caliente, zona de asados y zona de fogatas.</p>
                </div>

                <div className="planes-lista">

                    {/* PLAN 1 */}
                    <div className="plan-row">
                        <div className="plan-card" style={{ backgroundImage: 'url("/Experiencias/IMG/6.jpeg")' }}>
                            <div className="plan-card-overlay"></div>
                            <span className="card-badge">Familiar</span>
                            <div className="card-content">
                                <h2 className="card-title">Noche</h2>
                                <p className="card-desc">Duerme bajo un cielo estrellado y déjate envolver por la magia de nuestro lago y la tranquilidad de la naturaleza.</p>
                                <p className="card-price-label">Por noche desde</p>
                                <p className="card-price">$200.000</p>
                            </div>
                        </div>
                        <div className="plan-includes">
                            <p className="includes-label">INCLUYE</p>
                            <ul className="includes-list">
                                <li>Televisor</li>
                                <li>Jacuzzi exterior</li>
                                <li>Bafle</li>
                                <li>Fogata</li>
                            </ul>
                            <p className="plan-capacity"><i className="fa-solid fa-user-group"></i> Hasta 4 personas</p>
                            <button onClick={() => irAReservar('noche')} className="btn-reservar">Reservar este plan →</button>
                        </div>
                    </div>

                    {/* PLAN 2 */}
                    <div className="plan-row">
                        <div className="plan-card" style={{ backgroundImage: 'url("/Experiencias/IMG/4.jpeg")' }}>
                            <div className="plan-card-overlay"></div>
                            <span className="card-badge">Más popular</span>
                            <div className="card-content">
                                <h2 className="card-title">Ocasional</h2>
                                <p className="card-desc">Refugio de madera rodeado de árboles centenarios con sendero privado al río.</p>
                                <p className="card-price-label">Por horas desde</p>
                                <p className="card-price">$120.000</p>
                            </div>
                        </div>
                        <div className="plan-includes">
                            <p className="includes-label">INCLUYE</p>
                            <ul className="includes-list">
                                <li>1 habitación</li>
                                <li>Fogata privada</li>
                                <li>Hamacas</li>
                                <li>Cocina rústica</li>
                            </ul>
                            <p className="plan-capacity"><i className="fa-solid fa-user-group"></i> Hasta 2 personas</p>
                            <button onClick={() => irAReservar('ocasional')} className="btn-reservar">Reservar este plan →</button>
                        </div>
                    </div>

                    {/* PLAN 3 */}
                    <div className="plan-row">
                        <div className="plan-card" style={{ backgroundImage: 'url("/Experiencias/IMG/2.jpg")' }}>
                            <div className="plan-card-overlay"></div>
                            <span className="card-badge">Decoración Romántica</span>
                            <div className="card-content">
                                <h2 className="card-title">Noche Romántica</h2>
                                <p className="card-desc">Una experiencia íntima con fogata privada, cielo abierto y total inmersión en la naturaleza.</p>
                                <p className="card-price-label">Por noche desde</p>
                                <p className="card-price">$260.000</p>
                            </div>
                        </div>
                        <div className="plan-includes">
                            <p className="includes-label">INCLUYE</p>
                            <ul className="includes-list">
                                <li>Cama queen</li>
                                <li>Fogata privada</li>
                                <li>Kit de s'mores</li>
                                <li>Sillas Adirondack</li>
                            </ul>
                            <p className="plan-capacity"><i className="fa-solid fa-user-group"></i> Hasta 2 personas</p>
                            <button onClick={() => irAReservar('romantica')} className="btn-reservar">Reservar este plan →</button>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
