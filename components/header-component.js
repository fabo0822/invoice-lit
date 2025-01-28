import { LitElement, html } from 'lit';
import { validateHeaderInputs } from '../controllers/header.js';

export class HeaderComponent extends LitElement {
  constructor() {
    super();
    // Generación de un ID único basado en la marca de tiempo actual
    this.id = Date.now().toString(16).toUpperCase();
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
      <div class="container text-center card">
        <!-- Encabezado con el número de factura -->
        <div class="row align-items-start card-header">
          <h3>Apple Store - No. Factura</h3>
          <div class="col">
            <input
              id="invoiceID"
              class="form-control text-center"
              type="text"
              .value="${this.id}"
              aria-label="Disabled input example"
              disabled
              readonly
            />
          </div>
        </div>
        <!-- Formulario para capturar los datos del cliente -->
        <div class="card-body">
          <!-- Campo No. Id -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">No. Id</label>
            <div class="col-sm-10">
              <input class="form-control" id="idClient" />
            </div>
          </div>
          <!-- Campos Nombres y Apellidos -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Nombres</label>
            <div class="col-sm-4">
              <input class="form-control" id="nameClient" />
            </div>
            <label class="col-sm-2 col-form-label">Apellidos</label>
            <div class="col-sm-4">
              <input class="form-control" id="lastNameClient" />
            </div>
          </div>
          <!-- Campo Dirección -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Dirección</label>
            <div class="col-sm-10">
              <input class="form-control" id="direction" />
            </div>
          </div>
          <!-- Campo Email -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input class="form-control" id="email" type="email" />
            </div>
          </div>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    // Agrega un evento para validar los inputs cuando el usuario interactúe con el componente
    this.shadowRoot.addEventListener('input', this._validateInputs.bind(this));
  }

  disconnectedCallback() {
    // Elimina el evento al desconectar el componente para evitar fugas de memoria
    this.shadowRoot.removeEventListener('input', this._validateInputs.bind(this));
    super.disconnectedCallback();
  }

  // Método para manejar la validación de los campos
  _validateInputs() {
    validateHeaderInputs(this.shadowRoot); // Llama al controlador para validar los inputs
  }
}

// Define el componente como un custom element
customElements.define('header-component', HeaderComponent);
