import '@styles/style.css'
import '@components/header.js'

import { logIn, signUp } from '@services/userService'
import { deleteAllStorage } from '@services/storageService'
import { displayModal } from '@auth/Auth'
import { liveValidation } from '@helpers/liveValidations'

// * Reset SessionStorage
deleteAllStorage()

// * Listeners de formularios
document.querySelector('#login').addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('#login');
  const { email, contraseña: contrasenia } = Object.fromEntries(new FormData(e.target))
  const resp = await logIn({ email, contrasenia })
  
  // ! Acción en caso de fallar el login
  // ! {response: false, message: '401 - El usuario no existe'}
  if(!resp.response){
    displayModal(resp.message)
  }
})
// user@smartbank.com

document.querySelector('#signup').addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('#signup')
  const { nombre, apellido, dni, fechaNacimiento, email, telefono, direccion, passw1, passw2} = Object.fromEntries(new FormData(e.target))

  // TODO - Conexion con el backend
  // const resp = await signUp({ nombre, apellido, dni, fechaNacimiento, email, telefono, direccion, passw1, passw2})
  
  // ! Acción en caso de fallar: Usuario ya existe
  // ! {response: false, message: 'Fallo en el registro'}
  // if(!resp.response){
    displayModal('Fallo al registrar')
  //   showErrorMessage(input, 'message')
  // }
})

// * Funcionalidad ver/ocultar password
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('passwordInput'); // Cambio aquí
  const showIcon = document.getElementById('showIcon');
  const hideIcon = document.getElementById('hideIcon');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    showIcon.classList.add('hidden');
    hideIcon.classList.remove('hidden');
  } else {
    passwordInput.type = 'password';
    showIcon.classList.remove('hidden'); // Corrección: 'show' a 'hidden'
    hideIcon.classList.add('hidden'); // Corrección: 'show' a 'hidden'
  }
}

window.togglePasswordVisibility = togglePasswordVisibility;

//* Funciones para mostrar y ocultar los overlays

const registrarseBtn = document.getElementById('registrarseBtn'); 
const ingresarBtn = document.getElementById('ingresarBtn'); 
const overlay1 = document.getElementById('overlay-1');
const overlay2 = document.getElementById('overlay-2');

//? Función para mostrar overlay-2 y ocultar overlay-1
function mostrarOverlay2() {
  overlay1.style.display = 'none';
  overlay2.style.display = 'block';
}

//? Función para mostrar overlay-1 y ocultar overlay-2
function mostrarOverlay1() {
  overlay1.style.display = 'block';
  overlay2.style.display = 'none';
}

//? Agregar manejadores de eventos
registrarseBtn.addEventListener('click', mostrarOverlay2);
ingresarBtn.addEventListener('click', mostrarOverlay1);

//* Live Validation - Formulario Login

const loginBtn = document.querySelector('#login button')
const loginInputs = document.querySelectorAll('#login input')
liveValidation(loginBtn, loginInputs)

//* Live Validation - Formulario Registro
const signUpBtn = document.querySelector('#signup button')
const signUpInputs = document.querySelectorAll('#signup input');
liveValidation(signUpBtn, signUpInputs)
