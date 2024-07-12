import { log } from 'node_modules/astro/dist/core/logger/core'

// utils.js
export function isLoggedIn(cookie) {
  console.log(cookie)
  if (!cookie) {
    return false;
  }
  console.log(cookie)
  const cookies = cookie.split(';').reduce((acc, item) => {
    const [key, value] = item.trim().split('=')
    acc[key] = value
    return acc
  }, {})

  console.log(cookies)
  // Aquí puedes verificar la cookie de sesión específica
  // Supongamos que la cookie de sesión se llama 'session_id'
  const sessionId = cookies['session_id']

  // Verifica si la cookie de sesión es válida (puedes agregar más lógica aquí)
  return Boolean(sessionId)
}
