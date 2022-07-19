import React from 'react'
import {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [todos,setTodos] = useState([]);
  const [todo,setTodo] = useState('');
  const [todoEditing,settodoEditing] = useState(null); //the id of the element ethat we will be editing
  const [editingText, seteditingText] = useState('');

  useEffect(()=>{
    const temp = localStorage.getItem('todos')
    const loadedTodos = JSON.parse(temp)
    if(temp!=="[]"){
      setTodos(loadedTodos)
    }

  },[])

  useEffect(()=>{
    const temp = JSON.stringify(todos)//storing all our todos in a json object called temp
    localStorage.setItem('todos',temp) //saving that temp obj to local storage
  },[todos])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTodo = {
      id:new Date().getTime(),
      text: todo,
      completed: false,
    }
    setTodos([...todos].concat(newTodo));
    setTodo('')

  }
  const deleteTodo = (id) => {
    const updatedTodos = [...todos.filter((todo)=>todo.id!==id )]
    setTodos(updatedTodos)
  }

  const toggleComplete = (id) => {
    const updatedTodos = [...todos.map((todo) => {
      if(todo.id === id){todo.completed = !todo.completed
      }
      return todo
    })]
    setTodos(updatedTodos)
  }
const editTodo = (id) =>{
  const updatedTodos = [...todos.map((todo) => {
    if(todo.id === id){todo.text = editingText
    }
    return todo
  })]
  setTodos(updatedTodos)
  settodoEditing(null)
  seteditingText("")
}

  return (
    <div className="App">
      <h1 className='Title'>Todo List App</h1>
      <div className='addtask'>
        <form onSubmit={handleSubmit}>
        
          <input className='enter-task' type="text" onChange={(e) => setTodo(e.target.value)} value={todo}/>
          <button className='button' type="submit">Add Task</button>
        </form>
      </div>
      {todos.map((todo) => 
          <div key={todo.id}>
            {todoEditing===todo.id ? (<input type="text" onChange={(e) => seteditingText(e.target.value)} value={editingText}></input>) : (<div>{todo.text}</div>)}
              
              
              <button onClick={() => deleteTodo(todo.id)}>Delete task</button>
              <input 
                type="checkbox" 
                onChange={()=> toggleComplete(todo.id)}
                checked={todo.completed}
                ></input>
              {todoEditing===todo.id ? (<button onClick={() => editTodo(todo.id)}>Submit Todo</button>) : (<button onClick={() => settodoEditing(todo.id)}>Edit Todo</button>)}
              
              
          </div>)}
    </div>
  );
}

export default App;
