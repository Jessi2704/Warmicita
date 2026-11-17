import { NOMBRE_TIENDA, WHATSAPP_NUMBER } from './config.js';

const CLAVE_CONTADOR = 'warmicita_ultimo_pedido';

export function dinero(n) {
  return '$' + Number(n).toFixed(2);
}

// Genera el siguiente código: WAR-00001, WAR-00002...
export function nuevoCodigo() {
  const guardado = localStorage.getItem(CLAVE_CONTADOR);
  let actual = Number(guardado);
  if (!actual) {
    actual = 0;
  }

  const siguiente = actual + 1;
  localStorage.setItem(CLAVE_CONTADOR, String(siguiente));

  // Rellena con ceros a la izquierda hasta tener 5 dígitos
  let numeroTexto = String(siguiente);
  while (numeroTexto.length < 5) {
    numeroTexto = '0' + numeroTexto;
  }

  return 'WAR-' + numeroTexto;
}

// Mensaje de WhatsApp
export function mensajeWhatsApp(pedido) {
  const partes = [];
  partes.push('*NUEVO PEDIDO – ' + NOMBRE_TIENDA + '*');
  partes.push('Hola, quiero realizar el siguiente pedido:');
  partes.push('');
  partes.push('Código: ' + pedido.codigo);
  partes.push('');
  partes.push('Productos:');

  for (let i = 0; i < pedido.items.length; i++) {
    const item = pedido.items[i];
    const subtotal = item.precio * item.cantidad;
    partes.push(item.nombre + ' x' + item.cantidad + ' – ' + dinero(subtotal));
  }

  partes.push('');
  partes.push('*Total: ' + dinero(pedido.total) + '*');
  partes.push('');
  partes.push('Datos de entrega:');
  partes.push('Nombre: ' + pedido.cliente.nombre);
  partes.push('Celular: ' + pedido.cliente.celular);
  partes.push('Ciudad: ' + pedido.cliente.ciudad);
  partes.push('Dirección: ' + pedido.cliente.direccion);
  partes.push('Referencia: ' + pedido.cliente.referencia);

  if (pedido.cliente.observaciones) {
    partes.push('Observaciones: ' + pedido.cliente.observaciones);
  }

  partes.push('');
  partes.push('Quedo atenta a la confirmación de mi pedido. 💜');

  return partes.join('\n');
}

// Enlace Click to Chat: abre WhatsApp con el mensaje listo
export function enlaceWhatsApp(pedido) {
  const mensajeCodificado = encodeURIComponent(mensajeWhatsApp(pedido));
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + mensajeCodificado;
}