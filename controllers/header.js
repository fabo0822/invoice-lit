// Función para validar los campos del encabezado
export function validateHeaderInputs(shadowRoot) {
    // Obtener las referencias a los campos de entrada en el shadow DOM
    const idInput = shadowRoot.querySelector("#idClient");
    const nameInput = shadowRoot.querySelector("#nameClient");
    const lastNameInput = shadowRoot.querySelector("#lastNameClient");
    const directionInput = shadowRoot.querySelector("#direction");
    const emailInput = shadowRoot.querySelector("#email");
  
    // Definir las expresiones regulares para cada tipo de validación
    const validations = {
      id: /^\d+$/, // Solo números para el ID
      text: /^[a-zA-ZÀ-ÿ\s]+$/, // Letras y espacios para nombres y apellidos
      direction: /^[a-zA-Z0-9\s\.,#\-]+$/, // Letras, números y algunos caracteres especiales para dirección
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Correo electrónico válido
    };
  
    // Función que valida un campo según su expresión regular
    function validate(input, regex) {
      const value = input.value.trim(); // Eliminar espacios al principio y final
      const isValid = regex.test(value); // Comprobar si el valor coincide con el regex
      input.classList.toggle("is-invalid", !isValid); // Añadir clase "is-invalid" si no es válido
      input.classList.toggle("is-valid", isValid); // Añadir clase "is-valid" si es válido
      return isValid;
    }
  
    // Agregar los event listeners para validar los campos en cada input
    idInput.addEventListener("input", () => validate(idInput, validations.id)); // Validar ID (solo números)
    nameInput.addEventListener("input", () => validate(nameInput, validations.text)); // Validar nombre (solo letras y espacios)
    lastNameInput.addEventListener("input", () => validate(lastNameInput, validations.text)); // Validar apellido
    directionInput.addEventListener("input", () => validate(directionInput, validations.direction)); // Validar dirección
    emailInput.addEventListener("input", () => validate(emailInput, validations.email)); // Validar correo electrónico
  }
  