import '@components/navBar.js'
import '@styles/style.css'

// Elementos DOM
const $accountsList = document.querySelector('#accountsList')

const $tarjetaCuenta = document.querySelector('#tarjetaCuenta')
const $saldo = document.querySelector('#saldo')
const $saldoActivoIcn = document.querySelector('#saldo-activo')
const $saldoOcultoIcn = document.querySelector('#saldo-oculto')

const $btn_Movimientos = document.querySelector('#lnk_Movimientos')

const $invGraph = document.querySelector('#invGraph')
const $noInvMssg = document.querySelector('#noInvMssg')

// Info del backend
const accountsDetails = {
  '1234': {tipoCuenta: 'Cuenta Ahorros', saldo:300000},
  '8888': {tipoCuenta: 'Cuenta Corriente', saldo:0}
}
const invList = []

// todo - Funcionalidad Inversiones

// Funcion, actualización listado de cuentas
const accountsKeys = Object.keys(accountsDetails)
if(accountsKeys.length !== 0) {
  const htmlAccountOpts = accountsKeys.map(account => {
    const { tipoCuenta } = accountsDetails[account]
    return `<option value="${account}">${account} - ${tipoCuenta}</option>`
  })
  $accountsList.innerHTML = htmlAccountOpts
  updateAccountCard(accountsKeys[0])
} else {
  //Accounts List
  $accountsList.innerHTML = `<option value="">No tienes cuentas asociadas</option>`
  $accountsList.setAttribute('disabled', 'true')
  //Account Card
  $tarjetaCuenta.style.pointerEvents = 'none'
  $tarjetaCuenta.classList.add('opacity-children')
  $saldo.innerHTML = `$****`
  $btn_Movimientos.style.pointerEvents = 'none'
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
      $saldoOcultoIcn.style.display = 'none'
      $saldoActivoIcn.style.display = 'block'
      $saldo.innerHTML = `$****`
    } else {
      $saldoOcultoIcn.style.display = 'block'
      $saldoActivoIcn.style.display = 'none'
      const ActiveAccount = $accountsList.value
      const saldoCuenta = accountsDetails[ActiveAccount].saldo.toLocaleString('es-ES')
      $saldo.innerHTML = `$${saldoCuenta}`
    }
    $saldo.dataset.visible = !isVisibleBalance
  }
})
