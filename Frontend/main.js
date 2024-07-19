import { logIn } from '@auth/Auth'
import '@styles/style.css'
import '@components/header.js'

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

//* 
// Obtener los elementos por ID
const registrarseBtn = document.getElementById('registrarseBtn'); // Asegúrate de que este es el ID correcto para el botón "Registrarse"
const ingresarBtn = document.getElementById('ingresarBtn'); // Asegúrate de que este es el ID correcto para el botón "Ingresar"
const overlay1 = document.getElementById('overlay-1');
const overlay2 = document.getElementById('overlay-2');

// Función para mostrar overlay-2 y ocultar overlay-1
function mostrarOverlay2() {
  overlay1.style.display = 'none';
  overlay2.style.display = 'block';
}

// Función para mostrar overlay-1 y ocultar overlay-2
function mostrarOverlay1() {
  overlay1.style.display = 'block';
  overlay2.style.display = 'none';
}

// Agregar manejadores de eventos
registrarseBtn.addEventListener('click', mostrarOverlay2);
ingresarBtn.addEventListener('click', mostrarOverlay1);



