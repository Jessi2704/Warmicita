import { useState } from 'react';

/* ── Utilidades con funciones tradicionales ───────── */
export function sumarDias(fecha, dias) {
  const f = new Date(fecha);
  f.setDate(f.getDate() + dias);
  return f;
}

export const fmtLargo = (f) =>
  f.toLocaleDateString('es-EC', { day: '2-digit', month: 'long', year: 'numeric' });

export const fmtCorto = (f) =>
  f.toLocaleDateString('es-EC', { day: '2-digit', month: 'short' });

/* ── Componente ──────────────────────────────────── */
export default function Calculadora(props) {
  const [fechaInicio, setFechaInicio]     = useState('');
  const [duracionCiclo, setDuracionCiclo] = useState(28);
  const [duracionMens, setDuracionMens]   = useState(5);
  const [resultado, setResultado]         = useState(null);
  const [error, setError]                 = useState('');

  function calcular(e) {
    e.preventDefault();
    setError('');

    if (!fechaInicio) {
      setError('Por favor selecciona la fecha de inicio.');
      return;
    }

    const ciclo = Number(duracionCiclo);
    const mens  = Number(duracionMens);

    if (ciclo < 20 || ciclo > 45) {
      setError('El ciclo debe estar entre 20 y 45 días.');
      return;
    }
    if (mens < 1 || mens > 10) {
      setError('La duración de tu menstruación debe ser entre 1 y 10 días.');
      return;
    }

    const inicio        = new Date(fechaInicio + 'T00:00:00');
    const finMensActual = sumarDias(inicio, mens - 1);
    const proximaInicio = sumarDias(inicio, ciclo);
    const proximaFin    = sumarDias(proximaInicio, mens - 1);
    const ovulacion     = sumarDias(proximaInicio, -14);
    const fertilDesde   = sumarDias(ovulacion, -4);
    const fertilHasta   = sumarDias(ovulacion, 1);

    const res = {
      mensActual : { desde: fmtLargo(inicio),        hasta: fmtLargo(finMensActual) },
      proxima    : { desde: fmtLargo(proximaInicio), hasta: fmtLargo(proximaFin) },
      ovulacion  : fmtLargo(ovulacion),
      fertil     : fmtCorto(fertilDesde) + ' – ' + fmtCorto(fertilHasta),
    };

    setResultado(res);

    if (props.onCalculo) {
      props.onCalculo({
        fechaInicio: fechaInicio,
        duracionCiclo: ciclo,
        duracionMens: mens,
        resultado: res,
        inicio: inicio
      });
    }
  }

  return (
      <section id="calculadora" className="calculadora-seccion">
        <h2 className="seccion-titulo">🌸 Calculadora de tu Ciclo Menstrual</h2>
        <p className="seccion-intro">
          Estima las fechas de tu próxima menstruación, ventana fértil y días de ovulación
          para acompañar tu autocuidado. Los resultados son orientativos.
        </p>

        <div className="calculadora-grid">
          {/* ── Formulario ── */}
          <div className="form-calculadora">
            <form id="form-ciclo" onSubmit={calcular} noValidate>

              <div className="form-grupo">
                <label htmlFor="fecha-inicio">📅 Inicio de tu última menstruación:</label>
                <input
                    type="date" id="fecha-inicio" required
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>

              <div className="form-grupo">
                <label htmlFor="duracion-ciclo">🔄 Duración promedio de tu ciclo (días):</label>
                <input
                    type="number" id="duracion-ciclo" min="20" max="45" required
                    value={duracionCiclo}
                    onChange={(e) => setDuracionCiclo(e.target.value)}
                />
                <small className="form-hint">Normalmente entre 21 y 35 días</small>
              </div>

              <div className="form-grupo">
                <label htmlFor="duracion-mens">🩸 Duración promedio de tu menstruación (días):</label>
                <input
                    type="number" id="duracion-mens" min="1" max="10" required
                    value={duracionMens}
                    onChange={(e) => setDuracionMens(e.target.value)}
                />
                <small className="form-hint">Normalmente entre 3 y 7 días</small>
              </div>

              {error && <p className="calc-error">⚠️ {error}</p>}

              <button type="submit" className="btn-calcular">Calcular Fechas ✨</button>
            </form>
          </div>

          {/* ── Resultados ── */}
          {resultado && (
              <div className="resultados-contenedor visible">
                <div className="card-resultado menstrual-actual">
                  <h4>🩸 Menstruación actual</h4>
                  <p>{resultado.mensActual.desde}</p>
                  <span className="nota">Hasta: {resultado.mensActual.hasta}</span>
                </div>

                <div className="card-resultado proxima">
                  <h4>📅 Próxima Menstruación</h4>
                  <p>{resultado.proxima.desde}</p>
                  <span className="nota">Fecha estimada de tu siguiente periodo.</span>
                </div>

                <div className="card-resultado ovulacion">
                  <h4>🥚 Día Estimado de Ovulación</h4>
                  <p>{resultado.ovulacion}</p>
                  <span className="nota">Generalmente 14 días antes del siguiente periodo.</span>
                </div>

                <div className="card-resultado fertil">
                  <h4>✨ Ventana Fértil</h4>
                  <p>{resultado.fertil}</p>
                  <span className="nota">Días de mayor probabilidad de concepción.</span>
                </div>
              </div>
          )}
        </div>
      </section>
  );
}