import { useCarrito } from '../CarritoContext.jsx';
import { CATEGORIAS } from './Catalogo.jsx';

export const formatoPrecio = (n) => `$${Number(n).toFixed(2)}`;

export default function TarjetaProducto({ producto, onVer }) {
  const { agregar, items } = useCarrito();
  const enCarrito = items.find((i) => i._id === producto._id)?.cantidad || 0;
  const agotado = producto.stock <= 0;

  return (
    <article className="tarjeta-producto">
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="contenido-tarjeta">
        <span className="categoria-etiqueta">{CATEGORIAS[producto.categoria]}</span>
        <h3>{producto.nombre}</h3>
        <p>{producto.resumen}</p>
        <div className="precio-row">
          <span className="precio">{formatoPrecio(producto.precio)}</span>
          <button className="btn-secundario btn-chico" id={`ver-${producto._id}`} onClick={() => onVer(producto)}>
            Ver Foto
          </button>
        </div>
        <button
          className="btn-agregar" id={`agregar-${producto._id}`}
          disabled={agotado} onClick={() => agregar(producto)}
        >
          {agotado ? 'Agotado' : enCarrito > 0 ? `🛒 Agregar otro (${enCarrito} en carrito)` : '🛒 Agregar al carrito'}
        </button>
      </div>
    </article>
  );
}
