import { useEffect, useState } from 'react';
import { useCarrito } from '../CarritoContext.jsx';
import { formatoPrecio } from './TarjetaProducto.jsx';

export default function ModalProducto({ producto, onCerrar }) {
  const { agregar } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const agotado = producto.stock <= 0;
  const maximo = producto.stock > 0 ? producto.stock : 1;

  // Cerrar con la tecla Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCerrar();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCerrar]);

  const agregarYCerrar = () => {
    agregar(producto, cantidad);
    onCerrar();
  };

  return (
    <div className="modal-overlay abierto" onClick={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="modal-contenido">
        <button className="btn-cerrar" id="modal-cerrar" onClick={onCerrar} aria-label="Cerrar">&times;</button>
        <img src={producto.imagen} alt={producto.nombre} />
        <h3>{producto.nombre}</h3>
        <div className="modal-precio">{formatoPrecio(producto.precio)}</div>
        <p>{producto.descripcion}</p>
        {agotado && <p className="stock agotado">⛔ Agotado por ahora</p>}

        {!agotado && (
          <div className="cantidad cantidad-modal">
            <button aria-label="Disminuir" onClick={() => setCantidad(Math.max(1, cantidad - 1))}>−</button>
            <input
              type="number" min="1" max={maximo} aria-label="Cantidad" value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, Math.min(maximo, Number(e.target.value) || 1)))}
            />
            <button aria-label="Aumentar" onClick={() => setCantidad(Math.min(maximo, cantidad + 1))}>+</button>
          </div>
        )}

        <button className="btn-agregar" id="modal-agregar" disabled={agotado} onClick={agregarYCerrar}>
          {agotado ? 'Agotado' : `🛒 Agregar al carrito · ${formatoPrecio(producto.precio * cantidad)}`}
        </button>
      </div>
    </div>
  );
}
