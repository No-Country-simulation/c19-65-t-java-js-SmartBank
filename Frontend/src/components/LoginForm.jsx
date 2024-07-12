import { useState } from "react";
import { useUserData } from '@/userZustand'
import Cookies from 'js-cookie';

export default function LoginForm() {
  const [responseMessage, setResponseMessage] = useState("");
  const { setName } = useUserData(state => state)

  async function submit(e) {
    e.preventDefault();
    const { email, name } =  e.target.elements

    const formData = {
      email: email.value, 
      name: name.value
    }
    try {
      const response = await fetch(`${import.meta.env.PUBLIC_API}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify(formData)
      });
      if (response.status === 500) throw new Error('Error 500')
      const data = await response.json()
      if (response.status === 200) {
        // setName(formData.name)
        // setResponseMessage(data.user)
        // TODO - set cookies
        Cookies.set('nombre_cookie', 'valor_cookie',{ expires: 0.05 })
        window.location.href = '/dashboard'
      }
    } catch (e) {
    }

  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="name">
        Nombre
        <input type="text" id="name" name="name" autoComplete="name" />
      </label>
      <label htmlFor="email">
        Correo electrónico
        <input type="text" id="email" name="email" autoComplete="email" />
      </label>
      <button>Enviar</button>
      {/* {responseMessage && <p>{responseMessage}</p>} */}
    </form>
  );
}
