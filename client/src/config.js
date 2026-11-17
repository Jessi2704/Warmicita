// Configuración de la tienda.
// El número de WhatsApp se define en client/.env (VITE_WHATSAPP_NUMBER),
// en formato internacional, sin espacios ni signos. Ej: 593999999999
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '593XXXXXXXXX';
export const NOMBRE_TIENDA = 'WARMICITA';

// true cuando todavía no se ha colocado un número real
export const WHATSAPP_PENDIENTE = !/^\d{8,15}$/.test(WHATSAPP_NUMBER);
