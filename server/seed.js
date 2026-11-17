import 'dotenv/config';
import mongoose from 'mongoose';
import Producto from './models/Producto.js';

// Los precios y el stock son valores iniciales de ejemplo: edítalos a los reales.
const productos = [
  // ---------- Menstruación ----------
  {
    nombre: 'Copa Menstrual de Silicona',
    resumen: 'Fabricada con silicona médica 100% hipoalergénica. Reutilizable hasta por 10 años.',
    descripcion: 'Fabricada con silicona médica 100% hipoalergénica y libre de tóxicos. Ofrece hasta 12 horas de protección continua, es ecológica y reutilizable.',
    precio: 18, categoria: 'menstruacion', imagen: '/copa_menstrual.jpg', stock: 25,
  },
  {
    nombre: 'Discos Menstruales',
    resumen: 'Disco flexible de silicona que se coloca en el fondo vaginal, apto para el día o la noche.',
    descripcion: 'Disco menstrual de silicona suave y flexible, libre de tóxicos. Se ubica en el fondo de la vagina, es reutilizable o desechable según el modelo y viene con bolsita de algodón para guardarlo. Sigue siempre las instrucciones de colocación y limpieza.',
    precio: 20, categoria: 'menstruacion', imagen: '/discos_menstruales.jpg', stock: 20,
  },
  {
    nombre: 'Calzón Menstrual Absorbente',
    resumen: 'Ropa interior a prueba de fugas para mayor comodidad durante el día o la noche.',
    descripcion: 'Diseñado con tecnología multicapa absorbente y anti-fugas. Sustituye las toallas tradicionales garantizando comodidad y sequedad.',
    precio: 22, categoria: 'menstruacion', imagen: '/pantie_menstrual.jpg', stock: 18,
  },
  {
    nombre: 'Toallas Ecológicas (Pack x5)',
    resumen: 'Toallas femeninas de algodón orgánico super absorbentes y suaves con tu piel.',
    descripcion: 'Realizadas con capas de algodón orgánico certificado y barrera impermeable respirable. Lavables, ultra suaves y amigables con el planeta.',
    precio: 15, categoria: 'menstruacion', imagen: '/toallas_ecologicas.jpg', stock: 40,
  },
  {
    nombre: 'Tampones de Algodón Orgánico',
    resumen: 'Tampones sin aplicador, de algodón orgánico, suaves y absorbentes.',
    descripcion: 'Caja de 10 tampones de algodón orgánico sin aplicador, con cordón de retiro. Cámbialos con la frecuencia indicada en el empaque (nunca más de 8 horas) para cuidar tu salud.',
    precio: 8, categoria: 'menstruacion', imagen: '/tampones.jpg', stock: 50,
  },
  {
    nombre: 'Bolsitas para Guardar Productos Menstruales',
    resumen: 'Bolsitas de tela con cierre para llevar tu copa, toallas o calzones con discreción.',
    descripcion: 'Bolsitas de tela con cierre, lavables y discretas, ideales para guardar y transportar tu copa, discos, toallas de tela o tampones en el bolso o la mochila.',
    precio: 7, categoria: 'menstruacion', imagen: '/bolsitas_guardar.jpg', stock: 35,
  },

  // ---------- Higiene íntima ----------
  {
    nombre: 'Jabón Íntimo pH Neutro',
    resumen: 'Enriquecido con extracto de manzanilla y lavanda para proteger tu microbiota.',
    descripcion: 'Fórmula suave sin sulfatos ni parabenos, diseñada para mantener el equilibrio natural del pH femenino con aroma relajante a lavanda.',
    precio: 12, categoria: 'higiene', imagen: '/jabon_intimo.jpg', stock: 60,
  },

  // ---------- Alivio y bienestar ----------
  {
    nombre: 'Parches Térmicos para Cólicos',
    resumen: 'Parches adhesivos de calor terapéutico para aliviar molestias menstruales hasta 8h.',
    descripcion: 'Calor natural autorregulable que relaja los músculos uterinos y disminuye el dolor menstrual. Fácil de usar y discreto debajo de la ropa.',
    precio: 10, categoria: 'alivio', imagen: '/parche_termico.jpg', stock: 0,
  },
  {
    nombre: 'Bolsa Térmica',
    resumen: 'Bolsa de agua caliente con funda tejida para aliviar cólicos y tensión.',
    descripcion: 'Bolsa térmica de agua caliente con funda tejida suave. Aplica calor sobre el abdomen o la espalda baja para ayudar a relajar los músculos. Usa agua caliente, no hirviendo, y no la apliques directamente sobre la piel por tiempos prolongados.',
    precio: 14, categoria: 'alivio', imagen: '/bolsa_termica.jpg', stock: 22,
  },
  {
    nombre: 'Almohadilla de Calor',
    resumen: 'Almohadilla eléctrica con control de temperatura para tus días difíciles.',
    descripcion: 'Almohadilla de calor con tela afelpada y control de encendido. Brinda calor constante y reconfortante en abdomen, espalda o cuello. Sigue las indicaciones del fabricante y no te duermas con ella encendida.',
    precio: 25, categoria: 'alivio', imagen: '/almohadilla_calor.jpg', stock: 15,
  },
  {
    nombre: 'Compresas Reutilizables',
    resumen: 'Compresas de gel para calor o frío, con funda de tela suave.',
    descripcion: 'Compresas reutilizables que se pueden usar calientes (microondas) o frías (congelador) según lo que necesites. Con funda de tela suave y lavable. Sigue el tiempo de calentamiento indicado para evitar quemaduras.',
    precio: 12, categoria: 'alivio', imagen: '/compresas_reutilizables.jpg', stock: 28,
  },
  {
    nombre: 'Masajeador Corporal',
    resumen: 'Masajeador portátil recargable para relajar espalda, cuello y zona lumbar.',
    descripcion: 'Masajeador corporal portátil con varias intensidades. Ayuda a relajar la tensión muscular de espalda, cuello y zona lumbar durante la menstruación o después de un día largo.',
    precio: 30, categoria: 'alivio', imagen: '/masajeador_corporal.jpg', stock: 12,
  },
  {
    nombre: 'Botella de Agua Reutilizable',
    resumen: 'Botella térmica de acero inoxidable para mantenerte hidratada todo el día.',
    descripcion: 'Botella reutilizable de acero inoxidable, libre de BPA. Mantener una buena hidratación ayuda a sentirte mejor durante tu ciclo. Mantiene tu bebida fría o caliente por horas.',
    precio: 16, categoria: 'alivio', imagen: '/botella_agua.jpg', stock: 30,
  },
  {
    nombre: 'Infusiones de Hierbas',
    resumen: 'Mezclas de manzanilla y lavanda de proveedores confiables, para relajarte.',
    descripcion: 'Infusiones de hierbas de proveedores confiables, como manzanilla y lavanda, para acompañar tus momentos de descanso. Son un complemento de bienestar, no un tratamiento: si estás embarazada, lactando o tomas medicación, consulta antes con un profesional de salud.',
    precio: 9, categoria: 'alivio', imagen: '/infusiones_hierbas.jpg', stock: 45,
  },
  {
    nombre: 'Chocolates Artesanales',
    resumen: 'Chocolate oscuro artesanal para un antojo dulce y reconfortante.',
    descripcion: 'Barras de chocolate oscuro artesanal envueltas en papel lila. Un detalle reconfortante para los días de antojo o para regalar.',
    precio: 6, categoria: 'alivio', imagen: '/chocolates.jpg', stock: 40,
  },

  // ---------- Salud sexual ----------
  {
    nombre: 'Test de Embarazo',
    resumen: 'Pruebas rápidas de uso casero con resultado en minutos.',
    descripcion: 'Caja con 3 tests de embarazo de uso casero. Siguiendo las instrucciones, muestran el resultado en pocos minutos. Si el resultado es positivo o tienes dudas, consulta a un profesional de salud para confirmarlo.',
    precio: 5, categoria: 'salud-sexual', imagen: '/test_embarazo.jpg', stock: 40,
  },
  {
    nombre: 'Píldora del Día Siguiente',
    resumen: 'Anticoncepción de emergencia; no es un método de uso habitual.',
    descripcion: 'Píldora de anticoncepción de emergencia (por ejemplo, Postday). Se toma lo antes posible tras una relación sin protección o ante falla del método; mientras antes se tome, más efectiva es. No protege de infecciones de transmisión sexual ni reemplaza un método habitual. Lee el prospecto y ante dudas consulta a un profesional de salud o farmacia.',
    precio: 10, categoria: 'salud-sexual', imagen: '/pildora_emergencia.jpg', stock: 30,
  },
  {
    nombre: 'Condones',
    resumen: 'Preservativos de látex: previenen embarazos y protegen de infecciones de transmisión sexual.',
    descripcion: 'Preservativos de látex lubricados. Usados correctamente en cada relación, ayudan a prevenir el embarazo y reducen el riesgo de infecciones de transmisión sexual. Revisa la fecha de vencimiento y úsalos una sola vez.',
    precio: 6, categoria: 'salud-sexual', imagen: '/condones.jpg', stock: 60,
  },
  {
    nombre: 'Lubricante a Base de Agua',
    resumen: 'Lubricante íntimo a base de agua, compatible con preservativos de látex.',
    descripcion: 'Lubricante a base de agua para mayor comodidad y menos fricción. Es compatible con preservativos de látex. Si tienes piel sensible o alergias, haz una prueba en una zona pequeña antes de usarlo.',
    precio: 9, categoria: 'salud-sexual', imagen: '/condones.jpg', stock: 35,
  },
];

try {
  await mongoose.connect(process.env.MONGODB_URI);
  // Upsert por nombre: agrega los nuevos y actualiza los existentes SIN borrar nada
  for (const p of productos) {
    const r = await Producto.updateOne({ nombre: p.nombre }, { $set: p }, { upsert: true });
    console.log(r.upsertedCount ? `➕ ${p.nombre}` : `♻️  ${p.nombre} (actualizado)`);
  }
  console.log(`✅ ${await Producto.countDocuments()} productos en MongoDB Atlas`);
} catch (err) {
  console.error('❌ Error en seed:', err.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
