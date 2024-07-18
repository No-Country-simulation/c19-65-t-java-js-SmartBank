import '@styles/style.css'
import { logIn } from '@auth/Auth'


document.querySelector('#app').innerHTML = `
  <div class="text-red-900">
    <h1>Test Tailwind</h1>
  </div>
`

document.querySelector('#login').addEventListener('click', () => {
  logIn({ name: 'Admin', password: 'Admin123' })
})

// setupCounter(document.querySelector('#counter'))
