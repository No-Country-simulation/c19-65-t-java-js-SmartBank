import '@styles/style.css'
<<<<<<< HEAD
import { logIn } from '@auth/Auth'

=======
// import { setupCounter } from './counter.js'
>>>>>>> Dashboard

document.querySelector('#app').innerHTML = `
  <div class="text-red-900">
    <h1>Test Tailwind</h1>
  </div>
`

document.querySelector('#login').addEventListener('click', () => {
  logIn()
})

// setupCounter(document.querySelector('#counter'))
