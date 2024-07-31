import { getAccounts, getMovements } from '@services/acccountService'
import { displayModal } from '@auth/Auth'
import '@styles/style.css'
import '@components/navBar'
import '@components/header'
import '@components/backButton'
import '@helpers/logos'


const $accountsList = document.querySelector('#accountsList')
const $errorMsg = document.querySelector('#errorMsg')
const $movBody = document.querySelector('#movBody')

getAccounts('Pepito')
  .then(accountsDetails => {
    const userAccounts = accountsDetails.filter(({idCliente}) => idCliente === 1)
    if (userAccounts.length === 0) throw new Error('Usuario sin cuentas')
    const accountsKeys = Object.keys(userAccounts)
    
    // Actualizar listado de cuentas
    const htmlAccountOpts = accountsKeys.map(account => {
      const { nroCuenta, tipoCuenta } = userAccounts[account]
      return `<option value="${nroCuenta}">${nroCuenta} - ${tipoCuenta}</option>`
    })
    $accountsList.innerHTML = htmlAccountOpts

    // Obtener movimiento de cuentas
    return getMovements('t')
  })
  .then(({data: movements}) => {
    const urlParams = new URLSearchParams(window.location.search)
    const accountID = urlParams.get('cuenta')
    if (accountID) {
      if($accountsList.querySelector(`[value="${accountID}"]`)) {
        $accountsList.value = accountID
      }
      else {
        throw new Error('Cuenta especificada no existe')
      }
    }
    setMovements(movements, $accountsList.value)
    
    $accountsList.addEventListener('change', () => {
      setMovements(movements, $accountsList.value)
    })
  })
  .catch( e => {
    displayModal(e.message)
    setTimeout(() => {
      window.location.href = '/dashboard/'
    }, 2500)
  })
  

  function setMovements(movements, accountID){
    const accountMovs = movements.filter(({ctaOrigen}) => ctaOrigen === accountID)
    if(accountMovs.length === 0) {
      $errorMsg.classList.remove('hidden')
      $movBody.innerHTML = `<tr>
        <td class="py-2 px-4 text-center border-b">------</td>
        <td class="py-2 px-4 text-center border-b">------</td>
        <td class="py-2 px-4 text-center border-b">------</td>
        <td class="py-2 px-4 text-center border-b">------</td>
        <td class="py-2 px-4 text-center border-b">------</td>
        <td class="py-2 px-4 text-center border-b">------</td>
      </tr>`
    } else {
      $errorMsg.classList.add('hidden')
      const htmlAccountMovs = accountMovs.map(movement => {
        const { fechaMovimiento, descripcionMovimiento:descripcion, ctaOrigen, ctaDestino, monto, saldo } = movement
        const date = new Date(fechaMovimiento)
        const fecha = `${date.getFullYear()}-${String(date.getMonth() +1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        return `<tr>
          <td class="py-2 px-4 text-center border-b">${fecha}</td>
          <td class="py-2 px-4 text-center border-b">${descripcion}</td>
          <td class="py-2 px-4 text-center border-b">${ctaOrigen}</td>
          <td class="py-2 px-4 text-center border-b">${ctaDestino}</td>
          <td class="py-2 px-4 text-center border-b">$ ${monto.toLocaleString('es-ES')}</td>
          <td class="py-2 px-4 text-center border-b">$ ${saldo.toLocaleString('es-ES')}</td>
        </tr>`
      })
      $movBody.innerHTML = htmlAccountMovs.toString('').replaceAll(',','')
    }
  }