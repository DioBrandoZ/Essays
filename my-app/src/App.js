import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import MemoCom from './components/memo';
import './App.css';

const App = () => {
  const [name, setName] = useState('zzq')
  const [age, setAge] = useState(24)
  const ref = useRef(null)
  const text= '<h1>hello world</h1>'

  const fn = (e) => {
    if(!ref.current.contains(e.target)) {
      console.log('xxx')
    }
  }

  useEffect(() => {
    document.addEventListener('click', fn)
    ref.current.addEventListener('click', (e) => { e.stopPropagation() })
    return document.removeEventListener('click', fn)
  }, [])

  useEffect(() => {
    console.log('effect')
    return (() => { console.log('destory') })
  }, [name])

  useLayoutEffect(() => {
    console.log('layoutEffect')
    return (() => { console.log('layoutDestory') })
  }, [name])

  console.log('render')

  return (
    <div onClick={() => { console.log('wrap') }}>
      {console.log('div render')}
      <button onClick={() => { setName(prev => prev) }}>change name</button> name: {name} <br/>
      <button onClick={() => { setAge(age => age + 1) }}>change age</button>age: {age} <br/>
      <div className='test' ref={ref}>
        <div className='bfcMargin'>bfc margin</div>
        <div className='bfcMargin'>bfc margin</div>
        <div className='bfcMargin'>bfc margin</div>
      </div>
      <MemoCom name={name}/>
    </div>
  )
}

export default App;
