import { useState } from 'react';

export function Counter () {
  const [counter, setCounter] = useState(0)

  return (
    <>
      <span>{counter}</span>
      <button onClick={() => {setCounter(counter => counter + 1)}}>+</button>
      
    </>
  )
}