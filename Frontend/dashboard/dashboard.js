import { getAccounts } from '@services/acccountService'
import '@styles/style.css'
import '@components/navBar'
import '@components/header'
import '@helpers/logos'

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

// todo - Funcionalidad Inversiones
const invList = []


// * Obtener cuentas del usuario
getAccounts('Pepito')
  .then(accountsDetails => {
    const userAccounts = accountsDetails.filter(({idCliente}) => idCliente === 1)
    const accountsKeys = Object.keys(userAccounts)
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
        const { nroCuenta, tipoCuenta } = userAccounts[account]
        return `<option value="${nroCuenta}">${nroCuenta} - ${tipoCuenta}</option>`
      })
      $accountsList.innerHTML = htmlAccountOpts
      updateAccountCard($accountsList.value)
    }

    //Funcion, actualizar tarjeta Cuenta
    function updateAccountCard (account) {
      const accountData = userAccounts.find(({nroCuenta}) => nroCuenta == account)
      const { nroCuenta, saldo } = accountData
      const saldoCuenta = saldo.toLocaleString('es-ES')
      $saldo.innerHTML = `$${saldoCuenta}`
      $btn_Movimientos.href = `/movimientos/?cuenta=${nroCuenta}`
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
          const saldoCuenta = userAccounts[ActiveAccount].saldo.toLocaleString('es-ES')
          $saldo.innerHTML = `$${saldoCuenta}`
        }
        $saldo.dataset.visible = !isVisibleBalance
      }
    })
  })
  
