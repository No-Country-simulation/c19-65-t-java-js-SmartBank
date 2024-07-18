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

// Exponer la función al ámbito global
window.togglePasswordVisibility = togglePasswordVisibility;

sessionStorage.removeItem('Auth')
sessionStorage.removeItem('tm')
sessionStorage.removeItem('UN')
sessionStorage.removeItem('TU')

document.querySelector('#login').addEventListener('submit', async (e) => {
  e.preventDefault()
  const { nombre: name, contraseña: password } = Object.fromEntries(new FormData(e.target))
  //TODO - Validación de datos
  
  const resp = await logIn({ name, password })
  
  // ! Acción en caso de fallar el login
  // ! {response: false, message: '401 - El usuario no existe'}
  console.log(resp) 
})




