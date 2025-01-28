// Array global para almacenar los detalles del producto
const detailData = [];

// Función para agregar o actualizar un producto en la tabla de detalles
export function addProductToDetail(product) {
  // Buscar si el producto ya existe en el array 'detailData'
  const existingProduct = detailData.find((item) => item.cod === product.cod);

  if (existingProduct) {
    // Si el producto ya existe, actualizar su cantidad y subtotal
    existingProduct.quantity += product.quantity;
    existingProduct.subtotal = existingProduct.quantity * existingProduct.price;
  } else {
    // Si el producto no existe, agregarlo al array
    detailData.push({
      ...product,
      subtotal: product.quantity * product.price, // Calcular el subtotal
    });
  }

  // Crear un evento personalizado para notificar que los detalles fueron actualizados
  const event = new CustomEvent("detailUpdated", {
    detail: [...detailData], // Se envía una copia del array actualizado para evitar mutaciones directas
  });
  document.dispatchEvent(event); // Emitir el evento
}

// Función para eliminar un producto de los detalles
export function removeProductFromDetail(cod) {
  // Buscar el índice del producto que se desea eliminar por su 'cod'
  const index = detailData.findIndex((item) => item.cod === cod);
  
  if (index !== -1) {
    // Si el producto existe, eliminarlo del array
    detailData.splice(index, 1);

    // Crear un evento personalizado para notificar que los detalles fueron actualizados
    const event = new CustomEvent("detailUpdated", {
      detail: [...detailData], // Se envía una copia del array actualizado
    });
    document.dispatchEvent(event); // Emitir el evento
  }
}

// Función para obtener los detalles actuales de los productos
export function getInvoiceDetails() {
  return [...detailData]; // Devolver una copia del array para evitar modificar el original
}

// Función para limpiar todos los detalles
export function clearDetails() {
  // Vaciar el array 'detailData'
  detailData.length = 0; 

  // Crear un evento personalizado para notificar que los detalles fueron limpiados
  const event = new CustomEvent("detailUpdated", { 
    detail: [] // Enviar un array vacío
  });
  document.dispatchEvent(event); // Emitir el evento
}
