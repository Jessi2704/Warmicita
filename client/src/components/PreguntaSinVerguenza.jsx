import { useState } from 'react';

const TEMAS = [
  ['menstruacion', 'Menstruación'],
  ['anticoncepcion', 'Anticoncepción'],
  ['sexualidad', 'Sexualidad'],
  ['salud-intima', 'Salud íntima'],
  ['otro', 'Otro'],
];

export default function PreguntaSinVerguenza() {
  const [texto, setTexto] = useState('');
  const [tema, setTema] = useState('menstruacion');
  const [estado, setEstado] = useState('inicio'); // inicio | enviando | ok | error
  const [mensaje, setMensaje] = useState('');

  const enviar = async (e) => {
    e.preventDefault();
    setEstado('enviando');
    try {
      const res = await fetch('/api/preguntas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto, tema }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setEstado('ok');
      setTexto('');
    } catch (err) {
      setMensaje(err.message || 'No se pudo enviar. Inténtalo de nuevo.');
      setEstado('error');
    }
  };

  return (
    <section id="preguntas" className="seccion-bloque">
      <h2 className="seccion-titulo">Pregunta sin vergüenza 💜</h2>
      <p className="seccion-intro">
        Un espacio para enviar preguntas <strong>anónimas</strong> sobre menstruación, anticoncepción,
        sexualidad y salud íntima. No pedimos nombre, correo ni ningún dato personal.
      </p>

      {estado === 'ok' ? (
        <div className="caja-exito">
          <p>🌸 ¡Gracias por preguntar! Tu pregunta llegó de forma anónima.</p>
          <button className="btn-ver" onClick={() => setEstado('inicio')}>Hacer otra pregunta</button>
        </div>
      ) : (
        <form className="form-pregunta" id="form-pregunta" onSubmit={enviar}>
          <div className="form-grupo">
            <label htmlFor="pregunta-tema">¿Sobre qué es tu pregunta?</label>
            <select id="pregunta-tema" value={tema} onChange={(e) => setTema(e.target.value)}>
              {TEMAS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
            </select>
          </div>
          <div className="form-grupo">
            <label htmlFor="pregunta-texto">Tu pregunta</label>
            <textarea
              id="pregunta-texto" rows="4" maxLength="600" required minLength="10"
              placeholder="Escribe aquí, sin miedo. Nadie sabrá que fuiste tú..."
              value={texto} onChange={(e) => setTexto(e.target.value)}
            />
            <small className="contador">{texto.length}/600</small>
          </div>
          {estado === 'error' && <p className="estado estado-error">⚠️ {mensaje}</p>}
          <button type="submit" className="btn-calcular" disabled={estado === 'enviando'}>
            {estado === 'enviando' ? 'Enviando...' : 'Enviar de forma anónima ✨'}
          </button>
          <p className="aviso">Esto es información educativa, no reemplaza una consulta médica.</p>
        </form>
      )}
    </section>
  );
}
