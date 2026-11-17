const PASOS = [
  { n: 1, t: 'Elige tus productos', d: 'Explora el catálogo, toca “Ver Foto” para ver el detalle y presiona “Agregar al carrito”.' },
  { n: 2, t: 'Revisa tu carrito', d: 'Abre 🛒 Carrito para cambiar cantidades, eliminar productos o seguir comprando. Verás el subtotal y el total.' },
  { n: 3, t: 'Completa tus datos', d: 'Pulsa “Continuar con el pedido” e ingresa tu nombre, celular, ciudad, dirección y una referencia de ubicación.' },
  { n: 4, t: 'Envíalo por WhatsApp', d: 'Presiona “Enviar pedido por WhatsApp”: se abre el chat con tu pedido ya escrito. Solo debes presionar “Enviar”.' },
  { n: 5, t: 'Espera nuestra confirmación', d: 'Te responderemos por WhatsApp para confirmar tu pedido, el pago y la entrega. 💜' },
];

export default function ComoPedir() {
  return (
    <section id="pedido" className="seccion-bloque">
      <h2 className="seccion-titulo">Cómo realizar tu pedido</h2>
      <p className="seccion-intro">Comprar en Warmicita es simple: sigue estos cinco pasos.</p>

      <ol className="pasos">
        {PASOS.map((p) => (
          <li key={p.n} className="paso">
            <span className="paso-num">{p.n}</span>
            <div><h3>{p.t}</h3><p>{p.d}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
