import '@styles/style.css'

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
import '@styles/style.css'
import { logIn } from '@auth/Auth'


document.querySelector('#app').innerHTML = `
  <div class="text-red-900">
    <h1>Test Tailwind</h1>
  </div>
`

document.querySelector('#login').addEventListener('click', () => {
  logIn()
})

// setupCounter(document.querySelector('#counter'))
