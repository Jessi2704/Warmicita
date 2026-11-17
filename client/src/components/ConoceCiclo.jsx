import { useState } from 'react';
import { sumarDias, fmtLargo, fmtCorto } from './Calculadora.jsx';

function generarFases(cicloData) {
  let ciclo = 28;
  let mens = 5;
  let inicio = null;

  if (cicloData) {
    ciclo = cicloData.duracionCiclo;
    mens = cicloData.duracionMens;
    inicio = cicloData.inicio;
  }

  const ovDia = ciclo - 13;
  const ovOffset = ciclo - 14;

  const fases = [
    {
      id: 'menstrual', nombre: 'Menstrual',
      dias: 'Días 1–' + mens,
      color: '#e11d74',
      inicio: 0, fin: mens,
      hormonas: 'Estrógeno y progesterona en su nivel más bajo.',
      que: 'El endometrio (capa interna del útero) se desprende y sale como sangrado.',
      sintomas: ['Cólicos', 'Cansancio', 'Hinchazón', 'Dolor de espalda baja'],
      tip: 'El calor local, el descanso y la hidratación suelen ayudar.',
    },
    {
      id: 'folicular', nombre: 'Folicular',
      dias: 'Días ' + (mens + 1) + '–' + (ovDia - 1),
      color: '#9333ea',
      inicio: mens, fin: ovOffset,
      hormonas: 'El estrógeno sube progresivamente.',
      que: 'Maduran los folículos del ovario y el endometrio vuelve a engrosarse.',
      sintomas: ['Más energía', 'Mejor ánimo', 'Piel más luminosa'],
      tip: 'Suele ser una buena etapa para actividad física y nuevos retos.',
    },
    {
      id: 'ovulacion', nombre: 'Ovulación',
      dias: 'Día ' + ovDia,
      color: '#c026d3',
      inicio: ovOffset, fin: ovOffset + 1,
      hormonas: 'Pico de estrógeno y subida de la hormona luteinizante (LH).',
      que: 'El ovario libera un óvulo; es el momento de mayor fertilidad.',
      sintomas: ['Flujo claro y elástico', 'Leve dolor en un costado', 'Mayor libido'],
      tip: 'Calculado como el día ' + ovDia + ' de tu ciclo de ' + ciclo + ' días.',
    },
    {
      id: 'lutea', nombre: 'Lútea',
      dias: 'Días ' + (ovDia + 1) + '–' + ciclo,
      color: '#6d28d9',
      inicio: ovOffset + 1, fin: ciclo,
      hormonas: 'Sube la progesterona; si no hay embarazo, ambas hormonas bajan al final.',
      que: 'El cuerpo se prepara para un posible embarazo. Si no ocurre, comienza un nuevo ciclo.',
      sintomas: ['Sensibilidad en senos', 'Cambios de humor (SPM)', 'Antojos', 'Retención de líquidos'],
      tip: 'Dormir bien y reducir cafeína y sal puede aliviar el síndrome premenstrual.',
    },
  ];

  if (inicio) {
    fases[0].fechas = fmtCorto(inicio) + ' – ' + fmtCorto(sumarDias(inicio, mens - 1));
    fases[1].fechas = fmtCorto(sumarDias(inicio, mens)) + ' – ' + fmtCorto(sumarDias(inicio, ovOffset - 1));
    fases[2].fechas = fmtLargo(sumarDias(inicio, ovOffset));
    fases[3].fechas = fmtCorto(sumarDias(inicio, ovOffset + 1)) + ' – ' + fmtCorto(sumarDias(inicio, ciclo - 1));
  }

  return fases;
}

export default function ConoceCiclo(props) {
  const [activa, setActiva] = useState('menstrual');

  const fases = generarFases(props.cicloData);
  const fase  = fases.find((f) => f.id === activa);

  // Verificación simple con booleano
  let tieneCalculo = false;
  let ciclo = null;
  let mens = null;

  if (props.cicloData && props.cicloData.inicio) {
    tieneCalculo = true;
    ciclo = props.cicloData.duracionCiclo;
    mens = props.cicloData.duracionMens;
  }

  return (
      <section id="ciclo" className="seccion-bloque">
        <h2 className="seccion-titulo">Conoce tu ciclo</h2>

        <p className="seccion-intro">
          {tieneCalculo
              ? <>Tu ciclo tiene una duración estimada de <strong>{ciclo} días</strong> y tu menstruación suele durar <strong>{mens} días</strong>. Explora cada fase para conocer los cambios que ocurren en tu cuerpo.</>
              : <>Toca cada fase para entender los cambios hormonales y los síntomas habituales. Completa la calculadora para ver las fechas reales de tu ciclo.</>
          }
        </p>

        <div className="linea-ciclo" role="tablist" aria-label="Fases del ciclo menstrual">
          {fases.map((f) => (
              <button
                  key={f.id}
                  role="tab"
                  aria-selected={activa === f.id}
                  id={'fase-' + f.id}
                  className={activa === f.id ? 'segmento activo' : 'segmento'}
                  style={{ flexGrow: f.fin - f.inicio, '--c': f.color }}
                  onClick={() => setActiva(f.id)}
              >
                <span>{f.nombre}</span>
                <small>{f.dias}</small>
              </button>
          ))}
        </div>

        {/* Quitamos la key compleja y dejamos la estructura limpia */}
        <div className="detalle-fase" style={{ '--c': fase.color }}>
          <div className="detalle-fase-header">
            <h3>{fase.nombre} <span>· {fase.dias}</span></h3>
            {fase.fechas && (
                <span className="detalle-fechas">📅 {fase.fechas}</span>
            )}
          </div>
          <p><strong>Qué pasa:</strong> {fase.que}</p>
          <p><strong>Hormonas:</strong> {fase.hormonas}</p>
          <div className="chips">
            {fase.sintomas.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
          <p className="tip">💡 {fase.tip}</p>
        </div>

        <p className="nota-disclaimer">
          ⚠️ Las fechas de ovulación y ventana fértil son <strong>estimaciones</strong>. Cada cuerpo es diferente y los ciclos pueden variar. Esta calculadora no confirma la ovulación ni debe utilizarse como método anticonceptivo.
        </p>
      </section>
  );
}