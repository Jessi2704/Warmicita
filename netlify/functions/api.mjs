// API de WARMICITA como Netlify Function (reemplaza a server/index.js en Netlify).
// Reutiliza los mismos modelos de server/models.
import mongoose from 'mongoose';
import Producto from '../../server/models/Producto.js';
import Pregunta from '../../server/models/Pregunta.js';

// Reutiliza la conexión entre ejecuciones de la función
let conexion = null;
async function conectar() {
  if (!process.env.MONGODB_URI) throw new Error('Falta la variable MONGODB_URI en Netlify');
  if (mongoose.connection.readyState === 1) return;
  conexion = conexion || mongoose.connect(process.env.MONGODB_URI);
  await conexion;
}

const json = (datos, status = 200) =>
  new Response(JSON.stringify(datos), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

export default async (req) => {
  const url = new URL(req.url);
  const ruta = url.pathname.replace(/\/+$/, '');

  try {
    await conectar();

    // GET /api/productos?categoria=...
    if (ruta === '/api/productos' && req.method === 'GET') {
      const categoria = url.searchParams.get('categoria');
      const filtro = categoria && categoria !== 'todos' ? { categoria } : {};
      return json(await Producto.find(filtro).sort({ createdAt: 1 }));
    }

    // GET /api/productos/:id
    const m = ruta.match(/^\/api\/productos\/([^/]+)$/);
    if (m && req.method === 'GET') {
      const p = await Producto.findById(m[1]).catch(() => null);
      return p ? json(p) : json({ error: 'Producto no encontrado' }, 404);
    }

    // POST /api/preguntas (anónimas)
    if (ruta === '/api/preguntas' && req.method === 'POST') {
      try {
        const { texto, tema } = await req.json();
        await Pregunta.create({ texto, tema });
        return json({ ok: true }, 201);
      } catch {
        return json({ error: 'Escribe una pregunta de al menos 10 caracteres y elige un tema.' }, 400);
      }
    }

    return json({ error: 'Ruta no encontrada' }, 404);
  } catch (err) {
    console.error(err);
    return json({ error: 'Error del servidor' }, 500);
  }
};

export const config = {
  path: ['/api/productos', '/api/productos/*', '/api/preguntas'],
};
