import "@components/header.js"
import "@components/navBar.js";
import "@styles/style.css";

import { liveValidation } from '@helpers/liveValidations'
import { displayModal } from '@auth/Auth'
import { getAccounts } from '@services/acccountService'
import { setMovement } from '@services/acccountService'
import { getStorageItem } from '@services/storageService'
// Elementos DOM

const $accountOut = document.querySelector('#accountOut')


//* Live Validation - Formulario Transferir
const transferBtn = document.querySelector('#bankForm button')
const transferInputs = document.querySelectorAll('#bankForm select, #bankForm input')
liveValidation(transferBtn, transferInputs)

  getAccounts('Pepito')
    .then(accountsDetails => {
      const accountsKeys = Object.keys(accountsDetails)
      if(accountsKeys.length === 0) {
        // @fail - Opciones si el usuario no tiene ninguna cuenta
        displayModal("El usuario no tiene cuentas para realizar transferencias")
        setTimeout(() => {
          window.location.href = '/dashboard/'
        }, 3000)
      } else {
        // @ok - Opciones si el usuario tiene cuentas
        const htmlAccountOpts = accountsKeys.map(account => {
          const { nroCuenta, tipoCuenta } = accountsDetails[account]
          return `<option value="${nroCuenta}">${nroCuenta} - ${tipoCuenta}</option>`
        })
        $accountOut.innerHTML = htmlAccountOpts
      }


      //* Event Listeners
      document
        .getElementById("bankForm")
        .addEventListener("submit", async function (event) {
          event.preventDefault();
          console.log('transferir')
          const { accountOut: ctaOrigen, accountIn: ctaDestino, amount: monto, Description: descripcionMovimiento, securityKey } = Object.fromEntries(new FormData(event.target))

          const usuario = getStorageItem('UN')
          const { saldo } = accountsDetails.find(({nroCuenta}) => nroCuenta == ctaOrigen )
          const resp = await setMovement({ usuario, monto, saldo: saldo - monto, ctaOrigen, ctaDestino, descripcionMovimiento })

          // ! Acción en caso de fallar la transferencia
          // ! {response: false, message: '401 - El usuario no existe'}
          if(!resp.response) {
            displayModal("Transacción fallida.");
          } else {
            // Mostrar ventana emergente de confirmación
            displayModal("Su transferencia se ha realizado con éxito!");
          }
        });
    })
