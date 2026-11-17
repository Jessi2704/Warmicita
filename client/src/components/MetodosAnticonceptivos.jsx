import { useState } from 'react';

// Eficacia aproximada: uso perfecto / uso típico (valores de referencia generales)
const METODOS = [
  { id: 'condon', nombre: 'Preservativo', tipo: 'barrera', eficacia: '98% / 87%', its: true, desc: 'Barrera externa o interna. Es el único de esta lista que además protege frente a infecciones de transmisión sexual (ITS).' },
  { id: 'pildora', nombre: 'Píldora', tipo: 'hormonal', eficacia: '99% / 93%', its: false, desc: 'Pastilla diaria con hormonas. Requiere constancia y receta o indicación profesional.' },
  { id: 'inyectable', nombre: 'Inyectable', tipo: 'hormonal', eficacia: '99% / 96%', its: false, desc: 'Inyección cada 1 o 3 meses según el tipo.' },
  { id: 'implante', nombre: 'Implante', tipo: 'larga', eficacia: '99% / 99%', its: false, desc: 'Varilla bajo la piel del brazo; dura hasta 3 años. Lo coloca un profesional.' },
  { id: 'diu', nombre: 'DIU (hormonal o de cobre)', tipo: 'larga', eficacia: '99% / 99%', its: false, desc: 'Dispositivo en el útero que dura de 3 a 10 años según el modelo. Lo coloca un profesional.' },
  { id: 'anillo', nombre: 'Anillo / Parche', tipo: 'hormonal', eficacia: '99% / 93%', its: false, desc: 'Liberan hormonas de forma continua; se cambian cada semana o cada mes.' },
  { id: 'emergencia', nombre: 'Píldora de emergencia', tipo: 'emergencia', eficacia: 'Varía', its: false, desc: 'Solo para emergencias, no como método habitual. Cuanto antes se tome, mejor funciona.' },
];

const FILTROS = [['todos', 'Todos'], ['barrera', 'Barrera'], ['hormonal', 'Hormonales'], ['larga', 'Larga duración'], ['emergencia', 'Emergencia']];

export default function MetodosAnticonceptivos() {
  const [filtro, setFiltro] = useState('todos');
  const lista = METODOS.filter((m) => filtro === 'todos' || m.tipo === filtro);

  return (
    <section id="metodos" className="seccion-bloque">
      <h2 className="seccion-titulo">Conoce tus métodos anticonceptivos</h2>
      <p className="seccion-intro">
        Elegir un método es una decisión personal. Compara opciones y habla con un profesional de salud para
        encontrar la que mejor se adapte a ti.
      </p>

      <div className="filtros">
        {FILTROS.map(([v, t]) => (
          <button key={v} id={`metodo-${v}`} className={`btn-filtro ${filtro === v ? 'activo' : ''}`} onClick={() => setFiltro(v)}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid-metodos">
        {lista.map((m) => (
          <article key={m.id} className="metodo">
            <h3>{m.nombre}</h3>
            <p>{m.desc}</p>
            <div className="metodo-datos">
              <span className="chip">Eficacia: {m.eficacia}</span>
              <span className={`chip ${m.its ? 'chip-ok' : ''}`}>{m.its ? '✓ Protege de ITS' : 'No protege de ITS'}</span>
            </div>
          </article>
        ))}
      </div>
      <p className="aviso">Eficacia aproximada (uso perfecto / uso típico). Información educativa, no sustituye la consulta médica.</p>
    </section>
  );
}
