import "@components/header.js";
import "@components/navBar.js";
import "@styles/style.css";

import { liveValidation } from '@helpers/liveValidations'
import { displayModal } from '@auth/Auth'
// import { createAccount } from '@services/acccountService'

//* Live Validation - Formulario Transferir

const AccountCreateBtn = document.querySelector('#crearCuenta [type="submit"]')
const AccountCreateInputs = document.querySelectorAll('#crearCuenta select, #crearCuenta input')
liveValidation(AccountCreateBtn, AccountCreateInputs)

//* Event listeners

document.querySelector('#crearCuenta').addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('CrearCuenta')
    const { accountType, password } = Object.fromEntries(new FormData(e.target))
    console.log(accountType, password)
    // const resp = await createAccount({ accountType, password })
    
    // ! Acción en caso de fallar la creación de la cuenta
    // ! {response: false, message: '401 - El usuario no existe'}
    const resp = {response: false}
    if(resp.response){
      displayModal('Transacción Fallida')
    } else {
      displayModal('Cuenta creada con exito')
    }
})

document.querySelector('#crearCuenta [type="reset"]').addEventListener('click', () => {
  AccountCreateBtn.disabled = true
})