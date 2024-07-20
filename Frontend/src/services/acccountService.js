export async function getAccounts(id) { 
  console.log('GetAccounts')
  try {
    if (import.meta.env.VITE_PUBLIC_API){
      const resp = await fetch(`${import.meta.env.VITE_PUBLIC_API}/usuario/cuentas/${id}`, {
        method: "GET"
      });
      
      if (resp.status !== 200) {
        // @fail - Falla solicitud
        const { error } = await resp.json()
        throw new Error(`${resp.status} - ${error}`)
      }
  
      if (resp.status === 200) {
        // @ok - Acceso valido
        const {cuentas} = await resp.json()
        return cuentas
      }
    } else {
      // ? Sección para probar sin backend
      const status = 200 // 200 | 401
      if (status !== 200) {
        // @fail - Falla solicitud
        throw new Error(`Fallo sin backend`)
      }
      if (status === 200) {
        // @ok - Información de las cuentas
        return {
          '1234': {tipoCuenta: 'Cuenta Ahorros', saldo:300000},
          '8888': {tipoCuenta: 'Cuenta Corriente', saldo:0}
        }
      }
    }
  } catch (e) {
    return {response: false, message: e.message}
  }
}

export async function getAccountInfo(id) { 

}