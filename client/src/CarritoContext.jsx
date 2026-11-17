import { createContext, useContext, useEffect, useState } from 'react';

const CLAVE = 'warmicita_carrito';
const CarritoContext = createContext(null);

// Lee el carrito guardado en LocalStorage (si existe)
const leerGuardado = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
};

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerGuardado);

  // Cada vez que cambia el carrito, se guarda en LocalStorage
  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(items));
  }, [items]);

  const maximo = (item) => (item.stock > 0 ? item.stock : 99);

  const agregar = (producto, cantidad = 1) => {
    setItems((actual) => {
      const existente = actual.find((i) => i._id === producto._id);
      if (existente) {
        return actual.map((i) =>
          i._id === producto._id ? { ...i, cantidad: Math.min(i.cantidad + cantidad, maximo(i)) } : i
        );
      }
      const nuevo = {
        _id: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        stock: producto.stock,
        cantidad: Math.min(cantidad, maximo(producto)),
      };
      return [...actual, nuevo];
    });
  };

  const cambiarCantidad = (id, cantidad) => {
    setItems((actual) =>
      actual.map((i) => (i._id === id ? { ...i, cantidad: Math.max(1, Math.min(cantidad, maximo(i))) } : i))
    );
  };

  const eliminar = (id) => setItems((actual) => actual.filter((i) => i._id !== id));
  const vaciar = () => setItems([]);

  const totalProductos = items.reduce((suma, i) => suma + i.cantidad, 0);
  const total = items.reduce((suma, i) => suma + i.precio * i.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{ items, agregar, cambiarCantidad, eliminar, vaciar, totalProductos, total }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);
