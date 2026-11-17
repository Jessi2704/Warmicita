// Iconos de línea (SVG) para las tarjetas del menú
const Icono = ({ d }) => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d.map((p) => <path key={p} d={p} />)}
  </svg>
);

const ITEMS = [
  { hash: '#catalogo', titulo: 'Catálogo', sub: 'Productos y precios',
    d: ['M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z', 'M3 6h18', 'M16 10a4 4 0 0 1-8 0'] },
  { hash: '#pedido', titulo: 'Cómo pedir', sub: 'Paso a paso',
    d: ['M21 8l-9-5-9 5v8l9 5 9-5z', 'M3 8l9 5 9-5', 'M12 13v8'] },
  { hash: '#calculadora', titulo: 'Calculadora de ciclo', sub: 'Fechas estimadas',
    d: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'] },
  { hash: '#preguntas', titulo: 'Pregunta sin vergüenza', sub: 'Consultas anónimas',
    d: ['M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z'] },
  { hash: '#aprende', titulo: 'Aprende sobre tu cuerpo', sub: 'Educación femenina',
    d: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'] },
  { hash: '#metodos', titulo: 'Métodos anticonceptivos', sub: 'Compara opciones',
    d: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'] },
];

export default function MenuTarjetas({ onIr }) {
  return (
    <section id="menu" className="menu-grid" aria-label="Menú principal">
      {ITEMS.map((it) => (
        <a key={it.hash} href={it.hash} className="menu-card" onClick={(e) => onIr(e, it.hash)}>
          <Icono d={it.d} />
          <strong>{it.titulo}</strong>
          <span>{it.sub}</span>
        </a>
      ))}
    </section>
  );
}
