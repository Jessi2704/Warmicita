import { dinero, enlaceWhatsApp } from '../pedido.js';
import { WHATSAPP_PENDIENTE } from '../config.js';

export default function PedidoListo(props) {
    const pedido = props.pedido;

    function enviarWhatsApp() {
        // Abre WhatsApp con el mensaje listo; la clienta debe presionar "Enviar"
        const url = enlaceWhatsApp(pedido);
        window.open(url, '_blank', 'noopener');
    }

    return (
        <section className="seccion-bloque pantalla" id="pedido-listo">
            <h2 className="seccion-titulo">¡Tu pedido está listo! 💜</h2>
            <p className="seccion-intro">
                Código de pedido: <strong>{pedido.codigo}</strong>. Envíalo por WhatsApp para que lo confirmemos.
            </p>

            <div className="carrito-total">
                <ul className="resumen-lista">
                    {pedido.items.map((i) => (
                        <li key={i._id}>
                            <span>{i.nombre} x{i.cantidad}</span>
                            <strong>{dinero(i.precio * i.cantidad)}</strong>
                        </li>
                    ))}
                </ul>
                <p className="total-grande">Total: {dinero(pedido.total)}</p>

                {WHATSAPP_PENDIENTE && (
                    <p className="estado estado-error">
                        ⚠️ Falta configurar el número de WhatsApp de la tienda (VITE_WHATSAPP_NUMBER en client/.env).
                    </p>
                )}

                <div className="carrito-botones">
                    <button className="btn-whatsapp" id="pedido-whatsapp" onClick={enviarWhatsApp}>
                        Enviar pedido por WhatsApp
                    </button>
                </div>
                <p className="aviso">El mensaje se abrirá listo en WhatsApp; solo debes presionar “Enviar”.</p>
                <button className="btn-link" id="pedido-tienda" onClick={props.onTienda}>
                    Volver a la tienda
                </button>
            </div>
        </section>
    );
}