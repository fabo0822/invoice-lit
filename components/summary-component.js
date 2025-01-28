import { LitElement, html } from "lit";
import { calculateSummary, processPayment } from "../controllers/summary.js";

export class SummaryComponent extends LitElement {
  static properties = {
    subtotal: { type: Number },
    iva: { type: Number },
    total: { type: Number },
  };

  constructor() {
    super();
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
  }

  connectedCallback() {
    super.connectedCallback();

    // Llama a la función para calcular el resumen
    calculateSummary(this);
  }

  render() {
    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <br />
      <div class="container card">
        <div class="row text-center card-header">
          <h3>Resumen de Factura</h3>
        </div>
        <div class="card-body">
          ${this._renderInputField('Subtotal', this.subtotal)}
          ${this._renderInputField('IVA (19%)', this.iva)}
          ${this._renderInputField('Total', this.total)}
          <div class="row">
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

  _formatCurrency(value) {
    return `$${value.toFixed(2)}`;
  }

  _processPayment() {
    processPayment(this);
  }
}

customElements.define("summary-component", SummaryComponent);
