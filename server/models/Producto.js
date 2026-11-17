import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    resumen: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 },
    categoria: {
      type: String,
      required: true,
      enum: ['menstruacion', 'higiene', 'alivio', 'salud-sexual'],
    },
    imagen: { type: String, required: true },
    stock: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Producto', productoSchema);
