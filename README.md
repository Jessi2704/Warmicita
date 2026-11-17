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

* 🏷️ **Catálogo Interactivo de Productos:** Navegación dinámica con filtros por categoría:
  * *Menstruación* (Copas menstruales, toallas ecológicas, calzones menstruales).
  * *Higiene Íntima* (Jabones neutros y productos de cuidado pH).
  * *Alivio y Bienestar* (Parches térmicos para cólicos).
* 🌸 **Calculadora de Ciclo Menstrual:** Herramienta interactiva en JavaScript para estimar la fecha del próximo periodo, el día aproximado de ovulación y la ventana fértil.
* 🔍 **Vista Previa y Modal de Detalles:** Ventana emergente interactiva para consultar fotografías en alta resolución, descripciones detalladas, precios y disponibilidad.
* 📚 **Sección de Educación y Salud:** Guía sobre salud menstrual, ingredientes seguros y reducción del impacto ambiental.
* 📱 **Diseño Responsive & Estético:** Paleta de colores en tonos lavanda y morado, totalmente optimizada para dispositivos móviles, tablets y computadoras.

---

## 🛠️ Tecnologías Utilizadas

* **React 18 + Vite:** Interfaz en componentes (`Catalogo`, `TarjetaProducto`, `ModalProducto`, `Calculadora`) en la carpeta `client/`.
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
│       ├── App.jsx
│       ├── index.css
│       └── components/     # Catalogo, TarjetaProducto, ModalProducto, Calculadora
├── server/                 # API Express + MongoDB Atlas
│   ├── index.js
│   ├── seed.js             # Carga los productos iniciales
│   ├── models/Producto.js
│   └── .env.example
├── index.html              # Versión original estática (referencia)
└── README.md
```

---

## 🚀 Instrucciones de Uso / Instalación

1. **MongoDB Atlas:** crea un cluster gratuito en https://cloud.mongodb.com, un usuario de base de datos y permite tu IP en *Network Access*.
2. **Configurar el servidor:**
   ```bash
   cd server
   cp .env.example .env      # pega tu cadena de conexión en MONGODB_URI
   npm install
   npm run seed              # inserta los 5 productos en Atlas
   npm run dev               # API en http://localhost:3000
   ```
3. **Levantar el frontend (otra terminal):**
   ```bash
   cd client
   npm install
   npm run dev               # http://localhost:5173
   ```
4. **Producción:** `cd client && npm run build`, luego `cd server && npm start` sirve todo en http://localhost:3000.

---

## 🌱 Enfoque Educativo y Sostenibilidad

Warmicita promueve 3 pilares fundamentales:

1. **Cuidado Corporal:** Productos libres de blanqueadores clorados, parabenos y sintéticos agresivos.
2. **Economía Consciente:** Alternativas reutilizables de larga duración que reducen el gasto periódico en productos desechables.
3. **Sostenibilidad Ambiental:** Disminución de la huella ecológica y generación de residuos plásticos.

---

## 🔮 Futuras Mejoras

* 🛒 Integración de un carrito de compras interactivo con almacenamiento local (`localStorage`).
* 💬 Botón de contacto directo a WhatsApp para atención y consultas personalizadas.
* 📖 Sección de Blog / Artículos sobre Educación Sexual Integral, ciclo menstrual y salud ginecológica.

---

<p center>
  Desarrollado con 💜 para el cuidado y la educación femenina.
</p>
