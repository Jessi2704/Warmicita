import { useState } from 'react';

const sumarDias = (fecha, dias) => {
  const f = new Date(fecha);
  f.setDate(f.getDate() + dias);
  return f;
};

const formato = (f) => `${f.getDate()}/${f.getMonth() + 1}/${f.getFullYear()}`;

export default function Calculadora() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [duracion, setDuracion] = useState(28);
  const [resultado, setResultado] = useState(null);

  const calcular = (e) => {
    e.preventDefault();
    if (!fechaInicio) return alert('Por favor selecciona una fecha.');

    const inicio = new Date(`${fechaInicio}T00:00:00`);
    const proxima = sumarDias(inicio, Number(duracion));
    const ovulacion = sumarDias(proxima, -14);

    setResultado({
      proxima: formato(proxima),
      ovulacion: formato(ovulacion),
      fertil: `${formato(sumarDias(ovulacion, -4))} al ${formato(sumarDias(ovulacion, 1))}`,
    });
  };

  return (
    <section id="calculadora" className="calculadora-seccion">
      <h2 className="seccion-titulo">🌸 Calculadora de tu Ciclo Menstrual</h2>
      <p style={{ textAlign: 'center', color: '#554466', marginBottom: '1rem' }}>
        Estima las fechas de tu próxima menstruación, ventana fértil y días de ovulación para acompañar tu autocuidado.
      </p>

      <div className="calculadora-grid">
        <div className="form-calculadora">
          <form id="form-ciclo" onSubmit={calcular}>
            <div className="form-grupo">
              <label htmlFor="fecha-inicio">Inicio de tu última menstruación:</label>
              <input type="date" id="fecha-inicio" required value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)} />
            </div>
            <div className="form-grupo">
              <label htmlFor="duracion-ciclo">Duración promedio de tu ciclo (días):</label>
              <input type="number" id="duracion-ciclo" min="20" max="45" required value={duracion}
                onChange={(e) => setDuracion(e.target.value)} />
              <small style={{ color: '#776688', fontSize: '0.8rem' }}>(Normalmente entre 21 y 35 días)</small>
            </div>
            <button type="submit" className="btn-calcular">Calcular Fechas ✨</button>
          </form>
        </div>

        {resultado && (
          <div className="resultados-contenedor visible">
            <div className="card-resultado">
              <h4>🩸 Próxima Menstruación</h4>
              <p>{resultado.proxima}</p>
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
