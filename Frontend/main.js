import '@styles/style.css'
import '@components/header.js'

import { logIn, signUp } from "@services/userService"
import { deleteAllStorage } from "@services/storageService"
import { displayModal } from '@auth/Auth'

// * Reset SessionStorage
deleteAllStorage()

// * Listeners de formularios
document.querySelector('#login').addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('#login');
  const { nombre: name, contraseña: password } = Object.fromEntries(new FormData(e.target))
  const resp = await logIn({ name, password })
  
  // ! Acción en caso de fallar el login
  // ! {response: false, message: '401 - El usuario no existe'}
  if(!resp.response){
    displayModal('Usuario y/o contraseña incorrecto')
    // showErrorMessage(input, 'message')
  }
})

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


//* Live Validation 

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateDNI(dni) {
  const regex = /^\d{7,8}$/;
  return regex.test(dni);
}

function validatePasswords() {
  if (password1.value === password2.value) {
    password2.setCustomValidity('');
    removeErrorMessage(password2);
  } else {
    password2.setCustomValidity('Las contraseñas no coinciden');
    showErrorMessage(password2, 'Las contraseñas no coinciden');
  }
}

function validateInput(input) {
  const isEmail = input.type === 'email'
  const isDNI = input.id === 'regDni'
  const isCheckbox = input.id === 'agree'
  const isEmpty = !input.value.trim()
  const isInvalidEmail = isEmail && !validateEmail(input.value)
  const isInvalidDNI = isDNI && !validateDNI(input.value)
  const isNotChecked = isCheckbox && !input.checked
  if (isEmpty || isInvalidEmail || isInvalidDNI || isNotChecked) {
    const errorMessage = isEmpty || isNotChecked
      ? 'Esta información es necesaria' 
      : isInvalidEmail 
        ? 'Ingrese un email válido' 
        : 'Ingrese un DNI válido';
    showErrorMessage(input, errorMessage);
  } else if (input.id !== 'passw2')
      removeErrorMessage(input)
    else
      validatePasswords()
}

function validateForm(input, submitBtn, inputs) {
  validateInput(input)
  const isValid = Array.from(inputs).every( (input) => {
    const isEmail = input.type === 'email'
    const isDNI = input.id === 'regDni'
    const isCheckbox = input.id === 'agree'
    const isEmpty = !input.value.trim()
    const isInvalidEmail = isEmail && !validateEmail(input.value)
    const isInvalidDNI = isDNI && !validateDNI(input.value)
    const isNotChecked = isCheckbox && !input.checked
    // console.log({isEmpty, isInvalidEmail, isInvalidDNI, isNotChecked})
    if (isEmpty || isInvalidEmail || isInvalidDNI || isNotChecked) return false
    else if (input.id !== 'passw2') return true
    else if (password1.value === password2.value) return true
    else return false
  })
  submitBtn.disabled = !isValid;
}

// ? Mensajes de error
function showErrorMessage(input, message) {
  const isAgreeCheckbox = input.id === 'agree'
  let error = isAgreeCheckbox ? input.parentNode.nextSibling : input.nextElementSibling
  if (!error || !error.classList?.contains('error-message')) {
    error = document.createElement('span');
    error.className = 'error-message';
    error.style.color = 'red';
    error.textContent = message;
    if (isAgreeCheckbox) input.parentNode.parentNode.insertBefore(error, input.parentNode.nextSibling)
    else input.parentNode.insertBefore(error, input.nextSibling)
  }
  input.style.borderColor = 'red';
}

function removeErrorMessage(input) {
  const isAgreeCheckbox = input.id === 'agree'
  let error = isAgreeCheckbox? input.parentNode.nextElementSibling :input.nextElementSibling
  if (error && error.classList.contains('error-message')) {
    error.parentNode.removeChild(error);
  }
  input.style.borderColor = '';
}

//* Live Validation - Formulario Registro
const signUpBtn = document.querySelector('#signup button')
const signUpInputs = document.querySelectorAll('#signup input');
const password1 = document.getElementById('passw1');
const password2 = document.getElementById('passw2');

signUpBtn.disabled = true

signUpInputs.forEach(input => {
  input.addEventListener('blur', () => validateForm(input, signUpBtn, signUpInputs))
  input.addEventListener('input', () => validateForm(input, signUpBtn, signUpInputs))
})


//* Live Validation - Formulario Login

const loginBtn = document.querySelector('#login button')
const loginInputs = document.querySelectorAll('#login input')

loginBtn.disabled = true

loginInputs.forEach(input => {
  input.addEventListener('blur', () => validateForm(input, loginBtn, loginInputs))
  input.addEventListener('input', () => validateForm(input, loginBtn, loginInputs))
})