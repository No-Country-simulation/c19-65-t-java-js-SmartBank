export function deleteAllStorage () {
  sessionStorage.removeItem('Auth')
  sessionStorage.removeItem('tm')
  sessionStorage.removeItem('UN')
  sessionStorage.removeItem('TU')
}

export const setStorageItem = (key, value) => {
  try {
    sessionStorage.setItem(key, value)
  } catch (error) {
    console.error('Error al guardar en Local Storage', error)
  }
}

export const getStorageItem = (key) => {
  try {
    return sessionStorage.getItem(key)
  } catch (error) {
    console.error('Error al obtener de Local Storage', error)
    return null
  }
};