// * GET - Dashboard✅ && Transferencias✅
export async function getAccounts(UsuarioID) { 
  console.log('GetAccounts')
  try {
    // ? Sección con backend
    if (import.meta.env.VITE_PUBLIC_API){
      const resp = await fetch(`${import.meta.env.VITE_PUBLIC_API}/cuentas/enlistar`, {
        method: "GET"
      });
      
      if (resp.status !== 200) {
        // @fail - Falla solicitud
        const { error } = await resp.json()
        throw new Error(`${resp.status} - ${error}`)
      }
  
      if (resp.status === 200) {
        // @ok - Acceso valido
        const cuentas = await resp.json()
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

// * GET - Movimientos
export async function getMovements(AccountID) { 
  // Obtener todos los movimientos de una cuenta
  console.log('Get Movements')
  try {
    // ? Sección con backend
    if (import.meta.env.VITE_PUBLIC_API){
      const resp = await fetch(`${import.meta.env.VITE_PUBLIC_API}/movimientos/enlistar`, {
        method: "GET"
      });
      
      if (resp.status !== 200) {
        // @fail - Falla solicitud
        const { error } = await resp.json()
        throw new Error(`${resp.status} - ${error}`)
      }
  
      if (resp.status === 200) {
        // @ok - Acceso valido
        const movimientos = await resp.json()
        return {response: true, data: movimientos}
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
        return {response: true, data: [
          {fecha: '', descripcion: '', ctaOrigen:'', ctaDestino:'', monto:'', saldo:''},
          {fecha: '', descripcion: '', ctaOrigen:'', ctaDestino:'', monto:'', saldo:''},
          {fecha: '', descripcion: '', ctaOrigen:'', ctaDestino:'', monto:'', saldo:''}
        ]}
      }
    }
  } catch (e) {
    return {response: false, message: e.message}
  }
}

// * POST - Transferencias✅
export async function setMovement(movementInfo) {
  // Agregar una transacción a una cuenta
  // ? Cuenta destino puede ser interna o externa: Ver campo Banco === SmartBank
  console.log('Set Movements')
  console.log(movementInfo)
  try {
    // ? Sección con backend
    if (import.meta.env.VITE_PUBLIC_API){
      const resp = await fetch(`${import.meta.env.VITE_PUBLIC_API}/movimientos/registrar`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify(movementInfo)
      });
      
      if (resp.status !== 201) {
        // @fail - Falla solicitud
        const { error } = await resp.json()
        throw new Error(`${resp.status} - ${error}`)
      }
  
      if (resp.status === 201) {
        // @ok - Acceso valido
        return {response: true, message: 'Transacción exitosa'}
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
        return {response: true, message: 'Transacción exitosa'}
      }
    }
  } catch (e) {
    return {response: false, message: e.message}
  }
}

// * POST - Crear Cuenta✅
export async function createAccount(accountType){
  // Crear una nueva cuenta de usuario
  console.log('Create Account')
  try {
    // ? Sección con backend
    if (import.meta.env.VITE_PUBLIC_API){
      const resp = await fetch(`${import.meta.env.VITE_PUBLIC_API}/cuentas/crear`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify({
          "idCliente": 1,
          "nroCuenta": Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000,
          "tipoCuenta": accountType,
          "saldo": 1
        })
      });
      
      console.log(resp.status)
      if (resp.status !== 201) {
        // @fail - Falla solicitud
        throw new Error(`${resp.status} - Error al crear la cuenta`)
      }
  
      if (resp.status === 201) {
        // @ok - Acceso valido
        return {response: true, message: 'Cuenta creada con exito'}
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
        return {response: true, message: 'Cuenta creada con exito'}
      }
    }
  } catch (e) {
    console.log(e.message)
    return {response: false, message: e.message}
  }
}
