  
const password1 = document.getElementById('passw1');
const password2 = document.getElementById('passw2');

//* Live Validation 

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateDNI(dni) {
  const regex = /^\d{7,8}$/;
  return regex.test(dni);
}

function validatePasswords() {
  if (password1.value === password2.value) {
    password2.setCustomValidity('');
    removeErrorMessage(password2);
  } else {
    password2.setCustomValidity('Las contraseñas no coinciden');
    showErrorMessage(password2, 'Las contraseñas no coinciden');
  }
}

function validateInput(input) {
  const isEmail = input.type === 'email'
  const isDNI = input.id === 'regDni'
  const isCheckbox = input.id === 'agree'
  const isEmpty = !input.value.trim()
  const isInvalidEmail = isEmail && !validateEmail(input.value)
  const isInvalidDNI = isDNI && !validateDNI(input.value)
  const isNotChecked = isCheckbox && !input.checked
  if (isEmpty || isInvalidEmail || isInvalidDNI || isNotChecked) {
    const errorMessage = isEmpty || isNotChecked
      ? 'Esta información es necesaria' 
      : isInvalidEmail 
        ? 'Ingrese un email válido' 
        : 'Ingrese un DNI válido';
    showErrorMessage(input, errorMessage);
  } else if (input.id !== 'passw2')
      removeErrorMessage(input)
    else
      validatePasswords()
}

export function validateForm(input, submitBtn, inputs) {
  validateInput(input)
  const isValid = Array.from(inputs).every( (input) => {
    const isEmail = input.type === 'email'
    const isDNI = input.id === 'regDni'
    const isCheckbox = input.id === 'agree'
    const isEmpty = !input.value.trim()
    const isInvalidEmail = isEmail && !validateEmail(input.value)
    const isInvalidDNI = isDNI && !validateDNI(input.value)
    const isNotChecked = isCheckbox && !input.checked
    // console.log({isEmpty, isInvalidEmail, isInvalidDNI, isNotChecked})
    if (isEmpty || isInvalidEmail || isInvalidDNI || isNotChecked) return false
    else if (input.id !== 'passw2') return true
    else if (password1.value === password2.value) return true
    else return false
  })
  submitBtn.disabled = !isValid;
}

// ? Mensajes de error
function showErrorMessage(input, message) {
  const isAgreeCheckbox = input.id === 'agree'
  let error = isAgreeCheckbox ? input.parentNode.nextSibling : input.nextElementSibling
  if (!error || !error.classList?.contains('error-message')) {
    error = document.createElement('span');
    error.className = 'error-message';
    error.style.color = 'red';
    error.textContent = message;
    if (isAgreeCheckbox) input.parentNode.parentNode.insertBefore(error, input.parentNode.nextSibling)
    else input.parentNode.insertBefore(error, input.nextSibling)
  }
  input.style.borderColor = 'red';
}

function removeErrorMessage(input) {
  const isAgreeCheckbox = input.id === 'agree'
  let error = isAgreeCheckbox? input.parentNode.nextElementSibling :input.nextElementSibling
  if (error && error.classList.contains('error-message')) {
    error.parentNode.removeChild(error);
  }
  input.style.borderColor = '';
}


export function liveValidation (Btn, Inputs) {
  Btn.disabled = true
  Inputs.forEach(input => {
    input.addEventListener('blur', () => validateForm(input, Btn, Inputs))
    input.addEventListener('input', () => validateForm(input, Btn, Inputs))
  })
}