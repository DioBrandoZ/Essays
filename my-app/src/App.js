import React, { useState } from 'react';
import MemoCom from './components/memo';
import './App.css';

const App = () => {
  const [name, setName] = useState({name: 'zzq'})
  const [age, setAge] = useState(24)

  return (
    <div>
      <button onClick={() => { setName(prev => ({name: `${prev.name}`})) }}>change name</button> name: {name.name} <br/>
      <button onClick={() => { setAge(age => age + 1) }}>change age</button>age: {age} <br/>
      <MemoCom name={name}/>
    </div>
  )
}

export default App;
