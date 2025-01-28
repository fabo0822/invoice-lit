import { getInvoiceDetails } from "./details.js";

// Inicializa el array de facturas desde el localStorage
let facturas = JSON.parse(localStorage.getItem("facturas")) || [];

// Función para calcular el resumen de la factura (subtotal, IVA y total)
export function calculateSummary(summaryComponent) {
  // Escucha el evento 'detailUpdated' para recalcular el resumen
  document.addEventListener("detailUpdated", (event) => {
    const details = event.detail;

    // Calcula el subtotal sumando los subtotales de cada producto
    summaryComponent.subtotal = details.reduce((acc, item) => acc + item.subtotal, 0);

    // Calcula el IVA (19% del subtotal)
    summaryComponent.iva = summaryComponent.subtotal * 0.19;

    // Calcula el total (subtotal + IVA)
    summaryComponent.total = summaryComponent.subtotal + summaryComponent.iva;
  });
}

// Función para procesar el pago y generar la factura
export function processPayment(summaryComponent) {
  // Obtiene la información del encabezado y los detalles de la factura
  const header = getHeaderInfo();
  const detailFact = getInvoiceDetails();

  // Verifica si falta información para procesar el pago
  if (!header || detailFact.length === 0) {
    alert("Por favor complete todos los campos y registre productos en la factura.");
    return;
  }

  // Crea la factura con los datos obtenidos
  const factura = {
    nroFactura: _getInvoiceID(),
    header,
    detailFact,
    summary: {
      subtotal: summaryComponent.subtotal,
      iva: summaryComponent.iva,
      total: summaryComponent.total,
    },
  };

  // Guarda la factura en el localStorage
  facturas.push(factura);
  localStorage.setItem("facturas", JSON.stringify(facturas));

  alert("¡Factura generada con éxito!");

  // Recarga la página después de un breve retraso
  reloadPage();
}

// Función para obtener la información del encabezado desde el componente
function getHeaderInfo() {
  const headerComponent = document.querySelector("header-component")?.shadowRoot;

  if (!headerComponent) return null;

  const identificacion = headerComponent.querySelector("#idClient")?.value.trim();
  const nombres = headerComponent.querySelector("#nameClient")?.value.trim();
  const apellido = headerComponent.querySelector("#lastNameClient")?.value.trim();
  const direccion = headerComponent.querySelector("#direction")?.value.trim();
  const email = headerComponent.querySelector("#email")?.value.trim();

  // Verifica que todos los campos del encabezado estén completos
  if (!identificacion || !nombres || !apellido || !direccion || !email) {
    return null;
  }

  return { identificacion, nombres, apellido, direccion, email };
}

// Función para obtener el ID de la factura desde el componente
function _getInvoiceID() {
  const headerComponent = document.querySelector("header-component")?.shadowRoot;
  return headerComponent?.querySelector("#invoiceID")?.value.trim() || null;
}

// Función para recargar la página después de un retraso
export function reloadPage() {
  setTimeout(() => {
    location.reload();
  }, 500);
}
