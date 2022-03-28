import { useState, useEffect, useLayoutEffect } from 'react'

const StateCom = () => {
  const [num, setNum] = useState(0)

  const asyncAlert = () => {
    console.log('1: =>', num)
    setNum(n => n + 1)
    console.log('2: =>', num)
    setNum(n => n + 1)
    console.log('3: =>', num)
    // setTimeout(() => {
    //   alert(num)
    // }, 3000)
  }

  console.log('render', num)

  const clickFn = () => {
    Promise.resolve().then(() => {
      setNum(a => a + 1)
      console.log('??: =>',num)
      setNum(a => a + 1)
      console.log('??: =>',num)
    })
  }

  return (
    <>
      <div>current number {num}</div>
      <button onClick={asyncAlert}>async show</button>
      <button onClick={clickFn}>add</button>
      <button onClick={() => { setNum(prev => prev + 1) }}>function add</button>
    </>
  )
}

export default StateCom