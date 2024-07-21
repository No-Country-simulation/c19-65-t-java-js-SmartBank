import { setLoginValues } from '@auth/Auth'
import { deleteAllStorage } from "@services/storageService"

export async function logIn(formData) { 
  console.log('logIn')
  try {
    if (import.meta.env.VITE_PUBLIC_API){
      const resp = await fetch(`${import.meta.env.VITE_PUBLIC_API}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify(formData)
      });
      
      if (resp.status !== 200) {
        // @fail - Acceso denegado
        const { error } = await resp.json()
        throw new Error(`${resp.status} - ${error}`)
      }
  
      if (resp.status === 200) {
        // @ok - Acceso valido
        const {userName, tipoUsuario, token} = await resp.json()
        return setLoginValues (userName, tipoUsuario, token)
      }
    } else {
      // ? Sección para probar sin backend
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
    return {response: false, message: e.message}
  }
}

export async function signUp (formData) {
  return await fetch(`${import.meta.env.VITE_PUBLIC_API}/newUser`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(formData)
  });
}

export function logOut() {
  console.log('logOut')
  deleteAllStorage()
  window.location.href = '/'
}