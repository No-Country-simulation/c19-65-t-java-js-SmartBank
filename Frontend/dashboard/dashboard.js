import '@components/navBar.js'
import '@styles/style.css'

// Elementos DOM
const $accountsList = document.querySelector('#accountsList')

const $saldo = document.querySelector('#saldo')
const $saldoActivoIcn = document.querySelector('#saldo-activo')
const $saldoOcultoIcn = document.querySelector('#saldo-oculto')

const $btn_Movimientos = document.querySelector('#lnk_Movimientos')

const $invGraph = document.querySelector('#invGraph')
const $noInvMssg = document.querySelector('#noInvMssg')

const $QR = document.querySelector('#QR')
const $prestamos = document.querySelector('#prestamos')
const $transferir = document.querySelector('#transferir')
const $promociones = document.querySelector('#promociones')
const $crearCuenta = document.querySelector('#crearCuenta')

// Info del backend
const accountList = {
  '1234': {tipoCuenta: 'Cta Ahorros', saldo:450000},
  '8888': {tipoCuenta: 'Cta Corriente', saldo:0},
}
const invList = []

//

/**
 * todo - Llenar lista de cuentas
 * todo - Funcionalidad Saldo
 * todo - Actualizar link "Ver resumen"
 * todo - Funcionalidad Inversiones
 */


