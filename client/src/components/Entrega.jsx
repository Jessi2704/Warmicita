import { useState } from 'react';
import { useCarrito } from '../CarritoContext.jsx';
import { dinero } from '../pedido.js';

const VACIO = { nombre: '', celular: '', ciudad: '', direccion: '', referencia: '', observaciones: '' };

export default function Entrega({ onVolver, onConfirmar }) {
  const { items, total } = useCarrito();
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const validar = () => {
    const e = {};
    if (datos.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre completo.';
    if (!/^\d{7,15}$/.test(datos.celular.replace(/[\s-]/g, ''))) e.celular = 'Escribe un celular válido (solo números).';
    if (!datos.ciudad.trim()) e.ciudad = 'Indica tu ciudad.';
    if (datos.direccion.trim().length < 5) e.direccion = 'Escribe tu dirección de entrega.';
    if (!datos.referencia.trim()) e.referencia = 'Agrega una referencia de ubicación.';
    return e;
  };

  const enviar = (ev) => {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length === 0) {
      onConfirmar({ ...datos, celular: datos.celular.replace(/[\s-]/g, '') });
    }
  };

  const campo = (nombre, etiqueta, props = {}) => (
    <div className="form-grupo">
      <label htmlFor={`f-${nombre}`}>{etiqueta}</label>
      <input id={`f-${nombre}`} name={nombre} value={datos[nombre]} onChange={cambiar} {...props} />
      {errores[nombre] && <small className="error">{errores[nombre]}</small>}
    </div>
  );

  return (
    <section className="seccion-bloque pantalla" id="entrega">
      <h2 className="seccion-titulo">Datos de entrega</h2>
      <p className="seccion-intro">Completa tus datos para preparar tu pedido de {dinero(total)}.</p>

      <form className="form-pregunta" onSubmit={enviar} noValidate>
        {campo('nombre', 'Nombre completo *', { autoComplete: 'name' })}
        {campo('celular', 'Número de celular *', { type: 'tel', inputMode: 'numeric', autoComplete: 'tel' })}
        {campo('ciudad', 'Ciudad *')}
        {campo('direccion', 'Dirección de entrega *', { autoComplete: 'street-address' })}
        {campo('referencia', 'Referencia de ubicación *', { placeholder: 'Ej: Frente al parque' })}
        <div className="form-grupo">
          <label htmlFor="f-observaciones">Observaciones adicionales (opcional)</label>
          <textarea id="f-observaciones" name="observaciones" rows="3" value={datos.observaciones} onChange={cambiar} />
        </div>

        {items.length === 0 && <p className="estado estado-error">Tu carrito está vacío.</p>}

        <div className="carrito-botones">
          <button type="button" className="btn-secundario" id="entrega-volver" onClick={onVolver}>← Volver al carrito</button>
          <button type="submit" className="btn-calcular" id="entrega-generar" disabled={items.length === 0}>Generar pedido</button>
        </div>
      </form>
    </section>
  );
}
