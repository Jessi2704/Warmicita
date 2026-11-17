import { useEffect, useState } from 'react';
import TarjetaProducto from './TarjetaProducto.jsx';
import ModalProducto from './ModalProducto.jsx';

export const CATEGORIAS = {
  menstruacion: 'Menstruación',
  higiene: 'Higiene Íntima',
  alivio: 'Alivio y Bienestar',
  'salud-sexual': 'Salud Sexual',
};

// Lista simple de botones en lugar de Object.entries y spread (...)
const LISTA_FILTROS = [
  { valor: 'todos', texto: 'Todos' },
  { valor: 'menstruacion', texto: 'Menstruación' },
  { valor: 'higiene', texto: 'Higiene Íntima' },
  { valor: 'alivio', texto: 'Alivio y Bienestar' },
  { valor: 'salud-sexual', texto: 'Salud Sexual' },
];

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('todos');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);

  // Pide los productos a la API cada vez que cambia la categoría
  useEffect(() => {
    let cancelado = false;

    async function cargarProductos() {
      setCargando(true);
      setError(null);

      try {
        const respuesta = await fetch('/api/productos?categoria=' + categoria);
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el catálogo');
        }
        const datos = await respuesta.json();

        if (!cancelado) {
          setProductos(datos);
        }
      } catch (err) {
        if (!cancelado) {
          setError(err.message);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    // Si el usuario cambia de filtro rápido, ignoramos la respuesta vieja
    return () => {
      cancelado = true;
    };
  }, [categoria]);

  return (
      <section id="catalogo">
        <h2 className="seccion-titulo">Nuestros Productos</h2>

        <div className="filtros">
          {LISTA_FILTROS.map((filtro) => {
            let claseBoton = 'btn-filtro';
            if (categoria === filtro.valor) {
              claseBoton = 'btn-filtro activo';
            }

            return (
                <button
                    key={filtro.valor}
                    id={'filtro-' + filtro.valor}
                    className={claseBoton}
                    onClick={() => setCategoria(filtro.valor)}
                >
                  {filtro.texto}
                </button>
            );
          })}
        </div>

        {cargando && <p className="estado">Cargando productos... 🌸</p>}
        {error && <p className="estado estado-error">⚠️ {error}. ¿Está corriendo el servidor?</p>}
        {!cargando && !error && productos.length === 0 && (
            <p className="estado">No hay productos en esta categoría.</p>
        )}

        {!cargando && !error && (
            <div className="catalogo">
              {productos.map((p) => (
                  <TarjetaProducto key={p._id} producto={p} onVer={setSeleccionado} />
              ))}
            </div>
        )}

        {seleccionado && (
            <ModalProducto producto={seleccionado} onCerrar={() => setSeleccionado(null)} />
        )}
      </section>
  );
}