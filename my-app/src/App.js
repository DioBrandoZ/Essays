import UseStateTest from './components/UseStateTest'
import './App.css';

const App = () => {

  return (
    <div onClick={() => { console.log('wrap') }}>
      <UseStateTest />
    </div>
  )
}

export default App;
