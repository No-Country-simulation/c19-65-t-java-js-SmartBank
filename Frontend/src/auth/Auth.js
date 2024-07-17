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
  if ((timeRemaining/1000) === 5 * 60 * 1000){
    document.querySelector('#modal').style.top = '0'
    document.querySelector('[for="cerrar-modal"]').classList.remove('hidden')
  }
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
      }, 5000)
    }
    resetTimer()
    Inactivity()
    // else if (isAdmin) {
    //   window.location.href = '/admin.html';
    // }
    // console.log(import.meta.env)
  })
}

export async function logIn() { 
  console.log('logIn')
  
  // TODO - Fetch formulario
  /*e.preventDefault();
  const { email, name } =  e.target.elements
  const formData = {
    email: email.value, 
    name: name.value
  }
  try {
    const response = await fetch(`${import.meta.env.PUBLIC_API}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(formData)
    });
    if (response.status === 500) throw new Error('Error 500')
    const data = await response.json()
    if (response.status === 200) {
      window.location.href = '/dashboard/'
    }
  } catch (e) {
  }*/
  // @ok - Logica si la respuesta del servidor fue positiva
  const {userName, tipoUsuario} = {
    userName: 'Pepito',
    tipoUsuario: 'Cliente'
  }
  const userToken = crypto.randomUUID()
  sessionStorage.setItem('Auth', userToken)
  encryptString(tipoUsuario)
    .then( key => {
      sessionStorage.setItem('tm', (new Date).getTime())
      sessionStorage.setItem('UN',`${userName}`)
      sessionStorage.setItem('TU', `${key}`)
      setTimeout(() => {
        window.location.href = '/dashboard/'
      }, 2000)
    })
}

export function logOut() {
  console.log('logOut')
  sessionStorage.removeItem('Auth')
  sessionStorage.removeItem('tm')
  sessionStorage.removeItem('UN')
  sessionStorage.removeItem('TU')
  window.location.href = '/'
}

