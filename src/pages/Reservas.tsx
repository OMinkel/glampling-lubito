import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/reservas.css';

export default function Reservas() {
    const location = useLocation();
    const [plan, setPlan] = useState<string>(location.state?.plan || '');
    const [llegada, setLlegada] = useState<string>('');
    const [salida, setSalida] = useState<string>('');
    const [huespedes, setHuespedes] = useState<number>(1);
    const [addons, setAddons] = useState<string[]>([]);
    
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');

    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    const planPrices: Record<string, number> = {
        noche: 200000,
        ocasional: 120000,
        romantica: 260000
    };

    const addonPrices: Record<string, number> = {
        decoracion: 45000,
        fotos: 80000
    };

    useEffect(() => {
        let currentTotal = plan && planPrices[plan] ? planPrices[plan] : 0;

        if (llegada && salida) {
            const date1 = new Date(llegada);
            const date2 = new Date(salida);
            const diffTime = Math.abs(date2.getTime() - date1.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            if (diffDays > 0) {
                currentTotal = currentTotal * diffDays;
            }
        }

        addons.forEach(a => {
            currentTotal += addonPrices[a];
        });

        setTotal(currentTotal);
    }, [plan, llegada, salida, addons]);

    const toggleAddon = (addon: string) => {
        if (addons.includes(addon)) {
            setAddons(addons.filter(a => a !== addon));
        } else {
            setAddons([...addons, addon]);
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
    };

    const enviarReserva = () => {
        if (!plan) {
            alert('Por favor selecciona un plan.');
            return;
        }
        if (!nombre || !telefono) {
            alert('Por favor completa tu nombre y teléfono.');
            return;
        }
        setIsConfirmed(true);
        window.scrollTo(0, 0);
    };

    if (isConfirmed) {
        return (
            <main className="reservas-bg">
                <div className="reservas-overlay"></div>
                <div id="confirmacion">
                    <div className="confirm-box">
                        <div className="confirm-icon"><i className="fa-regular fa-circle-check"></i></div>
                        <h2 className="confirm-titulo">¡Reserva enviada!</h2>
                        <p className="confirm-texto">
                            Gracias, <strong>{nombre}</strong>. Hemos recibido tu solicitud para el plan <em>{plan}</em>.
                        </p>
                        <p className="confirm-texto">
                            Te contactaremos a <strong>{telefono}</strong> en menos de 24 horas para confirmar.
                        </p>
                        <div className="confirm-resumen">
                            <div className="conf-linea">
                                <span>Alojamiento</span>
                                <span>{plan}</span>
                            </div>
                            <div className="conf-linea">
                                <span>Llegada</span>
                                <span>{llegada || '-'}</span>
                            </div>
                            <div className="conf-linea">
                                <span>Salida</span>
                                <span>{salida || '-'}</span>
                            </div>
                            <div className="conf-linea">
                                <span>Huéspedes</span>
                                <span>{huespedes}</span>
                            </div>
                            <div className="conf-divider"></div>
                            <div className="conf-linea conf-total">
                                <span>Total estimado</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>
                        <Link to="/" className="conf-volver"><i className="fa-solid fa-arrow-left"></i> Volver al inicio</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="reservas-bg">
            <div className="reservas-overlay"></div>
            
            <div className="reservas-container">
                <div className="reservas-header-text">
                    <h1>Asegura tu <em>escapada</em></h1>
                    <p>Completa los detalles a continuación. No realizaremos ningún cargo en este momento.</p>
                </div>

                <div className="form-glass">
                    {/* PLAN */}
                    <div className="form-section">
                        <h3 className="section-title">1. Selecciona tu plan</h3>
                        <div className="cards-grid">
                            <div className={`card ${plan === 'noche' ? 'selected' : ''}`} onClick={() => setPlan('noche')}>
                                <span className="card-emoji">🌙</span>
                                <div className="card-name">Noche</div>
                                <div className="card-price">$200.000/noche</div>
                            </div>
                            <div className={`card ${plan === 'ocasional' ? 'selected' : ''}`} onClick={() => setPlan('ocasional')}>
                                <span className="card-emoji">🔥</span>
                                <div className="card-name">Ocasional</div>
                                <div className="card-price">$120.000/horas</div>
                            </div>
                            <div className={`card ${plan === 'romantica' ? 'selected' : ''}`} onClick={() => setPlan('romantica')}>
                                <span className="card-emoji">❤️</span>
                                <div className="card-name">Romántica</div>
                                <div className="card-price">$260.000/noche</div>
                            </div>
                        </div>
                    </div>

                    {/* DATES */}
                    <div className="form-section">
                        <h3 className="section-title">2. Fechas y Huéspedes</h3>
                        <div className="dates-grid">
                            <div className="field-group">
                                <label className="field-label">Llegada</label>
                                <div className="input-wrap">
                                    <i className="fa-regular fa-calendar input-icon"></i>
                                    <input type="date" value={llegada} onChange={(e) => setLlegada(e.target.value)} />
                                </div>
                            </div>
                            <div className="field-group">
                                <label className="field-label">Salida</label>
                                <div className="input-wrap">
                                    <i className="fa-regular fa-calendar input-icon"></i>
                                    <input type="date" value={salida} onChange={(e) => setSalida(e.target.value)} />
                                </div>
                            </div>
                            <div className="field-group">
                                <label className="field-label">Huéspedes</label>
                                <div className="input-wrap">
                                    <i className="fa-solid fa-user-group input-icon"></i>
                                    <input type="number" min="1" max="4" value={huespedes} onChange={(e) => setHuespedes(Number(e.target.value))} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ADDONS */}
                    <div className="form-section">
                        <h3 className="section-title">3. Adicionales <span className="optional">(Opcional)</span></h3>
                        <div className="addons-grid">
                            <div className={`addon-card ${addons.includes('decoracion') ? 'selected' : ''}`} onClick={() => toggleAddon('decoracion')}>
                                <div className="addon-check"><i className="fa-solid fa-check"></i></div>
                                <div className="addon-info">
                                    <div className="addon-name">Decoración especial</div>
                                    <div className="addon-price">+$45.000</div>
                                </div>
                            </div>
                            <div className={`addon-card ${addons.includes('fotos') ? 'selected' : ''}`} onClick={() => toggleAddon('fotos')}>
                                <div className="addon-check"><i className="fa-solid fa-check"></i></div>
                                <div className="addon-info">
                                    <div className="addon-name">Sesión de fotos</div>
                                    <div className="addon-price">+$80.000</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DATOS */}
                    <div className="form-section">
                        <h3 className="section-title">4. Tus Datos</h3>
                        <div className="data-grid">
                            <div className="field-group">
                                <label className="field-label">Nombre completo</label>
                                <div className="input-wrap">
                                    <i className="fa-regular fa-user input-icon"></i>
                                    <input type="text" placeholder="Ej. María García" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                            </div>
                            <div className="data-row-2">
                                <div className="field-group">
                                    <label className="field-label">Correo electrónico</label>
                                    <div className="input-wrap">
                                        <i className="fa-regular fa-envelope input-icon"></i>
                                        <input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field-group">
                                    <label className="field-label">Teléfono</label>
                                    <div className="input-wrap">
                                        <i className="fa-solid fa-phone input-icon"></i>
                                        <input type="tel" placeholder="+57 300…" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="field-group">
                                <label className="field-label">Solicitud especial</label>
                                <textarea placeholder="¿Celebras algo especial?" value={mensaje} onChange={(e) => setMensaje(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>

                    {/* TOTAL & SUBMIT */}
                    <div className="form-footer">
                        <div className="resumen-total">
                            <span>Total estimado:</span>
                            <span className="total-amount">{formatCurrency(total)}</span>
                        </div>
                        <button className="btn-submit" onClick={enviarReserva} disabled={!plan}>
                            {plan ? 'Solicitar Reserva' : 'Elige un plan'} <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}
