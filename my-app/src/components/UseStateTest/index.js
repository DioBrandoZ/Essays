import { useState } from 'react'

const StateCom = () => {
  const [num, setNum] = useState(0)

  const asyncAlert = () => {
    setTimeout(() => {
      alert(num)
    }, 3000)
  }

  return (
    <>
      <div>current number {num}</div>
      <button onClick={asyncAlert}>async show</button>
      <button onClick={() => { setNum(num + 1) }}>add</button>
      <button onClick={() => { setNum(prev => prev + 1) }}>function add</button>
    </>
  )
}

export default StateCom