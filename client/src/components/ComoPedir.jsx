const PASOS = [
    {
        numero: 1,
        titulo: 'Elige tus productos',
        descripcion: 'Explora el catálogo, toca “Ver Foto” para ver el detalle y presiona “Agregar al carrito”.',
    },
    {
        numero: 2,
        titulo: 'Revisa tu carrito',
        descripcion: 'Abre 🛒 Carrito para cambiar cantidades, eliminar productos o seguir comprando. Verás el subtotal y el total.',
    },
    {
        numero: 3,
        titulo: 'Completa tus datos',
        descripcion: 'Pulsa “Continuar con el pedido” e ingresa tu nombre, celular, ciudad, dirección y una referencia de ubicación.',
    },
    {
        numero: 4,
        titulo: 'Envíalo por WhatsApp',
        descripcion: 'Presiona “Enviar pedido por WhatsApp”: se abre el chat con tu pedido ya escrito. Solo debes presionar “Enviar”.',
    },
    {
        numero: 5,
        titulo: 'Espera nuestra confirmación',
        descripcion: 'Te responderemos por WhatsApp para confirmar tu pedido, el pago y la entrega. 💜',
    },
];

export default function ComoPedir() {
    return (
        <section id="pedido" className="seccion-bloque">
            <h2 className="seccion-titulo">Cómo realizar tu pedido</h2>
            <p className="seccion-intro">Comprar en Warmicita es simple: sigue estos cinco pasos.</p>

            <ol className="pasos">
                {PASOS.map(function (paso) {
                    return (
                        <li key={paso.numero} className="paso">
                            <span className="paso-num">{paso.numero}</span>
                            <div className="paso-card">
                                <h3>{paso.titulo}</h3>
                                <p>{paso.descripcion}</p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}