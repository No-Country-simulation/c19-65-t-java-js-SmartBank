import { encryptString } from '@helpers/crypt'
import { setStorageItem, getStorageItem } from "@services/storageService"
import { logOut } from "@services/userService"

const timeoutDuration = 15 * 60 * 1000 // 15 min
let timeoutId
let intervalId
let timeRemaining = timeoutDuration

function resetTimer() {
  clearTimeout(timeoutId)
  clearInterval(intervalId)
  timeRemaining = timeoutDuration
  timeoutId = setTimeout(onTimeout, timeoutDuration)
  intervalId = setInterval(updateConsole, 1000)
  setStorageItem('tm', (new Date).getTime())
}

function updateConsole () {
  timeRemaining -= 1000
  // console.log(`Tiempo restante: ${timeRemaining / 1000} segundos`)
  if ((timeRemaining/1000) ===  60 ){
    displayModal('Tu sesión se cerrará en 1 minuto por inactividad.')
  }
}

export function displayModal(message) {
  document.querySelector('#modal').style.top = '0'
  document.querySelector('[for="cerrar-modal"]').classList.remove('hidden')
  document.querySelector('#modalmsg').textContent = message
  setTimeout(() => {
    document.querySelector('[for="cerrar-modal"]').click()
  }, 3000)
}

function onTimeout() {
  clearInterval(intervalId)
  logOut()
}

function Inactivity () {
  document.addEventListener('click', resetTimer)
}

export function checkLogin() {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Load Page')
    // Tiempo inactivo
    const initialTime = getStorageItem('tm')
    const InactTime =  timeoutDuration
    const now = (new Date).getTime()
    const isActiveSession = initialTime ? (now - initialTime) <= InactTime : false
    // Check login
    const AuthToken = getStorageItem('Auth') != null
    if (!isActiveSession || !AuthToken) {
      // @fail - Credenciales invalidas
      console.log('redir to /')
      setTimeout(() => {
        logOut()
      }, 0)
    }
    // else if (isAdmin) {
    //   window.location.href = '/admin.html';
    // }
    resetTimer()
    Inactivity()
  })
}

export async function setLoginValues (userName, tipoUsuario, token) {
  setStorageItem('Auth', token)
  encryptString(tipoUsuario)
    .then( key => {
      setStorageItem('tm', (new Date).getTime())
      setStorageItem('UN',`${userName}`)
      setStorageItem('TU', `${key}`)
      setTimeout(() => {
        window.location.href = '/dashboard/'
      }, 0)
    })
  return {response: true}
}
