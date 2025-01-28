# Lit-Invoice
Este proyecto es una aplicación web para gestionar facturas, utilizando Lit para crear componentes web y Vite como herramienta de construcción. Permite gestionar facturas de manera eficiente.
despliegue proyecto invoice-0822.netlify.app
# Tecnologias utilizada 
- **Lit**
- **Vite**
- **Bootstrap**
- **JavaScript**

# Componentes principales
- **header-component**: Recopila datos del cliente y genera un número de factura único.
- **products-component** : Permite seleccionar productos y agregar cantidades al detalle de la factura. Actualiza la cantidad si el producto ya está en la factura.
- **summary-component** : Calcula automáticamente el subtotal, IVA (19%), y el total. Permite pagar y guardar la factura en el Local Storage.
