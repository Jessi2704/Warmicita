import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Producto from './models/Producto.js';
import Pregunta from './models/Pregunta.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  console.error('❌ Falta MONGODB_URI en server/.env (copia .env.example)');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// ---------- API ----------
app.get('/api/productos', async (req, res) => {
  try {
    const filtro = {};
    if (req.query.categoria && req.query.categoria !== 'todos') {
      filtro.categoria = req.query.categoria;
    }
    const productos = await Producto.find(filtro).sort({ createdAt: 1 });
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(400).json({ error: 'ID inválido' });
  }
});

app.post('/api/productos', async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Preguntas anónimas (solo se pueden enviar; no se listan públicamente)
app.post('/api/preguntas', async (req, res) => {
  try {
    const { texto, tema } = req.body;
    await Pregunta.create({ texto, tema });
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: 'Escribe una pregunta de al menos 10 caracteres y elige un tema.' });
  }
});

// ---------- Frontend compilado (producción) ----------
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) res.status(404).send('Ejecuta "npm run build" en client/ primero.');
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () => console.log(`🌸 API en http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  });
