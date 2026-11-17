import { useState } from 'react';
import { sumarDias, fmtLargo, fmtCorto } from './Calculadora.jsx';

/* ─────────────────────────────────────────────────
   Genera las 4 fases con días y fechas reales
   según los datos calculados por la usuaria.
   Si no hay datos, usa el ejemplo de 28 días.
───────────────────────────────────────────────── */
function generarFases(cicloData) {
  const ciclo = cicloData?.duracionCiclo ?? 28;
  const mens  = cicloData?.duracionMens  ?? 5;
  const inicio = cicloData?.inicio ?? null;

  // Día del ciclo en que ocurre la ovulación (1-indexado)
  // ovulacion = inicio + (ciclo - 14 días)  →  día ciclo-13 del ciclo
  const ovDia = ciclo - 13;   // día del ciclo (1-based)
  const ovOffset = ciclo - 14; // días desde inicio del ciclo

  // Rango de días de cada fase
  const fases = [
    {
      id: 'menstrual', nombre: 'Menstrual',
      dias: `Días 1–${mens}`,
      color: '#e11d74',
      inicio: 0, fin: mens,
      hormonas: 'Estrógeno y progesterona en su nivel más bajo.',
      que: 'El endometrio (capa interna del útero) se desprende y sale como sangrado.',
      sintomas: ['Cólicos', 'Cansancio', 'Hinchazón', 'Dolor de espalda baja'],
      tip: 'El calor local, el descanso y la hidratación suelen ayudar.',
    },
    {
      id: 'folicular', nombre: 'Folicular',
      dias: `Días ${mens + 1}–${ovDia - 1}`,
      color: '#9333ea',
      inicio: mens, fin: ovOffset,
      hormonas: 'El estrógeno sube progresivamente.',
      que: 'Maduran los folículos del ovario y el endometrio vuelve a engrosarse.',
      sintomas: ['Más energía', 'Mejor ánimo', 'Piel más luminosa'],
      tip: 'Suele ser una buena etapa para actividad física y nuevos retos.',
    },
    {
      id: 'ovulacion', nombre: 'Ovulación',
      dias: `Día ${ovDia}`,
      color: '#c026d3',
      inicio: ovOffset, fin: ovOffset + 1,
      hormonas: 'Pico de estrógeno y subida de la hormona luteinizante (LH).',
      que: 'El ovario libera un óvulo; es el momento de mayor fertilidad.',
      sintomas: ['Flujo claro y elástico', 'Leve dolor en un costado', 'Mayor libido'],
      tip: `Calculado como el día ${ovDia} de tu ciclo de ${ciclo} días.`,
    },
    {
      id: 'lutea', nombre: 'Lútea',
      dias: `Días ${ovDia + 1}–${ciclo}`,
      color: '#6d28d9',
      inicio: ovOffset + 1, fin: ciclo,
      hormonas: 'Sube la progesterona; si no hay embarazo, ambas hormonas bajan al final.',
      que: 'El cuerpo se prepara para un posible embarazo. Si no ocurre, comienza un nuevo ciclo.',
      sintomas: ['Sensibilidad en senos', 'Cambios de humor (SPM)', 'Antojos', 'Retención de líquidos'],
      tip: 'Dormir bien y reducir cafeína y sal puede aliviar el síndrome premenstrual.',
    },
  ];

  // Agregar fechas reales si tenemos datos calculados
  if (inicio) {
    // menstrual: día 1 → día mens
    fases[0].fechas = `${fmtCorto(inicio)} – ${fmtCorto(sumarDias(inicio, mens - 1))}`;
    // folicular: día mens+1 → día ovOffset (día antes de ovulación)
    fases[1].fechas = `${fmtCorto(sumarDias(inicio, mens))} – ${fmtCorto(sumarDias(inicio, ovOffset - 1))}`;
    // ovulacion: día ovOffset exacto
    fases[2].fechas = fmtLargo(sumarDias(inicio, ovOffset));
    // lutea: día ovOffset+1 → día ciclo-1
    fases[3].fechas = `${fmtCorto(sumarDias(inicio, ovOffset + 1))} – ${fmtCorto(sumarDias(inicio, ciclo - 1))}`;
  }

  return fases;
}

/* ── Componente ──────────────────────────────────── */
export default function ConoceCiclo({ cicloData }) {
  const [activa, setActiva] = useState('menstrual');

  const fases = generarFases(cicloData);
  const fase  = fases.find((f) => f.id === activa);

  const ciclo = cicloData?.duracionCiclo ?? null;
  const mens  = cicloData?.duracionMens  ?? null;
  const tieneCalculo = !!(cicloData?.inicio);

  return (
    <section id="ciclo" className="seccion-bloque">
      <h2 className="seccion-titulo">Conoce tu ciclo</h2>

      {/* ── Texto dinámico ── */}
      <p className="seccion-intro">
        {tieneCalculo
          ? <>Tu ciclo tiene una duración estimada de <strong>{ciclo} días</strong> y tu menstruación suele durar <strong>{mens} días</strong>. Explora cada fase para conocer los cambios que ocurren en tu cuerpo.</>
          : <>Toca cada fase para entender los cambios hormonales y los síntomas habituales. Completa la calculadora para ver las fechas reales de tu ciclo.</>
        }
      </p>

      {/* ── Línea de fases ── */}
      <div className="linea-ciclo" role="tablist" aria-label="Fases del ciclo menstrual">
        {fases.map((f) => (
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

      {/* ── Detalle de la fase activa ── */}
      <div className="detalle-fase" style={{ '--c': fase.color }} key={fase.id + (cicloData?.duracionCiclo ?? 0)}>
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

      {/* ── Nota informativa ── */}
      <p className="nota-disclaimer">
        ⚠️ Las fechas de ovulación y ventana fértil son <strong>estimaciones</strong>. Cada cuerpo es diferente y los ciclos pueden variar. Esta calculadora no confirma la ovulación ni debe utilizarse como método anticonceptivo.
      </p>
    </section>
  );
}
