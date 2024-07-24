
// Función para derivar una clave criptográfica de una contraseña
async function deriveKey(password) {
  const encoder = new TextEncoder();
  const passwordKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(sessionStorage.getItem('Auth')),
      iterations: 100000,
      hash: 'SHA-256'
    },
    passwordKey,
    {
      name: 'AES-GCM',
      length: 256
    },
    false,
    ['encrypt', 'decrypt']
  );
}

// Función para cifrar un string
export async function encryptString(text) {
  const key = await deriveKey(import.meta.env.VITE_CRYPTO_KEY)
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const iv = window.crypto.getRandomValues(new Uint8Array(12))

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    data
  );

  const ivBase64 = btoa(String.fromCharCode(...iv))
  const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData)))

  return JSON.stringify({ iv: ivBase64, data: encryptedBase64 })
}

// Función para descifrar un string
export async function decryptString(encrypted) {
  try {
    const { iv, data } = JSON.parse(encrypted)
    const ivArray = Uint8Array.from(atob(iv), c => c.charCodeAt(0))
    const encryptedDataArray = Uint8Array.from(atob(data), c => c.charCodeAt(0))
    const key = await deriveKey(import.meta.env.VITE_CRYPTO_KEY)
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: ivArray
      },
      key,
      encryptedDataArray
    )
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData)
  } catch (e) {
    return false
  }
}