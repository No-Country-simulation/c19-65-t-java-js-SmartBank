import "@components/header.js"
import "@components/navBar.js";
import "@styles/style.css";

import { liveValidation } from '@helpers/liveValidations'
import { displayModal } from '@auth/Auth'
// import { setMovement } from '@services/acccountService'

//* Live Validation - Formulario Transferir
const transferBtn = document.querySelector('#transferir button')
const transferInputs = document.querySelectorAll('#transferir select, #transferir input')
liveValidation(transferBtn, transferInputs)

//* Event Listeners
document
  .getElementById("transferir")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log('transferir')
    const { accountOut, accountIn, amount, Description, securityKey } = Object.fromEntries(new FormData(event.target))
    console.log(accountOut, accountIn, amount, Description, securityKey)
    // const resp = await setMovement({ accountOut, accountIn, amount, Description, securityKey })
    // ! Acción en caso de fallar la transferencia
    // ! {response: false, message: '401 - El usuario no existe'}
    const resp = {response: false}
    if(resp.response) {
      displayModal("Transacción fallida.");
    } else {
      // Mostrar ventana emergente de confirmación
      displayModal("Su transferencia se ha realizado con éxito!");
    }
  });
