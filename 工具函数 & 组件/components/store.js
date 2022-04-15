import { createContext, useReducer, useContext } from 'react'

const INIT_STATE = {
  todoList: [],
  doneList: [],
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'addTodo':
      return {
        ...state,
        todoList: [...state.todoList, payload],
      }
    case 'doSomething':
      return {
        ...state,
        todoList: state.todoList.filter(thing => thing !== payload),
        doneList: [...state.doneList, payload]
      }
    default:
      return state
  }
}


const Context = createContext()

export const GlobalProvider = ({ children }) => {
  const [global, dispatch] = useReducer(reducer, INIT_STATE)

  return (
    <Context.Provider value={{ global, dispatch }}>{children}</Context.Provider>
  )
}

const useStore = () => useContext(Context)

export default useStore
