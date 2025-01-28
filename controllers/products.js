import { dataBase } from "../js/data.js";

// Función para listar productos y gestionar la selección del producto
export function listProduct(productsComponent) {
  // Obtener referencias a los elementos del shadow DOM
  const item = productsComponent.shadowRoot.querySelector("#productList");
  const productIdInput = productsComponent.shadowRoot.querySelector("#productIdInput");
  const unitaryValueInput = productsComponent.shadowRoot.querySelector("#unitaryValue");

  // Agregar las opciones de productos al <select> en el shadow DOM
  dataBase.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id; // Usar el ID del producto como valor
    option.textContent = product.product; // Nombre del producto
    item.appendChild(option); // Añadir la opción al <select>
  });

  // Evento para actualizar los campos de código y valor unitario al seleccionar un producto
  item.addEventListener("change", (event) => {
    const selectedProductId = event.target.value; // Obtener el id del producto seleccionado
    const selectedProduct = dataBase.find((product) => product.id === selectedProductId); // Buscar el producto en la base de datos

    // Si se encuentra el producto, actualizar los campos correspondientes
    if (selectedProduct) {
      productIdInput.value = selectedProduct.cod; // Actualizar el código del producto
      unitaryValueInput.value = `$ ${selectedProduct.price}`; // Actualizar el precio unitario
    } else {
      // Limpiar los campos si no hay producto seleccionado o si es inválido
      productIdInput.value = "";
      unitaryValueInput.value = "";
    }
  });
}
