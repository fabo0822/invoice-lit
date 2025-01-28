import { LitElement, html } from 'lit';
import { listProduct } from '../controllers/products.js';
import { addProductToDetail } from '../controllers/details.js';

export class ProductsComponent extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <!-- Incluye los estilos de Bootstrap -->
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous"
      />
      <br />
      <div class="container card">
        <div class="card-body text-center">
          <!-- Campo de entrada para el código de producto -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Código de Producto</label>
            <div class="col-sm-10">
              <input
                id="productIdInput"
                class="form-control text-center"
                type="text"
                value=""
                disabled
                readonly
              />
            </div>
          </div>

          <!-- Selección de producto -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Nombre de Producto</label>
            <div class="col-sm-10">
              <select id="productList" class="form-select">
                <option value="">Elige tu producto</option>
              </select>
            </div>
          </div>

          <!-- Campo de valor unitario y cantidad -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Valor Unitario</label>
            <div class="col-sm-4">
              <input
                id="unitaryValue"
                class="form-control text-center"
                type="text"
                value=""
                disabled
                readonly
              />
            </div>
            <label class="col-sm-2 col-form-label">Cantidad</label>
            <div class="col-sm-4">
              <input
                id="quantity"
                class="form-control"
                type="number"
                min="1"
                step="1"
              />
            </div>
          </div>

          <!-- Botón para agregar el producto -->
          <div class="mb-3 row">
            <button
              id="addButton"
              type="button"
              class="btn btn-outline-success col-sm-12"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    // Llama a listProduct para cargar los productos en el selector
    listProduct(this);

    // Referencia a los elementos del DOM
    const productIdInput = this.shadowRoot.querySelector("#productIdInput");
    const productList = this.shadowRoot.querySelector("#productList");
    const unitaryValueInput = this.shadowRoot.querySelector("#unitaryValue");
    const quantityInput = this.shadowRoot.querySelector("#quantity");
    const addButton = this.shadowRoot.querySelector("#addButton");

    // Evento click para agregar el producto al detalle
    addButton.addEventListener("click", () => {
      const productId = productIdInput.value;
      const productName = productList.options[productList.selectedIndex]?.textContent;
      const unitaryValue = parseFloat(unitaryValueInput.value.replace("$", "").trim());
      const quantity = parseInt(quantityInput.value, 10);

      // Validación de los datos antes de agregar el producto
      if (productId && productName && unitaryValue && quantity > 0) {
        const product = {
          cod: productId,
          product: productName,
          price: unitaryValue,
          quantity: quantity,
        };

        addProductToDetail(product); // Agrega el producto al detalle

        // Limpiar los campos de entrada
        this._clearInputs(productList, quantityInput, productIdInput, unitaryValueInput);
      } else {
        alert("Por favor, seleccione un producto y una cantidad válida.");
      }
    });
  }

  // Método para limpiar los campos de entrada
  _clearInputs(productList, quantityInput, productIdInput, unitaryValueInput) {
    productList.value = "";
    quantityInput.value = "";
    productIdInput.value = "";
    unitaryValueInput.value = "";
  }
}

customElements.define("products-component", ProductsComponent);
