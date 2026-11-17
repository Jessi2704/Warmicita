import { useState } from 'react';

const ARTICULOS = [
  {
    id: 'higiene',
    emoji: '🧼',
    titulo: 'Higiene íntima sin mitos',
    resumen: 'La vagina se limpia sola; la vulva solo necesita cuidado suave.',
    texto: 'La vagina se autolimpia gracias a su flora natural. Por fuera, la vulva se lava con agua tibia y, si quieres, un jabón suave de pH neutro. Evita duchas vaginales, perfumes y productos agresivos: pueden alterar el equilibrio natural y favorecer infecciones. Usa ropa interior de algodón y cámbiala a diario.',
  },
  {
    id: 'periodo',
    emoji: '🩸',
    titulo: '¿Es normal mi periodo?',
    resumen: 'Qué se considera habitual y cuándo conviene consultar.',
    texto: 'Un ciclo suele durar entre 21 y 35 días y el sangrado entre 3 y 7. Algunas molestias leves son habituales, pero consulta a un profesional de salud si el dolor te impide hacer tu vida diaria, si empapas una toalla cada hora, si los ciclos son muy irregulares o si pasan más de 3 meses sin menstruar (sin estar embarazada).',
  },
  {
    id: 'consentimiento',
    emoji: '🤝',
    titulo: 'Consentimiento y sexualidad sana',
    resumen: 'Libre, informado, entusiasta y reversible.',
    texto: 'El consentimiento es un sí libre, claro y entusiasta, y puede retirarse en cualquier momento. Tienes derecho a decir que no, a cambiar de opinión y a recibir información veraz sobre tu cuerpo. Una relación sana se basa en respeto, comunicación y cuidado mutuo, incluida la protección frente a infecciones de transmisión sexual.',
  },
  {
    id: 'sostenible',
    emoji: '🌱',
    titulo: 'Menstruar con conciencia',
    resumen: 'Alternativas reutilizables para ti y el planeta.',
    texto: 'Copas, toallas de tela y calzones menstruales se pueden reutilizar durante años, reducen residuos y a la larga ahorran dinero. Elige la opción que te resulte más cómoda y sigue las instrucciones de limpieza de cada producto. Si tienes dudas sobre cuál te conviene, consulta con un profesional de salud.',
  },
];

export default function AprendeCuerpo() {
  const [abierto, setAbierto] = useState(null);

  return (
    <section id="aprende" className="seccion-bloque">
      <h2 className="seccion-titulo">Aprende sobre tu cuerpo</h2>
      <p className="seccion-intro">
        Una biblioteca educativa con artículos, infografías y videos. Empezamos con estos artículos;
        pronto sumaremos más material.
      </p>

      <div className="grid-articulos">
        {ARTICULOS.map((a) => {
          const activo = abierto === a.id;
          return (
            <article key={a.id} className={`articulo ${activo ? 'abierto' : ''}`}>
              <span className="articulo-emoji" aria-hidden="true">{a.emoji}</span>
              <h3>{a.titulo}</h3>
              <p>{a.resumen}</p>
              {activo && <p className="articulo-texto">{a.texto}</p>}
              <button className="btn-link" id={`articulo-${a.id}`} onClick={() => setAbierto(activo ? null : a.id)}>
                {activo ? 'Leer menos ↑' : 'Leer más ↓'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
