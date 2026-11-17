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
import { useCarrito } from './CarritoContext.jsx';
import { nuevoCodigo } from './pedido.js';
import MenuTarjetas from './components/MenuTarjetas.jsx';


export default function App() {
  // vista: 'tienda' | 'carrito' | 'entrega' | 'listo'
  const [vista, setVista] = useState('tienda');
  const [pedido, setPedido] = useState(null);
  const [cicloData, setCicloData] = useState(null);
  const { items, total, totalProductos, vaciar } = useCarrito();

  // Cambia de pantalla y sube al inicio (o baja a una sección de la tienda)
  const ir = (nueva, hash) => {
    setVista(nueva);
    setTimeout(() => {
      if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const clickMenu = (e, hash) => {
    e.preventDefault();
    ir('tienda', hash);
  };

  // Crea el pedido con código y fecha, y vacía el carrito
  const confirmarPedido = (cliente) => {
    setPedido({ codigo: nuevoCodigo(), fecha: new Date().toISOString(), cliente, items, total });
    vaciar();
    ir('listo');
  };

  return (
    <>
      <header>
        <img className="logo" src="/logo_oficial.png" alt="Logo Warmicita" />
        <div>
          <h1>Warmicita</h1>
          <p className="lema">
            Tu bienestar comienza con conocerte.<br />
            Un espacio para aprender, cuidarte y sentirte segura de ti misma.
          </p>
        </div>
      </header>

      {vista === 'tienda' && (
        <MenuTarjetas onIr={clickMenu} onCarrito={() => ir('carrito')} totalProductos={totalProductos} />
      )}

      <main id="inicio">
        {vista === 'tienda' && (
          <>
            <section className="banner">
              <div className="banner-texto">
                <h2>Todo lo que necesitas para sentirte bien</h2>
                <p>Productos seleccionados para cuidar de ti con comodidad y confianza.</p>
              </div>
            </section>

            <Catalogo />
            <ComoPedir />
            <Calculadora onCalculo={setCicloData} />
            <ConoceCiclo cicloData={cicloData} />
            <PreguntaSinVerguenza />
            <AprendeCuerpo />
            <MetodosAnticonceptivos />

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

        {vista === 'carrito' && (
          <Carrito onSeguir={() => ir('tienda', '#catalogo')} onContinuar={() => ir('entrega')} />
        )}
        {vista === 'entrega' && (
          <Entrega onVolver={() => ir('carrito')} onConfirmar={confirmarPedido} />
        )}
        {vista === 'listo' && pedido && (
          <PedidoListo pedido={pedido} onTienda={() => ir('tienda', '#catalogo')} />
        )}
      </main>

      {/* Carrito flotante: se ve por toda la página mientras haya productos */}
      {vista === 'tienda' && totalProductos > 0 && (
        <button className="carrito-flotante" id="carrito-flotante" onClick={() => ir('carrito')} aria-label={`Abrir carrito, ${totalProductos} productos`}>
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
