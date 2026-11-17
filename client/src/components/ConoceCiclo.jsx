import { useState } from 'react';

const FASES = [
  {
    id: 'menstrual', nombre: 'Menstrual', dias: 'Días 1–5', color: '#e11d74', inicio: 0, fin: 5,
    hormonas: 'Estrógeno y progesterona en su nivel más bajo.',
    que: 'El endometrio (capa interna del útero) se desprende y sale como sangrado.',
    sintomas: ['Cólicos', 'Cansancio', 'Hinchazón', 'Dolor de espalda baja'],
    tip: 'El calor local, el descanso y la hidratación suelen ayudar.',
  },
  {
    id: 'folicular', nombre: 'Folicular', dias: 'Días 6–13', color: '#9333ea', inicio: 5, fin: 13,
    hormonas: 'El estrógeno sube progresivamente.',
    que: 'Maduran los folículos del ovario y el endometrio vuelve a engrosarse.',
    sintomas: ['Más energía', 'Mejor ánimo', 'Piel más luminosa'],
    tip: 'Suele ser una buena etapa para actividad física y nuevos retos.',
  },
  {
    id: 'ovulacion', nombre: 'Ovulación', dias: 'Aprox. día 14', color: '#c026d3', inicio: 13, fin: 15,
    hormonas: 'Pico de estrógeno y subida de la hormona luteinizante (LH).',
    que: 'El ovario libera un óvulo; es el momento de mayor fertilidad.',
    sintomas: ['Flujo claro y elástico', 'Leve dolor en un costado', 'Mayor libido'],
    tip: 'En un ciclo de 28 días. Si tu ciclo es distinto, el día cambia.',
  },
  {
    id: 'lutea', nombre: 'Lútea', dias: 'Días 15–28', color: '#6d28d9', inicio: 15, fin: 28,
    hormonas: 'Sube la progesterona; si no hay embarazo, ambas hormonas bajan al final.',
    que: 'El cuerpo se prepara para un posible embarazo. Si no ocurre, comienza un nuevo ciclo.',
    sintomas: ['Sensibilidad en senos', 'Cambios de humor (SPM)', 'Antojos', 'Retención de líquidos'],
    tip: 'Dormir bien y reducir cafeína y sal puede aliviar el síndrome premenstrual.',
  },
];

export default function ConoceCiclo() {
  const [activa, setActiva] = useState('menstrual');
  const fase = FASES.find((f) => f.id === activa);

  return (
    <section id="ciclo" className="seccion-bloque">
      <h2 className="seccion-titulo">Conoce tu ciclo</h2>
      <p className="seccion-intro">
        Toca cada fase para entender los cambios hormonales y los síntomas habituales.
        (Ciclo de ejemplo de 28 días: el tuyo puede ser distinto y también es válido.)
      </p>

      <div className="linea-ciclo" role="tablist" aria-label="Fases del ciclo menstrual">
        {FASES.map((f) => (
          <button
            key={f.id} role="tab" aria-selected={activa === f.id} id={`fase-${f.id}`}
            className={`segmento ${activa === f.id ? 'activo' : ''}`}
            style={{ flexGrow: f.fin - f.inicio, '--c': f.color }}
            onClick={() => setActiva(f.id)}
          >
            <span>{f.nombre}</span>
            <small>{f.dias}</small>
          </button>
        ))}
      </div>

      <div className="detalle-fase" style={{ '--c': fase.color }} key={fase.id}>
        <h3>{fase.nombre} <span>· {fase.dias}</span></h3>
        <p><strong>Qué pasa:</strong> {fase.que}</p>
        <p><strong>Hormonas:</strong> {fase.hormonas}</p>
        <div className="chips">
          {fase.sintomas.map((s) => <span key={s} className="chip">{s}</span>)}
        </div>
        <p className="tip">💡 {fase.tip}</p>
      </div>
    </section>
  );
}
