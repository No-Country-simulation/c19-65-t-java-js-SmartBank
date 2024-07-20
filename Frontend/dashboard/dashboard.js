import '@styles/style.css'
import '@components/navBar'
import '@components/header'
import '@img/add-activo'
import '@img/qr-activo'
import '@img/cash-activo'
import '@img/transf-activo'
import '@img/percent-activo'

// Elementos DOM
const $accountsList = document.querySelector('#accountsList')

const $tarjetaCuenta = document.querySelector('#tarjetaCuenta')
const $saldo = document.querySelector('#saldo')
const $saldoActivoIcn = document.querySelector('#saldo-activo')
const $saldoOcultoIcn = document.querySelector('#saldo-oculto')
const $noCountMssg = document.querySelector('#noCountMssg')
const $btn_Movimientos = document.querySelector('#lnk_Movimientos')

const $invGraph = document.querySelector('#invGraph')
const $noInvMssg = document.querySelector('#noInvMssg')

const $transfCard = document.querySelector('#transferir')

// Info del backend
const accountsDetails = {
  '1234': {tipoCuenta: 'Cuenta Ahorros', saldo:300000},
  '8888': {tipoCuenta: 'Cuenta Corriente', saldo:0}
}
const invList = []

// todo - Funcionalidad Inversiones

const accountsKeys = Object.keys(accountsDetails)
if(accountsKeys.length === 0) {
  // @fail - Opciones si el usuario no tiene ninguna cuenta
  $accountsList.innerHTML = `<option value="">No tienes cuentas asociadas</option>`
  $accountsList.setAttribute('disabled', 'true')
  //Account Card
  // $tarjetaCuenta.classList.add('pointer-events-none')
  $tarjetaCuenta.classList.add('opacity-children-40')
  $saldo.innerHTML = `$****`
  $btn_Movimientos.classList.add('pointer-events-none')
  $transfCard.classList.add('inactive-card')
  $noCountMssg.classList.remove('hidden')
} else {
  // @ok - Opciones si el usuario tiene cuentas
  // Actualización listado de cuentas
  const htmlAccountOpts = accountsKeys.map(account => {
    const { tipoCuenta } = accountsDetails[account]
    return `<option value="${account}">${account} - ${tipoCuenta}</option>`
  })
  $accountsList.innerHTML = htmlAccountOpts
  updateAccountCard(accountsKeys[0])
}

//Funcion, actualizar tarjeta Cuenta
function updateAccountCard (account) {
  const saldoCuenta = accountsDetails[account].saldo.toLocaleString('es-ES')
  $saldo.innerHTML = `$${saldoCuenta}`
  $btn_Movimientos.href = `/movimientos/?cuenta=${account}`
  // $btn_Movimientos.style.pointerEvents = 'initial'
  // $tarjetaCuenta.style.pointerEvents = 'initial'
  // $tarjetaCuenta.classList.remove('opacity-children')
}

$accountsList.addEventListener('change', (e) => {
  updateAccountCard(e.target.value)
})

$tarjetaCuenta.addEventListener('click', (e) => {
  const clickedBtn = e.target.closest('button')
  if(clickedBtn){
    const isVisibleBalance = $saldo.dataset.visible === 'true'
    if(isVisibleBalance) {
      $saldoOcultoIcn.classList.add('hidden')
      $saldoActivoIcn.classList.remove('hidden')
      $saldo.innerHTML = `$****`
    } else {
      $saldoOcultoIcn.classList.remove('hidden')
      $saldoActivoIcn.classList.add('hidden')
      const ActiveAccount = $accountsList.value
      const saldoCuenta = accountsDetails[ActiveAccount].saldo.toLocaleString('es-ES')
      $saldo.innerHTML = `$${saldoCuenta}`
    }
    $saldo.dataset.visible = !isVisibleBalance
  }
})
