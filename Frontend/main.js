import '@styles/style.css'
import '@components/header.js'

import { logIn, signUp } from "@services/userService"
import { deleteAllStorage } from "@services/storageService"

document.querySelector('#login').addEventListener('submit', async (e) => {
  e.preventDefault()
  const { nombre: name, contraseña: password } = Object.fromEntries(new FormData(e.target))
  const resp = await logIn({ name, password })
  
  // ! Acción en caso de fallar el login
  // ! {response: false, message: '401 - El usuario no existe'}
  console.log(resp) 
})

document.querySelector('#signup').addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('signup')
  const { nombre, apellido, dni, fechaNacimiento, email, telefono, direccion, passw1, passw2} = Object.fromEntries(new FormData(e.target))

  if(passw1 === passw2) {
    // TODO - Conexion con el backend
    // const resp = await signUp({ nombre, apellido, dni, fechaNacimiento, email, telefono, direccion, passw1, passw2})
  }
  
  // ! Acción en caso de fallar: Usuario ya existe || passw1 != passw2
  // ! {response: false, message: 'Fallo en el registro'}
  // console.log(resp) 
})

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

// * Reset SessionStorage
deleteAllStorage()

//* Funciones para mostrar y ocultar los overlays

const registrarseBtn = document.getElementById('registrarseBtn'); 
const ingresarBtn = document.getElementById('ingresarBtn'); 
const overlay1 = document.getElementById('overlay-1');
const overlay2 = document.getElementById('overlay-2');

//* Función para mostrar overlay-2 y ocultar overlay-1
function mostrarOverlay2() {
  overlay1.style.display = 'none';
  overlay2.style.display = 'block';
}

//* Función para mostrar overlay-1 y ocultar overlay-2
function mostrarOverlay1() {
  overlay1.style.display = 'block';
  overlay2.style.display = 'none';
}

//* Agregar manejadores de eventos
registrarseBtn.addEventListener('click', mostrarOverlay2);
ingresarBtn.addEventListener('click', mostrarOverlay1);


//! Validar formulario de registro

document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.querySelector('button[type="submit"]');
  const inputs = document.querySelectorAll('input');
  const password1 = document.getElementById('passw1');
  const password2 = document.getElementById('passw2');
  const emailInput = document.querySelector('input[type="email"]');
  const dniInput = document.getElementById('dni');
  const termsCheckbox = document.getElementById('agree');

  submitButton.disabled = true;

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
    const isEmail = input.type === 'email';
    const isDNI = input === dniInput;
    const isEmpty = !input.value.trim();
    const isInvalidEmail = isEmail && !validateEmail(input.value);
    const isInvalidDNI = isDNI && !validateDNI(input.value);

    if (isEmpty || isInvalidEmail || isInvalidDNI) {
      const errorMessage = isEmpty ? 'Esta información es necesaria' : isInvalidEmail ? 'Ingrese un email válido' : 'Ingrese un DNI válido';
      showErrorMessage(input, errorMessage);
      return false;
    } else {
      removeErrorMessage(input);
      return true;
    }
  }

  function validateForm() {
    const isValid = Array.from(inputs).every(validateInput);
    submitButton.disabled = !isValid;
  }

  function showErrorMessage(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error-message')) {
      error = document.createElement('span');
      error.className = 'error-message';
      error.style.color = 'red';
      error.textContent = message;
      input.parentNode.insertBefore(error, input.nextSibling);
    }
    input.style.borderColor = 'red';
  }

  function removeErrorMessage(input) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains('error-message')) {
      error.parentNode.removeChild(error);
    }
    input.style.borderColor = '';
  }

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => validateInput(input));
  });

  password1.addEventListener('input', validatePasswords);
  password2.addEventListener('input', validatePasswords);

  const form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    validateForm();
    if (submitButton.disabled) {
      event.preventDefault();
    }
  });
});

