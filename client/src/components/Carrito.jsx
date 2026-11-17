import { useCarrito } from '../CarritoContext.jsx';
import { dinero } from '../pedido.js';

export default function Carrito(props) {
    const carrito = useCarrito();
    const items = carrito.items;

    function manejarCambioInput(id, valorTexto) {
        let nuevaCantidad = Number(valorTexto);
        if (!nuevaCantidad || nuevaCantidad < 1) {
            nuevaCantidad = 1;
        }
        carrito.cambiarCantidad(id, nuevaCantidad);
    }

    let textoProductos = carrito.totalProductos + ' productos';
    if (carrito.totalProductos === 1) {
        textoProductos = '1 producto';
    }

    return (
        <section className="seccion-bloque pantalla" id="carrito">
            <h2 className="seccion-titulo">Tu carrito 🛒</h2>

            {items.length === 0 ? (
                <div className="caja-pendiente">
                    <span aria-hidden="true">🌸</span>
                    <p>Tu carrito está vacío.</p>
                    <button className="btn-ver" id="carrito-ir-catalogo" onClick={props.onSeguir}>
                        Ver el catálogo
                    </button>
                </div>
            ) : (
                <>
                    <div className="carrito-lista">
                        {items.map((i) => (
                            <article key={i._id} className="carrito-item">
                                <img src={i.imagen} alt={i.nombre} />
                                <div className="carrito-info">
                                    <h3>{i.nombre}</h3>
                                    <p className="carrito-unitario">Precio unitario: {dinero(i.precio)}</p>
                                    <div className="cantidad">
                                        <button
                                            aria-label="Disminuir"
                                            id={'menos-' + i._id}
                                            onClick={() => carrito.cambiarCantidad(i._id, i.cantidad - 1)}
                                            disabled={i.cantidad <= 1}
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            aria-label="Cantidad"
                                            value={i.cantidad}
                                            onChange={(e) => manejarCambioInput(i._id, e.target.value)}
                                        />
                                        <button
                                            aria-label="Aumentar"
                                            id={'mas-' + i._id}
                                            onClick={() => carrito.cambiarCantidad(i._id, i.cantidad + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="carrito-derecha">
                                    <strong className="carrito-subtotal">
                                        {dinero(i.precio * i.cantidad)}
                                    </strong>
                                    <button
                                        className="btn-link btn-quitar"
                                        id={'quitar-' + i._id}
                                        onClick={() => carrito.eliminar(i._id)}
                                    >
                                        🗑 Eliminar
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="carrito-total">
                        <p>{textoProductos}</p>
                        <p className="total-grande">Total: {dinero(carrito.total)}</p>
                        <div className="carrito-botones">
                            <button className="btn-secundario" id="carrito-seguir" onClick={props.onSeguir}>
                                ← Seguir comprando
                            </button>
                            <button className="btn-calcular" id="carrito-continuar" onClick={props.onContinuar}>
                                Continuar con el pedido
                            </button>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}