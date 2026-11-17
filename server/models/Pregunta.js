import mongoose from 'mongoose';

// Preguntas anónimas: NO se guarda ningún dato personal (ni IP, ni nombre, ni correo)
const preguntaSchema = new mongoose.Schema(
  {
    texto: { type: String, required: true, trim: true, minlength: 10, maxlength: 600 },
    tema: {
      type: String,
      required: true,
      enum: ['menstruacion', 'anticoncepcion', 'sexualidad', 'salud-intima', 'otro'],
    },
    respondida: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model('Pregunta', preguntaSchema);
