import { useEffect, useState } from 'react';
import { useCarrito } from '../CarritoContext.jsx';
import { formatoPrecio } from './TarjetaProducto.jsx';

export default function ModalProducto(props) {
  const producto = props.producto;
  const carrito = useCarrito();

  const [cantidad, setCantidad] = useState(1);
  const agotado = producto.stock <= 0;

  let maximo = 1;
  if (producto.stock > 0) {
    maximo = producto.stock;
  }

  // Cerrar con la tecla Escape
  useEffect(function () {
    function alPresionarTecla(e) {
      if (e.key === 'Escape') {
        props.onCerrar();
      }
    }

    window.addEventListener('keydown', alPresionarTecla);

    return function () {
      window.removeEventListener('keydown', alPresionarTecla);
    };
  }, [props]);

  function disminuirCantidad() {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  }

  function aumentarCantidad() {
    if (cantidad < maximo) {
      setCantidad(cantidad + 1);
    }
  }

  function cambiarCantidadManual(valorTexto) {
    let nueva = Number(valorTexto);
    if (!nueva || nueva < 1) {
      nueva = 1;
    }
    if (nueva > maximo) {
      nueva = maximo;
    }
    setCantidad(nueva);
  }

  function agregarYCerrar() {
    carrito.agregar(producto, cantidad);
    props.onCerrar();
  }

  function clicEnFondo(e) {
    if (e.target === e.currentTarget) {
      props.onCerrar();
    }
  }

  let textoBoton = '🛒 Agregar al carrito · ' + formatoPrecio(producto.precio * cantidad);
  if (agotado) {
    textoBoton = 'Agotado';
  }

  return (
      <div className="modal-overlay abierto" onClick={clicEnFondo}>
        <div className="modal-contenido">
          <button
              className="btn-cerrar"
              id="modal-cerrar"
              onClick={props.onCerrar}
              aria-label="Cerrar"
          >
            &times;
          </button>

          <img src={producto.imagen} alt={producto.nombre} />
          <h3>{producto.nombre}</h3>
          <div className="modal-precio">{formatoPrecio(producto.precio)}</div>
          <p>{producto.descripcion}</p>

          {agotado && <p className="stock agotado">⛔ Agotado por ahora</p>}

          {!agotado && (
              <div className="cantidad cantidad-modal">
                <button aria-label="Disminuir" onClick={disminuirCantidad}>
                  −
                </button>
                <input
                    type="number"
                    min="1"
                    max={maximo}
                    aria-label="Cantidad"
                    value={cantidad}
                    onChange={function (e) {
                      cambiarCantidadManual(e.target.value);
                    }}
                />
                <button aria-label="Aumentar" onClick={aumentarCantidad}>
                  +
                </button>
              </div>
          )}

          <button
              className="btn-agregar"
              id="modal-agregar"
              disabled={agotado}
              onClick={agregarYCerrar}
          >
            {textoBoton}
          </button>
        </div>
      </div>
  );
}