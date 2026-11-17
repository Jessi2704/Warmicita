import { useEffect, useState } from 'react';
import TarjetaProducto from './TarjetaProducto.jsx';
import ModalProducto from './ModalProducto.jsx';

export const CATEGORIAS = {
  menstruacion: 'Menstruación',
  higiene: 'Higiene Íntima',
  alivio: 'Alivio y Bienestar',
  'salud-sexual': 'Salud Sexual',
};

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('todos');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);

  // Pide los productos a la API (MongoDB) cada vez que cambia el filtro
  useEffect(() => {
    const controller = new AbortController();
    setCargando(true);
    setError(null);

    fetch(`/api/productos?categoria=${categoria}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo cargar el catálogo');
        return res.json();
      })
      .then(setProductos)
      .catch((err) => err.name !== 'AbortError' && setError(err.message))
      .finally(() => setCargando(false));

    return () => controller.abort();
  }, [categoria]);

  const filtros = [['todos', 'Todos'], ...Object.entries(CATEGORIAS)];

  return (
    <section id="catalogo">
      <h2 className="seccion-titulo">Nuestros Productos</h2>

      <div className="filtros">
        {filtros.map(([valor, texto]) => (
          <button
            key={valor}
            id={`filtro-${valor}`}
            className={`btn-filtro ${categoria === valor ? 'activo' : ''}`}
            onClick={() => setCategoria(valor)}
          >
            {texto}
          </button>
        ))}
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
