import { useCarrito } from '../CarritoContext.jsx';
import { CATEGORIAS } from './Catalogo.jsx';

export function formatoPrecio(n) {
  return '$' + Number(n).toFixed(2);
}

export default function TarjetaProducto(props) {
  const producto = props.producto;
  const carrito = useCarrito();

  // Buscamos si el producto ya está en el carrito con un if tradicional
  const itemEncontrado = carrito.items.find((i) => i._id === producto._id);
  let enCarrito = 0;
  if (itemEncontrado) {
    enCarrito = itemEncontrado.cantidad;
  }

  const agotado = producto.stock <= 0;

  // Definimos el texto del botón usando condicionales claros
  let textoBoton = '🛒 Agregar al carrito';
  if (agotado) {
    textoBoton = 'Agotado';
  } else if (enCarrito > 0) {
    textoBoton = '🛒 Agregar otro (' + enCarrito + ' en carrito)';
  }

  return (
      <article className="tarjeta-producto">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="contenido-tarjeta">
          <span className="categoria-etiqueta">{CATEGORIAS[producto.categoria]}</span>
          <h3>{producto.nombre}</h3>
          <p>{producto.resumen}</p>
          <div className="precio-row">
            <span className="precio">{formatoPrecio(producto.precio)}</span>
            <button
                className="btn-secundario btn-chico"
                id={'ver-' + producto._id}
                onClick={() => props.onVer(producto)}
            >
              Ver Foto
            </button>
          </div>
          <button
              className="btn-agregar"
              id={'agregar-' + producto._id}
              disabled={agotado}
              onClick={() => carrito.agregar(producto)}
          >
            {textoBoton}
          </button>
        </div>
      </article>
  );
}