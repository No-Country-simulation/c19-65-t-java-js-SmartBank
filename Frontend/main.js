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

sessionStorage.removeItem('Auth')
sessionStorage.removeItem('tm')
sessionStorage.removeItem('UN')
sessionStorage.removeItem('TU')

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
  const { nombre, apellido, dni, fechaNacimiento, email, telefono, direccion, passw1, passw2} = Object.fromEntries(new FormData(e.target))

  //TODO - Validación de passwords
  console.log()
  if(passw1 === passw2) {
    // TODO - Conexion con el backend
    // const resp = await signUp({ nombre, apellido, dni, fechaNacimiento, email, telefono, direccion, passw1, passw2})
  }
  
  // ! Acción en caso de fallar el signup o passw1 != passw2
  // ! {response: false, message: 'Fallo en el registro'}
  // console.log(resp) 
})

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



