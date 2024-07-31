import { setLoginValues } from '@auth/Auth'
import { deleteAllStorage } from "@services/storageService"

// * POST - Main✅
export async function logIn(formData) { 
  console.log('logIn')
  try {
    if (import.meta.env.VITE_PUBLIC_API){
      console.log(formData)
      const resp = await fetch(`${import.meta.env.VITE_PUBLIC_API}/iniciarsesion`, {
        method: "POST",
        headers: {
          'content-Type': 'application/json'
        },
        body:  JSON.stringify(formData)
      });
      console.log(resp.status)
      if (resp.status !== 200) {
        // @fail - Acceso denegado
        const error = await resp.text()
        throw new Error(`${resp.status} - ${error}`)
      }
  
      if (resp.status === 200) {
        // @ok - Acceso valido
        return setLoginValues (formData.email, 'CLIENTE', crypto.randomUUID())
      }
    } else {
      // ? Sección para probar sin backend
      console.log('sinBack')
      const status = 200 // 200 | 401
      if (status !== 200) {
        // @fail - Acceso denegado sin backend
        throw new Error(`Fallo sin backend`)
      }
      if (status === 200) {
        // @ok - Acceso valido sin backend
        return setLoginValues ('userName', 'Cliente', 'token')
      }
    }
  } catch (e) {
    console.log(e)
    return {response: false, message: e.message}
  }
}

// * POST - Main
export async function signUp (formData) {
  return await fetch(`${import.meta.env.VITE_PUBLIC_API}/newUser`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(formData)
  });
}

// * All Pages
export function logOut() {
  console.log('logOut')
  deleteAllStorage()
  window.location.href = '/'
}