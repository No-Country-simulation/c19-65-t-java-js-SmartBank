import "@components/navBar.js";
import "@styles/style.css";

document
  .getElementById("bankForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const dni = document.getElementById("dni").value;
    const bank = document.getElementById("bank").value;
    const accountType = document.getElementById("accountType").value;
    const amount = document.getElementById("amount").value;
    const securityKey = document.getElementById("securityKey").value;

    if (fullName && dni && bank && accountType && amount && securityKey) {
      alert(
        `Nombre y Apellido: ${fullName}\nDNI o RUT: ${dni}\nBanco: ${bank}\nTipo de Cuenta: ${accountType}\nMonto: ${amount}\nClave de Seguridad: ${securityKey}`
      );
    } else {
      alert("Por favor, complete todos los campos requeridos.");
    }
  });
