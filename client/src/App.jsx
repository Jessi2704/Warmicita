import { useState } from 'react';
import Catalogo from './components/Catalogo.jsx';
import Calculadora from './components/Calculadora.jsx';
import PreguntaSinVerguenza from './components/PreguntaSinVerguenza.jsx';
import AprendeCuerpo from './components/AprendeCuerpo.jsx';
import ConoceCiclo from './components/ConoceCiclo.jsx';
import MetodosAnticonceptivos from './components/MetodosAnticonceptivos.jsx';
import ComoPedir from './components/ComoPedir.jsx';
import Carrito from './components/Carrito.jsx';
import Entrega from './components/Entrega.jsx';
import PedidoListo from './components/PedidoListo.jsx';
import PaginaInicio from './components/PaginaInicio.jsx';
import { useCarrito } from './CarritoContext.jsx';
import { nuevoCodigo } from './pedido.js';

const TABS = [
  { id: 'tienda', label: 'Tienda',   emoji: '🛍️', sub: 'Catálogo y pedidos' },
  { id: 'ciclo',  label: 'Mi Ciclo', emoji: '🌸', sub: 'Calculadora y fases' },
  { id: 'aprende',label: 'Aprende',  emoji: '📚', sub: 'Cuerpo y métodos'    },
];

export default function App() {
  // pantalla: 'home' | 'contenido' | 'carrito' | 'entrega' | 'listo'
  const [pantalla, setPantalla] = useState('home');
  const [tab, setTab]           = useState('tienda');
  const [pedido, setPedido]     = useState(null);
  const [cicloData, setCicloData] = useState(null);
  const { items, total, totalProductos, vaciar } = useCarrito();

  /* Navegar a sección desde la página de inicio */
  const entrarSeccion = (seccionId) => {
    setTab(seccionId);
    setPantalla('contenido');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cambiarTab = (id) => {
    setTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const irHome = () => {
    setPantalla('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmarPedido = (cliente) => {
    setPedido({ codigo: nuevoCodigo(), fecha: new Date().toISOString(), cliente, items, total });
    vaciar();
    setPantalla('listo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Encabezado ── */}
      <header>
        <button className="logo-btn" onClick={irHome} aria-label="Ir al inicio">
          <img className="logo" src="/logo_oficial.png" alt="Logo Warmicita" />
        </button>
        <div>
          <h1>Warmicita</h1>
          <p className="lema">
            Tu bienestar comienza con conocerte.<br />
            Un espacio para aprender, cuidarte y sentirte segura de ti misma.
          </p>
        </div>
      </header>

      {/* ── Barra de pestañas (solo cuando estamos en contenido) ── */}
      {pantalla === 'contenido' && (
        <nav className="tabs-nav" aria-label="Secciones principales">
          <button className="tab-inicio-btn" onClick={irHome} title="Inicio">
            <span className="tab-emoji">🏠</span>
            <span className="tab-label">Inicio</span>
            <span className="tab-sub">Página principal</span>
          </button>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${tab === t.id ? 'activa' : ''}`}
              onClick={() => cambiarTab(t.id)}
              aria-current={tab === t.id ? 'page' : undefined}
            >
              <span className="tab-emoji">{t.emoji}</span>
              <span className="tab-label">{t.label}</span>
              <span className="tab-sub">{t.sub}</span>
            </button>
          ))}
        </nav>
      )}

      {/* ── Contenido principal ── */}
      <main id="inicio">

        {/* Página de inicio */}
        {pantalla === 'home' && (
          <PaginaInicio onEntrar={entrarSeccion} />
        )}

        {/* Secciones con tabs */}
        {pantalla === 'contenido' && (
          <>
            {tab === 'tienda' && (
              <>
                <section className="banner">
                  <div className="banner-texto">
                    <h2>Todo lo que necesitas para sentirte bien</h2>
                    <p>Productos seleccionados para cuidar de ti con comodidad y confianza.</p>
                  </div>
                </section>
                <Catalogo />
                <ComoPedir />
                <section id="beneficios" className="info-seccion">
                  <h2>Por qué elegir opciones sostenibles para tu salud:</h2>
                  <ul>
                    <li><strong>Cuidado corporal:</strong> Productos libres de blanqueadores clorados y químicos agresivos.</li>
                    <li><strong>Ahorro económico:</strong> La copa menstrual y las toallas lavables duran años.</li>
                    <li><strong>Sostenibilidad:</strong> Reducción directa de desechos plásticos en el medio ambiente.</li>
                  </ul>
                </section>
              </>
            )}

            {tab === 'ciclo' && (
              <>
                <Calculadora onCalculo={setCicloData} />
                <ConoceCiclo cicloData={cicloData} />
              </>
            )}

            {tab === 'aprende' && (
              <>
                <PreguntaSinVerguenza />
                <AprendeCuerpo />
                <MetodosAnticonceptivos />
              </>
            )}
          </>
        )}

        {/* Flujo de compra */}
        {pantalla === 'carrito' && (
          <Carrito
            onSeguir={() => { setPantalla('contenido'); setTab('tienda'); }}
            onContinuar={() => setPantalla('entrega')}
          />
        )}
        {pantalla === 'entrega' && (
          <Entrega onVolver={() => setPantalla('carrito')} onConfirmar={confirmarPedido} />
        )}
        {pantalla === 'listo' && pedido && (
          <PedidoListo
            pedido={pedido}
            onTienda={() => { setPantalla('contenido'); setTab('tienda'); }}
          />
        )}
      </main>

      {/* ── Carrito flotante ── */}
      {(pantalla === 'home' || pantalla === 'contenido') && totalProductos > 0 && (
        <button
          className="carrito-flotante" id="carrito-flotante"
          onClick={() => setPantalla('carrito')}
          aria-label={`Abrir carrito, ${totalProductos} productos`}
        >
          🛒
          <span className="badge">{totalProductos}</span>
        </button>
      )}

      <footer>
        <img className="logo-footer" src="/logo_oficial.png" alt="" />
        <p>&copy; 2026 Warmicita - Cuidado Femenino y Menstrual. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
