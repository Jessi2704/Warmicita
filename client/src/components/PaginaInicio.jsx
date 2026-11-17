const SECCIONES = [
  {
    id: 'tienda',
    emoji: '🛍️',
    titulo: 'Tienda',
    desc: 'Explora nuestro catálogo de productos de higiene femenina. Copa menstrual, toallas ecológicas, ropa interior menstrual y más.',
    img: '/hero_tienda.png',
    color: '#7a24cf',
    btnTxt: 'Ver catálogo →',
  },
  {
    id: 'ciclo',
    emoji: '🌸',
    titulo: 'Mi Ciclo',
    desc: 'Calcula las fechas de tu próxima menstruación, ovulación y ventana fértil. Conoce las fases de tu ciclo y entiende tu cuerpo.',
    img: '/hero_ciclo.png',
    color: '#c026d3',
    btnTxt: 'Calcular mi ciclo →',
  },
  {
    id: 'aprende',
    emoji: '📚',
    titulo: 'Aprende',
    desc: 'Pregunta sin vergüenza, aprende sobre tu cuerpo y compara métodos anticonceptivos. Educación femenina sin tabúes.',
    img: '/hero_aprende.png',
    color: '#4a0f8f',
    btnTxt: 'Explorar →',
  },
];

export default function PaginaInicio(props) {
  function manejarClic(idSeccion) {
    props.onEntrar(idSeccion);
  }

  return (
      <div className="inicio-page">
        <div className="inicio-grid">
          {SECCIONES.map(function (s) {
            return (
                <button
                    key={s.id}
                    className="inicio-card"
                    style={{ '--c': s.color }}
                    onClick={function () {
                      manejarClic(s.id);
                    }}
                >
                  <div className="inicio-card-img">
                    <img src={s.img} alt={s.titulo} />
                  </div>
                  <div className="inicio-card-body">
                    <h2>{s.titulo}</h2>
                    <p>{s.desc}</p>
                    <span className="inicio-btn">{s.btnTxt}</span>
                  </div>
                </button>
            );
          })}
        </div>
      </div>
  );
}