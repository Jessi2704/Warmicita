import { NOMBRE_TIENDA, WHATSAPP_NUMBER } from './config.js';

const CLAVE_CONTADOR = 'warmicita_ultimo_pedido';

export const dinero = (n) => `$${Number(n).toFixed(2)}`;

// Genera el siguiente código: WAR-00001, WAR-00002...
// (el contador se guarda en este navegador)
export function nuevoCodigo() {
  const siguiente = (Number(localStorage.getItem(CLAVE_CONTADOR)) || 0) + 1;
  localStorage.setItem(CLAVE_CONTADOR, String(siguiente));
  return `WAR-${String(siguiente).padStart(5, '0')}`;
}

// Contenido del archivo .txt
export function textoPedido(pedido) {
  const { codigo, fecha, cliente, items, total } = pedido;
  const linea = '='.repeat(44);
  const lineas = [
    linea,
    `  ${NOMBRE_TIENDA}`,
    linea,
    `Pedido: ${codigo}`,
    `Fecha: ${new Date(fecha).toLocaleString('es')}`,
    '',
    'DATOS DE LA CLIENTA',
    `Nombre: ${cliente.nombre}`,
    `Celular: ${cliente.celular}`,
    `Ciudad: ${cliente.ciudad}`,
    '',
    'DETALLE DE PRODUCTOS',
    '-'.repeat(44),
    ...items.flatMap((i) => [
      i.nombre,
      `  Cantidad: ${i.cantidad}  |  Precio unitario: ${dinero(i.precio)}  |  Subtotal: ${dinero(i.precio * i.cantidad)}`,
    ]),
    '-'.repeat(44),
    `TOTAL GENERAL: ${dinero(total)}`,
    '',
    'ENTREGA',
    `Dirección: ${cliente.direccion}`,
    `Referencia: ${cliente.referencia}`,
    `Observaciones: ${cliente.observaciones || 'Ninguna'}`,
    linea,
  ];
  return lineas.join('\r\n');
}

// Descarga el pedido como pedido_WAR-00001.txt
export function descargarTxt(pedido) {
  const blob = new Blob([textoPedido(pedido)], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pedido_${pedido.codigo}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Mensaje de WhatsApp
export function mensajeWhatsApp(pedido) {
  const { codigo, cliente, items, total } = pedido;
  const partes = [
    `*NUEVO PEDIDO – ${NOMBRE_TIENDA}*`,
    'Hola, quiero realizar el siguiente pedido:',
    '',
    `Código: ${codigo}`,
    '',
    'Productos:',
    ...items.map((i) => `${i.nombre} x${i.cantidad} – ${dinero(i.precio * i.cantidad)}`),
    '',
    `*Total: ${dinero(total)}*`,
    '',
    'Datos de entrega:',
    `Nombre: ${cliente.nombre}`,
    `Celular: ${cliente.celular}`,
    `Ciudad: ${cliente.ciudad}`,
    `Dirección: ${cliente.direccion}`,
    `Referencia: ${cliente.referencia}`,
  ];
  if (cliente.observaciones) partes.push(`Observaciones: ${cliente.observaciones}`);
  partes.push('', 'Quedo atenta a la confirmación de mi pedido. 💜');
  return partes.join('\n');
}

// Enlace Click to Chat: abre WhatsApp con el mensaje listo (la clienta debe presionar "Enviar")
export function enlaceWhatsApp(pedido) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensajeWhatsApp(pedido))}`;
}
