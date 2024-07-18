import { encryptString } from '@helpers/crypt'

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
  sessionStorage.setItem('tm', (new Date).getTime())
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
    const initialTime = sessionStorage.getItem('tm')
    const InactTime =  timeoutDuration
    const now = (new Date).getTime()
    const isActiveSession = initialTime ? (now - initialTime) <= InactTime : false
    // Check login
    const AuthToken = sessionStorage.getItem('Auth') != null
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

export async function logIn(formData) { 
  console.log('logIn')
  try {
    if (import.meta.env.VITE_PUBLIC_API){
      const resp = await fetch(`${import.meta.env.VITE_PUBLIC_API}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify(formData)
      });
      
      if (resp.status !== 200) {
        // @fail - Acceso denegado
        const { error } = await resp.json()
        throw new Error(`${resp.status} - ${error}`)
      }
  
      if (resp.status === 200) {
        // @ok - Acceso valido
        const {userName, tipoUsuario, token} = await resp.json()
        return setLoginValues (userName, tipoUsuario, token)
      }
    } else {
      // ? Sección para probar sin backend
      const status = 401 // 200 | 401
      if (status !== 200) {
        // @fail - Acceso denegado sin backend
        throw new Error(`Fallo sin backend`)
      }
      if (status === 200) {
        // @ok - Acceso valido sin backend
        return setLoginValues ('userName', 'Cliente', 'token')
      }
    }
  } catch (e) {
    return {response: false, message: e.message}
  }
}

async function setLoginValues (userName, tipoUsuario, token) {
  sessionStorage.setItem('Auth', token)
  encryptString(tipoUsuario)
    .then( key => {
      sessionStorage.setItem('tm', (new Date).getTime())
      sessionStorage.setItem('UN',`${userName}`)
      sessionStorage.setItem('TU', `${key}`)
      setTimeout(() => {
        window.location.href = '/dashboard/'
      }, 0)
    })
  return {response: true}
}

export function logOut() {
  console.log('logOut')
  sessionStorage.removeItem('Auth')
  sessionStorage.removeItem('tm')
  sessionStorage.removeItem('UN')
  sessionStorage.removeItem('TU')
  window.location.href = '/'
}

