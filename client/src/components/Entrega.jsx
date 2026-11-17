import { useState } from 'react';
import { useCarrito } from '../CarritoContext.jsx';
import { dinero } from '../pedido.js';

const VACIO = {
  nombre: '',
  celular: '',
  ciudad: '',
  direccion: '',
  referencia: '',
  observaciones: ''
};

// Función básica para limpiar espacios o guiones y verificar que solo haya números
function limpiarYValidarCelular(texto) {
  let soloNumeros = '';

  for (let i = 0; i < texto.length; i++) {
    const letra = texto[i];
    if (letra === ' ' || letra === '-') {
      continue; // Ignora espacios y guiones
    }
    if (letra < '0' || letra > '9') {
      return null; // Si encuentra una letra o símbolo, no es válido
    }
    soloNumeros = soloNumeros + letra;
  }

  if (soloNumeros.length < 7 || soloNumeros.length > 15) {
    return null;
  }

  return soloNumeros;
}

export default function Entrega(props) {
  const carrito = useCarrito();
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});

  function cambiar(e) {
    const copiaDatos = Object.assign({}, datos);
    copiaDatos[e.target.name] = e.target.value;
    setDatos(copiaDatos);
  }

  function enviar(ev) {
    ev.preventDefault();

    const nuevosErrores = {};
    let hayErrores = false;

    if (datos.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'Escribe tu nombre completo.';
      hayErrores = true;
    }

    const celularLimpio = limpiarYValidarCelular(datos.celular);
    if (celularLimpio === null) {
      nuevosErrores.celular = 'Escribe un celular válido (solo números).';
      hayErrores = true;
    }

    if (datos.ciudad.trim() === '') {
      nuevosErrores.ciudad = 'Indica tu ciudad.';
      hayErrores = true;
    }

    if (datos.direccion.trim().length < 5) {
      nuevosErrores.direccion = 'Escribe tu dirección de entrega.';
      hayErrores = true;
    }

    if (datos.referencia.trim() === '') {
      nuevosErrores.referencia = 'Agrega una referencia de ubicación.';
      hayErrores = true;
    }

    setErrores(nuevosErrores);

    if (!hayErrores) {
      const datosFinales = Object.assign({}, datos);
      datosFinales.celular = celularLimpio;
      props.onConfirmar(datosFinales);
    }
  }

  return (
      <section className="seccion-bloque pantalla" id="entrega">
        <h2 className="seccion-titulo">Datos de entrega</h2>
        <p className="seccion-intro">
          Completa tus datos para preparar tu pedido de {dinero(carrito.total)}.
        </p>

        <form className="form-pregunta" onSubmit={enviar} noValidate>
          <div className="form-grupo">
            <label htmlFor="f-nombre">Nombre completo *</label>
            <input
                id="f-nombre"
                name="nombre"
                autoComplete="name"
                value={datos.nombre}
                onChange={cambiar}
            />
            {errores.nombre && <small className="error">{errores.nombre}</small>}
          </div>

          <div className="form-grupo">
            <label htmlFor="f-celular">Número de celular *</label>
            <input
                id="f-celular"
                name="celular"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={datos.celular}
                onChange={cambiar}
            />
            {errores.celular && <small className="error">{errores.celular}</small>}
          </div>

          <div className="form-grupo">
            <label htmlFor="f-ciudad">Ciudad *</label>
            <input
                id="f-ciudad"
                name="ciudad"
                value={datos.ciudad}
                onChange={cambiar}
            />
            {errores.ciudad && <small className="error">{errores.ciudad}</small>}
          </div>

          <div className="form-grupo">
            <label htmlFor="f-direccion">Dirección de entrega *</label>
            <input
                id="f-direccion"
                name="direccion"
                autoComplete="street-address"
                value={datos.direccion}
                onChange={cambiar}
            />
            {errores.direccion && <small className="error">{errores.direccion}</small>}
          </div>

          <div className="form-grupo">
            <label htmlFor="f-referencia">Referencia de ubicación *</label>
            <input
                id="f-referencia"
                name="referencia"
                placeholder="Ej: Frente al parque"
                value={datos.referencia}
                onChange={cambiar}
            />
            {errores.referencia && <small className="error">{errores.referencia}</small>}
          </div>

          <div className="form-grupo">
            <label htmlFor="f-observaciones">Observaciones adicionales (opcional)</label>
            <textarea
                id="f-observaciones"
                name="observaciones"
                rows="3"
                value={datos.observaciones}
                onChange={cambiar}
            />
          </div>

          {carrito.items.length === 0 && (
              <p className="estado estado-error">Tu carrito está vacío.</p>
          )}

          <div className="carrito-botones">
            <button
                type="button"
                className="btn-secundario"
                id="entrega-volver"
                onClick={props.onVolver}
            >
              ← Volver al carrito
            </button>
            <button
                type="submit"
                className="btn-calcular"
                id="entrega-generar"
                disabled={carrito.items.length === 0}
            >
              Generar pedido
            </button>
          </div>
        </form>
      </section>
  );
}