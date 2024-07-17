import { encryptString } from '@helpers/crypt'

export function checkLogin() {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Load Page')
    // Tiempo inactivo
    const initialTime = sessionStorage.getItem('tm')
    const InactTime =  15 * 60 * 1000; // 15 min
    const now = (new Date).getTime()
    const isActiveSession = initialTime ? (now - initialTime) <= InactTime : false
    // Check login
    const AuthToken = sessionStorage.getItem('Auth') != null
    if (!isActiveSession || !AuthToken) {
      // @fail - Credenciales invalidas
      console.log('redir to /')
      setTimeout(() => {
        window.location.href = '/'
      }, 500)
    } 
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

export function Inactivity () {
  //TODO - Logica Inactividad
}

