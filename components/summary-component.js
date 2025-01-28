import { LitElement, html } from "lit";
import { calculateSummary, processPayment } from "../controllers/summary.js";

export class SummaryComponent extends LitElement {
  // Definir las propiedades del componente
  static properties = {
    subtotal: { type: Number },
    iva: { type: Number },
    total: { type: Number },
  };

  constructor() {
    super();
    // Inicializar los valores de subtotal, iva y total
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
  }

  connectedCallback() {
    super.connectedCallback();

    // Llama a la función para calcular el resumen al conectar el componente
    calculateSummary(this);
  }

  render() {
    return html`
    <!-- Enlace al archivo de Bootstrap para los estilos -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <br />
      <div class="container card">
        <div class="row text-center card-header">
          <h3>Resumen de Factura</h3>
        </div>
        <div class="card-body">
          <!-- Renderizar campos de entrada para subtotal, IVA y total -->
          ${this._renderInputField('Subtotal', this.subtotal)}
          ${this._renderInputField('IVA (19%)', this.iva)}
          ${this._renderInputField('Total', this.total)}
          <div class="row">
            <!-- Botón para procesar el pago -->
            <button
              class="btn btn-success col-sm-12"
              @click="${this._processPayment}"
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Función que genera los campos de entrada con el valor formateado
  _renderInputField(label, value) {
    return html`
      <div class="row mb-3">
        <label class="col-sm-4 col-form-label">${label}</label>
        <div class="col-sm-8">
          <input
            class="form-control text-center"
            type="text"
            .value="${this._formatCurrency(value)}"
            disabled
            readonly
          />
        </div>
      </div>
    `;
  }

  // Función para formatear el valor en formato de moneda
  _formatCurrency(value) {
    return `$${value.toFixed(2)}`;
  }

  // Función para procesar el pago llamando a la función desde el controlador
  _processPayment() {
    processPayment(this);
  }
}

// Definir el componente como un elemento personalizado
customElements.define("summary-component", SummaryComponent);
