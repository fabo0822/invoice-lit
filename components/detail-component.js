import { LitElement, html } from "lit";
import{removeProductFromDetail} from "../controllers/details.js";

export class DetailComponent extends LitElement {
  static properties = {
    details: { type: Array }, // Define la propiedad 'details' como un array
  };

  constructor() {
    super();
    this.details = []; // Inicializa la propiedad 'details' como un array vacío
  }

  connectedCallback() {
    super.connectedCallback();

    // Escucha el evento personalizado 'detailUpdated' y actualiza los detalles
    document.addEventListener("detailUpdated", this._updateDetails.bind(this));
  }

  disconnectedCallback() {
    // Elimina el evento al desconectar el componente para evitar fugas de memoria
    document.removeEventListener("detailUpdated", this._updateDetails.bind(this));
    super.disconnectedCallback();
  }

  // Método para actualizar los detalles del componente
  _updateDetails(event) {
    this.details = event.detail; // Actualiza la propiedad 'details' con los datos recibidos
  }

  render() {
    return html`
      <!-- Incluye estilos de Bootstrap -->
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous"
      />
      <br />
      <div class="container card">
        <!-- Encabezado del detalle de la compra -->
        <div class="row text-center card-header">
          <h3>Detalle de la compra</h3>
        </div>
        <!-- Cuerpo de la tabla de detalles -->
        <div class="card-body">
          <table id="detailTable" class="table table-striped">
            <thead>
              <tr>
                <th>Cod</th>
                <th>Nombre</th>
                <th>Valor Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <!-- Recorre el array 'details' para renderizar los productos -->
              ${this.details.map(
                (product) => html`
                  <tr>
                    <td>${product.cod}</td>
                    <td>${product.product}</td>
                    <td>$${product.price}</td>
                    <td>${product.quantity}</td>
                    <td>$${product.subtotal.toFixed(2)}</td>
                    <td>
                      <!-- Botón para eliminar un producto -->
                      <button
                        class="btn btn-danger btn-sm"
                        @click="${() => this._removeProduct(product.cod)}"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Método para manejar la eliminación de un producto
  _removeProduct(cod) {
    removeProductFromDetail(cod); // Llama al controlador para eliminar el producto
  }
}

// Define el componente como un custom element
customElements.define("detail-component", DetailComponent);
