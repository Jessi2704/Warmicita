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

// Contenido del archivo .txt
export function textoPedido(pedido) {
  const lineaDoble = '============================================';
  const lineaSimple = '--------------------------------------------';
  const fechaTexto = new Date(pedido.fecha).toLocaleString('es-EC');

  const lineas = [];
  lineas.push(lineaDoble);
  lineas.push('  ' + NOMBRE_TIENDA);
  lineas.push(lineaDoble);
  lineas.push('Pedido: ' + pedido.codigo);
  lineas.push('Fecha: ' + fechaTexto);
  lineas.push('');
  lineas.push('DATOS DE LA CLIENTA');
  lineas.push('Nombre: ' + pedido.cliente.nombre);
  lineas.push('Celular: ' + pedido.cliente.celular);
  lineas.push('Ciudad: ' + pedido.cliente.ciudad);
  lineas.push('');
  lineas.push('DETALLE DE PRODUCTOS');
  lineas.push(lineaSimple);

  for (let i = 0; i < pedido.items.length; i++) {
    const item = pedido.items[i];
    const subtotal = item.precio * item.cantidad;
    lineas.push(item.nombre);
    lineas.push(
        '  Cantidad: ' + item.cantidad +
        '  |  Precio unitario: ' + dinero(item.precio) +
        '  |  Subtotal: ' + dinero(subtotal)
    );
  }

  lineas.push(lineaSimple);
  lineas.push('TOTAL GENERAL: ' + dinero(pedido.total));
  lineas.push('');
  lineas.push('ENTREGA');
  lineas.push('Dirección: ' + pedido.cliente.direccion);
  lineas.push('Referencia: ' + pedido.cliente.referencia);

  let obs = 'Ninguna';
  if (pedido.cliente.observaciones) {
    obs = pedido.cliente.observaciones;
  }
  lineas.push('Observaciones: ' + obs);
  lineas.push(lineaDoble);

  return lineas.join('\r\n');
}

// Descarga el pedido como pedido_WAR-00001.txt
export function descargarTxt(pedido) {
  const contenido = textoPedido(pedido);
  const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = 'pedido_' + pedido.codigo + '.txt';
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(url);
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
