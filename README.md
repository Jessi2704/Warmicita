# 🌸 Warmicita - Cuidado Femenino y Educación Sexual

**Warmicita** es una plataforma web enfocada en la promoción del **cuidado femenino**, la **higiene menstrual consciente** y la **educación sexual integral**. El proyecto busca derribar tabúes, ofrecer un catálogo de alternativas sostenibles e informativas para el bienestar de la mujer y promover el autocuidado consciente en cada etapa del ciclo.

---

## 📌 Tabla de Contenidos

1. [Acerca del Proyecto](#-acerca-del-proyecto)
2. [Características Principales](#-características-principales)
3. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Instrucciones de Uso / Instalación](#-instrucciones-de-uso--instalación)
6. [Enfoque Educativo y Sostenibilidad](#-enfoque-educativo-y-sostenibilidad)
7. [Futuras Mejoras](#-futuras-mejoras)

---

## 🌸 Acerca del Proyecto

**Warmicita** nace de la necesidad de crear un espacio seguro, informativo y accesible donde las mujeres y personas menstruantes puedan encontrar información confiable sobre salud íntima, educación sexual y productos de cuidado corporal libres de tóxicos.

El sitio integra un **catálogo interactivo** de productos reutilizables y ecológicos junto a **secciones informativas** que destacan los beneficios de una higiene respetuosa con el cuerpo y el planeta.

---

## ⚡ Características Principales

La web tiene una **página de inicio** con encabezado, 3 secciones grandes con imagen y pie de página. Cada sección se abre con un menú superior (Inicio · Tienda · Ciclo · Aprende):

* 🛒 **Tienda:** catálogo con filtros por categoría, modal de detalles, beneficios, "Cómo pedir" y carrito con pedido por WhatsApp.
* 🌸 **Ciclo:** calculadora del ciclo menstrual (próximo periodo, ovulación, ventana fértil) y "Conoce tu ciclo" con sus 4 fases.
* 📚 **Aprende:** "Pregunta sin vergüenza" (consulta anónima), "Aprende sobre tu cuerpo" y "Conoce tus métodos anticonceptivos".
* 📱 **Diseño responsive** en tonos lavanda y morado.

---

## 🛠️ Tecnologías Utilizadas

> **Lenguaje:** todo el proyecto está en **JavaScript** (frontend con JSX/React y backend con Node.js), más HTML y CSS.

* **React 18 + Vite:** Interfaz en componentes dentro de `client/`.
* **Node.js + Express:** API REST en `server/` (`GET/POST /api/productos`).
* **MongoDB Atlas + Mongoose:** Base de datos en la nube donde viven los productos del catálogo.
* **CSS3:** Estilos nativos (Vanilla CSS) utilizando *Flexbox* y *CSS Grid*, animaciones suaves y componentes flotantes (Modales).

---

## 📁 Estructura del Proyecto

```text
warmicita/
├── assets/                 # Imágenes (Vite las sirve como carpeta pública)
├── client/                 # Frontend React + Vite
│   ├── index.html
│   ├── vite.config.js      # Proxy /api -> localhost:3000
│   └── src/
│       ├── main.jsx        # Punto de entrada de React
│       ├── App.jsx         # Navegación entre Inicio / Tienda / Ciclo / Aprende
│       ├── CarritoContext.jsx  # Estado global del carrito
│       ├── config.js / pedido.js  # Número de WhatsApp y mensaje del pedido
│       ├── index.css / carrito.css
│       └── components/     # PaginaInicio, Catalogo, TarjetaProducto, ModalProducto,
│                           # ComoPedir, Carrito, Entrega, PedidoListo, Calculadora,
│                           # ConoceCiclo, PreguntaSinVerguenza, AprendeCuerpo,
│                           # MetodosAnticonceptivos
├── server/                 # API Express + MongoDB Atlas
│   ├── index.js
│   ├── seed.js             # Carga los productos iniciales
│   ├── models/Producto.js
│   └── .env.example
├── index.html              # Versión original estática (referencia)
├── package.json            # Scripts generales (install:all, dev, build, seed)
└── README.md
```

---

## 🚀 Instrucciones de Uso / Instalación

### Requisitos
* [Node.js](https://nodejs.org) 18 o superior (incluye `npm`).
* Una cuenta gratuita de [MongoDB Atlas](https://cloud.mongodb.com) (solo si quieres usar la base de datos).

### 1. Clonar e instalar dependencias
```bash
git clone https://github.com/Jessi2704/Warmicita.git
cd Warmicita
npm run install:all        # instala server/ y client/
```

### 2. Configurar la base de datos (servidor)
```bash
cd server
cp .env.example .env       # pega tu cadena de conexión en MONGODB_URI
npm run seed               # carga los productos iniciales en Atlas
```
> En Atlas recuerda permitir tu IP en *Network Access*.

### 3. Levantar el proyecto en desarrollo (2 terminales)

**Terminal 1 – API:**
```bash
cd server
npm run dev                # http://localhost:3000
```

**Terminal 2 – Frontend:**
```bash
cd client
npm run dev                # http://localhost:5173
```

Abre **http://localhost:5173** en el navegador. 🎉

### 4. Producción
```bash
npm run build              # compila el frontend (client/dist)
npm start                  # el servidor sirve todo en http://localhost:3000
```

---

## 🌱 Enfoque Educativo y Sostenibilidad

Warmicita promueve 3 pilares fundamentales:

1. **Cuidado Corporal:** Productos libres de blanqueadores clorados, parabenos y sintéticos agresivos.
2. **Economía Consciente:** Alternativas reutilizables de larga duración que reducen el gasto periódico en productos desechables.
3. **Sostenibilidad Ambiental:** Disminución de la huella ecológica y generación de residuos plásticos.

---

## 🔮 Futuras Mejoras

* 💾 Guardar el carrito en `localStorage` para no perderlo al recargar.
* 📖 Más artículos sobre Educación Sexual Integral y salud ginecológica.
* 🔐 Panel de administración para gestionar productos.

---

<p center>
  Desarrollado con 💜 para el cuidado y la educación femenina.
</p>
