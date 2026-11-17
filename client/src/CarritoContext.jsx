import { createContext, useContext, useEffect, useState } from 'react';

const CLAVE = 'warmicita_carrito';
const CarritoContext = createContext(null);

// Lee el carrito guardado en LocalStorage (si existe)
function leerGuardado() {
  try {
    const texto = localStorage.getItem(CLAVE);
    if (!texto) {
      return [];
    }
    return JSON.parse(texto);
  } catch (error) {
    return [];
  }
}

function obtenerMaximo(item) {
  if (item.stock > 0) {
    return item.stock;
  }
  return 99;
}

export function CarritoProvider(props) {
  const [items, setItems] = useState(leerGuardado);

  // Cada vez que cambia el carrito, se guarda en LocalStorage
  useEffect(function () {
    localStorage.setItem(CLAVE, JSON.stringify(items));
  }, [items]);

  function agregar(producto, cantidad) {
    let cantidadAgregar = 1;
    if (cantidad !== undefined) {
      cantidadAgregar = cantidad;
    }

    const nuevaLista = [];
    let encontrado = false;

    for (let i = 0; i < items.length; i++) {
      const itemActual = items[i];

      if (itemActual._id === producto._id) {
        encontrado = true;
        const max = obtenerMaximo(itemActual);
        let nuevaCantidad = itemActual.cantidad + cantidadAgregar;
        if (nuevaCantidad > max) {
          nuevaCantidad = max;
        }

        const copiaItem = Object.assign({}, itemActual);
        copiaItem.cantidad = nuevaCantidad;
        nuevaLista.push(copiaItem);
      } else {
        nuevaLista.push(itemActual);
      }
    }

    if (!encontrado) {
      const maxNuevo = obtenerMaximo(producto);
      let cantInicial = cantidadAgregar;
      if (cantInicial > maxNuevo) {
        cantInicial = maxNuevo;
      }

      const nuevo = {
        _id: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        stock: producto.stock,
        cantidad: cantInicial,
      };
      nuevaLista.push(nuevo);
    }

    setItems(nuevaLista);
  }

  function cambiarCantidad(id, cantidad) {
    const nuevaLista = [];

    for (let i = 0; i < items.length; i++) {
      const itemActual = items[i];

      if (itemActual._id === id) {
        const max = obtenerMaximo(itemActual);
        let nuevaCantidad = cantidad;
        if (nuevaCantidad < 1) {
          nuevaCantidad = 1;
        }
        if (nuevaCantidad > max) {
          nuevaCantidad = max;
        }

        const copiaItem = Object.assign({}, itemActual);
        copiaItem.cantidad = nuevaCantidad;
        nuevaLista.push(copiaItem);
      } else {
        nuevaLista.push(itemActual);
      }
    }

    setItems(nuevaLista);
  }

  function eliminar(id) {
    const nuevaLista = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i]._id !== id) {
        nuevaLista.push(items[i]);
      }
    }
    setItems(nuevaLista);
  }

  function vaciar() {
    setItems([]);
  }

  // Cálculo de totales con bucle for tradicional
  let totalProductos = 0;
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    totalProductos = totalProductos + items[i].cantidad;
    total = total + (items[i].precio * items[i].cantidad);
  }

  const valorContexto = {
    items: items,
    agregar: agregar,
    cambiarCantidad: cambiarCantidad,
    eliminar: eliminar,
    vaciar: vaciar,
    totalProductos: totalProductos,
    total: total,
  };

  return (
      <CarritoContext.Provider value={valorContexto}>
        {props.children}
      </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}